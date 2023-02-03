import { XmlText } from "@rgrove/parse-xml";
import React, { CSSProperties } from "react";
import { memo } from "react";
import { useXMLViewerContext } from "../context";

interface TextElementProps {
  element: XmlText;
}

export const TextElement = memo(({ element }: TextElementProps) => {
  const { theme } = useXMLViewerContext();
  const overflow: CSSProperties = theme.overflowBreak
    ? { overflowWrap: "break-word", whiteSpace: "normal" }
    : {};
  return (
    <span style={{ color: theme.textColor, ...overflow }}>{element.text}</span>
  );
});

TextElement.displayName = "TextElement";
