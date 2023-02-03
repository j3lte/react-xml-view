import React, { memo, useMemo } from "react";
import type { XmlCdata } from "@rgrove/parse-xml";

import { useXMLViewerContext } from "../context/index";
import { getStyles } from "../styles";

interface CDataElementProps {
  element: XmlCdata;
  indentation: string;
}

export const CDataElement = memo(
  ({ element, indentation }: CDataElementProps) => {
    const { theme } = useXMLViewerContext();
    const { cdataColor } = useMemo(() => getStyles(theme), [theme]);

    return (
      <div style={cdataColor}>
        {`${indentation}<![CDATA[${element.text}]]>`}
      </div>
    );
  }
);

CDataElement.displayName = "CDataElement";
