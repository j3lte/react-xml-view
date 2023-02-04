import React, { memo } from "react";
import clsx from "clsx";
import type { XmlText } from "@rgrove/parse-xml";

import { useStyles, useXMLViewerContext } from "../context";

interface TextElementProps {
  element: XmlText;
}

export const TextElement = memo<(props: TextElementProps) => JSX.Element>(
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
  }
);

TextElement.displayName = "TextElement";
