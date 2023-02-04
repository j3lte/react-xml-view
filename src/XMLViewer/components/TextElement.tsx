import React, { memo } from "react";
import clsx from "clsx";
import type { XmlText } from "@rgrove/parse-xml";

import { useStyles, useXMLViewerContext } from "../context";

interface TextElementProps {
  element: XmlText;
}

export const TextElement = memo<(props: TextElementProps) => JSX.Element>(
  ({ element }: TextElementProps) => {
    const { classNames } = useXMLViewerContext();
    const { textColor, overflowBreak } = useStyles();

    return (
      <span
        className={clsx(classNames.text)}
        style={{ ...textColor, ...overflowBreak }}
      >
        {element.text}
      </span>
    );
  }
);

TextElement.displayName = "TextElement";
