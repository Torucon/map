import "./style.css";
import { Map, View } from "ol";
import ImageLayer from "ol/layer/Image";
import Static from "ol/source/ImageStatic";

const imageHeight = 1938;
const imageWidth = 3206;

const imageExtent = [0, 0, imageWidth, imageHeight];

const img = new window.Image();
img.src = "blank_map.jpg";

img.onload = () => {
  const view = new View({
    minZoom: 1,
    maxZoom: 8,
    extent: imageExtent,
  });
  const map = new Map({
    target: "map",
    layers: [
      new ImageLayer({
        source: new Static({
          url: img.src,
          imageExtent: imageExtent,
        }),
      }),
    ],
    view: view,
  });

  // Fit the view to the image extent
  view.fit(imageExtent, { size: map.getSize() });

  // Update size after image load and after window load
  const updateMapSize = () => {
    map.updateSize();
    view.fit(imageExtent, { size: map.getSize() });
  };
  setTimeout(updateMapSize, 100);
  window.addEventListener("resize", updateMapSize);
  window.addEventListener("load", updateMapSize);
};
