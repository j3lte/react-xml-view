import React, { memo, useMemo } from "react";
import clsx from "clsx";
import type { XmlText } from "@rgrove/parse-xml";

import { useXMLViewerContext } from "../context";
import { getStyles } from "../styles";

interface TextElementProps {
  element: XmlText;
}

export const TextElement = memo<(props: TextElementProps) => JSX.Element>(
  ({ element }: TextElementProps) => {
    const { theme, classNames } = useXMLViewerContext();
    const { textColor, overflowBreak } = useMemo(
      () => getStyles(theme),
      [theme]
    );

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
