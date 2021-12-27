import marked from '@utils/marked'

self.onmessage = function (e) {
  let value = e.data;
  let markedHtml = "";
  if (value) {
    markedHtml = marked(value);
  }
  self.postMessage(markedHtml);
};
