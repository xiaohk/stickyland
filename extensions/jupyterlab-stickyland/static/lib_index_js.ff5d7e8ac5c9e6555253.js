"use strict";
(self["webpackChunkjupyterlab_stickyland"] = self["webpackChunkjupyterlab_stickyland"] || []).push([["lib_index_js"],{

/***/ "./lib/button.js":
/*!***********************!*\
  !*** ./lib/button.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ButtonExtension": () => (/* binding */ ButtonExtension)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/disposable */ "webpack/sharing/consume/default/@lumino/disposable");
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_disposable__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _stickyland__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stickyland */ "./lib/stickyland.js");



class ButtonExtension {
    constructor() {
        this.stickyLandMap = new Map();
    }
    createNew(panel, context) {
        /**
         * Handler for the click event.
         */
        const onClickHandler = () => {
            var _a, _b, _c;
            // Check if we have already created stickyland
            const curPath = context.path;
            // Create it if we don't have it yet
            if (!((_a = this.stickyLandMap) === null || _a === void 0 ? void 0 : _a.has(curPath))) {
                (_b = this.stickyLandMap) === null || _b === void 0 ? void 0 : _b.set(curPath, new _stickyland__WEBPACK_IMPORTED_MODULE_2__.StickyLand(panel));
            }
            const curStickyLand = (_c = this.stickyLandMap) === null || _c === void 0 ? void 0 : _c.get(curPath);
            // Check if we should show or hide this container
            if (curStickyLand === null || curStickyLand === void 0 ? void 0 : curStickyLand.isHidden()) {
                curStickyLand === null || curStickyLand === void 0 ? void 0 : curStickyLand.show();
            }
            else {
                curStickyLand === null || curStickyLand === void 0 ? void 0 : curStickyLand.hide();
            }
            // Alternative way to insert StickyLand to the notebook widget (boxLayout)
            // const stickyLand = new StickyLand();
            // const panelLayout = panel.layout as BoxLayout;
            // panelLayout.addWidget(stickyLand);
        };
        const button = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ToolbarButton({
            className: 'sticky-button',
            iconClass: 'far fa-sticky-note',
            onClick: onClickHandler,
            tooltip: 'Show/Hide StickyLand'
        });
        // const numItems = toArray(panel.toolbar.children()).length;
        const insertIndex = 10;
        panel.toolbar.insertItem(insertIndex, 'stickyLand', button);
        return new _lumino_disposable__WEBPACK_IMPORTED_MODULE_1__.DisposableDelegate(() => {
            button.dispose();
        });
    }
}


/***/ }),

/***/ "./lib/code.js":
/*!*********************!*\
  !*** ./lib/code.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StickyCode": () => (/* binding */ StickyCode)
/* harmony export */ });
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/notebook */ "webpack/sharing/consume/default/@jupyterlab/notebook");
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _content__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./content */ "./lib/content.js");
/* harmony import */ var _floating__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./floating */ "./lib/floating.js");
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./icons */ "./lib/icons.js");






/**
 * Class that implements the Code cell in StickyLand.
 */
