import { ParserOptions } from "@rgrove/parse-xml";
import { HTMLAttributes } from "react";

export type Theme = {
  tagColor: string;
  textColor: string;
  attributeKeyColor: string;
  attributeValueColor: string;
  separatorColor: string;
  commentColor: string;
  cdataColor: string;
  overflowBreak: boolean;
};

export type XMLViewerProps = HTMLAttributes<HTMLDivElement> & {
  xml: string;
  parserOptions?: ParserOptions;
  invalidXMLRenderer?: (error: Error) => JSX.Element;
  indentSize?: number;
  collapsible?: boolean;
  theme?: Partial<Theme>;
};
