// @ts-nocheck
import { Box, Stack } from "@mui/material";
import { PrimaryButton } from "../../SellerUi";

export default function SaveBar({ main }) {
    return (
        <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2.4 }}>
            <Box sx={{ width: { xs: "100%", sm: "auto" } }}>
                <PrimaryButton main={main}>Save changes</PrimaryButton>
            </Box>
        </Stack>
    );
}