class StickyCode {
    constructor() {
        this.autoRun = false;
        this.autoRunScheduled = false;
        this.runScheduled = false;
        this.isDisposed = false;
        this.isFloating = false;
        this.floatingWindow = null;
        /**
         * We use a mutation observer to detect if the output area is redrawn.
         * Remember to disconnect the observer in the dispose() method.
         * @param mutationList Array of mutation records
         * @param observer The observer itself
         */
        this.codeOutputMutationHandler = (mutationList, observer) => {
            mutationList.forEach(d => {
                var _a, _b;
                // Remove the prompt area when the output node is updated
                if (d.addedNodes !== null) {
                    (_b = (_a = this.outputNode) === null || _a === void 0 ? void 0 : _a.querySelectorAll('.jp-OutputPrompt')) === null || _b === void 0 ? void 0 : _b.forEach(d => d.remove());
                }
            });
        };
        /**
         * We use a mutation observer to detect if user focuses on the code cell in
         * StickyLand. Remember to disconnect the observer in the dispose() method.
         * @param mutationList Array of mutation records
         * @param observer The observer itself
         */
        this.codeClassMutationHandler = (mutationList, observer) => {
            mutationList.forEach(d => {
                var _a;
                if (d.attributeName === 'class') {
                    if ((_a = this.editorNode) === null || _a === void 0 ? void 0 : _a.classList.contains('jp-mod-focused')) {
                        this.executionCounter.classList.add('mod-focused');
                    }
                    else {
                        this.executionCounter.classList.remove('mod-focused');
                    }
                }
            });
        };
        /**
         * We listen to the execution state of this notebook. We use it to change the
         * execution counter to star if the cell is scheduled to run.
         * @param _ any
         * @param args Notebook and cell
         */
        this.handleExecutionScheduled = (_, args) => {
            // Change the execution counter
            if (args.cell.node === this.originalCell.node) {
                this.runScheduled = true;
                this.executionCount = null;
                this.executionCounter.innerText = '[*]';
            }
        };
        /**
         * We listen to the execution state of this notebook. We use it to change the
         * execution counter to star if the cell is scheduled to run.
         * @param _ any
         * @param args Notebook and cell
         */
        this.handleExecuted = (_, args) => {
            // Change the execution counter
            if (args.cell.node === this.originalCell.node) {
                this.runScheduled = false;
                if (this.executionCount === null) {
                    this.executionCounter.innerText = '[ ]';
                }
            }
        };
        /**
         * Helper function to handle code model state changes. The state change signal
         * is emitted with anything (input, output, etc.). This function follows the
         * signal pattern from lumino
         * (https://github.com/jupyterlab/extension-examples/tree/master/signals)
         * @param model CodeCellModel
         * @param args Arguments emitted from the model emitter, an example of the
         * signal structure is listed
         * [here](https://github.com/jupyterlab/jupyterlab/blob/5755ea86fef3fdbba10cd05b23703b9d60b53226/packages/cells/src/model.ts#L774)
         * The args is {name: str, oldValue: any, newValue: any}
         */
        this.handleStateChange = (model, args) => {
            const codeModel = model;
            switch (args.name) {
                case 'executionCount':
                    // Update the execution count
                    this.executionCount = codeModel.executionCount;
                    // JupyterLab redraws the output area when code is executed, so we need
                    // to hide the original output every time here
                    // https://github.com/jupyterlab/jupyterlab/blob/e4e323992d24f6c5e48d181381e23c547b665b15/packages/notebook/src/actions.tsx#L1156
                    if (this.originalCell.inputHidden) {
                        this.originalCell.outputHidden = true;
                    }
                    break;
                case 'isDirty':
                    // Color the execution based on the dirty state
                    if (args.newValue) {
                        this.executionCounter.classList.add('dirty');
                    }
                    else {
                        this.executionCounter.classList.remove('dirty');
                    }
                    break;
                default:
                    break;
            }
        };
        /**
         * Strip unnecessary elements from the nodes before appending it to stickyland
         */
        this.cleanCellClone = () => {
            var _a, _b, _c, _d, _e, _f, _g;
            // Remove the left region (prompt and collapser), header and footer
            (_a = this.cellNode.querySelector('.jp-Cell-inputCollapser')) === null || _a === void 0 ? void 0 : _a.remove();
            (_b = this.cellNode.querySelector('.jp-OutputCollapser')) === null || _b === void 0 ? void 0 : _b.remove();
            (_c = this.cellNode.querySelector('.jp-InputArea-prompt')) === null || _c === void 0 ? void 0 : _c.remove();
            (_d = this.cellNode
                .querySelectorAll('.jp-OutputPrompt')) === null || _d === void 0 ? void 0 : _d.forEach(d => d.remove());
            (_e = this.cellNode.querySelector('.jp-CellHeader')) === null || _e === void 0 ? void 0 : _e.remove();
            (_f = this.cellNode.querySelector('.jp-CellFooter')) === null || _f === void 0 ? void 0 : _f.remove();
            // Add class name to the rendered region
            (_g = this.cellNode
                .querySelector('.jp-OutputArea')) === null || _g === void 0 ? void 0 : _g.classList.add('sticky-code-output');
            this.cellNode.classList.add('sticky-code-cell');
            this.cellNode.classList.remove('hidden');
        };
        /**
         * Create a toolbar element
         * @param items List of toolbar item names and onclick handlers
         */
        this.createToolbar = (items) => {
            var _a, _b;
            const toolbar = document.createElement('div');
            toolbar.classList.add('sticky-toolbar', 'jp-Toolbar', 'sticky-code-toolbar');
            const buttonGroup = document.createElement('div');
            buttonGroup.classList.add('toolbar-buttons');
            const statusGroup = document.createElement('div');
            statusGroup.classList.add('toolbar-status');
            toolbar.appendChild(buttonGroup);
            toolbar.appendChild(statusGroup);
            // Add buttons into the toolbar
            items.forEach(d => {
                const item = document.createElement('div');
                item.classList.add('jp-ToolbarButton', 'jp-Toolbar-item');
                buttonGroup.appendChild(item);
                const itemElem = document.createElement('button');
                itemElem.classList.add('jp-ToolbarButtonComponent', 'button', 'jp-Button', 'toolbar-button', 'bp3-button', 'bp3-minimal', `button-${d.name}`);
                itemElem.setAttribute('title', d.title);
                itemElem.addEventListener('click', d.onClick);
                item.appendChild(itemElem);
                // Add icon to the button
                const iconSpan = document.createElement('span');
                iconSpan.classList.add('jp-ToolbarButtonComponent-icon');
                itemElem.appendChild(iconSpan);
                d.icon.element({
                    container: iconSpan
                });
            });
            // Hide the expand button at first
            (_b = (_a = buttonGroup
                .querySelector('.button-expand')) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.classList.add('no-display');
            // Add a toggle switch into the toolbar
            this.toggle = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.Switch();
            this.toggle.valueChanged.connect((_, args) => {
                this.autoRun = args.newValue;
            });
            this.toggle.value = this.autoRun;
            this.toggle.label = 'auto-run';
            // Add a tooltip title
            this.toggle.node.setAttribute('title', 'Automatically run this cell after any other cell is executed');
            // Here we are not correctly attach the widget to a layout, so we need to
            // manually trigger the event binding
            const toggleSwitchNode = this.toggle.node.querySelector('.jp-switch');
            toggleSwitchNode === null || toggleSwitchNode === void 0 ? void 0 : toggleSwitchNode.addEventListener('click', this.toggle);
            buttonGroup.appendChild(this.toggle.node);
            // Add an execution counter into the toolbar
            this.executionCounter = document.createElement('div');
            this.executionCounter.classList.add('execution-counter');
            statusGroup.appendChild(this.executionCounter);
            return toolbar;
        };
        /**
         * Run the code cell. The implementation logic is: (1) change the original cell
         * as the active cell, (2) use the NotebookActions to run the current active
         * cell
         */
        this.execute = (restoreActiveCell = false) => {
            const restoreActiveCellIndex = this.notebook.content.activeCellIndex;
            // Find the cell index of the original cell
            // Note it can change as users can insert cells above and below the cell
            // Jupyter lab internally iterates through all widgets to find the index
            // https://github.com/jupyterlab/jupyterlab/blob/5755ea86fef3fdbba10cd05b23703b9d60b53226/packages/notebook/src/widget.ts#L1803
            const cellIndex = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__.ArrayExt.findFirstIndex(this.notebook.content.widgets, widget => widget.node === this.originalCell.node);
            // Change the active cell to the original cell
            this.notebook.content.activeCellIndex = cellIndex;
            // Blur the focused editor
            this.cell.editor.blur();
            // Run the active cell
            const runPromise = _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__.NotebookActions.run(this.notebook.content, this.notebook.context.sessionContext);
            // Restore the active cell if needed
            if (restoreActiveCell) {
                this.notebook.content.activeCellIndex = restoreActiveCellIndex;
            }
            return runPromise;
        };
        /**
         * Float the current code cell.
         */
        this.float = () => {
            // Create the floating window and put content from stickyland to the floating
            // window
            this.floatingWindow = new _floating__WEBPACK_IMPORTED_MODULE_3__.FloatingWindow(_content__WEBPACK_IMPORTED_MODULE_4__.ContentType.Code, this);
            // Finally, toggle the `isFloating` property
            this.isFloating = true;
        };
        this.runClicked = (event) => {
            event.preventDefault();
            event.stopPropagation();
            // Run the cell
            this.execute(true);
        };
        this.launchClicked = (event) => {
            event.preventDefault();
            event.stopPropagation();
            this.float();
        };
        this.closeClicked = () => {
            // Show the original cell
            this.originalCell.inputHidden = false;
            this.originalCell.outputHidden = false;
            // TEMP: replace the current content with the dropzone
            this.stickyContent.showDropzone();
            // Remove the code cell
            this.dispose();
        };
        this.collapseClicked = (event) => {
            var _a, _b, _c, _d;
            event.preventDefault();
            event.stopPropagation();
            // Hide the input region
            this.cell.inputHidden = true;
            // Swap the icon in the toolbar
            (_b = (_a = this.stickyContent.headerNode
                .querySelector('.button-collapse')) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.classList.add('no-display');
            (_d = (_c = this.stickyContent.headerNode
                .querySelector('.button-expand')) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.classList.remove('no-display');
            // Show the input placeholder
            this.placeholder.classList.remove('no-display');
        };
        this.expandClicked = (event) => {
            var _a, _b, _c, _d;
            event.preventDefault();
            event.stopPropagation();
            // Hide the input region
            this.cell.inputHidden = false;
            // Swap the icon in the toolbar
            (_b = (_a = this.stickyContent.headerNode
                .querySelector('.button-collapse')) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.classList.remove('no-display');
            (_d = (_c = this.stickyContent.headerNode
                .querySelector('.button-expand')) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.classList.add('no-display');
            // Hide the input placeholder
            this.placeholder.classList.add('no-display');
        };
        this.toolBarItems = [
            {
                name: 'run',
                title: 'Run the cell',
                icon: _icons__WEBPACK_IMPORTED_MODULE_5__.MyIcons.runIcon,
                onClick: this.runClicked
            },
            {
                name: 'collapse',
                title: 'Hide the input',
                icon: _icons__WEBPACK_IMPORTED_MODULE_5__.MyIcons.collapseIcon,
                onClick: this.collapseClicked
            },
            {
                name: 'expand',
                title: 'Show the input',
                icon: _icons__WEBPACK_IMPORTED_MODULE_5__.MyIcons.expandIcon,
                onClick: this.expandClicked
            },
            {
                name: 'launch',
                title: 'Make the cell float',
                icon: _icons__WEBPACK_IMPORTED_MODULE_5__.MyIcons.launchIcon,
                onClick: this.launchClicked
            }
        ];
        /**
         * Bind event handlers for sticky code cell.
         */
        this.bindEventHandlers = () => {
            // Bind keyboard shortcuts
            this.node.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    if (e.shiftKey || e.ctrlKey) {
                        // [Shift + enter] or [control + enter] runs the code cell
                        this.execute(true);
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
            });
        };
    }
    /**
     * Factory function for StickyCode when creating if from an existing cell
     * through dragging
     * @param stickyContent The sticky content that contains this markdown cell
     * @param cell The existing markdown cell
     * @param notebook The current notebook
     * @returns A new StickyCode object
     */
    static createFromExistingCell(stickyContent, cell, notebook) {
        const cd = new StickyCode();
        cd.stickyContent = stickyContent;
        cd.notebook = notebook;
        // Clone the cell
        cd.originalCell = cell;
        cd.cell = cd.originalCell.clone();
        // Register the original execution counter node
        cd.originalExecutionCounter = cd.originalCell.node.querySelector('.jp-InputArea-prompt');
        // Attach the clone node to stickyland
        cd.node = document.createElement('div');
        cd.node.classList.add('sticky-code');
        // Need to add tabindex so it can receive keyboard events
        cd.node.setAttribute('tabindex', '0');
        cd.stickyContent.contentNode.appendChild(cd.node);
        // Need to append the node to DOM first so we can do the cleaning
        cd.cellNode = cd.cell.node;
        cd.cellNode.classList.add('hidden');
        cd.node.appendChild(cd.cellNode);
        // Add a toolbar
        cd.toolbar = cd.createToolbar(cd.toolBarItems);
        cd.stickyContent.headerNode.appendChild(cd.toolbar);
        // Bind the Codemirror
        const codeMirrorNode = cd.cell.node.querySelector('.CodeMirror');
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        cd.codemirror = codeMirrorNode.CodeMirror;
        // Wow, for some reason the clone somehow has a different codemirror config
        // from the original cell, need to reset it here
        // https://codemirror.net/doc/manual.html#setOption
        cd.codemirror.setOption('lineWrapping', false);
        cd.executionCount = cd.cell.model.executionCount;
        // Collapse the original cell (both input and output)
        cd.originalCell.inputHidden = true;
        cd.originalCell.outputHidden = true;
        cd.cell.model.stateChanged.connect(cd.handleStateChange, cd);
        _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__.NotebookActions.executionScheduled.connect(cd.handleExecutionScheduled, cd);
        _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__.NotebookActions.executed.connect(cd.handleExecuted, cd);
        // Bind events
        cd.bindEventHandlers();
        // Clean the unnecessary elements from the node clone
        cd.cleanCellClone();
        // Add a mutation observer so we can style the execution counter based on
        // the code focus
        cd.codeObserver = new MutationObserver(cd.codeClassMutationHandler);
        cd.editorNode = cd.cellNode.querySelector('.jp-CodeMirrorEditor');
        if (cd.editorNode) {
            cd.codeObserver.observe(cd.editorNode, { attributes: true });
        }
        // Add an output area observer because we need to remove the left prompt
        // area every time the output area is updated
        cd.outputObserver = new MutationObserver(cd.codeOutputMutationHandler);
        cd.outputNode = cd.cellNode.querySelector('.jp-OutputArea');
        if (cd.outputNode) {
            cd.outputObserver.observe(cd.outputNode, { childList: true });
        }
        // Add a hidden placeholder element before the input area. We show it when
        // users collapse the input
        cd.placeholder = document.createElement('div');
        cd.placeholder.classList.add('jp-Placeholder-content', 'no-display');
        cd.placeholder.addEventListener('click', cd.expandClicked);
        if (cd.cell.node.firstElementChild !== null) {
            cd.cell.node.insertBefore(cd.placeholder, cd.cell.node.firstChild);
        }
        const placeholderIcon = document.createElement('div');
        placeholderIcon.classList.add('jp-MoreHorizIcon', 'placeholder-icon');
        _icons__WEBPACK_IMPORTED_MODULE_5__.MyIcons.ellipsesIcon.element({ container: placeholderIcon });
        cd.placeholder.appendChild(placeholderIcon);
        return cd;
    }
    /**
     * Setter function for the executionCount. It also updates the count element
     */
    set executionCount(newCount) {
        this._executionCount = newCount;
        // Update the counter element
        if (newCount !== null) {
            this.executionCounter.innerText = `[${newCount}]`;
            this.runScheduled = false;
        }
        else {
            if (!this.runScheduled) {
                this.executionCounter.innerText = '[ ]';
            }
        }
    }
    /**
     * Getter function for the executionCount.
     */
    get executionCount() {
        return this._executionCount;
    }
    /**
     * Factory function for StickyCode when creating if from a new code cell.
     * This function would append a new markdown cell to the main notebook.
     * @param stickyContent The sticky content that contains this markdown cell
     * @param notebook The current notebook
     * @returns A new StickyCode object
     */
    static createFromNewCell(stickyContent, notebook) {
        // Append a new code cell to the main notebook
        _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__.NotebookActions.insertBelow(notebook.content);
        _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__.NotebookActions.changeCellType(notebook.content, 'code');
        const newCell = notebook.content.activeCell;
        // Activate the original active cell
        notebook.content.activeCellIndex = notebook.content.activeCellIndex - 1;
        // Construct StickyCode using the new cell as an existing cell
        return this.createFromExistingCell(stickyContent, newCell, notebook);
    }
    dispose() {
        // Disconnect signal handlers
        this.codeObserver.disconnect();
        this.toggle.dispose();
        // Disconnect notebook execution signal
        _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__.NotebookActions.executionScheduled.disconnect(this.handleExecutionScheduled, this);
        _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_1__.NotebookActions.executed.disconnect(this.handleExecuted, this);
        // Remove nodes
        this.node.remove();
        this.toolbar.remove();
        this.isDisposed = true;
    }
}
StickyCode.numCd = 0;


/***/ }),

/***/ "./lib/content.js":
/*!************************!*\
  !*** ./lib/content.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContentType": () => (/* binding */ ContentType),
/* harmony export */   "StickyContent": () => (/* binding */ StickyContent)
/* harmony export */ });
/* harmony import */ var _dropzone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dropzone */ "./lib/dropzone.js");
/* harmony import */ var _markdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./markdown */ "./lib/markdown.js");
/* harmony import */ var _code__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./code */ "./lib/code.js");



