import { Button, Cell, Checkbox, Empty, Icon } from "@nutui/nutui-react-taro";
import { Flex } from "@src/lib/components/basic/Flex";

import { PageView } from "@src/lib/components/layout/PageView";
import { StringUtil } from "@src/lib/utils/StringUtil";
import { Navigation, RoutePath } from "@src/utils/Navigation";
import { View } from "@tarojs/components";
import { eventCenter, getCurrentPages, useDidShow, useRouter } from "@tarojs/taro";
import styles from "./index.module.scss";
import { usePresenter } from "./presenter";
import { useDidMount } from "@src/lib/hooks/lifecycle";
import { deleteAddress, updateAddress } from "@src/apis/address/add-address";

export const Address = () => {
  const { model, getAddressListData } = usePresenter();
  const { params } = useRouter();
  const { loading } = model.state;

  useDidShow(() => {
    model.resetState();
    getAddressListData();
  });

  return (
    <PageView>
      <PageView.Content flexGrow={1}>
        {model.state.address.length > 0 ? (
          model.state.address.map(el => {
            return (
              <Cell
                key={StringUtil.uniqueId()}
                center
                title={`${el.contacts}--${el.address}`}
                subTitle={el.phone}
                onClick={e => {
                  eventCenter.trigger("selectAddress", `${el.contacts}--${el.address}`, el.id);

                  if (params.link === "order") {
                    Navigation.navigateBack();
                  } else {
                    Navigation.navigateTo(`/pages/editAddress/index`, {
                      phone: el.phone,
                      contacts: el.contacts,
                      address: el.address,
                      isDefault: el.isDefault ? "1" : "0",
                      id: el.id,
                    });
                  }
                }}
                linkSlot={
                  <Flex
                    alignItems="center"
                    onClick={e => {
                      e.stopPropagation();
                    }}
                  >
                    <Checkbox
                      checked={el.isDefault}
                      onChange={async (state, label) => {
                        console.log(state, label);
                        await updateAddress({
                          ...el,
                          isDefault: state,
                        });
                        await getAddressListData();
                      }}
                      style={{ color: " rgb(249, 220, 74);" }}
                    >
                      {el.isDefault ? "默认地址" : "设为默认"}
                    </Checkbox>
                    <Icon
                      name="edit"
                      size={16}
                      style={{ marginLeft: "30rpx" }}
                      onClick={e => {
                        Navigation.navigateTo("/pages/editAddress/index", {
                          phone: el.phone,
                          contacts: el.contacts,
                          address: el.address,
                          isDefault: el.isDefault ? "1" : "0",
                          id: el.id,
                        });
                      }}
                    ></Icon>
                    <Icon
                      name="del2"
                      size={16}
                      style={{ marginLeft: "30rpx" }}
                      onClick={async e => {
                        await deleteAddress({ addressId: el.id as number });
                        await getAddressListData();
                      }}
                    ></Icon>
                  </Flex>
                }
              />
            );
          })
        ) : (
          <Empty></Empty>
        )}
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
