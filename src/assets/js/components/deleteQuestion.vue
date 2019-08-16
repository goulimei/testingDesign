<template>
    <div id="deleteQuestion">
        <h1>Delete Questions </h1>
        
        <p><router-link :to="{ name: 'allQuestions' }">Return to Questions Preview</router-link></p>

        <notification v-bind:notifications="notifications"></notification>

        <form v-on:submit.prevent="deleteQuestion">
            <div class="form-group">
                <label name="question_id">ID</label>
                <input type="text" class="form-control" disabled v-model="questionItem.id" id="question_id">
            </div>

            <div class="form-group">
                <label name="question_type">Type</label>
                <input v-if="questionItem.type == 0" type="text" class="form-control" disabled placeholder="Multiple Choice" id="question_type">
                <input v-if="questionItem.type == 1" type="text" class="form-control" disabled placeholder="Multiple Choice ( more than one answer )" id="question_type">
                <input v-if="questionItem.type == 2" type="text" class="form-control" disabled placeholder="Short Answer Questions" id="question_type">
            </div>

            <div class="form-group">
                <label name="question_question">Question</label>
                <input type="text" disabled class="form-control" v-model="questionItem.question" id="question_question" required>
            </div>

            <div class="form-group" v-if="questionItem.type == 0 || questionItem.type == 1">
                <label name="question_option">Options</label>
                <ul>
                    <li>
                        <input type="text" disabled class="form-control" v-model="questionItem.option[0]" id="question_option" required>
                    </li>
                    <li>
                        <input type="text" disabled class="form-control" v-model="questionItem.option[1]" id="question_option" required>
                    </li>
                    <li>
                        <input type="text" disabled class="form-control" v-model="questionItem.option[2]" id="question_option" required>
                    </li>
                </ul>
            </div>

            <div class="form-group">
                <label name="question_key">Keys</label>
                <input type="text" disabled class="form-control" v-model="questionItem.key" id="question_key" required>
            </div>

            <p><button class="btn btn-danger">Delete Question</button></p>
        </form>
    </div>
</template>

<script>
    import Notification from './notifications.vue';

    export default{
        data(){
            return{
                questionItem:{},
                notifications:[]
            }
        },

        created: function(){
            this.getQuestion();
        },

        methods: {
            getQuestion: function()
            {
                this.$http.get('http://localhost:3000/api/question/' + this.$route.params.id).then((response) => {
                    this.questionItem = response.body;
                }, (response) => {

                });
            },

            deleteQuestion: function()
            {
                this.$http.delete('http://localhost:3000/api/question/delete/' + this.$route.params.id, this.questionItem, {
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                }).then((response) => {
                    this.$router.push({name: 'allQuestions'})
                }, (response) => {
                    this.notifications.push({
                        type: 'danger',
                        message: 'Question could not deleted'
                    });
                });
            }
        },

        components: {
            'notification' : Notification
        }
    }
</script>
