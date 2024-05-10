document.addEventListener("DOMContentLoaded", () => {
  const code = document.getElementsByTagName("code");

  Array.from(code).forEach((el) => {
    if (el.className) {
      const s = el.className.split(":");
      const highlightLang = s[0];
      const filename = s[1];
      if (filename) {
        el.classList.remove(el.className);
        el.classList.add(highlightLang);

        const codeHeaderDiv = document.createElement("div");
        codeHeaderDiv.classList.add("code-header");

        const lang = highlightLang.split("-")[1].toUpperCase();
        const codeLangDiv = document.createElement("div");
        codeLangDiv.textContent = lang;
        codeLangDiv.classList.add("code-header-lang");

        const codeControlDiv = document.createElement("div");
        codeControlDiv.classList.add("code-header-control");

        const codeFileDiv = document.createElement("div");
        codeFileDiv.textContent = filename;
        codeFileDiv.classList.add("code-header-file");

        const codeCopyBtn = document.createElement("i");
        codeCopyBtn.setAttribute("class", "fa-solid fa-copy copy-button");

        codeControlDiv.append(codeFileDiv, codeCopyBtn);
        codeHeaderDiv.append(codeLangDiv, codeControlDiv);
        el.before(codeHeaderDiv);
      }
    }
  });
});

/*
 * querySelector等で取得した要素（element)を渡すと、
 * その要素の文字列をクリップボードにコピーします。
 * ユーザーが事前に選択していた内容には影響を与えません。
 * 戻り値はコピーが成功したかどうか（true/false)
 */
let copyToClipboard = (element) => {
  let ranges = [];
  let selection = window.getSelection();
  let range = document.createRange();
  let result = false;
  for (let i = 0; i < selection.rangeCount; i += 1) {
    ranges[i] = selection.getRangeAt(i);
  }
  range.selectNodeContents(element);
  selection.removeAllRanges();
  selection.addRange(range);
  result = document.execCommand("copy");
  selection.removeAllRanges();
  for (let i = 0; i < ranges.length; i += 1) {
    selection.addRange(ranges[i]);
  }
  return result;
};

document.addEventListener("DOMContentLoaded", () => {
  let els = document.querySelectorAll(".copy-button");
  els.forEach((el) => {
    el.addEventListener("click", (e) => {
      try {
        const preEle = el.closest("pre");
        const codeEle = preEle.querySelector("code");
        let result = false;
        if (codeEle) {
          el.classList.add("success");
          copyToClipboard(codeEle);
          setTimeout(() => {
            el.className = "fa-solid fa-copy copy-button";
          }, 500);
        }
      } catch (e) {
        console.log(e);
        //error
      }
    });
  });
});