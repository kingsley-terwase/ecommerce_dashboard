import { useColor } from "@/contexts/color";
import { AlertRegular } from "@fluentui/react-icons";
import { Box } from "@mui/material";

/**
 * @param {Object} props
 * @param {number} [props.count]
 */
export default function Notification({ count = 5 }) {
  const { main } = useColor();
  return (
    <Box sx={{ position: "relative" }}>
      <AlertRegular fontSize={22} style={{ display: "block" }}></AlertRegular>
      {count > 0 && (
        <Box
          sx={{
            position: "absolute",
            height: "18px",
            width: "18px",
            borderRadius: "999px",
            top: "-4.5px",
            right: "-4.5px",
            backgroundColor: main.primary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "9px",
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 0,
          }}
        >
          {count < 9 ? count : "9+"}
        </Box>
      )}
    </Box>
  );
}
