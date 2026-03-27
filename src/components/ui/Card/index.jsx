import { radius } from "@/lib/theme";
import { Card as BaseCard } from "@mui/material";

/**
 * @param {import("@mui/material").CardProps & { round?: keyof radius }} props
 */
export default function Card({ children, round = 8, ...props }) {
  return (
    <BaseCard {...props} sx={{ height: "100%", borderRadius: radius[round] }}>
      {children}
    </BaseCard>
  );
}
