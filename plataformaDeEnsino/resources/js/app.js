import '../css/app.css';

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/inertia-vue3';
import { InertiaProgress } from "@inertiajs/progress";
import { ZiggyVue } from 'ziggy-js';
import { Ziggy } from "./ziggy";

import Welcome from './components/Welcome.vue';
import EditProfessor from './components/Professor/EditProfessor.vue'

InertiaProgress.init();


createInertiaApp({
    resolve: async (name) => {
        return (await import(`./Pages/${name}`)).default;
    },
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue, Ziggy)
            .component("Link", Link)
            .component("Head", Head)
            .mixin({ methods: { route } })
            .mount(el);
    },
});

const app = createApp(Welcome);
app.mount('#app');
