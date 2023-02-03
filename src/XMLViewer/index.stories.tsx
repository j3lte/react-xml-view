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
