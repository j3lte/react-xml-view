import React, { useMemo } from "react";
import { parseXml, XmlDocument } from "@rgrove/parse-xml";

import { XMLViewerProps, Theme } from "./index.types";
import { Elements } from "./components/Elements";
import { defaultXMLViewerContext, XMLViewerContext } from "./context/index";

const XMLViewer = ({
  xml,
  parserOptions,
  indentSize: optsIdentSize,
  theme: optsTheme,
  collapsible: optsCollapsible,
  invalidXMLRenderer,
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
                [key]: theme[key] ?? defaultXMLViewerContext.theme[key],
              };
            },
            {} as unknown as Theme
          )
        : defaultXMLViewerContext.theme,
    [optsTheme]
  );

  if (error !== null) {
    return invalidXMLRenderer ? (
      invalidXMLRenderer(error)
    ) : (
      <div {...props}>
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
      }}
    >
      <div {...props}>
        <Elements elements={[xmlDocument.root]} indentation="" />
      </div>
    </XMLViewerContext.Provider>
  );
};

export default XMLViewer;
