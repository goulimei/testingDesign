const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const QUESTIONS_FILE = path.join(__dirname, 'src/assets/js/components/questionData.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/questions', function(req, res) {
    fs.readFile(QUESTIONS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.json(JSON.parse(data));
    });
});


app.get('/api/question/:id', function(req, res) {

    fs.readFile(QUESTIONS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }

        let json = JSON.parse(data);

        for(let i = 0; i <= json.length; i++)
        {
            if(json[i]['id'] == req.params.id)
            {
                res.json(json[i]);
                break;
            }
        }
    });
});

app.post('/api/question/create', function(req, res) {
    
    fs.readFile(QUESTIONS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }

        //Todo,增加每个item的校验
        let questions = JSON.parse(data);
        let type = parseInt(req.body.type);
        let arr = req.body.key.split(";").filter((x) => x.length != 0);
        let answer = '';

        let newQuestion = {
            id: Date.now(),
            type: type,
            question: req.body.question,
            option: req.body.option,
            key: arr,
            answer: answer
        };
        questions.push(newQuestion);
        
        fs.writeFile(QUESTIONS_FILE, JSON.stringify(questions, null, 4), function(err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.json(questions);
        });
    });
});

app.patch('/api/question/edit/:id', function(req, res) {
    fs.readFile(QUESTIONS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var questions = JSON.parse(data);

        for(let i = 0; i <= questions.length; i++)
        {
            if(questions[i]['id'] == req.params.id)
            {
                let question = questions[i];
                //Todo,增加每个item的校验
                question.type = parseInt(req.body.type);
                question.question = req.body.question;
                question.option = req.body.option;

                let arr = req.body.key.split(";").filter((x) => x.length != 0);
                question.key = arr;

                let answer = '';
                question.answer = answer;

                questions.splice(i, 1);
                questions.push(question);

                fs.writeFile(QUESTIONS_FILE, JSON.stringify(questions, null, 4), function(err) {
                    if (err) {
                        console.error(err);
                        process.exit(1);
                    }
                    res.json(questions);
                });
                break;
            }
        }
    });
});

app.delete('/api/question/delete/:id', function(req, res) {
    fs.readFile(QUESTIONS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        let questions = JSON.parse(data);

        for(let i = 0; i <= questions.length; i++)
        {
            if(questions[i]['id'] == req.params.id)
            {
                questions.splice(i, 1);

                fs.writeFile(QUESTIONS_FILE, JSON.stringify(questions, null, 4), function(err) {
                    if (err) {
                        console.error(err);
                        process.exit(1);
                    }
                    res.json(questions);
                });
                break;
            }
        }
    });
});


app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});