var ContentType;
(function (ContentType) {
    ContentType["Dropzone"] = "Dropzone";
    ContentType["Code"] = "Code";
    ContentType["Markdown"] = "Markdown";
})(ContentType || (ContentType = {}));
class StickyContent {
    constructor(stickyContainer, panel, stickyLand) {
        this.isDisposed = false;
        /**
         * Replace the current content with a dropzone
         */
        this.showDropzone = () => {
            var _a;
            this.curContent = new _dropzone__WEBPACK_IMPORTED_MODULE_0__.Dropzone(this);
            // It only happens when the user closes the last sticky code/md cell
            // Dehighlight the tab name
            (_a = this.stickyLand.stickyTab.activeTab) === null || _a === void 0 ? void 0 : _a.tabNode.classList.remove('new-update');
        };
        /**
         * Replace the dropzone content with a clone of an existing cell
         * @param cell Existing cell that the users drag over
         * @param newCellType Cell type of the current cell
         */
        this.swapDropzoneWithExistingCell = (cell, newCellType) => {
            // Remove the dropzone
            this.curContent.dispose();
            // Add a new cell
            switch (newCellType) {
                case ContentType.Markdown:
                    // Initialize a markdown cell
                    this.curContent = _markdown__WEBPACK_IMPORTED_MODULE_1__.StickyMarkdown.createFromExistingCell(this, cell, this.notebook);
                    break;
                case ContentType.Code:
                    // Initialize a code cell
                    this.curContent = _code__WEBPACK_IMPORTED_MODULE_2__.StickyCode.createFromExistingCell(this, cell, this.notebook);
                    break;
                default:
                    break;
            }
            // Notify the tab to update tab name
            this.stickyLand.stickyTab.updateActiveTab();
        };
        /**
         * Replace the dropzone content with a new cell. This operation will append a
         * new cell to the main notebook.
         * @param newCellType New cell type
         */
        this.swapDropzoneWithNewCell = (newCellType) => {
            switch (newCellType) {
                case ContentType.Code:
                    // Remove the dropzone
                    this.curContent.dispose();
                    // Initialize a new code cell
                    this.curContent = _code__WEBPACK_IMPORTED_MODULE_2__.StickyCode.createFromNewCell(this, this.notebook);
                    break;
                case ContentType.Markdown:
                    // Remove the dropzone
                    this.curContent.dispose();
                    // Initialize a markdown cell
                    this.curContent = _markdown__WEBPACK_IMPORTED_MODULE_1__.StickyMarkdown.createFromNewCell(this, this.notebook);
                    break;
                default:
                    break;
            }
            // Notify the tab to update tab name
            this.stickyLand.stickyTab.updateActiveTab();
        };
        /**
         * Handle drag enter according to the current content type
         * @param event Lumino IDragEvent
         */
        this.dragEnterHandler = (event) => {
            if (this.curContent instanceof _dropzone__WEBPACK_IMPORTED_MODULE_0__.Dropzone) {
                this.curContent.dragEnterHandler(event);
            }
        };
        /**
         * Handle drag over according to the current content type
         * @param event Lumino IDragEvent
         */
        this.dragOverHandler = (event) => {
            if (this.curContent instanceof _dropzone__WEBPACK_IMPORTED_MODULE_0__.Dropzone) {
                this.curContent.dragOverHandler(event);
            }
        };
        /**
         * Handle drop leave according to the current content type
         * @param event Lumino IDragEvent
         */
        this.dragDropHandler = (event) => {
            if (this.curContent instanceof _dropzone__WEBPACK_IMPORTED_MODULE_0__.Dropzone) {
                this.curContent.dragDropHandler(event);
            }
        };
        /**
         * Handle drag leave according to the current content type
         * @param event Lumino IDragEvent
         */
        this.dragLeaveHandler = (event) => {
            if (this.curContent instanceof _dropzone__WEBPACK_IMPORTED_MODULE_0__.Dropzone) {
                this.curContent.dragLeaveHandler(event);
            }
        };
        this.swapToDropzone = () => {
            // Dispose the current content
            this.curContent.closeClicked();
        };
        this.dispose = () => {
            // Dispose the current content
            this.curContent.closeClicked();
            // Dispose the dropzone
            this.curContent.dispose();
            this.wrapperNode.remove();
            this.isDisposed = true;
        };
        this.stickyContainer = stickyContainer;
        this.notebook = panel;
        this.stickyLand = stickyLand;
        // Add the content element
        this.wrapperNode = document.createElement('div');
        this.wrapperNode.classList.add('sticky-content');
        this.stickyContainer.appendChild(this.wrapperNode);
        // Add a header and a content
        this.headerNode = document.createElement('div');
        this.headerNode.classList.add('header');
        this.wrapperNode.appendChild(this.headerNode);
        this.contentNode = document.createElement('div');
        this.contentNode.classList.add('content');
        this.wrapperNode.appendChild(this.contentNode);
        // Show a dropzone at first
        this.curContent = new _dropzone__WEBPACK_IMPORTED_MODULE_0__.Dropzone(this);
    }
}


/***/ }),

/***/ "./lib/dropzone.js":
/*!*************************!*\
  !*** ./lib/dropzone.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Dropzone": () => (/* binding */ Dropzone)
/* harmony export */ });
/* harmony import */ var _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/cells */ "webpack/sharing/consume/default/@jupyterlab/cells");
/* harmony import */ var _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _content__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./content */ "./lib/content.js");
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./icons */ "./lib/icons.js");



/**
 * Class that implements the Dropzone state where the StickyContent is empty
 * and waiting for users to drop some cells.
 */
class Dropzone {
    constructor(stickyContent) {
        this.isDisposed = false;
        /**
         * Handle drag enter (highlight the border)
         * @param event Lumino IDragEvent
         */
        this.dragEnterHandler = (event) => {
            // Highlight the border to indicate dragover
            if (this.doseReceiveDrop) {
                this.node.classList.add('drag-over');
            }
        };
        /**
         * Handle drag over (highlight the border)
         * @param event Lumino IDragEvent
         */
        this.dragOverHandler = (event) => {
            // Highlight the border to indicate dragover
            if (this.doseReceiveDrop) {
                this.node.classList.add('drag-over');
            }
        };
        /**
         * Handle drag drop (highlight the border)
         * @param event Lumino IDragEvent
         */
        this.dragDropHandler = (event) => {
            // Dehighlight the view
            this.node.classList.remove('drag-over');
            this.doseReceiveDrop = false;
            // Query the notebook information
            const notebook = event.source.parent;
            let cell;
            let cellContentType;
            if (event.source.activeCell instanceof _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__.MarkdownCell) {
                cell = notebook.content.activeCell;
                cellContentType = _content__WEBPACK_IMPORTED_MODULE_1__.ContentType.Markdown;
            }
            else {
                cell = notebook.content.activeCell;
                cellContentType = _content__WEBPACK_IMPORTED_MODULE_1__.ContentType.Code;
            }
            // Create a new tab and populate it with the corresponding cell
            // Swap the dropzone with the new tab
            this.stickyContent.swapDropzoneWithExistingCell(cell, cellContentType);
        };
        /**
         * Handle drag leave (dehighlight the border)
         * @param event Lumino IDragEvent
         */
        this.dragLeaveHandler = (event) => {
            // Dehighlight the border to indicate dragover
            this.node.classList.remove('drag-over');
        };
        /**
         * Implement this function to be consistent with other cell content
         */
        this.closeClicked = () => {
            // pass
        };
        /**
         * Handle mouse click on the create button
         * @param event Mouse movement event
         */
        this.createClickHandler = (event) => {
            // Query the current value of the cell type dropdown
            const curOption = this.select.value;
            switch (curOption) {
                case _content__WEBPACK_IMPORTED_MODULE_1__.ContentType.Code:
                    this.stickyContent.swapDropzoneWithNewCell(_content__WEBPACK_IMPORTED_MODULE_1__.ContentType.Code);
                    break;
                case _content__WEBPACK_IMPORTED_MODULE_1__.ContentType.Markdown:
                    this.stickyContent.swapDropzoneWithNewCell(_content__WEBPACK_IMPORTED_MODULE_1__.ContentType.Markdown);
                    break;
                case _content__WEBPACK_IMPORTED_MODULE_1__.ContentType.Dropzone:
                    // Noop if users do not select a new cell type
                    break;
                default:
                    break;
            }
        };
        this.stickyContent = stickyContent;
        this.doseReceiveDrop = true;
        // Add a dropzone element (providing feedback of drag-and-drop)
        this.node = document.createElement('div');
        this.node.classList.add('dropzone');
        this.stickyContent.contentNode.append(this.node);
        // Initialize the content
        // Add an icon
        const addIconElem = document.createElement('div');
        addIconElem.classList.add('svg-icon');
        this.node.append(addIconElem);
        _icons__WEBPACK_IMPORTED_MODULE_2__.MyIcons.addIcon.element({ container: addIconElem });
        // Add a text label
        const label = document.createElement('span');
        label.classList.add('dropzone-label');
        label.innerText = 'Drag a cell here or create a new one';
        this.node.append(label);
        // Add bottom container
        const bottomContainer = document.createElement('div');
        bottomContainer.classList.add('dropzone-bottom-container');
        this.node.append(bottomContainer);
        // Add a select option
        const selectContainer = document.createElement('div');
        selectContainer.classList.add('dropzone-select-container');
        bottomContainer.append(selectContainer);
        this.select = document.createElement('select');
        this.select.classList.add('dropzone-select');
        selectContainer.append(this.select);
        // Add a small caret down icon (from jp)
        const selectIcon = document.createElement('span');
        selectContainer.append(selectIcon);
        _icons__WEBPACK_IMPORTED_MODULE_2__.MyIcons.caretDownEmptyIcon.element({
            container: selectIcon
        });
        this.selectButton = document.createElement('button');
        this.selectButton.classList.add('dropzone-button', 'button');
        bottomContainer.append(this.selectButton);
        this.selectButton.type = 'button';
        this.selectButton.innerText = 'Create';
        this.selectButton.addEventListener('click', this.createClickHandler);
        // Add options to the select list
        const newCellOptions = [
            { name: 'Select new cell type', type: _content__WEBPACK_IMPORTED_MODULE_1__.ContentType.Dropzone },
            { name: 'Code', type: _content__WEBPACK_IMPORTED_MODULE_1__.ContentType.Code },
            { name: 'Markdown', type: _content__WEBPACK_IMPORTED_MODULE_1__.ContentType.Markdown }
        ];
        newCellOptions.forEach(o => {
            const option = document.createElement('option');
            option.value = _content__WEBPACK_IMPORTED_MODULE_1__.ContentType[o.type];
            option.innerText = o.name;
            this.select.append(option);
        });
    }
    dispose() {
        this.node.remove();
        this.isDisposed = true;
    }
}
Dropzone.numDz = 0;


/***/ }),

/***/ "./lib/floating.js":
/*!*************************!*\
  !*** ./lib/floating.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FloatingWindow": () => (/* binding */ FloatingWindow)
/* harmony export */ });
/* harmony import */ var _content__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./content */ "./lib/content.js");
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./icons */ "./lib/icons.js");


const WINDOW_GAP = 5;
/**
 * Class that implements the Code cell in StickyLand.
 */
