const express = require('express');
const router = express.Router();
const User = require('../models/Usermodel');


router.post('/NewUser', (req,res) => {
    const NewUser = new User(req.body)
    NewUser
    .save()
    .then(() => res.send('Record saved'))
    .catch(err => res.status(400).json(err.message))

})


var createManyPeople = function(arrayOfPeople, done) {
    User.create( arrayOfPeople, (err, data) => err ? console.log(err) : done(null, data));
  }; 
  
  router.post('/ManyUser',(req,res)=> {
  createManyPeople (req.body,(err,data)=> { 
    err ?  console.log(err) : res.send('ManyUser was created')
  })  
  })

 
  router.get('/:name', (req, res)=> {
      User.find({name: req.params.name},(err,data)=> err? console.log(err) : res.json(data))
  })


router.get('/getFavorite/:favoriteFoods',(req, res)=> {
    User.findOne({favoriteFoods : req.params.favoriteFoods},(err,data)=> err? console.log(err) : res.json(data))
})


router.get('/getUser/:UserId', (req, res)=>{
    User.findById({_id: req.params.UserId},(err,data)=> err? console.log(err) : res.json(data))
})


    
var findEditThenSave = function(UserId, done) {
  const itemToAdd = 'hamburger'
  const User = User.findById({_id: UserId}, function(err, data){
    if (err) {
      return done(err)}
    data.favoriteFoods.push(itemToAdd)
    data.save((err, data)=>{
      if (err) {
        return done(err)}
      else {
        return done(null, data)}
    })
  })
}
   
router.put('/:id', (req, res)=>{
  findEditThenSave(req.params.id, (err,data)=> err? console.log(err) : res.send('User found was updated'))
})

/
router.put('/getName/:name',(req,res)=>{
    User.findOneAndUpdate({name: req.params.name},{$set:{age:20}},{new:true},(err,data)=>
  err? console.log(err) : res.json(data))
})


router.delete('/:UserID',(req,res)=>{
    User.findByIdAndRemove(req.params.UserID,(err,data)=>err? console.log(err) : res.send('User is deleted'))
})


router.delete('/deletedName/:name',(req,res)=> {
    User.remove({ name:req.params.name},(err,data)=> { 
    err ?  console.log(err) : res.send('all User named Mary were deleted')
  })   
})


router.get('/pizza',(req,res)=>{
    User.find({favoriteFoods:"pizza"})
  .sort({name:"desc"})
  .limit(2)
  .select("-age")
  .exec((err,data)=>err? console.log(err) : res.json(data))
})


module.exports= router