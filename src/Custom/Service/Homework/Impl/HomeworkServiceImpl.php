<?php

namespace Custom\Service\Homework\Impl;

use Custom\Service\Homework\HomeworkService;
use Homework\Service\Homework\Impl\HomeworkServiceImpl as BaseHomeworkServiceImpl;
use Symfony\Component\Validator\Constraints\Date;
use Topxia\Service\Common\ServiceEvent;
use Topxia\Common\ArrayToolkit;

class HomeworkServiceImpl extends BaseHomeworkServiceImpl implements HomeworkService
{
    public function createHomework($courseId, $lessonId, $fields)
    {
        if (empty($fields)) {
            throw$this->createServiceException("内容为空，创建作业失败！");
        }

        $course = $this->getCourseService()->getCourse($courseId);

        if (empty($course)) {
            throw $this->createServiceException('课程不存在，创建作业失败！');
        }

        $lesson = $this->getCourseService()->getCourseLesson($courseId, $lessonId);

        if (empty($lesson)) {
            throw $this->createServiceException('课时不存在，创建作业失败！');
        }

        $excludeIds = $fields['excludeIds'];

        if (empty($excludeIds)) {
            throw $this->createServiceException("题目不能为空，创建作业失败！");
        }
        if (!empty($fields['pairReview']) and $fields['pairReview'] == 1) {
            $completeTime = strtotime($fields['completeTime']);
            $reviewEndTime = strtotime($fields['reviewEndTime']);
            $fields['completeTime'] = $completeTime;
            $fields['reviewEndTime'] = $reviewEndTime;
        }

        unset($fields['excludeIds']);

        $fields = $this->filterHomeworkFields($fields, $mode = 'add');
        $fields['courseId'] = $courseId;
        $fields['lessonId'] = $lessonId;
        $excludeIds = explode(',', $excludeIds);
        $fields['itemCount'] = count($excludeIds);
        $fields['updatedUserId'] = 0;
        $fields['updatedTime'] = 0;
        $homework = $this->getHomeworkDao()->addHomework($fields);
        $this->addHomeworkItems($homework['id'], $excludeIds);

        $this->getLogService()->info('homework', 'create', '创建课程{$courseId}课时{$lessonId}的作业');

        return $homework;
    }

    public function updateHomework($id, $fields)
    {
        $homework = $this->getHomework($id);

        if (empty($homework)) {
            throw $this->createServiceException('作业不存在，更新作业失败！');
        }
        if ($fields['pairReview'] == 1) {
            $fields['completeTime'] = strtotime($fields['completeTime']);
            $fields['reviewEndTime'] = strtotime($fields['reviewEndTime']);
        } else {
            $fields['completeTime'] = 0;
            $fields['reviewEndTime'] = 0;
        }

        $fields = $this->filterHomeworkFields($fields, $mode = 'edit');

        $homework = $this->getHomeworkDao()->updateHomework($id, $fields);

        $this->getLogService()->info('homework', 'update', '更新课程{$courseId}课时{$lessonId}的{$id}作业');

        return $homework;

    }

    public function getHomeworksByCourseId($courseId)
    {
        $homeworks = $this->getHomeworkDao()->findHomeworksByCourseId($courseId);
        return $homeworks;
    }

    public function submitHomework($id, $homework_result)
    {
        $homework = $this->getHomeworkDao()->getHomework($id);

        if ($homework['pairReview'] and intval($homework['completeTime']) < time()) {
            throw$this->createServiceException("已经超过作业提交截止时间，提交作业失败！");
        }
        $this->addItemResult($id, $homework_result);
        //reviewing
        $rightItemCount = 0;

        $homeworkItemsRusults = $this->getItemResultDao()->findItemResultsbyHomeworkId($id);

        foreach ($homeworkItemsRusults as $key => $homeworkItemRusult) {
            if ($homeworkItemRusult['status'] == 'right') {
                $rightItemCount++;
            }
        }

        $homeworkitemResult['rightItemCount'] = $rightItemCount;
        $homeworkitemResult['status'] = $homework['pairReview'] ? (time() >= $homework['completeTime'] ? 'pairReviewing' : 'editing') : 'reviewing';
        $homeworkitemResult['updatedTime'] = time();

        $homeworkResult = $this->getResultDao()->getResultByHomeworkIdAndUserId($id, $this->getCurrentUser()->id);
        $result = $this->getResultDao()->updateResult($homeworkResult['id'], $homeworkitemResult);

        return $result;
    }

    public function getResultByCourseIdAndUserId($courseId, $userId)
    {
        $homeworkResults = $this->getResultDao()->getResultByCourseIdAndUserId($courseId, $userId);
        return empty($homeworkResults) ? null : ArrayToolkit::index($homeworkResults, 'lessonId');
    }

