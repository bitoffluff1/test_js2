import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const PageHome = () => import(/* webpack-chunk-name: "PageHome" */ './components/pages/PageHome.vue');
const PageProduct = () => import(/* webpack-chunk-name: "PageProduct" */ './components/pages/PageProduct.vue');
const PageUserSingle = () => import(/* webpack-chunk-name: "PageUserSingle" */ './components/pages/PageUserSingle.vue');

export default new VueRouter({
    routes: [
        {
            name: "home",
            path: "/index.html",
            component: PageHome,
        },
        {
            name: "product",
            path: "/product.html",
            component: PageProduct
        },
        {
            name: "user-single",
            path: "/single-pages.html/:id",
            component: PageUserSingle,
            props: true,
        }
    ],
    mode: "history",
})