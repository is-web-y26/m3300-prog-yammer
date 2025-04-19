/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/base/animations/fade.ts":
/*!*************************************!*\
  !*** ./src/base/animations/fade.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   fadeIn: () => (/* binding */ fadeIn),\n/* harmony export */   fadeOut: () => (/* binding */ fadeOut)\n/* harmony export */ });\nfunction fadeIn(element, duration, onFinished) {\n    if (duration === void 0) { duration = 300; }\n    element.classList.add(\"fade-in-\".concat(duration));\n    element.style.opacity = '';\n    element.style.display = '';\n    setTimeout(function () {\n        element.style.opacity = '';\n        element.classList.remove(\"fade-in-\".concat(duration));\n        if (onFinished) {\n            onFinished();\n        }\n    }, duration - 20);\n}\nfunction fadeOut(element, duration, onFinished) {\n    if (duration === void 0) { duration = 300; }\n    element.classList.add(\"fade-out-\".concat(duration));\n    element.style.opacity = '';\n    setTimeout(function () {\n        element.style.opacity = '0';\n        element.classList.remove(\"fade-out-\".concat(duration));\n        if (onFinished) {\n            onFinished();\n        }\n    }, duration - 20);\n}\n\n\n//# sourceURL=webpack:///./src/base/animations/fade.ts?");

/***/ }),

/***/ "./src/base/index.ts":
/*!***************************!*\
  !*** ./src/base/index.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ui_navigation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui/navigation */ \"./src/base/ui/navigation.ts\");\n/* harmony import */ var _ui_header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui/header */ \"./src/base/ui/header.ts\");\n/* harmony import */ var _ui_background_images_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ui/background_images_controller */ \"./src/base/ui/background_images_controller.ts\");\n/* harmony import */ var _network_internal_link_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./network/internal_link_controller */ \"./src/base/network/internal_link_controller.ts\");\n/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/dom */ \"./src/base/utils/dom.ts\");\n/* harmony import */ var _utils_notice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/notice */ \"./src/base/utils/notice.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (undefined && undefined.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === \"function\" ? Iterator : Object).prototype);\n    return g.next = verb(0), g[\"throw\"] = verb(1), g[\"return\"] = verb(2), typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (g && (g = 0, op[0] && (_ = 0)), _) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\n\n\n\n\n\n\n(0,_utils_dom__WEBPACK_IMPORTED_MODULE_4__.executeOnReady)(function () { return __awaiter(void 0, void 0, void 0, function () {\n    var header, navigation, backgroundImagesController, internalLinkController;\n    return __generator(this, function (_a) {\n        header = new _ui_header__WEBPACK_IMPORTED_MODULE_1__.Header(document.querySelector('header'));\n        navigation = new _ui_navigation__WEBPACK_IMPORTED_MODULE_0__.Navigation(document.querySelector('.nav-switch'), document.querySelector('nav'));\n        backgroundImagesController = new _ui_background_images_controller__WEBPACK_IMPORTED_MODULE_2__.BackgroundImagesController(document.querySelector('.background-images'));\n        internalLinkController = new _network_internal_link_controller__WEBPACK_IMPORTED_MODULE_3__.InternalLinkController(navigation);\n        return [2 /*return*/];\n    });\n}); });\nfunction getPageLoadTime() {\n    var navigationEntries = performance.getEntriesByType('navigation');\n    var navigationEntry = navigationEntries[0];\n    return navigationEntry.domContentLoadedEventEnd - navigationEntry.startTime;\n}\nwindow.addEventListener('load', function () {\n    var loadTime = getPageLoadTime();\n    (0,_utils_notice__WEBPACK_IMPORTED_MODULE_5__.noticeSuccess)(\"\".concat(Math.round(loadTime), \" \\u043C\\u0441\"));\n});\n\n\n//# sourceURL=webpack:///./src/base/index.ts?");

/***/ }),

