import { Menu, MenuItem } from "@nutui/nutui-react-taro";
import { getResidentialList } from "@src/apis/residential/get-residential-list";
import { useDidMount } from "@src/lib/hooks/lifecycle";
import { useState } from "react";

export interface NutMenuProps {}
export const NutMenu = () => {
  const [residentialList, setResidentialList] = useState([{ text: "全部地区", value: 0 }]);
  const getResidentialListData = async () => {
    const { data } = await getResidentialList();
    setResidentialList(() => {
      return data.map(item => {
        return {
          text: item.name,
          value: item.id,
        };
      });
    });
  };
  const onChangeHandel = (value: any) => {
    console.log(value, "改变");
  };
  useDidMount(() => {
    getResidentialListData();
  });

  return (
    <div className="demo full">
      <Menu activeColor="black">
        <MenuItem
          options={residentialList}
          value={residentialList[0].value}
          onChange={value => {
            onChangeHandel(value);
          }}
        />
      </Menu>
    </div>
  );
};
