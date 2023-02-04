import React from "react";

import { render, fireEvent } from "@testing-library/react";

import XMLViewer from ".";

const cDataXML = `<?xml version="1.0" encoding="UTF-8"?><note><!-- This is a comment --><description>An example of escaped CENDs</description><!-- This text contains a CEND ]]> --><!-- In this first case we put the ]] at the end of the first CDATA block and the > in the second CDATA block --><data><![CDATA[This text contains a CEND ]]]]><![CDATA[>]]></data><!-- In this second case we put a ] at the end of the first CDATA block and the ]> in the second CDATA block --><alternative><![CDATA[This text contains a CEND ]]]><![CDATA[]>]]></alternative></note>`;

describe("Component Render & Error", () => {
  it(`shows xml`, () => {
    const { container } = render(
      <XMLViewer xml="<notes></notes>" className="xml-viewer" />,
    );
    const { firstChild: renderEl } = container;

    expect(renderEl).toHaveClass("xml-viewer");
    expect(container).toHaveTextContent(/notes/);
  });

  it(`shows error message`, () => {
    const { container } = render(<XMLViewer xml="<notes></notes" />);
    const { firstChild: renderEl } = container;

    expect(renderEl).toHaveClass("has-error");
    expect(container).toHaveTextContent(/Unclosed end tag for element notes/);
  });

  it(`shows error message when no XML is presented`, () => {
    // @ts-ignore
    const { container } = render(<XMLViewer />);
    const { firstChild: renderEl } = container;

    expect(renderEl).toHaveClass("has-error");
    expect(container).toHaveTextContent(/No XML to parse/);
  });

  it(`shows error message with separate renderer`, () => {
    const { container } = render(
      <XMLViewer
        xml="invalid xml"
        invalidXMLRenderer={(error) => <pre>{error.message}</pre>}
      />,
    );
    const { firstChild: renderEl } = container;

    expect(renderEl).not.toHaveClass("has-error");
    expect(renderEl).toBeInstanceOf(HTMLPreElement);
    expect(container).toHaveTextContent(/Root element is missing or invalid/);
  });
});

describe("Collapsible", () => {
  it(`don't collapse when clicking`, () => {
    const { container } = render(
      <XMLViewer xml="<notes><note></note></notes>" />,
    );
    fireEvent(
      container.firstChild?.firstChild as HTMLElement,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(container.firstChild as HTMLElement).toHaveTextContent(/<note\/>/);
  });

  it(`collapse when collapsible is set to 'true'`, () => {
    const { container } = render(
      <XMLViewer xml="<notes><note></note></notes>" collapsible />,
    );
    fireEvent(
      container.firstChild?.firstChild as HTMLElement,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(container.firstChild as HTMLElement).toHaveTextContent(
      "<notes></notes",
    );
  });
});

describe("Collapsible selection", () => {
  beforeEach(() => {
    // @ts-ignore
    window.getSelection = () => ({
      toString: () => "Selection",
    });
  });

  it(`don't collapse when clicking`, () => {
    const { container } = render(
      <XMLViewer xml="<notes><note></note></notes>" collapsible />,
    );
    fireEvent(
      container.firstChild?.firstChild as HTMLElement,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(container.firstChild as HTMLElement).toHaveTextContent(/<note\/>/);
  });
});

describe("CData", () => {
  it(`don't show CDATA when not set in parserOptions`, () => {
    const { container } = render(<XMLViewer xml={cDataXML} />);

    expect(container).not.toHaveTextContent(/CDATA/);
  });

  it(`shows CDATA with parserOptions`, () => {
    const { container } = render(
      <XMLViewer xml={cDataXML} parserOptions={{ preserveCdata: true }} />,
    );

    expect(container).toHaveTextContent(/CDATA/);
  });
});

describe("Comments", () => {
  it(`don't show comments when not set in parserOptions`, () => {
    const { container } = render(<XMLViewer xml={cDataXML} />);

    expect(container).not.toHaveTextContent(/This is a comment/);
  });

  it(`shows comments with parserOptions`, () => {
    const { container } = render(
      <XMLViewer xml={cDataXML} parserOptions={{ preserveComments: true }} />,
    );

    expect(container).toHaveTextContent(/This is a comment/);
  });
});

describe("Attributes", () => {
  it(`show attributes`, () => {
    const { container } = render(
      <XMLViewer xml="<notes><note id='1'></note></notes>" />,
    );

    expect(container).toHaveTextContent(/id="1"/);
  });

  it(`show attributes`, () => {
    const { container } = render(<XMLViewer xml="<notes id='1' />" />);

    expect(container).toHaveTextContent(/id="1"/);
  });
});

describe("Processing Instructions", () => {
  it(`shows processing instructions`, () => {
    const { container } = render(
      <XMLViewer xml='<root><?xml-stylesheet type="text/xsl" href="style.xsl"?></root>' />,
    );
    expect(container).toHaveTextContent(/xml-stylesheet/);
  });
});

describe("Theme", () => {
  it(`switch off theme`, () => {
    const { container } = render(
      <XMLViewer
        xml={cDataXML}
        parserOptions={{ preserveCdata: true, preserveComments: true }}
        theme={false}
      />,
    );
    expect(container.innerHTML).not.toMatch(/style="color:/);
    expect(container.innerHTML).not.toMatch(/overflow-wrap: break-word/);
  });

  it(`overflow break`, () => {
    const { container } = render(
      <XMLViewer
        xml={cDataXML}
        parserOptions={{ preserveCdata: true, preserveComments: true }}
        theme={{
          attributeKeyColor: false,
          attributeValueColor: false,
          commentColor: false,
          separatorColor: false,
          tagColor: false,
          textColor: false,
          overflowBreak: true,
        }}
      />,
    );
    expect(container.innerHTML).toMatch(/overflow-wrap: break-word/);
  });
});

describe("Classnames", () => {
  it(`uses different classNames`, () => {
    const { container } = render(
      <XMLViewer
        xml={cDataXML}
        parserOptions={{ preserveCdata: true, preserveComments: true }}
        classNames={{
          element: "custom-element",
        }}
      />,
    );
    expect(container.firstChild?.firstChild).toHaveClass("custom-element");
  });
});

describe("Click handler", () => {
  it(`calls click handler`, () => {
    const clickHandler = jest.fn();
    const normalClickHandler = jest.fn();

    const { container } = render(
      <XMLViewer
        xml={`<?xml version="1.0"?><colors><color name="red"><r>255</r><g>0</g><b>0</b></color><color name="green"><r>0</r><g>255</g><b>0</b></color><color name="blue"><r>0</r><g>0</g><b>255</b></color></colors>`}
        parserOptions={{ preserveCdata: true, preserveComments: true }}
        onClickElement={clickHandler}
        onClick={normalClickHandler}
      />,
    );

    fireEvent(
      container.querySelector("span.xml-element-children"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      }),
    );

    fireEvent(
      container.firstChild?.firstChild as HTMLElement,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(clickHandler).toHaveBeenCalled();
    expect(normalClickHandler).not.toHaveBeenCalled();
  });
});

describe("Clean empty text nodes", () => {
  it(`removes empty text nodes`, () => {
    const { container } = render(
      <XMLViewer
        xml={`<TESTCASES><test>
eee


</test><test2>

</test2></TESTCASES>`}
        parserOptions={{ preserveCdata: true, preserveComments: true }}
        cleanEmptyTextNodes
      />,
    );

    expect(container.querySelectorAll("span.xml-text").length).toBe(1);
  });
});
