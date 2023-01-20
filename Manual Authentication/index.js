const express = require('express');
const app = express();
const port = 8000;
const cookieParser =require('cookie-parser');
const db = require('./config/mongoose')


app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'))

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
//Extract styles and js from sub pages into layouts

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use('/',require('./routes'));


app.set('view engine','ejs');
app.set('views', './views');

app.listen(port,function(err){
    if(err){
        console.log(`Error: ${err}`);
    }

    console.log(`Server is running on the port ${port}`);
})