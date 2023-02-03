import React, { memo, useMemo } from "react";
import clsx from "clsx";
import type { XmlCdata } from "@rgrove/parse-xml";

import { useXMLViewerContext } from "../context/index";
import { getStyles } from "../styles";

interface CDataElementProps {
  element: XmlCdata;
  indentation: string;
}

export const CDataElement = memo<(props: CDataElementProps) => JSX.Element>(
  ({ element, indentation }: CDataElementProps) => {
    const { theme, classNames } = useXMLViewerContext();
    const { cdataColor } = useMemo(() => getStyles(theme), [theme]);

    return (
      <div className={clsx(classNames.cdata)} style={cdataColor}>
        {`${indentation}<![CDATA[${element.text}]]>`}
      </div>
    );
  }
);

CDataElement.displayName = "CDataElement";
