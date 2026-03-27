import { Switch as BaseSwitch, styled } from "@mui/material";

const Switch = styled(BaseSwitch)(({ theme }) => ({
  width: 52,
  height: 28,
  padding: 6,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(19px)",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#F7941D",
        ...theme.applyStyles("dark", {
          backgroundColor: "#8796A5",
        }),
      },
      "& .MuiSwitch-thumb": {
        backgroundColor: "#FFFFFF",
        border: "2px solid #F1592A",
        borderBottom: "3px solid #F1592A",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    boxShadow: "none !important",
    backgroundColor: "#FFFFFF",
    border: "2px solid #ced5d6",
    borderBottom: "3px solid #ced5d6",
    width: 26,
    height: 26,
    borderRadius: "8px",
    ...theme.applyStyles("dark", {
      backgroundColor: "#FFFFFF",
    }),
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#bdc7ca",
    borderRadius: 20 / 2,
    ...theme.applyStyles("dark", {
      backgroundColor: "#8796A5",
    }),
  },
}));

export default Switch;
