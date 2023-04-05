import { Menu, MenuItem } from "@nutui/nutui-react-taro";
import { bindResidentialList } from "@src/apis/residential/bind-residential";
import { getResidentialList } from "@src/apis/residential/get-residential-list";
import { useDidMount } from "@src/lib/hooks/lifecycle";
import { useState } from "react";

import { getMyInfo } from "@src/apis/my/get-my-info";

export interface NutMenuProps {
  onChange?: (value: number) => void;
}
export const NutMenu = (props: NutMenuProps) => {
  const [residentialList, setResidentialList] = useState([{ text: "选择地址", value: 0 }]);
  const [bindArea, setBindArea] = useState(0);
  const getResidentialListData = async () => {
    const { data } = await getResidentialList();
    const user = await getMyInfo();
    if (!user.data.rqId) {
      // await bindResidentialList({
      //   id: data[0].id,
      // });
      data.unshift({ id: 0, name: "选择地址" });
      setBindArea(0);
    } else {
      setBindArea(user.data.rqId);
    }
    props.onChange?.(data[0].id);
    setResidentialList(() => {
      return data.map(item => {
        return {
          text: item.name,
          value: item.id,
        };
      });
    });
  };

  const onChangeHandel = async (value: any) => {
    if (residentialList[0].text === "选择地址") {
      setResidentialList(item => {
        return item.filter(el => el.text !== "选择地址");
      });
    }
    await bindResidentialList({
      id: value.value,
    });
    setBindArea(value.value);
    props.onChange?.(value.value);
  };
  useDidMount(() => {
    getResidentialListData();
  });

  return (
    <div className="demo full">
      <Menu activeColor="black">
        <MenuItem
          options={residentialList}
          value={bindArea}
          onChange={value => {
            onChangeHandel(value);
          }}
        />
      </Menu>
    </div>
  );
};
