import { createRouter, createWebHistory } from 'vue-router'

// Import views
import Home from './views/Home.vue'
import Calculator from './views/Calculator.vue'
import TrainingGuide from './views/TrainingGuide.vue'
import Articles from './views/Articles.vue'
import ArticleDetail from './views/ArticleDetail.vue'
import About from './views/About.vue'
import PrivacyPolicy from './views/PrivacyPolicy.vue'
import TermsOfService from './views/TermsOfService.vue'
// TestPage and SimpleArticles components are removed as they don't exist in the repository
import NewArticles from './views/NewArticles.vue'
import NewArticleDetail from './views/NewArticleDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Dunk Calculator | Advanced Basketball Dunking Analysis'
    }
  },
  {
    path: '/calculator',
    name: 'Calculator',
    component: Calculator,
    meta: {
      title: 'Basketball Dunk Calculator | Calculate Your Dunking Potential'
    }
  },
  {
    path: '/training',
    name: 'Training',
    component: TrainingGuide,
    meta: {
      title: 'Basketball Dunking Training Guide | Improve Your Vertical Jump'
    }
  },
  {
    path: '/articles',
    name: 'Articles',
    component: Articles,
    meta: {
      title: 'Basketball Dunking Articles | Scientific Insights on Dunking'
    }
  },
  {
    path: '/articles/:id',
    name: 'ArticleDetail',
    component: ArticleDetail,
    meta: {
      title: 'Basketball Dunking Article'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: 'About Dunk Calculator | Our Mission and Science'
    }
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy,
    meta: {
      title: 'Privacy Policy | Dunk Calculator'
    }
  },
  {
    path: '/terms-of-service',
    name: 'TermsOfService',
    component: TermsOfService,
    meta: {
      title: 'Terms of Service | Dunk Calculator'
    }
  },
  // TestPage and SimpleArticles routes are removed as they don't exist in the repository
  {
    path: '/new-articles',
    name: 'NewArticles',
    component: NewArticles,
    meta: {
      title: 'Basketball Articles | Dunk Calculator'
    }
  },
  {
    path: '/new-articles/:id',
    name: 'NewArticleDetail',
    component: NewArticleDetail,
    meta: {
      title: 'Article | Dunk Calculator'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

// Update page title based on route meta
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Dunk Calculator'
  next()
})

export default router
