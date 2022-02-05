type Config = {
  /* api接口地址 */
  apiUrl: string;
  /* 打包后页面存放到服务上的绝对路径 */
  webDir: string;
};

type ConfigObj = {
  [key: string]: Config;
};

const key = process.env.KEY || "";

const configObj: ConfigObj = {
  www: {
    apiUrl: "http://api.hosea.shop",
    webDir: "/data/www/hosea",
  },
  test: {
    apiUrl: "http://api-test.hosea.shop",
    webDir: "/data/www/test.hosea",
  },
};

const config: Config = configObj[key] || {
  apiUrl: "",
  webDir: "",
};

export default config;
