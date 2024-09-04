

chrome.storage.sync.get("colorBlindnessType", function (data) {

  const type = data.colorBlindnessType;
  console.log("Retrieved color blindness type:", type);

  if (!type) {
    console.error("No color blindness type found in storage.");
    return;
  }

  injectSVGFilters();

  let filter = "";
  switch (type) {
    case "protanopia":
      filter = "url(#protanopia)";
      break;
    case "deuteranopia":
      filter = "url(#deuteranopia)";
      break;
    case "tritanopia":
      filter = "url(#tritanopia)";
      break;
    case "monochromacy":
      filter = "grayscale(100%)";
      break;
    case "noColor":
      filter = "none";
      break;
    default:
      filter = "none";
  }
  console.log("Applying filter:", filter);
  document.body.style.filter = filter;
});

function injectSVGFilters() {

  console.log("Checking")
  convertImages();

}


async function convertImages() {
  const images = document.querySelectorAll('img');
  for (let img of images) {
      const imageData = await getImageData(img);
      const newSrc = await sendImageToServer(imageData);
      if (newSrc) {
          img.src = newSrc;
      }
  }
}

async function getImageData(img) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

async function sendImageToServer(imageData) {


  console.log(imageData)

  // const response = await fetch('http://127.0.0.1:5000/upload', {
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ data: Array.from(imageData.data), width: imageData.width, height: imageData.height })
  // });

  // if (response.ok) {
  //     const result = await response.json();
  //     return result.imageUrl;
  // } else {
  //     console.error('Error:', response.statusText);
  //     return null;
  // }
}