    public function createHomeworkReview($homeworkResultId, $userId, array $fields)
    {
        $finalScore = $this->sumScore($fields['items']);

        $homeworkResult = $this->loadHomeworkResult($homeworkResultId);
        $result['status'] = 'finished';
        $result['checkedTime'] = time();
        $result['teacherSay'] = empty($fields['teacherFeedback']) ? "" : $fields['teacherFeedback'];
        $result['score'] = $finalScore;
        $this->getResultDao()->updateResult($homeworkResult['id'], $result);

        $review['userId'] = $userId;
        $review['homeworkId'] = $homeworkResult['homeworkId'];
        $review['homeworkResultId'] = $homeworkResultId;
        $review['category'] = 'teacher';
        $review['score'] = $finalScore;
        $review['createdTime'] = time();
        $review = $this -> getReviewDao() -> create($review);
        $review['items'] = $this->createHomeworkPairReviewItems($review['id'], $fields['items']);
        $review['homeworkResult'] = $homeworkResult;

        return $review;
    }

    private function sumScore($items)
    {
        $sum = 0;
        foreach ($items as $item) {
            $sum += $item['score'];
        }
        return $sum;
    }

    private function createHomeworkPairReviewItems($homeworkReviewId, $items){
        $reviewItems=array();
        foreach($items as $index =>$item){
            $item['homeworkReviewId'] = $homeworkReviewId;
            $item['createdTime'] = time();
            $item=$this ->getReviewItemDao()->create($item);

	    //老师的分数为该提的最终得分
            $this->getResultDao()->updateResult($item['homeworkItemResultId'],array('score'=>$item['score']));
            array_push($reviewItems,$item);
        }
        return $reviewItems;
    }

    public function createHomeworkPairReview($homeworkResultId, $userId, array $fields)
    {
        $homeworkResult = $this->loadHomeworkResult($homeworkResultId);
        $result['pairReviews'] = ++$homeworkResult['pairReviews'];
        $this->getResultDao()->updateResult($homeworkResult['id'],$result);
        
        $finalScore=$this->sumScore($fields['items']);
        $review['userId'] = $userId;
        $review['homeworkId'] = $homeworkResult['homeworkId'];
        $review['homeworkResultId'] = $homeworkResultId;
        $review['category'] = 'student';
        $review['score'] = $finalScore;
        $review['createdTime'] = time();
        $review = $this -> getReviewDao() -> create($review);
        $review['items'] = $this->createHomeworkPairReviewItems($review['id'], $fields['items']);
        $review['homeworkResult'] = $homeworkResult;

        return $review;
    }

    public function randomizeHomeworkResultForPairReview($homeworkId, $userId)
    {
        $homework = $this->loadHomework($homeworkId);

        $reviewableResults = $this->getResultDao()->findPairReviewables($homework, $userId);
        if (empty($reviewableResults)) {
            return null;
        }
        $selectedId = $this->pickReviewable($reviewableResults, $homework);
        $result = $this->loadHomeworkResult($selectedId);
        $resultItems = $this->getItemSetResultByHomeworkIdAndUserId($homeworkId, $result['userId']);
        $result['items'] = $resultItems;
        $course=$this->getCourseService() ->loadCourse($result['courseId']);
        $result['course'] = $course;
        $lesson=$this ->getCourseService()->loadLesson($result['lessonId']);
        $result['lesson'] =$lesson;
        $result['homework']=$homework;
        return $result;
    }

    public function getHomeworkResult($homeworkResultId)
    {
        return $this->getResultDao()->getResult($homeworkResultId);
    }

    public function findItemResultsbyUserId($userId)
    {
        $homeworkItemsResults = $this->getItemResultDao()->findItemResultsbyUserId($userId);
        return empty($homeworkItemsResults) ? null : ArrayToolkit::index($homeworkItemsResults, 'homeworkId');
    }

    public function loadHomeworkResult($homeworkResultId)
    {
        if (empty($homeworkResultId)) {
            throw $this->createNotFoundException("作业答卷关键字为空.");
        }
        $homeworkResult = $this->getHomeworkResult($homeworkResultId);
        if (empty($homeworkResult)) {
            throw $this->createNotFoundException("作业答卷{$homeworkResultId}不存在！");
        }
        return $homeworkResult;
    }

    public function updateHomeworkResult($homeworkResultId, array $fields)
    {
        return $this->getResultDao()->updateResult($homeworkResultId, $fields);
    }

    private function pickReviewable($results, $homework)
    {
        $insufficient = array();
        $sufficient = array();
        foreach ($results as $result) {
            if ($result['pairReviews'] < $homework['minReviews']) {
                array_push($insufficient, $result['id']);
            } else {
                array_push($sufficient, $result['id']);
            }
        }
        $ids = empty($insufficient) ? $sufficient : $insufficient;
        return empty($ids) ? null : $ids[rand(0, count($ids) - 1)];
    }

    public function loadHomework($id)
    {
        if (empty($id)) {
            throw $this->createNotFoundException("作业关键字为空！");
        }
        $homework = $this->getHomework($id);
        if (empty($homework)) {
            throw $this->createNotFoundException("作业{id}不存在！");
        }
        return $homework;
    }

