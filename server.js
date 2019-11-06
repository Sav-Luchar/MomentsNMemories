const express = require("express");
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Passport configuration
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'client/build')));
require('./config/passport')(passport);

//Db config
const db = require('./config/keys').mongoURI;
//connect to mongodb
mongoose
  .connect(db, { useNewUrlParser: true } )
  .then(() => console.log('MongoDb connected'))
  .catch(err => console.log(err));

//First route
app.get("/", (req, res) => res.sendFile('../client/build/index.html'));

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
