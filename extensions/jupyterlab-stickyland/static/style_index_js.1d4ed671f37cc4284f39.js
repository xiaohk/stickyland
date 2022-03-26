"use strict";
(self["webpackChunkjupyterlab_stickyland"] = self["webpackChunkjupyterlab_stickyland"] || []).push([["style_index_js"],{

/***/ "./node_modules/css-loader/dist/cjs.js!./style/base.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./style/base.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.sticky-button.jp-Button.minimal .jp-Icon {\n  color: var(--jp-inverse-layout-color3);\n}\n\n.sticky-container {\n  position: absolute;\n  z-index: 5;\n  right: 0px;\n  opacity: 0.97;\n\n  border-top-left-radius: 5px;\n  border-bottom-left-radius: 5px;\n\n  box-shadow: -1px 1px 3px hsla(0, 0%, 0%, 0.15),\n  -1px 1px 20px hsla(0, 0%, 0%, 0.1);\n  width: 300px;\n  height: 300px;\n\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  overflow: hidden;\n\n  --sticky-header-height: 10px;\n  --sticky-tab-height: 25px;\n}\n\n.svg-icon {\n  display: flex;\n  align-content: center;\n  justify-content: center;\n  height: 1em;\n  width: 1em;\n}\n\n.svg-icon svg {\n  height: 100%;\n  width: 100%;\n}\n\n.sticky-container .button {\n  color: var(--jp-ui-font-color0);\n  background-color: var(--jp-layout-color1);\n  cursor: pointer;\n\n  padding: 0px 5px;\n  text-align: center;\n  white-space: nowrap;\n  border-radius: .375em;\n  box-shadow: none;\n\n  display: inline-flex;\n  justify-content: flex-start;\n  align-items: center;\n  position: relative;\n}\n\n.sticky-container .button:hover {\n  border-color: hsl(0, 0%, 71%);\n}\n\n.sticky-container .button:active {\n  border-color: hsl(0, 0%, 40%);\n  background-color: var(--md-grey-100);\n}\n\n.sticky-tab-bar {\n  /* height: var(--sticky-tab-height); */\n  width: 100%;\n  opacity: 1;\n  background-color: var(--jp-layout-color3);\n  border-bottom: var(--jp-border-width) solid var(--jp-border-color1);\n  /* Create a white border effect of the current tab */\n  overflow: visible;\n\n  display: flex;\n  flex-direction: row;\n  align-items: flex-end;\n}\n\n.sticky-tab button.new-tab {\n  flex: 0 1 60px;\n}\n\n.sticky-tab button.current {\n  background: var(--jp-layout-color1);\n  color: var(--jp-ui-font-color0);\n\n  margin-left: 0;\n  text-align: left;\n  min-width: 40px;\n\n  border-top: 2px solid #1976D2;\n  border-radius: 0;\n\n  position: relative;\n  overflow: hidden;\n  touch-action: none;\n\n  /* Create a white border effect */\n  line-height: 21px;\n  min-height: 21px;\n  transform: translateY(var(--jp-border-width));\n  z-index: 2;\n}\n\n.sticky-tab button.add-tab {\n  flex: 0 0 16px;\n  padding: 2px 4px 0 4px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n\n  min-height: 20px;\n}\n\n.sticky-tab button.add-tab svg{\n  fill: var(--jp-inverse-layout-color3);\n  color: var(--jp-inverse-layout-color3);\n  display: block;\n  height: 16px;\n  width: 16px;\n  margin: 0 auto;\n}\n\n.sticky-tab button {\n  background: var(--jp-layout-color2);\n  color: var(--jp-ui-font-color0);\n  margin: 0;\n  text-align: left;\n  min-width: 0px;\n  padding: 0px 5px;\n\n  line-height: 22px;\n  min-height: 22px;\n\n  border: var(--jp-border-width) solid var(--jp-border-color1);\n  border-bottom: none;\n  border-left: none;\n  border-radius: 0;\n\n  /* Dynamic width */\n  flex: 0 1 95px;\n  overflow: hidden;\n\n  position: relative;\n  touch-action: none;\n}\n\n.sticky-tab button:hover {\n  background: var(--jp-layout-color1);\n}\n\n.sticky-header {\n  height: var(--sticky-header-height);\n  flex: 1 0 auto;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  background-color: var(--jp-layout-color3);\n  cursor: move;\n}\n\n.sticky-header svg {\n  fill: var(--md-grey-200);\n  color: var(--md-grey-200);\n  display: block;\n  width: 20px;\n  padding: 1px 0 0 0;\n}\n\n.sticky-content {\n  height: calc(100% - var(--sticky-header-height) - var(--sticky-tab-height));\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: center;\n  z-index: 1;\n}\n\n.sticky-content .header {\n  display: flex;\n  width: 100%;\n}\n\n.sticky-content .content {\n  flex-grow: 1;\n  width: 100%;\n  background-color: var(--jp-layout-color1);\n  padding-bottom: 5px;\n\n  display: flex;\n  justify-content: center;\n  align-items: stretch;\n  overflow: scroll;\n}\n\n.sticky-content .CodeMirror.cm-s-jupyter {\n  background: transparent;\n}\n\n.sticky-tab .tab {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n\n.tab-label {\n  font-size: 13px;\n  overflow: hidden;\n  white-space: nowrap;\n  flex: 1 1 auto;\n}\n\n.tab.new-update .tab-label {\n  color: var(--md-green-600);\n}\n\n.tab-icon {\n  flex: 0 0 auto;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.tab-icon svg {\n  width: 14px;\n  height: 14px;\n}\n\n.tab-icon .x-icon[fill] {\n  fill: #616161;\n}\n\n.tab-icon .x-icon-circle[fill] {\n  fill: none;\n}\n\n.tab-icon:hover .x-icon {\n  fill: #fff;\n}\n\n.tab-icon:hover .x-icon-circle {\n  fill: rgba(0, 0, 0, 0.75);\n}\n\n.sticky-container .resize-handle {\n  position: absolute;\n  bottom: 0px;\n  left: 0px;\n  width: 20px;\n  height: 20px;\n  cursor: nesw-resize;\n  overflow: hidden;\n  z-index: 5;\n}\n\n/* Fake the think white border surrounding the lines */\n.sticky-container .resize-handle::after {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  border: 1px solid var(--jp-layout-color1);\n  content: '';\n  bottom: 0px;\n  left: 0px;\n}\n\n/* Fake the resize lines */\n.sticky-container .resize-handle .line {\n  position: absolute;\n  border-bottom: 1px solid var(--md-grey-800);\n  width: 37px;\n  height: 37px;\n}\n\n.sticky-container .resize-handle .line-1 {\n  transform: translateY(-11px) rotate(45deg);\n}\n\n.sticky-container .resize-handle .line-2 {\n  transform: translateY(-16px) rotate(45deg);\n}\n\n.sticky-container .resize-handle .line-3 {\n  transform: translateY(-21px) rotate(45deg);\n}\n\n.cursor-mask {\n  width: 100vw;\n  height: 100vh;\n  position: absolute;\n  background-color: hsla(0, 0%, 0%, 0);\n  z-index: 4;\n}\n\n.hidden {\n  visibility: hidden;\n}\n\n.no-display {\n  display: none;\n}", "",{"version":3,"sources":["webpack://./style/base.css"],"names":[],"mappings":"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","sourcesContent":["\n.sticky-button.jp-Button.minimal .jp-Icon {\n  color: var(--jp-inverse-layout-color3);\n}\n\n.sticky-container {\n  position: absolute;\n  z-index: 5;\n  right: 0px;\n  opacity: 0.97;\n\n  border-top-left-radius: 5px;\n  border-bottom-left-radius: 5px;\n\n  box-shadow: -1px 1px 3px hsla(0, 0%, 0%, 0.15),\n  -1px 1px 20px hsla(0, 0%, 0%, 0.1);\n  width: 300px;\n  height: 300px;\n\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  overflow: hidden;\n\n  --sticky-header-height: 10px;\n  --sticky-tab-height: 25px;\n}\n\n.svg-icon {\n  display: flex;\n  align-content: center;\n  justify-content: center;\n  height: 1em;\n  width: 1em;\n}\n\n.svg-icon svg {\n  height: 100%;\n  width: 100%;\n}\n\n.sticky-container .button {\n  color: var(--jp-ui-font-color0);\n  background-color: var(--jp-layout-color1);\n  cursor: pointer;\n\n  padding: 0px 5px;\n  text-align: center;\n  white-space: nowrap;\n  border-radius: .375em;\n  box-shadow: none;\n\n  display: inline-flex;\n  justify-content: flex-start;\n  align-items: center;\n  position: relative;\n}\n\n.sticky-container .button:hover {\n  border-color: hsl(0, 0%, 71%);\n}\n\n.sticky-container .button:active {\n  border-color: hsl(0, 0%, 40%);\n  background-color: var(--md-grey-100);\n}\n\n.sticky-tab-bar {\n  /* height: var(--sticky-tab-height); */\n  width: 100%;\n  opacity: 1;\n  background-color: var(--jp-layout-color3);\n  border-bottom: var(--jp-border-width) solid var(--jp-border-color1);\n  /* Create a white border effect of the current tab */\n  overflow: visible;\n\n  display: flex;\n  flex-direction: row;\n  align-items: flex-end;\n}\n\n.sticky-tab button.new-tab {\n  flex: 0 1 60px;\n}\n\n.sticky-tab button.current {\n  background: var(--jp-layout-color1);\n  color: var(--jp-ui-font-color0);\n\n  margin-left: 0;\n  text-align: left;\n  min-width: 40px;\n\n  border-top: 2px solid #1976D2;\n  border-radius: 0;\n\n  position: relative;\n  overflow: hidden;\n  touch-action: none;\n\n  /* Create a white border effect */\n  line-height: 21px;\n  min-height: 21px;\n  transform: translateY(var(--jp-border-width));\n  z-index: 2;\n}\n\n.sticky-tab button.add-tab {\n  flex: 0 0 16px;\n  padding: 2px 4px 0 4px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n\n  min-height: 20px;\n}\n\n.sticky-tab button.add-tab svg{\n  fill: var(--jp-inverse-layout-color3);\n  color: var(--jp-inverse-layout-color3);\n  display: block;\n  height: 16px;\n  width: 16px;\n  margin: 0 auto;\n}\n\n.sticky-tab button {\n  background: var(--jp-layout-color2);\n  color: var(--jp-ui-font-color0);\n  margin: 0;\n  text-align: left;\n  min-width: 0px;\n  padding: 0px 5px;\n\n  line-height: 22px;\n  min-height: 22px;\n\n  border: var(--jp-border-width) solid var(--jp-border-color1);\n  border-bottom: none;\n  border-left: none;\n  border-radius: 0;\n\n  /* Dynamic width */\n  flex: 0 1 95px;\n  overflow: hidden;\n\n  position: relative;\n  touch-action: none;\n}\n\n.sticky-tab button:hover {\n  background: var(--jp-layout-color1);\n}\n\n.sticky-header {\n  height: var(--sticky-header-height);\n  flex: 1 0 auto;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  background-color: var(--jp-layout-color3);\n  cursor: move;\n}\n\n.sticky-header svg {\n  fill: var(--md-grey-200);\n  color: var(--md-grey-200);\n  display: block;\n  width: 20px;\n  padding: 1px 0 0 0;\n}\n\n.sticky-content {\n  height: calc(100% - var(--sticky-header-height) - var(--sticky-tab-height));\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: center;\n  z-index: 1;\n}\n\n.sticky-content .header {\n  display: flex;\n  width: 100%;\n}\n\n.sticky-content .content {\n  flex-grow: 1;\n  width: 100%;\n  background-color: var(--jp-layout-color1);\n  padding-bottom: 5px;\n\n  display: flex;\n  justify-content: center;\n  align-items: stretch;\n  overflow: scroll;\n}\n\n.sticky-content .CodeMirror.cm-s-jupyter {\n  background: transparent;\n}\n\n.sticky-tab .tab {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n\n.tab-label {\n  font-size: 13px;\n  overflow: hidden;\n  white-space: nowrap;\n  flex: 1 1 auto;\n}\n\n.tab.new-update .tab-label {\n  color: var(--md-green-600);\n}\n\n.tab-icon {\n  flex: 0 0 auto;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.tab-icon svg {\n  width: 14px;\n  height: 14px;\n}\n\n.tab-icon .x-icon[fill] {\n  fill: #616161;\n}\n\n.tab-icon .x-icon-circle[fill] {\n  fill: none;\n}\n\n.tab-icon:hover .x-icon {\n  fill: #fff;\n}\n\n.tab-icon:hover .x-icon-circle {\n  fill: rgba(0, 0, 0, 0.75);\n}\n\n.sticky-container .resize-handle {\n  position: absolute;\n  bottom: 0px;\n  left: 0px;\n  width: 20px;\n  height: 20px;\n  cursor: nesw-resize;\n  overflow: hidden;\n  z-index: 5;\n}\n\n/* Fake the think white border surrounding the lines */\n.sticky-container .resize-handle::after {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  border: 1px solid var(--jp-layout-color1);\n  content: '';\n  bottom: 0px;\n  left: 0px;\n}\n\n/* Fake the resize lines */\n.sticky-container .resize-handle .line {\n  position: absolute;\n  border-bottom: 1px solid var(--md-grey-800);\n  width: 37px;\n  height: 37px;\n}\n\n.sticky-container .resize-handle .line-1 {\n  transform: translateY(-11px) rotate(45deg);\n}\n\n.sticky-container .resize-handle .line-2 {\n  transform: translateY(-16px) rotate(45deg);\n}\n\n.sticky-container .resize-handle .line-3 {\n  transform: translateY(-21px) rotate(45deg);\n}\n\n.cursor-mask {\n  width: 100vw;\n  height: 100vh;\n  position: absolute;\n  background-color: hsla(0, 0%, 0%, 0);\n  z-index: 4;\n}\n\n.hidden {\n  visibility: hidden;\n}\n\n.no-display {\n  display: none;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./style/code.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./style/code.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".sticky-code {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n}\n\n.sticky-code-cell {\n  overflow-y: auto;\n  /* overflow-wrap: break-word; */\n  padding-bottom: 0px;\n}\n\n.sticky-code-output {\n  padding-left: 3px;\n}\n\n.sticky-code .jp-CodeMirrorEditor.jp-mod-focused {\n  border: var(--jp-border-width) solid var(--jp-cell-editor-active-border-color);\n  box-shadow: var(--jp-input-box-shadow);\n  background-color: var(--jp-cell-editor-active-background);\n}\n\n.sticky-toolbar.sticky-code-toolbar {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n}\n\n.sticky-toolbar .toolbar-buttons {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  padding: 0;\n}\n\n.sticky-toolbar .toolbar-status {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  padding-right: 5px;\n}\n\n.toolbar-status .execution-counter {\n  color: var(--jp-cell-prompt-not-active-font-color);\n  font-size: var(--jp-code-font-size);\n  font-family: var(--jp-cell-prompt-font-family);\n  opacity: var(--jp-cell-prompt-not-active-opacity);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: flex;\n  justify-content: flex-end;\n}\n\n.toolbar-status .execution-counter.mod-focused {\n  color: var(--jp-cell-inprompt-font-color);\n  opacity: 1;\n}\n\n.toolbar-status .execution-counter.dirty {\n  color: var(--jp-warn-color1);\n  opacity: 1;\n}\n\n.toolbar-status .execution-counter.dirty::before {\n  color: var(--jp-warn-color1);\n  content: '•';\n  opacity: 1;\n}\n\n.toolbar-buttons .jp-switch[aria-checked=\"true\"] .jp-switch-track {\n  background-color: var(--jp-accent-color1);\n}\n\n.toolbar-buttons .jp-switch:hover {\n  background-color: unset;\n}\n\n.sticky-code .placeholder-icon svg {\n  display: block;\n  height: auto;\n  margin: 0 auto;\n  width: 32px;\n}\n\n.sticky-code .placeholder-icon{\n  align-items: center;\n  display: flex;\n}\n\n/* Need to set the CodeMirror's height to 100% otherwise it uses the whole\nNotebook's height to determine when to scroll! Need to cascade down the 100%\nheight. CodeMirror is such a lifesaver but so hard to debug!!\n*/\n.sticky-code-cell .jp-Cell-inputWrapper {\n  /* height: 100%; */\n  /* width: 100%; */\n}\n\n.sticky-code-cell .jp-InputArea {\n  /* height: 100%; */\n  /* width: 100%; */\n}\n\n.sticky-code-cell .jp-CodeMirrorEditor {\n  /* height: 100%; */\n  /* width: 100%; */\n}\n\n.sticky-code-cell .CodeMirror {\n  height: auto;\n  /* width: 100%; */\n}\n", "",{"version":3,"sources":["webpack://./style/code.css"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,sBAAsB;EACtB,WAAW;AACb;;AAEA;EACE,gBAAgB;EAChB,+BAA+B;EAC/B,mBAAmB;AACrB;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,8EAA8E;EAC9E,sCAAsC;EACtC,yDAAyD;AAC3D;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,8BAA8B;AAChC;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,mBAAmB;EACnB,UAAU;AACZ;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,mBAAmB;EACnB,kBAAkB;AACpB;;AAEA;EACE,kDAAkD;EAClD,mCAAmC;EACnC,8CAA8C;EAC9C,iDAAiD;EACjD,mBAAmB;EACnB,gBAAgB;EAChB,uBAAuB;EACvB,aAAa;EACb,yBAAyB;AAC3B;;AAEA;EACE,yCAAyC;EACzC,UAAU;AACZ;;AAEA;EACE,4BAA4B;EAC5B,UAAU;AACZ;;AAEA;EACE,4BAA4B;EAC5B,YAAY;EACZ,UAAU;AACZ;;AAEA;EACE,yCAAyC;AAC3C;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,cAAc;EACd,YAAY;EACZ,cAAc;EACd,WAAW;AACb;;AAEA;EACE,mBAAmB;EACnB,aAAa;AACf;;AAEA;;;CAGC;AACD;EACE,kBAAkB;EAClB,iBAAiB;AACnB;;AAEA;EACE,kBAAkB;EAClB,iBAAiB;AACnB;;AAEA;EACE,kBAAkB;EAClB,iBAAiB;AACnB;;AAEA;EACE,YAAY;EACZ,iBAAiB;AACnB","sourcesContent":[".sticky-code {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n}\n\n.sticky-code-cell {\n  overflow-y: auto;\n  /* overflow-wrap: break-word; */\n  padding-bottom: 0px;\n}\n\n.sticky-code-output {\n  padding-left: 3px;\n}\n\n.sticky-code .jp-CodeMirrorEditor.jp-mod-focused {\n  border: var(--jp-border-width) solid var(--jp-cell-editor-active-border-color);\n  box-shadow: var(--jp-input-box-shadow);\n  background-color: var(--jp-cell-editor-active-background);\n}\n\n.sticky-toolbar.sticky-code-toolbar {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n}\n\n.sticky-toolbar .toolbar-buttons {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  padding: 0;\n}\n\n.sticky-toolbar .toolbar-status {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  padding-right: 5px;\n}\n\n.toolbar-status .execution-counter {\n  color: var(--jp-cell-prompt-not-active-font-color);\n  font-size: var(--jp-code-font-size);\n  font-family: var(--jp-cell-prompt-font-family);\n  opacity: var(--jp-cell-prompt-not-active-opacity);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: flex;\n  justify-content: flex-end;\n}\n\n.toolbar-status .execution-counter.mod-focused {\n  color: var(--jp-cell-inprompt-font-color);\n  opacity: 1;\n}\n\n.toolbar-status .execution-counter.dirty {\n  color: var(--jp-warn-color1);\n  opacity: 1;\n}\n\n.toolbar-status .execution-counter.dirty::before {\n  color: var(--jp-warn-color1);\n  content: '•';\n  opacity: 1;\n}\n\n.toolbar-buttons .jp-switch[aria-checked=\"true\"] .jp-switch-track {\n  background-color: var(--jp-accent-color1);\n}\n\n.toolbar-buttons .jp-switch:hover {\n  background-color: unset;\n}\n\n.sticky-code .placeholder-icon svg {\n  display: block;\n  height: auto;\n  margin: 0 auto;\n  width: 32px;\n}\n\n.sticky-code .placeholder-icon{\n  align-items: center;\n  display: flex;\n}\n\n/* Need to set the CodeMirror's height to 100% otherwise it uses the whole\nNotebook's height to determine when to scroll! Need to cascade down the 100%\nheight. CodeMirror is such a lifesaver but so hard to debug!!\n*/\n.sticky-code-cell .jp-Cell-inputWrapper {\n  /* height: 100%; */\n  /* width: 100%; */\n}\n\n.sticky-code-cell .jp-InputArea {\n  /* height: 100%; */\n  /* width: 100%; */\n}\n\n.sticky-code-cell .jp-CodeMirrorEditor {\n  /* height: 100%; */\n  /* width: 100%; */\n}\n\n.sticky-code-cell .CodeMirror {\n  height: auto;\n  /* width: 100%; */\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./style/dropzone.css":
/*!******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./style/dropzone.css ***!
  \******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".dropzone {\n  font-size: 1.5em;\n  font-weight: 400;\n\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n\n  width: 100%;\n  margin: 10px;\n  flex-grow: 1;\n  border: 3px dashed var(--jp-border-color0);\n  border-radius: 12px;\n  transition: border 300ms ease-in-out;\n}\n\n.dropzone.drag-over {\n  border: 3px dashed var(--md-blue-400);\n}\n\n.dropzone .dropzone-label {\n  text-align: center;\n  margin: 10px 10px 30px 10px;\n  color: var(--jp-inverse-layout-color3);\n  /* Avoid triggering drag over */\n  pointer-events: none;\n}\n\n.dropzone .svg-icon {\n  width: 2em;\n  height: 2em;\n  fill: var(--jp-border-color0);\n  pointer-events: none;\n}\n\n.dropzone-bottom-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 5px;\n}\n\n.dropzone-bottom-container .button {\n  border: 1px solid var(--jp-border-color2);\n  height: 22px;\n}\n\n.dropzone-select-container {\n  position: relative;\n}\n\n.dropzone-select-container span {\n  top: 0px;\n  right: 5px;\n  position: absolute;\n  pointer-events: none;\n}\n\n/* Use a slightly modified select style from jupyter lab toolbar */\n.dropzone-select-container select {\n  background-color: var(--jp-layout-color1);\n  border: 1px solid var(--jp-border-color2);\n  border-radius: 0.375em;\n  box-shadow: none;\n  color: var(--jp-ui-font-color0);\n  display: block;\n  font-size: var(--jp-ui-font-size1);\n  height: 24px;\n  line-height: 14px;\n  padding: 0 25px 0 10px;\n  text-align: left;\n  cursor: pointer;\n  -moz-appearance: none;\n  -webkit-appearance: none;\n}\n\n.dropzone-select-container select:hover {\n  border-color: var(--jp-border-color0);\n}\n\n.dropzone-select-container select:active {\n  border-color: var(--jp-border-color0);\n}\n", "",{"version":3,"sources":["webpack://./style/dropzone.css"],"names":[],"mappings":"AAAA;EACE,gBAAgB;EAChB,gBAAgB;;EAEhB,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;;EAEnB,WAAW;EACX,YAAY;EACZ,YAAY;EACZ,0CAA0C;EAC1C,mBAAmB;EACnB,oCAAoC;AACtC;;AAEA;EACE,qCAAqC;AACvC;;AAEA;EACE,kBAAkB;EAClB,2BAA2B;EAC3B,sCAAsC;EACtC,+BAA+B;EAC/B,oBAAoB;AACtB;;AAEA;EACE,UAAU;EACV,WAAW;EACX,6BAA6B;EAC7B,oBAAoB;AACtB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,QAAQ;AACV;;AAEA;EACE,yCAAyC;EACzC,YAAY;AACd;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,QAAQ;EACR,UAAU;EACV,kBAAkB;EAClB,oBAAoB;AACtB;;AAEA,kEAAkE;AAClE;EACE,yCAAyC;EACzC,yCAAyC;EACzC,sBAAsB;EACtB,gBAAgB;EAChB,+BAA+B;EAC/B,cAAc;EACd,kCAAkC;EAClC,YAAY;EACZ,iBAAiB;EACjB,sBAAsB;EACtB,gBAAgB;EAChB,eAAe;EACf,qBAAqB;EACrB,wBAAwB;AAC1B;;AAEA;EACE,qCAAqC;AACvC;;AAEA;EACE,qCAAqC;AACvC","sourcesContent":[".dropzone {\n  font-size: 1.5em;\n  font-weight: 400;\n\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n\n  width: 100%;\n  margin: 10px;\n  flex-grow: 1;\n  border: 3px dashed var(--jp-border-color0);\n  border-radius: 12px;\n  transition: border 300ms ease-in-out;\n}\n\n.dropzone.drag-over {\n  border: 3px dashed var(--md-blue-400);\n}\n\n.dropzone .dropzone-label {\n  text-align: center;\n  margin: 10px 10px 30px 10px;\n  color: var(--jp-inverse-layout-color3);\n  /* Avoid triggering drag over */\n  pointer-events: none;\n}\n\n.dropzone .svg-icon {\n  width: 2em;\n  height: 2em;\n  fill: var(--jp-border-color0);\n  pointer-events: none;\n}\n\n.dropzone-bottom-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 5px;\n}\n\n.dropzone-bottom-container .button {\n  border: 1px solid var(--jp-border-color2);\n  height: 22px;\n}\n\n.dropzone-select-container {\n  position: relative;\n}\n\n.dropzone-select-container span {\n  top: 0px;\n  right: 5px;\n  position: absolute;\n  pointer-events: none;\n}\n\n/* Use a slightly modified select style from jupyter lab toolbar */\n.dropzone-select-container select {\n  background-color: var(--jp-layout-color1);\n  border: 1px solid var(--jp-border-color2);\n  border-radius: 0.375em;\n  box-shadow: none;\n  color: var(--jp-ui-font-color0);\n  display: block;\n  font-size: var(--jp-ui-font-size1);\n  height: 24px;\n  line-height: 14px;\n  padding: 0 25px 0 10px;\n  text-align: left;\n  cursor: pointer;\n  -moz-appearance: none;\n  -webkit-appearance: none;\n}\n\n.dropzone-select-container select:hover {\n  border-color: var(--jp-border-color0);\n}\n\n.dropzone-select-container select:active {\n  border-color: var(--jp-border-color0);\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./style/floating.css":
/*!******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./style/floating.css ***!
  \******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".floating-window {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n\n  position: absolute;\n  z-index: 8;\n\n  border-radius: 5px;\n  overflow: hidden;\n  box-shadow: -1px 1px 3px hsla(0, 0%, 0%, 0.2), -1px 1px 20px hsla(0, 0%, 0%, 0.25);\n  background-color: white;\n\n  min-width: 270px;\n  min-height: 140px;\n  resize: both;\n}\n\n.floating-window .floating-header {\n  min-height: 24px;\n  width: 100%;\n  cursor: move;\n  background-color: var(--jp-layout-color4);\n  color: var(--md-grey-200);\n  border: 1px solid var(--jp-layout-color4);\n\n  position: relative;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.floating-window .sticky-content {\n  height: calc(100% - 24px);\n}\n\n.floating-window .button-group {\n  position: absolute;\n  right: 6px;\n  height: 100%;\n\n  display: flex;\n  flex-direction: row;\n}\n\n.floating-window .button-group svg {\n  fill: var(--md-grey-400);\n  color: var(--md-grey-400);\n  display: block;\n  height: 18px;\n  width: 18px;\n  margin: 0 auto;\n}\n\n.floating-window .header-button {\n  cursor: pointer;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  padding: 0 2px;\n}\n\n.floating-window .header-button:hover svg {\n  fill: var(--md-grey-200);\n  color: var(--md-grey-200);\n}\n\n.floating-window .header-button:active svg {\n  fill: var(--md-grey-50);\n  color: var(--md-grey-50);\n}\n\n.floating-placeholder {\n  width: 100%;\n  height: 100%;\n  background-color: var(--jp-layout-color1);\n\n  font-size: 1.5em;\n  font-weight: 400;\n\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\n.floating-placeholder .placeholder-label {\n  text-align: center;\n  margin: 10px 10px 30px 10px;\n  color: var(--jp-ui-font-color2);\n  pointer-events: none;\n}\n\n.floating-placeholder .svg-icon {\n  width: 2em;\n  height: 2em;\n  fill: var(--md-grey-400);\n  pointer-events: none;\n}\n\n.placeholder-bottom-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 5px;\n}\n\n.placeholder-bottom-container .button {\n  border: 1px solid hsl(0, 0%, 85.9%);\n  height: 22px;\n}\n\n.placeholder-select-container {\n  position: relative;\n}\n", "",{"version":3,"sources":["webpack://./style/floating.css"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,sBAAsB;EACtB,uBAAuB;;EAEvB,kBAAkB;EAClB,UAAU;;EAEV,kBAAkB;EAClB,gBAAgB;EAChB,kFAAkF;EAClF,uBAAuB;;EAEvB,gBAAgB;EAChB,iBAAiB;EACjB,YAAY;AACd;;AAEA;EACE,gBAAgB;EAChB,WAAW;EACX,YAAY;EACZ,yCAAyC;EACzC,yBAAyB;EACzB,yCAAyC;;EAEzC,kBAAkB;EAClB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,kBAAkB;EAClB,UAAU;EACV,YAAY;;EAEZ,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,wBAAwB;EACxB,yBAAyB;EACzB,cAAc;EACd,YAAY;EACZ,WAAW;EACX,cAAc;AAChB;;AAEA;EACE,eAAe;EACf,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,cAAc;AAChB;;AAEA;EACE,wBAAwB;EACxB,yBAAyB;AAC3B;;AAEA;EACE,uBAAuB;EACvB,wBAAwB;AAC1B;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,yCAAyC;;EAEzC,gBAAgB;EAChB,gBAAgB;;EAEhB,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;EAClB,2BAA2B;EAC3B,+BAA+B;EAC/B,oBAAoB;AACtB;;AAEA;EACE,UAAU;EACV,WAAW;EACX,wBAAwB;EACxB,oBAAoB;AACtB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,QAAQ;AACV;;AAEA;EACE,mCAAmC;EACnC,YAAY;AACd;;AAEA;EACE,kBAAkB;AACpB","sourcesContent":[".floating-window {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n\n  position: absolute;\n  z-index: 8;\n\n  border-radius: 5px;\n  overflow: hidden;\n  box-shadow: -1px 1px 3px hsla(0, 0%, 0%, 0.2), -1px 1px 20px hsla(0, 0%, 0%, 0.25);\n  background-color: white;\n\n  min-width: 270px;\n  min-height: 140px;\n  resize: both;\n}\n\n.floating-window .floating-header {\n  min-height: 24px;\n  width: 100%;\n  cursor: move;\n  background-color: var(--jp-layout-color4);\n  color: var(--md-grey-200);\n  border: 1px solid var(--jp-layout-color4);\n\n  position: relative;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.floating-window .sticky-content {\n  height: calc(100% - 24px);\n}\n\n.floating-window .button-group {\n  position: absolute;\n  right: 6px;\n  height: 100%;\n\n  display: flex;\n  flex-direction: row;\n}\n\n.floating-window .button-group svg {\n  fill: var(--md-grey-400);\n  color: var(--md-grey-400);\n  display: block;\n  height: 18px;\n  width: 18px;\n  margin: 0 auto;\n}\n\n.floating-window .header-button {\n  cursor: pointer;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  padding: 0 2px;\n}\n\n.floating-window .header-button:hover svg {\n  fill: var(--md-grey-200);\n  color: var(--md-grey-200);\n}\n\n.floating-window .header-button:active svg {\n  fill: var(--md-grey-50);\n  color: var(--md-grey-50);\n}\n\n.floating-placeholder {\n  width: 100%;\n  height: 100%;\n  background-color: var(--jp-layout-color1);\n\n  font-size: 1.5em;\n  font-weight: 400;\n\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\n.floating-placeholder .placeholder-label {\n  text-align: center;\n  margin: 10px 10px 30px 10px;\n  color: var(--jp-ui-font-color2);\n  pointer-events: none;\n}\n\n.floating-placeholder .svg-icon {\n  width: 2em;\n  height: 2em;\n  fill: var(--md-grey-400);\n  pointer-events: none;\n}\n\n.placeholder-bottom-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 5px;\n}\n\n.placeholder-bottom-container .button {\n  border: 1px solid hsl(0, 0%, 85.9%);\n  height: 22px;\n}\n\n.placeholder-select-container {\n  position: relative;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./style/markdown.css":
/*!******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./style/markdown.css ***!
  \******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".sticky-md {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n}\n\n.sticky-md-cell {\n  overflow-y: auto;\n  overflow-wrap: break-word;\n  padding-bottom: 0px;\n}\n\n.sticky-md-output {\n  padding: 0 8px;\n}\n\n.sticky-md .jp-CodeMirrorEditor.jp-mod-focused {\n  border: var(--jp-border-width) solid var(--jp-cell-editor-active-border-color);\n  box-shadow: var(--jp-input-box-shadow);\n  background-color: var(--jp-cell-editor-active-background);\n}\n\n/* Need to set the CodeMirror's height to 100% otherwise it uses the whole\nNotebook's height to determine when to scroll! Need to cascade down the 100%\nheight. CodeMirror is such a lifesaver but so hard to debug!!\n*/\n.sticky-md-cell .jp-Cell-inputWrapper {\n  height: 100%;\n}\n\n.sticky-md-cell .jp-InputArea {\n  height: 100%;\n}\n\n.sticky-md-cell .jp-CodeMirrorEditor {\n  height: 100%;\n}\n\n.sticky-md-cell .CodeMirror {\n  height: 100%;\n}\n", "",{"version":3,"sources":["webpack://./style/markdown.css"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,sBAAsB;EACtB,WAAW;AACb;;AAEA;EACE,gBAAgB;EAChB,yBAAyB;EACzB,mBAAmB;AACrB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,8EAA8E;EAC9E,sCAAsC;EACtC,yDAAyD;AAC3D;;AAEA;;;CAGC;AACD;EACE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;AACd","sourcesContent":[".sticky-md {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n}\n\n.sticky-md-cell {\n  overflow-y: auto;\n  overflow-wrap: break-word;\n  padding-bottom: 0px;\n}\n\n.sticky-md-output {\n  padding: 0 8px;\n}\n\n.sticky-md .jp-CodeMirrorEditor.jp-mod-focused {\n  border: var(--jp-border-width) solid var(--jp-cell-editor-active-border-color);\n  box-shadow: var(--jp-input-box-shadow);\n  background-color: var(--jp-cell-editor-active-background);\n}\n\n/* Need to set the CodeMirror's height to 100% otherwise it uses the whole\nNotebook's height to determine when to scroll! Need to cascade down the 100%\nheight. CodeMirror is such a lifesaver but so hard to debug!!\n*/\n.sticky-md-cell .jp-Cell-inputWrapper {\n  height: 100%;\n}\n\n.sticky-md-cell .jp-InputArea {\n  height: 100%;\n}\n\n.sticky-md-cell .jp-CodeMirrorEditor {\n  height: 100%;\n}\n\n.sticky-md-cell .CodeMirror {\n  height: 100%;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./style/toolbar.css":
/*!*****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./style/toolbar.css ***!
  \*****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".sticky-toolbar {\n  display: flex;\n  flex-direction: row;\n  width: 100%;\n  padding: 0;\n}\n\n.sticky-toolbar .jp-Toolbar > .jp-Toolbar-item {\n  flex: 0 0 auto;\n  display: flex;\n  padding: 0;\n  height: 100%;\n  justify-content: center;\n  align-items: center;\n}\n\n.jp-Toolbar-item.no-display {\n  display: none;\n}\n\n.sticky-toolbar svg {\n  fill: var(--jp-inverse-layout-color3);\n  color: var(--jp-inverse-layout-color3);\n  display: block;\n  height: 16px;\n  margin: 0 auto;\n  width: 16px;\n}", "",{"version":3,"sources":["webpack://./style/toolbar.css"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,mBAAmB;EACnB,WAAW;EACX,UAAU;AACZ;;AAEA;EACE,cAAc;EACd,aAAa;EACb,UAAU;EACV,YAAY;EACZ,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,qCAAqC;EACrC,sCAAsC;EACtC,cAAc;EACd,YAAY;EACZ,cAAc;EACd,WAAW;AACb","sourcesContent":[".sticky-toolbar {\n  display: flex;\n  flex-direction: row;\n  width: 100%;\n  padding: 0;\n}\n\n.sticky-toolbar .jp-Toolbar > .jp-Toolbar-item {\n  flex: 0 0 auto;\n  display: flex;\n  padding: 0;\n  height: 100%;\n  justify-content: center;\n  align-items: center;\n}\n\n.jp-Toolbar-item.no-display {\n  display: none;\n}\n\n.sticky-toolbar svg {\n  fill: var(--jp-inverse-layout-color3);\n  color: var(--jp-inverse-layout-color3);\n  display: block;\n  height: 16px;\n  margin: 0 auto;\n  width: 16px;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./style/base.css":
/*!************************!*\
  !*** ./style/base.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_base_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./base.css */ "./node_modules/css-loader/dist/cjs.js!./style/base.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_base_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_base_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./style/code.css":
/*!************************!*\
  !*** ./style/code.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_code_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./code.css */ "./node_modules/css-loader/dist/cjs.js!./style/code.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_code_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_code_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./style/dropzone.css":
/*!****************************!*\
  !*** ./style/dropzone.css ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_dropzone_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./dropzone.css */ "./node_modules/css-loader/dist/cjs.js!./style/dropzone.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_dropzone_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_dropzone_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./style/floating.css":
/*!****************************!*\
  !*** ./style/floating.css ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_floating_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./floating.css */ "./node_modules/css-loader/dist/cjs.js!./style/floating.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_floating_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_floating_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./style/markdown.css":
/*!****************************!*\
  !*** ./style/markdown.css ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_markdown_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./markdown.css */ "./node_modules/css-loader/dist/cjs.js!./style/markdown.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_markdown_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_markdown_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./style/toolbar.css":
/*!***************************!*\
  !*** ./style/toolbar.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_toolbar_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./toolbar.css */ "./node_modules/css-loader/dist/cjs.js!./style/toolbar.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_toolbar_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_toolbar_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./style/index.js":
/*!************************!*\
  !*** ./style/index.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _base_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.css */ "./style/base.css");
/* harmony import */ var _toolbar_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toolbar.css */ "./style/toolbar.css");
/* harmony import */ var _markdown_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./markdown.css */ "./style/markdown.css");
/* harmony import */ var _dropzone_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dropzone.css */ "./style/dropzone.css");
/* harmony import */ var _code_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./code.css */ "./style/code.css");
/* harmony import */ var _floating_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./floating.css */ "./style/floating.css");







/***/ })

}]);
//# sourceMappingURL=style_index_js.1d4ed671f37cc4284f39.js.map