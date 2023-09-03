const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose')
const Todos=require('./modules/Todo')
const app=express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/MernTodo')
.then(()=>console.log("connected to DB"))
.catch(console.error);

app.get('/todos',async(req,res)=>{
const todos= await Todos.find();
res.json(todos);
})
app.post('/todos/new',async(req,res)=>{
    const todo=new Todos({
        text:req.body.text
    })
   await todo.save();
  res.json(todo);

})
;
app.delete('/todos/delete/:id',async(req,res)=>{
   const result=await Todos.findByIdAndDelete(req.params.id)
   res.json(result);
})
app.put('/todos/completed/:id',async(req,res)=>{
    const todo=await Todos.findById(req.params.id)
    todo.complete=!todo.complete;
    await todo.save();
    res.json(todo);
})



app.listen(3000,()=>console.log("server started on port 3000"));