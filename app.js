var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

const clientRouter = require('./routes/clientRoute');
const carRouter = require('./routes/carRoute');
const reservationRouter = require('./routes/reservationRoute');

const ClientApiRouter = require('./routes/api/ClientApiRoute');
const CarApiRouter = require('./routes/api/CarApiRoute');
const ReservationApiRouter = require('./routes/api/ReservationApiRoute');

const sequelizeInit = require('./config/sequelize/init');
sequelizeInit().catch(err => {
  console.log(err);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/client', clientRouter);
app.use('/car', carRouter);
app.use('/reservation', reservationRouter);

app.use('/api/client', ClientApiRouter);
app.use('/api/car', CarApiRouter);
app.use('/api/reservation', ReservationApiRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
