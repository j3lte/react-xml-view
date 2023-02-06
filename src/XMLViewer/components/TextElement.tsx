import React, { memo } from "react";

import type { XmlText } from "@rgrove/parse-xml";
import clsx from "clsx";

import { useStyles, useXMLViewerContext } from "../context/XMLViewerContext";

interface TextElementProps {
  element: XmlText;
}

const TextElement = memo<(props: TextElementProps) => JSX.Element>(
  ({ element }: TextElementProps) => {
    const { classNames, cleanEmptyTextNodes } = useXMLViewerContext();
    const { textColor, overflowBreak } = useStyles();

    const text = cleanEmptyTextNodes ? element.text.trim() : element.text;
    return (
      <span
        className={clsx(classNames.text)}
        style={{ ...textColor, ...overflowBreak }}
      >
        {text}
      </span>
    );
  },
);

TextElement.displayName = "TextElement";

export default TextElement;
