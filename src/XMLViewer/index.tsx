import React, { useMemo } from "react";

import { parseXml, XmlElement } from "@rgrove/parse-xml";
import { clsx } from "clsx";

import Elements from "./components/Elements";
import {
  defaultXMLViewerContext,
  XMLViewerContext,
  noTheme,
  defaultClassNames,
} from "./context";
import type { XMLViewerProps, Theme, ClassNames } from "./index.types";

const XMLViewer: (props: XMLViewerProps) => JSX.Element = ({
  xml,
  parserOptions,
  indentSize: optsIdentSize,
  theme: optsTheme,
  classNames: optsClassNames,
  collapsible: optsCollapsible,
  cleanEmptyTextNodes: optsCleanEmptyTextNodes,
  onClickElement,
  invalidXMLRenderer,
  className,
  ...props
}: XMLViewerProps) => {
  const [elements, error] = useMemo(() => {
    if (!xml) {
      return [[], new Error("No XML to parse")];
    }
    try {
      const xmlDocument = parseXml(xml, parserOptions);
      return [[xmlDocument.root], null];
    } catch (parseError) {
      return [[], parseError];
    }
  }, [xml, parserOptions]) as [Array<XmlElement>, Error | null];

  const indentSize = optsIdentSize || 2;
  const collapsible = optsCollapsible === undefined ? false : !!optsCollapsible;
  const cleanEmptyTextNodes =
    optsCleanEmptyTextNodes === undefined ? false : !!optsCleanEmptyTextNodes;

  const theme: Theme = useMemo(
    () =>
      typeof optsTheme === "undefined"
        ? defaultXMLViewerContext.theme
        : typeof optsTheme === "boolean"
        ? optsTheme
          ? defaultXMLViewerContext.theme
          : noTheme
        : {
            ...defaultXMLViewerContext.theme,
            ...optsTheme,
          },
    [optsTheme],
  );

  const classNames: ClassNames = useMemo(
    () => ({
      ...defaultClassNames,
      ...optsClassNames,
    }),
    [optsClassNames],
  );

  const context = useMemo(
    () => ({
      collapsible,
      indentSize,
      theme,
      classNames,
      onClickElement,
      cleanEmptyTextNodes,
    }),
    [
      collapsible,
      indentSize,
      theme,
      classNames,
      onClickElement,
      cleanEmptyTextNodes,
    ],
  );

  if (error !== null) {
    return invalidXMLRenderer ? (
      invalidXMLRenderer(error)
    ) : (
      <div {...props} className={clsx(className, "has-error")}>
        <pre>{error.message}</pre>
      </div>
    );
  }

  return (
    <XMLViewerContext.Provider value={context}>
      <div className={clsx(className)} {...props}>
        <Elements elements={elements} indentation="" depth={0} />
      </div>
    </XMLViewerContext.Provider>
  );
};

export default XMLViewer;
