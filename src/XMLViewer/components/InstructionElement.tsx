import React, { memo, useMemo } from "react";
import type { XmlProcessingInstruction } from "@rgrove/parse-xml";

import { useXMLViewerContext } from "../context/index";
import { getStyles } from "../styles";

interface InstructionElementProps {
  element: XmlProcessingInstruction;
  indentation: string;
}

export const InstructionElement = memo(
  ({ element, indentation }: InstructionElementProps) => {
    const { theme } = useXMLViewerContext();
    const styles = useMemo(() => getStyles(theme), [theme]);
    return (
      <div>
        <span style={styles.separatorColor}>{`${indentation}<?`}</span>
        <span style={styles.tagColor}>{element.name}</span>
        <span style={styles.attributeKeyColor}>{` ${element.content}`}</span>
        <span style={styles.separatorColor}>{`?>`}</span>
      </div>
    );
  }
);

InstructionElement.displayName = "InstructionElement";
