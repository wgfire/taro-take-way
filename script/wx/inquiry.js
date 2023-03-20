const shell = require('shelljs')
const inquirer = require('inquirer')
const chalk = require('chalk')

const prompt = []

// 询问构建环境
prompt.push({
  type: 'list',
  name: 'RUN_ENV',
  message: '选择 推送 环境',
  choices: [
    { name: 'test', value: 'test' },
    { name: 'beta', value: 'beta' },
    { name: 'prod', value: 'prod' }
  ],
})

inquirer
  .prompt(prompt)
  .then(res => {
    try {
      console.log(res)

      const command = `node ./script/wx/index.js --RUN_ENV ${res.RUN_ENV}`

      console.log(chalk.cyan(command))
      shell.exec(command)
    } catch (error) {
      return Promise.reject(error)
    }
  })
  .catch(err => {
    console.log(chalk.red(err))
    shell.exit(1)
  })