class FloatingWindow {
    constructor(cellType, stickyCell) {
        var _a, _b;
        this.isDisposed = false;
        this.lastMousePos = [0, 0];
        // Properties for FLIP animation
        this.startPos = null;
        this.endPos = null;
        /**
         * Compute the initial window position + size
         */
        this.registerStartPos = () => {
            const bbox = this.stickyCell.stickyContent.wrapperNode.getBoundingClientRect();
            const headerHeight = 28;
            return {
                x: bbox.x,
                y: bbox.y - headerHeight,
                width: bbox.width,
                height: bbox.height
            };
        };
        /**
         * Compute the ending floating window position + size
         */
        this.registerEndPos = () => {
            // pass
            const bbox = this.node.getBoundingClientRect();
            return {
                x: bbox.x,
                y: bbox.y,
                width: bbox.width,
                height: bbox.height
            };
        };
        /**
         * Animate the launching process of the floating window
         */
        this.playLaunchingAnimation = () => {
            if (this.startPos && this.endPos) {
                // Compute the transformation from end to the start
                const widthScale = this.startPos.width / this.endPos.width;
                const heightScale = this.startPos.height / this.endPos.height;
                const xTranslate = this.startPos.x - this.endPos.x;
                const yTranslate = this.startPos.y - this.endPos.y;
                // Apply the transform
                this.node.animate([
                    {
                        transformOrigin: 'top left',
                        transform: `
            translate(${xTranslate}px, ${yTranslate}px)
            scale(${widthScale}, ${heightScale})
          `
                    },
                    {
                        transformOrigin: 'top left',
                        transform: 'none'
                    }
                ], {
                    duration: 200,
                    easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
                });
            }
        };
        /**
         * Animate the landing process of the floating window
         */
        this.playLandingAnimation = (callback) => {
            if (this.startPos && this.endPos) {
                this.registerEndPos();
                // Compute the transformation from start to the end
                const widthScale = this.startPos.width / this.endPos.width;
                const heightScale = this.startPos.height / this.endPos.height;
                const xTranslate = this.startPos.x - this.endPos.x;
                const yTranslate = this.startPos.y - this.endPos.y;
                // Apply the transform
                const animation = this.node.animate([
                    {
                        transformOrigin: 'top left',
                        transform: 'none',
                        opacity: 1
                    },
                    {
                        transformOrigin: 'top left',
                        transform: `
              translate(${xTranslate}px, ${yTranslate}px)
              scale(${widthScale}, ${heightScale})
            `,
                        opacity: 0
                    }
                ], {
                    duration: 350,
                    easing: 'cubic-bezier(0.0, 0.0, 0.2, 1)'
                });
                animation.onfinish = e => {
                    callback();
                };
            }
        };
        /**
         * Add a place holder in the content node in StickyLand when the cell is floating
         * @returns Placeholder node
         */
        this.addPlaceholder = () => {
            const placeholder = document.createElement('div');
            placeholder.classList.add('floating-placeholder');
            this.stickyCell.stickyContent.wrapperNode.appendChild(placeholder);
            // Add an icon
            const addIconElem = document.createElement('div');
            addIconElem.classList.add('svg-icon');
            placeholder.append(addIconElem);
            _icons__WEBPACK_IMPORTED_MODULE_0__.MyIcons.launchIcon.element({ container: addIconElem });
            // Add a text label
            const label = document.createElement('span');
            label.classList.add('placeholder-label');
            label.innerText = 'This cell is floating';
            placeholder.append(label);
            // Add bottom container
            const bottomContainer = document.createElement('div');
            bottomContainer.classList.add('placeholder-bottom-container');
            placeholder.append(bottomContainer);
            // Create a button to summon the floating window
            const button = document.createElement('button');
            button.classList.add('placeholder-button', 'button');
            bottomContainer.append(button);
            button.type = 'button';
            button.innerText = 'summon';
            button.addEventListener('click', this.landButtonClicked);
            return placeholder;
        };
        /**
         * Put the cell back to StickyLand.
         * @param e Event
         */
        this.landButtonClicked = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.land();
            const callback = () => {
                this.dispose();
            };
            this.playLandingAnimation(callback);
        };
        /**
         * Land the sticky window and close the corresponding tab
         * @param e Event
         */
        this.closeButtonClicked = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const callback = () => {
                // First put back the cell
                this.land();
                // Close the tab
                if (this.tab) {
                    this.stickyTab.closeTab(this.tab);
                }
                this.dispose();
            };
            // We don't need to play animation if user wants to close the cell
            callback();
        };
        /**
         * Put back the elements to the StickyLand.
         */
        this.land = () => {
            var _a;
            // Remove the placeholder
            this.placeholder.remove();
            // Put back the elements to stickyland
            const floatingWrapper = this.node.querySelector('.sticky-content');
            if (floatingWrapper) {
                this.stickyCell.stickyContent.wrapperNode.append(...floatingWrapper.childNodes);
            }
            // Show the launching icon
            const launchIcon = (_a = this.stickyCell.stickyContent.headerNode.querySelector('.button-launch')) === null || _a === void 0 ? void 0 : _a.parentElement;
            launchIcon === null || launchIcon === void 0 ? void 0 : launchIcon.classList.remove('no-display');
            // Remove the FloatingWindow object from the sticky content
            const windowIndex = this.stickyCell.stickyContent.stickyLand.floatingWindows.indexOf(this);
            this.stickyCell.stickyContent.stickyLand.floatingWindows.splice(windowIndex, 1);
            this.stickyCell.isFloating = false;
        };
        /**
         * Event handler for mouse down. It trigger the document to listen to mouse
         * move events
         * @param e Event
         */
        this.headerMousedownHandler = (e) => {
            var _a;
            e.preventDefault();
            e.stopPropagation();
            const mouseEvent = e;
            // Raise the clicked window
            (_a = this.node.parentNode) === null || _a === void 0 ? void 0 : _a.appendChild(this.node);
            // Create a window size mask so that we can override the codemirror cursor
            const cursorMask = document.createElement('div');
            cursorMask.classList.add('cursor-mask');
            cursorMask.style.cursor = 'move';
            document.body.appendChild(cursorMask);
            // Also need to mask the internal region
            const innerCursorMask = document.createElement('div');
            innerCursorMask.classList.add('cursor-mask');
            innerCursorMask.style.cursor = 'move';
            this.node.appendChild(innerCursorMask);
            // Register the offset from the initial click position to the div location
            this.lastMousePos = [mouseEvent.pageX, mouseEvent.pageY];
            const mouseMoveHandler = (e) => {
                e.preventDefault();
                e.stopPropagation();
                const mouseEvent = e;
                let newX = this.node.offsetLeft + mouseEvent.pageX - this.lastMousePos[0];
                let newY = this.node.offsetTop + mouseEvent.pageY - this.lastMousePos[1];
                this.lastMousePos[0] = mouseEvent.pageX;
                this.lastMousePos[1] = mouseEvent.pageY;
                const nodeBBox = this.node.getBoundingClientRect();
                // Bound x and y so the window is not out of its container
                const maxNewX = this.containerSize.width - nodeBBox.width - WINDOW_GAP;
                newX = Math.max(0, newX);
                newX = Math.min(maxNewX, newX);
                const maxNewY = this.containerSize.height - nodeBBox.height - WINDOW_GAP;
                newY = Math.max(0, newY);
                newY = Math.min(maxNewY, newY);
                this.node.style.left = `${newX}px`;
                this.node.style.top = `${newY}px`;
                // Also bound the max width and max height to avoid resize overflow
                if (newX !== maxNewX) {
                    this.node.style.maxWidth = `${this.containerSize.width - newX - WINDOW_GAP}px`;
                }
                if (newY !== maxNewY) {
                    this.node.style.maxHeight = `${this.containerSize.height - newY - WINDOW_GAP}px`;
                }
            };
            const mouseUpHandler = () => {
                document.removeEventListener('mousemove', mouseMoveHandler, true);
                document.removeEventListener('mouseup', mouseUpHandler, true);
                document.body.style.cursor = 'default';
                cursorMask.remove();
                innerCursorMask.remove();
            };
            // Bind the mouse event listener to the document so we can track the movement
            // if outside the header region
            document.addEventListener('mousemove', mouseMoveHandler, true);
            document.addEventListener('mouseup', mouseUpHandler, true);
            document.body.style.cursor = 'move';
        };
        // Create the floating window element
        this.node = document.createElement('div');
        this.node.classList.add('floating-window', 'hidden');
        // Append the floating window to different elements for notebook/lab
        if (document.querySelector('#jp-main-content-panel') !== null) {
            this.container = document.querySelector('#jp-main-content-panel');
        }
        else {
            this.container = document.querySelector('#main-panel');
        }
        (_a = this.container) === null || _a === void 0 ? void 0 : _a.appendChild(this.node);
        if (this.container === null) {
            console.warn('StickyLand: Cannot find container to inject the floating cell!');
        }
        // Set max size to bound the floating window
        this.containerSize = {
            width: 2000,
            height: 1500
        };
        if (this.container !== null) {
            const containerBBox = this.container.getBoundingClientRect();
            this.containerSize.width = containerBBox.width;
            this.containerSize.height = containerBBox.height;
        }
        // Add a top header to the window
        this.header = document.createElement('div');
        this.header.classList.add('floating-header');
        this.node.appendChild(this.header);
        const headerText = document.createElement('span');
        this.cellType = cellType;
        this.stickyCell = stickyCell;
        this.stickyTab = this.stickyCell.stickyContent.stickyLand.stickyTab;
        this.tab = this.stickyTab.activeTab;
        this.stickyLand = this.stickyCell.stickyContent.stickyLand;
        // We first put the cell on the left edge of the notebook panel
        const initLeft = this.stickyCell.notebook.node.getBoundingClientRect().x + 10;
        // Position the node to the inner region and offset it a little bit when
        // users create multiple windows
        const curLeft = initLeft + this.stickyLand.floatingWindows.length * 20;
        const curTop = 100 + this.stickyLand.floatingWindows.length * 20;
        this.node.style.left = `${curLeft}px`;
        this.node.style.top = `${curTop}px`;
        this.node.style.maxWidth = `${this.containerSize.width - curLeft - WINDOW_GAP}px`;
        this.node.style.maxHeight = `${this.containerSize.height - curTop - WINDOW_GAP}px`;
        // Query the cell index for this cell
        let cellIndex = 1;
        if (this.stickyTab.activeTab) {
            cellIndex = this.stickyTab.activeTab.cellIndex;
        }
        if (cellType === _content__WEBPACK_IMPORTED_MODULE_1__.ContentType.Code) {
            headerText.innerText = `Code-${cellIndex}`;
        }
        else {
            headerText.innerText = `Markdown-${cellIndex}`;
        }
        this.header.appendChild(headerText);
        // Add two buttons to the header
        const headerIcons = document.createElement('div');
        headerIcons.classList.add('button-group');
        this.header.appendChild(headerIcons);
        const icon1 = document.createElement('div');
        icon1.classList.add('header-button');
        icon1.setAttribute('title', 'Put pack the cell to StickyLand');
        _icons__WEBPACK_IMPORTED_MODULE_0__.MyIcons.landIcon.element({ container: icon1 });
        headerIcons.appendChild(icon1);
        const icon2 = document.createElement('div');
        icon2.classList.add('header-button');
        icon2.setAttribute('title', 'Close the cell');
        _icons__WEBPACK_IMPORTED_MODULE_0__.MyIcons.closeIcon2.element({ container: icon2 });
        headerIcons.appendChild(icon2);
        // Bind event handlers for those two buttons
        icon1.addEventListener('click', this.landButtonClicked);
        icon2.addEventListener('click', this.closeButtonClicked);
        // Need to cancel mousedown event to avoid header dragging
        icon1.addEventListener('mousedown', e => {
            e.preventDefault();
            e.stopPropagation();
        });
        icon2.addEventListener('mousedown', e => {
            e.preventDefault();
            e.stopPropagation();
        });
        // Allow users to drag the window to change the position
        this.header.addEventListener('mousedown', this.headerMousedownHandler);
        // Push itself to the floating window array
        this.stickyLand.floatingWindows.push(this);
        // Hide the launching icon
        const launchIcon = (_b = this.stickyCell.stickyContent.headerNode.querySelector('.button-launch')) === null || _b === void 0 ? void 0 : _b.parentElement;
        launchIcon === null || launchIcon === void 0 ? void 0 : launchIcon.classList.add('no-display');
        // Register the start position
        this.startPos = this.registerStartPos();
        // Add the content from the cell to the floating window
        const floatingContent = this.stickyCell.stickyContent.wrapperNode.cloneNode(false);
        floatingContent.append(...this.stickyCell.stickyContent.wrapperNode.childNodes);
        this.node.append(floatingContent);
        // Set the initial width to fit the codemirror default width
        const cmSizer = this.node.querySelector('.CodeMirror-sizer');
        if (cmSizer !== null) {
            this.node.style.width = `${parseInt(cmSizer.style.minWidth) + 20}px`;
        }
        // Register the end position
        this.endPos = this.registerEndPos();
        // Override the auto height from code mirror
        this.node.style.height = `${this.endPos.height}px`;
        // Play the animation
        this.node.classList.remove('hidden');
        this.playLaunchingAnimation();
        // Add a placeholder in the original sticky content
        this.placeholder = this.addPlaceholder();
    }
    dispose() {
        this.header.removeEventListener('mousedown', this.headerMousedownHandler);
        this.node.remove();
        this.isDisposed = true;
    }
}


