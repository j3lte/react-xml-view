import React, { memo } from "react";
import clsx from "clsx";
import type { XmlProcessingInstruction } from "@rgrove/parse-xml";

import { useStyles, useXMLViewerContext } from "../context/index";

interface InstructionElementProps {
  element: XmlProcessingInstruction;
  indentation: string;
}

export const InstructionElement = memo<
  (props: InstructionElementProps) => JSX.Element
>(({ element, indentation }: InstructionElementProps) => {
  const { classNames } = useXMLViewerContext();
  const { separatorColor, tagColor, attributeKeyColor } = useStyles();

  return (
    <div className={clsx(classNames.instruction)}>
      <span
        className={clsx(classNames.separator)}
        style={separatorColor}
      >{`${indentation}<?`}</span>
      <span className={clsx(classNames.tag)} style={tagColor}>
        {element.name}
      </span>
      <span
        className={clsx(classNames.attributeKey)}
        style={attributeKeyColor}
      >{` ${element.content}`}</span>
      <span
        className={clsx(classNames.separator)}
        style={separatorColor}
      >{`?>`}</span>
    </div>
  );
});

InstructionElement.displayName = "InstructionElement";
