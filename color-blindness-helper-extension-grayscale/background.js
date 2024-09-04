chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ colorBlindnessType: "noColor", redSlider: 1,  greenSlider: 1, blueSlider: 1});
});