/***/ }),

/***/ "./lib/icons.js":
/*!**********************!*\
  !*** ./lib/icons.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MyIcons": () => (/* binding */ MyIcons)
/* harmony export */ });
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_img_icon_add_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../style/img/icon-add.svg */ "./style/img/icon-add.svg");
/* harmony import */ var _style_img_icon_collapse_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../style/img/icon-collapse.svg */ "./style/img/icon-collapse.svg");
/* harmony import */ var _style_img_icon_launch_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../style/img/icon-launch.svg */ "./style/img/icon-launch.svg");
/* harmony import */ var _style_img_icon_land_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../style/img/icon-land.svg */ "./style/img/icon-land.svg");
/* harmony import */ var _style_img_icon_expand_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../style/img/icon-expand.svg */ "./style/img/icon-expand.svg");
/* harmony import */ var _style_img_icon_close2_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../style/img/icon-close2.svg */ "./style/img/icon-close2.svg");
/* harmony import */ var _style_img_icon_chevron_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../style/img/icon-chevron.svg */ "./style/img/icon-chevron.svg");
/* harmony import */ var _style_img_icon_drag_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../style/img/icon-drag.svg */ "./style/img/icon-drag.svg");
/* harmony import */ var _style_img_icon_tabclose_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../style/img/icon-tabclose.svg */ "./style/img/icon-tabclose.svg");










class MyIcons {
}
MyIcons.runIcon = _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.runIcon;
MyIcons.editIcon = _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.editIcon;
MyIcons.ellipsesIcon = _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.ellipsesIcon;
MyIcons.closeIcon = _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.closeIcon;
MyIcons.caretDownEmptyIcon = _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.caretDownEmptyIcon;
MyIcons.addIcon2 = _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.addIcon;
MyIcons.addIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'icon-add',
    svgstr: _style_img_icon_add_svg__WEBPACK_IMPORTED_MODULE_1__["default"]
});
MyIcons.collapseIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'icon-collapse',
    svgstr: _style_img_icon_collapse_svg__WEBPACK_IMPORTED_MODULE_2__["default"]
});
MyIcons.launchIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'icon-launch',
    svgstr: _style_img_icon_launch_svg__WEBPACK_IMPORTED_MODULE_3__["default"]
});
MyIcons.landIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'icon-land',
    svgstr: _style_img_icon_land_svg__WEBPACK_IMPORTED_MODULE_4__["default"]
});
MyIcons.closeIcon2 = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'icon-close2',
    svgstr: _style_img_icon_close2_svg__WEBPACK_IMPORTED_MODULE_5__["default"]
});
MyIcons.expandIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'icon-expand',
    svgstr: _style_img_icon_expand_svg__WEBPACK_IMPORTED_MODULE_6__["default"]
});
MyIcons.chevronIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'icon-chevron',
    svgstr: _style_img_icon_chevron_svg__WEBPACK_IMPORTED_MODULE_7__["default"]
});
MyIcons.dragIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'icon-drag',
    svgstr: _style_img_icon_drag_svg__WEBPACK_IMPORTED_MODULE_8__["default"]
});
MyIcons.tabCloseIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'icon-tabClose',
    svgstr: _style_img_icon_tabclose_svg__WEBPACK_IMPORTED_MODULE_9__["default"]
});


/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./button */ "./lib/button.js");


const plugin = {
    id: 'jupyterlab_stickyland',
    autoStart: true,
    requires: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ICommandPalette],
    activate: function (app) {
        console.log('Activating StickyLand.');
        app.docRegistry.addWidgetExtension('Notebook', new _button__WEBPACK_IMPORTED_MODULE_1__.ButtonExtension());
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugin);


/***/ }),

/***/ "./lib/markdown.js":
/*!*************************!*\
  !*** ./lib/markdown.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StickyMarkdown": () => (/* binding */ StickyMarkdown)
/* harmony export */ });
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/notebook */ "webpack/sharing/consume/default/@jupyterlab/notebook");
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _floating__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./floating */ "./lib/floating.js");
/* harmony import */ var _content__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./content */ "./lib/content.js");
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./icons */ "./lib/icons.js");




/**
 * Class that implements the Markdown cell in StickyLand.
 */