/***/ "./src/base/network/internal_link_controller.ts":
/*!******************************************************!*\
  !*** ./src/base/network/internal_link_controller.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   InternalLinkController: () => (/* binding */ InternalLinkController)\n/* harmony export */ });\n/* harmony import */ var _request_response__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./request_response */ \"./src/base/network/request_response.ts\");\n/* harmony import */ var _animations_fade__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../animations/fade */ \"./src/base/animations/fade.ts\");\n\n\nvar InternalLinkController = /** @class */ (function () {\n    function InternalLinkController(navigation) {\n        var _this = this;\n        this._link_handler = function (event) {\n            var link = event.currentTarget;\n            var url = new URL(link.href);\n            if (url.host == window.location.host) {\n                event.preventDefault();\n            }\n            _this.go(link.href);\n        };\n        this._navigation = navigation;\n        this._request = new _request_response__WEBPACK_IMPORTED_MODULE_0__.RequestResponse(true);\n        window.onpopstate = function (e) {\n            _this.go(window.location.href, false);\n        };\n        this.update();\n    }\n    InternalLinkController.prototype.update = function () {\n        var _this = this;\n        document.querySelectorAll('a').forEach(function (link) {\n            link.removeEventListener('click', _this._link_handler);\n            link.addEventListener('click', _this._link_handler);\n        });\n    };\n    InternalLinkController.prototype.go = function (href, pushState) {\n        var _this = this;\n        if (pushState === void 0) { pushState = true; }\n        var url = new URL(href);\n        if (url.host != window.location.host) {\n            return;\n        }\n        if (pushState && url.href == window.location.href) {\n            window.scroll({\n                top: 0,\n                left: 0,\n                behavior: 'smooth',\n            });\n            return;\n        }\n        this._request.fetch(href)\n            .then(function (data) {\n            if (data == null) {\n                return;\n            }\n            _this._navigation.close(true);\n            if (pushState) {\n                history.pushState({}, '', href);\n            }\n            document.querySelector('title').text = data.title;\n            document.querySelector('.header__title').textContent = data.title;\n            var mainElement = document.querySelector('main');\n            (0,_animations_fade__WEBPACK_IMPORTED_MODULE_1__.fadeOut)(mainElement, 100, function () {\n                mainElement.innerHTML = data.main;\n                window.scroll({ left: 0, top: 0 });\n                var scriptTags = mainElement.getElementsByTagName('script');\n                Array.from(scriptTags).forEach(function (oldScriptTag) {\n                    var newScriptTag = document.createElement('script');\n                    if (oldScriptTag.src) {\n                        newScriptTag.src = oldScriptTag.src;\n                    }\n                    else {\n                        newScriptTag.textContent = oldScriptTag.textContent;\n                    }\n                    document.body.appendChild(newScriptTag);\n                    newScriptTag.onload = function () { return document.body.removeChild(newScriptTag); };\n                });\n                _this.update();\n                (0,_animations_fade__WEBPACK_IMPORTED_MODULE_1__.fadeIn)(mainElement, 100);\n            });\n        });\n    };\n    return InternalLinkController;\n}());\n\n\n\n//# sourceURL=webpack:///./src/base/network/internal_link_controller.ts?");

/***/ }),

