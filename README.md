# react-xml-view

[![npm](https://img.shields.io/npm/v/@j3lte/react-xml-view?label=NPM&logo=npm&style=flat-square)](https://www.npmjs.com/package/@j3lte/react-xml-view)
[![License](https://img.shields.io/github/license/j3lte/react-xml-view?color=%2344cc10&label=License&logo=github&style=flat-square)](https://github.com/j3lte/react-xml-view/blob/main/LICENSE)
[![GitHub Bugs](https://img.shields.io/github/issues-search/j3lte/react-xml-view?label=Bugs&logo=github&query=is%3Aopen%20label%3Abug&style=flat-square)](https://github.com/j3lte/react-xml-view/issues)
[![GitHub issues](https://img.shields.io/github/issues/j3lte/react-xml-view?label=Issues&style=flat-square)](https://github.com/j3lte/react-xml-view/issues)
[![GitHub last commit](https://img.shields.io/github/last-commit/j3lte/react-xml-view?label=Last%20Commit&logo=github&style=flat-square)](https://github.com/j3lte/react-xml-view/commits/main)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/j3lte/react-xml-view/ci.yml?label=Build%20status&logo=github&style=flat-square)](https://github.com/j3lte/react-xml-view/actions/workflows/ci.yml)
[![Codecov](https://img.shields.io/codecov/c/github/j3lte/react-xml-view?label=Code%20Coverage&logo=codecov&style=flat-square&token=JZUQJXMB4C)](https://codecov.io/gh/j3lte/react-xml-view)
![npm type definitions](https://img.shields.io/npm/types/@j3lte/react-xml-view?style=flat-square)
[![Bundlephobia](https://img.shields.io/bundlephobia/min/@j3lte/react-xml-view?label=Size&style=flat-square)](https://bundlephobia.com/package/@j3lte/react-xml-view@latest)
[![DeepScan grade](https://flat.badgen.net/deepscan/grade/team/20288/project/23754/branch/724841?icon=deepscan&label=Deepscan)](https://deepscan.io/dashboard#view=project&tid=20288&pid=23754&bid=724841)

A simple React component to display XML in a tree view.

![xml-viewer](https://user-images.githubusercontent.com/2557568/216987041-83b808f3-1b1b-4b1b-8e02-0499012b5453.png)

## Codesandbox Demo

[![Edit react-xml-view](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/j3lte-react-xml-view-7zq0uo)
## Install

```bash
npm install --save @j3lte/react-xml-view
```

## Usage

```tsx
import React from 'react';
import { XmlView } from '@j3lte/react-xml-view';

const xml = '<hello>World</hello>'

export const App = () => {
  return (
	<XmlView xml={xml} />
  );
}
```

> Note: The viewer will **NOT** show the XML declaration (example: `<?xml version="1.0" encoding="UTF-8"?>`). This is due to a limitation in the XML parser.
>
> See [this explanation](https://rgrove.github.io/parse-xml/index.html#not-features)

## Props

| Name | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| **xml** | string | | **Yes** | The XML to display. XML should have `UTF-8` character encoding, other encodings are not supported |
| **classNames** | object | `undefined` | No | The class names to use. See below for more information |
| **cleanEmptyTextNodes** | boolean | `false` | No | Try to clean up empty text nodes. |
| **collapsed** | boolean/number | `false` | No | Whether the tree start as collapsed or not. If this is a number (`n > -1`), it will be the level to collapse to. Root starts at level `0` |
| **collapsible** | boolean | `false` | No | Whether the tree can be collapsed or not |
| **indentSize** | number | `2` | No | The number of spaces to indent each level |
| **indentUseTabs** | boolean | `false` | No | Use tabs instead of spaces for indentation |
| **invalidXMLRenderer** | Function | `undefined` | No | `(error: Error) => JSX.Element`. A function to render the error when the XML is invalid. |
| **onClickElement** | Function | `undefined` | No | `(element: XmlElement) => void`. A function to call when an element is clicked. The element is the  [`XmlElement`](https://rgrove.github.io/parse-xml/classes/XmlElement.html) that was clicked. |
| **parserOptions** | object | `undefined` | No | The options to pass to the parser. See [@rgrove/parse-xml API DOCS](https://rgrove.github.io/parse-xml/types/ParserOptions.html) |
| **theme** | object/boolean | `undefined` | No | The theme to use. When `undefined`, it uses the standard theme. If this is set to `false`, it completely disables the theme. See below for more information |

### Theme

The theme object can contain the following properties:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| attributeKeyColor | `string` / `boolean` | `"#2a7ab0"` | set the attribute key color (`<tag attribute-key="hello" />`) |
| attributeValueColor | `string` / `boolean` | `"#008000"` | set the attribute value color (` <tag attr="Attribute value">`) |
| cdataColor | `string` / `boolean` | `"#1D781D"` | set the cdata element color (`<![CDATA[some stuff]]>`) |
| commentColor | `string` / `boolean` | `"#aaa"` | set the comment color (`<!-- this is a comment -->`)
| separatorColor | `string` / `boolean` | `"#333"` | set the separators colors (`<, >, </, />, =, <?, ?>`)
| tagColor | `string` / `boolean` | `"#d43900"` | set the tag name color (`<tag-name />`) |
| textColor | `string` / `boolean` | `"#333"` | set the text color (`<tag>Text</tag>`) |
| overflowBreak | `boolean` | `false` | adjust the xml to fit in the parent width without overflowing |

> Note: for each color in the theme, you can set it to `false` to disable it. It will omit the style attribute for that color.

### Class names

The class names object can contain the following properties, feel free to override them.

| Name | Default |
| --- | --- |
| attributeList | `"xml-attribute-list"` |
| attribute | `"xml-attribute"` |
| attributeKey | `"xml-attribute-key"` |
| attributeValue | `"xml-attribute-value"` |
| cdata | `"xml-cdata"` |
| comment | `"xml-comment"` |
| element | `"xml-element"` |
| elementChildren | `"xml-element-children"` |
| instruction | `"xml-instruction"` |
| separator | `"xml-separator"` |
| tag | `"xml-tag"` |
| text | `"xml-text"` |

## Acknowledgement

This XML Viewer is based on `react-xml-viewer`, see the original [here](https://github.com/alissonmbr/react-xml-viewer).

## License

MIT © [Jelte Lagendijk](https://github.com/j3lte)
