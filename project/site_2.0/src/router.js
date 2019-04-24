import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const PageHome = () => import(/* webpack-chunk-name: "PageHome" */ './components/pages/PageHome.vue');
const PageUserSingle = () => import(/* webpack-chunk-name: "PageUserSingle" */ './components/pages/PageUserSingle.vue');

export default new VueRouter({
    routes: [
        {
            name: "home",
            path: "/",
            component: PageHome,
        },
        {
            name: "user-single",
            path: "/user/:id",
            component: PageUserSingle,
            props: true,
        }
    ],
    mode: "history",
})