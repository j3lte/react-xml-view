import React, { CSSProperties, memo } from "react";
import { useXMLViewerContext } from "../context/index";

interface AttributesProps {
  attributes: { [attrName: string]: string };
}

export const Attributes = memo(({ attributes }: AttributesProps) => {
  const { theme } = useXMLViewerContext();
  const overflow: CSSProperties = theme.overflowBreak
    ? { overflowWrap: "break-word", whiteSpace: "normal" }
    : {};
  let attributeList: JSX.Element[] = [];

  for (const [attrName, attrValue] of Object.entries(attributes)) {
    attributeList.push(
      <span key={`attr-${attrName}[${attrValue}]`}>
        <span style={{ color: theme.attributeKeyColor }}>{` ${attrName}`}</span>
        <span style={{ color: theme.separatorColor }}>{"="}</span>
        <span
          style={{ color: theme.attributeValueColor }}
        >{`"${attrValue}"`}</span>
      </span>
    );
  }

  return <span style={overflow}>{attributeList}</span>;
});

Attributes.displayName = "Attributes";
