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




app.listen(8086, () => {
  console.log("Server sarted at port 8086");
});