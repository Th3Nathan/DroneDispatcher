import getData from './api_util';
import assign from './assign';
import express from 'express';
const app = express();

app.get('/assignments', function (req, res) {
  getData().then(items => res.send(assign(items)))
    .catch(() => res.send("Error"));
});

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
