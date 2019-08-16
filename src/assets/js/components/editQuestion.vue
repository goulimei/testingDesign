<template>
    <div id="updateQuestion">
        <h1>Update Question</h1>

        <p><router-link :to="{ name: 'allQuestions' }">Return to Questions Preview</router-link></p>

        <notification v-bind:notifications="notifications"></notification>

        <form v-on:submit.prevent="editQuestion">
            <div class="form-group">
                <label name="question_id">ID</label>
                <input type="text" class="form-control" disabled v-model="questionItem.id" id="question_id">
            </div>

            <div class="form-group">
                <label name="question_type">Type</label>
                <table>                 
                    <tr>
                        <input type="radio" value=0  v-model="questionItem.type" id="question_type">Multiple Choice
                    </tr>
                    <tr>
                        <input type="radio" value=1  v-model="questionItem.type" id="question_type">Multiple Choice ( more than one answer )
                    </tr>
                    <tr>
                        <input type="radio" value=2  v-model="questionItem.type" id="question_type">Short Answer Questions
                    </tr>     
                </table>
            </div>

            <div class="form-group">
                <label name="question_question">Question</label>
                <input type="text" class="form-control" v-model="questionItem.question" id="question_question" placeholder="write your question" required>
            </div>

            <div class="form-group" v-if="questionItem.type == 0 || questionItem.type == 1">
                <label name="question_option">Options</label>
                <ul>
                    <li>
                        <input type="text" class="form-control" v-model="questionItem.option[0]" id="question_option" placeholder="write your option" required>
                    </li>
                    <li>
                        <input type="text" class="form-control" v-model="questionItem.option[1]" id="question_option" placeholder="write your option" required>
                    </li>
                    <li>
                        <input type="text" class="form-control" v-model="questionItem.option[2]" id="question_option" placeholder="write your option" required>
                    </li>
                </ul>
            </div>

            <div class="form-group">
                <label name="question_key">Keys ( separated by semicolons -- ';' )</label>
                <input type="text" class="form-control" v-model="questionItem.key" id="question_key" placeholder="key1;key2;key3" required>
            </div>

            <div class="form-group">
                <button class="btn btn-primary">Update</button>
            </div>
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
            this.getQuestions();
        },

        methods: {
            getQuestions: function()
            {
                this.$http.get('http://localhost:3000/api/question/' + this.$route.params.id).then((response) => {
                    this.questionItem = response.body;
                    this.questionItem.key = response.body.key.join(";");
                }, (response) => {

                });
            },

            editQuestion: function()
            {
                this.$http.patch('http://localhost:3000/api/question/edit/' + this.$route.params.id, this.questionItem, {
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                }).then((response) => {
                    this.notifications.push({
                        type: 'success',
                        message: 'Question updated successfully'
                    });
                }, (response) => {
                    this.notifications.push({
                        type: 'error',
                        message: 'Question not updated'
                    });
                });
            }
        },

        components: {
            'notification' : Notification
        }
    }
</script>
