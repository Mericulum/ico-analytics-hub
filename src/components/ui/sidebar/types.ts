
import { LucideIcon } from 'lucide-react';

export type SidebarState = "expanded" | "collapsed";

export type SidebarContext = {
  state: SidebarState;
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

