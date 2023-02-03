import React, { memo } from "react";
import type { XmlCdata } from "@rgrove/parse-xml";

import { useXMLViewerContext } from "../context/index";

interface CDataElementProps {
  element: XmlCdata;
  indentation: string;
}

export const CDataElement = memo(
  ({ element, indentation }: CDataElementProps) => {
    const { theme } = useXMLViewerContext();
    return (
      <div style={{ color: theme.cdataColor }}>
        {`${indentation}<![CDATA[${element.text}]]>`}
      </div>
    );
  }
);

CDataElement.displayName = "CDataElement";
