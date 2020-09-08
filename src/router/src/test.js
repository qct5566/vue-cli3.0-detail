// import { lazyComponentNew } from '@/utils/files';
export default [
  {
    path: '/test',
    name: 'test',
    component: () => import(`@/views/test/index`),
    meta: {
      title: '测试',
      icon: ''
    }
  },
  {
    path: '/table',
    name: 'table',
    component: () => import(`@/views/antdesign/index`),
    meta: {
      title: '测试',
      icon: ''
    }
  }
]
