const express = require('express')
const app = express()
const mongoose = require('mongoose')
const postRouter = require('./routes/post.route')
require('dotenv').config()
const swaggerUI = require('swagger-ui-express')
const specs = require('./swagger')
const cors = require('cors')

app.use(cors({ origin: ['http://localhost:3000','https://blog-mu-inky-78.vercel.app']}));
app.use(express.json());
app.use('/images', express.static('public/images'));

// API Documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

// Routes
app.use('/api/posts', postRouter);


const PORT = 3000||process.env.PORT
app.listen(PORT, ()=>{
    console.log(`App running on post ${PORT}`)
})

mongoose.connect(process.env.MongoURI)
    .then(() => console.log('Database Connected!'))
    .catch((error)=>console.log(error))