const express = require('express');
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');
const Posts = require('./models/Posts');

const app = express();


app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.json())

mongoose.connect('mongodb://localhost/cleanBlog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.static('public'));

app.get('/', async (req, res) => {
  const posts = await Posts.find({});
  res.sendFile(path.resolve(__dirname, 'views/index.ejs'));
  res.render('index', {
    posts: posts,
  });
});

app.get('/about', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'views/about.ejs'));
  res.render('about');
});

app.get('/add_post', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'views/add_post.ejs'));
  res.render('add_post');
});

app.get('/post', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'views/post.ejs'));
  res.render('post');
});
app.get('/index', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'views/index.ejs'));
  res.render('index');
});

app.post('/posts', async (req, res) => {
  await Posts.create(req.body)
  res.sendFile(path.resolve(__dirname, 'views/index.ejs'));
  res.redirect('/');
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} ile başlatıldı.`);
});
