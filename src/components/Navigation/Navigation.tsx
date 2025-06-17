'use client';

import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';

import SortablePageButton from './SortablePageButton';
import ContextMenu from './ContextMenu';
import type { Page } from './types';

const initialPages: Page[] = [
  {
    id: '1',
    title: 'Info',
    iconActive: '/icons/icon-info-orange.svg',
    iconInactive: '/icons/icon-info-gray.svg',
  },
  {
    id: '2',
    title: 'Details',
    iconActive: '/icons/icon-page-orange.svg',
    iconInactive: '/icons/icon-page-gray.svg',
  },
  {
    id: '3',
    title: 'Other',
    iconActive: '/icons/icon-page-orange.svg',
    iconInactive: '/icons/icon-page-gray.svg',
  },
  {
    id: '4',
    title: 'Ending',
    iconActive: '/icons/icon-ending-orange.svg',
    iconInactive: '/icons/icon-ending-gray.svg',
  },
];

export default function Navigation() {
  const [pages, setPages] = useState<Page[]>(initialPages);
  const [activePageId, setActivePageId] = useState<string>(pages[0].id);
  const [contextMenu, setContextMenu] = useState<{
    isOpen: boolean;
    pageId: string | null;
  }>({
    isOpen: false,
    pageId: null,
  });
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) return null;

  const sortablePages = pages.filter((p) => p.title !== 'Ending');

  const newPageNumber = pages.filter(p => p.title.startsWith('New Page')).length + 1;

  // Context menu handlers
  const openContextMenu = (pageId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    setContextMenu({
      isOpen: true,
      pageId,
    });
  };

  const closeContextMenu = () => {
    setContextMenu({
      isOpen: false,
      pageId: null,
    });
  };

  const handleSetAsFirst = () => {
    if (!contextMenu.pageId) return;
    
    const pageIndex = pages.findIndex(p => p.id === contextMenu.pageId);
    if (pageIndex === -1 || pageIndex === 0) return;
    
    const page = pages[pageIndex];
    const newPages = [page, ...pages.filter(p => p.id !== contextMenu.pageId)];
    setPages(newPages);
    setActivePageId(page.id);
  };

  const handleRename = () => {
    if (!contextMenu.pageId) return;
    
    const page = pages.find(p => p.id === contextMenu.pageId);
    if (!page) return;
    
    const newName = prompt('Enter new page name:', page.title);
    if (newName && newName.trim()) {
      setPages(pages.map(p => 
        p.id === contextMenu.pageId 
          ? { ...p, title: newName.trim() }
          : p
      ));
    }
  };

  const handleCopy = () => {
    if (!contextMenu.pageId) return;
    
    const page = pages.find(p => p.id === contextMenu.pageId);
    if (!page) return;
    
    navigator.clipboard.writeText(page.title).then(() => {
      alert(`Copied: ${page.title}`);
    });
  };

  const handleDuplicate = () => {
    if (!contextMenu.pageId) return;
    
    const pageIndex = pages.findIndex(p => p.id === contextMenu.pageId);
    if (pageIndex === -1) return;
    
    const originalPage = pages[pageIndex];
    const duplicatedPage: Page = {
      ...originalPage,
      id: uuidv4(),
      title: `${originalPage.title} (Copy)`,
    };
    
    const newPages = [
      ...pages.slice(0, pageIndex + 1),
      duplicatedPage,
      ...pages.slice(pageIndex + 1),
    ];
    
    setPages(newPages);
  };

  const handleDelete = () => {
    if (!contextMenu.pageId) return;
    
    const page = pages.find(p => p.id === contextMenu.pageId);
    if (!page) return;
    
    if (pages.length <= 2 || page.title === 'Ending') {
      alert('Cannot delete this page');
      return;
    }
    
    const confirmDelete = confirm(`Are you sure you want to delete "${page.title}"?`);
    if (confirmDelete) {
      const newPages = pages.filter(p => p.id !== contextMenu.pageId);
      setPages(newPages);
      
      if (activePageId === contextMenu.pageId) {
        setActivePageId(newPages[0].id);
      }
    }
  };

  const addPageAfter = (afterId: string) => {
    const index = pages.findIndex((p) => p.id === afterId);
    if (index === -1) return;

    const isAfterEnding =
      index === pages.length - 1 && pages[index].title === 'Ending';

    const insertIndex = isAfterEnding ? index : index + 1;

    const newPage: Page = {
      id: uuidv4(),
      title: `New Page ${newPageNumber}`,
      iconActive: '/icons/icon-page-orange.svg',
      iconInactive: '/icons/icon-page-gray.svg',
    };

    const updated = [
      ...pages.slice(0, insertIndex),
      newPage,
      ...pages.slice(insertIndex),
    ];

    console.log('New pages:', updated);
    setPages(updated);
  };

  const addPageToEnd = () => {
    const newPage: Page = {
      id: uuidv4(),
      title: `New Page ${newPageNumber}`,
      iconActive: '/icons/icon-page-orange.svg',
      iconInactive: '/icons/icon-page-gray.svg',
    };

    const endingIndex = pages.findIndex((p) => p.title === 'Ending');
    if (endingIndex !== -1) {
      const updated = [
        ...pages.slice(0, endingIndex),
        newPage,
        ...pages.slice(endingIndex),
      ];
      setPages(updated);
    } else {
      setPages((prev) => [...prev, newPage]);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = pages.findIndex((p) => p.id === active.id);
    const newIndex = pages.findIndex((p) => p.id === over.id);

    if (
      pages[oldIndex]?.title === 'Ending' ||
      pages[newIndex]?.title === 'Ending'
    ) {
      return;
    }

    const reordered = arrayMove(pages, oldIndex, newIndex);
    setPages(reordered);
  };

  // Render ending page without drag functionality
  const renderEndingPage = (page: Page) => (
    <div key={page.id} className="relative group flex items-center">
      <div
        className={`flex items-center rounded-lg border text-foreground text-[14px]/[20px] tracking-[-1.5%] whitespace-nowrap cursor-grab active:cursor-grabbing focus:border focus:border-default-blue focus-visible:outline-2 focus-visible:outline-default-blue/25
          ${page.id === activePageId ? 'bg-white border-active-orange' : 'bg-default-light-gray-bg border-default-light-gray-bg hover:bg-default-medium-gray-bg pr-2.5'}
        `}
        onClick={() => setActivePageId(page.id)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (page.id === activePageId) {
              // If this page is already active, open/close the menu
              if (contextMenu.isOpen && contextMenu.pageId === page.id) {
                closeContextMenu();
              } else {
                const mockEvent = {
                  preventDefault: () => {},
                  stopPropagation: () => {},
                  clientX: 0,
                  clientY: 0,
                } as React.MouseEvent;
                openContextMenu(page.id, mockEvent);
              }
            } else {
              // If this page is not active, just select it
              setActivePageId(page.id);
            }
          }
        }}
      >
        <div
          className="flex items-center px-2.5 py-1 cursor-grab active:cursor-grabbing focus:border focus:border-default-blue focus-visible:outline-2 focus-visible:outline-default-blue/25 rounded"
          role="button"
        >
          <Image
            className="mr-1.5"
            src={page.id === activePageId ? page.iconActive : page.iconInactive}
            alt={`${page.title} icon`}
            width={20}
            height={20}
          />
          {page.title}
        </div>
        
        {page.id === activePageId && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              
              if (contextMenu.isOpen && contextMenu.pageId === page.id) {
                closeContextMenu();
              } else {
                openContextMenu(page.id, e);
              }
            }}
            className={`pr-2.5 py-1.5 rounded-tr-lg rounded-br-lg transition-colors cursor-pointer focus:border focus:border-default-blue focus-visible:outline-2 focus-visible:outline-default-blue/25  ${
              contextMenu.isOpen && contextMenu.pageId === page.id
                ? 'bg-default-light-gray-bg' 
                : 'hover:bg-default-light-gray-bg' 
            }`}
            role="button"
            data-menu-trigger="true"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                
                  const mockEvent = {
                    preventDefault: () => {},
                    stopPropagation: () => {},
                    clientX: 0,
                    clientY: 0,
                  } as React.MouseEvent;

                if (contextMenu.isOpen && contextMenu.pageId === page.id) {
                  closeContextMenu();
                } else {
                  openContextMenu(page.id, mockEvent);
                }
              }
            }}
          >
            <Image
              src="/icons/icon-menu.svg"
              alt="Menu"
              width={16}
              height={16}
              style={{ height: 'auto' }}
            />
          </div>
        )}
      </div>
      
      {contextMenu.isOpen && contextMenu.pageId === page.id && (
        <div className="absolute top-full left-0 z-50 mt-1">
          <ContextMenu
            isOpen={true}
            onClose={closeContextMenu}
            onSetAsFirst={handleSetAsFirst}
            onRename={handleRename}
            onCopy={handleCopy}
            onDuplicate={handleDuplicate}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-wrap items-center gap-y-4 p-6 border rounded-md bg-white shadow-sm">
      <DndContext 
        sensors={sensors} 
        collisionDetection={closestCenter} 
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={sortablePages.map((p) => p.id)} strategy={verticalListSortingStrategy}>
          {pages.map((page, idx) =>
            page.title === 'Ending' ? (
              renderEndingPage(page)
            ) : (
              <SortablePageButton
                key={page.id}
                page={page}
                isActive={page.id === activePageId}
                setActivePageId={setActivePageId}
                addPageAfter={addPageAfter}
                isLast={idx === pages.length - 1}
                onContextMenu={openContextMenu}
                showContextMenu={contextMenu.isOpen && contextMenu.pageId === page.id}
                onCloseContextMenu={closeContextMenu}
                onSetAsFirst={handleSetAsFirst}
                onRename={handleRename}
                onCopy={handleCopy}
                onDuplicate={handleDuplicate}
                onDelete={handleDelete}
              />
            )
          )}
        </SortableContext>
      </DndContext>
      <Image
        src="/icons/icon-divider.svg"
        alt=""
        width={20}
        height={1.5}
        style={{ height: 'auto' }}
      />

      <button
        onClick={addPageToEnd}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-foreground text-[14px]/[20px] tracking-[-1.5%] cursor-pointer whitespace-nowrap border-light-gray hover:bg-default-medium-gray-bg focus:border focus:border-default-blue focus-visible:outline-2 focus-visible:outline-default-blue/25"
      >
        <Image
          src="/icons/icon-plus.svg"
          alt=""
          width={16}
          height={16}
          style={{ height: 'auto' }}
        />
        <span>Add page</span>
      </button>
    </div>
  );
}