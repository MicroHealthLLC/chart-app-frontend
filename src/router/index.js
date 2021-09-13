import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
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
import Report from "../views/Report.vue";

import AddDashboard from "../views/AddDashboard.vue";
import Dashboards from "../views/Dashboards.vue";
import Dashboard from "../views/Dashboard.vue";
import ChannelDashboards from "../views/ChannelDashboards.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
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
    component: Report,
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
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: function () {
  //     return import(/* webpackChunkName: "about" */ "../views/About.vue");
  //   },
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
