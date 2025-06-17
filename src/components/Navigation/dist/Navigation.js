'use client';
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var uuid_1 = require("uuid");
var image_1 = require("next/image");
var core_1 = require("@dnd-kit/core");
var sortable_1 = require("@dnd-kit/sortable");
var SortablePageButton_1 = require("./SortablePageButton");
var ContextMenu_1 = require("./ContextMenu");
var initialPages = [
    {
        id: '1',
        title: 'Info',
        iconActive: '/icons/icon-info-orange.svg',
        iconInactive: '/icons/icon-info-gray.svg'
    },
    {
        id: '2',
        title: 'Details',
        iconActive: '/icons/icon-page-orange.svg',
        iconInactive: '/icons/icon-page-gray.svg'
    },
    {
        id: '3',
        title: 'Other',
        iconActive: '/icons/icon-page-orange.svg',
        iconInactive: '/icons/icon-page-gray.svg'
    },
    {
        id: '4',
        title: 'Ending',
        iconActive: '/icons/icon-ending-orange.svg',
        iconInactive: '/icons/icon-ending-gray.svg'
    },
];
function Navigation() {
    var _a = react_1.useState(initialPages), pages = _a[0], setPages = _a[1];
    var _b = react_1.useState(pages[0].id), activePageId = _b[0], setActivePageId = _b[1];
    var _c = react_1.useState({
        isOpen: false,
        pageId: null
    }), contextMenu = _c[0], setContextMenu = _c[1];
    var sensors = core_1.useSensors(core_1.useSensor(core_1.PointerSensor, {
        activationConstraint: {
            distance: 8
        }
    }), core_1.useSensor(core_1.KeyboardSensor, {
        coordinateGetter: sortable_1.sortableKeyboardCoordinates
    }));
    var _d = react_1.useState(false), hasMounted = _d[0], setHasMounted = _d[1];
    react_1.useEffect(function () {
        setHasMounted(true);
    }, []);
    if (!hasMounted)
        return null;
    var sortablePages = pages.filter(function (p) { return p.title !== 'Ending'; });
    var newPageNumber = pages.filter(function (p) { return p.title.startsWith('New Page'); }).length + 1;
    // Context menu handlers
    var openContextMenu = function (pageId, event) {
        event.preventDefault();
        event.stopPropagation();
        setContextMenu({
            isOpen: true,
            pageId: pageId
        });
    };
    var closeContextMenu = function () {
        setContextMenu({
            isOpen: false,
            pageId: null
        });
    };
    var handleSetAsFirst = function () {
        if (!contextMenu.pageId)
            return;
        var pageIndex = pages.findIndex(function (p) { return p.id === contextMenu.pageId; });
        if (pageIndex === -1 || pageIndex === 0)
            return;
        var page = pages[pageIndex];
        var newPages = __spreadArrays([page], pages.filter(function (p) { return p.id !== contextMenu.pageId; }));
        setPages(newPages);
        setActivePageId(page.id);
    };
    var handleRename = function () {
        if (!contextMenu.pageId)
            return;
        var page = pages.find(function (p) { return p.id === contextMenu.pageId; });
        if (!page)
            return;
        var newName = prompt('Enter new page name:', page.title);
        if (newName && newName.trim()) {
            setPages(pages.map(function (p) {
                return p.id === contextMenu.pageId
                    ? __assign(__assign({}, p), { title: newName.trim() }) : p;
            }));
        }
    };
    var handleCopy = function () {
        if (!contextMenu.pageId)
            return;
        var page = pages.find(function (p) { return p.id === contextMenu.pageId; });
        if (!page)
            return;
        navigator.clipboard.writeText(page.title).then(function () {
            alert("Copied: " + page.title);
        });
    };
    var handleDuplicate = function () {
        if (!contextMenu.pageId)
            return;
        var pageIndex = pages.findIndex(function (p) { return p.id === contextMenu.pageId; });
        if (pageIndex === -1)
            return;
        var originalPage = pages[pageIndex];
        var duplicatedPage = __assign(__assign({}, originalPage), { id: uuid_1.v4(), title: originalPage.title + " (Copy)" });
        var newPages = __spreadArrays(pages.slice(0, pageIndex + 1), [
            duplicatedPage
        ], pages.slice(pageIndex + 1));
        setPages(newPages);
    };
    var handleDelete = function () {
        if (!contextMenu.pageId)
            return;
        var page = pages.find(function (p) { return p.id === contextMenu.pageId; });
        if (!page)
            return;
        if (pages.length <= 2 || page.title === 'Ending') {
            alert('Cannot delete this page');
            return;
        }
        var confirmDelete = confirm("Are you sure you want to delete \"" + page.title + "\"?");
        if (confirmDelete) {
            var newPages = pages.filter(function (p) { return p.id !== contextMenu.pageId; });
            setPages(newPages);
            if (activePageId === contextMenu.pageId) {
                setActivePageId(newPages[0].id);
            }
        }
    };
    var addPageAfter = function (afterId) {
        var index = pages.findIndex(function (p) { return p.id === afterId; });
        if (index === -1)
            return;
        var isAfterEnding = index === pages.length - 1 && pages[index].title === 'Ending';
        var insertIndex = isAfterEnding ? index : index + 1;
        var newPage = {
            id: uuid_1.v4(),
            title: "New Page " + newPageNumber,
            iconActive: '/icons/icon-page-orange.svg',
            iconInactive: '/icons/icon-page-gray.svg'
        };
        var updated = __spreadArrays(pages.slice(0, insertIndex), [
            newPage
        ], pages.slice(insertIndex));
        console.log('New pages:', updated);
        setPages(updated);
    };
    var addPageToEnd = function () {
        var newPage = {
            id: uuid_1.v4(),
            title: "New Page " + newPageNumber,
            iconActive: '/icons/icon-page-orange.svg',
            iconInactive: '/icons/icon-page-gray.svg'
        };
        var endingIndex = pages.findIndex(function (p) { return p.title === 'Ending'; });
        if (endingIndex !== -1) {
            var updated = __spreadArrays(pages.slice(0, endingIndex), [
                newPage
            ], pages.slice(endingIndex));
            setPages(updated);
        }
        else {
            setPages(function (prev) { return __spreadArrays(prev, [newPage]); });
        }
    };
    var handleDragEnd = function (event) {
        var _a, _b;
        var active = event.active, over = event.over;
        if (!over || active.id === over.id)
            return;
        var oldIndex = pages.findIndex(function (p) { return p.id === active.id; });
        var newIndex = pages.findIndex(function (p) { return p.id === over.id; });
        if (((_a = pages[oldIndex]) === null || _a === void 0 ? void 0 : _a.title) === 'Ending' ||
            ((_b = pages[newIndex]) === null || _b === void 0 ? void 0 : _b.title) === 'Ending') {
            return;
        }
        var reordered = sortable_1.arrayMove(pages, oldIndex, newIndex);
        setPages(reordered);
    };
    // Render ending page without drag functionality
    var renderEndingPage = function (page) { return (React.createElement("div", { key: page.id, className: "relative group flex items-center" },
        React.createElement("div", { className: "flex items-center rounded-lg border text-foreground text-[14px]/[20px] tracking-[-1.5%] whitespace-nowrap cursor-grab active:cursor-grabbing focus:border focus:border-default-blue focus-visible:outline-2 focus-visible:outline-default-blue/25\n          " + (page.id === activePageId ? 'bg-white border-active-orange' : 'bg-default-light-gray-bg border-default-light-gray-bg hover:bg-default-medium-gray-bg pr-2.5') + "\n        ", onClick: function () { return setActivePageId(page.id); }, tabIndex: 0, onKeyDown: function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (page.id === activePageId) {
                        // If this page is already active, open/close the menu
                        if (contextMenu.isOpen && contextMenu.pageId === page.id) {
                            closeContextMenu();
                        }
                        else {
                            var mockEvent = {
                                preventDefault: function () { },
                                stopPropagation: function () { },
                                clientX: 0,
                                clientY: 0
                            };
                            openContextMenu(page.id, mockEvent);
                        }
                    }
                    else {
                        // If this page is not active, just select it
                        setActivePageId(page.id);
                    }
                }
            } },
            React.createElement("div", { className: "flex items-center px-2.5 py-1 cursor-grab active:cursor-grabbing focus:border focus:border-default-blue focus-visible:outline-2 focus-visible:outline-default-blue/25 rounded", role: "button" },
                React.createElement(image_1["default"], { className: "mr-1.5", src: page.id === activePageId ? page.iconActive : page.iconInactive, alt: page.title + " icon", width: 20, height: 20 }),
                page.title),
            page.id === activePageId && (React.createElement("div", { onClick: function (e) {
                    e.stopPropagation();
                    if (contextMenu.isOpen && contextMenu.pageId === page.id) {
                        closeContextMenu();
                    }
                    else {
                        openContextMenu(page.id, e);
                    }
                }, className: "pr-2.5 py-1.5 rounded-tr-lg rounded-br-lg transition-colors cursor-pointer focus:border focus:border-default-blue focus-visible:outline-2 focus-visible:outline-default-blue/25  " + (contextMenu.isOpen && contextMenu.pageId === page.id
                    ? 'bg-default-light-gray-bg'
                    : 'hover:bg-default-light-gray-bg'), role: "button", "data-menu-trigger": "true", onKeyDown: function (e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        e.stopPropagation();
                        var mockEvent = {
                            preventDefault: function () { },
                            stopPropagation: function () { },
                            clientX: 0,
                            clientY: 0
                        };
                        if (contextMenu.isOpen && contextMenu.pageId === page.id) {
                            closeContextMenu();
                        }
                        else {
                            openContextMenu(page.id, mockEvent);
                        }
                    }
                } },
                React.createElement(image_1["default"], { src: "/icons/icon-menu.svg", alt: "Menu", width: 16, height: 16, style: { height: 'auto' } })))),
        contextMenu.isOpen && contextMenu.pageId === page.id && (React.createElement("div", { className: "absolute top-full left-0 z-50 mt-1" },
            React.createElement(ContextMenu_1["default"], { isOpen: true, onClose: closeContextMenu, onSetAsFirst: handleSetAsFirst, onRename: handleRename, onCopy: handleCopy, onDuplicate: handleDuplicate, onDelete: handleDelete }))))); };
    return (React.createElement("div", { className: "flex flex-wrap items-center gap-y-4 p-6 border rounded-md bg-white shadow-sm" },
        React.createElement(core_1.DndContext, { sensors: sensors, collisionDetection: core_1.closestCenter, onDragEnd: handleDragEnd },
            React.createElement(sortable_1.SortableContext, { items: sortablePages.map(function (p) { return p.id; }), strategy: sortable_1.verticalListSortingStrategy }, pages.map(function (page, idx) {
                return page.title === 'Ending' ? (renderEndingPage(page)) : (React.createElement(SortablePageButton_1["default"], { key: page.id, page: page, isActive: page.id === activePageId, setActivePageId: setActivePageId, addPageAfter: addPageAfter, isLast: idx === pages.length - 1, onContextMenu: openContextMenu, showContextMenu: contextMenu.isOpen && contextMenu.pageId === page.id, onCloseContextMenu: closeContextMenu, onSetAsFirst: handleSetAsFirst, onRename: handleRename, onCopy: handleCopy, onDuplicate: handleDuplicate, onDelete: handleDelete }));
            }))),
        React.createElement(image_1["default"], { src: "/icons/icon-divider.svg", alt: "", width: 20, height: 1.5, style: { height: 'auto' } }),
        React.createElement("button", { onClick: addPageToEnd, className: "flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-foreground text-[14px]/[20px] tracking-[-1.5%] cursor-pointer whitespace-nowrap border-light-gray hover:bg-default-medium-gray-bg focus:border focus:border-default-blue focus-visible:outline-2 focus-visible:outline-default-blue/25" },
            React.createElement(image_1["default"], { src: "/icons/icon-plus.svg", alt: "", width: 16, height: 16, style: { height: 'auto' } }),
            React.createElement("span", null, "Add page"))));
}
exports["default"] = Navigation;
