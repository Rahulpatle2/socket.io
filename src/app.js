const express = require('express');

const  app = express()

app.set('view engine', "ejs")

app.get('/index',(req,res) =>{
    res.render('index')
})

module.exports = app;