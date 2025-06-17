'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
function ContextMenu(_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose, onSetAsFirst = _a.onSetAsFirst, onRename = _a.onRename, onCopy = _a.onCopy, onDuplicate = _a.onDuplicate, onDelete = _a.onDelete;
    var menuRef = react_1.useRef(null);
    react_1.useEffect(function () {
        if (!isOpen)
            return;
        var handleClickOutside = function (event) {
            // Check if the click target has the menu trigger attribute
            var target = event.target;
            var isMenuTrigger = target.closest('[data-menu-trigger="true"]');
            if (isMenuTrigger) {
                // Don't close if clicking on a menu trigger - let the toggle handle it
                return;
            }
            if (menuRef.current && !menuRef.current.contains(target)) {
                onClose();
            }
        };
        var handleEscape = function (event) {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        // Use a small delay to ensure the menu is rendered before adding listeners
        var timeoutId = setTimeout(function () {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
        }, 0);
        return function () {
            clearTimeout(timeoutId);
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);
    if (!isOpen)
        return null;
    var menuItems = [
        {
            icon: '/icons/icon-first-page.svg',
            label: 'Set as first page',
            onClick: onSetAsFirst,
            color: 'text-blue-600'
        },
        {
            icon: '/icons/icon-rename.svg',
            label: 'Rename',
            onClick: onRename,
            color: 'text-gray-700'
        },
        {
            icon: '/icons/icon-copy.svg',
            label: 'Copy',
            onClick: onCopy,
            color: 'text-gray-700'
        },
        {
            icon: '/icons/icon-duplicate.svg',
            label: 'Duplicate',
            onClick: onDuplicate,
            color: 'text-gray-700'
        },
        {
            icon: '/icons/icon-delete.svg',
            label: 'Delete',
            onClick: onDelete,
            color: 'text-red-600'
        },
    ];
    return (React.createElement("div", { ref: menuRef, className: "bg-white rounded-xl shadow-lg border border-light-gray pb-2 w-[240px] overflow-hidden" },
        React.createElement("div", { className: "p-3 text-base/24px font-medium bg-[#fafbfc] border-b border-light-gray" }, "Settings"),
        menuItems.map(function (item, index) { return (React.createElement("button", { key: index, onClick: function () {
                item.onClick();
                onClose();
            }, className: "w-full flex items-center gap-3 px-3 py-[7px] text-sm/16px hover:bg-default-light-gray-bg transition-colors " + item.color },
            React.createElement(image_1["default"], { src: item.icon, alt: "", width: 16, height: 16, className: "flex-shrink-0" }),
            item.label)); })));
}
exports["default"] = ContextMenu;
