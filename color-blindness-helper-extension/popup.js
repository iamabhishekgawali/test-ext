document.addEventListener("DOMContentLoaded", function () {
  // Load stored color blindness type and set the radio button accordingly
  chrome.storage.local.get(["colorBlindnessType", "redSlider", "greenSlider", "blueSlider"], function (data) {
    if (data.colorBlindnessType) {
      document.querySelector(
        `input[name="type"][value="${data.colorBlindnessType}"]`
      ).checked = true;
    }

    // console.log(data.redSlider)
    // console.log(data.greenSlider)
    // console.log(data.blueSlider)

    console.log(document)

    if (data.redSlider) {
      document.querySelector(`input[name="redInput"]`).value = data.redSlider
      document.querySelector(`span[name="redSpan"]`).textContent = data.redSlider
    }

    if (data.greenSlider) {
      document.querySelector(`input[name="greenInput"]`).value = data.greenSlider
      document.querySelector(`span[name="greenSpan"]`).textContent = data.greenSlider
    }

    if (data.blueSlider) {
      document.querySelector(`input[name="blueInput"]`).value = data.blueSlider
      document.querySelector(`span[name="blueSpan"]`).textContent = data.blueSlider
    }
  });
});

document
  .getElementById("colorBlindnessForm")
  .addEventListener("input", function (e) {
    e.preventDefault();



    const type = document.querySelector('input[name="type"]:checked').value;
    console.log("Selected color blindness type:", type);


    console.log("Type : ")
    console.log(type)
    if (type == 'protanopia') {

      document.querySelector(`input[name="redInput"]`).value = 0.567
      document.querySelector(`span[name="redSpan"]`).textContent = 0.567

      document.querySelector(`input[name="greenInput"]`).value = 0.558
      document.querySelector(`span[name="greenSpan"]`).textContent = 0.558

      document.querySelector(`input[name="blueInput"]`).value = 0.242
      document.querySelector(`span[name="blueSpan"]`).textContent = 0.242

    }
    else if (type == 'deuteranopia') {
      document.querySelector(`input[name="redInput"]`).value = 0.625
      document.querySelector(`span[name="redSpan"]`).textContent = 0.625

      document.querySelector(`input[name="greenInput"]`).value = 0.7
      document.querySelector(`span[name="greenSpan"]`).textContent = 0.7

      document.querySelector(`input[name="blueInput"]`).value = 0.3
      document.querySelector(`span[name="blueSpan"]`).textContent = 0.3
    }
    else if (type == 'tritanopia') {
      document.querySelector(`input[name="redInput"]`).value = 0.95
      document.querySelector(`span[name="redSpan"]`).textContent = 0.95

      document.querySelector(`input[name="greenInput"]`).value = 0.433
      document.querySelector(`span[name="greenSpan"]`).textContent = 0.433

      document.querySelector(`input[name="blueInput"]`).value = 0.475
      document.querySelector(`span[name="blueSpan"]`).textContent = 0.475

    }
    else {
      document.querySelector(`input[name="redInput"]`).value = 1
      document.querySelector(`span[name="redSpan"]`).textContent = 1

      document.querySelector(`input[name="greenInput"]`).value = 1
      document.querySelector(`span[name="greenSpan"]`).textContent = 1

      document.querySelector(`input[name="blueInput"]`).value = 1
      document.querySelector(`span[name="blueSpan"]`).textContent = 1
    }

    const redValue = document.querySelector(`input[name="redInput"]`).value;
    const greenValue = document.querySelector(`input[name="greenInput"]`).value;
    const blueValue = document.querySelector(`input[name="blueInput"]`).value;



    chrome.storage.local.set({ colorBlindnessType: type , redSlider: redValue ,  greenSlider: greenValue, blueSlider: blueValue }, function () {

      console.log("Stored color blindness type:", type);

      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs.length === 0) {
          console.error("No active tab found.");
          return;
        }

        chrome.scripting.executeScript(
          {
            target: { tabId: tabs[0].id },
            files: ["content.js"],
          },
          () => {
            if (chrome.runtime.lastError) {
              console.error(
                "Error injecting content script:",
                chrome.runtime.lastError.message
              );
            } else {
              console.log("Injected content.js into tab:", tabs[0].id);
            }
          }
        );
      });
    });
  });


document
  .getElementById("AllSliders")
  .addEventListener("input", function (e) {
    e.preventDefault();

    const type = document.querySelector('input[name="type"]:checked').value;
    console.log("Selected color blindness type:", type);

    const redValue = document.querySelector(`input[name="redInput"]`).value;
    const greenValue = document.querySelector(`input[name="greenInput"]`).value;
    const blueValue = document.querySelector(`input[name="blueInput"]`).value;

    console.log(redValue)
    console.log(greenValue)
    console.log(blueValue)

    document.querySelector(`span[name="redSpan"]`).textContent = redValue
    document.querySelector(`span[name="greenSpan"]`).textContent = greenValue
    document.querySelector(`span[name="blueSpan"]`).textContent = blueValue

    chrome.storage.local.set({ colorBlindnessType: type , redSlider: redValue ,  greenSlider: greenValue, blueSlider: blueValue }, function () {

      console.log("Stored color blindness type:", type);

      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs.length === 0) {
          console.error("No active tab found.");
          return;
        }

        chrome.scripting.executeScript(
          {
            target: { tabId: tabs[0].id },
            files: ["content.js"],
          },
          () => {
            if (chrome.runtime.lastError) {
              console.error(
                "Error injecting content script:",
                chrome.runtime.lastError.message
              );
            } else {
              console.log("Injected content.js into tab:", tabs[0].id);
            }
          }
        )}
      )
    })
  });





// document.getElementById("resetDefault").addEventListener("click", function () {
//   const defaultType = "noColor";
//   console.log("Resetting to default color blindness type:", defaultType);

//   chrome.storage.local.set({ colorBlindnessType: defaultType }, function () {
//     console.log("Default color blindness type set.");

//     // Update the radio button selection in the popup
//     document.querySelector(
//       `input[name="type"][value="${defaultType}"]`
//     ).checked = true;

//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//       if (tabs.length === 0) {
//         console.error("No active tab found.");
//         return;
//       }

//       chrome.scripting.executeScript(
//         {
//           target: { tabId: tabs[0].id },
//           files: ["content.js"],
//         },
//         () => {
//           if (chrome.runtime.lastError) {
//             console.error(
//               "Error injecting content script:",
//               chrome.runtime.lastError.message
//             );
//           } else {
//             console.log("Injected content.js into tab:", tabs[0].id);
//           }
//         }
//       );
//     });
//   });
// });
