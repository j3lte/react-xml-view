import { Story } from "@storybook/react";
import React from "react";
import XMLViewer from ".";
import { XMLViewerProps } from "./index.types";

export default {
  title: "XMLViewer",
};

const XMLViewerStory: Story<XMLViewerProps> = (args) => <XMLViewer {...args} />;

export const Example = XMLViewerStory.bind({});
Example.args = {
  xml: `<?xml version="1.0" encoding="UTF-8"?><note><!-- This is a comment --><description>An example of escaped CENDs</description><!-- This text contains a CEND ]]> --><!-- In this first case we put the ]] at the end of the first CDATA block and the > in the second CDATA block --><data><![CDATA[This text contains a CEND ]]]]><![CDATA[>]]></data><!-- In this second case we put a ] at the end of the first CDATA block and the ]> in the second CDATA block --><alternative><![CDATA[This text contains a CEND ]]]><![CDATA[]>]]></alternative></note>`,
  collapsible: true,
  parserOptions: {
    preserveComments: true,
    preserveCdata: true,
  },
};

export const ColorExample = XMLViewerStory.bind({});
ColorExample.args = {
  xml: `<?xml version="1.0"?><colors><color name="red"><r>255</r><g>0</g><b>0</b></color><color name="green"><r>0</r><g>255</g><b>0</b></color><color name="blue"><r>0</r><g>0</g><b>255</b></color></colors>`,
  collapsible: true,
  parserOptions: {
    preserveComments: true,
    preserveCdata: true,
  },
};
