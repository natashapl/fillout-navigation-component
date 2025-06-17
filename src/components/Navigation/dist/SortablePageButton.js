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
exports.__esModule = true;
var sortable_1 = require("@dnd-kit/sortable");
var image_1 = require("next/image");
var ContextMenu_1 = require("./ContextMenu");
function SortablePageButton(props) {
    var page = props.page, isActive = props.isActive, setActivePageId = props.setActivePageId, addPageAfter = props.addPageAfter, isLast = props.isLast, onContextMenu = props.onContextMenu, showContextMenu = props.showContextMenu, onCloseContextMenu = props.onCloseContextMenu, onSetAsFirst = props.onSetAsFirst, onRename = props.onRename, onCopy = props.onCopy, onDuplicate = props.onDuplicate, onDelete = props.onDelete;
    var _a = sortable_1.useSortable({ id: page.id }), attributes = _a.attributes, listeners = _a.listeners, setNodeRef = _a.setNodeRef, transform = _a.transform, transition = _a.transition, isDragging = _a.isDragging;
    var style = {
        translate: transform ? transform.x + "px " + transform.y + "px" : undefined,
        transition: transition,
        zIndex: isDragging ? 50 : 'auto',
        opacity: 1
    };
    var handleContextMenu = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (showContextMenu) {
            onCloseContextMenu === null || onCloseContextMenu === void 0 ? void 0 : onCloseContextMenu();
        }
        else {
            onContextMenu === null || onContextMenu === void 0 ? void 0 : onContextMenu(page.id, e);
        }
    };
    return (React.createElement("div", { ref: setNodeRef, style: style, className: "relative group flex items-center " + (isDragging ? 'scale-[1.02] shadow-lg' : '') },
        React.createElement("div", __assign({ className: "flex items-center rounded-lg border text-foreground text-[14px]/[20px] tracking-[-1.5%] whitespace-nowrap cursor-grab active:cursor-grabbing focus:border focus:border-default-blue focus-visible:outline-2 focus-visible:outline-default-blue/25\n          " + (isActive ? 'bg-white border-active-orange' : 'bg-default-light-gray-bg border-default-light-gray-bg hover:bg-default-medium-gray-bg pr-2.5') + "\n        " }, attributes, listeners, { onClick: function () { return setActivePageId(page.id); }, style: { touchAction: 'none' }, role: "button", tabIndex: 0, onKeyDown: function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (isActive) {
                        if (showContextMenu) {
                            onCloseContextMenu === null || onCloseContextMenu === void 0 ? void 0 : onCloseContextMenu();
                        }
                        else {
                            var mockEvent = {
                                preventDefault: function () { },
                                stopPropagation: function () { },
                                clientX: 0,
                                clientY: 0
                            };
                            onContextMenu === null || onContextMenu === void 0 ? void 0 : onContextMenu(page.id, mockEvent);
                        }
                    }
                    else {
                        setActivePageId(page.id);
                    }
                }
            } }),
            React.createElement("div", { className: "flex items-center pl-2.5 pr-1 py-1 overflow-hidden" },
                React.createElement(image_1["default"], { className: "mr-1.5", src: isActive ? page.iconActive : page.iconInactive, alt: page.title + " icon", width: 20, height: 20 }),
                React.createElement("span", null, page.title)),
            isActive && (React.createElement("div", { onClick: handleContextMenu, className: "pl-1 py-1.5 pr-2.5 rounded-tr-lg rounded-br-lg transition-colors cursor-pointer focus:border focus:border-default-blue  focus-visible:outline-2 focus-visible:outline-default-blue/25 " + (showContextMenu
                    ? 'bg-default-light-gray-bg'
                    : 'hover:bg-default-light-gray-bg'), role: "button", "data-menu-trigger": "true", onKeyDown: function (e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        e.stopPropagation();
                        var mouseEvent = {
                            preventDefault: function () { },
                            stopPropagation: function () { },
                            clientX: 0,
                            clientY: 0
                        };
                        if (showContextMenu) {
                            onCloseContextMenu === null || onCloseContextMenu === void 0 ? void 0 : onCloseContextMenu();
                        }
                        else {
                            onContextMenu === null || onContextMenu === void 0 ? void 0 : onContextMenu(page.id, mouseEvent);
                        }
                    }
                } },
                React.createElement(image_1["default"], { src: "/icons/icon-menu.svg", alt: "Menu", width: 16, height: 16, style: { height: 'auto' } })))),
        !isLast && !isDragging && (React.createElement(React.Fragment, null,
            React.createElement(image_1["default"], { src: "/icons/icon-divider.svg", alt: "", width: 20, height: 1.5, style: { height: 'auto' } }),
            React.createElement("button", { onClick: function (e) {
                    e.stopPropagation();
                    console.log('Clicked + for:', page.title);
                    addPageAfter(page.id);
                }, className: "w-9 h-4 hidden group-hover:inline-flex items-center justify-center transition cursor-pointer hover:scale-110" },
                React.createElement(image_1["default"], { src: "/icons/icon-add-page.svg", alt: "Add page after", width: 36, height: 16, style: { height: 'auto' } })))),
        showContextMenu && (React.createElement("div", { className: "absolute top-full left-0 z-50 mt-1" },
            React.createElement(ContextMenu_1["default"], { isOpen: true, onClose: onCloseContextMenu || (function () { }), onSetAsFirst: onSetAsFirst || (function () { }), onRename: onRename || (function () { }), onCopy: onCopy || (function () { }), onDuplicate: onDuplicate || (function () { }), onDelete: onDelete || (function () { }) })))));
}
exports["default"] = SortablePageButton;
