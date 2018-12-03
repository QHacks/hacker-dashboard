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

const steelBase = tinycolor("#c5c9d1");
export const steel = steelBase.toString();

export const linkUnvisited = grey;
export const linkVisited = grey;

const offWhiteBase = tinycolor("#F7F7F7");
export const offWhite = offWhiteBase.toString();
