import React, { memo, useMemo } from "react";
import type { XmlComment } from "@rgrove/parse-xml";

import { useXMLViewerContext } from "../context/index";
import { getStyles } from "../styles/index";

interface CommentElementProps {
  element: XmlComment;
  indentation: string;
}

export const CommentElement = memo(
  ({ element, indentation }: CommentElementProps) => {
    const { theme } = useXMLViewerContext();
    const { commentColor } = useMemo(() => getStyles(theme), [theme]);

    return (
      <div style={commentColor}>
        {`${indentation}<!-- ${element.content} -->`}
      </div>
    );
  }
);

CommentElement.displayName = "CommentElement";
