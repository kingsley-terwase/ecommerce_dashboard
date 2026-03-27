// import { useAuthStore } from "@/store/auth";
import {
  BuildingRegular,
  DocumentLandscapeDataRegular,
  FormRegular,
  GlanceRegular,
  PeopleRegular,
  SettingsRegular,
  WrenchSettingsRegular,
  CircleSparkleRegular,
  PersonRegular,
  BuildingHomeRegular,
  GridDotsRegular,
  PaymentRegular,
  PersonStarRegular,
} from "@fluentui/react-icons";
// import { ROLES } from "./data";

/** @typedef {import("@/types/global.d.js").NavItem} NavItemProps */

export function useNavigationMenu() {
  // const { permission } = useAuthStore.getState();
  // const role = ROLES[`${permission?.role_id}:${permission?.subrole_id}`];

  const role = "customer";

  /** @type {any} */
  const menu = {
    platform_super_admin: [
      { label: "Overview", path: "/", icon: GlanceRegular },
      { label: "Admins", path: "/admins", icon: PersonStarRegular },
      { label: "Settings", path: "/settings", icon: SettingsRegular },
    ],
    customer: [
      { label: "Overview", path: "/", icon: GlanceRegular },

      {
        label: "Products",
        color: "#3B009D",
        path: "/products",
        icon: FormRegular,
      },
      {
        label: "Campaign",
        color: "#F1592A",
        path: "/campaign",
        icon: WrenchSettingsRegular,
      },
      {
        label: "Services",
        color: "#00FF5E",
        path: "/services",
        icon: DocumentLandscapeDataRegular,
      },
      {
        label: "Ai",
        color: "#ff0099",
        path: "/ai",
        icon: CircleSparkleRegular,
      },
    ],
  };

  return menu?.[role] || [];
}

export function useSettingsMenu() {
  const role = "customer";

  /**
   * @type {{
   *  admin?: NavItemProps[],
   *  customer?: NavItemProps[]
   * }}
   */
  const menu = {
    admin: [
      { label: "Account", path: "/settings/account", icon: PersonRegular },
      {
        label: "company",
        path: "",
        icon: BuildingHomeRegular,
        sub: [
          {
            label: "General",
            path: "/settings/company/general",
            icon: GridDotsRegular,
          },
          {
            label: "Members",
            path: "/settings/company/members",
            icon: PeopleRegular,
          },
          {
            label: "Billing",
            path: "/settings/company/billing",
            icon: PaymentRegular,
          },
        ],
      },
    ],
    customer: [
      { label: "Account", path: "/settings/account", icon: PersonRegular },
      {
        label: "Company",
        path: "",
        icon: BuildingRegular,
        sub: [
          {
            label: "General",
            path: "/settings/company/general",
            icon: GridDotsRegular,
          },
          {
            label: "Members",
            path: "/settings/company/members",
            icon: PeopleRegular,
          },
          {
            label: "Billing",
            path: "/settings/company/billing",
            icon: PaymentRegular,
          },
        ],
      },
    ],
  };

  return menu[role] || [];
}
