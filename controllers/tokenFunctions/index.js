require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');

module.exports = {
  // acc토큰 발급
  generateAccessToken: data => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: '15s' });
  },

  // ref토큰 발급
  generateRefreshToken: data => {
    return sign(data, process.env.REFRESH_SECRET, { expiresIn: '30d' });
  },

  // ref토큰 쿠키에 담아서 보내기
  sendRefreshToken: (res, refreshToken) => {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
    });
  },

  // acc토큰 보내기
  sendAccessToken: (res, accToken) => {
    res.json({
      data: { accessToken: accToken },
      message: 'Signin is successed',
    });
  },

  // acc토큰 다시 보내기
  resendAccessToken: (res, accToken, data) => {
    res.json({
      data: { accessToken: accToken, userInfo: data },
      message: 'resending AccessToken is successed',
    });
  },

  // acc토큰 있는지 확인해서 있으면 verify
  isAuthorized: req => {
    const authorization = req.headers['authorization'];
    if (!authorization) {
      return null;
    }
    const token = authorization.split(' ')[1];
    try {
      return verify(token, process.env.ACCESS_SECRET);
    } catch (err) {
      // return null if invalid token
      return null;
    }
  },

  // ref토큰 verify.
  checkRefeshToken: refreshToken => {
    try {
      return verify(refreshToken, process.env.REFRESH_SECRET);
    } catch (err) {
      // return null if refresh token is not valid
      return null;
    }
  },
};
