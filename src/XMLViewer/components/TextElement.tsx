import React, { memo, useMemo } from "react";
import type { XmlText } from "@rgrove/parse-xml";

import { useXMLViewerContext } from "../context";
import { getStyles } from "../styles";

interface TextElementProps {
  element: XmlText;
}

export const TextElement = memo(({ element }: TextElementProps) => {
  const { theme } = useXMLViewerContext();
  const { textColor, overflowBreak } = useMemo(() => getStyles(theme), [theme]);

  return <span style={{ ...textColor, ...overflowBreak }}>{element.text}</span>;
});

TextElement.displayName = "TextElement";
