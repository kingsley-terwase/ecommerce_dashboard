import { ShoppingBag24Filled, StoreMicrosoft24Filled } from "@fluentui/react-icons";
import { ROLES as API_ROLES } from "@/lib/roles";


export const ROLES = [
  {
    id: "buyer",
    apiRole: API_ROLES.CUSTOMER,
    label: "I'm a Buyer",
    desc: "Browse and shop from verified sellers",
    icon: ShoppingBag24Filled,
    color: "#021d49",
  },
  {
    id: "seller",
    apiRole: API_ROLES.SELLER,
    label: "I'm a Seller",
    desc: "List products and grow your store",
    icon: StoreMicrosoft24Filled,
    color: "#4d0529",
  },
];