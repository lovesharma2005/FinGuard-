const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs')
const app = express()
// require('dotenv').config()
// const PORT = process.ackendenv.PORT
const PORT = 5000
//middlewares
app.use(express.json())
const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from this domain
  };
  
  app.use(cors(corsOptions)); // Apply CORS middleware with the options

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}
// app.listen(PORT, () => {
//     console.log('listening to port:', PORT)
// })
server()