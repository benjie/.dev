import { inspect } from "util";
const $$mdx = Symbol("mdx");

// Workaround for the `Array.isArray` can't resolve readonly arrays in TypeScript issue
declare global {
  interface ArrayConstructor {
    isArray<T = unknown>(arg: ReadonlyArray<T> | T): arg is ReadonlyArray<T>;
  }
}

interface MDXTrustedNode {
  [$$mdx]: "trusted";
  string: string;
}
interface MDXEscapeNode {
  [$$mdx]: "escape";
  rawString: string;
}
interface MDXSanitizeNode {
  [$$mdx]: "sanitize";
  rawString: string;
}
interface MDXURLNode {
  [$$mdx]: "url";
  href: string;
}
interface MDXLinkDescriptionNode {
  [$$mdx]: "linkDescription";
  rawString: string;
}
interface MDXTrimNode {
  [$$mdx]: "trim";
  inner: MDX;
}
interface MDXJoinNode {
  [$$mdx]: "join";
  nodes: ReadonlyArray<MDX>;
  separator: string;
}
interface MDXIndentNode {
  [$$mdx]: "indent";
  inner: MDX;
}

type MDXNode =
  | MDXTrustedNode
  | MDXEscapeNode
  | MDXSanitizeNode
  | MDXURLNode
  | MDXLinkDescriptionNode
  | MDXTrimNode
  | MDXJoinNode
  | MDXIndentNode;

function trusted(string: string): MDXTrustedNode {
  if (typeof string !== "string") {
    throw new Error(`Expected a string, instead found ${inspect(string)}`);
  }
  return {
    [$$mdx]: "trusted",
    string,
  };
}
function escape(rawString: string): MDXEscapeNode {
  if (typeof rawString !== "string") {
    throw new Error(`Expected a string, instead found ${inspect(rawString)}`);
  }
  return {
    [$$mdx]: "escape",
    rawString,
  };
}
function sanitize(rawString: string): MDXSanitizeNode {
  if (typeof rawString !== "string") {
    throw new Error(`Expected a string, instead found ${inspect(rawString)}`);
  }
  return {
    [$$mdx]: "sanitize",
    rawString,
  };
}
function url(href: string): MDXURLNode {
  if (typeof href !== "string") {
    throw new Error(`Expected a string, instead found ${inspect(href)}`);
  }
  return {
    [$$mdx]: "url",
    href,
  };
}
function linkDescription(rawString: string): MDXLinkDescriptionNode {
  if (typeof rawString !== "string") {
    throw new Error(`Expected a string, instead found ${inspect(rawString)}`);
  }
  return {
    [$$mdx]: "linkDescription",
    rawString,
  };
}

function trim(inner: MDX): MDXTrimNode {
  return {
    [$$mdx]: "trim",
    inner,
  };
}

function join(nodes: ReadonlyArray<MDX>, separator: string): MDXJoinNode {
  return {
    [$$mdx]: "join",
    nodes,
    separator,
  };
}

function indent(mdx: MDX): MDXIndentNode {
  return {
    [$$mdx]: "indent",
    inner: mdx,
  };
}
export type MDX = MDXNode | ReadonlyArray<MDXNode>;

function ensureTrusted<TNode extends MDXNode>(node: TNode): TNode {
  if (!node[$$mdx]) {
    throw new Error(`Expected an MDX node, instead found ${inspect(node)}`);
  }
  return node;
}

const mdxRaw = function mdx(
  strings: TemplateStringsArray,
  ...values: ReadonlyArray<MDX>
): MDX {
  if (strings.length === 1) {
    return trusted(strings[0]);
  }
  const nodes: MDXNode[] = [];
  for (let i = 0, l = strings.length * 2 - 1; i < l; i++) {
    if (i % 2 === 0) {
      const string = strings[i / 2];
      nodes.push(trusted(string));
    } else {
      const value = values[(i - 1) / 2];
      if (Array.isArray(value)) {
        for (const node of value) {
          nodes.push(ensureTrusted(node));
        }
      } else {
        nodes.push(ensureTrusted(value));
      }
    }
  }
  return nodes;
};

