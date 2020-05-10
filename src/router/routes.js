
const routes = [
  
  {
    path: '/admin',
    component: () => import('layouts/AdminBaseLayout.vue'),
    children: [
      { path: '', component: () => import('pages/admin/Index.vue') },
      { path: 'candidates', component: () => import('pages/admin/Candidates.vue') },
      { path: 'licencas', component: () => import('pages/admin/license.vue') },

     
      { path: 'users', component: () => import('pages/admin/Users.vue') },
      { path: 'nopermission', component: () => import('pages/admin/NoPermission.vue') },
      { path: 'relatorios', component: () => import('pages/admin/Reports.vue') },


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
