import { createTask, deleteTask, getTask, getTasks, updateTask } from "../controllers/tasks.js";
export const routes = (app) => {
    //Get tasks
    app.get("/api/tasks", getTasks);
    //Get task by Id
    app.get("/api/tasks/:id", getTask);
    //POST
    app.post("/api/tasks", createTask);
    //PUT
    app.put("/api/tasks/:id", updateTask);
    //DELETE
    app.delete("/api/tasks/:id", deleteTask);
}