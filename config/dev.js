module.exports = {
  env: {
    NODE_ENV: '"development"',
  },
  defineConstants: {},
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      // 开发环境，为了background能用上本地资源，把资源转到base64，方便开发，打包构建时，则转为cdn在线管理
      url: {
        enable: true,
        config: {
          limit: 204800, // 设定转换尺寸上限 200k
        },
      },
    }
  },
  h5: {},
};
