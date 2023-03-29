import { Menu, MenuItem } from "@nutui/nutui-react-taro";
import { getResidentialList } from "@src/apis/residential/get-residential-list";
import { useDidMount } from "@src/lib/hooks/lifecycle";
import { useState } from "react";

export interface NutMenuProps {
  onChange?: (value: number) => void;
}
export const NutMenu = (props: NutMenuProps) => {
  const [residentialList, setResidentialList] = useState([{ text: "全部地区", value: 0 }]);
  const getResidentialListData = async () => {
    const { data } = await getResidentialList();
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

  const onChangeHandel = (value: any) => {
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
          value={residentialList[0].value}
          onChange={value => {
            onChangeHandel(value);
          }}
        />
      </Menu>
    </div>
  );
};
