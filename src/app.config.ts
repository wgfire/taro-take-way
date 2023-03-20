export default {
  pages: ["pages/index/index", "pages/my/index"],
  tabBar: {
    custom: true,
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
      },

      {
        pagePath: "pages/my/index",
        text: "我",
      },
    ],
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
};
