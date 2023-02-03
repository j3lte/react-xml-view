import React, { memo, useState, MouseEventHandler, useMemo } from "react";
import clsx from "clsx";
import {
  XmlCdata,
  XmlComment,
  XmlElement,
  XmlProcessingInstruction,
  XmlText,
  XmlNode,
} from "@rgrove/parse-xml";

import { useXMLViewerContext } from "../context/index";
import { getStyles } from "../styles";

import { TextElement } from "./TextElement";
import { CommentElement } from "./CommentElement";
import { CDataElement } from "./CDataElement";
import { InstructionElement } from "./InstructionElement";
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
  const { theme, classNames, indentSize, collapsible } = useXMLViewerContext();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const { name, attributes, children: elements } = element;

  const cursor = collapsible && elements ? "pointer" : "text";

  return (
    <div
      className={clsx(classNames.element)}
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
      <span
        className={clsx(classNames.separator)}
        style={styles.separatorColor}
      >{`${indentation}<`}</span>
      <span className={clsx(classNames.tag)} style={styles.tagColor}>
        {name}
      </span>
      {!collapsed && <Attributes attributes={attributes} />}
      <span
        className={clsx(classNames.separator)}
        style={styles.separatorColor}
      >
        {elements ? ">" : "/>"}
      </span>
      {elements && !collapsed && (
        <span
          className={clsx(classNames.elementChildren)}
          onClick={onSelectText}
        >
          <Elements
            elements={elements}
            indentation={indentation + getIndentationString(indentSize)}
          />
        </span>
      )}
      {elements && (
        <span
          className={clsx(classNames.separator)}
          style={styles.separatorColor}
        >{`${isTextElement(elements) || collapsed ? "" : indentation}</`}</span>
      )}
      {elements && (
        <span className={clsx(classNames.tag)} style={styles.tagColor}>
          {name}
        </span>
      )}
      {elements && (
        <span
          className={clsx(classNames.separator)}
          style={styles.separatorColor}
        >
          {">"}
        </span>
      )}
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
