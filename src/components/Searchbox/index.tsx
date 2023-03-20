import { Image, Input, InputProps, View } from "@tarojs/components";
import React, { CSSProperties, useEffect, useState } from "react";
import { Icon } from "@nutui/nutui-react-taro";

import styles from "./searchbox.module.scss";

import clear from "./clear.svg";
import classnames from "classnames";

export interface SearchBoxProps extends InputProps {
  value: string;
  inputClassName?: string;
  inputStyle?: string | CSSProperties;
  onChange?: (e: string) => void;
  onSearch?: (e: string) => void;
  onClear?: () => void;
}

const SearchBox = (props: SearchBoxProps) => {
  const { value, style, className, inputStyle, inputClassName, onChange, onSearch, onClear, ...restInputProps } = props;
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    setKeyword(value);
  }, [value]);

  function handleInput(val: string) {
    setKeyword(val);
    onChange && onChange(val);
  }

  function handleClear() {
    setKeyword("");
    onClear && onClear();
  }

  return (
    <View className={classnames(styles.root, className)} style={style}>
      <View className={styles.inputbox}>
        <View className={styles.iconbox} onClick={() => onSearch && onSearch(value)}>
          <Icon className={styles.icon} value="search" size={18} />
        </View>

        <Input
          type="text"
          value={keyword}
          confirmType="search"
          style={inputStyle}
          className={classnames(styles.input, inputClassName)}
          onInput={e => handleInput(e.detail.value)}
          onConfirm={e => onSearch && onSearch(e.detail.value)}
          {...restInputProps}
        />
        {onClear ? (
          <View className={styles.iconbox} style={{ display: keyword ? "" : "none" }} onClick={handleClear}>
            <Image src={clear} className={styles.clear} />
          </View>
        ) : null}
      </View>

      {/* <View className={styles.btn} onClick={() => onSearch && onSearch(value)}>
        搜索
      </View> */}
    </View>
  );
};

export default SearchBox;
