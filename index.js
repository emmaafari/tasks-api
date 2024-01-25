import express from "express";
import { validateTask } from "./utils/tasks-schema.js";
const app = express();
app.use(express.json());


//Tasks
const tasks = [
    {
        id: 1,
        name: "Task 1",
        completed: false
    },
    {
        id: 2,
        name: "Task 2",
        completed: false
    },
    {
        id: 3,
        name: "Task 3",
        completed: false
    },
];

//Welcome api
app.get("/api/welcome", (request, response) => {
    response.status(200).json({"message":"Welcome to the tasks api"});
});

//Get tasks
app.get("/api/tasks", (request, response) => {
    response.status(200).json(tasks);
});

//Get task by Id
app.get("/api/tasks/:id", (request, response) => {
    const taskId = request.params.id;
    
    const task = tasks.find(task => task.id === parseInt(taskId));
    if (!task) return response.status(404).json({ "message": "Task with the provided Id does not exist" });
    response.status(200).send(task)
})

//POST
app.post("/api/tasks", (request, response) => {
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
})

//PUT
app.put("/api/tasks/:id", (request, response) => {
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
})

//DELETE
app.delete("/api/tasks/:id", (request, response) => {
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
})


const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}...`);
});