const mongoose=require('mongoose');
const ideaSchema=new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
   image: {
    type: String,
    required: true
  },
  video: {
    type: String,
    
  }, 
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  investors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  isRemoved: {
    type: Boolean,
    default: false
  },
},
{
    timeStamps:true,
}
);
const Idea = mongoose.model('Idea', ideaSchema);

module.exports = Idea;