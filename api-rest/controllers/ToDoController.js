const mongoose = require('mongoose');
const TodoModel = require('../models/Todo');
require('dotenv').config();
/*
title, subtitle, description, timestamps
*/
const ToDoController = {
    create: async (req, res) => {

        if( !req.body.title || !req.body.subtitle || !req.body.description ){
            return res.status(401).json({ message: 'Los datos son obligatorios' });
        }
        
        var todoData = {
            title:req.body.title,
            subtitle:req.body.subtitle,
            description:req.body.description,
            statu:1
        }

        try {
            
            const todoResult = new TodoModel(todoData);
            await todoResult.save();
            
            if (todoResult) {
                
                return res.status(200).json(todoResult);
            }
            return res.status(401).json({ message: 'No se pudo crear el todo' });
        }
        catch (error) {

            // Maneja errores de base de datos u otras excepciones
            console.error(error);
            return res.status(500).json({ message: 'Error al procesar la solicitud' });
        }
    },
    delete: async (req, res) => {
        const todoId = req.params.id;
      
        try {
            // Espera a que la promesa se resuelva y captura el resultado directamente
            const todo = await TodoModel.findById(todoId);

            // Si el todo no se encuentra, podrías querer enviar una respuesta 404
            if (!todo) {
                return res.status(404).json({ message: 'todo no encontrado' });
            }

            var todoResult = await TodoModel.findByIdAndDelete(todoId);

            res.status(200).json('todo Eliminado');
        }
        catch (error) {
            console.warn('ToDoController::delete', error);
            // Maneja cualquier error que ocurra durante la obtención del todo
            res.status(500).json({ error: 'Error al al eliminar todo' });
        }
    },
    getAll: async (req, res) => {
        try {
            const todos = await TodoModel.find();
            res.status(200).json(todos);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
    getDetailById: async (req, res) => {
        const todoId = req.params.id; // Asegúrate de declarar la variable con const o let
    
        try {

            // Espera a que la promesa se resuelva y captura el resultado directamente
            const todo = await TodoModel.findById(todoId);
          
            // Si el todo no se encuentra, podrías querer enviar una respuesta 404
            if (!todo) {
                return res.status(404).json({ message: 'todo no encontrado' });
            }
      
          // Si se encuentra el todo, envía los datos como respuesta
          res.status(200).json(todo);
        } catch (error) {
          // Maneja cualquier error que ocurra durante la obtención del todo
          res.status(500).json({ error: 'Error al obtener todo ', error });
        }
    },
    update: async (req, res) => {

        if( !req.body.title || !req.body.subtitle || !req.body.description ){
            return res.status(401).json({ message: 'Los datos son obligatorios' });
        }
        const todoId = req.params.id;

        var todoData = {
            title:req.body.title,
            subtitle:req.body.subtitle,
            description:req.body.description,
            statu:req.body.statu
        }

        try {

            // Espera a que la promesa se resuelva y captura el resultado directamente
            const todo = await TodoModel.findById(todoId);

            // Si el todo no se encuentra, podrías querer enviar una respuesta 404
            if (!todo) {
                return res.status(404).json({ message: 'todo no encontrado' });
            }

            var todoResult = await TodoModel.findByIdAndUpdate(todoId, todoData, { new: true });
            
            if (todoResult) {
                
                return res.status(200).json(todoResult);
            }
            return res.status(401).json({ message: 'No se pudo modificar el todo' });
        }
        catch (error) {

            // Maneja errores de base de datos u otras excepciones
            console.error(error);
            return res.status(500).json({ message: 'Error al procesar la solicitud' });
        }
    },
};

module.exports = ToDoController;