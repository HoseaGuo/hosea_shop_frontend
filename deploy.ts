import fs from "fs";
import path from "path";
import { NodeSSH } from "node-ssh";
import compressing from "compressing"; // 压缩zip

const ssh = new NodeSSH();

// home目录路径
const USER_HOME = process.env.HOME || process.env.USERPROFILE;

const distPath = "./dist";

const distZipPath = "dist.zip";

const webDir = "/data/www/hosea/";

// 压缩dist文件
const startZip = async (distPath) => {
  try {
    console.log("压缩dist成zip");

    await compressing.zip.compressDir(distPath, distZipPath);

    console.log("压缩成功");
  } catch (err) {
    console.log(err);
    console.log("压缩失败");
    process.exit(1); //退出流程
  }
};

// 连接服务器
async function connectSSH() {

  let id_rsa_path = "";
  if (USER_HOME) {
    // id_rsa的路径
    id_rsa_path = path.resolve(USER_HOME, '.ssh/id_rsa');
  }

  console.log('ssh开始连接...')
  
  try {
    await ssh.connect({
      host: "8.134.82.20",
      username: "root",
      privateKey: fs.readFileSync(id_rsa_path, 'utf8')
    });
    console.log('ssh连接成功')
    return ssh;
  } catch (e) {
    console.log('ssh连接失败')
    console.log(e);
    process.exit(1); //退出流程
  }
}

// 上传文件
async function uploadFile(fileName) {
  console.log("开始上传dist压缩文件");
  try {
    await ssh.putFile(fileName, webDir + fileName);
    console.log("上传dist压缩文件成功");
  } catch (e) {
    console.log(e);
    console.log("上传dist压缩文件失败");
    process.exit(1); //退出流程
  }
}

// 运行命令
async function runCommand(command, webDir) {
  await ssh.execCommand(command, { cwd: webDir });
}

// 开始解压
const unzipFile = async () => {
  try {
    // 进入目录
    await runCommand(`cd ${webDir}`, webDir);
    // 解压
    console.log(`开始解压zip包`);
    await runCommand(`unzip -o ${distZipPath} && rm -f ${distZipPath}`, webDir);
    console.log("解压成功");
  } catch (err) {
    console.log(err);
    console.log(`zip包解压失败`);
    process.exit(1);
  }
};

async function restartServer() {
  try {
    // 进入./dist/server目录
    await runCommand(`cd dist/server`, `${webDir}/dist/server`);
    // 安装npm包
    console.log('npm包安装开始')
    await runCommand(`npm i`, `${webDir}/dist/server`);
    console.log('npm包安装结束')

    // 重启pm2项目 www.hosea.com
    console.log("重启pm2服务")
    await runCommand(`pm2 restart www.hosea.com`, `${webDir}/dist/server`);

    ssh.dispose(); //断开连接
  } catch (e) {
    console.log(e);
    console.log("重启服务失败");
    process.exit(1);
  }
}

// 删除本地dist.zip
const deleteZip = async () => {
  return new Promise((resolve, reject) => {
    console.log(`开始删除本地zip包`);

    fs.unlink(distZipPath, (err) => {
      if (err) {
        console.log(err);
        console.log("删除本地zip失败");
        process.exit(1);
      }

      console.log("删除本地zip成功");
      resolve(true);
    });
  });
};

async function startDeploy() {
  // 压缩文件
  await startZip(distPath);
  // 连接服务器
  await connectSSH();
  // 上传文件
  await uploadFile(distZipPath);
  // 删除本地dist.zip文件
  deleteZip();
  // 解压线上压缩包，并且删除
  await unzipFile();
  // 重新安装npm，重启pm2服务
  await restartServer();

  console.log("发布项目到线上成功");
  process.exit(0);
}

startDeploy();

export { };
