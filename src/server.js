const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const stripe = require("stripe")("sk_test_51PNRN72MhvOMkL1SzV5ouwWSRSIy1ZCrAJByjrtfK9zvwyPiTkTvdh1nuStkEK2U2OGDVNK7MAeC8u1hta9u6pK300Hz6UOdQv")
const router = express.Router();
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

app.get('/retailerproduct',async(req,res)=>{
  const hello = req.userID;
  let retailerproducts = await RetailerProduct.findOne({hello});
  console.log("All Retailer Products Fetched");
  console.log(res);
  res.send(retailerproducts);
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

// Define the schema for archived cart data
const RetailerProductSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
    unique: true // Add unique constraint on userId
  },
  cartData: {
    type: Map,
    of: Number,
    default: {}
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Create the Mongoose model for the "retailerproduct" collection
const RetailerProduct = mongoose.model('retailerproduct', RetailerProductSchema);

app.post('/cartretailer', fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity} = req.body;

    // Ensure productId and quantity are properly typed
    const prodId = String(productId); // Convert productId to string because Map keys are strings
    const qty = Number(quantity);

    // Find cart data for the user
    let cart = await CartRetailer.findOne({ userId });

    if (!cart) {
      // Create new cart if it doesn't exist
      cart = new CartRetailer({ userId, cartData: { [prodId]: qty } });
    } else {
      // Update existing cart
      if (cart.cartData.has(prodId)) {
        cart.cartData.set(prodId, cart.cartData.get(prodId) + qty);
      } else {
        cart.cartData.set(prodId, qty);
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
    console.log('Request body:', req.body);

    const userID = req.user.id;

    const cartRetailer = await CartRetailer.findOne({ userId: userID });
    console.log('Retrieved cart:', cartRetailer);

    if (!cartRetailer || Object.keys(cartRetailer.cartData).length === 0) {
      return res.status(400).json({ success: false, errors: "No items in retailer cart" });
    }

    console.log('Cart before clearing:', cartRetailer.cartData);

    cartRetailer.cartData = {};
    await cartRetailer.save();

    console.log('Cart after clearing:', cartRetailer.cartData);

    res.json({ success: true, message: "Checkout successful" });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).send({ errors: "Internal Server Error" });
  }
});



app.post('/cartretailer/decreaseQty', fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    // Ensure productId is properly typed
    const prodId = String(productId); // Convert productId to string because Map keys are strings

    // Find cart data for the user
    let cart = await CartRetailer.findOne({ userId });

    if (!cart) {
      return res.status(400).json({ success: false, errors: "No cart found for the user" });
    }

    // Decrease quantity of the specified product
    if (cart.cartData.has(prodId) && cart.cartData.get(prodId) > 1) {
      cart.cartData.set(prodId, cart.cartData.get(prodId) - 1);
      await cart.save();
      console.log('Cart updated after decreasing quantity:', cart);
      res.send("Quantity decreased");
    } else {
      res.status(400).json({ success: false, errors: "Cannot decrease quantity further" });
    }
  } catch (error) {
    console.error('Error decreasing quantity:', error); // Log any errors
    res.status(500).send({ errors: "Internal Server Error" });
  }
});

// Add this route to your backend
app.post('/cartretailer/removeFromCart', fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    // Convert productId to string because Map keys are strings
    const prodId = String(productId);

    console.log('Request received to remove product ID:', prodId);

    // Find cart data for the user
    let cart = await CartRetailer.findOne({ userId });

    if (!cart) {
      console.log('No cart found for user ID:', userId);
      return res.status(400).json({ success: false, errors: "No cart found for the user" });
    }

    // Remove the specified product from the cart
    if (cart.cartData.has(prodId)) {
      cart.cartData.delete(prodId);
      await cart.save();
      console.log('Cart updated after removing item:', cart);
      res.send("Item removed from cart");
    } else {
      console.log('Item not found in cart for product ID:', prodId);
      res.status(400).json({ success: false, errors: "Item not found in cart" });
    }
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).send({ errors: "Internal Server Error" });
  }
});

// Stripe Payment Integration
app.post('/create-checkout-session', fetchUser, async (req, res) => {
  try {
    const { products, userId } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: products.map(product => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: product.price * 100,
        },
        quantity: product.quantity,
      })),
      mode: 'payment',
      success_url: 'http://localhost:3000/foodbeverages',
      cancel_url: 'http://localhost:3000/foodbeverages',
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).send({ errors: "Internal Server Error" });
  }
});


app.post('/cartretailer/clear', fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;

    // Find retailer cart for the user
    let cart = await CartRetailer.findOne({ userId });

    if (cart) {
      // Create a copy of the cart data for archiving
      const archivedCartData = new Map(cart.cartData);

      // Check for existing archived cart for the user
      let existingArchivedCart = await RetailerProduct.findOne({ userId });

      if (existingArchivedCart) {
        for (const [productId, quantity] of archivedCartData.entries()) {
          if (existingArchivedCart.cartData.has(productId)) {
            // Update quantity if product exists
            existingArchivedCart.cartData.set(productId, existingArchivedCart.cartData.get(productId) + quantity);
          } else {
            // Set quantity correctly for new product
            existingArchivedCart.cartData.set(productId, quantity);
          }
        }
        await existingArchivedCart.save();
      } else {
        // Create new archived cart if none exists
        const archivedCart = new RetailerProduct({
          userId,
          cartData: archivedCartData
        });
        await archivedCart.save();
      }

      // Clear the cart data from the main collection
      cart.cartData.clear();
      await cart.save();

      console.log('Cart cleared and archived successfully:', existingArchivedCart || archivedCart);
      res.json({ success: true, message: "Cart cleared successfully" });
    } else {
      res.status(400).json({ success: false, message: "No cart found for user" });
    }
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).send({ errors: "Internal Server Error" });
  }
});



// Route to fetch retailer products
app.get('/retailerproduct', async (req, res) => {
  try {
    // Fetch all retailer products from the MongoDB collection
    const retailerProducts = await RetailerProduct.find();
    res.json(retailerProducts); // Send the retailer products data as JSON response
  } catch (error) {
    console.error('Error fetching retailer products:', error);
    res.status(500).json({ error: 'Failed to fetch retailer products' }); // Send an error response if fetching fails
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