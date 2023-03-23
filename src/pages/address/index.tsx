import { Button, Cell, Checkbox, Radio } from "@nutui/nutui-react-taro";

import { PageView } from "@src/lib/components/layout/PageView";
import { StringUtil } from "@src/lib/utils/StringUtil";
import styles from "./index.module.scss";
import { usePresenter } from "./presenter";

export const Address = () => {
  const { model } = usePresenter();
  return (
    <PageView>
      <PageView.Content flexGrow={1}>
        {model.state.address.map(el => {
          return (
            <Cell
              key={StringUtil.uniqueId()}
              center
              title={el.content}
              subTitle={el.tel}
              linkSlot={
                <Checkbox checked={el.default} onChange={(state, label) => {
                    
                }} style={{ color: " rgb(249, 220, 74);" }}>
                  {el.default ? "默认地址" : "设为默认"}
                </Checkbox>
              }
            />
          );
        })}
      </PageView.Content>

      <Button color="rgb(249, 220, 74)" size="normal" className={styles.btn} icon="plus">
        新增地址
      </Button>
    </PageView>
  );
};

export default Address;
