import { BindStatus, getWechatBindStatus } from "@src/apis/bind-wechat/get-bind-status";
import { getWxQrCode } from "@src/apis/bind-wechat/get-wx-code";
import { Flex } from "@src/lib/components/basic/Flex";
import { Tag } from "@src/lib/components/basic/Tag";
import { Text } from "@src/lib/components/basic/Text";
import { useDidMount } from "@src/lib/hooks/lifecycle";
import { useSetState } from "@src/lib/hooks/useSetState";
import { Navigation } from "@src/utils/Navigation";
import { useDidShow } from "@tarojs/taro";
import React from "react";

interface State {
  status: BindStatus | undefined;
  sceneId: string;
  url: string;
}

export const BindWechat = () => {
  const [state, setState] = useSetState<State>({
    status: undefined,
    sceneId: "",
    url: "",
  });

  useDidShow(async () => {
    if (state.sceneId) {
      const result = await getWechatBindStatus({ sceneId: state.sceneId });
      setState({ status: result.attentionStatus });
    }
  });

  useDidMount(async () => {
    const { qrCodeUrl, sceneId } = await getWxQrCode();
    const result = await getWechatBindStatus({ sceneId });
    setState({ url: qrCodeUrl, sceneId, status: result.attentionStatus });
  });

  return (
    <Flex justifyContent="space-between">
      {state.status !== undefined && (
        <>
          {state.status !== undefined && (state.status === 1 ? <Tag color="green">已绑定</Tag> : <Tag color="red">未绑定</Tag>)}
          <Text
            color="primary"
            onClick={() => {
              Navigation.navigateTo("/pages/bind-wechat/index", { url: state.url });
            }}
          >
            {state.status === 1 ? "更换绑定" : "立即绑定"}
          </Text>
        </>
      )}
    </Flex>
  );
};
