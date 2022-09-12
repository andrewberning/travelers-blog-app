const Article = require('../models/Article');

module.exports = {
  getArticles: async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' });
    res.render('index', { articles: articles});
  },
  getNewArticle: async (req, res) => {
    try {
      res.render('new', { article: new Article() })
    } catch (err) {
      console.log(err);
    }
  },
  getEditArticle: async (req, res) => {
    try {
      const article = await Article.findById(req.params.id)
      res.render('edit', { article: article })
    } catch (err) {
      console.log(err);
    }
  },
  slugify: async (req, res) => {
    try {
      const article = await Article.findOne({ slug: req.params.slug })
      if( article == null) res.redirect('/')
      res.render('show', { article: article });
    } catch (err) {
      console.log(err);
    }
  },
  createArticle: async (req, res) => {
    console.log(req.body)
    req.article = new Article();
    let article = req.article
    article.title = req.body.title
    article.description = req.body.description
    article.markdown = req.body.markdown
    try {
      article = await article.save()
      res.redirect(`/${article.slug}`)
      console.log('Article Created!');
    } catch (e) {
      res.render(`new`, { article: article })
    } 
  },
  updateArticle: async (req, res, next) => {
    console.log(req.params.id);
    req.article = await Article.findByIdAndUpdate(req.params.id)
    let article = req.article
    article.title = req.body.title
    article.description = req.body.description
    article.markdown = req.body.markdown
    try {
      article = await article.save();
      res.redirect(`/${article.slug}`)
      console.log(`Article Edited!`)
    } catch (e) {
      res.render('edit', {article: article})
    }
  },
  deleteArticle: async (req, res) => {
    console.log(req.params.id);
    try {
      await Article.findByIdAndDelete(req.params.id);
      console.log('Article Deleted');
      res.redirect('/');
    } catch (err) {
      console.log(err);
    }
  }
  
}
