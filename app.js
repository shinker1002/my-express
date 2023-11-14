const express = require('express')
const app = express()

const cors = require('cors');
const morgan = require('morgan');

// cors를 적용합니다.
app.use(cors());
// Express 내장 미들웨어인 express.json()을 적용합니다.
app.use(express.json());
// HTTP 요청 logger인 morgan을 적용합니다.
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

const port = 8080


const groupsRouter = require('./router/groups');
// const membersRouter = require('./router/members');

app.use('/groups', groupsRouter);

// app.use('/groups/:groupId/members', membersRouter);

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})