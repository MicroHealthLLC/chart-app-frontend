import Vue from "vue";
import VueRouter from "vue-router";
import { Auth } from "@aws-amplify/auth";
// import userStore from "../store/modules/user-store";

// import Home from "../views/Home.vue";
import News from "../views/News.vue";

import AddDataSet from "../views/AddDataSet.vue";
import DataSet from "../views/DataSet.vue";
import DataSets from "../views/DataSets.vue";

import PublicReports from "../views/PublicReports.vue";
import PersonalReports from "../views/PersonalReports.vue";
import GroupReports from "../views/GroupReports.vue";

import AddChannel from "../views/AddChannel.vue";
import Channels from "../views/Channels.vue";
import Channel from "../views/Channel.vue";
import ChannelReports from "../views/ChannelReports.vue";
import AddReport from "../views/AddReport.vue";
import Report from "../views/Report.vue";

import AddDashboard from "../views/AddDashboard.vue";
import Dashboards from "../views/Dashboards.vue";
import Dashboard from "../views/Dashboard.vue";
import ChannelDashboards from "../views/ChannelDashboards.vue";

import Forbidden from "../views/Forbidden.vue"
import store from "../store";

Vue.use(VueRouter);

const routes = [
    {
    path: "/signin",
    name: "Signin",
    component: () =>
      import("../views/auth/Signin.vue"),
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () =>
      import("../views/auth/SignUp.vue"),
  },
  {
    path: "/reset-password",
    name: "ResetPW",
    component: () =>
      import("../views/auth/ResetPW.vue"),
  },
  {
    path: "/verify",
    name: "SignUpVerify",
    props: true,
    component: () =>
      import("../views/auth/SignUpVerify.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: () =>
      import("../views/Home.vue"),
  },
  {
    path: "/news",
    name: "News",
    component: News,
  },
  {
    path: "/add-data-set",
    name: "AddDataSet",
    component: AddDataSet,
  },
  {
    path: "/data-sets",
    name: "DataSets",
    component: DataSets,
  },
  {
    path: "/data-sets/:dataSetId",
    name: "DataSet",
    component: DataSet,
  },
  {
    path: "/public-reports",
    name: "PublicReports",
    component: PublicReports,
  },
  {
    path: "/personal-reports",
    name: "PersonalReports",
    component: PersonalReports,
  },
  {
    path: "/group-reports",
    name: "GroupReports",
    component: GroupReports,
  },
  {
    path: "/add-channel",
    name: "AddChannel",
    component: AddChannel,
  },
  {
    path: "/channels",
    name: "Channels",
    component: Channels,
  },
  {
    path: "/channels/:channelId",
    redirect: "/channels/:channelId/reports",
    name: "Channel",
    component: Channel,
  },
  {
    path: "/add-report",
    name: "AddReport",
    component: AddReport,
  },
  {
    path: "/channels/:channelId/reports",
    name: "ChannelReports",
    component: ChannelReports,
  },
  {
    path: "/channels/:channelId/reports/:reportId",
    name: "Report",
    component: Report,
  },
  {
    path: "/add-dashboard",
    name: "AddDashboard",
    component: AddDashboard,
  },
  {
    path: "/dashboards",
    name: "Dashboards",
    component: Dashboards,
  },
  {
    path: "/channels/:channelId/dashboards/:dashboardId",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/channels/:channelId/dashboards",
    name: "ChannelDashboards",
    component: ChannelDashboards,
  },
  {
    path: "/forbidden",
    name: "Forbidden",
    component: Forbidden,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes,
});

router.beforeEach(async (to, from, next) => {
  /* console.log(to)
  console.log(VueRouter)
  console.log(store) */
  // const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  // const requiresEditor = to.matched.some(
  //   (record) => record.meta.requiresEditor
  // );
  // let isEditor = false;
  let currentUserInfo = null;

  if (store.getters.user) {
    // isEditor = store.getters.isEditor;
    currentUserInfo = store.getters.user;
  } else {
    currentUserInfo = await Auth.currentUserInfo();
    // if (currentUserInfo) {
    //   const userCredentials = await Auth.currentAuthenticatedUser();
      // const groups =
      //   userCredentials.signInUserSession.accessToken.payload[
      //     "cognito:groups"
      //   ] || [];
      // isEditor = groups.includes("Editors");
    // }
  }
  // isEditor
 if (!currentUserInfo) {
    next("/signin");
  } else {
    next();
  }
});

export default router;

