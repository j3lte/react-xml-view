import React, { memo, useMemo } from "react";
import clsx from "clsx";

import { useXMLViewerContext } from "../context/index";
import { getStyles } from "../styles";

interface AttributesProps {
  attributes: { [attrName: string]: string };
}

export const Attributes = memo(({ attributes }: AttributesProps) => {
  const { theme, classNames } = useXMLViewerContext();
  const {
    attributeKeyColor,
    attributeValueColor,
    overflowBreak,
    separatorColor,
  } = useMemo(() => getStyles(theme), [theme]);

  let attributeList: JSX.Element[] = [];

  for (const [attrName, attrValue] of Object.entries(attributes)) {
    attributeList.push(
      <span
        className={clsx(classNames.attribute)}
        key={`attr-${attrName}[${attrValue}]`}
      >
        <span
          className={clsx(classNames.attributeKey)}
          style={attributeKeyColor}
        >{` ${attrName}`}</span>
        <span className={clsx(classNames.separator)} style={separatorColor}>
          {"="}
        </span>
        <span
          className={clsx(classNames.attributeValue)}
          style={attributeValueColor}
        >{`"${attrValue}"`}</span>
      </span>
    );
  }

  return (
    <span className={clsx(classNames.attributeList)} style={overflowBreak}>
      {attributeList}
    </span>
  );
});

Attributes.displayName = "Attributes";
