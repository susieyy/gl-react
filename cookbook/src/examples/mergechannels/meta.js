import markdown from "../../markdown";
import ImagesPicker from "../../toolbox/ImagesPicker";
export const title = "Merge color channels — sampler2D[] showcase";
export const desc = markdown`
This is a showcase for Array of textures support.
`;

const imgPicker = {
  Editor: ImagesPicker,
  style: { width: 380 },
  imageStyle: { maxWidth: 42, maxHeight: 42 },
  images: [
    require("./img1.png"),
    require("./img2.png"),
    require("./img3.png"),
    require("./img4.png"),
    require("./img5.png"),
    require("./img6.png"),
    require("./img7.png"),
    require("./img8.png"),
  ],
};

export const toolbox = [
  { prop: "red",
    title: "red channel",
    ...imgPicker },
  { prop: "green",
    title: "green channel",
    ...imgPicker },
  { prop: "blue",
    title: "blue channel",
    ...imgPicker },
];
