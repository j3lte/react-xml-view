import { defaultXMLViewerContext, noTheme } from "../context";
import { Theme } from "../index.types";

export const getCollapseDepth = (depth: boolean | number): number => {
  if (typeof depth === "boolean") {
    return depth ? 0 : -1;
  }
  const depthNumber = Number(depth);
  if (Number.isNaN(depthNumber)) {
    return -1;
  }
  if (Math.floor(depthNumber) < -1) {
    return -1;
  }
  return Math.floor(depthNumber);
};

export const getTheme = (optsTheme?: boolean | Partial<Theme>): Theme => {
  if (typeof optsTheme === "undefined") {
    return defaultXMLViewerContext.theme;
  }
  if (typeof optsTheme === "boolean") {
    return optsTheme ? defaultXMLViewerContext.theme : noTheme;
  }
  return {
    ...defaultXMLViewerContext.theme,
    ...optsTheme,
  };
};
