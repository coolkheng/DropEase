const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const jwt = require('jsonwebtoken');

const app = express();
const port = 4000;

const uri = "mongodb+srv://admin:GGtVzRdYj2bucQ3o@dropease.itfjgle.mongodb.net/?retryWrites=true&w=majority&appName=dropease";

// Serve the React frontend as static files
app.use(express.static(path.join(__dirname + "/public")));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
var nodemailer = require('nodemailer');


app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");


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
app.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// Schema for Creating Products
const Product = mongoose.model("Product", {
  id: Number,
  name: String,
  images: [String],
  mainImages: String,
  desc: String,
  longdesc: String,
  rating: Number,
  category: String,
  size: [String],
  color: [String],
  price: Number,
  available: Boolean,
});

app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

  const product = new Product({
    id,
    ...req.body,
  });

  await product.save();
  res.json({ success: true, name: req.body.name });
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
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const uploadBanners = multer({ storage: bannerStorage });

// Image upload endpoint
app.post("/upload-banners", uploadBanners.array("banners", 5), async (req, res) => {
  try {
    const files = req.files;
    const bannerPromises = files.map(file => {
      const newBanner = new Banner({
        filename: file.originalname,
        contentType: file.mimetype,
        data: file.buffer,
      });
      return newBanner.save();
    });
    await Promise.all(bannerPromises);

    const imageUrls = files.map(file => `http://localhost:${port}/banners/${file.filename}`);
    res.status(201).json({ success: 1, image_urls: imageUrls });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/retailerBanner", async (req, res) => {
  let banners = await Banner.find({});
  res.send(banners);
});

app.get('/allproduct', async (req, res) => {
  let products = await Product.find({});
  res.send(products);
});

// Schema for User model
const Users = mongoose.model('Users', {
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  imageUrl: {type: String},
  store: { type: String },
  phoneno: { type: String },
  category: { type: String },
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
            email: user.email,
            role: user.role
          }
        };
        const token = jwt.sign(data, 'secret_token');
        res.json({ success: true, token, role: user.role, userData: user });
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
    res.status(401).send({errors:"Please authenticate using valid authentication"});
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

// Multer configuration for profile image upload
const profileStorage = multer.diskStorage({
  destination: './uploads/profiles',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const uploadProfile = multer({ storage: profileStorage });

// Profile image upload endpoint
app.post('/upload-profile', uploadProfile.single('image'), (req, res) => {
  try {
    const filePath = req.file.path;
    // Save the file path or URL to the user's profile
    const imageUrl = `http://localhost:${port}/${filePath}`;
    res.json({ imageUrl });
  } catch (error) {
    console.error('Error uploading profile image:', error);
    res.status(500).json({ errors: 'Internal Server Error' });
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
app.post('/updateprofile', fetchUser, async (req, res) => {
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

app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try{
    console.log("email: " , {email});
    const oldUser = await Users.findOne({email});
    if(!oldUser) {
      return res.json({ status: "User not exist"});
    }

    const token = jwt.sign({email: oldUser.email, id: oldUser._id}, 'secret_token', {
      // expiresIn: "5m"
    });
    const link = `http://localhost:4000/reset-password/${oldUser._id}/${token}`;
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'rachelteoh14@gmail.com',
        pass: 'amdatqkdipshbqdv'
      }
    });
    
    var mailOptions = {
      from: 'youremail@gmail.com',
      to: req.body.email,
      subject: 'Password Reset',
      text: link,
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        return res.json({ status: "Email sent successfully" });
      }
    });
    console.log(link);
  } catch (error) {}
});

app.get('/reset-password/:id/:token', async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const oldUser = await Users.findOne({ _id: id });
  if(!oldUser) {
    return res.json({ status: "User not exist"});
  }
  try{
    const verify = jwt.verify(token, 'secret_token');
    res.render("index", {email: verify.email, status: "Not Verified"})
  } catch (error) {
    res.send("Not Verified");
  }
});

app.post('/reset-password/:id/:token', async (req, res) => {
  const { id, token } = req.params;
  const password = req.body.password;
  console.log("password", password);
  const oldUser = await Users.findOne({ _id: id });
  if(!oldUser) {
    return res.json({ status: "User not exist"});
  }
  try{
    const verify = jwt.verify(token, 'secret_token');
    //const encryptedPassword = await bcrypt.hash(password, 10);
    await Users.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: password,
        },
      }
    );
    res.render("index", { email: verify.email, status: "verified" });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
});

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


// Start the Express server
app.listen(port, error => {
  if (!error) {
    console.log("Server Running on Port " + port);
  } else {
    console.log("Error: " + error);
  }
});
