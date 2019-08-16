import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueResource from 'vue-resource';
Vue.use(VueResource);

import App from './App.vue'

const AllQuestons = require('./assets/js/components/allQuestions.vue');
const CreateQuestion = require('./assets/js/components/createQuestion.vue');
const EditQuestion = require('./assets/js/components/editQuestion.vue');
const DeleteQuestion = require('./assets/js/components/deleteQuestion.vue');

const routes = [
    {
        name: 'allQuestions',
        path: '/',
        component: AllQuestons
    }, {
        name: 'createQuestion',
        path: '/question/create',
        component: CreateQuestion
    }, {
        name: 'editQuestion',
        path: '/question/edit/:id',
        component: EditQuestion
    }, {
        name: 'deleteQuestion',
        path: '/question/delete/:id',
        component: DeleteQuestion
    }
];
var router = new VueRouter({routes: routes, mode: 'history'});
new Vue(Vue.util.extend({
    router
}, App)).$mount('#app');