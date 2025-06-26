import "./style.css";
import { Map, View } from "ol";
import ImageLayer from "ol/layer/Image";
import Static from "ol/source/ImageStatic";

// Replace with your image's actual width and height in pixels
const imageWidth = 1920;
const imageHeight = 1080;

const imageExtent = [0, 0, imageWidth, imageHeight];

// Wait for the image to load before creating the map
const img = new window.Image();
img.src = "blank_map.jpg";

img.onload = () => {
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
    view: new View({
      center: [imageWidth / 2, imageHeight / 2],
      zoom: 2,
      minZoom: 2,
      maxZoom: 8,
      extent: imageExtent,
    }),
  });

  // Only one updateSize after creation
  setTimeout(() => {
    map.updateSize();
  }, 100);

  window.addEventListener("resize", () => {
    map.updateSize();
  });
};
