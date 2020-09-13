const express = require('express');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//revise and add
const indexRouter = require('./routes/index');
//const usersRouter = require('./routes/users');
const searchRouter = require('./routes/search');
const articleRouter = require('./routes/article');
const sportRouter = require('./routes/sport');
const worldRouter = require('./routes/world');
const businessRouter = require('./routes/business');
const politicsRouter = require('./routes/politics');
const technologyRouter = require('./routes/technology');
// const resultsRouter = require('./routes/results');




const homejsonRouter = require('./routes/home.json');
const articlejsonRouter = require('./routes/articlesearch.json');
const sportsjsonRouter = require('./routes/sports.json');
const worldjsonRouter = require('./routes/world.json');
const politicsjsonRouter = require('./routes/politics.json');
const technologyjsonRouter = require('./routes/technology.json');
const businessjsonRouter = require('./routes/business.json');



const scienceRouter = require('./routes/science');
// const googleTrendsRouter = require('./routes/googleTrends');

const app = express();



app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin','*' );
    next();
});



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//revise and add
app.use('/', indexRouter);

app.use('/search', searchRouter);
app.use('/article', articleRouter);
app.use('/sport', sportRouter);
app.use('/world', worldRouter);
app.use('/business', businessRouter);
app.use('/politics', politicsRouter);
app.use('/technology', technologyRouter);
// app.use('/results', resultsRouter)

app.use('/home.json', homejsonRouter);
app.use('/articlesearch.json',articlejsonRouter);
app.use('/sports.json', sportsjsonRouter);
app.use('/world.json', worldjsonRouter);
app.use('/politics.json', politicsjsonRouter);
app.use('/technology.json', technologyjsonRouter);
app.use('/business.json', businessjsonRouter);



app.use('/science', scienceRouter);
// app.use('/googleTrends', googleTrendsRouter);





module.exports = app;
