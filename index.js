const express = require('express');
const db = require('./config/db');
require('dotenv').config();
const cors = require('cors')
const bodyparser = require('body-parser')
const userRouter = require('./routes/userRouter')
const blogRouter = require('./routes/blogRouter')
const authRouter = require('./routes/authRouter')
const app = express();
db();

app.use(cors({
     origin: process.env.PRODUCTION_URL,
     credentials: true,
}));
app.use(bodyparser.json({ limit: "20mb" }));
app.use(bodyparser.urlencoded({ extended: false }));


app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/blog', blogRouter)

app.get('/', (req, res) => {
     res.send('ok form server')
})


const port = process.env.PORT || 5000;
app.listen(port, () => {
     console.log(`app listen on port : http://localhost:${port}`);
})

