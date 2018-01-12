import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';

import { matchRoutes } from 'react-router-config';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';

import routerVideo from './routes/video.routes';
import Routes from '../src/Routes';

const app = express();

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3030; // set our port

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/videos', { useMongoClient: true });

app.use(express.static(path.resolve(__dirname, './../public')));

// REGISTER OUR ROUTES
app.use('/api', routerVideo);


app.get('*', (req, res) => {
  const store = createStore();

  const promises = matchRoutes(Routes, req.path).map(({ route }) => {
    // console.log('route', route)
    return route.loadData ? route.loadData(store) : null;
  });

  // console.log('promises', promises);

  Promise.all(promises).then(() => {
    res.send(renderer(req, store));
  });
});


// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);