import { View, Button } from "@tarojs/components";

import { PageView } from "@src/lib/components/layout/PageView";

import styles from "./my.module.scss";
import { Avatar, Icon } from "@nutui/nutui-react-taro";
import { Text } from "@src/lib/components/basic/Text";
import { Flex } from "@src/lib/components/basic/Flex";
import { Navigation } from "@src/utils/Navigation";
import { usePresenter } from "./presenter";
import { useWillUnmount } from "@src/lib/hooks/lifecycle";

const PageIndex = () => {
  const { avatar, onChooseAvatar, model } = usePresenter();

  const userInfo = model.state.userInfo;

  useWillUnmount(() => {
    model.resetState();
  });
  return (
    <PageView tabBarPlaceholder backgroundColor="lightGray">
      <PageView.Content className={styles.bg}>
        <View className={styles.top}>
          <Flex className={styles.userCard} alignItems="center">
            <Button className={styles.avatarWrapper} open-type="chooseAvatar" onChooseAvatar={e => onChooseAvatar(e.detail.avatarUrl)}>
              <Avatar className={styles.avatar} size="large" url={avatar}></Avatar>
            </Button>
            <Flex flexDirection="column" flexGrow={1} style={{ marginLeft: "24rpx" }}>
              <Text size="40rpx">{userInfo.name}</Text>
            </Flex>
          </Flex>
        </View>

        <View className={styles.panel}>
          <Flex flexDirection="column">
            <Flex className={styles.panelItem} alignItems="center" onClick={() => Navigation.navigateTo("/pages/address/index", { link: "editAddress" })}>
              <Icon name="locationg3" size={16}></Icon>
              <Flex flexGrow={1} style={{ marginLeft: "30rpx" }}>
                <Text size="32rpx">地址管理</Text>
              </Flex>
              <Icon name="arrow-right" size={16}></Icon>
            </Flex>
          </Flex>
        </View>
      </PageView.Content>
    </PageView>
  );
};

export default PageIndex;
