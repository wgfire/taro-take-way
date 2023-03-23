import { Address, Button, Cell, Input } from "@nutui/nutui-react-taro";
import { FormItem } from "@src/components/form/FormItem";
import { Flex } from "@src/lib/components/basic/Flex";
import { Text } from "@src/lib/components/basic/Text";
import { PageView } from "@src/lib/components/layout/PageView";
import { Navigation } from "@src/utils/Navigation";
import Taro from "@tarojs/taro";
import { useState } from "react";
import { usePresenter } from "../address/presenter";
import styles from "./index.module.scss";

const EditAddress = () => {
  const { model } = usePresenter();
  const [text, setText] = useState("请选择地址");
  const [phone, setPhone] = useState(0);
  const [name, setName] = useState();
  const [normal, setNormal] = useState(false);
  const [province, setProvince] = useState([
    { id: 1, name: "北京", title: "B" },
    { id: 2, name: "广西", title: "G" },
    { id: 3, name: "江西", title: "J" },
    { id: 4, name: "四川", title: "S" },
    { id: 5, name: "浙江", title: "Z" },
  ]);

  const [city, setCity] = useState([
    { id: 7, name: "朝阳区", title: "C" },
    { id: 8, name: "崇文区", title: "C" },
    { id: 9, name: "昌平区", title: "C" },
    { id: 6, name: "石景山区", title: "S" },
    { id: 3, name: "八里庄街道", title: "B" },
    { id: 10, name: "北苑", title: "B" },
  ]);

  const [country, setCountry] = useState([
    { id: 3, name: "八里庄街道", title: "B" },
    { id: 9, name: "北苑", title: "B" },
    { id: 4, name: "常营乡", title: "C" },
  ]);
  const [town, setTown] = useState([]);

  const [address, setAddress] = useState({
    province,
    city,
    country,
    town,
  });
  const onChange = cal => {
    const name = address[cal.next];
    setTimeout(() => {
      switch (cal.next) {
        case "city":
          setCity([
            { id: 7, name: "朝阳区", title: "C" },
            { id: 8, name: "崇文区", title: "C" },
            { id: 9, name: "昌平区", title: "C" },
            { id: 6, name: "石景山区", title: "S" },
            { id: 3, name: "八里庄街道", title: "B" },
            { id: 10, name: "北苑", title: "B" },
          ]);
          break;
        case "country":
          setCountry([
            { id: 3, name: "八里庄街道", title: "B" },
            { id: 9, name: "北苑", title: "B" },
            { id: 4, name: "常营乡", title: "C" },
          ]);
          break;
        default:
          setNormal(false);
      }
    }, 200);
  };
  const close = val => {
    console.log(val);
    setNormal(false);

    if (val.data.addressStr) {
      setText(val.data.addressStr);
    }
  };
  const save = () => {
    if (!text || !name) {
      Taro.showModal({
        title: "提示",
        content: "请填写所有必填项",
      });
    } else {
      model.setState({
        address: [
          ...model.state.address,
          {
            tel: phone,
            content: text,
            default: false,
            name,
          },
        ],
      });
      Navigation.navigateTo("/pages/address/index");
    }
  };
  return (
    <PageView>
      <PageView.Content flexGrow={1}>
        <Flex>
          <Cell
            title="姓名"
            linkSlot={
              <Input
                placeholder="请输入姓名"
                style={{ padding: "12rpx 0rpx", width: "130rpx" }}
                onChange={value => {
                  setName(value);
                }}
              ></Input>
            }
          />
        </Flex>
        <Flex>
          <Cell
            title="电话"
            linkSlot={
              <Button
                openType="getPhoneNumber"
                style={{ padding: "0rpx" }}
                size="small"
                onGetPhoneNumber={e => {
                  // debugger;
                }}
              >
                <Text color="lightGray#999999">点击授权获取</Text>
              </Button>
            }
          />
        </Flex>
        <Flex>
          <Cell title="选择地址" desc={text} onClick={() => setNormal(true)} />
          <Address modelValue={normal} province={province} city={city} country={country} customAddressTitle="请选择所在地区" onChange={onChange} onClose={close} />
        </Flex>
      </PageView.Content>
      <Button color="rgb(249, 220, 74)" size="normal" className={styles.btn} icon="plus" onClick={() => save()}>
        保存
      </Button>
    </PageView>
  );
};

export default EditAddress;
