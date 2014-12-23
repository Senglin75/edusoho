<?php
namespace Custom\WebBundle\Controller;

use Symfony\Component\HttpFoundation\Request;

use Topxia\WebBundle\Controller\BaseController;
use Topxia\Common\ArrayToolkit;
use Topxia\Common\Paginator;

class CartsController extends BaseController
{
    public function showAction(Request $request)
    {
        $user = $this->getCurrentUser();
        $carts = $this->getCartsService()->findLimitCartsByUseId(5,$user['id']);
        $courses = array();
        if (!empty($carts)){
            $courseIds = ArrayToolkit::column($carts,'itemId');
            $courses = $this->getCourseService()->findCoursesByIds($courseIds);
            $courses = ArrayToolkit::index($courses,'id');
            $teacherIds = ArrayToolkit::column($courses,'teacherIds');
            $users = $this->getUsers($teacherIds);
        }

        return $this->render('CustomWebBundle:Carts:show-popover.html.twig',array(
            'carts' => $carts,
            'courses' => $courses,
            'users' => $users,
        ));
    }

    public function deleteAction(Request $request)
    {
        $ids = $request->request->get('ids', array());

        $id = $request->query->get('id', null);

        if ($id) {
            array_push($ids, $id);
        }

        $res = $this->getCartsService()->deleteCartsByIds($ids);

        if ($res) {
            return $this->createJsonResponse(array('status'=>'success'));
        } else {
            return $this->createJsonResponse(array('status'=>'fail'));
        }

    }

    public function listAction(Request $request)
    {
        $userId = $this->getCurrentUser()->id;

        $condition = array(
            'userId' => $userId,
        );

        $carts = $this->getCartsService()->searchCarts(
            $condition,
            array('createdTime','DESC'),
            0,
            $this->getCartsService()->searchCartsCount($condition)
        );

        $ids = ArrayToolkit::column($carts,'itemId');
        $courses = $this->getCourseService()->findCoursesByIds($ids);
        $teacherIds = ArrayToolkit::column($courses,'teacherIds');
        $users = $this->getUsers($teacherIds);

        return $this->render('CustomWebBundle:Carts:list.html.twig',array(
            'carts' => $carts,
            'courses' =>$courses,
            'users' => $users,
        ));
    }

    public function favoriteAction(Request $request)
    {
        $ids = $request->request->all();
        if (!empty($ids['ids'])) {
            $ids = $ids['ids'];
        } else {
            return $this->createJsonResponse(array('status' => 'fail'));
        }

        $this->getCourseService()->favoriteCourses($ids);

        return $this->createJsonResponse(true);
    }

    private function getUsers($userIds)
    {
        $ids = array();

        foreach ($userIds as $key => $userId) {
            foreach ($userId as $key => $value) {
                $ids[] = $value;
            }
        }
        $ids = array_unique($ids);

        return $this->getUserService()->findUsersByIds($ids);
    }

    private function getCartsService()
    {
        return $this->getServiceKernel()->createService('Custom:Carts.CartsService');
    }

    private function getCourseService()
    {
        return $this->getServiceKernel()->createService('Course.CourseService');
    }
}