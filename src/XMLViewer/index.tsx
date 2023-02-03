import React, { useMemo } from "react";
import { parseXml, XmlDocument } from "@rgrove/parse-xml";
import { clsx } from "clsx";

import type { XMLViewerProps, Theme, ClassNames } from "./index.types";

import {
  defaultXMLViewerContext,
  XMLViewerContext,
  noTheme,
  defaultClassNames,
} from "./context";
import { Elements } from "./components/Elements";

const XMLViewer: (props: XMLViewerProps) => JSX.Element = ({
  xml,
  parserOptions,
  indentSize: optsIdentSize,
  theme: optsTheme,
  classNames: optsClassNames,
  collapsible: optsCollapsible,
  onClickElement,
  invalidXMLRenderer,
  className,
  ...props
}: XMLViewerProps) => {
  const [xmlDocument, error] = useMemo(() => {
    if (!xml) {
      return [null, new Error("No XML to parse")];
    }
    try {
      const xmlDocument = parseXml(xml, parserOptions);
      return [xmlDocument, null];
    } catch (error) {
      return [null, error];
    }
  }, [xml, parserOptions]) as [XmlDocument | null, Error | null];

  const indentSize = optsIdentSize || 2;
  const collapsible = optsCollapsible === undefined ? false : !!optsCollapsible;
  const theme: Theme = useMemo(
    () =>
      optsTheme
        ? Object.keys(defaultXMLViewerContext.theme).reduce<Theme>(
            (acc, key) => {
              return {
                ...acc,
                [key]: optsTheme[key] ?? defaultXMLViewerContext.theme[key],
              };
            },
            {} as unknown as Theme
          )
        : typeof optsTheme === "undefined"
        ? defaultXMLViewerContext.theme
        : noTheme,
    [optsTheme]
  );
  const classNames: ClassNames = useMemo(
    () =>
      optsClassNames
        ? Object.keys(defaultClassNames).reduce<ClassNames>((acc, key) => {
            return {
              ...acc,
              [key]: optsClassNames[key] ?? defaultClassNames[key],
            };
          }, {} as unknown as ClassNames)
        : defaultClassNames,
    [optsClassNames]
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
    <XMLViewerContext.Provider
      value={{
        collapsible,
        indentSize,
        theme,
        classNames,
        onClickElement,
      }}
    >
      <div className={clsx(className)} {...props}>
        <Elements elements={[xmlDocument.root]} indentation="" />
      </div>
    </XMLViewerContext.Provider>
  );
};

export default XMLViewer;
