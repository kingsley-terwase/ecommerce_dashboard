import { Dropdown } from "@/components/shared";
import { Avatar as BaseAvatar } from "@/components/ui";
import { BuildingRegular, SettingsRegular } from "@fluentui/react-icons";
import { Box } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const items = [
  {
    label: "Settings",
    icon: SettingsRegular,
    path: "/settings",
  },
  {
    label: "Company",
    icon: BuildingRegular,
    path: "/account",
  },
];

export default function Avatar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(
    /** @type {(EventTarget & HTMLDivElement) | null} */ (null),
  );

  const isOpen = Boolean(anchorEl);

  function handleNavigate(/** @type {string} */ path) {
    navigate(path);
  }

  return (
    <Box>
      <BaseAvatar
        size={30}
        imageUrl="/avatar_1.png"
        name="Avatar"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      />
      <Dropdown
        open={isOpen}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        items={items}
        renderItem={(item) => ({
          label: item.label,
          value: item.path,
          icon: item.icon,
        })}
        onSelect={(val, _item) => {
          handleNavigate(val);
          setAnchorEl(null);
        }}
      />
    </Box>
  );
}
