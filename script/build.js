/**
 * 构建配置选择
 *
 * 1. 开发/生产环境
 * 2. 小程序类型
 * 3. API 环境
 */
const shell = require('shelljs')
const inquirer = require('inquirer')
const chalk = require('chalk')
const minimist = require('minimist')
const Subpackage = require('./subpackage/SubPackage')
const subpackageConfig = require('../subpackage.config')

const args = minimist(process.argv.slice(2), {});

console.log('args', args)

function build (args) {
  if (args.env === 'development') {
    // 开发
    const command = `cross-env RUN_ENV=${args.RUN_ENV} taro build --type weapp --watch`
    console.log(chalk.green('run >>>'), chalk.blue(command))
    shell.exec(command)
  } else {
    // 构建环境
    let subpackage = new Subpackage(subpackageConfig, args.RUN_ENV)

    subpackage.run(async () => {
      // 执行构建
      const command = `cross-env RUN_ENV=${args.RUN_ENV} node ./script/ycg-taro build --type weapp`
      console.log(chalk.green('run >>>'), chalk.blue(command))
      shell.exec(command)
    })
  }
}

// 不传递参数，则启用询问模式
if (args.RUN_ENV) {
  build(args)
} else {
  inquirer.prompt([{
    type: 'list',
    name: 'RUN_ENV',
    message: '选择 API 环境',
    choices: [
      { name: 'test', value: 'test' },
      { name: 'beta', value: 'beta' },
      { name: 'prod', value: 'prod' },
    ],
  }]).then(res => {
    build({
      ...args,
      ...res
    })
  }).catch(err => {
    console.log(chalk.red(err))
    shell.exit(1)
  })
}