function compile(
  mdx: ReadonlyArray<MDXNode> | MDXNode,
  sourceName: string,
): string {
  try {
    const items = Array.isArray(mdx) ? mdx : [mdx];
    let string = "";
    for (const item of items) {
      switch (item[$$mdx]) {
        case "trusted": {
          string += item.string;
          break;
        }
        case "escape": {
          string += escapeMd(item.rawString);
          break;
        }
        case "sanitize": {
          string += sanitizeMarkdown(item.rawString);
          break;
        }
        case "url": {
          if (
            item.href.match(/^(https?:\/\/|\/|[a-zA-Z])/) &&
            item.href.match(/([-a-zA-Z0-9\/:._]|\(\))+/)
          ) {
            string += escapeMd(item.href);
          } else {
            throw new Error(`Disallowed URL: ${item.href}`);
          }
          break;
        }
        case "linkDescription": {
          string += escapeMd(item.rawString, ["(", ")"]);
          break;
        }
        case "trim": {
          string += compile(item.inner, sourceName).trim();
          break;
        }
        case "indent": {
          string += compile(item.inner, sourceName).replace(/\n/g, "\n  ");
          break;
        }
        case "join": {
          let first = true;
          for (const node of item.nodes) {
            if (first) {
              first = false;
            } else {
              string += item.separator;
            }
            string += compile(node, sourceName);
          }
          break;
        }
        default: {
          const never: never = item;
          throw new Error(`Unexpected MDX node: ${inspect(never)}`);
        }
      }
    }
    return string;
  } catch (e) {
    throw new Error(`Error whilst processing '${sourceName}': ${e.message}`);
  }
}

// Must escape text within tables, within links, and within link descriptions (`[...](http://... "DESCRIPTION")`)
function escapeMd(md: string, alsoAllowed: string[] = ['"', "(", ")"]): string {
  // DO NOT allow `"` or `|`
  return md.replace(/[^-+a-zA-Z0-9\s_:.,;?!'/@…#→]/g, (char) => {
    if (alsoAllowed.includes(char)) {
      return char;
    }
    const codePoint = char.codePointAt(0);
    if (codePoint != null && codePoint > 0 && codePoint < 1 << 16) {
      return `&#x${codePoint.toString(16)};`;
    } else {
      return "¿";
    }
  });
}

const escapeUrl = (url: string) => {
  if (url.startsWith("https://") || url.startsWith("http://")) {
    return url;
  } else {
    // Make it relative
    return `https://github.com/graphql/graphql-wg/raw/main/rfcs/${url}`;
  }
};

const escapeMdInner = (s: string) =>
  s
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(
      /\[([^\]]+)\]\(<(https?:\/\/[^>]*)>\)/g,
      (_, t, l) => `${t} (${l})`,
    )
    .replace(/<(https?:\/\/[^>]*)>/g, (_, t) => `\`${t}\``)
    .replace(/[{<]/g, "\\$&")
    .replace(/\\<(\/?(?:details|summary|hr))\/?>/g, "<$1>")
    .replace(/\\<!-- prettier-ignore -->/g, "<!-- prettier-ignore -->")
    .replace(/<hr>/gi, (_, t) => `<hr/>`)
    .replace(
      /(import|require|eval|Function|export|class|const|var|let)(?![a-zA-Z])/g,
      "$&\u200b",
    )
    .replace(
      /!\[([^\]]*)\]\(([^)]*)\)/g,
      (_, alt, href) => `![${alt}](${escapeUrl(href)})`,
    );

