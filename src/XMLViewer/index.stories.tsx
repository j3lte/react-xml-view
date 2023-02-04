import React from "react";
import { Story } from "@storybook/react";
import XMLViewer from ".";

import type { XMLViewerProps } from "./index.types";

import xmlOrders from "../../test-files/orders.xml";
import xmlIBM from "../../test-files/ibm_oasis_valid.xml";
import { ParserOptions } from "@rgrove/parse-xml";

export default {
  title: "XMLViewer",
};

const XMLViewerStory: Story<XMLViewerProps> = (args) => <XMLViewer {...args} />;
const createStory = (args: XMLViewerProps) => {
  const story = XMLViewerStory.bind({});
  story.args = args;
  return story;
};
const defaultParserOptions: ParserOptions = {
  preserveComments: true,
  preserveCdata: true,
};

export const Example1 = createStory({
  className: "example",
  classNames: {
    elementChildren: "elements",
  },
  xml: `<?xml version="1.0" encoding="UTF-8"?><note><!-- This is a comment --><description>An example of escaped CENDs</description><!-- This text contains a CEND ]]> --><!-- In this first case we put the ]] at the end of the first CDATA block and the > in the second CDATA block --><data><![CDATA[This text contains a CEND ]]]]><![CDATA[>]]></data><!-- In this second case we put a ] at the end of the first CDATA block and the ]> in the second CDATA block --><alternative><![CDATA[This text contains a CEND ]]]><![CDATA[]>]]></alternative></note>`,
  collapsible: true,
  parserOptions: defaultParserOptions,
});

export const Example2 = createStory({
  xml: `<?xml version="1.0"?><colors><color name="red"><r>255</r><g>0</g><b>0</b></color><color name="green"><r>0</r><g>255</g><b>0</b></color><color name="blue"><r>0</r><g>0</g><b>255</b></color></colors>`,
  collapsible: true,
  parserOptions: defaultParserOptions,
  className: "xml-viewer",
});

export const Example3 = createStory({
  xml: xmlIBM,
  collapsible: true,
  parserOptions: defaultParserOptions,
});

export const Example4 = createStory({
  xml: xmlOrders,
  collapsible: true,
  parserOptions: defaultParserOptions,
});
