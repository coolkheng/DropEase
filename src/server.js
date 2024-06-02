const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const jwt = require('jsonwebtoken');

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
  images:{
    type:[String],
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
  size:{
    type:[String],
    required: false,
  },
  color:{
    type:[String],
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
app.get('/allproduct',async(req,res)=>{
  let products = await Product.find({});
  console.log("All Products Fetched");
  res.send(products);
})

//Shema craeting for User model
const Users = mongoose.model('Users',{
  name:{
    type:String,
  },
  email:{
    type:String,
    required:[true,"Your email address is required"],
    unique:true,
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  role: {
    type: String,
    required: [true, "Your role is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Creating Endpoint for registering user
app.post("/signup", async (req, res) => {
  try {
    let check = await Users.findOne({ email: req.body.email }); // Check if the user has been registered before
    if (check) {
      return res.status(400).json({ success: false, errors: "Existing user found with the same email address" });
    }

    const user = new Users({
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });

    await user.save(); // Save user in the database

    // Create token
    const data = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(data, 'secret_token');
    res.json({ success: true, token });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ success: false, errors: "Server error. Please try again later." });
  }
});


// Creating endpoint for user log in
app.post('/login', async (req, res) => {
  try {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
      const passCompare = req.body.password === user.password; // compare password
      if (passCompare) {
        const data = {
          user: {
            id: user.id,
            role: user.role
          }
        };
        const token = jwt.sign(data, 'secret_token');
        res.json({ success: true, token, role: user.role }); // Include role in the response
      } else {
        res.json({ success: false, errors: "Wrong Password" });
      }
    } else {
      res.json({ success: false, errors: "User not exist" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});



// Creating middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header('auth-token');
  if(!token){
    res.status(401).send({eorrors:"Please authenticate using valid authentication"});
  }else{
    try {
      const data=jwt.verify(token,'secret_token');
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({errors:"Please authenticate using a valid token"});
    }
  }
};

const CartCustomerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  cartData: {
    type: Map,
    of: Number,
    default: {}
  }
});

const CartCustomer = mongoose.model('CartCustomer', CartCustomerSchema);

app.post('/addtocart', fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    // Find cart data for the user
    let cart = await CartCustomer.findOne({ userId });
    
    if (!cart) {
      // Create new cart if not exists
      cart = new CartCustomer({ userId, cartData: { [productId]: 1 } });
    } else {
      // Update existing cart
      if (cart.cartData.has(productId)) {
        cart.cartData.set(productId, cart.cartData.get(productId) + 1);
      } else {
        cart.cartData.set(productId, 1);
      }
    }

    await cart.save();
    res.send("Added to cart");
  } catch (error) {
    res.status(500).send({ errors: "Internal Server Error" });
  }
});

// Define the schema for cart items
const CartRetailerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  cartData: {
    type: Map,
    of: Number,
    default: {}
  }
}, { timestamps: true });

const CartRetailer = mongoose.model('CartRetailer', CartRetailerSchema);

app.post('/cartretailer', fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    // Find cart data for the user
    let cart = await CartRetailer.findOne({ userId });
    
    if (!cart) {
      // Create new cart if not exists
      cart = new CartRetailer({ userId, cartData: { [productId]: quantity } });
    } else {
      // Update existing cart
      if (cart.cartData.has(productId)) {
        cart.cartData.set(productId, cart.cartData.get(productId) + quantity);
      } else {
        cart.cartData.set(productId, quantity);
      }
    }

    await cart.save();
    console.log('Cart saved:', cart); // Log the cart object
    res.send("Added to cart");
  } catch (error) {
    console.error('Error adding to cart:', error); // Log any errors
    res.status(500).send({ errors: "Internal Server Error" });
  }
});

app.post('/cartretailer/checkout', fetchUser, async (req, res) => {
  try {
    console.log('Checkout endpoint reached');
    console.log('Request body:', req.body); // Log the request body to see the payload
    
    const userID = req.user.id;

    // Find retailer cart for the user
    const cartRetailer = await CartRetailer.findOne({ userId: userID });
    console.log('Retrieved cart:', cartRetailer); // Log the retrieved cart
    
    if (!cartRetailer || Object.keys(cartRetailer.cartData).length === 0) {
      return res.status(400).json({ success: false, errors: "No items in retailer cart" });
    }

    // Process the order (this part can include order creation, payment processing, etc.)
    // For this example, we'll simply clear the cart

    console.log('Cart before clearing:', cartRetailer.cartData); // Log cart data before clearing

    cartRetailer.cartData = {};
    await cartRetailer.save();

    console.log('Cart after clearing:', cartRetailer.cartData); // Log cart data after clearing

    res.json({ success: true, message: "Checkout successful" });
  } catch (error) {
    console.error('Checkout error:', error); // Log any errors
    res.status(500).send({ errors: "Internal Server Error" });
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