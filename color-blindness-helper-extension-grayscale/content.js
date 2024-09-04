console.log("Content script is running");



chrome.storage.local.get( [ "colorBlindnessType", "redSlider", "greenSlider", "blueSlider" ] , function (data) {
  const type = data.colorBlindnessType;
  console.log("Retrieved color blindness type:", type);

  if (!type) {
    console.error("No color blindness type found in storage.");
    return;
  }

  console.log("Calling SVG Filter")

  injectSVGFilters(data.redSlider,data.greenSlider,data.blueSlider);

  let filter = "url(#protonopia)"
  console.log("Applying filter:", filter);
  document.body.style.filter = filter;
});

function injectSVGFilters(x,y,z) {

 console.log(x)
 console.log(y)
 console.log(z)

 // Remove any existing filter first
 const existingFilter = document.getElementById("color-blindness-filters");
 console.log(existingFilter)

 if (existingFilter) {
     existingFilter.remove();
 }


 // Avoid multiple injections
  const svgFilters = `
        <svg id="color-blindness-filters" xmlns="http://www.w3.org/2000/svg">
            <filter id="protonopia">
                <feColorMatrix type="matrix" values=" ${x} ${1-x} 0 0 0 
                                                      ${1-y} ${y} 0 0 0 
                                                      0 ${1-z} ${z} 0 0
                                                      0 0 0 1 0"/>
            </filter>
        </svg>
    `;

  console.log(svgFilters)
  const div = document.createElement("div");
  div.innerHTML = svgFilters;
  document.body.appendChild(div);
}
