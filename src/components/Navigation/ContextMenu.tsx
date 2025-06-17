'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

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

interface ContextMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSetAsFirst: () => void;
  onRename: () => void;
  onCopy: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

export default function ContextMenu({
  isOpen,
  onClose,
  onSetAsFirst,
  onRename,
  onCopy,
  onDuplicate,
  onDelete,
}: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click target has the menu trigger attribute
      const target = event.target as HTMLElement;
      const isMenuTrigger = target.closest('[data-menu-trigger="true"]');
      
      if (isMenuTrigger) {
        // Don't close if clicking on a menu trigger - let the toggle handle it
        return;
      }
      
      if (menuRef.current && !menuRef.current.contains(target)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Use a small delay to ensure the menu is rendered before adding listeners
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const menuItems = [
    {
      icon: '/icons/icon-first-page.svg',
      label: 'Set as first page',
      onClick: onSetAsFirst,
      color: 'text-blue-600',
    },
    {
      icon: '/icons/icon-rename.svg',
      label: 'Rename',
      onClick: onRename,
      color: 'text-gray-700',
    },
    {
      icon: '/icons/icon-copy.svg',
      label: 'Copy',
      onClick: onCopy,
      color: 'text-gray-700',
    },
    {
      icon: '/icons/icon-duplicate.svg',
      label: 'Duplicate',
      onClick: onDuplicate,
      color: 'text-gray-700',
    },
    {
      icon: '/icons/icon-delete.svg',
      label: 'Delete',
      onClick: onDelete,
      color: 'text-red-600',
    },
  ];

  return (
    <div
      ref={menuRef}
      className="bg-white rounded-xl shadow-lg border border-light-gray pb-2 w-[240px] overflow-hidden"
    >
      <div className="p-3 text-base/24px font-medium bg-[#fafbfc] border-b border-light-gray">
        Settings
      </div>
      
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            item.onClick();
            onClose();
          }}
          className={`w-full flex items-center gap-3 px-3 py-[7px] text-sm/16px hover:bg-default-light-gray-bg transition-colors ${item.color}`}
        >
          <Image
            src={item.icon}
            alt=""
            width={16}
            height={16}
            className="flex-shrink-0"
          />
          {item.label}
        </button>
      ))}
    </div>
  );
}