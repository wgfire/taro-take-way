import { ShopCar } from "@src/components/ShopCar";
import { PageView } from "@src/lib/components/layout/PageView";
import { useEffect, useState } from "react";

import { NutMenu } from "./components/menu";
import { NutTabs } from "./components/tabs";

const Index = () => {
  const [total, setTotal] = useState(0);
  const [expand, setExpand] = useState(false);
  useEffect(() => {
    console.log(total);
    setExpand(total !== 0);
  }, [total]);
  return (
    <PageView tabBarPlaceholder loading={false}>
      <PageView.Content>
        <NutMenu></NutMenu>
        <NutTabs
          total={total}
          onSelect={value => {
            setTotal(value);
          }}
        ></NutTabs>
        <ShopCar price={total} expand={expand}></ShopCar>
      </PageView.Content>
    </PageView>
  );
};

export default Index;
