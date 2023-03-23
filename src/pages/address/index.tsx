import { Button, Cell, Checkbox, Radio } from "@nutui/nutui-react-taro";

import { PageView } from "@src/lib/components/layout/PageView";
import { StringUtil } from "@src/lib/utils/StringUtil";
import { Navigation, RoutePath } from "@src/utils/Navigation";
import { View } from "@tarojs/components";
import { eventCenter, getCurrentPages, useRouter } from "@tarojs/taro";
import styles from "./index.module.scss";
import { usePresenter } from "./presenter";

export const Address = () => {
  const { model } = usePresenter();
  const { params } = useRouter();

  return (
    <PageView>
      <PageView.Content flexGrow={1}>
        {model.state.address.map(el => {
          return (
            <Cell
              key={StringUtil.uniqueId()}
              center
              title={`${el.name}--${el.content}`}
              subTitle={el.tel}
              onClick={e => {
                eventCenter.trigger("selectAddress", `${el.name}--${el.content}`);
                Navigation.navigateBack();

                // Navigation.navigateTo(`/pages/${params.link ?? "order"}/index` as RoutePath);
              }}
              linkSlot={
                <View
                  onClick={e => {
                    e.stopPropagation();
                  }}
                >
                  <Checkbox
                    checked={el.default}
                    onChange={(state, label) => {
                      const newAddress = model.state.address.map(items => {
                        return {
                          ...items,
                          default: el.tel === items.tel,
                        };
                      });
                      model.setState({
                        address: newAddress,
                      });
                    }}
                    style={{ color: " rgb(249, 220, 74);" }}
                  >
                    {el.default ? "默认地址" : "设为默认"}
                  </Checkbox>
                </View>
              }
            />
          );
        })}
      </PageView.Content>

      <Button
        color="rgb(249, 220, 74)"
        size="normal"
        className={styles.btn}
        icon="plus"
        onClick={() => {
          Navigation.navigateTo("/pages/editAddress/index");
        }}
      >
        新增地址
      </Button>
    </PageView>
  );
};

export default Address;
