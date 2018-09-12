const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {ensureAuthenticated} = require('../helpers/auth');


// Load Idea Model
require('../models/Idea');
const Idea = mongoose.model('ideas');

// Ideas Route
router.get('/', ensureAuthenticated, (req, res) => {
    Idea.find().sort({date:'desc'}).then(ideas => {
        res.render('ideas/index', {
            ideas: ideas
        })
    })
})

// Add Form Route
router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('ideas/add')
})

// Edit Form Route
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    Idea.findOne({
        _id: req.params.id
    }).then(idea => {
        if(idea.user != req.user.id){
            req.flash('error_msg', 'Not Authorized');
            res.redirect('/ideas');
        }
        else{
            res.render('ideas/edit', {
                idea: idea
            })
        }
    })
})

// myAd Route
router.get('/myad', ensureAuthenticated, (req, res) => {
    Idea.find({user: req.user.id}).sort({date:'desc'}).then(myad => {
        res.render('ideas/myIdeas', {
            ideas: myad
        })
    })
})

// Process Form
router.post('/', ensureAuthenticated, (req, res) =>{
    let errors = [];

  if(!req.body.title){
    errors.push({text:'Please add a title'});
  }
  if(!req.body.details){
    errors.push({text:'Please add some details'});
  }

  if(errors.length > 0){
    res.render('ideas/add', {
        errors: errors,
        title: req.body.title,
        details: req.body.details
      });
    } else {
      const newUser = {
        title: req.body.title,
        category: req.body.category,
        details: req.body.details,
        name: req.body.name,
        phone: req.body.phone,
        city: req.body.city,
        price: req.body.price,
        image: req.body.image,
        user: req.user.id
      }
      new Idea(newUser)
        .save()
        .then(idea => {
          req.flash('success_msg', 'Added successfully');
          res.redirect('/ideas');
        })
}
});    

// Edit Form process
router.put('/:id', ensureAuthenticated, (req,res) => {
    Idea.findOne({
        _id: req.params.id
    }).then(idea =>{
        idea.title = req.body.title;
        idea.category = req.body.category;
        idea.details = req.body.details;
        idea.name = req.body.name;
        idea.phone = req.body.phone;
        idea.city = req.body.city;
        idea.price = req.body.price;

        idea.save().then(idea =>{
            req.flash('success_msg', 'Updated successfully');
            res.redirect('/ideas');
        })
    })
})

// Delete process
router.delete('/:id', ensureAuthenticated, (req, res) =>{
    Idea.deleteOne({
        _id: req.params.id
    }).then(() =>{
        req.flash('success_msg', 'Deleted successfully');
        res.redirect('/ideas');
    })
})




module.exports = router;