
const routes = [
  
  {
    path: '/admin',
    component: () => import('layouts/AdminBaseLayout.vue'),
    children: [
      { path: '', component: () => import('pages/admin/Index.vue') },
      { path: 'archeologic', component: () => import('pages/admin/Archeologic.vue') },
      { path: 'licencas', component: () => import('pages/admin/license.vue') },

     
      { path: 'users', component: () => import('pages/admin/UsersPage.vue') },
      { path: 'roles', component: () => import('pages/admin/userRoles.vue') },
       { path: 'nopermission', component: () => import('pages/admin/NoPermission.vue') },
      { path: 'relatorios', component: () => import('pages/admin/Reports.vue') },
      { path: 'pdf', component: () => import('pages/admin/viewPdf.vue') },


    ],

  },
  {
      path: '/',
      component: () => import('layouts/AuthLayout.vue'),
      children: [
          { path: '/', component: () => import('pages/auth/Login.vue') },
          { path: '/register', component: () => import('pages/auth/Register.vue') },
      ]
  },
  
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
