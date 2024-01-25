import express from "express";
import { routes } from "./routes/routes.js";

const app = express();
app.use(express.json());

//Welcome api
app.get("/api/welcome", (request, response) => {
    response.status(200).json({"message":"Welcome to the tasks api"});
});

//Routes
routes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}...`);
});