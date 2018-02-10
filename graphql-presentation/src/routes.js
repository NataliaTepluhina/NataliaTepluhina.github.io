import Slide from './components/Slide'

export const routes = [
  { path: '*', redirect: '/slide/0' },
  { path: '/slide/:id', component: Slide }
];