/***/ "./src/base/network/request_response.ts":
/*!**********************************************!*\
  !*** ./src/base/network/request_response.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   RequestResponse: () => (/* binding */ RequestResponse)\n/* harmony export */ });\n/* harmony import */ var _utils_progress_bar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/progress_bar */ \"./src/base/utils/progress_bar.ts\");\n/* harmony import */ var _utils_notice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/notice */ \"./src/base/utils/notice.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (undefined && undefined.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === \"function\" ? Iterator : Object).prototype);\n    return g.next = verb(0), g[\"throw\"] = verb(1), g[\"return\"] = verb(2), typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (g && (g = 0, op[0] && (_ = 0)), _) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\n\n\nvar RequestResponse = /** @class */ (function () {\n    function RequestResponse(useProgressBar, method) {\n        if (useProgressBar === void 0) { useProgressBar = true; }\n        if (method === void 0) { method = 'POST'; }\n        this._method = method;\n        if (useProgressBar) {\n            this._progressBar = new _utils_progress_bar__WEBPACK_IMPORTED_MODULE_0__.ProgressBar();\n        }\n        this._abortController = new AbortController();\n    }\n    RequestResponse.prototype.fetchData = function (url, data) {\n        return __awaiter(this, void 0, void 0, function () {\n            var response, contentLength, total, reader, receivedLength, chunks, _a, done, value, percentComplete, fullData, position, _i, chunks_1, chunk, jsonString, error_1;\n            var _b, _c, _d;\n            return __generator(this, function (_e) {\n                switch (_e.label) {\n                    case 0:\n                        _e.trys.push([0, 5, , 6]);\n                        return [4 /*yield*/, fetch(url, {\n                                method: this._method,\n                                headers: {\n                                    'Content-Type': 'application/json'\n                                },\n                                body: (data ? JSON.stringify(data) : null),\n                                signal: this._abortController.signal,\n                            })];\n                    case 1:\n                        response = _e.sent();\n                        if (!response.ok || !response.body) {\n                            throw new Error(\"HTTP error! status: \".concat(response.status)); // TODO\n                        }\n                        (_b = this._progressBar) === null || _b === void 0 ? void 0 : _b.start();\n                        contentLength = response.headers.get('Content-Length');\n                        total = contentLength ? parseInt(contentLength, 10) : 0;\n                        reader = response.body.getReader();\n                        receivedLength = 0;\n                        chunks = [];\n                        _e.label = 2;\n                    case 2:\n                        if (false) {}\n                        return [4 /*yield*/, reader.read()];\n                    case 3:\n                        _a = _e.sent(), done = _a.done, value = _a.value;\n                        if (done) {\n                            return [3 /*break*/, 4];\n                        }\n                        chunks.push(value);\n                        receivedLength += value.length;\n                        if (total) {\n                            percentComplete = (receivedLength / total) * 100;\n                            (_c = this._progressBar) === null || _c === void 0 ? void 0 : _c.setProgress(percentComplete);\n                        }\n                        else {\n                            // TODO\n                        }\n                        return [3 /*break*/, 2];\n                    case 4:\n                        fullData = new Uint8Array(receivedLength);\n                        position = 0;\n                        for (_i = 0, chunks_1 = chunks; _i < chunks_1.length; _i++) {\n                            chunk = chunks_1[_i];\n                            fullData.set(chunk, position);\n                            position += chunk.length;\n                        }\n                        jsonString = new TextDecoder(\"utf-8\").decode(fullData);\n                        return [2 /*return*/, JSON.parse(jsonString)];\n                    case 5:\n                        error_1 = _e.sent();\n                        (_d = this._progressBar) === null || _d === void 0 ? void 0 : _d.stop();\n                        if (error_1.name === 'AbortError') {\n                            console.log('Fetch aborted');\n                        }\n                        else {\n                            console.error('Error:', error_1);\n                            (0,_utils_notice__WEBPACK_IMPORTED_MODULE_1__.noticeError)('Что-то пошло не так');\n                        }\n                        return [2 /*return*/, null];\n                    case 6: return [2 /*return*/];\n                }\n            });\n        });\n    };\n    RequestResponse.prototype.fetch = function (url) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0: return [4 /*yield*/, this.fetchData(url, null)];\n                    case 1: return [2 /*return*/, _a.sent()];\n                }\n            });\n        });\n    };\n    RequestResponse.prototype.cancel = function () {\n        if (this._abortController) {\n            this._abortController.abort();\n        }\n    };\n    return RequestResponse;\n}());\n\n\n\n//# sourceURL=webpack:///./src/base/network/request_response.ts?");

/***/ }),

