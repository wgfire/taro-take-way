import { MenuOptions } from "@/components/menu/index";
import { PageView } from "@/components/pageView";
import { ShopCar } from "@/components/shopCar";
import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { NutTabs } from "./components/tabs";

const Index = () => {
  const [total, setTotal] = useState(0);
  const [expand, setExpand] = useState(false);
  useEffect(() => {
    setExpand(total !== 0);
  }, [total]);
  return (
    <PageView>
      <MenuOptions></MenuOptions>
      <NutTabs
        onSelect={(value) => {
          const newTotal = Number((total + value).toFixed(2));
          setTotal(newTotal);
        }}
      ></NutTabs>

      <ShopCar price={total} expand={expand}></ShopCar>
    </PageView>
  );
};

export default Index;
