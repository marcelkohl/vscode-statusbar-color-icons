let statusBarElDetectionAttempts = 0
let statusBarElDetection = setInterval(() => {
  statusBarElDetectionAttempts++
  if (document.getElementById("status.problems") != null) {
    observeProblemsElOnStatusBar()
    clearTimeout(statusBarElDetection)
  } else if (statusBarElDetectionAttempts > 10) {
    clearTimeout(statusBarElDetection)
  }
}, 500)

function observeProblemsElOnStatusBar() {
  let problemsEl = document.getElementById("status.problems")
  let customObserver = new MutationObserver(mutationRecords => {

    lastClasses = []
    problemsEl.getElementsByTagName("a")[0].childNodes.forEach(el => {
      if (el.nodeName == "SPAN" && el.classList?.contains("codicon")) {
        lastClasses = el.classList
      } else if (el.nodeName == "#text" && lastClasses.length > 0) {
        let para = document.createElement("span");
        para.innerText = el.textContent;

        lastClasses.forEach(cl => {
          para.classList.add(cl + "-value")
        })

        if (para.innerText.trim() == "0") {
          para.classList.add("zero-problem")
        }

        el.replaceWith(para)
      }
    })
  });

  customObserver.observe(problemsEl, {
    attributes: true,
  })
}
