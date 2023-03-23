import { useAvatarUrl } from "../../hooks/useAvatarUrl";
 import { useModel } from "./model";

export const usePresenter = () => {
   const model = useModel();
  const { avatar, setAvatar } = useAvatarUrl();

  function onChooseAvatar(url: string) {
    setAvatar(url);
  }

  return {
    model,
    avatar,
    onChooseAvatar,
  };
};
