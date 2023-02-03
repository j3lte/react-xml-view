import React, { memo, useMemo } from "react";

import { useXMLViewerContext } from "../context/index";
import { getStyles } from "../styles";

interface AttributesProps {
  attributes: { [attrName: string]: string };
}

export const Attributes = memo(({ attributes }: AttributesProps) => {
  const { theme } = useXMLViewerContext();
  const {
    attributeKeyColor,
    attributeValueColor,
    overflowBreak,
    separatorColor,
  } = useMemo(() => getStyles(theme), [theme]);

  let attributeList: JSX.Element[] = [];

  for (const [attrName, attrValue] of Object.entries(attributes)) {
    attributeList.push(
      <span key={`attr-${attrName}[${attrValue}]`}>
        <span style={attributeKeyColor}>{` ${attrName}`}</span>
        <span style={separatorColor}>{"="}</span>
        <span style={attributeValueColor}>{`"${attrValue}"`}</span>
      </span>
    );
  }

  return <span style={overflowBreak}>{attributeList}</span>;
});

Attributes.displayName = "Attributes";
