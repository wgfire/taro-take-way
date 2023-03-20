/**
 * 微信小程序预览功能，返回二维码，提供给各团队使用
 * 只提供给测试环境
 */
const shell = require('shelljs')
const minimist = require('minimist')
const path = require('path')
const projectConfig = require('./../../project.config.json')
const packageJson = require('./../../package.json')
const wxConfig = require('./wx.config')
const chalk = require('chalk')

// robot: 20，默认设置为体验版本，后续预发布环境、生产环境，都不需要切换 体验环境
const envArgs = {
  default: { robot: 1, envName: '未知环境' },
  test: { robot: 1, envName: '测试环境' },
  beta: { robot: 20, envName: '预发布环境', hightLight: 'warning' },
  prod: { robot: 20, envName: '生产环境', hightLight: 'info' },
}

 /**
  * 指令
  *  node ./preview [args]
  * args:
  *  --RUN_ENV [test/beta/prod]    环境
  *  --rev 'string'   git 最近提交到 sha码，用于版本号拼接
  *  --pagePath 'pages/index/index'    预览页面（可选）
  *  --searchQuery 'a=1&b=2'   页面参数（可选）
  */
 ;(async function () {
  const args = minimist(process.argv.slice(2), {});
  console.log(chalk.cyan('args'), args)

  if (!args.RUN_ENV) {
    console.log(chalk.red('缺少参数，必须包含 RUN_ENV'))
    return
  }

  // 获取git最新提交
  // git rev-parse HEAD | cut -c 1-8
  // 版本格式：v[package.json version]-[git sha1(8)]-[random(4)]，如：v1.0.0-c106de46-5758
  let gitRev = args.rev ? `${args.rev}`.slice(0, 8): ''

  // 如果jenkins不传入，则自己执行（docker没装git，无法用，这里是为了本地可以用上）
  if (!gitRev) {
    try {
      gitRev = shell.exec('git rev-parse HEAD | cut -c 1-8')
      console.log(chalk.cyan('执行 git rev-parse HEAD | cut -c 1-8'))
    } catch (e) {
      console.log(chalk.red('git rev-parse HEAD | cut -c 1-8 error'), e)
    }
  }

  const version = [`v${packageJson.version}`]
  gitRev && version.push(gitRev);
  // 时间戳转为36进制(8位数)，用于随机数
  version.push(new Date().getTime().toString(36))

  const rootPath = path.resolve(__dirname, '..', '..')

  let config = {
    ...wxConfig,
    appId: projectConfig.appid,
    version: version.join('-'),
    // 使用哪个机器人（1-20）
    robot: 1,
    paths: {
      root: rootPath,
      script: path.join(rootPath, 'script'),
    }
  }

  let command

  switch (args.RUN_ENV) {
    // 测试，使用开发包
    case 'test':
      command = require('./preview')
      break
    // 预发布、生产，使用体验包
    case 'beta':
    case 'prod':
      command = require('./upload')
      break
  }

  command && command(args, {
    ...config,
    // 一些环境相关参数
    ...(envArgs[args.RUN_ENV] || envArgs['default'])
  })
 })()
