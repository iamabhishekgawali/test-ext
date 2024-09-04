// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === "start-pick") {
//       chrome.tabs.captureVisibleTab((screenshotUrl) => {
//           chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//               chrome.scripting.executeScript({
//                   target: { tabId: tabs[0].id },
//                   function: pickColor,
//                   args: [screenshotUrl]
//               });
//           });
//       });
//   }
// });



// function pickColor(screenshotUrl) {
//   const img = new Image();
//   img.src = screenshotUrl;
//   img.onload = function () {
//       const canvas = document.createElement("canvas");
//       canvas.width = img.width;
//       canvas.height = img.height;
//       console.log(canvas.width,canvas.height)
//       const ctx = canvas.getContext("2d");
//       ctx.drawImage(img, 0, 0);

//       document.body.addEventListener("mousemove", function (event) {
//           const x = event.clientX;
//           const y = event.clientY;
//           console.log(`${x} - ${y}`)
//           const pixel = ctx.getImageData(x+166, y+100, 1, 1).data;
//           const rgbColor = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
//           chrome.runtime.sendMessage({ action: "display-color", color: rgbColor });
//       });
//   };
// }




chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "start-pick") {
      chrome.tabs.captureVisibleTab((screenshotUrl) => {
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
              chrome.scripting.executeScript({
                  target: { tabId: tabs[0].id },
                  function: pickColor,
                  args: [screenshotUrl]
              });
          });
      });
  }
});



function pickColor(screenshotUrl) {
  const colorNames = {
    White: { r: 255, g: 255, b: 255 },
    Black: { r: 0, g: 0, b: 0 },
    Red: { r: 255, g: 0, b: 0 },
    Blue: { r: 0, g: 0, b: 255 },
    Yellow: { r: 255, g: 255, b: 0 },
    Green: { r: 0, g: 128, b: 0 },
    Purple: { r: 128, g: 0, b: 128 },
    Gray: { r: 128, g: 128, b: 128 },
    Orange: { r: 255, g: 165, b: 0 },
    Brown: { r: 165, g: 42, b: 42 },
    Pink: { r: 255, g: 20, b: 147 },
  };
  const img = new Image();
  img.src = screenshotUrl;
  img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      console.log(canvas.width,canvas.height)
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      document.body.addEventListener("mousemove", function (event) {
          const x = event.clientX;
          const y = event.clientY;
          console.log(`${x} - ${y}`)
          const pixel = ctx.getImageData(x+166, y+100, 1, 1).data;
          const rgbColor = {r:pixel[0], g:pixel[1], b:pixel[2]};
          const rgbcol = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;  
          console.log(rgbColor)
          let closestColor = "Unknown Color";
          let minDistance = Infinity;

          for (const [colorName, colorRgb] of Object.entries(colorNames)) {
            const distance = Math.sqrt(
              (rgbColor.r - colorRgb.r) ** 2 + (rgbColor.g - colorRgb.g) ** 2 + (rgbColor.b - colorRgb.b) ** 2
            );

            if (distance < minDistance) {
              minDistance = distance;
              closestColor = colorName;
            }
          }
          chrome.runtime.sendMessage({ action: "display-color", color: rgbcol, name: closestColor });
      });
  };
}



