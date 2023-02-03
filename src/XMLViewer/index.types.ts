import { HTMLAttributes } from "react";
import { ParserOptions } from "@rgrove/parse-xml";

export type Theme = {
  /** set the attribute key color (`<tag attribute-key="hello" />`) */
  attributeKeyColor: string;
  /** set the attribute value color (`<tag attr="Attribute value">`) */
  attributeValueColor: string;
  /** set the cdata element color (`<![CDATA[some stuff]]>`) */
  cdataColor: string;
  /** set the comment color (`<!-- this is a comment -->`) */
  commentColor: string;
  /** adjust the xml to fit in the parent width without overflowing */
  overflowBreak: boolean;
  /** set the separators colors (`<`, `>`, `</`, `/>`, `=`, `<?`, `?>`) */
  separatorColor: string;
  /** set the tag name color (`<tag-name />`) */
  tagColor: string;
  /** set the text color (`<tag>Text</tag>`) */
  textColor: string;
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
   * The options to pass to the XML parser.
   *
   * *See the [parse-xml](https://rgrove.github.io/parse-xml/types/ParserOptions.html) documentation for more information.*
   *
   * @optional
   */
  parserOptions?: ParserOptions;
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
   * The number of spaces to use for indentation.
   *
   * @default 2
   * @optional
   */
  indentSize?: number;
  /**
   * Whether the tree can be collapsed.
   *
   * @default false
   * @optional
   */
  collapsible?: boolean;
  /**
   * The theme to use.
   *
   * @optional
   */
  theme?: Partial<Theme>;
};
