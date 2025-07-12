declare module "lucide-react" {
  import * as React from "react"

  // Re-export any component as a generic React component to satisfy TS compiler.
  // When the actual library is installed, these types will be overridden.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon: React.FC<React.SVGProps<SVGSVGElement> & { name?: string; size?: number | string; color?: string }>;
  export const Star: typeof Icon
  export const Users: typeof Icon
  export const Calendar: typeof Icon
  export const MapPin: typeof Icon
  export const Heart: typeof Icon
  export const Search: typeof Icon
  export const Grid: typeof Icon
  export const List: typeof Icon
  export const Clock: typeof Icon
  export const ArrowRight: typeof Icon
  export const Filter: typeof Icon
  export const X: typeof Icon
  export const ChevronLeft: typeof Icon
  export const ChevronRight: typeof Icon
  export const Menu: typeof Icon
  export const ZoomIn: typeof Icon
  export const Award: typeof Icon
  export const Camera: typeof Icon
  export const TrendingUp: typeof Icon
  export const Shield: typeof Icon
  export const Phone: typeof Icon
  export const Mail: typeof Icon
  export const Instagram: typeof Icon
  export const Facebook: typeof Icon
  export const Twitter: typeof Icon
  export const ArrowDown: typeof Icon
  export const Flame: typeof Icon
  export const Zap: typeof Icon
  export const Info: typeof Icon
  export const ChevronDown: typeof Icon
  export const MoreHorizontal: typeof Icon
  export const ArrowLeft: typeof Icon
  export const Check: typeof Icon
  export const Circle: typeof Icon
  export const ChevronUp: typeof Icon
  export const GripVertical: typeof Icon
  export const PanelLeft: typeof Icon
  export const Trash2: typeof Icon
  export const Dot: typeof Icon
  export const Gift: typeof Icon
  export const Send: typeof Icon
  export const Globe: typeof Icon
  export const Mountain: typeof Icon
  export const Beach: typeof Icon
  export const Building: typeof Icon
  export const TreePine: typeof Icon
  export const Plane: typeof Icon
  export default Icon
}