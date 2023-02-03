import { createContext, useContext } from "react";
import type { Theme } from "../index.types";

export type XMLViewerContextType = {
  theme: Theme;
  indentSize: number;
  collapsible: boolean;
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
  indentSize: 2,
  collapsible: true,
};

export const XMLViewerContext = createContext<XMLViewerContextType>(null);
export const useXMLViewerContext = () => useContext(XMLViewerContext);
