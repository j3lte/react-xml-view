import React, { memo } from "react";
import type { XmlProcessingInstruction } from "@rgrove/parse-xml";

import { useXMLViewerContext } from "../context/index";

interface InstructionElementProps {
  element: XmlProcessingInstruction;
  indentation: string;
}

export const InstructionElement = memo(
  ({ element, indentation }: InstructionElementProps) => {
    const { theme } = useXMLViewerContext();
    return (
      <div>
        <span
          style={{ color: theme.separatorColor }}
        >{`${indentation}<?`}</span>
        <span style={{ color: theme.tagColor }}>{element.name}</span>
        <span
          style={{ color: theme.attributeKeyColor }}
        >{` ${element.content}`}</span>
        <span style={{ color: theme.separatorColor }}>{`?>`}</span>
      </div>
    );
  }
);

InstructionElement.displayName = "InstructionElement";
