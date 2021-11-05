import axios from "axios";
// const config = require('../config');

const instance = axios.create({
  // baseURL: 'https://api.weixin.qq.com/cgi-bin',
  timeout: 30000,
});

function request(_options) {

  let options = Object.assign({}, _options);

  options.method = options.method || 'get';

  if (/^get$/i.test(options.method)) {
    options.params = options.data
  }

  return new Promise((resolve) => {
    let result = {
      success: false,
      msg: "",
      data: {}
    }
    instance.request(options).then(async (response) => {

      let { data, status } = response;
      if (status === 200) {
        result.success = true;
        result.msg = "request success"
        result.data = data;
      } else {
        result.msg = `HTTP status ${status}`
      }
      resolve(result)
    }).catch(error => {
      result.msg = "服务器请求发生错误，请稍后再来吧！"
      resolve(result)
    })
  })
}

export default request;