/**
 * 微信小程序预览功能，返回二维码，提供给各团队使用
 * 只提供给测试环境
 */
const ci = require('miniprogram-ci')
const minimist = require('minimist')
const path = require('path')
const projectConfig = require('./../../project.config.json')
const QywxRobot = require('./QywxRobot')
const chalk = require('chalk')
const dayjs = require('dayjs')

module.exports = async function preview (args, config) {
  const paths = config.paths

  // 构建文本格式：环境(构建id): 描述文本
  const desc = `${config.envName}${args.buildId ? `(${args.buildId})` : ''}: ${args.desc}`
  const qrcodeOutputDest = path.join(paths.script, 'preview.png')

  const project = new ci.Project({
    appid: projectConfig.appid,
    type: 'miniProgram',
    // 项目的路径，即 project.config.json 所在的目录
    projectPath: paths.root,
    privateKeyPath: path.join(paths.root, config.privateKey),
    ignores: ['node_modules/**/*'],
  })

  const options = {
    project,
    desc,
    setting: config.compileSetting,
    robot: config.robot,
    qrcodeFormat: 'image',
    qrcodeOutputDest,
    // onProgressUpdate: console.log,
    // pagePath: 'pages/index/index', // 预览页面
    // searchQuery: 'a=1&b=2',  // 预览参数 [注意!]这里的`&`字符在命令行中应写成转义字符`\&`
  }

  // 可选参数，调试可用
  args.pagePath && (options.pagePath = args.pagePath)
  args.searchQuery && (options.searchQuery = args.searchQuery)

  const buildDate = dayjs()
  const qywxRobot = new QywxRobot({
    key: config.qywxWebhookKey[args.RUN_ENV]
  })

  console.log(chalk.cyan('准备上传到微信'))

  // 预览开发版
  ci.preview(options).then((result) => {
    console.log(chalk.green('已上传到微信'), result)

    // 发送二维码 & 文本
    qywxRobot.send({
      image: qrcodeOutputDest,
      text: `
**🤖小程序准备就绪，请扫码体验👆**\n
> 环境：<font color="${config.hightLight || 'comment'}">${config.envName}</font>
> 版本号：<font color="comment">${config.version}</font>
> 构建时间：<font color="comment">${buildDate.format('YYYY-MM-DD HH:mm:ss')}</font>
> 有效时间：<font color="comment">${buildDate.add(25, 'm').format('YYYY-MM-DD HH:mm:ss')}</font>
`
    })
  }).catch((err) => {
    console.log(chalk.red('提交失败'), err.message)

    // 上传到微信失败
    qywxRobot.send({
      text: `
**<font color="warning">🤖小程序构建失败😱</font>**\n
> 环境：<font color="${config.hightLight || 'comment'}">${config.envName}</font>
> 版本号：<font color="comment">${config.version}</font>
> 构建时间：<font color="comment">${buildDate.format('YYYY-MM-DD HH:mm:ss')}</font>

⚙️：<font color="comment">${err.message}</font>
`
    })
  })
}
