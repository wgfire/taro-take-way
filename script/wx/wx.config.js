module.exports = {
  // 小程序上传密钥名字（需存放到项目根）
  privateKey: 'private.wxe1411ed2a0cff9aa.key',
  // 企业微信机器人webhook key
  // 如：https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=3619737c-07ab-436a-bdc9-94118f741ac7
  qywxWebhookKey: {
    test: '716cac8e-133f-4a90-aef3-28e1dda1b380',
    beta: '716cac8e-133f-4a90-aef3-28e1dda1b380',
    prod: '716cac8e-133f-4a90-aef3-28e1dda1b380'
  },
  // 配置说明
  // https://developers.weixin.qq.com/miniprogram/dev/devtools/codecompile.html
  // https://developers.weixin.qq.com/miniprogram/dev/devtools/ci.html#%E7%BC%96%E8%AF%91%E8%AE%BE%E7%BD%AE
  compileSetting: {
    es6: true,
    es7: true,
    autoPrefixWXSS: true,
    minifyJS: true,
    minifyWXML: true,
    minifyWXSS: true
  }
}
