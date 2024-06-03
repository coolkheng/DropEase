const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const app = express();
const port = 4000;

const uri =
  "mongodb+srv://admin:GGtVzRdYj2bucQ3o@dropease.itfjgle.mongodb.net/?retryWrites=true&w=majority&appName=dropease";

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

// Serve the React frontend as static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());

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
  storeId: {
    type: Number,
    ref: "User", // Reference to the User model's storeId
    required: true,
  },
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

// Banners upload endpoint
app.use("/banners", express.static("upload/banners"));
app.post(
  "/upload-banners",
  uploadBanners.single("banner"),
  async (req, res) => {
    try {
      const { storeId } = req.body; // Extract storeId from the request body
      const file = req.file;

      if (!storeId) {
        return res.status(400).json({ error: "storeId is required" });
      }

      // Save the uploaded file as a banner document in MongoDB
      const newBanner = new Banner({
        storeId,
        filename: file.originalname,
        contentType: file.mimetype,
        data: file.buffer,
      });
      await newBanner.save();

      // Construct the image URL for the uploaded banner
      const imageUrl = `http://localhost:${port}/banners/${file.originalname}`;

      res.status(201).json({
        success: 1,
        image_url: imageUrl,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);
// Creating API for getting all banners
app.get("/retailerBanner", async (req, res) => {
  try {
    const storeId = req.query.storeId;
    if (!storeId) {
      return res.status(400).send("Store ID is required.");
    }

    const banners = await Banner.find({ storeId });
    console.log("Retailer Banners Fetched");
    res.status(200).json(banners);
  } catch (error) {
    console.error("Error fetching banners:", error);
    res.status(500).send("An error occurred while fetching banners.");
  }
});

// Creating API for getting all products
app.get("/allproduct", async (req, res) => {
  try {
    const products = await Product.find({});
    console.log("All Products Fetched");
    res.json(products); // Use res.json to explicitly send JSON data
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Define the Users schema and model
const UsersSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String },
  store: { type: String },
  phoneno: { type: String },
  category: { type: String },
  storeId: { type: Number, unique: true }, // Correct usage of unique option
});
UsersSchema.plugin(AutoIncrement, { inc_field: "storeId" });
const Users = mongoose.model("Users", UsersSchema);

// Creating Endpoint for registering user
app.post("/signup", async (req, res) => {
  try {
    let check = await Users.findOne({ email: req.body.email }); // Check if the user has been registered before
    if (check) {
      return res.status(400).json({
        success: false,
        errors: "Existing user found with the same email address",
      });
    }

    const user = new Users({
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      imageUrl: "",
      store: "",
      phoneno: "",
      category: "",
    });

    await user.save(); // Save user in the database

    // Create token
    const data = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(data, "secret_token");
    res.json({ success: true, token });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      errors: "Server error. Please try again later.",
    });
  }
});

// Creating endpoint for user log in
app.post("/login", async (req, res) => {
  try {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
      const passCompare = req.body.password === user.password; // compare password
      if (passCompare) {
        const data = {
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
          },
        };
        const token = jwt.sign(data, "secret_token");
        res.json({ success: true, token, role: user.role, userData: user });
      } else {
        res.json({ success: false, errors: "Wrong Password" });
      }
    } else {
      res.json({ success: false, errors: "User not exist" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Get all store
app.get("/allstore", async (req, res) => {
  try {
    const store = await Users.find({ role: "retailer" });
    console.log("All Store Fetched");
    res.json(store);
  } catch (error) {
    console.error("Error fetching store:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/store/:storeId", async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const store = await Users.findOne({ storeId });
    if (store) {
      res.json({ success: true, store });
    } else {
      res.status(404).json({ success: false, errors: "Store not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, errors: "Internal Server Error" });
  }
});


app.get('/searchstore',async(req,res)=>{
  const query = req.query.q;
  try {
    const stores = await Users.find({
      role:"retailer",
      $or:[
        {store:{$regex:query,$options:'i'}},
        {category:{$regex:query,$options:'i'}}
      ]
    });
    res.json(stores);
  } catch (error) {
    console.error(error);
    res.status(500).json({message:"Server Error"});
  }
});

// Creating middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res
      .status(401)
      .send({ errors: "Please authenticate using valid authentication" });
  } else {
    try {
      const data = jwt.verify(token, "secret_token");
      req.user = data.user;
      next();
    } catch (error) {
      res
        .status(401)
        .send({ errors: "Please authenticate using a valid token" });
    }
  }
};

// Multer configuration for profile image upload
const profileStorage = multer.diskStorage({
  destination: "./uploads/profiles",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const uploadProfile = multer({ storage: profileStorage });

// Profile image upload endpoint
app.post("/upload-profile", uploadProfile.single("image"), (req, res) => {
  try {
    const filePath = req.file.path;
    // Save the file path or URL to the user's profile
    const imageUrl = `http://localhost:${port}/${filePath}`;
    res.json({ imageUrl });
  } catch (error) {
    console.error("Error uploading profile image:", error);
    res.status(500).json({ errors: "Internal Server Error" });
  }
});

// Creating user data endpoint
app.post("/userData", fetchUser, async (req, res) => {
  try {
    const user = await Users.findById(req.user.id).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ success: false, errors: "User not found" });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ success: false, errors: "Internal Server Error" });
  }
});

// POST endpoint to update user profile
app.post("/updateprofile", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(`Updating profile for user ID: ${userId}`);

    // Find the user by their ID
    let user = await Users.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's profile fields
    user.imageUrl = req.body.imageUrl || user.imageUrl; // Use the provided imageUrl if available, otherwise keep the existing one
    user.store = req.body.store || user.store; // Use the provided store if available, otherwise keep the existing one
    user.phoneno = req.body.phoneno || user.phoneno; // Use the provided phoneno if available, otherwise keep the existing one
    user.category = req.body.category || user.category; // Use the provided category if available, otherwise keep the existing one

    // Save the updated user profile
    await user.save();
    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ errors: "Internal Server Error" });
  }
});

const CartCustomerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  cartData: {
    type: Map,
    of: Number,
    default: {},
  },
});

