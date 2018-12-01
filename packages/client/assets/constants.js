const tinycolor = require("tinycolor2");

const blueBase = tinycolor("#002866");
export const blue = blueBase.toString();
export const blueLight = blueBase.lighten(5).toString();
export const blueDark = blueBase.darken(10).toString();

const cyanBase = tinycolor("#00abf9");
export const cyan = cyanBase.toString();

const greenBase = tinycolor("#00c139");
export const green = greenBase.toString();

const orangeBase = tinycolor("#ff8408");
export const orange = orangeBase.toString();

const redBase = tinycolor("#d31f38");
export const red = redBase.toString();
export const redLight = redBase.lighten(5).toString();
export const redDark = redBase.darken(10).toString();

const greyBase = tinycolor("#404554");
export const grey = greyBase.toString();

export const linkUnvisited = blueLight;
export const linkVisited = blueDark;

export const boxShadow =
  "0 2px 4px rgba(10,10,10,0.1), 0 2px 4px rgba(10,10,10,0.15);";
