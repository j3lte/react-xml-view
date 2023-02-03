import React, { memo, useMemo } from "react";
import clsx from "clsx";
import type { XmlProcessingInstruction } from "@rgrove/parse-xml";

import { useXMLViewerContext } from "../context/index";
import { getStyles } from "../styles";

interface InstructionElementProps {
  element: XmlProcessingInstruction;
  indentation: string;
}

export const InstructionElement = memo<
  (props: InstructionElementProps) => JSX.Element
>(({ element, indentation }: InstructionElementProps) => {
  const { theme, classNames } = useXMLViewerContext();
  const styles = useMemo(() => getStyles(theme), [theme]);
  return (
    <div className={clsx(classNames.instruction)}>
      <span
        className={clsx(classNames.separator)}
        style={styles.separatorColor}
      >{`${indentation}<?`}</span>
      <span className={clsx(classNames.tag)} style={styles.tagColor}>
        {element.name}
      </span>
      <span
        className={clsx(classNames.attributeKey)}
        style={styles.attributeKeyColor}
      >{` ${element.content}`}</span>
      <span
        className={clsx(classNames.separator)}
        style={styles.separatorColor}
      >{`?>`}</span>
    </div>
  );
});

InstructionElement.displayName = "InstructionElement";
