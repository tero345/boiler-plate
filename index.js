const express = require('express')
const app = express()
const port = 3000

const {User} = require('./models/User') 
const {auth} = require('./middleware/auth')

const config = require('./config/key')
const cookieParser = require('cookie-parser')



app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(cookieParser())

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://minseok:1234@boiler-plate.rabed.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {})
  .then(() => console.log('MongoDB Connected.......'))
  .catch(err=> console.log(err))


app.post('/api/users/register', (req,res) =>{
  // 회원 가입 할때 필요한 정보들

  const user = new User(req.body);
  console.log(user);

  user.save((err, doc) => {
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      success:true
    })
  })
})

// 로그인 처리
app.post('/login', (req,res)=>{
  // 1. 이메일로 조회
  User.findOne({ email : req.body.email},(err, user) => {
    if(!user){
      return res.json({
        loginSuccess : false,
        message : "User Not Found!!!!!"
       })
    }

    // 2.있으면 비밀번호 체크
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch)
        return res.json({ loginSuccess : false, message : "Password XXXXXX"})

            // 3. 비밀번호 확인 시 토큰 생성
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);

                // 토큰저장(쿠키/로컬스토리지/세션)
                res.cookie('x_auth', user.token)
                .status(200)
                .json({loginSuccess:true, ObjectId:user._id})
            })
        
    })
  })
})

// 인증
app.get('/api/users/auth', auth, (req,res) => {
  // 여기까지 왔다는것은 인증이 true라는 것.
  res.status(200).json({
    _id : req.user._id,
    isAdmin : req.user.role === 0 ? false : true,
    isAuth : true,
    email : req.user.email,
    name : req.user.name
  })
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})