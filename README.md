
## Project setup

### Install Depedencies
```
npm install
```

### Compiles and hot-reloads for dev
```
npm run build
```

### run nodejs (is already running)
```
node server.js
```

### run vue

```
npm run dev
```

http://178.128.120.159:3000


## 模块的设计思路

### 试题 Quiz Schema：
```
{
     "id": 2, //每个问题对应唯一自增ID，用于后续的修改、删除。
     "type": 1, //题型用int区分 单选:0 多选:1 问答:2（若扩展试题类型，增加相应int）
     "question": "choose the color of flowers?",
     "option": [
         "pink",
         "green",
         "red"
     ],
     "key": [ // 正确答案,array， 如果是问答题则是描述信息的关键字，后续评分时可匹配关键字给分
         "pink",
         "red"
     ]
 }
```

### Answers Schema
```
{
     "id": 2, //每个问题对应唯一自增ID，用于后续的修改、删除。
     "quiz_id": 1, // 题目id
     "correct" false, // 回答是否正确
     "answer": "foo", // 问答题答案
 }
```

### Others:
- 默认页，生命周期created中，获取questionData.json的数据并render
- 试题增加页面，设置type默认值（0），option默认类型（[]），通过placeholder属性，提示用户输入的内容。通过required属性，提示用户必须填写。key依据‘；’拆分，过滤掉空值，例如：`aa;ss;dd; -> ['aa', 'ss', 'dd']`
- 路由（vue-router）进行button的响应。

### RestAPI 
```
// list questions
GET /api/questions 
// get questions by id
GET /api/question/:id 
// add question
POST /api/question/create 
// update question by id
PUT /api/question/edit/:id 
// delete question by id
DELETE /api/question/delete/:id 
```

### 在线作答模块的设计思路
- 登录页面（学生信息），后台自动生成唯一ID，存入Redis（需做持久化）
- 答题页面，获取questionData.json的数据（类型、问题描述和选项）并render。
- 路由（vue-router）进行"提交“按钮的响应。

### 自助评分及成绩录入模块的设计思路
- 路由（app.post），通过answer中quiz_id，获取key，判断是否正确，若正确，计数器增对应分值。
- 将计数器的数值，存入答题者schema。

### 需求优先级和预估时间
- 默认展示页面，高，1h
- 数据获取（服务端），高，1h
- 增加试题页面，高，1h
- 数据增加（服务端），高，1h
- 修改试题页面，中，40min
- 数据更新（服务端），中，40min
- 删除试题页面，中，30min
- 数据删除（服务端），中，30min
- 页面跳转，低，30min
- 成功或错误信息提示，低，1h
- 样式优化，低，40min

### 环境搭建
- Vue-cli脚手架
- webpack

### 实际开发时间
- 环境搭建，50min
- 路由设计，schema设计，1.5h
- 默认展示页面，高，40min
- 数据获取（服务端），高，30min
- 增加试题页面，高，30min
- 数据增加（服务端），高， 50min
- 修改试题页面，中，30min
- 数据更新（服务端），中，40min
- 删除试题页面，中，20min
- 数据删除（服务端），中，25min
- 页面跳转，低，20min
- 成功或错误信息提示，低，40min
- 样式优化，低，10min

### Known Issue
- 未利用jest框架进行覆盖率较高的单元测试
- 未进行性能测试、压力测试
- 选项个数不可变
- 选项顺序不能随机生成
- 试题ID显示不友好

### 产品形式和设计方案
- 登录页面（管理员、教师、学生），设置不同权限。
- 试题可随机抽取，生成答题页面，选项顺序随机生成。
- 学生提交后，可直接显示试题对错和成绩。
- 后端部署，nginx(反向代理、跨域、负载均衡)，解决高并发问题。