    public function loadHomeworkResultItem($id)
    {
        if (empty($id)) {
            throw $this->createNotFoundException("作业答题关键字为空！");
        }
        $item = $this->getItemResultDao()->getItemResult($id);
        if (empty($item)) {
            throw $this->createNotFoundException("作业答题{id}不存在！");
        }
        return $item;
    }

    public function countUserHomeworkPairReviews($homeworkId, $userId){
        return $this->getReviewDao() -> countUserPairReviews($homeworkId, $userId);
    }

    public function forwardHomeworkStatus(){
        $results=$this->getResultDao()->findSubmitableResults();
        foreach($results as $result){
            $this->submitHomework($result['homeworkId'], array('id'=>$result['id']));       
        }

        $results=$this->getResultDao()->findFinishableResults();
        foreach($results as $result){
            $this->finishHomeworkResult($result);
        }
    }

    /**
     * 结束一个互评中的作业答卷.
     * 为作业答卷计算评分，更新作业答卷状态.
     * @param result 作业答卷.
    **/
    private function finishHomeworkResult($result){


        $result=$this->getResultDao()->updateResult($result['id'], $result);
    }

    protected function getReviewDao()
    {
        return $this->createDao('Custom:Homework.ReviewDao');
    }

    protected function getReviewItemDao()
    {
        return $this->createDao('Custom:Homework.ReviewItemDao');
    }

    protected function getHomeworkDao()
    {
        return $this->createDao('Homework:Homework.HomeworkDao');
    }

    protected function getResultDao()
    {
        return $this->createDao('Custom:Homework.ResultDao');
    }

    private function getItemResultDao()
    {
        return $this->createDao('Custom:Homework.HomeworkItemResultDao');
    }

    private function getCourseService()
    {
        return $this->createService('Course.CourseService');
    }

    private function getLogService()
    {
        return $this->createService('System.LogService');
    }

    private function getQuestionService()
    {
        return $this->createService('Question.QuestionService');
    }

    private function getHomeworkItemDao()
    {
        return $this->createDao('Homework:Homework.HomeworkItemDao');
    }

    private function filterHomeworkFields($fields, $mode)
    {
        $fields['description'] = $fields['description'];

        if ($mode == 'add') {
            $fields['createdUserId'] = $this->getCurrentUser()->id;
            $fields['createdTime'] = time();
        }

        if ($mode == 'edit') {
            $fields['updatedUserId'] = $this->getCurrentUser()->id;
            $fields['updatedTime'] = time();
        }

        return $fields;
    }

    private function addItemResult($id, $homework)
    {

        $homeworkResult = $this->getResultByHomeworkIdAndUserId($id, $this->getCurrentUser()->id);
        $homeworkItems = $this->findItemsByHomeworkId($id);
        $itemResult = array();
        $homeworkitemResult = array();

        foreach ($homeworkItems as $key => $homeworkItem) {
            if (!empty($homework[$homeworkItem['questionId']])) {

                if (!empty($homework[$homeworkItem['questionId']]['answer'])) {

                    $answer = $homework[$homeworkItem['questionId']]['answer'];

                    $result = $this->getQuestionService()->judgeQuestion($homeworkItem['questionId'], $answer);

                    $status = $result['status'];
                } else {
                    $answer = null;
                    $status = "noAnswer";
                }

            } else {
                $answer = null;
                $status = "noAnswer";

            }
            $itemResult['itemId'] = $homeworkItem['id'];
            $itemResult['homeworkId'] = $homeworkItem['homeworkId'];
            $itemResult['homeworkResultId'] = $homeworkResult['id'];
            $itemResult['questionId'] = $homeworkItem['questionId'];
            $itemResult['userId'] = $this->getCurrentUser()->id;
            $itemResult['status'] = $status;
            $itemResult['answer'] = $answer;
            $this->getItemResultDao()->addItemResult($itemResult);
        }
    }

    private function addHomeworkItems($homeworkId, $excludeIds)
    {
        $homeworkItems = array();
        $homeworkItemsSub = array();
        $includeItemsSubIds = array();
        $index = 1;

        foreach ($excludeIds as $key => $excludeId) {

            $questions = $this->getQuestionService()->findQuestionsByParentId($excludeId);

            $items['seq'] = $index++;
            $items['questionId'] = $excludeId;
            $items['homeworkId'] = $homeworkId;
            $items['parentId'] = 0;
            $homeworkItems[] = $this->getHomeworkItemDao()->addItem($items);

            if (!empty($questions)) {
                $i = 1;
                foreach ($questions as $key => $question) {
                    $items['seq'] = $i++;
                    $items['questionId'] = $question['id'];
                    $items['homeworkId'] = $homeworkId;
                    $items['parentId'] = $question['parentId'];
                    $homeworkItems[] = $this->getHomeworkItemDao()->addItem($items);
                }
            }
        }
    }
}