const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require('dotenv');

dotenv.config({path: '.env'})
app.use(express.json())

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Db Connected");
  })
  .catch((err) => {
    console.log("Db connection Failed", err);
  });

// ProductSchema

const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  product_price: {
    type: String,
    required: true,
  },
  isInStock: {
    type: Boolean,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const ProductModel = mongoose.model("products", productSchema);

// Create

app.post("/api/products", async (req, res) => {
   await ProductModel.create({
    product_name: req.body.product_name,
    product_price: req.body.product_price,
    isInStock: req.body.isInStock,
    category: req.body.category,
  });

  return res.status(201).json({ message: "Product Created" });
});


// get route

app.get('/api/products' , async(req , res)=>{
   const allProucts = await ProductModel.find({isInStock:true})

   return res.json(allProucts)
})

// Get product by id

app.get('/api/products/:id' , async(req , res)=>{
 const product = await ProductModel.findById(req.params.id)

 return res.json(product)
})

// Update product

app.put('/api/products/:id' , async(req , res)=>{
  const updatedProduct = await ProductModel.findByIdAndUpdate(req.params.id , req.body)
  return res.json(updatedProduct)
})


/// Delete a Resource

app.delete('/api/products/:id' , async(req , res)=>{
  const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id)

  res.json(deletedProduct)
})





app.listen(8086, () => {
  console.log("Server sarted at port 8086");
});