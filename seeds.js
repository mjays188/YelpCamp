let mongoose = require("mongoose");
let Campground = require("./models/campground");
let Comment = require("./models/comment");

let data = [
    {
        name:"ground 1",
        image:"https://images.unsplash.com/photo-1497900304864-273dfb3aae33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description:"My first campground"
    },
    {
        name:"ground 2",
        image:"https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description:"My second campground"
    },
    {
        name:"ground 3",
        image:"https://images.unsplash.com/photo-1515408320194-59643816c5b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description:"My third campground"
    }
];

function seedDB(){
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } 
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("Added a campground");
                    //create a comment 
                    Comment.create({
                        text:"It's all awesome here!",
                        author:"Christopher"
                    },function(err, comment){
                        if(err){
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("created a comment");
                        }
                    });
                }
            });
        });
    });
}

module.exports = seedDB;