class StickyMarkdown {
    constructor() {
        this.isDisposed = false;
        this.isFloating = false;
        /**
         * Strip unnecessary elements from the nodes before appending it to stickyland
         */
        this.cleanCellClone = () => {
            var _a, _b, _c, _d, _e;
            // Remove the left region (prompt and collapser), header and footer
            (_a = this.cellNode.querySelector('.jp-Cell-inputCollapser')) === null || _a === void 0 ? void 0 : _a.remove();
            (_b = this.cellNode.querySelector('.jp-InputArea-prompt')) === null || _b === void 0 ? void 0 : _b.remove();
            (_c = this.cellNode.querySelector('.jp-CellHeader')) === null || _c === void 0 ? void 0 : _c.remove();
            (_d = this.cellNode.querySelector('.jp-CellFooter')) === null || _d === void 0 ? void 0 : _d.remove();
            // Add class name to the rendered region
            (_e = this.cellNode
                .querySelector('.jp-MarkdownOutput')) === null || _e === void 0 ? void 0 : _e.classList.add('sticky-md-output');
            this.cellNode.classList.add('sticky-md-cell');
            this.cellNode.classList.remove('hidden');
            // Render the latex on the clone node
            this.renderLatex();
        };
        /**
         * Bind event handlers for sticky markdown cell.
         */
        this.bindEventHandlers = () => {
            // Double click the rendered view should trigger editor
            this.node.addEventListener('dblclick', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (this.cell.rendered) {
                    this.enterEditor();
                }
            });
            // Click on the rendered view should focus the current element
            this.node.addEventListener('click', (e) => {
                if (this.cell.rendered) {
                    this.node.focus();
                }
            });
            // Bind keyboard short cuts
            this.node.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    if (e.shiftKey || e.ctrlKey) {
                        // [Shift + enter] or [control + enter] render the markdown cell
                        if (!this.cell.rendered) {
                            this.quitEditor();
                        }
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    else {
                        // [Enter] in rendered mode triggers the editor
                        if (this.cell.rendered) {
                            this.enterEditor();
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    }
                }
            });
        };
        /**
         * Create a toolbar element
         * @param items List of toolbar item names and onclick handlers
         */
        this.createToolbar = (items) => {
            const toolbar = document.createElement('div');
            toolbar.classList.add('sticky-toolbar', 'jp-Toolbar');
            // Add buttons into the toolbar
            items.forEach(d => {
                const item = document.createElement('div');
                item.classList.add('jp-ToolbarButton', 'jp-Toolbar-item');
                toolbar.appendChild(item);
                const itemElem = document.createElement('button');
                itemElem.classList.add('jp-ToolbarButtonComponent', 'button', 'jp-Button', 'toolbar-button', 'bp3-button', 'bp3-minimal', `button-${d.name}`);
                itemElem.setAttribute('title', d.title);
                itemElem.addEventListener('click', d.onClick);
                item.appendChild(itemElem);
                // Add icon to the button
                const iconSpan = document.createElement('span');
                iconSpan.classList.add('jp-ToolbarButtonComponent-icon');
                itemElem.appendChild(iconSpan);
                d.icon.element({
                    container: iconSpan
                });
            });
            return toolbar;
        };
        /**
         * Helper function to enter the editor mode.
         */
        this.enterEditor = () => {
            // Trigger the editor
            this.cell.rendered = false;
            // Move the cursor on the first line before the first character
            this.cell.editor.focus();
            this.cell.editor.setCursorPosition({ line: 0, column: 0 });
        };
        /**
         * Helper function to quit the editor mode.
         */
        this.quitEditor = () => {
            // Trigger the rendered output
            this.cell.rendered = true;
            // Focus the cell node so we can listen to keyboard events
            this.node.focus();
            /**
             * Since we are not attaching the renderer widget to any other widget, the
             * onAttach method is never called, so the latex typesetter is never called
             * We need to manually call it after rendering the node
             */
            this.renderLatex();
        };
        /**
         * A helper function to force render latex after timeout.
         * @param timeout Call the latex renderer after `timeout` ms
         */
        this.renderLatex = (timeout = 100) => {
            /**
             * Since we are not attaching the renderer widget to any other widget, the
             * onAttach method is never called, so the latex typesetter is never called
             * We need to manually call it after rendering the node
             * https://github.com/jupyterlab/jupyterlab/blob/d48e0c04efb786561137fb20773fc15788507f0a/packages/rendermime/src/widgets.ts#L225
             */
            setTimeout(() => {
                var _a;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                (_a = this.renderer.latexTypesetter) === null || _a === void 0 ? void 0 : _a.typeset(this.renderer.node);
            }, timeout);
        };
        /**
         * Float the current code cell.
         */
        this.float = () => {
            // Create the floating window and put content from stickyland to the floating
            // window
            this.floatingWindow = new _floating__WEBPACK_IMPORTED_MODULE_1__.FloatingWindow(_content__WEBPACK_IMPORTED_MODULE_2__.ContentType.Markdown, this);
            // Finally, toggle the `isFloating` property
            this.isFloating = true;
        };
        this.editClicked = (event) => {
            event.preventDefault();
            event.stopPropagation();
            // Show the editing area
            if (this.cell.rendered) {
                this.enterEditor();
            }
        };
        this.runClicked = (event) => {
            event.preventDefault();
            event.stopPropagation();
            // Render the markdown
            if (!this.cell.rendered) {
                this.quitEditor();
            }
        };
        this.launchClicked = (event) => {
            event.preventDefault();
            event.stopPropagation();
            this.float();
        };
        this.closeClicked = () => {
            // Show the original cell
            this.originalCell.inputHidden = false;
            // TEMP: replace the current content with the dropzone
            this.stickyContent.showDropzone();
            // Remove the code cell
            this.dispose();
        };
        this.toolBarItems = [
            {
                name: 'run',
                title: 'Run the cell',
                icon: _icons__WEBPACK_IMPORTED_MODULE_3__.MyIcons.runIcon,
                onClick: this.runClicked
            },
            {
                name: 'edit',
                title: 'Edit the cell',
                icon: _icons__WEBPACK_IMPORTED_MODULE_3__.MyIcons.editIcon,
                onClick: this.editClicked
            },
            {
                name: 'launch',
                title: 'Make the cell float',
                icon: _icons__WEBPACK_IMPORTED_MODULE_3__.MyIcons.launchIcon,
                onClick: this.launchClicked
            }
        ];
    }
    /**
     * Factory function for StickyMarkdown when creating if from an existing cell
     * through dragging
     * @param stickyContent The sticky content that contains this markdown cell
     * @param cell The existing markdown cell
     * @param notebook The current notebook
     * @returns A new StickyMarkdown object
     */
    static createFromExistingCell(stickyContent, cell, notebook) {
        const md = new StickyMarkdown();
        md.stickyContent = stickyContent;
        md.notebook = notebook;
        // Clone the cell
        md.originalCell = cell;
        md.cell = md.originalCell.clone();
        // Collapse the original cell
        if (!md.originalCell.inputHidden) {
            md.originalCell.inputHidden = true;
        }
        // Save a reference to the cell's renderer (private)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        md.renderer = md.cell._renderer;
        // Add a markdown cell element
        md.node = document.createElement('div');
        md.node.classList.add('sticky-md');
        // Need to add tabindex so it can receive keyboard events
        md.node.setAttribute('tabindex', '0');
        md.stickyContent.contentNode.appendChild(md.node);
        // Add a toolbar
        md.toolbar = md.createToolbar(md.toolBarItems);
        md.stickyContent.headerNode.appendChild(md.toolbar);
        // Clean the markdown cell
        // Need to append the node to DOM first so we can do the cleaning
        md.cellNode = md.cell.node;
        md.cellNode.classList.add('hidden');
        md.node.appendChild(md.cellNode);
        // Bind the Codemirror
        const codeMirrorNode = md.cell.node.querySelector('.CodeMirror');
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        md.codemirror = codeMirrorNode.CodeMirror;
        // Bind events
        md.bindEventHandlers();
        // Clean the unnecessary elements from the node clone
        md.cleanCellClone();
        return md;
    }
    /**
     * Factory function for StickyMarkdown when creating if from a new markdown
     * cell. This function would append a new markdown cell to the main notebook.
     * @param stickyContent The sticky content that contains this markdown cell
     * @param notebook The current notebook
     * @returns A new StickyMarkdown object
     */
    static createFromNewCell(stickyContent, notebook) {
        // Append a new markdown cell to the main notebook
        _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_0__.NotebookActions.insertBelow(notebook.content);
        _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_0__.NotebookActions.changeCellType(notebook.content, 'markdown');
        const newCell = notebook.content.activeCell;
        // Activate the original active cell
        notebook.content.activeCellIndex = notebook.content.activeCellIndex - 1;
        // Construct StickyMarkdown using the new cell as an existing cell
        return this.createFromExistingCell(stickyContent, newCell, notebook);
    }
    dispose() {
        this.node.remove();
        this.toolbar.remove();
        this.isDisposed = true;
    }
}


/***/ }),

/***/ "./lib/stickyland.js":
/*!***************************!*\
  !*** ./lib/stickyland.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StickyLand": () => (/* binding */ StickyLand)
/* harmony export */ });
/* harmony import */ var _tab__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tab */ "./lib/tab.js");
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./icons */ "./lib/icons.js");


const MIN_WIDTH = 235;
const MIN_HEIGHT = 240;
class StickyLand {
    constructor(panel) {
        this.stickyContent = null;
        this.floatingWindows = [];
        /**
         * Allow users to drag the bottom left corner to resize the container
         */
        this.enableResize = () => {
            const resizeHandle = document.createElement('div');
            resizeHandle.classList.add('resize-handle');
            // Draw a few liens to signify the resize affordance
            const line1 = document.createElement('div');
            line1.classList.add('line', 'line-1');
            resizeHandle.appendChild(line1);
            const line2 = document.createElement('div');
            line2.classList.add('line', 'line-2');
            resizeHandle.appendChild(line2);
            const line3 = document.createElement('div');
            line3.classList.add('line', 'line-3');
            resizeHandle.appendChild(line3);
            this.node.append(resizeHandle);
            resizeHandle.addEventListener('mousedown', this.resizeMousedownHandler);
        };
        /**
         * Handle the dragging on the resize handle on the bottom left corner
         * @param e Mouse event
         */
        this.resizeMousedownHandler = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const bbox = this.node.getBoundingClientRect();
            const rightX = bbox.x + bbox.width;
            const topY = bbox.y;
            // Create a window size mask so that we can override the codemirror cursor
            const cursorMask = document.createElement('div');
            cursorMask.classList.add('cursor-mask');
            cursorMask.style.cursor = 'nesw-resize';
            document.body.appendChild(cursorMask);
            const mouseMoveHandler = (e) => {
                e.preventDefault();
                e.stopPropagation();
                const mouseEvent = e;
                const newX = mouseEvent.pageX;
                const newWidth = Math.max(MIN_WIDTH, rightX - newX);
                const newY = mouseEvent.pageY;
                const newHeight = Math.max(MIN_HEIGHT, newY - topY);
                this.node.style.width = `${newWidth}px`;
                this.node.style.height = `${newHeight}px`;
            };
            const mouseUpHandler = () => {
                document.removeEventListener('mousemove', mouseMoveHandler, true);
                document.removeEventListener('mouseup', mouseUpHandler, true);
                document.body.style.cursor = 'default';
                cursorMask.remove();
            };
            // Bind the mouse event listener to the document so we can track the movement
            // if outside the header region
            document.addEventListener('mousemove', mouseMoveHandler, true);
            document.addEventListener('mouseup', mouseUpHandler, true);
            document.body.style.cursor = 'newsw-resize';
        };
        /**
         * Style the header so that users can reposition StickyLand.
         */
        this.initHeader = () => {
            // Add the drag icon
            const dragHandle = document.createElement('div');
            dragHandle.classList.add('drag-handle');
            this.header.appendChild(dragHandle);
            _icons__WEBPACK_IMPORTED_MODULE_0__.MyIcons.dragIcon.element({ container: dragHandle });
            // Allow the user to drag the header to change the vertical position of
            // stickyland
            this.header.addEventListener('mousedown', this.headerMousedownHandler);
        };
        this.headerMousedownHandler = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const mouseEvent = e;
            const yOffset = this.node.offsetTop - mouseEvent.pageY;
            // Create a window size mask so that we can override the codemirror cursor
            const cursorMask = document.createElement('div');
            cursorMask.classList.add('cursor-mask');
            cursorMask.style.cursor = 'move';
            document.body.appendChild(cursorMask);
            const mouseMoveHandler = (e) => {
                e.preventDefault();
                e.stopPropagation();
                const mouseEvent = e;
                const newTop = mouseEvent.pageY + yOffset;
                this.node.style.top = `${newTop}px`;
            };
            const mouseUpHandler = () => {
                document.removeEventListener('mousemove', mouseMoveHandler, true);
                document.removeEventListener('mouseup', mouseUpHandler, true);
                document.body.style.cursor = 'default';
                cursorMask.remove();
            };
            // Bind the mouse event listener to the document so we can track the movement
            // if outside the header region
            document.addEventListener('mousemove', mouseMoveHandler, true);
            document.addEventListener('mouseup', mouseUpHandler, true);
            document.body.style.cursor = 'move';
        };
        this.isHidden = () => {
            return this.node.classList.contains('hidden');
        };
        this.hide = () => {
            this.node.classList.add('hidden');
            // Also hide all floating windows
            this.floatingWindows.forEach(d => {
                d.node.classList.add('hidden');
            });
        };
        this.show = () => {
            this.node.classList.remove('hidden');
            // Also show all floating windows
            this.floatingWindows.forEach(d => {
                d.node.classList.remove('hidden');
            });
        };
        /**
         * Handle drag drop event
         *
         * ### Note
         * https://jupyterlab.github.io/lumino/dragdrop/interfaces/idragevent.html
         * We need to call preventDefault() to cancel (dispose) the event to have our
         * own action
         *
         * @param event Lumino IDragEVent
         */
        this.dragDropHandler = (event) => {
            event.preventDefault();
            event.stopPropagation();
            // Let the content handle drag drop
            if (this.stickyContent) {
                this.stickyContent.dragDropHandler(event);
            }
        };
        /**
         * Handle drag enter event
         *
         * ### Note
         * https://jupyterlab.github.io/lumino/dragdrop/interfaces/idragevent.html
         * We need to call preventDefault() to cancel (dispose) the event to have our
         * own action
         *
         * @param event Lumino IDragEVent
         */
        this.dragEnterHandler = (event) => {
            event.preventDefault();
            event.stopPropagation();
            // Change the view of content
            if (this.stickyContent) {
                this.stickyContent.dragEnterHandler(event);
            }
        };
        /**
         * Handle drag over events
         *
         * ### Note
         * https://jupyterlab.github.io/lumino/dragdrop/interfaces/idragevent.html
         * We need to call preventDefault() to cancel (dispose) the event to have our
         * own action
         *
         * @param event Lumino IDragEVent
         */
        this.dragOverHandler = (event) => {
            event.preventDefault();
            event.stopPropagation();
            // Changer the cursor style (only way to change cursor style here)
            // Lumino's drag's dispatch checks the `dropAction` field to call
            // overrideCursor() internally
            // https://jupyterlab.github.io/lumino/dragdrop/interfaces/idragevent.html
            // https://github.com/jupyterlab/lumino/blob/e6612f622c827b2e85cffb1858fcc3bf1b09be76/packages/dragdrop/src/index.ts#L474
            event.dropAction = 'copy';
            // Change the view of content
            if (this.stickyContent) {
                this.stickyContent.dragOverHandler(event);
            }
        };
        /**
         * Handle drag leave event
         *
         * ### Note
         * https://jupyterlab.github.io/lumino/dragdrop/interfaces/idragevent.html
         * We need to call preventDefault() to cancel (dispose) the event to have our
         * own action
         *
         * @param event Lumino IDragEVent
         */
        this.dragLeaveHandler = (event) => {
            event.preventDefault();
            event.stopPropagation();
            // Change the view of content
            if (this.stickyContent) {
                this.stickyContent.dragLeaveHandler(event);
            }
        };
        this.node = document.createElement('div');
        this.node.classList.add('sticky-container', 'hidden');
        // Put stickyland below the toolbar
        const toolbarHeight = parseFloat(panel.toolbar.node.style.height);
        this.node.style.top = `${toolbarHeight + 30}px`;
        panel.node.appendChild(this.node);
        // Create a header so that users can drag
        this.header = document.createElement('div');
        this.header.classList.add('sticky-header');
        this.node.appendChild(this.header);
        this.initHeader();
        // Add the tab element
        this.stickyTab = new _tab__WEBPACK_IMPORTED_MODULE_1__.StickyTab(this.node, panel, this);
        // Allow users to drag to resize
        this.enableResize();
        // Register the drag-and-drop events
        this.node.addEventListener('lm-drop', e => this.dragDropHandler(e), true);
        this.node.addEventListener('lm-dragenter', e => this.dragEnterHandler(e), true);
        this.node.addEventListener('lm-dragover', e => this.dragOverHandler(e), true);
        this.node.addEventListener('lm-dragleave', e => this.dragLeaveHandler(e), true);
    }
}


