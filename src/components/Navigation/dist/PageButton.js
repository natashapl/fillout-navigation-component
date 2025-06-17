'use client';
"use strict";
exports.__esModule = true;
var image_1 = require("next/image");
function PageButton(_a) {
    var page = _a.page, isActive = _a.isActive, setActivePageId = _a.setActivePageId, addPageAfter = _a.addPageAfter, _b = _a.isEnding, isEnding = _b === void 0 ? false : _b, _c = _a.isLast, isLast = _c === void 0 ? false : _c, _d = _a.isDragging, isDragging = _d === void 0 ? false : _d;
    return (React.createElement("div", { className: "relative group flex items-center" },
        React.createElement("button", { onClick: function () { return setActivePageId(page.id); }, className: "flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-foreground text-[14px]/[20px] tracking-[-1.5%] cursor-pointer whitespace-nowrap focus:border focus:border-default-blue focus-visible:outline-2 focus-visible:outline-default-blue/25\n          " + (isActive ? 'bg-white border-active-orange' : 'bg-default-gray-bg/15 border-default-gray-bg/15 hover:default-medium-gray-bg') + "\n        " },
            React.createElement(image_1["default"], { src: isActive ? page.iconActive : page.iconInactive, alt: page.title + " icon", width: 20, height: 20 }),
            page.title,
            isActive && (React.createElement(image_1["default"], { src: "/icons/icon-menu.svg", alt: "", width: 16, height: 16, style: { height: 'auto' } }))),
        !isLast && !isEnding && !isDragging && (React.createElement(React.Fragment, null,
            React.createElement(image_1["default"], { src: "/icons//icon-divider.svg", alt: "", width: 20, height: 1.5, style: { height: 'auto' } }),
            React.createElement("button", { onClick: function () {
                    console.log('Clicked + for:', page.title);
                    addPageAfter(page.id);
                }, className: "w-9 h-4 hidden group-hover:inline-flex items-center justify-center transition cursor-pointer" },
                React.createElement(image_1["default"], { src: "/icons/icon-add-page.svg", alt: "", width: 36, height: 16, style: { height: 'auto' } }))))));
}
exports["default"] = PageButton;
