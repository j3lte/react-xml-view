import React, { memo, useState } from "react";

import type { XmlElement } from "@rgrove/parse-xml";
import clsx from "clsx";

import { useStyles, useXMLViewerContext } from "../context/index";
import { getIndentationString, isTextElement } from "../util";

import Attributes from "./Attributes";
import Elements from "./Elements";

interface ElementProps {
  element: XmlElement;
  indentation: string;
  depth: number;
}

const Element = memo(({ element, indentation, depth }: ElementProps) => {
  const { classNames, indentSize, collapsible, collapseDepth, onClickElement } =
    useXMLViewerContext();
  const [collapsed, setCollapsed] = useState(
    collapseDepth === -1 ? false : depth >= collapseDepth,
  );

  const { separatorColor, tagColor } = useStyles();

  const hasChildren = element.children && element.children.length > 0;
  const cursor = collapsible ? "pointer" : "text";

  return (
    <div
      className={clsx(classNames.element, `depth-${depth}`, {
        collapsed,
      })}
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
            depth={depth + 1}
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

export default Element;