/***/ }),

/***/ "./lib/tab.js":
/*!********************!*\
  !*** ./lib/tab.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StickyTab": () => (/* binding */ StickyTab)
/* harmony export */ });
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/notebook */ "webpack/sharing/consume/default/@jupyterlab/notebook");
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _content__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./content */ "./lib/content.js");
/* harmony import */ var _markdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./markdown */ "./lib/markdown.js");
/* harmony import */ var _code__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./code */ "./lib/code.js");
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./icons */ "./lib/icons.js");






class StickyTab {
    constructor(stickyContainer, panel, stickyLand) {
        this.activeTab = null;
        this.tabs = [];
        this.autoRunTimeout = null;
        this.autoRunningCellNodes = new Set([]);
        this.autoRunCells = new Array();
        this.autoRunTabs = new Array();
        this.isDisposed = false;
        /**
         * Handle the executionScheduled signal.
         */
        this.handleExecutionScheduled = (_, args) => {
            if (this.autoRunningCellNodes.size !== 0) {
                return;
            }
            // Get all the code cells that have auto-run turned on
            const autoRunCells = new Array();
            const autoRunTabs = new Array();
            this.tabs.forEach(d => {
                if (d.cellType === _content__WEBPACK_IMPORTED_MODULE_1__.ContentType.Code) {
                    const curContent = d.tabContent.curContent;
                    if (curContent.autoRun) {
                        autoRunCells.push(curContent);
                        autoRunTabs.push(d);
                    }
                }
            });
            // We need to set a timeout to workaround the current executionScheduled
            // emit order
            // https://github.com/jupyterlab/jupyterlab/pull/11453
            // Also users might run multiple cells at one time, we can set a short
            // timeout so that we only run the sticky code cell once in a series of
            // other executions of other cells
            if (this.autoRunTimeout !== null) {
                clearTimeout(this.autoRunTimeout);
            }
            this.autoRunTimeout = setTimeout(() => {
                // Run the auto-run code cells
                const toRunCells = new Array();
                autoRunCells.forEach(d => {
                    // If the signal source is the cell itself, we mark it as autoRunScheduled
                    // so we won't run it again after its peers finish running
                    if (d.originalCell.node === args.cell.node) {
                        d.autoRunScheduled = true;
                    }
                    else {
                        if (!d.autoRunScheduled) {
                            d.autoRunScheduled = true;
                            // d.execute returns a promise but the promise can be fulfilled before
                            // the cell is executed, so we manually keep a record of all running
                            // cells and resolve them manually
                            toRunCells.push(d);
                            this.autoRunningCellNodes.add(d.originalCell.node);
                        }
                    }
                });
                toRunCells.forEach(d => d.execute(true));
                // Move the local autoRunCells/autoRunTabs to object level
                this.autoRunCells = autoRunCells;
                this.autoRunTabs = autoRunTabs;
            }, 200);
        };
        /**
         * Handle the executed signal.
         */
        this.handleExecuted = (_, args) => {
            // Check if the cell that just finishes running is scheduled by us
            if (this.autoRunningCellNodes.has(args.cell.node)) {
                // Remove watching this cell
                this.autoRunningCellNodes.delete(args.cell.node);
                // If all auto-running cells finish running, we allow all these cells to
                // be auto-run again in the future
                if (this.autoRunningCellNodes.size === 0) {
                    this.autoRunCells.forEach(d => {
                        d.autoRunScheduled = false;
                    });
                    // Also mark the tab to indicate there is new update in this tab
                    this.autoRunTabs.forEach(d => {
                        // const curCell = d.tabContent.curContent as StickyCode;
                        if (!d.tabNode.classList.contains('current')) {
                            d.tabNode.classList.add('new-update');
                        }
                    });
                    this.autoRunCells = [];
                    this.autoRunTabs = [];
                }
            }
        };
        /**
         * Create a tab containing a dropzone content. The tab name is always 'new'
         * for new tabs. Creating a different content (after interacting with the
         * dropzone will update the tab name).
         * @returns New tab
         */
        this.createTab = () => {
            // Create a new tab node
            const tabNode = document.createElement('button');
            tabNode.classList.add('tab', 'new-tab');
            tabNode.setAttribute('title', 'New tab');
            // Add a label to the button
            const tabLabel = document.createElement('span');
            tabLabel.classList.add('tab-label');
            tabNode.appendChild(tabLabel);
            // Add a delete icon
            const tabIcon = document.createElement('div');
            tabIcon.classList.add('tab-icon');
            _icons__WEBPACK_IMPORTED_MODULE_2__.MyIcons.tabCloseIcon.element({ container: tabIcon });
            tabNode.appendChild(tabIcon);
            // New tab always has the dropzone content
            tabLabel.innerHTML = 'New';
            const tabContent = new _content__WEBPACK_IMPORTED_MODULE_1__.StickyContent(this.stickyContainer, this.notebook, this.stickyLand);
            // Add this tab to the model and view
            const newTab = {
                cellType: _content__WEBPACK_IMPORTED_MODULE_1__.ContentType.Dropzone,
                cellIndex: 0,
                tabNode: tabNode,
                tabContent: tabContent,
                hasNewUpdate: false
            };
            // Handle delete icon clicked
            tabIcon.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.closeTab(newTab);
            });
            this.tabs.push(newTab);
            this.node.insertBefore(newTab.tabNode, this.addButton);
            // Handle tab clicked
            tabNode.addEventListener('click', (e) => {
                var _a;
                e.preventDefault();
                e.stopPropagation();
                // Switch the active tab to the current one
                if (((_a = this.activeTab) === null || _a === void 0 ? void 0 : _a.tabNode) !== tabNode) {
                    this.switchActiveTab(newTab);
                    // Remove the new update if it's there
                    newTab.tabNode.classList.remove('new-update');
                }
            });
            // Move the current active tab to this new one
            this.switchActiveTab(newTab);
            // Return this tab
            return newTab;
        };
        /**
         * Close the given tab
         * @param tab Tab to close
         */
        this.closeTab = (tab) => {
            // Case 1: this tab is the only tab
            if (this.tabs.length === 1) {
                // Swap the content to dropzone
                tab.tabContent.swapToDropzone();
                // Update the tab name
                this.updateActiveTab();
            }
            else {
                // Case 2: if there are other tabs
                // First swap the content to dropzone
                tab.tabContent.swapToDropzone();
                // Then remove the content
                tab.tabContent.dispose();
                // Prepare to remove the tab
                const tabIndex = this.tabs.indexOf(tab);
                // Change the active tab to the one on the left or on the right if there
                // is no tab on the left
                if (tabIndex !== 0) {
                    this.switchActiveTab(this.tabs[tabIndex - 1]);
                }
                else {
                    this.switchActiveTab(this.tabs[tabIndex + 1]);
                }
                // Remove the tab from model
                this.tabs.splice(tabIndex, 1);
                // Remove the tab from the DOM
                tab.tabNode.remove();
            }
        };
        /**
         * Change the currently active tab to the new tab
         */
        this.switchActiveTab = (newTab) => {
            if (this.activeTab) {
                // Hide the old active tab's content
                this.activeTab.tabContent.wrapperNode.classList.add('no-display');
                this.activeTab.tabNode.classList.remove('current');
            }
            this.activeTab = newTab;
            newTab.tabNode.classList.add('current');
            newTab.tabContent.wrapperNode.classList.remove('no-display');
            this.stickyLand.stickyContent = newTab.tabContent;
        };
        /**
         * Update the tab name for the active tab. This function is called when user
         * creates a new code/md cell.
         */
        this.updateActiveTab = () => {
            var _a;
            if (this.activeTab) {
                const newContent = (_a = this.activeTab) === null || _a === void 0 ? void 0 : _a.tabContent.curContent;
                // Find the new content type
                let newCellType = _content__WEBPACK_IMPORTED_MODULE_1__.ContentType.Dropzone;
                if (newContent instanceof _code__WEBPACK_IMPORTED_MODULE_3__.StickyCode) {
                    newCellType = _content__WEBPACK_IMPORTED_MODULE_1__.ContentType.Code;
                }
                else if (newContent instanceof _markdown__WEBPACK_IMPORTED_MODULE_4__.StickyMarkdown) {
                    newCellType = _content__WEBPACK_IMPORTED_MODULE_1__.ContentType.Markdown;
                }
                // Find the new cell index
                let newCellIndex = 1;
                this.tabs.forEach(d => {
                    if (d.cellType === newCellType) {
                        newCellIndex++;
                    }
                });
                // Update the tab name
                const tabLabel = this.activeTab.tabNode.querySelector('.tab-label');
                if (tabLabel) {
                    switch (newCellType) {
                        case _content__WEBPACK_IMPORTED_MODULE_1__.ContentType.Code:
                            tabLabel.innerHTML = `Code-${newCellIndex}`;
                            this.activeTab.tabNode.setAttribute('title', `Code-${newCellIndex}`);
                            this.activeTab.tabNode.classList.remove('new-tab');
                            break;
                        case _content__WEBPACK_IMPORTED_MODULE_1__.ContentType.Markdown:
                            tabLabel.innerHTML = `Markdown-${newCellIndex}`;
                            this.activeTab.tabNode.setAttribute('title', `Markdown-${newCellIndex}`);
                            this.activeTab.tabNode.classList.remove('new-tab');
                            break;
                        case _content__WEBPACK_IMPORTED_MODULE_1__.ContentType.Dropzone:
                            tabLabel.innerHTML = 'New';
                            this.activeTab.tabNode.setAttribute('title', 'New tab');
                            this.activeTab.tabNode.classList.add('new-tab');
                            break;
                        default:
                            break;
                    }
                }
                // Update the model data
                this.activeTab.cellIndex = newCellIndex;
                this.activeTab.cellType = newCellType;
            }
        };
        this.dispose = () => {
            this.isDisposed = true;
            _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_0__.NotebookActions.executionScheduled.disconnect(this.handleExecutionScheduled, this);
            _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_0__.NotebookActions.executed.disconnect(this.handleExecuted, this);
        };
        this.stickyContainer = stickyContainer;
        this.stickyLand = stickyLand;
        this.notebook = panel;
        // Add the tab element
        this.node = document.createElement('div');
        this.node.classList.add('sticky-tab', 'sticky-tab-bar');
        this.stickyContainer.append(this.node);
        // Add new cell button
        this.addButton = document.createElement('button');
        this.addButton.classList.add('add-tab');
        this.node.appendChild(this.addButton);
        _icons__WEBPACK_IMPORTED_MODULE_2__.MyIcons.addIcon2.element({ container: this.addButton });
        this.addButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            // Create a new tab and switch the active tab
            this.createTab();
        });
        // Create the first tab
        this.createTab();
        /**
         * Listen to the notebook execution events so we can auto-run the code cell
         * We need to register the listener at the tab level because there can be
         * multiple code cells with auto-run turned on. If each triggers its own
         * listener then there will be a race and infinite auto-runs.
         */
        _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_0__.NotebookActions.executionScheduled.connect(this.handleExecutionScheduled, this);
        _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_0__.NotebookActions.executed.connect(this.handleExecuted, this);
    }
}


