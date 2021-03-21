const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const Querystring = require('querystring');
const jwtDecode = require('jwt-decode');
const { sendRefreshToken, sendAccessToken } = require('../tokenFunctions');
const models = require('../../models');
const { user } = models;

function getURLParams(url) {
  var result = {};
  url.replace(/[?&]{1}([^=&#]+)=([^&#]*)/g, function (s, k, v) {
    result[k] = decodeURIComponent(v);
  });
  return result;
}

module.exports = async (req, res) => {
  try {
    const myCode = getURLParams(req.url).code;
    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

    let body = Querystring['stringify']({
      code: myCode,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: `http://localhost:5000/callback`,
      grant_type: `authorization_code`,
    });

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    const result = await axios
      .post('https://oauth2.googleapis.com/token', body, config)
      .catch(err => {
        console.log(err);
      });

    const idToken = result.data.id_token;
    const refToken = result.data.refresh_token;
    const decodedToken = jwtDecode(idToken);
    const getName = decodedToken.name;
    const getEmail = decodedToken.email;

    // DB 에 이미 해당유저 저장되어 있으면 가입과정 패스
    const data = await user.findOne({
      where: { email: getEmail },
    });
    if (!data) {
      user.create({
        email: getEmail,
        nickname: getName,
      });
    }

    sendRefreshToken(res, refToken);
    sendAccessToken(res, idToken);
  } catch (err) {
    console.log(err);
  }
};
