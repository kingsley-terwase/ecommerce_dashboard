import { useState } from "react";
import { Box, Drawer, useTheme, useMediaQuery } from "@mui/material";
import { useColor } from "@/contexts/color";
import { dashboardNavHeight, spacingTokens } from "@/lib/theme";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { AuthMiddleware } from "@/components/middleware";

export default function SettingsLayout() {
  const { border, bg } = useColor();
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  function toggleDrawer() {
    setMobileOpen((prev) => !prev);
  }

  return (
    <AuthMiddleware>
      <Box sx={{ display: "flex" }}>
        {!isMobile && (
          <Box
            sx={{
              flexShrink: 0,
              borderRight: `1px solid ${border.primary}`,
              backgroundColor: bg.secondary,
            }}
          >
            <Sidebar />
          </Box>
        )}

        {isMobile && (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={toggleDrawer}
            ModalProps={{ keepMounted: true }}
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                boxShadow: "none !important",
                borderRight: `1px solid ${border.primary}`,
                backgroundColor: bg.secondary,
              },
            }}
          >
            <Sidebar />
          </Drawer>
        )}

        <Box sx={{ height: "100svh", flexGrow: 1 }}>
          <Navbar onToggle={toggleDrawer} />
          <Box
            component="main"
            sx={{
              p: spacingTokens.md,
              boxSizing: "border-box",
              backgroundColor: bg.primary,
              height: `calc(100svh - ${dashboardNavHeight})`,
              overflowY: "auto",
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </AuthMiddleware>
  );
}
