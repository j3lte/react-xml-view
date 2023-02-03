# react-xml-view

A simple React component to display XML in a tree view.

> This is a rewrite of `react-xml-viewer` in Typescript, with a different XML parsing library. The API is almost the same.
>
> See the original [here](https://github.com/alissonmbr/react-xml-viewer).

## Install

```bash
npm install --save react-xml-view
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

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| xml | string | | The XML to display |
| indent | number | 2 | The number of spaces to indent each level |
| collapsible | boolean | false | Whether to collapse the tree by default |
| parserOptions | object | | The options to pass to the parser. See [@rgrove/parse-xml API DOCS](https://rgrove.github.io/parse-xml/types/ParserOptions.html) |
| invalidXMLRenderer | Function | | `(error: Error) => JSX.Element`. A function to render the error when the XML is invalid. |
| theme | object | | The theme to use. See below for more information |

### Theme

The theme object can contain the following properties:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| attributeKeyColor | color | #2a7ab0 | set the attribute key color (`<tag attribute-key="hello" />`) |
| attributeValueColor | color | #008000 | set the attribute value color (` <tag attr="Attribute value">`) |
| cdataColor | color | #1D781D | set the cdata element color (`<![CDATA[some stuff]]>`) |
| commentColor | color | #aaa | set the comment color (`<!-- this is a comment -->`)
| separatorColor | color | #333 | set the separators colors (`<, >, </, />, =, <?, ?>`)
| tagColor | color | #d43900 | set the tag name color (`<tag-name />`) |
| textColor | color | #333 | set the text color (`<tag>Text</tag>`)|
| overflowBreak | bool | false | adjust the xml to fit in the parent width without overflowing|

## License

MIT © [Jelte Lagendijk](https://github.com/j3lte)
