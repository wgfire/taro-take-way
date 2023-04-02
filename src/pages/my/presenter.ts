import { getMyInfo } from "@src/apis/my/get-my-info";
import { useAvatarUrl } from "../../hooks/useAvatarUrl";
import { useModel } from "./model";

export const usePresenter = () => {
  const model = useModel();
  const { avatar, setAvatar } = useAvatarUrl();

  function onChooseAvatar(url: string) {
    setAvatar(url);
  }
  const getMyInfoData = async () => {
    const data = await getMyInfo();
    console.log(data, "用户信息");
    model.setState({ userInfo: data.data });
  };

  return {
    model,
    avatar,
    onChooseAvatar,
    getMyInfoData,
  };
};
