const mongoose = require('mongoose');
const bcrypt =  require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name :{
        type : String,
        maxlength : 50
    },
    email:{
        type : String,
        trim:true,
        unique : 1
    },
    password:{
        type : String
    }, 
    lastname :{
        type : String,
        maxlength : 50
    },
    role : {
        type : Number,
        default : 0
    },
    image : String,
    token : {
        type :  String
    },
    tokenExp:{
        type : Number
    }

}) 

userSchema.pre('save', function(next){
    var user = this;

    // 패스워드가 변경될때만ㄴ
    if(user.isModified('password')){
        // 비밀번호 암호화 처리
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash) {
                // Store hash in your password DB.
                if(err) return next(err);
                user.password = hash;
                next()
            });  
        });
    }else{
        next()
    }
})


userSchema.methods.comparePassword = function(plainPassword, cb){
     bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
         if(err) return cb(err); 
            cb(null, isMatch)
     })
}

// 토큰 생성
userSchema.methods.generateToken = function (cb) {
    var user = this;

    var token = jwt.sign(user._id.toHexString(), 'token')

    user.token = token;
    user.save(function (err, user) {
        if(err) return cb(err);
        cb(null, user);
    })


}


const User = mongoose.model('User',userSchema)

module.exports = {User}