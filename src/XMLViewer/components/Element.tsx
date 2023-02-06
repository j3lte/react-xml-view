import React, { memo } from "react";

import type { XmlElement } from "@rgrove/parse-xml";
import clsx from "clsx";

import { useStateContext } from "../context/StateContext";
import { useStyles, useXMLViewerContext } from "../context/XMLViewerContext";
import { getIndentationString, isTextElement } from "../util";

import Attributes from "./Attributes";
import Elements from "./Elements";

interface ElementProps {
  element: XmlElement;
  indentation: string;
  elementKey: string;
  depth: number;
}

const Element = memo(
  ({ element, indentation, depth, elementKey }: ElementProps) => {
    const {
      classNames,
      indentSize,
      indentUseTabs,
      collapsible,
      collapseDepth,
      onClickElement,
    } = useXMLViewerContext();
    const { stateMap, setMap } = useStateContext();
    const hasCollapsed = stateMap.get(elementKey);
    const collapsed =
      hasCollapsed !== undefined
        ? hasCollapsed
        : collapseDepth === -1
        ? false
        : depth >= collapseDepth;

    const toggleCollapsed = (state: boolean) => {
      setMap(elementKey, state);
    };

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
            toggleCollapsed(!collapsed);
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
              indentation={
                indentation + getIndentationString(indentSize, indentUseTabs)
              }
              depth={depth + 1}
              prefix={elementKey}
            />
          </span>
        )}
        {hasChildren && (
          <span
            className={clsx(classNames.separator)}
            style={separatorColor}
          >{`${
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
  },
);

Element.displayName = "Element";

export default Element;
