import express from 'express';
import Connection from './db/db.js';

const app=express();
Connection();
const Port=5000;
app.listen(Port,()=>console.log(`The server is running on Port ${Port}`));
