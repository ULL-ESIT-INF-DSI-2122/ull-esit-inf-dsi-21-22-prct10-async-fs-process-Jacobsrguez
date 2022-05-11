import * as express from 'express';
import {commandSpawn} from './spawnAux';
const app = express();


app.get('/execmd', (req, res) => {
  if (!req.query.cmd) {
    res.status(400).send({
      error: 'No se ha especificado un comando',
    });
  } else {
    const child = commandSpawn(req.query.cmd, (err, data) => {
      if (err) {
        res.status(500).send({
          error: err,
          });
      } else {
  }
});

app.get('*', (_, res) => {
  res.send('<h1>404</h1>');
});
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
