import { createContext, useContext, useMemo } from "react";

import { XmlElement } from "@rgrove/parse-xml";

import type { Theme, ClassNames } from "../index.types";
import getStyles from "../styles/index";

export type XMLViewerContextType = {
  theme: Theme;
  classNames: ClassNames;
  indentSize: number;
  collapsible: boolean;
  collapseDepth: number;
  cleanEmptyTextNodes: boolean;
  onClickElement?: (element: XmlElement) => void;
};

export const noTheme: Theme = {
  tagColor: false,
  textColor: false,
  attributeKeyColor: false,
  attributeValueColor: false,
  separatorColor: false,
  commentColor: false,
  cdataColor: false,
  overflowBreak: false,
};

export const defaultClassNames: ClassNames = {
  attributeList: "xml-attribute-list",
  attribute: "xml-attribute",
  attributeKey: "xml-attribute-key",
  attributeValue: "xml-attribute-value",
  cdata: "xml-cdata",
  comment: "xml-comment",
  element: "xml-element",
  elementChildren: "xml-element-children",
  instruction: "xml-instruction",
  separator: "xml-separator",
  tag: "xml-tag",
  text: "xml-text",
};

export const defaultXMLViewerContext: XMLViewerContextType = {
  theme: {
    tagColor: "#d43900",
    textColor: "#333",
    attributeKeyColor: "#2a7ab0",
    attributeValueColor: "#008000",
    separatorColor: "#333",
    commentColor: "#aaa",
    cdataColor: "#1d781d",
    overflowBreak: false,
  },
  classNames: defaultClassNames,
  indentSize: 2,
  collapsible: true,
  collapseDepth: -1,
  cleanEmptyTextNodes: false,
};

export const XMLViewerContext = createContext<XMLViewerContextType>(null);
export const useXMLViewerContext = () => useContext(XMLViewerContext);
export const useStyles = () => {
  const { theme } = useXMLViewerContext();
  const styles = useMemo(() => getStyles(theme), [theme]);
  return styles;
};
