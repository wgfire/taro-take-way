import { ShopCar } from "@src/components/ShopCar";
import { PageView } from "@src/lib/components/layout/PageView";
import { Navigation } from "@src/utils/Navigation";
import { NutMenu } from "./components/menu";
import { NutTabs } from "./components/tabs";

import { usePresenter } from "./presenter";

import { usePresenter as userPresenter } from "@src/moduels/user/usePresenter";
import { useEffect, useState } from "react";
import { Empty } from "@nutui/nutui-react-taro";
import { setShopGoodsData } from "@src/apis/goods/set-goods";
import { View } from "@tarojs/components";
import styles from "./index.module.scss";
import { useModel } from "@src/components/ShopCar/model";

const Index = () => {
  const { model, getData, selectGoodsHandel } = usePresenter();
  const { model: userModel } = userPresenter();
  const { total, expand, loading, goodsData, menuData, selectGoods } = model.state;
  const [ready, setReady] = useState(false);
  const carModel = useModel();

  useEffect(() => {
    setReady(!!userModel.state.token);
  }, [userModel.state.token]);

  useEffect(() => {
    if (selectGoods.length === 0) carModel.setState({ showCar: false });
  }, [carModel, selectGoods]);

  return (
    <PageView tabBarPlaceholder loading={loading}>
      {carModel.state.showCar && (
        <View
          className={styles.mask}
          onClick={() => {
            carModel.setState({ showCar: false });
          }}
        ></View>
      )}
      {ready ? (
        <PageView.Content>
          <NutMenu
            onChange={value => {
              console.log(value);
              model.resetState();
              getData();
            }}
          ></NutMenu>
          {menuData.length > 0 && (
            <NutTabs
              menus={menuData}
              goods={goodsData}
              onSelect={async (value, type) => {
                selectGoodsHandel(value, type);
              }}
            ></NutTabs>
          )}

          <ShopCar
            price={total}
            expand={expand}
            onClick={async () => {
              const result = await setShopGoodsData({ goodsIds: selectGoods.map(el => el.id) });
              if (result.code === 1000) Navigation.navigateTo("/pages/order/index");
            }}
          ></ShopCar>
        </PageView.Content>
      ) : (
        <Empty></Empty>
      )}
    </PageView>
  );
};

export default Index;
