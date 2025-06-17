export type Page = {
  id: string;
  title: string;
  iconActive: string;
  iconInactive: string;
};

export type PageButtonProps = {
  page: Page;
  isActive: boolean;
  setActivePageId: (id: string) => void;
  addPageAfter: (id: string) => void;
  isLast?: boolean;
  isEnding?: boolean;
  isDragging?: boolean;
  onContextMenu?: (pageId: string, event: React.MouseEvent) => void;
  showContextMenu?: boolean;
  onCloseContextMenu?: () => void;
  onSetAsFirst?: () => void;
  onRename?: () => void;
  onCopy?: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
};