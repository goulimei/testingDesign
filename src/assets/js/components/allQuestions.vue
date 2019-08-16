<template>
    <div id="allQuestions">
        <h1>Questions Preview</h1>

        <p><router-link :to="{ name: 'createQuestion' }" class="btn btn-primary">Create Question</router-link></p>

        <table class="table table-hover">
            <thead>
                <th>Multiple Choice</th>
                <tr>
                    <td>ID</td>
                    <td>Question</td>
                    <td>Key</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="question in questions">
                    <td v-if="question.type == 0">
                        {{ question.id }}
                    </td>
                    <td v-if="question.type == 0"> 
                        <tr>
                            {{ question.question }}
                        </tr>
                        <tr>
                            <ul v-for="desc in question.option"> 
                                <li>{{ desc }}</li>
                            </ul>
                        </tr>
                    </td>
                    <td v-if="question.type == 0">
                        <ul v-for="key in question.key">
                            <li>{{ key }}</li>
                        </ul>
                    </td>
                    <td v-if="question.type == 0">
                        <router-link :to="{name: 'editQuestion', params: { id: question.id }}" class="btn btn-primary">Edit</router-link>
                        <router-link :to="{name: 'deleteQuestion', params: { id: question.id }}" class="btn btn-danger">Delete</router-link>
                    </td> 
                </tr>
            </tbody>
            <!-- next item-->
            <thead>
                <th>Multiple Choice
                    <td>(more than one answer)</td>
                </th>
                <tr>
                    <td>ID</td>
                    <td>Question</td>
                    <td>Key</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="question in questions">
                    <td v-if="question.type == 1">
                        {{ question.id }}
                    </td>
                    <td v-if="question.type == 1">
                        <tr>
                            {{ question.question }}
                        </tr>
                        <tr>
                            <ul v-for="desc in question.option"> 
                                <li>{{ desc }}</li>
                            </ul>
                        </tr>
                    </td>
                    <td v-if="question.type == 1">
                        <ul v-for="key in question.key">
                            <li>{{ key }}</li>
                        </ul>
                    </td>
                    <td v-if="question.type == 1">
                        <router-link :to="{name: 'editQuestion', params: { id: question.id }}" class="btn btn-primary">Edit</router-link>
                        <router-link :to="{name: 'deleteQuestion', params: { id: question.id }}" class="btn btn-danger">Delete</router-link>
                    </td> 
                </tr>
            </tbody>
            <!-- next item-->
            <thead>
                <th>Short Answer Questions</th>
                <tr>
                    <td>ID</td>
                    <td>Question</td>
                    <td>Key</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="question in questions">
                    <td v-if="question.type == 2">
                        {{ question.id }}
                    </td>
                    <td v-if="question.type == 2">
                        <tr>
                            {{ question.question }}
                        </tr>
                        <tr>
                            <ul v-for="desc in question.option"> 
                                <li>{{ desc }}</li>
                            </ul>
                        </tr>
                    </td>
                    <td v-if="question.type == 2">
                        <ul v-for="key in question.key">
                            <li>{{ key }}</li>
                        </ul>
                    </td>
                    <td v-if="question.type == 2">
                        <router-link :to="{name: 'editQuestion', params: { id: question.id }}" class="btn btn-primary">Edit</router-link>
                        <router-link :to="{name: 'deleteQuestion', params: { id: question.id }}" class="btn btn-danger">Delete</router-link>
                    </td> 
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                questions: [],
                originalQuestions: []
            }
        },

        created()
        {
            this.fetchQuestionData();
        },
        
        methods: {
            fetchQuestionData: function()
            {
                this.$http.get('http://localhost:3000/api/questions').then((response) => {
                    this.questions = response.body;
                    this.originalQuestions = this.questions;
                }, (response) => {

                });

            }
        }
    }
</script>
