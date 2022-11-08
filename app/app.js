//third party modules
import express from 'express';
import logger from 'morgan';
import session from 'express-session';
import bodyParser from 'body-parser'; //get info from html forms
import cookieParser from 'cookie-parser'; //read cookies (needed for auth)

// ES modules fix dor _dirname
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(
    import.meta.url));

//import Mongoose module
import mongoose from 'mongoose';

// Auth Step 1 - import modules
import passport from 'passport';
import passportLocal from 'passport-local';
import flash from 'connect-flash'; //flash is a special area of the session used for storing messages. Messages are written to the flash and cleared after being displayed to the user.

// Auth Step 2 - define our auth strategy
let localStrategy = passportLocal.Strategy;

// Auth Step 3 - import the user model
import User from './models/user.js';

//Import Routes
import indexRouter from './routes/index.route.server.js'
import surveysRouter from './routes/surveys.route.server.js'
//import authRouter from './routes/auth.route.server.js';

//configuration module + set up mongoose-complete db configuration
import { Secret, MongoURI } from '../config/config.js'

//instantiate express application
const app = express();

//complete db configuration
mongoose.connect(MongoURI);
const db = mongoose.connection;

//listen for connection success or error
db.on('open', () => console.log("connected to mongoDb"));
db.on('error', () => console.log(" mongoDb connection error"));

//set up middleware


//setup ViewEngine EJS
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/client')));
app.use(express.static(path.join(__dirname, '../public')));
app.use(session({
    secret: Secret,
    saveUninitialized: false,
    resave: false
}));

// Auth Step 4 - Setup Express Session
app.use(session({
    secret: Secret,
    saveUninitialized: false,
    resave: false
}));

// Auth Step 5 -  Setup Flash
app.use(flash()); //use connect-flash for flash messages stored in session

// Auth Step 6 - Initialize Passport and Session
//a middle-ware that initialises Passport->initialises the authentication module. 
app.use(passport.initialize());
app.use(passport.session());

// Auth Step 7 - Implementing the Auth Strategy
passport.use(User.createStrategy());

// Auth Step 8 - Setup serialization and deserialization
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//use routes
app.use('/', indexRouter);
app.use('/', surveysRouter);
//app.use('/', authRouter);

//app.listen(3000);
export default app;