import React, { memo } from "react";
import clsx from "clsx";

import { useStyles, useXMLViewerContext } from "../context/index";

interface AttributesProps {
  attributes: { [attrName: string]: string };
}

export const Attributes = memo<(props: AttributesProps) => JSX.Element>(
  ({ attributes }: AttributesProps) => {
    const { classNames } = useXMLViewerContext();
    const {
      attributeKeyColor,
      attributeValueColor,
      overflowBreak,
      separatorColor,
    } = useStyles();
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
        </span>,
      );
    }

    return (
      <span className={clsx(classNames.attributeList)} style={overflowBreak}>
        {attributeList}
      </span>
    );
  },
);

Attributes.displayName = "Attributes";
