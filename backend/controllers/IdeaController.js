const Idea=require('../models/IdeaModel');
const multer=require('multer');
const cloudinary=require('cloudinary').v2;
const fs=require('fs');

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key:process.env.CLOUDINARY_API_KEY,
   api_secret:process.env.CLOUDINARY_API_SECRET,
});

const storage=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,"uploads");
  },
  filename:(req,file,cb)=>{
    cb(
      null,
      new Date().toISOString.replace(/:/g,'-')+'-'+file.originalname
    );
  },
});

function fileFilter(req,file,cb) {
  if (
     file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'||
    file.mimetype==='video/mp4'
  ) {
    cb(null,true);
  }else{
    cb(null,false);
  }
}

// Create a Multer instance
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
})

//create a new idea
const createIdea=async(req,res)=>{
  try {
    const { title, category, description } = req.body;
    const owner = req.user; 

    // Upload image and video to Cloudinary
    const uploadedImage = await uploadToCloudinary(req.file('image'));
    const uploadedVideo = await uploadToCloudinary(req.file('video'));


    // Delete uploaded files from the server
    deleteUploadedFiles(req.files);

    if (!title||!category||!description) {
      return res.status(400).json('please fill all the required information');
    }
    
    const idea = await Idea.create({
      title,
      category,
      description,
      image: uploadedImage.secure_url,
      video: uploadedVideo.secure_url,
      owner,
     
    });
    await idea.save();
    res.status(201).json({ success: true, idea });
  } catch (error) {
    // Delete uploaded files from the server in case of an error
    deleteUploadedFiles(req.files);
    res.status(500).json({success:false,error:error.message});
  }
  };

// Helper function to upload file to Cloudinary
function uploadToCloudinary(file) {
  return new Promise((resolve, reject) => {
    file.upload(
      {
        adapter: require('skipper-cloudinary'),
        cloudinary: cloudinary,
        folder: 'your_folder_name',
        allowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'mp4'],
        maxBytes: 10 * 1024 * 1024, // 10MB
      },
      (error, uploadedFiles) => {
        if (error) {
          reject(error);
        } else {
          resolve(uploadedFiles[0]);
        }
      }
    );
  });
}

// Helper function to delete uploaded files from the server
function deleteUploadedFiles(files) {
  if (files && files.length > 0) {
    files.forEach((file) => {
      fs.unlink(file.path, (error) => {
        if (error) {
          console.error('Failed to delete file:', file.path);
        }
      });
    });
  }
}

//Like an idea
const likeIdea=async(req,res)=>{
  try {
    const ideaId=req.params.id;
    const userId=req.user;

    const idea=await Idea.findById(ideaId);

    if (!idea) {
      return res.status(404).json({success:false,error:'Idea not found'});
    }
    if (idea.likes.includes(userId)) {
     idea.likes=idea.likes.filter((id)=>id !==userId);
     await idea.save();
     return res.status(200).json({success:true,message:'Idea like removed successfully'});
    }
    idea.likes.push(userId);
    await idea.save();

    res.status(200).json({success:true,message:'Idea liked successfully'});


  } catch (error) {
    res.status(500).json({success:false,error:error.message});
  }
};
//update idea
const updateIdea = async (req, res) => {
  try {
   const { id } = req.params;
    const { title, category, description } = req.body;
    const owner = req.user; 

    const idea = await Idea.findById(id);

    if (!idea) {
      return res.status(404).json({ error: 'Idea not found' });
    }

    if (idea.owner.id !== owner.id) {
      return res.status(403).json({ error: 'You are not the owner of this idea' });
    }
    
    // Upload image and video to Cloudinary if provided
    let uploadedImage;
    let uploadedVideo;

     if (req.file('image')) {
      uploadedImage = await uploadToCloudinary(req.file('image'));
      idea.image = uploadedImage.secure_url;
    }

    if (req.file('video')) {
      uploadedVideo = await uploadToCloudinary(req.file('video'));
      idea.video = uploadedVideo.secure_url;
    }

      // Update the idea with the new data
    idea.title = title || idea.title;
    idea.category = category || idea.category;
    idea.description = description || idea.description;
   

    await idea.save();

    res.json({ message: 'Idea updated successfully',idea });
  } catch (error) {
    deleteUploadedFiles(req.files);

    next(error); 
  }
      
};
//delete an Idea
const deleteIdea=async(req,res)=>{
  try {
    const {id}=req.params;
    const owner=req.user;

    const idea=await Idea.findOneAndDelete({_id:id,owner});
    if (!idea) {
       return res.status(404).json({ error: 'Idea not found' });
    }


    res.json({ message: 'Idea deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete idea' });
  }
};
//remove an idea from display list if it's invested on
const removeIdeaFromDisplay=async(req,res)=>{
  try {
    const {id}=req.params;

    const idea=await Idea.findByIdAndUpdate(
      id,
      {isInvested:true},
      {new:true}
    );

    if (!idea) {
      return res.status(404).json({error:'Idea not found'});
    }
res.json({ idea });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove idea from display' });
  
  }
};
//get all ideas
const getAllIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find();

    res.json({ ideas });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch ideas' });
  }
};

//get a single user's idea
const getUserIdeas = async (req, res) => {
  try {
    const owner = req.user; 

    const ideas = await Idea.find({ owner });

    res.json({ ideas });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user ideas' });
  }
};

// Get a single idea
const getIdea = async (req, res) => {
  try {
    const { id } = req.params;

    const idea = await Idea.findById(id);

    if (!idea) {
      return res.status(404).json({ error: 'Idea not found' });
    }

    res.json({ idea });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch idea' });
  }
};

//save an idea in cart
const saveIdeaInCart = async (req, res) => {
  try {
    const { id } = req.params;
    const investor = req.user; // Assuming user information is stored in req.user

    const idea = await Idea.findById(id);

    if (!idea) {
      return res.status(404).json({ error: 'Idea not found' });
    }

    idea.investors.push(investor);
    await idea.save();

    res.json({ message: 'Idea saved in cart successfully' });
  } catch (error) {
    res.status(500).json({ error:error.message});
  }
};
// Search ideas by title, owner name, or category
const searchIdeas = async (req, res) => {
  try {
    const { query } = req.query;

    const ideas = await Idea.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { 'owner.name': { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
      ],
    });

    res.json({ ideas });
  } catch (error) {
    res.status(500).json({ error: 'Failed to search ideas' });
  }
};

// Filter ideas by category
const filterIdeasByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const ideas = await Idea.find({ category });

    res.json({ ideas });
  } catch (error) {
    res.status(500).json({ error: 'Failed to filter ideas by category' });
  }
};

// Display sorted ideas by like count or date created
const displaySortedIdeas = async (req, res) => {
  try {
    const { sortBy } = req.query;

    let sortOption = {};

    if (sortBy === 'likes') {
      sortOption = { likes: -1 };
    } else if (sortBy === 'date') {
      sortOption = { createdAt: -1 };
    }

    const ideas = await Idea.find().sort(sortOption);

    res.json({ ideas });
  } catch (error) {
    res.status(500).json({ error: 'Failed to display sorted ideas' });
  }
};



module.exports={
  createIdea,
  likeIdea,
  updateIdea,
  deleteIdea,
  removeIdeaFromDisplay,
  getAllIdeas,
  getUserIdeas,
  getIdea,
   saveIdeaInCart,
  
  searchIdeas,
  filterIdeasByCategory,
  displaySortedIdeas,

};