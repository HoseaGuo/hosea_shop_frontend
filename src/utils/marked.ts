// @ts-ignore
import { marked } from "marked";
import hljs from "highlight.js"; // 引入 highlight.js

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code, lang) {
    const language = hljs.getLanguage(lang) ? lang : "";
    return lang
      ? hljs.highlight(code, { language }).value
      : hljs.highlightAuto(code).value;
  },
  pedantic: false,
  gfm: true,
  breaks: true,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
  langPrefix: "hljs language-", // highlight.js css expects a top-level 'hljs' class.
});

export default function (markdown) {
  let content = marked(markdown);

  // 在没有明显设置语言的code上添加 class类hljs，以达到有背景颜色效果
  content = content.replace(
    /<pre><code>/gs,
    '<pre><code class="hljs">'
  );

  return content;
};