let filters = {
  brightness: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  contrast: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  saturation: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  hueRotation: {
    value: 0,
    min: 0,
    max: 360,
    unit: "deg",
  },
  blur: {
    value: 0,
    min: 0,
    max: 20,
    unit: "px",
  },
  grayscale: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  sepia: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  opacity: {
    value: 100,
    min: 0,
    max: 100,
    unit: "%",
  },
  invert: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
};

const presets = {
  vintage: {
    brightness: 110,
    contrast: 90,
    saturation: 80,
    sepia: 40,
    grayscale: 10,
  },

  oldSchool: {
    brightness: 105,
    contrast: 120,
    saturation: 70,
    sepia: 60,
    blur: 1,
  },

  noir: {
    brightness: 90,
    contrast: 140,
    saturation: 0,
    grayscale: 100,
  },

  cyberpunk: {
    brightness: 115,
    contrast: 130,
    saturation: 160,
    hueRotation: 200,
  },

  warmSunset: {
    brightness: 110,
    contrast: 105,
    saturation: 130,
    hueRotation: 25,
  },

  coolTone: {
    brightness: 95,
    contrast: 110,
    saturation: 90,
    hueRotation: 200,
  },

  faded: {
    brightness: 105,
    contrast: 80,
    saturation: 70,
    opacity: 95,
  },

  retroPop: {
    brightness: 120,
    contrast: 140,
    saturation: 160,
    hueRotation: 330,
  },

  softGlow: {
    brightness: 110,
    contrast: 95,
    saturation: 120,
    blur: 2,
  },

  drama: {
    brightness: 100,
    contrast: 150,
    saturation: 130,
  },
};

//Selecting elements
const filtersContainer = document.querySelector(".filters");
const imageCanvas = document.querySelector("#image-canvas");
const canvasCtx = imageCanvas.getContext("2d");
const imageInput = document.querySelector("#image-input");
const placeholder = document.querySelector(".placeholder");

const resetBtn = document.querySelector("#reset-btn");
const downloadBtn = document.querySelector("#download-btn");

const presetContainer = document.querySelector(".presets");

//Variables
let file = null;
let img = null;

//Function to create filter elements
function createFilterElement(name, unit = "%", value, min, max) {
  const div = document.createElement("div");
  div.className = "filter";

  const input = document.createElement("input");
  input.type = "range";
  input.min = min;
  input.max = max;
  input.value = value;
  input.id = name;

  const p = document.createElement("p");
  p.innerText = `${name}: ${value}${unit}`;

  div.appendChild(p);
  div.appendChild(input);

  input.addEventListener("input", (event) => {
    filters[name].value = input.value;
    p.innerText = `${name}: ${input.value}${unit}`;
    applyFilters();
  });

  return div;
}

//Call filter functions
function createFilters() {
  Object.keys(filters).forEach((key) => {
    const filterElement = createFilterElement(
      key,
      filters[key].unit,
      filters[key].value,
      filters[key].min,
      filters[key].max
    );

    filtersContainer.appendChild(filterElement);
  });
}

createFilters();

//Creating canvas on selecting image
imageInput.addEventListener("change", (event) => {
  file = event.target.files[0];
  placeholder.style.display = "none";

  const image = new Image();
  image.src = URL.createObjectURL(file);

  image.onload = () => {
    img = image;
    imageCanvas.width = image.width;
    imageCanvas.height = image.height;
    canvasCtx.drawImage(image, 0, 0);
  };
});

//Apply filter
function applyFilters() {
  canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
  canvasCtx.filter = `
  brightness(${filters.brightness.value}${filters.brightness.unit})
  contrast(${filters.contrast.value}${filters.contrast.unit})
  saturate(${filters.saturation.value}${filters.saturation.unit})
  hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
  blur(${filters.blur.value}${filters.blur.unit})
  grayscale(${filters.grayscale.value}${filters.grayscale.unit})
  sepia(${filters.sepia.value}${filters.sepia.unit})
  opacity(${filters.opacity.value}${filters.opacity.unit})
  invert(${filters.invert.value}${filters.invert.unit})
  `;

  canvasCtx.drawImage(img, 0, 0);
}

//Reset filter
resetBtn.addEventListener("click", () => {
  filters = {
    brightness: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    contrast: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    saturation: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    hueRotation: {
      value: 0,
      min: 0,
      max: 360,
      unit: "deg",
    },
    blur: {
      value: 0,
      min: 0,
      max: 20,
      unit: "px",
    },
    grayscale: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%",
    },
    sepia: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%",
    },
    opacity: {
      value: 100,
      min: 0,
      max: 100,
      unit: "%",
    },
    invert: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%",
    },
  };

  applyFilters();
  filtersContainer.innerHTML = "";
  createFilters();
});

//Download logic
downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "edited-image.png";
  link.href = imageCanvas.toDataURL();
  link.click();
});

//Create presets
Object.keys(presets).forEach((presetName) => {
  const presetBtn = document.createElement("button");
  presetBtn.classList.add("preset");
  presetBtn.innerText = presetName;
  presetContainer.appendChild(presetBtn);

  presetBtn.addEventListener("click", () => {
    const preset = presets[presetName];
    console.log(preset);

    Object.keys(preset).forEach((filterName) => {
      filters[filterName].value = preset[filterName];
      console.log(filters[filterName], preset[filterName]);
    });

    applyFilters();
    filtersContainer.innerHTML = "";
    createFilters();
  });
});
