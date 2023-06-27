const express=require('express');
const{createIdea,likeIdea,updateIdea,deleteIdea,removeIdeaFromDisplay,getAllIdeas,getUserIdeas,getIdea, saveIdeaInCart,searchIdeas,filterIdeasByCategory,displaySortedIdeas, }=require('../controllers/IdeaController')
  

 
const router=express.Router();
const protect=require('../middleware/auth');
//const { upload } = require('../config/cloudinary');
router.use(protect);
router.post('/create',protect,createIdea);
router.post('/like/:id',likeIdea);
router.put('/:id',updateIdea);
router.delete('/:id', deleteIdea);
router.put('/remove-from-display/:id', removeIdeaFromDisplay);
router.get('/user', getUserIdeas);
router.get('/',getAllIdeas);
router.get('/:id',getIdea);
router.post('/save-in-cart/:id', saveIdeaInCart);
router.get('/search', searchIdeas);
router.get('/filter/:category', filterIdeasByCategory);
router.get('/sort', displaySortedIdeas);

module.exports=router;