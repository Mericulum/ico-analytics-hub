
// This file now re-exports all components from their respective files
// for backward compatibility

// Core components
export { 
  Sidebar,
  SidebarTrigger,
  SidebarRail
} from "./components/core"

// Layout components
export {
  SidebarInset,
  SidebarInput,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
  SidebarContent
} from "./components/layout"

// Group components
export {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent
} from "./components/group"

// Menu components
export {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton
} from "./components/menu"
