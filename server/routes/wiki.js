const express = require('express');
const router = express.Router();
const Page = require('../db/models/Page');
const main = require('../../views/main');
const User = require('../db/models/User');
const wikipage = require('../../views/wikipage');
const addpage = require('../../views/addpage');




// YOUR ROUTES GO HERE
// Each route is already mounted on /wiki

router.get('/', async (req, res, next) => {
    try {
        const pages = await Page.findAll();
        console.log(pages);
        res.send(main(pages));
    }
    catch(ex){
        next(ex);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const page = await Page.create({
            title: req.body.title,
            slug: req.body.title.split(' ').join('_'),
            content: req.body.content,
            status: req.body.status
        });
        const [user] = await User.findOrCreate({
            where: {
                email: req.body.email,
                name: req.body.name
            }
        });

        res.s
    }
    catch(ex){
        next(ex);
    }
});

router.get('/add', async (req, res, send) => {
    try{
        res.send(addpage());
    }
    catch(ex){
        next(ex);
    }
} );

router.get('/:slug', async (req, res, next) => {
    // console.log(req.params.slug);
    try{
        const page = await Page.findOne({
            where:{
                slug: req.params.slug
            }
        });

        // console.log('page.author', page.author);
        const author = await User.findOne({
            where:{
                id: page.authorId
            }
        });

        // console.log(author);
        res.send(wikipage(page, author));
    }
    catch(ex){
        next(ex);
    }   
});

module.exports = router;
