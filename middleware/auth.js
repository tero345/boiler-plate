const {User} = require('../models/User');

let auth = (req, res, next) => {
    // 인증 처리

    // 클라이언트의 쿠키에서 토큰을 가져온다
    let token = req.cookies.x_auth;

    // 토큰을 복호화 후 유저 조회

    // 유저가 있으면 인증 완료 / 없으면 불가
}


module.exports = { auth }