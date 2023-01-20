const User = require('../models/users');

module.exports.profile = function(req,res){
    //not allowing user to access the profile page if he/she is not sign in

        if(req.cookies.user_id){
            User.findById(req.cookies.user_id, function(err,user){
                if(user){
                    return res.render('user_profile',{
                         title:'profile',
                         user:user,

                    })
                }
                else{
                    return res.redirect('/users/sign-in');
                }
            })
        }else{
            return res.redirect('/users/sign-in');
        }


    
}

//render the sign up page
module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title:'Codeial | SignUp'
    })
}


//render the sign in page
module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
        title:'Codeial | SignIn'
    })
}

//get the sign up data
module.exports.create = function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('Error in finding the user in sign up page'); return;}

        if(!user){
            User.create(req.body,function(err, user){
                if(err){console.log('Error in creating the user in sign up page'); return;}
                
                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
    })
}

//sign in and create the session
module.exports.createSession = function(req,res){
    //find the user
    User.findOne({email:req.body.email}, function(err,user){
        if(err){console.log('Error in finding the user in sign in page'); return;}
        //found the user
        if(user){
        //1. check for password mis match
            if(user.password!=req.body.password){
                return res.redirect('back');
            }

        //2. handle session creation
            res.cookie('user_id',user.id);
            res.redirect('/users/profile');
        }
        //not found the user
        else{
            res.redirect('/users/profile');
        }

    })
    
}

module.exports.clearSession=function(req,res){
    res.clearCookie('user_id');
    res.redirect('/users/sign-in')
}