let Campground = require("../models/campground");
let Comment = require("../models/comment");

let middlewareObj = {
    isLoggedIn: function(req, res, next){
                    if(req.isAuthenticated()){
                        return next();
                    }
                    req.flash("error", "You need to be logged in to do that!");
                    res.redirect("/login");
                },

    checkCampgroundOwnership:
        function(req, res, next){
            if(req.isAuthenticated()){
                Campground.findById(req.params.id, function(err, foundCampground){
                    if(err){
                        req.flash("error", "Campground not found!");
                        res.redirect("back");
                    } else {
                        //check if current user owns the campground or not
                        if(foundCampground.author.id.equals(req.user._id)){
                            next();
                        } else {
                            req.flash("error", "You do not have permission to do that");
                            res.redirect("back");
                        }
                    }
                });
            } else {
                req.flash("error", "You need to be logged in to do that!");
                res.redirect("back");
            }
        },
    

    checkCommentOwnership:
    function (req, res, next){
        if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if(err){
                    req.flash("error", "Something went wrong");
                    res.redirect("back");
                } else {
                    //check if current user owns the campground or not
                    if(foundComment.author.id.equals(req.user._id)){
                        next();
                    } else {
                        req.flash("error", "You do not have permission to do that");
                        res.redirect("back");
                    }
                }
            });
        } else {
            req.flash("error", "You need to be logged in to do that!");
            res.redirect("back");
        }
    }    
}

module.exports = middlewareObj;