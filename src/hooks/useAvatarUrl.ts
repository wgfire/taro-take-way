import { useState } from "react";
import { storageUtil } from "@src/utils/storageUtil";

import defaultAvatar from "@assets/images/my/default-avatar.png";

// TODO: 重构，用户信息的修改，统一在 user presenter 中处理

export const useAvatarUrl = () => {
  const [avatar, setAvatar] = useState(storageUtil.get("avatar") || defaultAvatar);

  return {
    avatar,
    setAvatar(url: string) {
      storageUtil.set("avatar", url);
      setAvatar(url);
    },
  };
};
