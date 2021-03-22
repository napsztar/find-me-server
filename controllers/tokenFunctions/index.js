require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');

module.exports = {
  // acc토큰 발급
  generateAccessToken: data => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: '7d' });
  },

  // acc토큰 보내기
  sendAccessToken: (res, accToken) => {
    res.cookie('accessToken', accToken, {
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    });
    res.json('Signin is successed');
  },

  // acc토큰 다시 보내기
  resendAccessToken: (res, accToken) => {
    res.cookie('accessToken', accToken, {
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    });
    res.json('access token is re-sent successfully');
  },

  // acc토큰 있는지 확인해서 있으면 verify
  isAuthorized: req => {
    console.log(req.cookies);
    const accToken = req.cookies.accessToken;
    if (!accToken) {
      return null;
    }
    try {
      if (accToken.length < 400) {
        return verify(accToken, process.env.ACCESS_SECRET);
      } else if (accToken.length > 400) {
        return jwtDecode(accToken);
      }
    } catch (err) {
      // return null if invalid token
      return null;
    }
  },
};
