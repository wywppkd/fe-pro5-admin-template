import permissionMap from '../src/utils/permissionMap';

export default [
  {
    path: '/user',
    layout: false, // 不展示layout
    routes: [
      {
        name: '登录',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/welcome',
    name: '欢迎', // 对应菜单名,面包屑名,页面title
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: permissionMap.index,
    routes: [
      {
        path: '/admin/sub-page',
        name: '二级管理页',
        icon: 'smile',
        access: permissionMap.index_item,
        component: './Admin',
      },
    ],
  },
  {
    name: '查询表格',
    icon: 'table',
    path: '/list',
    access: permissionMap.table,
    component: './ListTableList',
  },
  {
    name: 'Pro组件示例',
    path: '/my',
    icon: 'Apartment',
    routes: [
      {
        name: 'ProTable组件',
        icon: 'table',
        path: '/my/my-list',
        access: permissionMap.table,
        component: './MyList',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
