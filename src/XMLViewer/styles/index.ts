import { CSSProperties } from "react";
import { Theme } from "../index.types";

type Styles = {
  attributeKeyColor: CSSProperties;
  attributeValueColor: CSSProperties;
  cdataColor: CSSProperties;
  commentColor: CSSProperties;
  overflowBreak: CSSProperties;
  separatorColor: CSSProperties;
  tagColor: CSSProperties;
  textColor: CSSProperties;
};

export const getStyles = (theme: Theme): Styles => ({
  attributeKeyColor:
    typeof theme.attributeKeyColor === "string"
      ? { color: theme.attributeKeyColor }
      : {},
  attributeValueColor:
    typeof theme.attributeValueColor === "string"
      ? { color: theme.attributeValueColor }
      : {},
  cdataColor:
    typeof theme.cdataColor === "string" ? { color: theme.cdataColor } : {},
  commentColor:
    typeof theme.commentColor === "string" ? { color: theme.commentColor } : {},
  overflowBreak: theme.overflowBreak
    ? { overflowWrap: "break-word", whiteSpace: "normal" }
    : {},
  separatorColor:
    typeof theme.separatorColor === "string"
      ? { color: theme.separatorColor }
      : {},
  tagColor: typeof theme.tagColor === "string" ? { color: theme.tagColor } : {},
  textColor:
    typeof theme.textColor === "string" ? { color: theme.textColor } : {},
});
