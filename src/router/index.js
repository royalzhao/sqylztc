import Vue from 'vue'
import Router from 'vue-router'
import {post,fetch,patch,put} from '@/util/http'
import {delCookie,getCookie} from '@/util/util'

import index from '@/components/page/index'
import login from '@/components/login/login'
import DLogin from '@/components/login/DLogin'
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

import article from '@/components/page/article'
import chatContent from '@/components/page/chatContent'
import search from '@/components/page/search'
import orderList from '@/components/page/orderList'
import forget from '@/components/page/forget'
import addOrder from '@/components/form/addOrder'
import myOrderList from '@/components/page/myOrderList'


Vue.use(Router)


const routes =  [
    {
      path: '/sqztc',
      component: index, //主页
      children:[        //子页
        {
          path:'',
          component:healthy
        },
        {
          path:'/sqztc/healthy',
          name:'healthy',
          component:healthy
        },
        {
          path:'/sqztc/family',
          name:'family',
          component:family
        },
        {
          path:'/sqztc/addPerson',
          component:addPerson
        },
        {
          path:'/sqztc/updatePerson',
          component:updatePerson
        },
        {
          path:'/sqztc/chatList',
          name:'chatList',
          component:chatList
        },
        {
          path:'/sqztc/consult',
          name:'consult',
          component:consult
        },
        
        {
          path:'/sqztc/article',
          component:article
        },
        {
          path:'/sqztc/chatContent',
          component:chatContent
        },
        {
          path:'/sqztc/orderList',
          name:'orderList',
          component:orderList
        },
        {
          path:'/sqztc/addOrder',
          name:'addOrder',
          component:addOrder
        },
        {
          path:'/sqztc/myOrderList',
          name:'myOrderList',
          component:myOrderList
        },

        {
          path:'/sqztc/search',
          component:search,
          children:[        //子页
            {
              path:':info',
              name:'search',
              component:search
            }
          ]
        },
       ]
    },{
      path: '/sqztc/register',//注册页
      component: register,
      name: '注册'
     
    },
    {
      path:'/sqztc/forget',
      name:'forget',
      component:forget
    },{
      path: '/sqztc/login',
      component: login,//登录页
      name: '登录'
     
    },{
      path: '/sqztc/DLogin',
      component: DLogin,//登录页
      name: '登录'
     
    },{
      path: '/sqztc/setting',//设置页
      component: setting,
      children:[        //子页
        {
          path:'',
          component:me
        },
        {
          path:'/sqztc/setting/me',
          name:'me',
          component:me
        },
        {
          path:'/sqztc/setting/del',
          component:del
        },
      ]
    }
  
];

const router = new Router({
  mode: 'history',
  routes
});
//这个是请求页面路由的时候会验证cookie存不存在，不存在的话会到登录页
router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/sqztc/login')) {
    delCookie('username');
    delCookie('userType');
    next()
  }else if(to.path.startsWith('/sqztc/register')){
    next()
  }else if(to.path.startsWith('/sqztc/forget')){
    next()
  }else if(to.path.startsWith('/sqztc/DLogin')){
    delCookie('username');
    delCookie('userType');
    next()
  } else {
    let user = getCookie('username');
    if (!user) {
      next({path: '/sqztc/login'})
    } else {
      next()
    }
  }

});
export default router;
