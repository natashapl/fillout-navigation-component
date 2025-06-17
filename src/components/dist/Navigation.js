'use client';
"use strict";
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
    var addPageAfter = function (afterId) {
        var _a;
        var index = pages.findIndex(function (p) { return p.id === afterId; });
        // Prevent adding a page after "Ending"
        if (((_a = pages[index]) === null || _a === void 0 ? void 0 : _a.title) === 'Ending')
            return;
        var newPage = {
            id: uuid_1.v4(),
            title: 'New Page',
            iconActive: '/icons/icon-page-orange.svg',
            iconInactive: '/icons/icon-page-gray.svg'
        };
        var updated = __spreadArrays(pages.slice(0, index + 1), [
            newPage
        ], pages.slice(index + 1));
        setPages(updated);
    };
    var addPageToEnd = function () {
        var newPage = {
            id: uuid_1.v4(),
            title: 'New Page',
            iconActive: '/icons/icon-page-orange.svg',
            iconInactive: '/icons/icon-page-gray.svg'
        };
        var endingIndex = pages.findIndex(function (p) { return p.title === 'Ending'; });
        if (endingIndex !== -1) {
            // Insert before Ending
            var updated = __spreadArrays(pages.slice(0, endingIndex), [
                newPage
            ], pages.slice(endingIndex));
            setPages(updated);
        }
        else {
            // No Ending page found, just add to the end
            setPages(function (prev) { return __spreadArrays(prev, [newPage]); });
        }
    };
    return (React.createElement("div", { className: "flex flex-wrap items-center p-6 border rounded-md bg-white shadow-sm" },
        pages.map(function (page, idx) { return (React.createElement("div", { key: page.id, className: "relative group flex items-center" },
            React.createElement("button", { onClick: function () { return setActivePageId(page.id); }, className: "flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-foreground text-[14px]/[20px] tracking-[-1.5%] cursor-pointer whitespace-nowrap mb-2 focus:border focus:border-default-blue focus-visible:outline-2 focus-visible:outline-default-blue/25\n              " + (page.id === activePageId
                    ? 'border-active-orange'
                    : 'bg-default-gray-bg/15 border-default-gray-bg/15 hover:default-medium-gray-bg') + "\n            " },
                React.createElement(image_1["default"], { src: page.id === activePageId ? page.iconActive : page.iconInactive, alt: page.title + " icon", width: 20, height: 20 }),
                page.title,
                page.id === activePageId && (React.createElement(image_1["default"], { src: "/icons/icon-menu.svg", alt: "Context Menu", width: 16, height: 16 }))),
            React.createElement(image_1["default"], { className: "mb-2", src: "/icons/icon-divider.svg", alt: "", width: 20, height: 1.5 }),
            idx < pages.length - 1 && pages[idx].title !== 'Ending' && (React.createElement("button", { onClick: function () { return addPageAfter(page.id); }, className: "w-9 h-4 mb-2 hidden group-hover:inline-flex items-center justify-center transition cursor-pointer" },
                React.createElement(image_1["default"], { src: "/icons/icon-add-page.svg", alt: "", width: 36, height: 16 }))))); }),
        React.createElement("button", { onClick: addPageToEnd, className: "flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-foreground text-[14px]/[20px] tracking-[-1.5%] cursor-pointer whitespace-nowrap border-light-gray hover:default-medium-gray-bg mb-2" },
            React.createElement(image_1["default"], { src: "/icons/icon-plus.svg", alt: "", width: 16, height: 16 }),
            React.createElement("span", null, "Add page"))));
}
exports["default"] = Navigation;
