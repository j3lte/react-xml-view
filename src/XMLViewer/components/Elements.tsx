import React, { memo, useState, MouseEventHandler } from "react";
import {
  XmlCdata,
  XmlComment,
  XmlElement,
  XmlProcessingInstruction,
  XmlText,
  XmlNode,
} from "@rgrove/parse-xml";
import { TextElement } from "./TextElement";
import { CommentElement } from "./CommentElement";
import { CDataElement } from "./CDataElement";
import { InstructionElement } from "./InstructionElement";
import { useXMLViewerContext } from "../context/index";
import { Attributes } from "./Attributes";

interface ElementProps {
  element: XmlElement;
  indentation: string;
}

const getIndentationString = (size: number) => new Array(size + 1).join(" ");

const isTextElement = (
  elements: Array<
    XmlElement | XmlText | XmlCdata | XmlComment | XmlProcessingInstruction
  >
) => {
  return elements.length === 1 && elements[0].type === XmlNode.TYPE_TEXT;
};

const onSelectText: MouseEventHandler<HTMLSpanElement> = (e) => {
  e.stopPropagation();
};

const Element = ({ element, indentation }: ElementProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const { theme, indentSize, collapsible } = useXMLViewerContext();
  const { name, attributes, children: elements } = element;

  const cursor = collapsible && elements ? "pointer" : "text";
  const isTextCollapse = isTextElement(elements) || collapsed;

  console.log(isTextCollapse);

  return (
    <div
      style={{ whiteSpace: "pre", cursor }}
      onClick={(event) => {
        if (!element.children || !collapsible) {
          return;
        }
        event.stopPropagation();
        event.preventDefault();

        if (window.getSelection().toString() === "") {
          setCollapsed(!collapsed);
        }
      }}
    >
      <span style={{ color: theme.separatorColor }}>{`${indentation}<`}</span>
      <span style={{ color: theme.tagColor }}>{name}</span>
      {!collapsed && <Attributes attributes={attributes} />}
      <span style={{ color: theme.separatorColor }}>
        {elements ? ">" : "/>"}
      </span>
      {elements && !collapsed && (
        <span onClick={onSelectText}>
          <Elements
            elements={elements}
            indentation={indentation + getIndentationString(indentSize)}
          />
        </span>
      )}
      {elements && (
        <span style={{ color: theme.separatorColor }}>{`${
          isTextElement(elements) || collapsed ? "" : indentation
        }</`}</span>
      )}
      {elements && <span style={{ color: theme.tagColor }}>{name}</span>}
      {elements && <span style={{ color: theme.separatorColor }}>{">"}</span>}
    </div>
  );
};

Element.displayName = "Element";

interface ElementsProps {
  elements: Array<
    XmlElement | XmlText | XmlCdata | XmlComment | XmlProcessingInstruction
  >;
  indentation: string;
}

export const Elements = memo(({ elements, indentation }: ElementsProps) => {
  return (
    <>
      {elements.map((el, index) => {
        const key = `el-${index}`;
        if (el instanceof XmlText && el.type === XmlNode.TYPE_TEXT) {
          return <TextElement key={key} element={el} />;
        } else if (
          el instanceof XmlElement &&
          el.type === XmlNode.TYPE_ELEMENT
        ) {
          return <Element key={key} element={el} indentation={indentation} />;
        } else if (
          el instanceof XmlComment &&
          el.type === XmlNode.TYPE_COMMENT
        ) {
          return (
            <CommentElement key={key} element={el} indentation={indentation} />
          );
        } else if (el instanceof XmlCdata && el.type === XmlNode.TYPE_CDATA) {
          return (
            <CDataElement key={key} element={el} indentation={indentation} />
          );
        } else if (
          el instanceof XmlProcessingInstruction &&
          el.type === XmlNode.TYPE_PROCESSING_INSTRUCTION
        ) {
          return (
            <InstructionElement
              key={key}
              element={el}
              indentation={indentation}
            />
          );
        }
        return null;
      })}
    </>
  );
});

Elements.displayName = "Elements";