/***/ "./src/base/ui/background_images_controller.ts":
/*!*****************************************************!*\
  !*** ./src/base/ui/background_images_controller.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   BackgroundImagesController: () => (/* binding */ BackgroundImagesController)\n/* harmony export */ });\nvar BACKGROUND_IMAGE_ACTIVE_CLASS = \"background-image--active\";\nvar BACKGROUND_IMAGE_ANIMATE_CLASS = \"background-image--animate\";\nvar FADE_DURATION = 300;\nvar BackgroundImagesController = /** @class */ (function () {\n    function BackgroundImagesController(imagesElement, duration) {\n        if (duration === void 0) { duration = 9000; }\n        var _this = this;\n        this._slideShow = function () {\n            var nextImageIndex = (_this._activeImageIndex + 1) % _this.count;\n            var curImage = _this._imageElements[_this._activeImageIndex];\n            var nextImage = _this._imageElements[nextImageIndex];\n            nextImage.classList.add(BACKGROUND_IMAGE_ANIMATE_CLASS);\n            curImage.style.opacity = '0';\n            nextImage.style.opacity = '1';\n            _this._activeImageIndex = nextImageIndex;\n            setTimeout(function () {\n                nextImage.classList.add(BACKGROUND_IMAGE_ACTIVE_CLASS);\n                curImage.classList.remove(BACKGROUND_IMAGE_ACTIVE_CLASS);\n                curImage.classList.remove(BACKGROUND_IMAGE_ANIMATE_CLASS);\n            }, FADE_DURATION);\n        };\n        this._activeImageIndex = 0;\n        this._imageElements = imagesElement.querySelectorAll('img');\n        this.count = this._imageElements.length;\n        setInterval(this._slideShow, duration - FADE_DURATION);\n    }\n    return BackgroundImagesController;\n}());\n\n\n\n//# sourceURL=webpack:///./src/base/ui/background_images_controller.ts?");

/***/ }),

/***/ "./src/base/ui/header.ts":
/*!*******************************!*\
  !*** ./src/base/ui/header.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Header: () => (/* binding */ Header)\n/* harmony export */ });\nvar NAV_DARK_CLASS = 'header--dark';\nvar Header = /** @class */ (function () {\n    function Header(headerElement) {\n        var _this = this;\n        this._headerElement = headerElement;\n        window.addEventListener(\"scroll\", function () {\n            if (window.scrollY === 0) {\n                _this._headerElement.classList.remove(NAV_DARK_CLASS);\n            }\n            else {\n                _this._headerElement.classList.add(NAV_DARK_CLASS);\n            }\n        });\n    }\n    return Header;\n}());\n\n\n\n//# sourceURL=webpack:///./src/base/ui/header.ts?");

/***/ }),

/***/ "./src/base/ui/navigation.ts":
/*!***********************************!*\
  !*** ./src/base/ui/navigation.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Navigation: () => (/* binding */ Navigation)\n/* harmony export */ });\nvar SWITCH_OPEN_CLASS = 'nav-switch--open';\nvar NAV_ACTIVE_CLASS = 'nav--active';\nvar Navigation = /** @class */ (function () {\n    function Navigation(switchElement, menuElement) {\n        var _this = this;\n        this._switchElement = switchElement;\n        this._menuElement = menuElement;\n        this._links = this._menuElement.querySelectorAll('a');\n        this._isOpen = this._switchElement.classList.contains(SWITCH_OPEN_CLASS);\n        this._switchElement.addEventListener('click', function () {\n            _this.toggle();\n        });\n    }\n    Navigation.prototype.toggle = function () {\n        this._isOpen = this._switchElement.classList.toggle(SWITCH_OPEN_CLASS);\n        if (this._isOpen) {\n            this._menuElement.classList.add(NAV_ACTIVE_CLASS);\n        }\n        else {\n            this._menuElement.classList.remove(NAV_ACTIVE_CLASS);\n        }\n    };\n    Navigation.prototype.open = function () {\n        if (!this._isOpen) {\n            this.toggle();\n        }\n    };\n    Navigation.prototype.close = function (update) {\n        if (update === void 0) { update = false; }\n        if (this._isOpen) {\n            this.toggle();\n            if (update) {\n                setTimeout(this._updateState, 400, this._links);\n            }\n        }\n        if (update) {\n            this._updateState(this._links);\n        }\n    };\n    Navigation.prototype._updateState = function (links) {\n        links.forEach(function (item) {\n            if (item.href == window.location.href) {\n                item.classList.add('nav__link--active');\n            }\n            else {\n                item.classList.remove('nav__link--active');\n            }\n        });\n    };\n    return Navigation;\n}());\n\n\n\n//# sourceURL=webpack:///./src/base/ui/navigation.ts?");

