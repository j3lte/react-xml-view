import React, { memo } from "react";
import clsx from "clsx";
import type { XmlCdata } from "@rgrove/parse-xml";

import { useStyles, useXMLViewerContext } from "../context/index";

interface CDataElementProps {
  element: XmlCdata;
  indentation: string;
}

export const CDataElement = memo<(props: CDataElementProps) => JSX.Element>(
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
