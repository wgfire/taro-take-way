import { ScrollView, View } from "@tarojs/components";
import { PropsWithChildren } from "react";

export const TabContent = (props: PropsWithChildren) => {
  return (
    <ScrollView scrollY style={{ height: "100%", width: "100%" }}>
      {props.children}
    </ScrollView>
  );
};
