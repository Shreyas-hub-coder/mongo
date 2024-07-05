const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json())

mongoose
  .connect(
"mongodb+srv://shreyas:bmOhvnf49Fdbo7Im@cluster0.fk4mv15.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Db Connected");
  })
  .catch((err) => {
    console.log("Failed" , err);
  });

  // ProductSchema

  const productSchema = new mongoose.Schema({
    product_name : {
        type : String,
        required : true
    },
    product_price : {
        type : String,
        required : true
    },
    isInstock : {
        type: Boolean,
        required : true
    },
    category : {
        type : String,
        required : true
    }
   
  })


  const productModel = mongoose.model('prodcuts' , productSchema)

  app.post('/api/products' , async(req , res)=>{
    const body = req.body

    const product = productModel.create({
        product_name : req.body.product_name,
        product_price : req.body.product_price,
        isInStock : req.body.isInStock,
        category : req.body.category
    })

    console.log(product)

    res.send(product);

    return res.status(201).json({message : " Product Created"})
  })




app.listen(8086, () => {
  console.log("Server sarted at port 8086");
});

