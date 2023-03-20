import { ScrollView } from "@tarojs/components";
import { PropsWithChildren } from "react";

export const TabContent = (props: PropsWithChildren) => {
  return (
    <ScrollView scrollY style={{ width: "100%" }}>
      {props.children}
    </ScrollView>
  );
};
