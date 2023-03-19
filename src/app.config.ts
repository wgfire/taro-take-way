export default defineAppConfig({
  pages: ["pages/index/index", "pages/my/index"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    color: "#515151",
    selectedColor: "#333333",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "svg/customer-bar/首页.png",
        selectedIconPath: "svg/customer-bar/首页高亮.png",
      },
      {
        pagePath: "pages/my/index",
        text: "我的",
        iconPath: "svg/customer-bar/我的.png",
        selectedIconPath: "svg/customer-bar/我的高亮.png",
      },
    ],
  },
});
