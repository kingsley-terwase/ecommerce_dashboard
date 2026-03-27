import { useContext } from "react";
import ColorContext from "./ColorContext";

const useColor = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error("useColor must be used within ColorProvider");
  }
  return context;
};

export default useColor;
