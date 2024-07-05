const taskServices = require("../services/taskService");


const createTask = async (req,res) => {
    try{
    const {title, description, dueDate, isCompleted, priority} = req.body;
    const userId = req.user.id;
    const task = await taskServices.createTask({
        title,
        description,
        dueDate,
        isCompleted,
        priority,
        userId
    });
    console.log("task created",task);
    res.status(201).json(task);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
};


const getAllTask = async (req,res) => {
    try{
        const userId = req.user.id;
        const task = await taskServices.getAllTask(userId);

        res.status(200).json(task);
    } catch(error){
        res.status(500).json({message:error.message});
    }
}

const getTaskById = async (req,res) => {
    try{
        const userId = req.user.id;
        const {id} = req.params;

        const task = await taskServices.fetchTaskById(userId, id);
        if(!task){
            res.status(404).json({
                message:"task is not found"
            });
        }
        res.status(200).json(task);
        
    }
    catch(error){
        res.status(500).json({
            message:error.message,
        });
    }
    
    

};

const updateTask = async (req,res) => {
    try{
        const userId= req.user.id;
        const {id} = req.params;
        const updatedData = req.body;

        const task = await taskServices.updateTask(userId,id, updatedData);
        if(!task){
            res.status(404).json({
                message: "task is not found",
            });
        }

        res.status(200).json(task);
    }
    catch(error){
        res.status(500).json({
            message: error.message,
        });
    };

};

const deleteTask = async (req,res) => {
    try{
        const userId = req.user.id;
        const {id}= req.params;

        const success = await taskServices.deleteTask(userId, id);
        if(!success){
            res.status(404).json({
                message: "task is not found",
            });
        }

        res.status(200).send();
        
    } 
    catch(error){
        res.status(500).json({
            message:error.message,
        });
    }
};


module.exports = {createTask, getAllTask, getTaskById, updateTask, deleteTask};