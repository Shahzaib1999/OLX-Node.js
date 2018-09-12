const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const IdeaSchema = new Schema({
  title:{
    type: String,
    required: true
  },
  category:{
    type: String,
    required: true
  },
  details:{
    type: String,
    required: true
  },
  name:{
    type: String,
    required: true
  },
  phone:{
    type: String,
    required: true
  },
  city:{
    type: String,
    required: true
  },
  price:{
    type: String,
    required: true
  },
  image:{
    type: String,
    required: true
  },
  user:{
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('ideas', IdeaSchema);