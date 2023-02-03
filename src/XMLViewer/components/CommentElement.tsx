import React, { memo, useMemo } from "react";
import clsx from "clsx";
import type { XmlComment } from "@rgrove/parse-xml";

import { useXMLViewerContext } from "../context/index";
import { getStyles } from "../styles/index";

interface CommentElementProps {
  element: XmlComment;
  indentation: string;
}

export const CommentElement = memo<(props: CommentElementProps) => JSX.Element>(
  ({ element, indentation }: CommentElementProps) => {
    const { theme, classNames } = useXMLViewerContext();
    const { commentColor } = useMemo(() => getStyles(theme), [theme]);

    return (
      <div className={clsx(classNames.comment)} style={commentColor}>
        {`${indentation}<!-- ${element.content} -->`}
      </div>
    );
  }
);

CommentElement.displayName = "CommentElement";
