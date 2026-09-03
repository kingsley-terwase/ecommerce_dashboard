// @ts-nocheck
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useColor } from "@/contexts/color";
import { typefaces } from "@/lib/theme";

export default function RegisterPrompt() {
    const { fg, main } = useColor();
    const navigate = useNavigate();

    return (
        <Typography
            sx={{ fontFamily: typefaces.primary, fontSize: 13, color: fg.secondary, textAlign: "center", mt: 3 }}
        >
            No account yet?{" "}
            <Box
                component="span"
                onClick={() => navigate("/register")}
                sx={{ color: main.primary, fontWeight: 700, cursor: "pointer" }}
            >
                Create an account
            </Box>
        </Typography>
    );
}