/***/ }),

/***/ "./style/img/icon-add.svg":
/*!********************************!*\
  !*** ./style/img/icon-add.svg ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"ionicon\" viewBox=\"0 0 512 512\"><title>Add Circle</title><path d=\"M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm96 224h-80v80h-32v-80h-80v-32h80v-80h32v80h80z\"/></svg>");

/***/ }),

/***/ "./style/img/icon-chevron.svg":
/*!************************************!*\
  !*** ./style/img/icon-chevron.svg ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"ionicon\" viewBox=\"0 0 512 512\"><path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"48\" d=\"M184 112l144 144-144 144\"/></svg>");

/***/ }),

/***/ "./style/img/icon-close2.svg":
/*!***********************************!*\
  !*** ./style/img/icon-close2.svg ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"ionicon\" viewBox=\"0 0 512 512\"><path d=\"M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm75.31 260.69a16 16 0 11-22.62 22.62L256 278.63l-52.69 52.68a16 16 0 01-22.62-22.62L233.37 256l-52.68-52.69a16 16 0 0122.62-22.62L256 233.37l52.69-52.68a16 16 0 0122.62 22.62L278.63 256z\"/></svg>");

/***/ }),

/***/ "./style/img/icon-collapse.svg":
/*!*************************************!*\
  !*** ./style/img/icon-collapse.svg ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n<!-- Generator: Adobe Illustrator 24.1.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\r\n<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\r\n\t viewBox=\"0 0 512 512\" style=\"enable-background:new 0 0 512 512;\" xml:space=\"preserve\">\r\n<style type=\"text/css\">\r\n\t.st0{fill-rule:evenodd;clip-rule:evenodd;}\r\n</style>\r\n<g>\r\n\t<path class=\"st0\" d=\"M36.6,256c0-10.1,8.2-18.3,18.3-18.3h402.3c10.1,0,18.3,8.2,18.3,18.3s-8.2,18.3-18.3,18.3H54.9\r\n\t\tC44.8,274.3,36.6,266.1,36.6,256z M256,0c10.1,0,18.3,8.2,18.3,18.3v164.6c0,10.1-8.2,18.3-18.3,18.3s-18.3-8.2-18.3-18.3V18.3\r\n\t\tC237.7,8.2,245.9,0,256,0z\"/>\r\n\t<path class=\"st0\" d=\"M342.1,96.8c7.1,7.1,7.2,18.7,0,25.9l0,0L269,195.8c-7.1,7.1-18.7,7.2-25.9,0l0,0l-73.1-73.1\r\n\t\tc-7.1-7.2-7.1-18.7,0-25.9c7.2-7.1,18.7-7.1,25.9,0L256,157l60.2-60.2C323.3,89.6,334.9,89.6,342.1,96.8L342.1,96.8z M256,512\r\n\t\tc10.1,0,18.3-8.2,18.3-18.3V329.1c0-10.1-8.2-18.3-18.3-18.3s-18.3,8.2-18.3,18.3v164.6C237.7,503.8,245.9,512,256,512z\"/>\r\n\t<path class=\"st0\" d=\"M342.1,415.2c7.1-7.1,7.2-18.7,0-25.9l0,0L269,316.2c-7.1-7.1-18.7-7.2-25.9,0l0,0l-73.1,73.1\r\n\t\tc-7.1,7.2-7.1,18.7,0,25.9c7.2,7.1,18.7,7.1,25.9,0L256,355l60.2,60.2C323.3,422.4,334.9,422.4,342.1,415.2L342.1,415.2z\"/>\r\n</g>\r\n</svg>\r\n");

/***/ }),

/***/ "./style/img/icon-drag.svg":
/*!*********************************!*\
  !*** ./style/img/icon-drag.svg ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"ionicon\" viewBox=\"0 0 512 512\"><circle cx=\"256\" cy=\"256\" r=\"48\"/><circle cx=\"416\" cy=\"256\" r=\"48\"/><circle cx=\"96\" cy=\"256\" r=\"48\"/></svg>");

/***/ }),

/***/ "./style/img/icon-expand.svg":
/*!***********************************!*\
  !*** ./style/img/icon-expand.svg ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?><!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\"><svg viewBox=\"0 0 106 124\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xml:space=\"preserve\" xmlns:serif=\"http://www.serif.com/\" style=\"fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;\"><g><g><path d=\"M52.893,48.427c2.424,-0 4.392,-1.968 4.392,-4.392l0,-39.504c0,-2.424 -1.968,-4.392 -4.392,-4.392c-2.424,-0 -4.392,1.968 -4.392,4.392l0,39.504c0,2.424 1.968,4.392 4.392,4.392Z\"/><path d=\"M73.557,25.195c1.704,-1.704 1.728,-4.488 0,-6.216l-17.544,-17.544c-1.704,-1.704 -4.488,-1.728 -6.216,-0l-17.544,17.544c-1.704,1.728 -1.704,4.488 0,6.216c1.728,1.704 4.488,1.704 6.216,-0l14.424,-14.448l14.448,14.448c1.704,1.728 4.488,1.728 6.216,-0Z\"/></g><path d=\"M0.237,61.579c0,-2.424 1.968,-4.392 4.392,-4.392l96.552,-0c2.424,-0 4.392,1.968 4.392,4.392c0,2.424 -1.968,4.392 -4.392,4.392l-96.552,-0c-2.424,-0 -4.392,-1.968 -4.392,-4.392Z\"/><g><path d=\"M52.893,74.731c2.424,-0 4.392,1.968 4.392,4.392l0,39.504c0,2.424 -1.968,4.392 -4.392,4.392c-2.424,-0 -4.392,-1.968 -4.392,-4.392l0,-39.504c0,-2.424 1.968,-4.392 4.392,-4.392Z\"/><path d=\"M73.557,97.963c1.704,1.704 1.728,4.488 0,6.216l-17.544,17.544c-1.704,1.704 -4.488,1.728 -6.216,-0l-17.544,-17.544c-1.704,-1.728 -1.704,-4.488 0,-6.216c1.728,-1.704 4.488,-1.704 6.216,-0l14.424,14.448l14.448,-14.448c1.704,-1.728 4.488,-1.728 6.216,-0Z\"/></g></g></svg>");

/***/ }),

/***/ "./style/img/icon-land.svg":
/*!*********************************!*\
  !*** ./style/img/icon-land.svg ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"ionicon\" viewBox=\"0 0 512 512\"><path d=\"M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm80 224H176a16 16 0 010-32h160a16 16 0 010 32z\"/></svg>");

/***/ }),

/***/ "./style/img/icon-launch.svg":
/*!***********************************!*\
  !*** ./style/img/icon-launch.svg ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"ionicon\" viewBox=\"0 0 512 512\"><path d=\"M473 39.05a24 24 0 00-25.5-5.46L47.47 185h-.08a24 24 0 001 45.16l.41.13 137.3 58.63a16 16 0 0015.54-3.59L422 80a7.07 7.07 0 0110 10L226.66 310.26a16 16 0 00-3.59 15.54l58.65 137.38c.06.2.12.38.19.57 3.2 9.27 11.3 15.81 21.09 16.25h1a24.63 24.63 0 0023-15.46L478.39 64.62A24 24 0 00473 39.05z\"/></svg>");

/***/ }),

/***/ "./style/img/icon-tabclose.svg":
/*!*************************************!*\
  !*** ./style/img/icon-tabclose.svg ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<svg class=\"delete-tab\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"16\" data-icon=\"ui-components:close\" data-icon-id=\"58648a58-146c-4974-9873-7d2dfb468b8d\"><g class=\"x-icon-circle\" fill=\"none\"><circle cx=\"12\" cy=\"12\" r=\"11\"></circle></g><g class=\"x-icon\" fill=\"#616161\"><path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\"></path></g></svg>\n");

/***/ })

}]);
//# sourceMappingURL=lib_index_js.ff5d7e8ac5c9e6555253.js.map