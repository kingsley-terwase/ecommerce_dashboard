import { Box, Stack } from "@mui/material";
import { ArrowEnterLeftRegular } from "@fluentui/react-icons";
import { useRef, useState } from "react";
import { spacingTokens } from "@/lib/theme";
import { useSettingsMenu } from "@/lib/navigation";
import { useLocation, useNavigate } from "react-router-dom";
import { headerHeight } from "./lib";
import { useColor } from "@/contexts/color";
import { Typography } from "@/components/ui";
import { NavLink } from "@/components/shared";

/** @typedef {import("@/types/global.d").NavItem} NavItemProps */
export default function Sidebar() {
  /** @type {React.RefObject<HTMLDivElement | null>} */
  const navRef = useRef(null);

  const menu = useSettingsMenu();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { fg } = useColor();

  const [selected, setSelected] = useState(/** @type {number | null} */ (null));

  /**
   * @param {NavItemProps} item
   * @param {number} index
   */
  function handleNavigation(item, index) {
    if (item?.sub && item?.sub?.length > 0) {
      setSelected((current) => (current === index ? null : index));
      return;
    }
    if (!item?.path) return;
    navigate(item?.path);
  }

  /** @param {NavItemProps} item */
  function handleSubNavigatiion(item) {
    if (!item?.path) return;
    navigate(item?.path);
  }

  function goToDashboard() {
    navigate("/");
  }

  return (
    <>
      <Box ref={navRef} sx={{ height: "100svh" }}>
        <Stack
          direction="row"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          height={headerHeight}
          gap={spacingTokens.sm}
          sx={{
            px: spacingTokens.sm,
          }}
        >
          <Stack direction="row" alignItems="center" gap={spacingTokens.sm}>
            <Box component="img" height="20px" src="/logo-icon.png"></Box>
            <Typography fontWeight={600} sx={{ userSelect: "none" }}>
              Settings
            </Typography>
          </Stack>
          <ArrowEnterLeftRegular
            color={fg.tertiary}
            fontSize={20}
            style={{ cursor: "pointer" }}
            onClick={goToDashboard}
          ></ArrowEnterLeftRegular>
        </Stack>

        <Box
          sx={{
            px: spacingTokens.sm,
            height: `calc(100svh - ${headerHeight})`,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: spacingTokens.xs,
          }}
        >
          {menu.map((item, index) => (
            <Stack key={index} gap={spacingTokens.xs}>
              <NavLink
                nav={item}
                active={
                  item.path === pathname ||
                  item?.sub?.some((subItem) => subItem.path === pathname) ||
                  false
                }
                onNavigate={() => handleNavigation(item, index)}
                subNavOpen={selected === index}
              ></NavLink>

              {item?.sub && item?.sub?.length > 0 && (
                <Stack
                  gap={spacingTokens.sm}
                  sx={{
                    maxHeight: selected === index ? "500px" : "0px",
                    overflowY: "hidden",
                    overflowX: "visible",
                    transition: "max-height 0.35s ease-in-out",
                  }}
                >
                  {item?.sub?.map((subItem, subIndex) => (
                    <NavLink
                      key={subIndex}
                      nav={subItem}
                      active={subItem.path === pathname}
                      onNavigate={() => handleSubNavigatiion(subItem)}
                      x={spacingTokens.md}
                    ></NavLink>
                  ))}
                </Stack>
              )}
            </Stack>
          ))}
        </Box>
      </Box>
    </>
  );
}
