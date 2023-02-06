import React, { memo } from "react";

import type { XmlCdata } from "@rgrove/parse-xml";
import clsx from "clsx";

import { useStyles, useXMLViewerContext } from "../context/XMLViewerContext";

interface CDataElementProps {
  element: XmlCdata;
  indentation: string;
}

const CDataElement = memo<(props: CDataElementProps) => JSX.Element>(
  ({ element, indentation }: CDataElementProps) => {
    const { classNames } = useXMLViewerContext();
    const { cdataColor } = useStyles();

    return (
      <div className={clsx(classNames.cdata)} style={cdataColor}>
        {`${indentation}<![CDATA[${element.text}]]>`}
      </div>
    );
  },
);

CDataElement.displayName = "CDataElement";

export default CDataElement;
