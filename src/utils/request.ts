import axios from "axios";

// 服务器版本号
const SERVER_VERSION = "v1";

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

  // 处理接口版本，默认 /v1 开头的
  options.url = options.url.replace(
    new RegExp(`^(\/?${SERVER_VERSION})?`),
    `/${SERVER_VERSION}`
  );

  // 如果是get请求，将 data 设置成 params
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
