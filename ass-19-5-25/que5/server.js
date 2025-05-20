const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

function readData(){
    return JSON.parse(fs.readFileSync("./db.json","utf-8"));
}

function writeData(Data){
    fs.writeFileSync("./db.json",JSON.stringify(Data,null,2),"utf-8");
}

//post push the data to file.
app.post("/books",(req,res)=>{
    const data = readData();
    const newData = req.body;
    data.push(newData);
    writeData(data);
    res.status(201).json({msg:"book added successfully"});
});

//get the data 
app.get("/books",(req,res)=>{
    const data = readData();
    res.status(201).json(data);
});

//retrieve the book  by id
app.get("/books/:id",(req,res)=>{
    const data = readData();
    let book = data.find((b)=>b.id===req.params.id);
    if(book){
        res.json(book);
    }else{
        res.status(404).json({msg:"data not found"});
    }
})

// PUT /dishes/:id → Update a dish by its ID
app.put("/books/:id", (req, res) => {
  let data = readData();
  const index = data.findIndex(d => d.id == req.params.id);
  if (index !== -1) {
    data[index] = { ...data[index], ...req.body };
    writeData(data);
    res.json({ message: "Dish updated", dish: data[index] });
  } else {
    res.status(404).json({ message: "Dish not found" });
  }
});

// DELETE /dishes/:id → Delete a dish by its ID
app.delete("/books/:id", (req, res) => {
  let data = readData();
  const filtered = data.filter(d => d.id != req.params.id);
  if (data.length === filtered.length) {
    return res.status(404).json({ message: "Dish not found" });
  }
  writeData(filtered);
  res.json({ message: "Dish deleted" });
});

app.listen(3000,()=>{
    console.log("server is running on port 3000");
});