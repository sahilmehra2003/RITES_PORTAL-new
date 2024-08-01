import express, { json } from 'express'
import cors from 'cors';
const app=express();
import {getDocuments,getFolder,createFolder} from './dbService.js'
// const cors=require('cors');
import dotenv from 'dotenv'
dotenv.config();
 app.use(cors());
// app.use((req,res,next)=>{
//     res.setHeader=("Acess Control allow origin","http://localhost:5173")
//     res.setHeader=("Acess Control allow methods",'GET,POST');
//     res.setHeader=("Acess Control allow methods",'Content-Type');

// })

app.use(express.json())
app.get("/Portal",async (req,res)=>{
    const portal=await getDocuments()
    console.log(portal)
    res.send(portal)
})

// request using id
app.get("/Portal/:folder_id",async (req,res)=>{
    const folder_id=req.params.folder_id
    const portal=await getFolder(folder_id)
    res.send(portal)
})

// post request
app.post("/Portal", async (req, res) => {
      const { folder_name, folder_id } = req.body;
      const result = await createFolder(folder_name, folder_id);
      res.status(201).send(result);
    
  });
app.use((err,req,res,next)=>{
    console.error(err.stack)
    res.status(500).send('Something broke!')
})


// starting the local server by getting port no. from env file

app.listen(process.env.PORT, ()=>{
    console.log('app is running on port 3000')
});