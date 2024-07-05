const Task = require("../models/Task")

const createTask = async (taskData) => {
    try{
        const task = await Task.create(taskData);     
        // not modify it so do with one line
        return task;
    }
    catch(err){
        throw err;
    }
};

const getAllTask = async (userId) => {
    try{
        const tasks = await Task.find({userId:userId});
        return tasks;
    }
    catch(error){
        throw error;
    }
};

const fetchTaskById = async (userId, taskId) => {
    try{
        const task = await Task.findOne({userId:userId, _id:taskId});

        return task;
    }
    catch(error){
        throw error;
    }
};

const updateTask = async (userId, taskId, updatedData) => {
    try{
        const task = await Task.findOneAndUpdate(
            { userId: userId, _id: taskId },
            {$set : updatedData},
            {new : true}
        );

        return task;
    } catch(error){
        throw error;
    }
};

const deleteTask = async (userId, taskId) => {
    try{
        const task = await Task.findOneAndDelete({userId:userId, _id:taskId});
        return task;
    } 
    catch(error){
        throw error;
    }
};

module.exports = {createTask,getAllTask, fetchTaskById, updateTask, deleteTask};