import type { HTMLAttributes } from "react";

import type { ParserOptions, XmlElement } from "@rgrove/parse-xml";

export type Theme = {
  /** set/unset the attribute key color (`<tag attribute-key="hello" />`) */
  attributeKeyColor: string | boolean;
  /** set/unset the attribute value color (`<tag attr="Attribute value">`) */
  attributeValueColor: string | boolean;
  /** set/unset the cdata element color (`<![CDATA[some stuff]]>`) */
  cdataColor: string | boolean;
  /** set/unset the comment color (`<!-- this is a comment -->`) */
  commentColor: string | boolean;
  /** adjust the xml to fit in the parent width without overflowing */
  overflowBreak: boolean;
  /** set/unset the separators colors (`<`, `>`, `</`, `/>`, `=`, `<?`, `?>`) */
  separatorColor: string | boolean;
  /** set/unset the tag name color (`<tag-name />`) */
  tagColor: string | boolean;
  /** set/unset the text color (`<tag>Text</tag>`) */
  textColor: string | boolean;
};

export type ClassNames = {
  attributeList?: string;
  attribute?: string;
  attributeKey?: string;
  attributeValue?: string;
  separator?: string;
  cdata?: string;
  comment?: string;
  tag?: string;
  text?: string;
  instruction?: string;
  element?: string;
  elementChildren?: string;
};

export type XMLViewerProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * The XML to display.
   *
   * *The XML must be valid and not empty. It should have a single root element and have `UTF-8` character encoding.*
   *
   * @required
   * @example `<root><child /></root>`
   */
  xml: string;

  /**
   * The class names to use.
   * @optional
   */
  classNames?: ClassNames;

  /**
   * Clean empty text nodes
   *
   * *Attempts to remove empty text nodes from the XML tree. It will also trim any text in text nodes*
   *
   * @default false
   * @optional
   */
  cleanEmptyTextNodes?: boolean;

  /**
   * Whether the tree should be collapsed at start.
   *
   * This can be set to `true` to collapse the tree at start or to a number to collapse the tree at start to a specific depth. Note that the root element is at depth 0.
   *
   * @default false
   */
  collapsed?: boolean | number;

  /**
   * Whether the tree can be collapsed.
   *
   * @default false
   * @optional
   */
  collapsible?: boolean;

  /**
   * The number of spaces to use for indentation.
   *
   * @default 2
   * @optional
   */
  indentSize?: number;

  /**
   * Whether to use tabs for indentation.
   *
   * @default false
   * @optional
   */
  indentUseTabs?: boolean;

  /**
   * The component to render when the XML is invalid.
   *
   * *The component will receive the error thrown by the XML parser.*
   *
   * @optional
   * @example ```ts
   *  ({ error }) => (<div>{error.message}</div>)
   * ```
   */
  invalidXMLRenderer?: (error: Error) => JSX.Element;

  /**
   * On Click XML Element Handler
   *
   * @optional
   */
  onClickElement?: (element: XmlElement) => void;

  /**
   * The options to pass to the XML parser.
   *
   * *See the [parse-xml](https://rgrove.github.io/parse-xml/types/ParserOptions.html) documentation for more information.*
   *
   * @optional
   */
  parserOptions?: ParserOptions;

  /**
   * The theme to use. This can be a partial theme or set to `false` to completely disable the theme.
   *
   * @optional
   */
  theme?: Partial<Theme> | boolean;
};
