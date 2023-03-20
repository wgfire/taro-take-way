import { PageView } from "@src/lib/components/layout/PageView";

import { NutMenu } from "./components/menu";
import { NutTabs } from "./components/tabs";

const Index = () => {
  return (
    <PageView tabBarPlaceholder loading={false}>
      <PageView.Content>
        <NutMenu></NutMenu>
        <NutTabs></NutTabs>
      </PageView.Content>
    </PageView>
  );
};

export default Index;
