(window.webpackJsonp=window.webpackJsonp||[]).push([["preview~setting"],{"00e4":function(t,e,s){"use strict";s("b54a");var i={props:{poster:{type:Object,default:{}},feedback:{type:Boolean,default:!0}},data:function(){return{link:this.poster.link}},computed:{linkUrl:function(){if("url"!=this.poster.link.type||!this.feedback)return"javascripts;";var t=this.poster.link.url&&this.poster.link.url.trim();return t?/^(\/\/)|(http:\/\/)|(https:\/\/)/.exec(t)?t:"http://"+t:"javascripts:;"}},methods:{jumpTo:function(t){this.feedback&&("course"===t.type&&t.target?this.$router.push({path:"/course/".concat(t.target.id)}):"classroom"===t.type&&t.target?this.$router.push({path:"/classroom/".concat(t.target.id)}):"vip"!==t.type||this.$router.push({path:"/vip"}))}}},a=s("2877"),n=Object(a.a)(i,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"e-poster"},["url"==t.poster.link.type&&t.feedback?s("a",{attrs:{href:t.linkUrl}},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.poster.image.uri,expression:"poster.image.uri"}],staticClass:"e-poster__img"})]):s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.poster.image.uri,expression:"poster.image.uri"}],staticClass:"e-poster__img",on:{click:function(e){return t.jumpTo(t.link)}}})])}),[],!1,null,null,null);e.a=n.exports},"0468":function(t,e,s){"use strict";var i={name:"EVipItem",props:{item:{type:Object,default:function(){return{}}},feedback:{type:Boolean,default:!0}},methods:{handleClick:function(){this.feedback&&this.$router.push({path:"/vip",query:{id:this.item.id}})}}},a=s("2877"),n={name:"EVipList",components:{vipItem:Object(a.a)(i,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"e-vip-item",on:{click:t.handleClick}},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.item.background,expression:"item.background"}],staticClass:"vip-background"}),s("span",{staticClass:"name text-overflow"},[t._v(t._s(t.item.name))]),s("span",{staticClass:"explain"},[t._v(t._s(t.item.freeCourseNum)+"门课程 "+t._s(t.item.freeClassroomNum)+"门班级")])])}),[],!1,null,null,null).exports},props:["items","feedback","sort","showTitle"]},c=Object(a.a)(n,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"e-vip-list",class:t.items.length<=1?"single":""},["show"===t.showTitle?s("div",{staticClass:"e-vip-list__title text-18 mb20"},[t._v("会员专区")]):t._e(),t.items.length>1?s("van-swipe",{attrs:{width:200,"show-indicators":!1,loop:!1,touchable:!0}},t._l(t.items,(function(e,i){return s("van-swipe-item",{key:i},[s("vip-item",{attrs:{item:e,feedback:t.feedback}})],1)})),1):t._l(t.items,(function(e,i){return s("vip-item",{key:i,staticClass:"single",attrs:{item:e,feedback:t.feedback}})}))],2)}),[],!1,null,null,null);e.a=c.exports},"062f":function(t,e,s){"use strict";s("6762"),s("2fdb"),s("7f7f"),s("55dd");var i=s("db72"),a=(s("c5f6"),s("a481"),s("ac6a"),s("456d"),s("2f62")),n={props:{course:{type:Object,default:function(){return{}}},type:{type:String,default:"price"},courseType:{type:String,default:"normal"},discountType:{type:String,default:"discount"},discount:{type:String,default:"10"},feedback:{type:Boolean,default:!0},typeList:{type:String,default:"course_list"},normalTagShow:{type:Boolean,default:!0},vipTagShow:{type:Boolean,default:!1},isVip:{type:String,default:"0"}},data:function(){return{pathName:this.$route.name}},computed:Object(i.a)({},Object(a.c)(["vipSwitch","isLoading"]),{discountNum:function(){if("class_list"===this.typeList)return!1;if(""!==this.discount){var t=Number(this.discount);if("reduce"===this.discountType)return"减".concat(t);if("discount"===this.discountType)return 10!==t&&(0==t?"限免":"".concat(t,"折"))}}}),watch:{course:{handler:function(t){var e=t.courseSet;if("h5Setting"!==this.pathName&&e)for(var s=Object.keys(e.cover),i=0;i<s.length;i++)e.cover[s[i]]=e.cover[s[i]].replace(/^(\/\/)|(http:\/\/)/,"https://")},immediate:!0}},methods:{onClick:function(t){if(this.feedback){var e="order"===this.type,s=this.course.id||this.course.targetId;"SPAN"!==t.target.tagName&&(e?location.href=this.order.targetUrl:this.$router.push({path:"course_list"===this.typeList?"/course/".concat(s):"/classroom/".concat(s)}))}}}},c=s("2877"),o=Object(c.a)(n,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"e-course"},[s("div",{staticClass:"clearfix",on:{click:t.onClick}},[s("div",{staticClass:"e-course__left pull-left"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.course.imgSrc.url,expression:"course.imgSrc.url"}],class:t.course.imgSrc.className}),t.normalTagShow?s("div",["live"===t.courseType?s("span",{staticClass:"tag tag-live"},[t._v("直播")]):t._e(),t.discountNum?s("span",{staticClass:"tag tag-discount"},[t._v(t._s(t.discountNum))]):t._e()]):t._e(),t.vipTagShow&&t.vipSwitch&&Number(t.isVip)?s("span",{staticClass:"tag tag-vip"},[t._v("会员免费")]):t._e()]),s("div",{staticClass:"e-course__right pull-left"},[s("div",{staticClass:"e-course__header text-overflow"},[t._v(t._s(t.course.header))]),s("div",{staticClass:"e-course__middle"},[t.course.middle.value?s("div",{domProps:{innerHTML:t._s(t.course.middle.html)}}):t._e()]),s("div",{staticClass:"e-course__bottom",domProps:{innerHTML:t._s(t.course.bottom.html)}})])])])}),[],!1,null,null,null).exports,r={props:{course:{type:Object,default:function(){return{}}},type:{type:String,default:"price"},courseType:{type:String,default:"normal"},discountType:{type:String,default:"discount"},discount:{type:String,default:"10"},feedback:{type:Boolean,default:!0},typeList:{type:String,default:"course_list"},isAppUse:{type:Boolean,default:!1},normalTagShow:{type:Boolean,default:!0},vipTagShow:{type:Boolean,default:!1},isVip:{type:String,default:"0"}},data:function(){return{pathName:this.$route.name}},computed:Object(i.a)({},Object(a.c)(["vipSwitch","isLoading"]),{discountNum:function(){var t=Number(this.discount);return"class_list"!==this.typeList&&!isNaN(t)&&("reduce"===this.discountType?"减".concat(t):"discount"===this.discountType&&10!==t&&(0===t?"限免":"".concat(t,"折")))}}),watch:{course:{handler:function(t){var e=t.courseSet;if("miniprogramSetting"===this.pathName&&e)for(var s=Object.keys(e.cover),i=0;i<s.length;i+=1)e.cover[s[i]]=e.cover[s[i]].replace(/^(\/\/)|(http:\/\/)/,"https://")},immediate:!0}},methods:{onClick:function(t){var e="order"===this.type,s=this.course.id||this.course.targetId;this.feedback&&(this.isAppUse?this.postMessage(this.typeList,s):"SPAN"!==t.target.tagName&&(e?location.href=this.order.targetUrl:this.$router.push({path:"course_list"===this.typeList?"/course/".concat(s):"/classroom/".concat(s)})))},postMessage:function(t,e){var s,i={};"course_list"===t?(s="kuozhi_course",i={courseId:e}):(s="kuozhi_classroom",i={classroomId:e}),window.postNativeMessage({action:s,data:i})}}},u={mixins:[r]},l={mixins:[r]},p={components:{"e-class":o,"e-row-class":Object(c.a)(u,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"e-row-class",on:{click:t.onClick}},[s("div",{staticClass:"row-class-left"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.course.imgSrc.url,expression:"course.imgSrc.url"}],class:t.course.imgSrc.className}),t.discountNum?s("div",{staticClass:"row-class-left__discount"},[t._v("\n      "+t._s(t.discountNum)+"\n    ")]):t._e(),Number(t.isVip)?s("div",{staticClass:"row-class-left__member"},[t._v("会员免费")]):t._e(),s("div",{staticClass:"row-class-left__live"},[s("div",[s("span",{directives:[{name:"show",rawName:"v-show",value:"live"===t.courseType,expression:"courseType === 'live'"}]},[t._v("直播")])]),t.course.studentNum?s("div",[s("i",{staticClass:"iconfont icon-renqi"}),t._v("\n        "+t._s(t.course.studentNum)+"\n      ")]):t._e()])]),s("div",{staticClass:"row-class-right"},[s("div",{staticClass:"row-class-right__top text-overflow"},[t._v(t._s(t.course.header))]),s("div",{staticClass:"row-class-right__center text-overflow"},[t.course.middle.value?s("div",{domProps:{innerHTML:t._s(t.course.middle.html)}}):t._e()]),s("div",{staticClass:"row-class-right__bottom text-overflow",domProps:{innerHTML:t._s(t.course.bottom.html)}})])])}),[],!1,null,null,null).exports,"e-column-class":Object(c.a)(l,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"e-column-class pull-left"},[s("div",{staticClass:"column-class-left"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.course.imgSrc.url,expression:"course.imgSrc.url"}],class:t.course.imgSrc.className}),t.discountNum?s("div",{staticClass:"column-class-left__discount"},[t._v("\n      "+t._s(t.discountNum)+"\n    ")]):t._e(),Number(t.isVip)?s("div",{staticClass:"column-class-left__member"},[t._v("会员免费")]):t._e(),s("div",{staticClass:"column-class-left__live"},[s("div",[s("span",{directives:[{name:"show",rawName:"v-show",value:"live"===t.courseType,expression:"courseType === 'live'"}]},[t._v("直播")])]),t.course.studentNum?s("div",[s("i",{staticClass:"iconfont icon-renqi"}),t._v("\n        "+t._s(t.course.studentNum)+"\n      ")]):t._e()])]),s("div",{staticClass:"column-class-right"},[s("div",{staticClass:"column-class-right__top text-overflow"},[t._v("\n      "+t._s(t.course.header)+"\n    ")]),s("div",{staticClass:"column-class-right__center  text-overflow"},[t.course.middle.value?s("div",{domProps:{innerHTML:t._s(t.course.middle.html)}}):t._e()]),s("div",{staticClass:"column-class-right__bottom text-overflow",domProps:{innerHTML:t._s(t.course.bottom.html)}})])])}),[],!1,null,null,null).exports},filters:{courseListData:s("763b").a},props:{courseList:{type:Object,default:function(){}},feedback:{type:Boolean,default:!0},index:{type:Number,default:-1},typeList:{type:String,default:"course_list"},normalTagShow:{type:Boolean,default:!0},vipTagShow:{type:Boolean,default:!1},moreType:{type:String,default:"normal"},vipName:{type:String,default:"会员"},levelId:{type:Number,default:1},showMode:{type:String,default:"h5"}},data:function(){return{type:"price"}},computed:Object(i.a)({},Object(a.c)(["courseSettings","classroomSettings"]),{sourceType:{get:function(){return this.courseList.sourceType}},sort:{get:function(){return this.courseList.sort}},lastDays:{get:function(){return this.courseList.lastDays}},limit:{get:function(){return this.courseList.limit}},categoryId:{get:function(){return this.courseList.categoryId}},courseItemData:{get:function(){return!this.courseList.items.length},set:function(){}},pathName:{get:function(){return"appSetting"===this.$route.name||"appSetting"===this.$route.query.from?"appSetting":this.$route.name},set:function(){}},listObj:function(){return{type:"price",typeList:this.typeList,showStudent:!this.courseSettings||Number(this.courseSettings.show_student_num_enabled),classRoomShowStudent:!this.classroomSettings||this.classroomSettings.show_student_num_enabled}}}),watch:{sort:function(t){this.fetchCourse()},limit:function(t,e){if(e>t){var s=this.courseList.items.slice(0,t);this.courseList.items=s}else this.fetchCourse()},lastDays:function(t){this.fetchCourse()},categoryId:function(t){this.fetchCourse()},sourceType:function(t,e){t!==e&&(this.courseList.items=[]),this.fetchCourse()}},created:function(){this.pathName.includes("Setting")&&this.fetchCourse()},methods:{jumpTo:function(t){this.feedback&&("vip"===this.moreType?this.$router.push({name:"course_list"===this.typeList?"vip_course":"vip_classroom",query:{vipName:this.vipName,levelId:this.levelId}}):this.$router.push({name:"course_list"===this.typeList?"more_course":"more_class"}))},fetchCourse:function(){if("custom"!==this.sourceType){var t={sort:this.sort,limit:this.limit,lastDays:this.lastDays,categoryId:this.categoryId};this.$emit("fetchCourse",{index:this.index,params:t,typeList:this.typeList})}}}},m=Object(c.a)(p,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return"h5"===t.showMode&&t.courseList.items.length||"admin"===t.showMode?s("div",{staticClass:"e-course-list"},["appSetting"!==t.pathName?s("div",{staticClass:"e-course-list__header"},[s("div",{staticClass:"clearfix"},[s("span",{staticClass:"e-course-list__list-title text-overflow"},[t._v(t._s(t.courseList.title))]),s("span",{staticClass:"e-course-list__more"},[s("span",{staticClass:"more-text pull-left",on:{click:function(e){return t.jumpTo(t.courseList.source)}}},[t._v("更多")])])])]):t._e(),"appSetting"===t.pathName?s("div",{staticClass:"e-course-list__header",staticStyle:{padding:"16px"}},[s("div",{staticClass:"clearfix"},[s("span",{staticClass:"e-course-list__list-title text-overflow",staticStyle:{"font-size":"16px"}},[t._v(t._s(t.courseList.title))]),s("span",{staticClass:"e-course-list__more"},[s("span",{staticClass:"more-text pull-left",staticStyle:{"font-size":"12px"},on:{click:function(e){return t.jumpTo(t.courseList.source)}}},[t._v("更多")])])])]):t._e(),t.courseList.items.length?s("div",[s("div",{staticClass:"e-course-list__body"},[t._l(t.courseList.items,(function(e){return"appSetting"!==t.pathName?s("e-class",{key:e.id,attrs:{course:t._f("courseListData")(e,t.listObj),discountType:"course_list"===t.typeList?e.courseSet.discountType:"",discount:"course_list"===t.typeList?e.courseSet.discount:"","course-type":"course_list"===t.typeList?e.courseSet.type:"","type-list":t.typeList,"normal-tag-show":t.normalTagShow,"vip-tag-show":t.vipTagShow,type:t.type,"is-vip":e.vipLevelId,feedback:t.feedback}}):t._e()})),t._l(t.courseList.items,(function(e){return"appSetting"===t.pathName&&"row"===t.courseList.displayStyle?s("e-row-class",{key:e.id,attrs:{course:t._f("courseListData")(e,t.listObj,t.pathName),discountType:"course_list"===t.typeList?e.courseSet.discountType:"",discount:"course_list"===t.typeList?e.courseSet.discount:"","course-type":"course_list"===t.typeList?e.courseSet.type:"","type-list":t.typeList,"normal-tag-show":t.normalTagShow,"vip-tag-show":t.vipTagShow,type:t.type,"is-vip":e.vipLevelId,feedback:t.feedback}}):t._e()})),"appSetting"===t.pathName&&"distichous"===t.courseList.displayStyle?s("div",{staticClass:"clearfix"},t._l(t.courseList.items,(function(e){return s("e-column-class",{key:e.id,attrs:{course:t._f("courseListData")(e,t.listObj,t.pathName),discountType:"course_list"===t.typeList?e.courseSet.discountType:"",discount:"course_list"===t.typeList?e.courseSet.discount:"","course-type":"course_list"===t.typeList?e.courseSet.type:"","type-list":t.typeList,"normal-tag-show":t.normalTagShow,"vip-tag-show":t.vipTagShow,type:t.type,"is-vip":e.vipLevelId,feedback:t.feedback}})})),1):t._e()],2),s("div",{directives:[{name:"show",rawName:"v-show",value:t.courseItemData,expression:"courseItemData"}],staticClass:"e-course__empty"},[t._v("暂无"+t._s("course_list"===t.typeList?"课程":"班级"))])]):t._e()]):t._e()}),[],!1,null,null,null);e.a=m.exports},"48dd":function(t,e,s){"use strict";s("6762"),s("2fdb"),s("7f7f");var i=s("db72"),a=(s("c5f6"),s("0d25")),n={props:{course:{type:Object,default:function(){}}},computed:{status:function(){var t=(new Date).getTime(),e=1e3*this.course.lesson.startTime,s=1e3*this.course.lesson.endTime;return t<=e?"nostart":t>s?"ungenerated"===this.course.lesson.replayStatus?"end":"replay":"default"}},filters:{liveStatusText:function(t){switch(t){case"replay":return"观看回放";case"default":return"正在直播";case"nostart":return"即将开始";case"end":return"暂无回放";default:return""}}},methods:{formatHour:function(t){return Object(a.formatSimpleHour)(new Date(1e3*t))},formatTime:function(t){return Object(a.formatDotTime)(new Date(1e3*t))},getStatusClass:function(t){switch(t){case"replay":return"live-status--end";case"default":return"live-status--start";case"nostart":return"live-status--default";case"end":default:return""}}}},c=s("2877"),o=Object(c.a)(n,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"e-openCourse-class"},[s("div",{staticClass:"column-class-left"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.course.middlePicture,expression:"course.middlePicture"}]}),s("div",{staticClass:"column-class-left__live"},[s("div",[s("span",{directives:[{name:"show",rawName:"v-show",value:"liveOpen"===t.course.type,expression:"course.type === 'liveOpen'"}]},[t._v("直播")])]),t.course.hitNum?s("div",[s("i",{staticClass:"iconfont icon-renqi"}),t._v("\n        "+t._s(t.course.hitNum)+"\n      ")]):t._e()])]),s("div",{staticClass:"column-class-right"},[s("div",{staticClass:"column-class-right__top text-overflow"},[t._v("\n      "+t._s(t.course.title)+"\n    ")]),s("div",{staticClass:"column-class-right__live  text-overflow"},[s("span",{directives:[{name:"show",rawName:"v-show",value:"default"!==t.status,expression:"status!=='default'"}]},[t._v(t._s(t.formatTime(t.course.lesson.startTime))+" ")]),s("span",{staticClass:"live-time"},[t._v(t._s(t.formatHour(t.course.lesson.startTime)))]),s("span",{class:t.getStatusClass(t.status)},[t._v(" "+t._s(t._f("liveStatusText")(t.status)))]),s("i",{directives:[{name:"show",rawName:"v-show",value:"default"===t.status,expression:" status==='default' "}],staticClass:"iconfont icon-zhibo1"})])])])}),[],!1,null,null,null).exports,r=s("763b"),u=s("2f62"),l={components:{"e-openCourse-class":o},props:{courseList:{type:Object,default:function(){}},feedback:{type:Boolean,default:!0},index:{type:Number,default:-1},normalTagShow:{type:Boolean,default:!0},vipTagShow:{type:Boolean,default:!1},moreType:{type:String,default:"normal"},levelId:{type:Number,default:1},showMode:{type:String,default:"h5"}},filters:{courseListData:r.a},data:function(){return{}},computed:Object(i.a)({},Object(u.c)(["courseSettings","classroomSettings"]),{sourceType:{get:function(){return this.courseList.sourceType}},limitDays:{get:function(){return this.courseList.limitDays}},limit:{get:function(){return this.courseList.limit}},categoryId:{get:function(){return this.courseList.categoryId}},courseItemData:{get:function(){return!this.courseList.items.length},set:function(){}},pathName:{get:function(){return"appSetting"===this.$route.name||"appSetting"===this.$route.query.from?"appSetting":this.$route.name},set:function(){}},listObj:function(){return{type:"price",typeList:this.typeList,showStudent:!this.courseSettings||Number(this.courseSettings.show_student_num_enabled),classRoomShowStudent:!this.classroomSettings||this.classroomSettings.show_student_num_enabled}}}),watch:{limit:function(t,e){if(e>t){var s=this.courseList.items.slice(0,t);this.courseList.items=s}else this.fetchCourse()},limitDays:function(t){this.fetchCourse()},categoryId:function(t){this.fetchCourse()},sourceType:function(t,e){t!==e&&(this.courseList.items=[]),this.fetchCourse()}},created:function(){this.pathName.includes("Setting")&&this.fetchCourse()},methods:{fetchCourse:function(){if("custom"!==this.sourceType){var t={limit:this.limit,limitDays:this.limitDays,categoryId:this.categoryId};this.$emit("fetchCourse",{index:this.index,params:t,typeList:this.typeList})}}}},p=Object(c.a)(l,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return"h5"===t.showMode&&t.courseList.items.length||"admin"===t.showMode?s("div",{staticClass:"e-course-list"},[s("div",{staticClass:"e-course-list__header",staticStyle:{padding:"16px"}},[s("div",{staticClass:"clearfix"},[s("span",{staticClass:"e-course-list__list-title text-overflow",staticStyle:{"font-size":"16px"}},[t._v(t._s(t.courseList.title))]),t._m(0)])]),t.courseList.items.length?s("div",[s("div",{staticClass:"e-course-list__body nowarp prl16"},t._l(t.courseList.items,(function(e){return s("e-openCourse-class",{key:e.id,attrs:{course:e,feedback:t.feedback}})})),1),s("div",{directives:[{name:"show",rawName:"v-show",value:t.courseItemData,expression:"courseItemData"}],staticClass:"e-course__empty"},[t._v("暂无公开课")])]):t._e()]):t._e()}),[function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"e-course-list__more"},[e("span",{staticClass:"more-text pull-left",staticStyle:{"font-size":"12px"}},[this._v("更多")])])}],!1,null,null,null);e.a=p.exports},"50ad":function(t,e,s){"use strict";var i=s("a475");s.n(i).a},"5af2":function(t,e,s){"use strict";s("28a5"),s("6b54"),s("c5f6");var i=s("0d25"),a={mixins:[{methods:{timeExpire:function(t,e){return t?(t=Object(i.formatFullTime)(new Date(t)),e=Object(i.formatFullTime)(new Date(e)),"".concat(t," 至 ").concat(e)):(e=Object(i.formatFullTime)(new Date(e)),"有效期截止：".concat(e))},timeCalculation:function(t){var e=(new Date).setDate((new Date).getDate()+Number(t));return e=Object(i.formatFullTime)(new Date(e)),"有效期至：".concat(e)},priceHtml:function(t){var e=t.rate,s=t.type,i=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],a=parseInt(e,10),n=a.toString().length>3?"text-16 ml-5":"",c=Number(e).toFixed(2).split(".")[1];c=0===Number(c)?"":".".concat(c);var o="discount"===s?"折":"元";return i?'<span class="'.concat(n,'">').concat(a,'</span><span class="text-14">').concat(c+o,"</span>"):a+c+o},scopeFilter:function(t){var e=t.targetDetail,s=e.numType,i=e.product,a="";if("single"===s)switch(i){case"course":case"classroom":a="指定商品";break;case"vip":a="指定会员";break;default:a=""}else if("all"===s)switch(i){case"course":a="全部课程";break;case"classroom":a="全部班级";break;case"all":a="全部商品";break;case"vip":a="全部会员";break;default:a=""}else switch(i){case"course":case"classroom":a="部分商品";break;default:a=""}return a},handleClick:function(t){this.$emit("buttonClick",t)},receiveTimeExpire:function(t){return Object(i.formatchinaTime)(new Date(t))}}}],props:["item","num","feedback"],computed:{couponStatus:function(){if(!this.feedback)return"";var t=this.item.currentUserCoupon;return 0!=this.item.unreceivedNum||t?!t||"used"!==t.status&&"using"!==t.status?void 0:"coupon-used":"coupon-received-all"}}},n=s("2877"),c={components:{item:Object(n.a)(a,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{class:["e-coupon__body",t.couponStatus]},[s("div",{staticClass:"e-coupon__header clearfix"},[s("span",{staticClass:"e-coupon__price",domProps:{innerHTML:t._s(t.priceHtml(t.item))}}),s("div",{directives:[{name:"show",rawName:"v-show",value:1==t.num,expression:"num == 1"}],staticClass:"e-coupon__name"},[s("div",{staticClass:"text-overflow text-14 coupon-name"},[t._v(t._s(t.item.name))]),t.item.deadlineMode&&"time"!==t.item.deadlineMode?t._e():s("span",{staticClass:"text-10"},[t._v(t._s(t.timeExpire(t.item.createdTime,t.item.deadline)))]),"day"!==t.item.deadlineMode||t.item.currentUserCoupon?t._e():s("span",{staticClass:"text-10"},[t._v("领取后"+t._s(t.item.fixedDay)+"天内有效")]),"day"===t.item.deadlineMode&&t.item.currentUserCoupon?s("span",{staticClass:"text-10"},[t._v(t._s(t.timeExpire(t.item.createdTime,t.item.currentUserCoupon.deadline)))]):t._e()]),t.feedback?s("div",[0==t.item.unreceivedNum||t.item.currentUserCoupon?s("div",{staticClass:"stamp"}):t._e(),s("span",{staticClass:"coupon-button",on:{click:function(e){return t.handleClick(t.item)}}},[t._v(t._s(t.item.currentUserCoupon?"去使用":"领券"))])]):s("div",[s("span",{staticClass:"coupon-button"},[t._v("领券")])])]),s("div",{staticClass:"e-coupon__middle"}),s("div",{staticClass:"e-coupon__bottom text-overflow"},[t._v("\n    可用范围："+t._s(t.scopeFilter(t.item))+"\n  ")])])}),[],!1,null,null,null).exports},props:{coupons:{type:Array,default:function(){return[]}},feedback:{type:Boolean,default:!0},showTitle:{type:String,default:"show"}},computed:{couponNum:function(){return this.coupons.length>1?"e-coupon-multi":"e-coupon-single"}},methods:{handleClick:function(t){this.feedback&&this.$emit("couponHandle",t)}}},o=Object(n.a)(c,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"e-coupon"},["show"===t.showTitle?s("div",{staticClass:"e-coupon__title"},[t._v("优惠券")]):t._e(),s("div",{directives:[{name:"show",rawName:"v-show",value:t.coupons.length,expression:"coupons.length"}],class:["e-coupon__container","clearfix",t.couponNum]},[t.coupons.length>1?s("van-swipe",{attrs:{width:200,"show-indicators":!1,loop:!1,touchable:!0}},t._l(t.coupons,(function(e,i){return s("van-swipe-item",{key:i},[s("item",{attrs:{item:e,num:t.coupons.length,feedback:t.feedback},on:{buttonClick:function(e){return t.handleClick(e)}}})],1)})),1):t._l(t.coupons,(function(e,i){return s("item",{key:i,attrs:{item:e,num:t.coupons.length,feedback:t.feedback},on:{buttonClick:function(e){return t.handleClick(e)}}})}))],2)])}),[],!1,null,null,null);e.a=o.exports},"763b":function(t,e,s){"use strict";s("c5f6"),e.a=function(t,e){var s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";switch(e.type){case"price":return"appSetting"===s?function(t,e){var s,i=Number(t.price2.amount);return s=i>0&&"coin"===t.price2.currency?'<span style="color: #ff5353">'.concat(t.price2.coinAmount," ").concat(t.price2.coinName,"</span>"):i>0&&"RMB"===t.price2.currency?'<span style="color: #ff5353">¥ '.concat(t.price2.amount,"</span>"):'<span style="color: #20B573">免费</span>',"classroom_list"===e.typeList?{id:t.id,targetId:t.targetId,studentNum:e.classRoomShowStudent?t.studentNum:null,imgSrc:{url:t.cover.middle||"",className:""},header:t.title,middle:{value:t.courseNum,html:"<span>共 ".concat(t.courseNum," 门课程</span>")},bottom:{value:t.price,html:"<span>".concat(s,"</span>")}}:{id:t.id,studentNum:e.showStudent?t.studentNum:null,imgSrc:{url:t.courseSet.cover.middle||"",className:""},header:t.courseSetTitle,middle:{value:t.title,html:" <span>".concat(t.title,"</span>")},bottom:{value:t.price,html:"<span>".concat(s,"</span>")}}}(t,e):function(t,e){var s=e.showStudent?'<span class="switch-box__state">\n            <p style="color: #B0BDC9">'.concat(t.studentNum,"人在学</p>\n        </span>"):"",i="0.00"===t.price?'<p style="color: #408FFB">免费</p>':'<p style="color: #ff5353">¥ '.concat(t.price,"</p>");return"classroom_list"===e.typeList?{id:t.id,targetId:t.targetId,imgSrc:{url:t.cover.middle||"",className:"e-course__img"},header:t.title,middle:{value:t.courseNum,html:'<div class="e-course__count">共 '.concat(t.courseNum," 门课程</div>")},bottom:{value:t.price||t.studentNum,html:'<span class="switch-box__price">'.concat(i,'</span>\n                  <span class="switch-box__state"><p style="color: #B0BDC9">\n                    ').concat(t.studentNum,"人在学</p>\n                  </span>")}}:{id:t.id,imgSrc:{url:t.courseSet.cover.middle||"",className:"e-course__img"},header:t.courseSetTitle,middle:{value:t.title,html:'<div class="e-course__project text-overflow">\n                  <span>'.concat(t.title,"</span>\n                </div>")},bottom:{value:t.price||t.studentNum,html:'<span class="switch-box__price">'.concat(i,"</span>").concat(s)}}}(t,e);case"confirmOrder":return{imgSrc:{url:t.cover.middle||"",className:"e-course__img"},header:t.title,middle:"",bottom:{value:t.coinPayAmount,html:'<span class="switch-box__price">\n                  <p style="color: #ff5353">¥ '.concat(t.coinPayAmount,"</p>\n                </span>")}};case"rank":return"classroom_list"===e.typeList?{id:t.id,targetId:t.targetId,imgSrc:{url:t.cover.middle||"",className:"e-course__img"},header:t.title,middle:"",bottom:{value:t.courseNum,html:'<div class="e-course__count">共 '.concat(t.courseNum," 门课程</div>")}}:{id:t.id,imgSrc:{url:t.courseSet.cover.middle||"",className:"e-course__img"},header:t.courseSetTitle,middle:{value:t.title,html:'<div class="e-course__project text-overflow">\n                  <span>'.concat(t.title,"</span>\n                </div>")},bottom:{value:t.progress.percent,html:'<div class="rank-box">\n                  <div class="progress round-conner">\n                    <div class="curRate round-conner"\n                      style="width:'.concat(t.progress.percent,'%">\n                    </div>\n                  </div>\n                  <span>').concat(t.progress.percent,"%</span>\n                </div>")}};default:return"empty data"}}},"7f80":function(t,e,s){"use strict";var i={name:"e-graphic-navigation",props:{graphicNavigation:{type:Array,default:function(){return[]}}},data:function(){return{itemLength:5}},methods:{getGraphicClass:function(t){return t>=this.itemLength?"graphicNavigation__warp__small":"graphicNavigation__warp__normal"},getDefaultImg:function(t){switch(t){case"openCourse":return"static/images/openCourse.png";case"course":return"static/images/hotcourse.png";case"classroom":return"static/images/hotclass.png";default:return"static/images/graphic/default/icon@2x.png"}},getListCount:function(t){return new Array(Math.ceil(t.length/this.itemLength))},sliceList:function(t,e){return t.slice(e*this.itemLength,(e+1)*this.itemLength)}}},a=s("2877"),n=Object(a.a)(i,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"e-graphic-navigation"},t._l(t.getListCount(t.graphicNavigation),(function(e,i){return s("div",{key:i,staticClass:"graphicNavigation__warp",class:t.getGraphicClass(t.graphicNavigation.length)},t._l(t.sliceList(t.graphicNavigation,i),(function(e,i){return s("div",{key:i,class:["graphicNavigation__item"]},[e.image.uri?s("img",{staticClass:"graphicNavigation__img",attrs:{src:e.image.uri}}):s("img",{staticClass:"graphicNavigation__img",attrs:{src:t.getDefaultImg(e.link.type)}}),s("span",{staticClass:"graphicNavigation__text"},[t._v(t._s(e.title))])])})),0)})),0)}),[],!1,null,null,null);e.a=n.exports},"92a2":function(t,e,s){"use strict";e.a={h5Setting:"h5",miniprogramSetting:"miniprogram",appSetting:"apps"}},a475:function(t,e,s){},e32a:function(t,e,s){"use strict";s("c5f6"),s("ac6a"),s("8615"),s("6b54");var i=s("0d25"),a={props:{activity:{type:Object,default:{}}},data:function(){return{timer:null,counting:!0,seckillClass:"seckill-unstart",seckilling:!1,buyCountDownText:"",endCountDownText:""}},computed:{statusTitle:{get:function(){var t=this.activity.status;if("unstart"===t)return this.counting=!1,"秒杀未开始";if("closed"===t)return this.counting=!1,this.seckillClass="seckill-closed","秒杀已结束";if("ongoing"===t){if(!this.counting)return"秒杀已结束";if(0==this.activity.productRemaind)return this.counting=!1,this.seckillClass="seckill-closed",this.$emit("sellOut",!0),"商品已售空";var e=(new Date).getTime();if(this.startStamp<e&&e<this.endStamp)return this.seckilling=!0,this.counting=!0,this.seckillClass="seckill-ongoing",'距离结束仅剩<span class="ml10 mlm">'.concat(this.endCountDownText,"</span>");if(this.startStamp>e)return this.seckilling=!1,this.counting=!0,this.seckillClass="seckill-unstart",'距离开抢<span class="ml10 mlm">'.concat(this.buyCountDownText,"</span>")}},set:function(){}},startStamp:function(){return new Date(this.activity.startTime).getTime()},endStamp:function(){return new Date(this.activity.endTime).getTime()}},created:function(){this.countDownTime()},beforeDestroy:function(){this.clearInterval()},methods:{countDownTime:function(){var t=this;this.timer=setInterval((function(){t.endCountDownText=Object(i.dateTimeDown)(t.endStamp),t.buyCountDownText=Object(i.dateTimeDown)(t.startStamp),"已到期"==t.endCountDownText&&(t.seckillClass="seckill-closed",t.counting=!1,t.clearInterval(),t.$emit("timesUp"))}),1e3)},clearInterval:function(t){function e(){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}((function(){clearInterval(this.timer),this.timer=null}))}},n=(s("50ad"),s("2877")),c={name:"EGroupon",components:{countDown:Object(n.a)(a,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{class:["seckill-countdown-container clearfix",this.seckillClass]},[e("span",{staticClass:"pull-left status-title"},[this._v("秒杀"+this._s("ongoing"===this.activity.status&&this.seckilling?"中":""))]),e("div",{staticClass:"pull-right text-12",domProps:{innerHTML:this._s(this.statusTitle)}})])}),[],!1,null,null,null).exports},props:{activity:{type:Object,default:{}},tag:{type:String,default:""},showTitle:{type:String,default:"show"},type:{type:String,default:"groupon"},feedback:{type:Boolean,default:!0}},data:function(){return{counting:!0,isEmpty:!1,bgGrey:!1}},computed:{activityData:function(){return!!Object.values(this.activity).length},activityId:function(){return Number(this.activity.id)},activityTitle:function(){return"seckill"===this.type?"秒杀":"cut"===this.type?"砍价":"拼团"},activityPrice:function(){return Object.values(this.activity).length?"seckill"===this.type?this.activity.rule.seckillPrice:"cut"===this.type?this.activity.rule.lowestPrice:"groupon"===this.type?this.activity.rule.ownerPrice:void 0:"00.00"},grouponStatus:function(){var t=this.activity.status;if("ongoing"===t&&!this.counting)return this.activity.status="closed","".concat({seckill:"秒杀",cut:"砍价",groupon:"拼团"}[this.type],"已结束");switch(this.type){case"groupon":if("unstart"===t)return"拼团未开始";if("ongoing"===t)return"去拼团";if("closed"===t)return"拼团已结束";break;case"seckill":if("unstart"===t)return"秒杀未开始";if("closed"===t)return"秒杀已结束";if("ongoing"===t){if(0==this.activity.productRemaind)return"商品已售空";var e=(new Date).getTime(),s=new Date(this.activity.startTime).getTime(),i=new Date(this.activity.endTime).getTime();if(s<e&&e<i)return"马上秒";if(s>e)return this.bgGrey=!0,"秒杀未开始"}break;case"cut":if("unstart"===t)return"砍价未开始";if("ongoing"===t)return"发起砍价";if("closed"===t)return"砍价已结束"}}},methods:{getMarketUrl:function(t){this.feedback&&this.$emit("activityHandle",this.activityId)},expire:function(){this.counting=!1},sellOut:function(){this.isEmpty=!0}}},o=Object(n.a)(c,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"e-groupon",on:{click:function(e){return t.getMarketUrl(t.activity.status)}}},["show"===t.showTitle?s("div",{staticClass:"e-coupon__title"},[t._v(t._s(t.activityTitle))]):t._e(),s("div",{staticClass:"e-groupon__image-container",class:{"e-groupon__image-empty":!t.activity.cover}},[t.activity.cover?s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.activity.cover,expression:"activity.cover"}],staticClass:"e-groupon__image",attrs:{alt:""}}):t._e(),t.tag.length?s("div",{staticClass:"e-groupon__tag"},[t._v(t._s(t.tag))]):t._e()]),t.activityData&&"seckill"===t.type&&t.counting&&!t.isEmpty&&"ongoing"===t.activity.status?s("countDown",{attrs:{activity:t.activity},on:{timesUp:t.expire,sellOut:t.sellOut}}):t._e(),s("div",{staticClass:"e-groupon__context"},[s("div",{staticClass:"context-title text-overflow"},[t._v(t._s(t.activity.name||"活动名称"))]),s("div",{staticClass:"context-sale clearfix"},["groupon"!==t.type?s("div",{staticClass:"type-tag"},[t._v(t._s("cut"===t.type?"砍价享":"秒杀价"))]):t._e(),s("div",{staticClass:"context-sale__sale-price"},[t._v("￥"+t._s(t.activityPrice))]),t.activity.originPrice?s("div",{staticClass:"context-sale__origin-price"},[t._v("原价￥"+t._s(t.activity.originPrice))]):t._e(),s("a",{staticClass:"context-sale__shopping",class:[t.activity.status,{"bg-grey":t.isEmpty||t.bgGrey}],attrs:{href:"javascript:;"}},[t._v("\n        "+t._s(t.grouponStatus)+"\n      ")])])])],1)}),[],!1,null,null,null);e.a=o.exports},f953:function(t,e,s){"use strict";s("7f7f");var i=[{name:"find",type:"发现",iconUrl:"static/images/apptab1.png"},{name:"dynamic",type:"学习",iconUrl:"static/images/apptab2.png"},{name:"learn",type:"动态",iconUrl:"static/images/apptab3.png"},{name:"my",type:"我的",iconUrl:"static/images/apptab4.png"}],a=[{name:"find",type:"发现",icon:"iconfont icon-faxian"},{name:"learning",type:"学习",icon:"iconfont icon-xuexi"},{name:"my",type:"我的",icon:"iconfont icon-faxian"}],n={name:"FindFooter",props:{portal:{type:String,default:""}},data:function(){return{items:[]}},computed:{footerItemStyle:function(){return{width:"".concat(100/this.items.length,"%")}}},watch:{portal:{handler:function(t){this.items="apps"===t?i:a},immediate:!0}},methods:{getClassName:function(t){return"find"===t.name&&"apps"===this.portal?"app-active":"find"===t.name?"active":""}}},c=s("2877"),o=Object(c.a)(n,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.items.length>0?s("div",{staticClass:"find-footer"},t._l(t.items,(function(e){return s("div",{key:e.type,staticClass:"find-footer-item",class:t.getClassName(e),style:t.footerItemStyle},[s("div",{staticClass:"find-footer-item__icon"},[e.icon?s("i",{class:e.icon}):s("img",{staticClass:"find-footer-item__icon",attrs:{src:e.iconUrl}})]),s("span",{staticClass:"find-footer-item__text"},[t._v(t._s(e.type))])])})),0):t._e()}),[],!1,null,null,null);e.a=o.exports}}]);