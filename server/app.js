const express = require('express');
const cors = require('cors');
const fetchUser = require('./src/middlewares/fetchUser');

const app = express();

//allowing cross origin resource sharing
app.use(cors());

//middlewares
//to parse json data 
app.use(express.json());
//to parse url encoded data;
app.use(express.urlencoded({extended: true}));

const userRoutes = require('./src/routes/user');
app.use('/user', userRoutes);

const postRoutes = require('./src/routes/post');
app.use('/post', [fetchUser, postRoutes]);

const commentRoutes = require('./src/routes/comment');
app.use('/comment', [fetchUser, commentRoutes]);


module.exports = app;