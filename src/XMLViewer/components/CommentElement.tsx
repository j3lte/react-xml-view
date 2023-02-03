import { XmlComment } from "@rgrove/parse-xml";
import React, { memo } from "react";
import { useXMLViewerContext } from "../context/index";

interface CommentElementProps {
  element: XmlComment;
  indentation: string;
}

export const CommentElement = memo(
  ({ element, indentation }: CommentElementProps) => {
    const { theme } = useXMLViewerContext();
    return (
      <div style={{ color: theme.commentColor }}>
        {`${indentation}<!-- ${element.content} -->`}
      </div>
    );
  }
);

CommentElement.displayName = "CommentElement";
