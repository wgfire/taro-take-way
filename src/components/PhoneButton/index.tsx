import { ITouchEvent } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React from "react";
import { RoundButton, RoundButtonProps } from "../RoundButton";
import { AnimatedIcon } from "./AnimatedIcon";
import { getBusinessOpportunityMobile } from "@src/apis/business/get-business-opportunity-mobile";
import { StringUtil } from "@src/lib/utils/StringUtil";

export interface PhoneButtonProps extends RoundButtonProps {
  id?: string;
  /** 必须明确是明文，可直接传入拨打，否则传入采购需求id */
  phone?: string;
}

export const PhoneButton: React.FC<PhoneButtonProps> = React.memo(props => {
  const { id, phone, ...rest } = props;

  // 手机号 和 id 都没，则不显示电话按钮
  if (!id && !phone) {
    return;
  }

  // 传递的手机号不正确，则不显示电话按钮
  if (phone && StringUtil.testPhone(phone)) {
    return null;
  }

  const call = async (e: ITouchEvent) => {
    e.stopPropagation();

    if (phone) {
      Taro.makePhoneCall({ phoneNumber: phone });
      return;
    }

    if (id) {
      const result = await getBusinessOpportunityMobile({ id });
      const tel = result.tel;

      if (tel) {
        Taro.makePhoneCall({ phoneNumber: tel }).catch(() => {
          // 捕获取消拨打的异常，不做任何操作
        });
      } else {
        Taro.showToast({ title: "无法拨打该电话", icon: "none" });
      }
      return;
    }

    Taro.showToast({ title: "没有能拨打的电话", icon: "none" });
  };

  return <RoundButton {...rest} color="primary" icon={<AnimatedIcon size={rest.size} />} onClick={call} />;
});

PhoneButton.defaultProps = {
  children: "拨号",
};
