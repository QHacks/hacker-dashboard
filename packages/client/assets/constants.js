const tinycolor = require("tinycolor2");

const blueBase = tinycolor("#00205b");
export const blue = blueBase.toString();
export const blueLight = blueBase.lighten(5).toString();
export const blueDark = blueBase.darken(5).toString();

const redBase = tinycolor("#d31f38");
export const red = redBase.toString();
export const redLight = redBase.lighten(5).toString();
export const redDark = redBase.darken(5).toString();

export const linkUnvisited = blueLight;
export const linkVisited = blueDark;
