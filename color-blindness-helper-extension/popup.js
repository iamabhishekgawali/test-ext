document.getElementById("startPick").addEventListener("click", function () {
  chrome.runtime.sendMessage({ action: "start-pick" });
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "display-color") {
      document.getElementById("colorDisplay").style.backgroundColor = message.color;
      document.getElementById("colorCode").textContent = message.name;
  }
});
