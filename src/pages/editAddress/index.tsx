import { Address, Button, Cell, Input } from "@nutui/nutui-react-taro";
import { FormItem } from "@src/components/form/FormItem";
import { Flex } from "@src/lib/components/basic/Flex";
import { Text } from "@src/lib/components/basic/Text";
import { PageView } from "@src/lib/components/layout/PageView";
import { Navigation } from "@src/utils/Navigation";
import { View } from "@tarojs/components";
import Taro, { useRouter } from "@tarojs/taro";
import { useState } from "react";
import { usePresenter } from "../address/presenter";
import styles from "./index.module.scss";
import { getPhone } from "@src/apis/login/get-phone";
import { SubmitAddressData, updateAddress } from "@src/apis/address/add-address";
import { number } from "yargs";

const EditAddress = () => {
  const { params } = useRouter();
  const { model } = usePresenter();
  const [text, setText] = useState(params.address ? decodeURIComponent(params.address) : "");
  const [phone, setPhone] = useState(params.phone ?? "");
  const [contacts, setName] = useState(params.contacts ? decodeURIComponent(params.contacts) : "");
  const [loading, setLoading] = useState(false);
  const save = async () => {
    if (!text || !contacts || !phone) {
      Taro.showModal({
        title: "提示",
        content: "请填写所有必填项",
      });
    } else {
      setLoading(true);
      if (params.id) {
        await updateAddress({
          address: text,
          contacts,
          phone,
          isDefault: params.isDefault === "1",
          id: Number(params.id),
        });
      } else {
        await SubmitAddressData({
          address: text,
          contacts,
          phone,
          isDefault: false,
        });
      }

      Navigation.navigateBack();
    }
  };
  return (
    <PageView >
      <PageView.Content flexGrow={1}>
        <FormItem required label="姓名" direction="column">
          <Input
            placeholder="请输入姓名"
            defaultValue={contacts}
            style={{ padding: "12rpx 0rpx" }}
            onChange={value => {
              setName(value);
            }}
          ></Input>
        </FormItem>

        <FormItem required label="电话号" direction="column">
          {!phone ? (
            <View>
              <Button
                openType="getPhoneNumber"
                style={{ padding: "0rpx", width: "190rpx" }}
                size="small"
                onGetPhoneNumber={async e => {
                  // debugger;
                  if (e.detail.code) {
                    const result = await getPhone({ code: e.detail.code });
                    result.data && setPhone(result.data);
                  } else {
                    Taro.showModal({ title: "提示", content: "获取手机号失败" });
                  }
                }}
              >
                <Text color="lightGray#999999">点击授权获取</Text>
              </Button>
            </View>
          ) : (
            <Text>{phone}</Text>
          )}
        </FormItem>
        <FormItem required label="地址信息" direction="column">
          <Input
            style={{ padding: "12rpx 0rpx" }}
            defaultValue={text}
            placeholder="输入地址"
            onChange={value => {
              setText(value);
            }}
          ></Input>
        </FormItem>
      </PageView.Content>
      <Button color="rgb(249, 220, 74)" size="normal" className={styles.btn} icon="plus" onClick={() => save()}>
        保存
      </Button>
    </PageView>
  );
};

export default EditAddress;
