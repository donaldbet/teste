import '../css/app.css';

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/inertia-vue3';
import { InertiaProgress } from "@inertiajs/progress";
import { ZiggyVue } from 'ziggy-js';
import { Ziggy } from "./ziggy";

import EditProfessor from './components/Professor/EditProfessor.vue';

InertiaProgress.init();

createInertiaApp({
    resolve: async (name) => {
        return (await import(`./Pages/${name}`)).default;
    },
    setup({ el, App, props, plugin }) {
        const app = createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue, Ziggy)
            .component("Link", Link)
            .component("Head", Head)
            .component("edit-professor", EditProfessor)
            .mixin({ methods: { route } });

        app.mount(el);
    },
});

const TestComponent = {
    template: '<div>Componente Vue Funcionando!</div>',
};

createApp(TestComponent).mount('#app');
