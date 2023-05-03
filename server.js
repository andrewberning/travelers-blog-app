const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const articleRouter = require('./routes/articles');
const methodOverride = require('method-override');
const PORT = process.env.PORT || 8000;
const app = express();

require('dotenv').config({ path: './config/.env' });

connectDB();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// app.get('/', async (req, res) => {
//   console.log('Get the articles')
//   const articles = await Article.find().sort({ createdAt: 'desc' });
//   res.render('articles/index', { articles: articles});
// })

app.use('/', articleRouter);

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
})



