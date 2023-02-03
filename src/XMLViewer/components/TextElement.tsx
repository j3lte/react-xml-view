import React, { CSSProperties, memo } from "react";
import type { XmlText } from "@rgrove/parse-xml";

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
