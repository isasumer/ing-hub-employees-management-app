import './pages/employee-list';
import './pages/add-new-employee';
import './pages/home';
import {Router} from '@vaadin/router';

export const views = [
  {
    path: '',
    component: 'home-view',
    title: '',
    action: async () => await import('./pages/home'),
  },
  {
    path: 'employee-list',
    component: 'employee-list',
    title: 'Employee List',
    action: async () => await import('./pages/employee-list'),
  },
  {
    path: 'edit-employee',
    component: 'edit-employee',
    title: 'Edit Employee',
    action: async () => await import('./pages/edit-employee'),
  },
  {
    path: 'add-new-employee',
    component: 'add-new-employee',
    title: 'Create New Employee',
  },
  {
    path: 'employee-details/edit/:id',
    component: 'employee-details',
    title: 'Employee Details',
    action: (context) => {
      const el = document.createElement('employee-form');
      el.id = context.params.id;
      return el;
    },
  },
];

export const routes = [...views];

export const createRouter = (outlet) => new Router(outlet);
