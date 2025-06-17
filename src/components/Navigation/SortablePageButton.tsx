'use client';

import { useSortable } from '@dnd-kit/sortable';
import Image from 'next/image';
import { PageButtonProps } from './types';
import ContextMenu from './ContextMenu';

export default function SortablePageButton(props: PageButtonProps) {
  const {
    page,
    isActive,
    setActivePageId,
    addPageAfter,
    isLast,
    onContextMenu,
    showContextMenu,
    onCloseContextMenu,
    onSetAsFirst,
    onRename,
    onCopy,
    onDuplicate,
    onDelete,
  } = props;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: page.id });


  const style = {
    translate: transform ? `${transform.x}px ${transform.y}px` : undefined,
    transition,
    zIndex: isDragging ? 50 : 'auto',
    opacity: 1, 
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (showContextMenu) {
      onCloseContextMenu?.();
    } else {
      onContextMenu?.(page.id, e);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group flex items-center ${
        isDragging ? 'scale-[1.02] shadow-lg' : ''
      }`}
    >
      <div
        className={`flex items-center rounded-lg border text-foreground text-[14px]/[20px] tracking-[-1.5%] whitespace-nowrap cursor-grab active:cursor-grabbing focus:border focus:border-default-blue focus-visible:outline-2 focus-visible:outline-default-blue/25
          ${isActive ? 'bg-white border-active-orange' : 'bg-default-light-gray-bg border-default-light-gray-bg hover:bg-default-medium-gray-bg pr-2.5'}
        `}
          {...attributes}
          {...listeners}
          onClick={() => setActivePageId(page.id)}

          style={{ touchAction: 'none' }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              if (isActive) {

                if (showContextMenu) {
                  onCloseContextMenu?.();
                } else {
                  const mockEvent = {
                    preventDefault: () => {},
                    stopPropagation: () => {},
                    clientX: 0,
                    clientY: 0,
                  } as React.MouseEvent;
                  onContextMenu?.(page.id, mockEvent);
                }
              } else {

                setActivePageId(page.id);
              }
            }
          }}
        >

        <div className="flex items-center pl-2.5 pr-1 py-1 overflow-hidden">
          <Image
            className="mr-1.5"
            src={isActive ? page.iconActive : page.iconInactive}
            alt={`${page.title} icon`}
            width={20}
            height={20}
          />
          <span>{page.title}</span>
        </div>
        
        {isActive && (
          <div
            onClick={handleContextMenu}
            className={`pl-1 py-1.5 pr-2.5 rounded-tr-lg rounded-br-lg transition-colors cursor-pointer focus:border focus:border-default-blue  focus-visible:outline-2 focus-visible:outline-default-blue/25 ${
              showContextMenu 
                ? 'bg-default-light-gray-bg' 
                : 'hover:bg-default-light-gray-bg'
            }`}
            role="button"
            data-menu-trigger="true"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();

                const mouseEvent = {
                  preventDefault: () => {},
                  stopPropagation: () => {},
                  clientX: 0,
                  clientY: 0,
                } as React.MouseEvent;
                
                if (showContextMenu) {
                  onCloseContextMenu?.();
                } else {
                  onContextMenu?.(page.id, mouseEvent);
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

      {!isLast && !isDragging && (
        <>
          <Image
            src="/icons/icon-divider.svg"
            alt=""
            width={20}
            height={1.5}
            style={{ height: 'auto' }}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log('Clicked + for:', page.title);
              addPageAfter(page.id);
            }}
            className="w-9 h-4 hidden group-hover:inline-flex items-center justify-center transition cursor-pointer hover:scale-110"
          >
            <Image
              src="/icons/icon-add-page.svg"
              alt="Add page after"
              width={36}
              height={16}
              style={{ height: 'auto' }}
            />
          </button>        
        </>
      )}

      {showContextMenu && (
        <div className="absolute top-full left-0 z-50 mt-1">
          <ContextMenu
            isOpen={true}
            onClose={onCloseContextMenu || (() => {})}
            onSetAsFirst={onSetAsFirst || (() => {})}
            onRename={onRename || (() => {})}
            onCopy={onCopy || (() => {})}
            onDuplicate={onDuplicate || (() => {})}
            onDelete={onDelete || (() => {})}
          />
        </div>
      )}
    </div>
  );
}