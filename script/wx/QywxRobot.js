const shell = require('shelljs')
const fs = require('fs')
const md5 = require('md5')
const chalk = require('chalk')

class QywxRobot {
  constructor(options) {
    this.options = options
  }

  _send (message) {
    const url = `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${this.options.key}`
    const command = `
      curl ${url} \
      -H 'Content-Type: application/json' \
      -d '${message}'
    `
  
    shell.exec(command)
  
    console.log(chalk.cyan(`发起推送 ${url}`))
  }

  /**
   * 推送文本到企业微信机器人
   * @param {String} text 文本
   */
  _sendText (text) {
    // 清除json string 带上的\, 再统一为"、' 补\
    const content = text.replace(/\\(["'])/g, '$1').replace(/(["'])/g, '\\$1')

    const message = `
      {
        "msgtype": "markdown",
        "markdown": {
          "content": "${content}"
        }
      }
    `

    console.log('message', message)

    this._send(message)
    console.log(chalk.green('推送文本到企业微信机器人'))
  }

  /**
   * 推送图片到企业微信机器人
   * @param {String} path 图片路径
   */
  _sendImage(path) {
    const imageData = fs.readFileSync(path)
    const imageBase64 = `${imageData.toString('base64')}`

    const buf  = fs.readFileSync(path)
    const md5Val = md5(buf)

    const message = `
      {
        "msgtype": "image",
        "image": {
          "base64": "${imageBase64}",
          "md5": "${md5Val}"
        }
      }
    `

    this._send(message)
    console.log(chalk.green('推送图片到企业微信机器人'))
  }

  send (options) {
    options.image && this._sendImage(options.image)
    options.text && this._sendText(options.text)
  }
}

module.exports = QywxRobot;