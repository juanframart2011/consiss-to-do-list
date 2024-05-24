const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  statu: {
    type: Number,//1 es abierto, 2 en proceso, 3 terminado
    required: true
  },
}, { timestamps: true });

const Todo = mongoose.model('todo', todoSchema);

module.exports = Todo;