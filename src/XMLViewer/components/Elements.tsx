import React, { memo, useState, useMemo } from "react";
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

const getIndentationString = (size: number) => new Array(size + 1).join(" ");

const isTextElement = (
  elements: Array<
    XmlElement | XmlText | XmlCdata | XmlComment | XmlProcessingInstruction
  >
) => {
  return elements.length === 1 && elements[0].type === XmlNode.TYPE_TEXT;
};

interface ElementProps {
  element: XmlElement;
  indentation: string;
}

const Element = memo(({ element, indentation }: ElementProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const { theme, classNames, indentSize, collapsible, onClickElement } =
    useXMLViewerContext();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const hasChildren = element.children && element.children.length > 0;
  const cursor = collapsible ? "pointer" : "text";

  return (
    <div
      className={clsx(classNames.element)}
      style={{ whiteSpace: "pre", cursor }}
      onClick={(event) => {
        event.stopPropagation();
        event.preventDefault();

        if (onClickElement) {
          onClickElement(element);
        }
        if (!element.children || !collapsible) {
          return;
        }

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
        {element.name}
      </span>
      {!collapsed && <Attributes attributes={element.attributes} />}
      <span
        className={clsx(classNames.separator)}
        style={styles.separatorColor}
      >
        {hasChildren ? ">" : "/>"}
      </span>
      {hasChildren && !collapsed && (
        <span
          className={clsx(classNames.elementChildren)}
          onClick={(e) => {
            if (onClickElement) {
              onClickElement(element);
            }
            e.stopPropagation();
          }}
        >
          <Elements
            elements={element.children}
            indentation={indentation + getIndentationString(indentSize)}
          />
        </span>
      )}
      {hasChildren && (
        <span
          className={clsx(classNames.separator)}
          style={styles.separatorColor}
        >{`${
          isTextElement(element.children) || collapsed ? "" : indentation
        }</`}</span>
      )}
      {hasChildren && (
        <span className={clsx(classNames.tag)} style={styles.tagColor}>
          {element.name}
        </span>
      )}
      {hasChildren && (
        <span
          className={clsx(classNames.separator)}
          style={styles.separatorColor}
        >
          {">"}
        </span>
      )}
    </div>
  );
});

Element.displayName = "Element";

interface ElementsProps {
  elements: Array<
    XmlElement | XmlText | XmlCdata | XmlComment | XmlProcessingInstruction
  >;
  indentation: string;
}

export const Elements = memo<(props: ElementsProps) => JSX.Element>(
  ({ elements, indentation }: ElementsProps) => {
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
              <CommentElement
                key={key}
                element={el}
                indentation={indentation}
              />
            );
          } else if (el instanceof XmlCdata && el.type === XmlNode.TYPE_CDATA) {
            return (
              <CDataElement key={key} element={el} indentation={indentation} />
            );
          }
          return (
            <InstructionElement
              key={key}
              element={el as XmlProcessingInstruction}
              indentation={indentation}
            />
          );
        })}
      </>
    );
  }
);

Elements.displayName = "Elements";
