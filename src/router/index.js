import { createRouter, createWebHistory } from 'vue-router'
import AdministratorDashboard from '@/views/auth/AdministratorDashboard.vue'
import ClientDashboard from '@/views/auth//ClientDashboard.vue'
import ContactTechnician from '@/views/auth/ContactTechnician.vue'
import ForgotPasswordView from '@/views/auth/ForgotPasswordView.vue'
import LoginView from '@/views/auth/loginView.vue'
import PlumberDashboard from '@/views/auth/PlumberDashboard.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import ReportaLeak from '@/views/auth/ReportaLeak.vue'
import ReportLeaksPage from '@/views/auth/ReportLeaksPage.vue'
import SettingsPage from '@/views/auth/SettingsPage.vue'
import WaterlineTechnicianDashboard from '@/views/auth/WaterlineTechnicianDashboard.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/administrator-dashboard',
      name: 'administrator-dashboard',
      component: AdministratorDashboard,
    },
    {
      path: '/client-dashboard',
      name: 'client-dashboard',
      component: ClientDashboard,
    },
    {
      path: '/technician-dashboard',
      name: 'technician-dashboard',
      component: ContactTechnician,
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPasswordView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/plumber-dashboard',
      name: 'plumber-dashboard',
      component: PlumberDashboard,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/report-leak',
      name: 'report-leak',
      component: ReportaLeak,
    },
    {
      path: '/report-leaks',
      name: 'report-leaks',
      component: ReportLeaksPage,
    },
    { path: '/settings', name: 'settings', component: SettingsPage },
    {
      path: '/waterline-technician-dashboard',
      name: 'waterline-technician-dashboard',
      component: WaterlineTechnicianDashboard,
    },
    {
      path: '/',
      redirect: '/login',
    },
  ],
})

export default router
