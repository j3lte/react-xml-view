import React, { memo } from "react";
import clsx from "clsx";
import type { XmlComment } from "@rgrove/parse-xml";

import { useStyles, useXMLViewerContext } from "../context/index";

interface CommentElementProps {
  element: XmlComment;
  indentation: string;
}

export const CommentElement = memo<(props: CommentElementProps) => JSX.Element>(
  ({ element, indentation }: CommentElementProps) => {
    const { classNames } = useXMLViewerContext();
    const { commentColor } = useStyles();

    return (
      <div className={clsx(classNames.comment)} style={commentColor}>
        {`${indentation}<!-- ${element.content} -->`}
      </div>
    );
  },
);

CommentElement.displayName = "CommentElement";
