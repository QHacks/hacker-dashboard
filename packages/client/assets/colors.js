import { lighten, darken, useProperties } from "unitransform";

export const blue = "#002866";
export const blueLight = lighten(blue, 5);
export const blueDark = darken(blue, 10);

export const red = "#d31f38";
export const redLight = lighten(red, 5);
export const redDark = darken(red, 10);
export const redWhite = "#fffbfc";

export const cyan = "#00abf9";
export const cyanWhite = useProperties(cyan, redWhite, "sl");

export const green = "#00c139";
export const greenWhite = useProperties(green, redWhite, "sl");

export const orange = "#ff8408";
export const orangeWhite = useProperties(orange, redWhite, "sl");

export const grey = "#404554";

export const steel = "#c5c9d1";

export const linkUnvisited = grey;
export const linkVisited = grey;

export const offWhite = "#F7F7F7";
