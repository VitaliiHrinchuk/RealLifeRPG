const router = require('express').Router();
const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const User = require('../models/user');


router.post('/user/create/', (req, res)=>{

    bcrypt.hash(req.body.password, 10, (err, hash)=>{
        if(err){
            console.log(err);
            res.status(500);
        }
        const user = new User({
            _id: new mongoose.Types.ObjectId,
            name: req.body.name,
            pwd: hash,
            mail: req.body.mail,
            gl_expirience: 0,
            categories: {
                social:{
                    exp:0,
                    subcategories: []
                },
                health:{
                    exp:0,
                    subcategories: []
                },
                intelligence:{
                    exp:0,
                    subcategories: []
                }
            }
        });

        user.save().then(result=>{
            console.log(result);
            res.status(201).json({
                msg:"User created successfully",
                createdUser: result
            });
        }).catch(err=>{
            console.log(err);
            if(err.name === "ValidationError"){
                res.status(400).json(err);
            }
            res.status(500).json(err);
        });
    })
   
});

router.patch('/user/update/:userId', (req, res)=>{
    const id = req.params.userId;

    let requestObj = {};
    for(option in req.body){
        requestObj[option] = req.body[option];
    }
    console.log(requestObj);
    
    User.updateOne({ _id: id }, {$set: requestObj}, {runValidators: true})
        .exec()
        .then(result=>{
            console.log(result);
            return res.status(200).json({
                msg:"User updated"
            });
        })
        .catch(err=>{
            console.log(err);
            return res.status(500).json(err);
        });
    
})

router.post('/user/:id/addTask/', (req, res)=>{
    const id = req.params.id;

    const newTask = Object.assign({_id:new mongoose.Types.ObjectId}, req.body);
    User.updateOne({_id: id}, {$push: {tasks: newTask}}, {runValidators: true})
        .exec()
        .then(result=>{
            return res.status(201).json({msg:"Task created", result});
        })
        .catch(err=>{
            console.log(err);
            return res.status(500).json(err);
        })
})

router.get('/', (req, res)=>{
    User.find()
    .then(docs=>{
        return res.status(200).json(docs);
    })
    .catch(err=>{
        console.log(err);
        return res.error(err)
    });
});


router.delete('/user/delete', (req, res)=>{
    User.deleteMany({}).then(result=>{
        return res.json(result)
    })
})

module.exports = router;