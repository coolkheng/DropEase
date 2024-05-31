const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const Order = require("./modal/ordermodal");
const app = express();
const port = 4000;

const uri =
  "mongodb+srv://admin:GGtVzRdYj2bucQ3o@dropease.itfjgle.mongodb.net/?retryWrites=true&w=majority&appName=dropease";

// Serve the React frontend as static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());

// Connect to MongoDB
async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}
connect();

// Image Storage Engine using Multer
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });

// Creating upload endpoint for images
app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// Schema for Creating Products
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: false,
  },
  mainImages: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  longdesc: {
    type: String,
    required: false,
  },
  rating: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  size: {
    type: [String],
    required: false,
  },
  color: {
    type: [String],
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    images: req.body.images,
    mainImages: req.body.mainImages,
    desc: req.body.desc,
    category: req.body.category,
    longdesc: req.body.longdesc,
    rating: req.body.rating,
    size: req.body.size,
    color: req.body.color,
    price: req.body.price,
    available: req.body.available,
  });
  console.log(product);
  await product.save();
  console.log("Saved");
  res.json({
    success: true,
    name: req.body.name,
  });
});

// Define Banner Schema and Model
const bannerSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  data: Buffer,
});

const Banner = mongoose.model("Banner", bannerSchema);

// Banner Storage Engine using Multer
const bannerStorage = multer.diskStorage({
  destination: "./upload/banners",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const uploadBanners = multer({ storage: bannerStorage });

// Image upload endpoint
app.post(
  "/upload-banners",
  uploadBanners.array("banners", 5),
  async (req, res) => {
    try {
      const files = req.files;
      const bannerPromises = files.map((file) => {
        const newBanner = new Banner({
          filename: file.originalname,
          contentType: file.mimetype,
          data: file.buffer,
        });
        return newBanner.save();
      });
      await Promise.all(bannerPromises);

      // Construct image URLs for each uploaded banner
      const imageUrls = files.map(
        (file) => `http://localhost:${port}/banners/${file.filename}`
      );

      res.status(201).json({
        success: 1,
        image_urls: imageUrls,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

// Creating API for getting all banners
app.get("/retailerBanner", async (req, res) => {
  let banners = await Banner.find({});
  console.log("Retailer Banners Fetched");
  res.send(banners);
});
// Creating API for getting all products
app.get("/allproduct", async (req, res) => {
  let products = await Product.find({});
  console.log("All Products Fetched");
  res.send(products);
});

app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find(); // Fetch all orders
    console.log("All orders fetched");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Start the Express server
app.listen(port, (error) => {
  if (!error) {
    console.log("Server Running on Port " + port);
  } else {
    console.log("Error: " + error);
  }
});
