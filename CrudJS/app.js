const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/DatabaseDBex'

const app = express()

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})

app.use(express.json())

const sampleRouter = require('./routes/sample')
app.use('/sample',sampleRouter)

app.listen(9000, () => {
    console.log('Server started')
})