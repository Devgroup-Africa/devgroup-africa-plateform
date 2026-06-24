import {
  BarChart3, Blocks, Bot, BriefcaseBusiness, CloudCog, Code2, Compass,
  Headphones, LayoutDashboard, MonitorSmartphone, Palette, RefreshCw, ShoppingCart,
} from 'lucide-react'

const icons = {
  BarChart3,
  Blocks,
  Bot,
  BriefcaseBusiness,
  CloudCog,
  Code2,
  Compass,
  Headphones,
  LayoutDashboard,
  MonitorSmartphone,
  Palette,
  RefreshCw,
  ShoppingCart,
}

export function hydrateIcon(item) {
  return {
    ...item,
    icon: typeof item.icon === 'string' ? icons[item.icon] || Blocks : item.icon,
  }
}

export function hydrateIcons(items) {
  return items.map(hydrateIcon)
}