const CartCustomer = mongoose.model("CartCustomer", CartCustomerSchema);

//TODO: Change productId based on Eugene's product-id
app.post("/addtocart", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    console.log("User ID:", userId);
    console.log("Product ID:", productId);

    // Convert productId to string
    const productIdStr = String(productId);

    // Find cart data for the user
    let cart = await CartCustomer.findOne({ userId });

    if (!cart) {
      // Create new cart if not exists
      cart = new CartCustomer({
        userId,
        cartData: new Map([[productIdStr, 1]]),
      });
    } else {
      // Update existing cart
      if (cart.cartData.has(productIdStr)) {
        cart.cartData.set(productIdStr, cart.cartData.get(productIdStr) + 1);
      } else {
        cart.cartData.set(productIdStr, 1);
      }
    }

    await cart.save();
    res.json({ message: "Added to cart" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ errors: "Internal Server Error" });
  }
});


//TODO: Change productId based on Eugene's product-id
app.post("/removefromcart", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    console.log("User ID:", userId);
    console.log("Product ID:", productId);

    // Convert productId to string
    const productIdStr = String(productId);

    // Find cart data for the user
    let cart = await CartCustomer.findOne({ userId });

    if (!cart || !cart.cartData.has(productIdStr)) {
      return res.status(404).json({ errors: "Product not found in cart" });
    }

    // Remove product from cart
    cart.cartData.delete(productIdStr);

    await cart.save();
    res.json({ message: "Removed from cart" });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ errors: "Internal Server Error" });
  }
});
//TODO: Change productId based on Eugene's product-id
app.post("/decreasequantity", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    console.log("User ID:", userId);
    console.log("Product ID:", productId);

    // Convert productId to string
    const productIdStr = String(productId);

    // Find cart data for the user
    let cart = await CartCustomer.findOne({ userId });

    if (!cart || !cart.cartData.has(productIdStr)) {
      return res.status(404).json({ errors: "Product not found in cart" });
    }

    const productQuantity = cart.cartData.get(productIdStr);

    if (productQuantity > 1) {
      // Decrease quantity if more than 1
      cart.cartData.set(productIdStr, productQuantity - 1);
    } else {
      // Remove product from cart if quantity is 1
      cart.cartData.delete(productIdStr);
    }

    await cart.save();
    res.json({ message: "Quantity decreased" });
  } catch (error) {
    console.error("Error decreasing quantity:", error);
    res.status(500).json({ errors: "Internal Server Error" });
  }
});

app.post("/getcart", fetchUser, async (req, res) => {
  try {
    console.log("GetCart");
    const userId = req.user.id;
    let userCart = await CartCustomer.findOne({ userId });

    if (!userCart) {
      return res.status(404).json({ errors: "Cart Not Found" });
    }

    let cartItems = [];

    for (let [productIdStr, quantity] of userCart.cartData) {
      let product = await Product.findOne({ id: productIdStr }); // Use the correct field here
      if (product) {
        cartItems.push({
          product: product,
          quantity: quantity,
        });
      }
    }
    res.json(cartItems);
  } catch (error) {
    console.error("Error fetching cart data:", error);
    res.status(500).json({ errors: "Internal Server Error" });
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
