import Slide from './components/Slide'

export const routes = [
  { path: '*', redirect: '/slide/1' },
  { path: '/slide/:id', component: Slide }
];
