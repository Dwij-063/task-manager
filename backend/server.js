require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"));

const TaskSchema = new mongoose.Schema({
    title: String
});

const Task = mongoose.model("Task", TaskSchema);

app.get('/tasks', async(req,res)=>{
    const tasks = await Task.find();
    res.json(tasks);
});

app.post('/tasks', async(req,res)=>{
    const task = new Task(req.body);
    await task.save();
    res.json(task);
});

app.delete('/tasks/:id', async(req,res)=>{
    await Task.findByIdAndDelete(req.params.id);
    res.json({message:"Deleted"});
});

app.put('/tasks/:id', async(req,res)=>{

    await Task.findByIdAndUpdate(
        req.params.id,
        req.body
    );

    res.json({
        message:"Updated"
    });
});

app.listen(5000, ()=>{
    console.log("Server Running");
});
