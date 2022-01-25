import axios from "axios";
import { ElMessage } from "element-plus";

// 服务器版本号
const SERVER_VERSION = "v1";

// @ts-ignore
let isDev = import.meta.env.MODE === "development";

type PromiseResolve = {
  success: boolean;
  msg: string;
  data: any;
  headers: any
};

const instance = axios.create({
  baseURL: isDev ? "" : "http://api.hosea.shop", // 开发环境下不设置，由vite.config.ts里的proxy控制
  timeout: 30000,
});

function request(_options) {
  let options = Object.assign({
    method: "get",
    showSuccessMsg: false,
    showErrorMsg: true
  }, _options);

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
      data: {}, // 后台返回的数据
      headers: {}, // response headers
    };
    instance.request(options).then(async (response) => {
      let { data: axiosData, status, headers } = response;
      let { data, code, msg } = axiosData;

      // 保存响应头返回的数据
      result.headers = headers;

      if (status === 200) {
        // 请求成功的，根据返回的数据进行进一步的前端处理
        result.success = code === 0;
        result.msg = msg;
        result.data = data;
      } else {
        result.msg = msg || `HTTP status ${status}`;
      }
      if (result.msg) {
        if (options.showSuccessMsg) ElMessage.success(result.msg);
      }
      resolve(result);
    }).catch((error: any) => {
      result.msg = error.response?.data?.msg || "服务器请求发生错误，请稍后再来吧！";
      if (options.showErrorMsg) ElMessage.error(result.msg);
      resolve(result);
    });
  });
}

// 设置请求头的Authorization
export function setHeaderAuthorization(token: string) {
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common['Authorization']
  }
}

/* function hasOwn(obj: Object, props: string) {
  return obj.hasOwnProperty(props)
} */

export default request;
