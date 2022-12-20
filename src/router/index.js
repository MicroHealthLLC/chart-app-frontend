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
import Reports from "../views/Reports.vue";
// import PersonalReports from "../views/PersonalReports.vue";
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
    path: "/dashboards",
    name: "NewDashboards",
    component: Dashboards,
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
    path: "/channel-card",
    name: "ChannelCard",
    component: () =>
      import("../components/ChannelCard.vue"),
  },
  {
    path: "/news",
    name: "News",
    component: News,
  },
  {
    path: "/:title/add-data-set",
    name: "AddDataSet",
    component: AddDataSet,
  },
  {
    path: "/:title/data-sets",
    name: "DataSets",
    component: DataSets,
  },
  {
    path: "/:title",
    name: "ChannelHome",
    component: () =>
    import("../views/ChannelHome.vue"),
},
  {
    path: "/:title/data-sets/:dataSetId",
    name: "DataSet",
    component: DataSet,
  },
  {
    path: "/public-reports",
    name: "PublicReports",
    component: PublicReports,
  },
  {
    path: "/:title/reports",
    name: "Reports",
    component: Reports,
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
    name: "Channel",
    component: Channel,
  },
  {
    path: "/channel/:title/add-report",
    name: "AddReport",
    component: AddReport,
  },
  {
    path: "/:title/reports",
    name: "ChannelReports",
    component: ChannelReports,
  },
  {
    path: "/:title/reports/:reportId",
    name: "Report",
    component: Report,
  },
  {
    path: "/add-dashboard",
    name: "AddDashboard",
    component: AddDashboard,
  },
  {
    path: "/:title/dashboards",
    name: "Dashboards",
    component: Dashboards,
  },
  {
    path: "/:title/dashboards/:dashboardId",
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

