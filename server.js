const express = require('express');
const morgan = require('morgan');

const app = express();

const getpostRouter = require('./getpostRouter');
const deleteputRouter = require('./deleteputRouter');

app.use(morgan('common'));

// needs to be edited

app.use('/getpost', getpostRouter);
app.use('/deleteput', deleteputRouter);


app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});