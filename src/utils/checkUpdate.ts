import Taro from "@tarojs/taro";

export function checkUpdate() {
  const updateManager = Taro.getUpdateManager();
  updateManager.onUpdateReady(() => {
    Taro.showModal({
      title: "更新提示",
      content: "大数据有更新，是否启用新版？",
      success(res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate();
        }
      },
    });
  });
}
