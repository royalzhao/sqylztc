import Vue from 'vue'
import Router from 'vue-router'
import {post,fetch,patch,put} from '@/util/http'
import {delCookie,getCookie} from '@/util/util'

import index from '@/components/page/index'
import login from '@/components/login/login'
import register from '@/components/login/register'

import healthy from '@/components/page/healthy'
import family from '@/components/page/family'
import addPerson from '@/components/form/addPerson'
import updatePerson from '@/components/form/updatePerson'
import chatList from '@/components/page/chatList'
import setting from '@/components/page/setting'
import me from '@/components/setting/me'
import del from '@/components/setting/del'
import consult from '@/components/page/consult'
import order from '@/components/page/order'
import article from '@/components/page/article'
import chatContent from '@/components/page/chatContent'


Vue.use(Router)


const routes =  [
    {
      path: '/',
      component: index, //主页
      children:[        //子页
        {
          path:'',
          component:healthy
        },
        {
          path:'/healthy',
          component:healthy
        },
        {
          path:'/family',
          component:family
        },
        {
          path:'/addPerson',
          component:addPerson
        },
        {
          path:'/updatePerson',
          component:updatePerson
        },
        {
          path:'/chatList',
          component:chatList
        },
        {
          path:'/consult',
          component:consult
        },
        {
          path:'/order',
          component:order
        },
        {
          path:'/article',
          component:article
        },
        {
          path:'/chatContent',
          component:chatContent
        },
       ]
    },{
      path: '/register',//注册页
      component: register,
      name: '注册'
     
    },{
      path: '/login',
      component: login,//登录页
      name: '登录'
     
    },{
      path: '/setting',//设置页
      component: setting,
      children:[        //子页
        {
          path:'',
          component:me
        },
        {
          path:'/setting/me',
          component:me
        },
        {
          path:'/setting/del',
          component:del
        },
      ]
    }
  
];

const router = new Router({
  mode: 'history',
  routes
});
export default router;
