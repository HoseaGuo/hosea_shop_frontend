import axios from "axios";
// const config = require('../config');

type PromiseResolve = {
  success: boolean;
  msg: string;
  data: any;
};

const instance = axios.create({
  // baseURL: 'https://api.weixin.qq.com/cgi-bin',
  timeout: 30000,
});

function request(_options) {
  let options = Object.assign({}, _options);

  options.method = options.method || "get";

  if (/^get$/i.test(options.method)) {
    options.params = options.data;
  }

  return new Promise<PromiseResolve>((resolve) => {
    let result = {
      success: false,
      msg: "",
      data: {},
    };
    instance
      .request(options)
      .then(async (response) => {
        let { data: axiosData, status } = response;
        let { data, code, msg } = axiosData;
        if (status === 200) {
          // 请求成功的，根据返回的数据进行进一步的前端处理
          result.success = code === 0;
          result.msg = msg;
          result.data = data;
        } else {
          result.msg = msg || `HTTP status ${status}`;
        }
        resolve(result);
      })
      .catch((error) => {
        result.msg = "服务器请求发生错误，请稍后再来吧！";
        resolve(result);
      });
  });
}

export default request;
