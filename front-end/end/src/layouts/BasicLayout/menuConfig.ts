const headerMenuConfig = [];

const asideMenuConfig = [
  {
    name: '博客相关',
    path: '/',
    icon: 'chart-pie',
    children: [
      {
        name: '写博客',
        path: '/blog/write',
      },
      {
        name: '博客管理',
        path: '/blog/manage',
      },
    ],
  },
  {
    name: '数据页面',
    path: '/',
    icon: 'chart-pie',
    children: [
      {
        name: '分析页面',
        path: '/dashboard/analysis',
      },
      {
        name: '监控页面',
        path: '/dashboard/monitor',
      },
      {
        name: '工作台',
        path: '/dashboard/workplace',
      },
    ],
  },
  {
    name: '表单页面',
    path: '/',
    icon: 'copy',
    children: [
      {
        name: '单列表单',
        path: '/form/basic',
      },
      {
        name: '两列表单',
        path: '/form/two',
      },
      {
        name: '三列表单',
        path: '/form/three',
      },
      {
        name: '四列表单',
        path: '/form/four',
      },
      {
        name: '分步表单',
        path: '/form/step',
      },
      {
        name: '分类表单',
        path: '/form/classified',
      },
      {
        name: '分组表单',
        path: '/form/group',
      },
      {
        name: '流程表单',
        path: '/form/flow',
      },
      {
        name: '分级表单',
        path: '/form/hierarchical',
      },
    ],
  },
  {
    name: '列表页面',
    path: '/',
    icon: 'chart-bar',
    children: [
      {
        name: '基础列表',
        path: '/list/basic',
      },
      {
        name: '卡片列表',
        path: '/list/card',
      },
      {
        name: '表格列表',
        path: '/list/table',
      },
    ],
  },
  {
    name: '详情页面',
    path: '/',
    icon: 'calendar',
    children: [
      {
        name: '基础详情',
        path: '/detail/basic',
      },
      {
        name: '高级详情',
        path: '/detail/advanced',
      },
    ],
  },
  {
    name: '设置页面',
    path: '/',
    icon: 'set',
    children: [
      {
        name: '个人设置',
        path: '/person',
      },
    ],
  },
];

export { headerMenuConfig, asideMenuConfig };
