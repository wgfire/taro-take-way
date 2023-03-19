import { ScrollView, View } from "@tarojs/components";

export const TabContent = (props) => {
  return (
    <ScrollView scrollY style={{ height: "100%",width:"100%" }}>
      {props.children}
    </ScrollView>
  );
};
