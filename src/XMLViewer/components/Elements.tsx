import React, { memo } from "react";
import type {
  XmlCdata,
  XmlComment,
  XmlElement,
  XmlProcessingInstruction,
  XmlText,
} from "@rgrove/parse-xml";
import { XmlNode } from "@rgrove/parse-xml";

import { Element } from "./Element";
import { TextElement } from "./TextElement";
import { CommentElement } from "./CommentElement";
import { CDataElement } from "./CDataElement";
import { InstructionElement } from "./InstructionElement";
import { useXMLViewerContext } from "../context";

interface ElementsProps {
  elements: Array<
    XmlElement | XmlText | XmlCdata | XmlComment | XmlProcessingInstruction
  >;
  indentation: string;
}

export const Elements = memo<(props: ElementsProps) => JSX.Element>(
  ({ elements, indentation }: ElementsProps) => {
    const { cleanEmptyTextNodes } = useXMLViewerContext();
    return (
      <>
        {elements.map((el, index) => {
          const key = `el-${index}`;
          switch (el.type) {
            case XmlNode.TYPE_TEXT: {
              if (cleanEmptyTextNodes) {
                const textLength = (el as XmlText).text.trim().length;
                if (textLength === 0) {
                  return null;
                }
              }
              return <TextElement key={key} element={el as XmlText} />;
            }
            case XmlNode.TYPE_ELEMENT:
              return (
                <Element
                  key={key}
                  element={el as XmlElement}
                  indentation={indentation}
                />
              );
            case XmlNode.TYPE_COMMENT:
              return (
                <CommentElement
                  key={key}
                  element={el as XmlComment}
                  indentation={indentation}
                />
              );
            case XmlNode.TYPE_CDATA:
              return (
                <CDataElement
                  key={key}
                  element={el as XmlCdata}
                  indentation={indentation}
                />
              );
            default:
              return (
                <InstructionElement
                  key={key}
                  element={el as XmlProcessingInstruction}
                  indentation={indentation}
                />
              );
          }
        })}
      </>
    );
  }
);

Elements.displayName = "Elements";
