// @ts-nocheck
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useColor } from "@/contexts/color";
import { typefaces } from "@/lib/theme";

export default function SignInPrompt() {
    const { fg, main } = useColor();
    const navigate = useNavigate();

    return (
        <Typography sx={{ fontFamily: typefaces.tertiary, fontSize: 13, color: fg.secondary, textAlign: "center", mt: 3 }}>
            Already have an account?{" "}
            <Box
                component="span"
                onClick={() => navigate("/login")}
                sx={{ color: main.primary, fontWeight: 700, cursor: "pointer" }}
            >
                Sign in
            </Box>
        </Typography>
    );
}