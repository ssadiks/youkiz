import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import routerVideo from './routes/video.routes';

const app = express();

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3030; // set our port

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/videos', { useMongoClient: true });

// REGISTER OUR ROUTES
app.use('/api', routerVideo);

// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);