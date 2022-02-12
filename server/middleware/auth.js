const {User} = require('../models/User');

let auth = (req, res, next) => {
    // 인증 처리

    // 클라이언트의 쿠키에서 토큰을 가져온다
    let token = req.cookies.x_auth;

    console.log('token', token);
    // 토큰을 복호화 후 유저 조회

    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({isAuth :  false, error:true});

        req.token = token;
        req.user = user;
        next();

    } )

    // 유저가 있으면 인증 완료 / 없으면 불가
}


module.exports = { auth }