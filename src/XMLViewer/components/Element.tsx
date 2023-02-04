import React, { memo, useState } from "react";
import clsx from "clsx";
import type {
  XmlElement,
  XmlCdata,
  XmlComment,
  XmlProcessingInstruction,
  XmlText,
} from "@rgrove/parse-xml";
import { XmlNode } from "@rgrove/parse-xml";
import { useStyles, useXMLViewerContext } from "../context/index";
import { Attributes } from "./Attributes";
import { Elements } from "./Elements";

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

export const Element = memo(({ element, indentation }: ElementProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const { classNames, indentSize, collapsible, onClickElement } =
    useXMLViewerContext();
  const { separatorColor, tagColor } = useStyles();

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
        style={separatorColor}
      >{`${indentation}<`}</span>
      <span className={clsx(classNames.tag)} style={tagColor}>
        {element.name}
      </span>
      {!collapsed && <Attributes attributes={element.attributes} />}
      <span className={clsx(classNames.separator)} style={separatorColor}>
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
        <span className={clsx(classNames.separator)} style={separatorColor}>{`${
          isTextElement(element.children) || collapsed ? "" : indentation
        }</`}</span>
      )}
      {hasChildren && (
        <span className={clsx(classNames.tag)} style={tagColor}>
          {element.name}
        </span>
      )}
      {hasChildren && (
        <span className={clsx(classNames.separator)} style={separatorColor}>
          {">"}
        </span>
      )}
    </div>
  );
});

Element.displayName = "Element";
