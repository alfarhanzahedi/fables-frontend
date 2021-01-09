import Vue from "vue";
import VueRouter from "vue-router";

import store from "../store/index.js";

Vue.use(VueRouter);

const DEFAULT_TITLE = "Fables";

const routes = [
  {
    path: "/accounts/signin",
    name: "SignIn",
    component: () => import("../views/SignIn.vue"),
    meta: {
      title: "Sign In | Fables"
    }
  },
  {
    path: "/accounts/email-verification",
    name: "EmailVerification",
    component: () => import("../views/EmailVerification.vue"),
    meta: {
      title: "Email Verification | Fables"
    }
  },
  {
    path: "/",
    name: "Feed",
    component: () => import("../views/Feed.vue")
  },
  {
    path: "/feed",
    name: "AlternateFeed",
    component: () => import("../views/Feed.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
    meta: {
      requiresAuth: true,
      title: "Dashboard | Fables"
    }
  },
  {
    path: "/organization/onboard",
    name: "OrganizationCreationForm",
    component: () => import("../views/OrganizationCreationForm.vue"),
    meta: {
      requiresAuth: true,
      title: "Onboard Organization | Fables"
    }
  },
  {
    path: "/organization/:organizationId",
    name: "OrganizationDetail",
    component: () => import("../views/OrganizationDetail.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some(record => record.meta.requiresAuth) &&
    store.state.auth.isUserAuthenticated == false
  ) {
    next({ name: "SignIn" });
  } else {
    next();
  }
});

router.afterEach(to => {
  // Use next tick to handle router history correctly
  // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  Vue.nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE;
  });
});

export default router;
