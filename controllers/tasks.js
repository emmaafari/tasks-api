import { tasks } from "../tasks.js";
import { validateTask } from "../utils/tasks-schema.js";

export const getTasks = (request,response) => {
    response.status(200).json(tasks);
}
export const getTask = (request, response) => {
    const taskId = request.params.id;
    
    const task = tasks.find(task => task.id === parseInt(taskId));
    if (!task) return response.status(404).json({ "message": "Task with the provided Id does not exist" });
    response.status(200).send(task)
}
export const createTask = (request, response) => {
    const validationErr = validateTask(request.body);
    if (validationErr) 
        return response.status(400).json({"message":validationErr});

    const task = {
        id: tasks.length + 1,
        name: request.body.name,
        completed: request.body.completed
    }

    tasks.push(task)

    response.status(201).json({"message":"Task added successfully","task":task})
}
export const updateTask = (request, response) => {
    const taskId = request.params.id;
    if (!taskId) return response.status(404).json({ "message": "Missing required param task id" }); 

    //Find the task with the provided id
    const task = tasks.find(task => task.id === parseInt(taskId));
    if (!task) return response.status(404).json({ "message": "Task with the provided Id does not exist" });

    //Validate the request body
    const validationErr = validateTask(request.body);
    if (validationErr) 
        return response.status(400).json({ "message": validationErr });
    
    //update the task
    task.name = request.body.name;
    task.completed = request.body.completed

    response.status(200).json({"message":"Task updated successfully","task":task})
}
export const deleteTask =(request, response) => {
    const taskId = request.params.id;
    if (!taskId) return response.status(404).json({ "message": "Missing required param task id" }); 

    //Find the task with the provided id
    const task = tasks.find(task => task.id === parseInt(taskId));
    if (!task) return response.status(404).json({ "message": "Task with the provided Id does not exist" });
   
    //Get the index of the task in the array
    const index = tasks.indexOf(task);
    //Remove the task using the index
    tasks.splice(index, 1);

    response.status(200).json({"message":"Task delete successfully","task":task})
}