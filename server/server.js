const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/Product')
const Tag = require('./models/Tag')
const Category = require('./models/Category')
const Slide = require('./models/Slide')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const app = express()
const port = 5000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://sambath:sambath123@authtest-yurlh.mongodb.net/test?retryWrites=true&w=majority', { 
    useNewUrlParser: true,
    useCreateIndex: true
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.get('/api/allproducts', (req, res) => {
  Product.find({})
    .then((products) => {
      res.json(products)
    })
    .catch(err => console.log(err))
})
app.get('/api/product/:id', (req, res) => {
  Product.findOne({_id: req.params.id})
    .then((product) => {
      res.json(product)
    })
    .catch(err => console.log(err))
})
app.get('/api/gettags',auth, (req, res) => {
  Tag.find({})
    .then(tags =>{
      res.json(tags)
    })
    .catch(err => console.log(err))
});
app.post('/api/addtag', auth, (req, res)=>{
  if(req.body.newTag == ''){
    res.send("idiot you input nothing")
  }
  const newTag = new Tag({
    name: req.body.newTag
  })
  newTag.save()
  res.send("tag added to database")
})
// app.get('/api/getuser', auth, (req, res)=>{
//   res.json(req.user)
// })
app.post('/api/add', auth, (req, res) => {
  const {name, price, des, category, tags, img_url} = req.body
  const newProduct = new Product({
    name: name,
    description: des,
    price: price,
    category_id: category,
    img_url: img_url,
    tags: tags
  })
  newProduct.save()
  console.log(req.body)
  res.send('Product Added From Server')
});
app.delete('/api/delete/product/:id', auth, (req, res)=>{
  Product.deleteOne({ _id: req.params.id }, (res, err) => {
    if(err) console.log(err)
    console.log(res)
  });
  res.send('Product ID: '+req.params.id+' deleted')
})
app.get('/api/getcategories', auth, (req, res) => {
  Category.find({})
    .then(categories =>{
      res.json(categories)
    })
    .catch(err => console.log(err))
});

app.get('/api/category/:cat', (req, res) => {
  const engCat = req.params.cat
  let khCat = ""
  if(engCat == "construction"){
    khCat = "គ្រឿងសំណង់"
  }else if(engCat == "mechanic"){
    khCat = "គ្រឿងជាង"
  }else if(engCat == "housetools"){
    khCat = "គ្រឿងចាប់ហួយ"
  }
  Category.findOne({name: khCat})
    .then(cat => {
      Product.find({category_id: cat._id})
        .then((products) => {
          res.json(products)
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
  
})
app.get('/api/search/:keyword', (req, res) => {
  const keyWord = req.params.keyword
  const search = new RegExp(keyWord)
  Product.find({name: search})
    .then(products => {
      console.log(products)
      res.json(products)
    })
    .catch(err => console.log(err))
  
})
app.get('/api/getuser', auth, (req, res)=>{
  console.log(req.user)
  res.json({
    user:{
      username: req.user.user.username,
      position: req.user.user.position,
    }
  })
})
app.post('/api/addslide', (req, res)=>{
  const newSlide = new Slide({
    url: "https://images.odysseytours.net/article/30000/sunrise-angkor-wat_27553.jpg"
  })
  newSlide.save()
  res.send("slide added")
})
app.get('/api/getslide', (req, res)=>{
  Slide.find({}).then(slides=>{
    res.json(slides)
  })
  
})

app.post('/api/login', (req, res)=>{
  console.log(req.body.name)
  const user = {
      username: "sambath",
      position: 'admin',
      pw: '123'
  }
  if(user.username == req.body.name){
    if(user.pw == req.body.pw){
      jwt.sign({user: user}, 'jwtSecret', (err, token)=>{
        console.log(
          { 
            token, 
            user:{
              username: user.username,
              position: user.position
            } 
          }
        )
        res.json({ 
          token, 
          user:{
            username: user.username,
            position: user.position
          } 
        })
      })
    }
  }else{
    res.send('Problems')
  }
})

function auth(req, res, next) {
  const token = req.header('Authorization');
  // Check for token
  if (!token)
    return res.status(401).json({ msg: 'No token, authorizaton denied' });

  try {
    // Verify token
    const decoded = jwt.verify(token, 'jwtSecret');
    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))