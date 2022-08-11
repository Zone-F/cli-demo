const esbuild = require('esbuild')
const path = require('path')
const glob = require('glob')
// const chalk = require('chalk')
const fs = require('fs-extra')
const isProd = process.env.NODE_ENV == "production";
const libPath = path.join(process.cwd(), "lib");

/** 假如lib文件夹已存在，则清空 */
if (fs.existsSync(libPath)) {
  fs.emptyDirSync(libPath);
}

/** 匹配src文件夹下所有ts文件 */
const matchFiles = async () => {
  return await new Promise((resolve) => {
    glob("src/**/*.ts", { root: process.cwd() }, (err, files)=> {
      if (err) {
        console.error(err);
        process.exit();
      }
      resolve(files);
    });
  });
};
/** esbuild 配置 */
const build = async function () {
  await esbuild.build({
    entryPoints: await matchFiles(),
    //输出目录
    outdir: path.join(process.cwd(), "lib"),
    // format: "esm",
    platform: "node",
    color: true,
    // loader
    loader: {
      ".ts": "ts",
    },
    //开发环境开启热更新
    watch: !isProd && {
      onRebuild(error) {
        if (error) {
          console.log(`热更新启动失败`);
          // console.log(chalk.red(`热更新启动失败`));
        } else {
          // console.log(chalk.green(`热更新启动成功`));
          console.log(`热更新启动成功`);
        }
      },
    },
  });
  // console.log(chalk.green("打包完毕 \r\n"));
  console.log("打包完毕 \r\n");
};
build();