/***/ }),

/***/ "./src/base/utils/dom.ts":
/*!*******************************!*\
  !*** ./src/base/utils/dom.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   executeOnReady: () => (/* binding */ executeOnReady)\n/* harmony export */ });\nfunction executeOnReady(fn) {\n    if (document.readyState === 'loading') {\n        document.addEventListener('DOMContentLoaded', fn);\n    }\n    else {\n        fn();\n    }\n}\nwindow.executeOnReady = executeOnReady;\n\n\n//# sourceURL=webpack:///./src/base/utils/dom.ts?");

/***/ }),

/***/ "./src/base/utils/notice.ts":
/*!**********************************!*\
  !*** ./src/base/utils/notice.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   noticeError: () => (/* binding */ noticeError),\n/* harmony export */   noticeSuccess: () => (/* binding */ noticeSuccess),\n/* harmony export */   noticeWarning: () => (/* binding */ noticeWarning)\n/* harmony export */ });\n/* harmony import */ var _animations_fade__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animations/fade */ \"./src/base/animations/fade.ts\");\n\nfunction notice(text, mode) {\n    var div = document.createElement('div');\n    div.style.display = 'none';\n    div.classList.add('toast');\n    div.classList.add(\"toast-\".concat(mode));\n    div.innerHTML = \"<div class=\\\"toast__icon\\\"></div><p class=\\\"toast__text\\\">\".concat(text, \"</p></div>\");\n    document.querySelector('.notices').appendChild(div);\n    (0,_animations_fade__WEBPACK_IMPORTED_MODULE_0__.fadeIn)(div, 300);\n    setTimeout(function () {\n        (0,_animations_fade__WEBPACK_IMPORTED_MODULE_0__.fadeOut)(div, 300, function () {\n            document.querySelector('.notices').removeChild(div);\n        });\n    }, 2500);\n}\nfunction noticeSuccess(text) {\n    notice(text, 'success');\n}\nfunction noticeWarning(text) {\n    notice(text, 'warning');\n}\nfunction noticeError(text) {\n    notice(text, 'error');\n}\n\n\n//# sourceURL=webpack:///./src/base/utils/notice.ts?");

/***/ }),

/***/ "./src/base/utils/progress_bar.ts":
/*!****************************************!*\
  !*** ./src/base/utils/progress_bar.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ProgressBar: () => (/* binding */ ProgressBar)\n/* harmony export */ });\n/* harmony import */ var _animations_fade__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animations/fade */ \"./src/base/animations/fade.ts\");\n\nvar ProgressBar = /** @class */ (function () {\n    function ProgressBar() {\n        this._progress = 0;\n        this._element = document.querySelector('.progress-bar');\n    }\n    ProgressBar.prototype.start = function () {\n        this._progress = 0;\n        this._element.style.display = 'block';\n    };\n    ProgressBar.prototype.setProgress = function (progress) {\n        var _this = this;\n        if (progress < this._progress) {\n            return;\n        }\n        this._progress = progress;\n        this._element.style.width = \"\".concat(progress, \"%\");\n        if (progress >= 100) {\n            setTimeout(function () {\n                (0,_animations_fade__WEBPACK_IMPORTED_MODULE_0__.fadeOut)(_this._element, 300, function () {\n                    _this.stop();\n                });\n            }, 100);\n        }\n    };\n    ProgressBar.prototype.stop = function () {\n        this._progress = 0;\n        this._element.removeAttribute('style');\n    };\n    return ProgressBar;\n}());\n\n\n\n//# sourceURL=webpack:///./src/base/utils/progress_bar.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/base/index.ts");
/******/ 	
/******/ })()
;