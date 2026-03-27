import { createContext } from "react";

/** @typedef {import("@/types/color.d.js").ColorContextValue} ColorContextValueProps */

const ColorContext = createContext(/** @type {ColorContextValueProps | undefined} */ (undefined));
export default ColorContext;
