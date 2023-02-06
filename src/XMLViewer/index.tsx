import React, { useMemo } from "react";

import { parseXml, XmlElement } from "@rgrove/parse-xml";
import { clsx } from "clsx";

import Elements from "./components/Elements";
import { StateProvider } from "./context/StateContext";
import {
  XMLViewerContext,
  defaultClassNames,
} from "./context/XMLViewerContext";
import type { XMLViewerProps, Theme, ClassNames } from "./index.types";
import { getCollapseDepth, getTheme } from "./util";

const XMLViewer: (props: XMLViewerProps) => JSX.Element = ({
  xml,
  parserOptions,
  indentSize: optsIndentSize,
  indentUseTabs: optsIndentUseTabs,
  theme: optsTheme,
  classNames: optsClassNames,
  collapsible: optsCollapsible,
  collapsed: optsCollapseDepth,
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

  const indentSize =
    optsIndentSize === undefined
      ? 2
      : Number.isNaN(optsIndentSize)
      ? 2
      : optsIndentSize;
  const indentUseTabs =
    optsIndentUseTabs === undefined ? false : !!optsIndentUseTabs;
  const collapsible = optsCollapsible === undefined ? false : !!optsCollapsible;
  const collapseDepth = useMemo(
    () => (collapsible ? getCollapseDepth(optsCollapseDepth) : -1),
    [collapsible, optsCollapseDepth],
  );
  const cleanEmptyTextNodes =
    optsCleanEmptyTextNodes === undefined ? false : !!optsCleanEmptyTextNodes;
  const theme: Theme = useMemo(() => getTheme(optsTheme), [optsTheme]);

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
      collapseDepth,
      indentSize,
      indentUseTabs,
      theme,
      classNames,
      onClickElement,
      cleanEmptyTextNodes,
    }),
    [
      collapsible,
      collapseDepth,
      indentSize,
      indentUseTabs,
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
      <StateProvider context={context} elements={elements}>
        <div className={clsx(className)} {...props}>
          <Elements elements={elements} indentation="" prefix="" depth={0} />
        </div>
      </StateProvider>
    </XMLViewerContext.Provider>
  );
};

export default XMLViewer;
