import { ShopCar } from "@src/components/ShopCar";
import { PageView } from "@src/lib/components/layout/PageView";
import { Navigation } from "@src/utils/Navigation";
import { NutMenu } from "./components/menu";
import { NutTabs } from "./components/tabs";
import { usePresenter } from "./presenter";
import { usePresenter as userPresenter } from "@src/moduels/user/usePresenter";

const Index = () => {
  const { model, getData, selectGoodsHandel } = usePresenter();
  const { model: userModel } = userPresenter();
  const { total, expand, loading, goodsData, menuData } = model.state;
  return (
    <PageView tabBarPlaceholder loading={!userModel.state.token || loading}>
      {userModel.state.token && (
        <PageView.Content>
          <NutMenu
            onChange={id => {
              model.resetState();
              getData(id);
            }}
          ></NutMenu>
          {menuData.length > 0 && (
            <NutTabs
              menus={menuData}
              goods={goodsData}
              onSelect={(value, type) => {
                selectGoodsHandel(value, type);
              }}
            ></NutTabs>
          )}
          <ShopCar
            price={total}
            expand={expand}
            onClick={() => {
              Navigation.navigateTo("/pages/order/index");
            }}
          ></ShopCar>
        </PageView.Content>
      )}
    </PageView>
  );
};

export default Index;
