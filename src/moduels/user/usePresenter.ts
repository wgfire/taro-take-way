import { checkWechatToken } from "@src/apis/login/check-token";
import { getWechatLogin } from "@src/apis/login/get-wechat-login";
import { storageUtil } from "@src/utils/storageUtil";
import Taro from "@tarojs/taro";
import { useModel } from "./model";

export const usePresenter = () => {
  const token = storageUtil.get("token");
  const model = useModel();
  const autoLogin = async () => {
    const result = await checkWechatToken();
    /** token 过期 */
    if (!result.data) {
      const { code } = await Taro.login();
      const loginResult = await getWechatLogin({ code });
      if (loginResult.data) {
        storageUtil.set("token", loginResult.data);
        model.setState({ token: loginResult.data });
      }
    } else {
      model.setState({ token });
    }
  };

  return { model, autoLogin };
};
