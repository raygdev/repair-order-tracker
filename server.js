const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
require('dotenv').config()

const port = process.env.MY_PORT
const app = express()

app.use(cors())
app.use(helmet())
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.get('/api', (req,res,next) => {
    console.log('hello from express')
    console.log(req.ip)
    res.json({message: 'hello'})
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
