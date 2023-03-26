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

const EditAddress = () => {
  const { params } = useRouter();
  const { model } = usePresenter();
  const [text, setText] = useState(params.content ? decodeURIComponent(params.content) : "请选择地址");
  const [phone, setPhone] = useState(params.tel ?? "");
  const [name, setName] = useState(params.name ? decodeURIComponent(params.name) : "");

  const save = () => {
    if (!text || !name) {
      Taro.showModal({
        title: "提示",
        content: "请填写所有必填项",
      });
    } else {
      const newAddress = [...model.state.address];
      if (params.tel) {
        const index = newAddress.findIndex(el => el.tel === params.tel);
        if (index > -1) {
          newAddress[index] = {
            tel: params.tel,
            name,
            content: text,
            default: params.default === "1",
          };
        }
      } else {
        newAddress.push({
          tel: phone,
          content: text,
          default: false,
          name,
        });
      }
      model.setState({
        address: newAddress,
      });

      Navigation.navigateTo("/pages/address/index");
    }
  };
  return (
    <PageView>
      <PageView.Content flexGrow={1}>
        <FormItem required label="姓名" direction="column">
          <Input
            placeholder="请输入姓名"
            defaultValue={name}
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
                onGetPhoneNumber={e => {
                  // debugger;
                  console.log(e, "回调");
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
