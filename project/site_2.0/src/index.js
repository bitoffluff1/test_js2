import Vue from "vue";

import router from "./router";

import App from "./components/App.vue";

new Vue({
    render: h => h(App),
    router,
}).$mount("#app");