const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articles')

router.get('/', articlesController.getArticles);

router.get('/new', articlesController.getNewArticle);

router.get('/edit/:id', articlesController.getEditArticle);

router.get('/:slug', articlesController.slugify);

router.post('/', articlesController.createArticle) ;

router.put('/:id', articlesController.updateArticle);
// router.put('/:id', async (req, res, next) => {
//   req.article = await Article.findById(req.params.id)
//   next()
// }, saveArticleAndRedirect('edit'))

router.delete('/:id', articlesController.deleteArticle);
// router.delete('/:id', async (req, res) => {
//   await Article.findByIdAndDelete(req.params.id)
//   res.redirect('/')
// })

// function saveArticleAndRedirect(path) {
//   return async (req, res) => {
//     let article = req.article
//     article.title = req.body.title
//     article.description = req.body.description
//     article.markdown = req.body.markdown
//     try {
//       article = await article.save()
//       res.redirect(`/articles/${article.slug}`)
//     } catch (e) {
//       res.render(`articles/${path}`, { article: article })
//     }
//   }
// }

module.exports = router;