function sanitizeMarkdown(md: string | null | undefined): string {
  if (md == null) return "";
  let current = 0;
  let escapedLine = "";
  let active: string | null = null;
  const backticks = [...md.matchAll(/`+/g)];
  for (const backtickMatch of backticks) {
    const position = backtickMatch.index!;
    const ticks = backtickMatch[0];
    if (active) {
      if (ticks === active) {
        // End of backticks
        active = null;
        escapedLine += md
          .substring(current, position)
          .replace(/\r\n/g, "\n")
          .replace(/\r/g, "\n");
        escapedLine += ticks;
        current = position + ticks.length;
      } else {
        if (ticks.length < 3 && active.length >= 3) {
          // Fully ignore
        } else if (ticks.length === 1 && active.length === 2) {
          // Fully ignore
        } else {
          console.log(`Skipping '${ticks}' !== '${active}' at ${position}`);
        }
        // Ignore
      }
    } else {
      // Start of backticks
      active = ticks;
      escapedLine += escapeMdInner(md.substring(current, position));
      escapedLine += ticks;
      current = position + ticks.length;
    }
  }
  if (active) {
    throw new Error(`Mismatched backticks? Active: '${active}'`);
  } else {
    escapedLine += escapeMdInner(md.substring(current, md.length));
  }
  if (Math.random() < 2) return escapedLine;
  const lines = md.split("\n");
  let inCodeBlock: string | null = null;
  const escapedLines: string[] = [];
  for (const line of lines) {
    const match = line.match(/^(```+)/);
    if (match) {
      if (inCodeBlock) {
        if (inCodeBlock === match[1]) {
          inCodeBlock = null;
          escapedLines.push(line);
          continue;
        }
      } else {
        inCodeBlock = match[1];
        escapedLines.push(line);
        continue;
      }
    }
    if (inCodeBlock) {
      escapedLines.push(line);
    } else {
      const backticks = [...line.matchAll(/`+/g)];
      /*
      // Strip out the backticks that don't match
      for (let i = 0; i < backticks.length; i++) {
        if (!active) {
          active = backticks[i][0];
        } else {
          if (backticks[i][0] !== active) {
            backticks.splice(i, 1);
            i--;
          }
        }
      }
      */
      let current = 0;
      let escapedLine = "";
      let active: string | null = null;
      for (const backtickMatch of backticks) {
        const position = backtickMatch.index!;
        const ticks = backtickMatch[0];
        if (active) {
          if (backtickMatch[0] === active) {
            // End of backticks
            active = null;
            escapedLine += line.substring(current, position);
            escapedLine += ticks;
            current = position + ticks.length;
          } else {
            // Ignore
          }
        } else {
          // Start of backticks
          active = ticks;
          escapedLine += escapeMdInner(line.substring(current, position));
          escapedLine += ticks;
          current = position + ticks.length;
        }
      }
      if (active) {
        throw new Error(
          `Mismatched backticks? (This could be because there's a newline inside backticks. We don't support that yet.)`,
        );
      }
      escapedLines.push(escapedLine);
    }
  }
  return escapedLines.join("\n");
}

export interface MDXUtils {
  (strings: TemplateStringsArray, ...values: ReadonlyArray<MDX>): MDX;
  trusted(string: string): MDXTrustedNode;
  escape(rawString: string): MDXEscapeNode;
  sanitize(rawString: string): MDXSanitizeNode;
  url(href: string): MDXURLNode;
  linkDescription(rawString: string): MDXLinkDescriptionNode;
  trim(inner: MDX): MDXTrimNode;
  join(nodes: ReadonlyArray<MDX>, separator: string): MDXJoinNode;
  indent(mdx: MDX): MDXIndentNode;
  compile(mdx: ReadonlyArray<MDXNode> | MDXNode, sourceName: string): string;
}

export const mdx: MDXUtils = Object.assign(mdxRaw, {
  trusted,
  escape,
  sanitize,
  url,
  linkDescription,
  trim,
  join,
  indent,
  compile,
});
