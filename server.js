const express = require('express');
const morgan = require('morgan');

const app = express();

const getpostRouter = require('./getpostRouter');
const deleteputRouter = require('./deleteputRouter');

app.use(morgan('common'));

// needs to be edited

app.use('/getpost', getpostRouter);
app.use('/deleteput', deleteputRouter);

let server;

function runServer() {
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`Your app is listening on port ${port}`);
      resolve(server);
    }).on('error', err => {
      reject(err)
    });
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}


app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});