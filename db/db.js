const mongoose = require('mongoose');

const { db } = require('../config');

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log('MongoDB connection error: -> ', err));

mongoose.set('useFindAndModify', false);
require('./userSchema');