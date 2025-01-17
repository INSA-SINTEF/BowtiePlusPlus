/**
 * Copyright (c) 2006-2012, JGraph Ltd
 */
/**
 * Constructs the actions object for the given UI.
 */
function Actions(editorUi) {
    this.editorUi = editorUi;
    this.actions = new Object();
    this.init();
};

/**
 * Adds the default actions.
 */
Actions.prototype.init = function () {
    var ui = this.editorUi;
    var editor = ui.editor;
    var graph = editor.graph;
    var isGraphEnabled = function () {
        return Action.prototype.isEnabled.apply(this, arguments) && graph.isEnabled();
    };
    var isLoggedIn = function () {
        return localStorage.getItem('sessionToken') !== null;
    };
    var allEnabled = function () {
        return isLoggedIn() && isGraphEnabled();
    };

    // File actions
    this.addAction('new...', function () {
        window.open(window.ROOT_PAGE);
    });
    this.addAction('openVers...', function (){
        ui.openVersioning(window.VERSIONING_SEARCH);
    }).isEnabled = isLoggedIn;
    this.addAction('openDb...', function () {
        ui.openFromDb(window.DIAGRAM_SEARCH_DIALOG);
    }).isEnabled = isLoggedIn;
    this.addAction('openLocal...', function () {
        window.openNew = false;
        window.openKey = 'open';

        // Closes dialog after open
        window.openFile = new OpenFile(mxUtils.bind(this, function () {
            ui.hideDialog();
        }));

        window.openFile.setConsumer(mxUtils.bind(this, function (xml, filename) {
            try {
                let doc;
                let data = undefined;
                //check for <diagram> tag and set risk values
                if(xml.slice(0,9) == "<diagram>"){
                    diag = xml.slice(9,-10);
                    let splittedDiagram = diag.split(/(?<=<\/mxGraphModel>)/);
                    doc = mxUtils.parseXml(splittedDiagram[0]);
                    data = mxUtils.parseXml(splittedDiagram[1]);

                }else{
                    doc = mxUtils.parseXml(xml);
                }
                editor.setGraphXml(doc.documentElement);
                editor.setModified(false);
                editor.undoManager.clear();
                //set graph values if xml contains risk values
                if(data != undefined){
                    editor.setGraphValues(data.documentElement);
                }


            } catch (e) {
                mxUtils.alert(mxResources.get('invalidOrMissingFile') + ': ' + e.message);
            }
        }));

        // Removes openFile if dialog is closed
        ui.showDialog(new OpenDialog(this).container, 320, 220, true, true, function () {
            window.openFile = null;
        });
    }).isEnabled = isGraphEnabled;
    this.addAction('openTemplate...', function () {
        ui.openFromDb(window.TEMPLATE_GRAPHS);
    }).isEnabled = isLoggedIn;
    this.addAction('roles...', function () {
        /*window.openNew = true;
        window.openKey = 'open';

        ui.openFile();*/
        ui.modifyRolesForGraph();

    }).isEnabled = isLoggedIn;
    this.addAction('manageRoles', function (){
        ui.manageRoles();
        }
    ).isEnabled = isLoggedIn;

    this.addAction('import...', function () {
        window.openNew = false;
        window.openKey = 'import';

        // Closes dialog after open
        window.openFile = new OpenFile(mxUtils.bind(this, function () {
            ui.hideDialog();
        }));

        window.openFile.setConsumer(mxUtils.bind(this, function (xml, filename) {
            try {
                let doc;
                let data = undefined;
                //check for <diagram> tag and set risk values
                if(xml.slice(0,9) == "<diagram>"){
                    diag = xml.slice(9,-10);
                    let splittedDiagram = diag.split(/(?<=<\/mxGraphModel>)/);
                    doc = mxUtils.parseXml(splittedDiagram[0]);
                    data = mxUtils.parseXml(splittedDiagram[1]);

                }else{
                    doc = mxUtils.parseXml(xml);
                }
                editor.setGraphXml(doc.documentElement);
                editor.setModified(false);
                editor.undoManager.clear();
                //set graph values if xml contains risk values
                if(data != undefined){
                    editor.setGraphValues(data.documentElement);
                }


            } catch (e) {
                mxUtils.alert(mxResources.get('invalidOrMissingFile') + ': ' + e.message);
            }
        }));

        // Removes openFile if dialog is closed
        ui.showDialog(new OpenDialog(this).container, 320, 220, true, true, function () {
            window.openFile = null;
        });
    }).isEnabled = isGraphEnabled;
    this.addAction('save', function () {
        ui.saveFile(false);
    }, null, null, Editor.ctrlKey + '+S').isEnabled = allEnabled;
    this.addAction('saveAs...', function () {
        ui.saveFile(true);
    }, null, null, Editor.ctrlKey + '+Shift+S').isEnabled = allEnabled;
    this.addAction('export...', function () {
        ui.showDialog(new ExportDialog(ui).container, 300, 230, true, true);
        }).isEnabled = isGraphEnabled;
    this.addAction('editDiagram...', function () {
        var dlg = new EditDiagramDialog(ui);
        ui.showDialog(dlg.container, 620, 420, true, false);
        dlg.init();
    });
    this.addAction('pageSetup...', function () {
        ui.showDialog(new PageSetupDialog(ui).container, 320, 220, true, true);
    }).isEnabled = isGraphEnabled;
    this.addAction('print...', function () {
        ui.showDialog(new PrintDialog(ui).container, 300, 180, true, true);
    }, null, 'sprite-print', Editor.ctrlKey + '+P');
    this.addAction('preview', function () {
        mxUtils.show(graph, null, 10, 10);
    });

    // Edit actions
    this.addAction('undo', function () {
        ui.undo();
    }, null, 'sprite-undo', Editor.ctrlKey + '+Z');
    this.addAction('redo', function () {
        ui.redo();
    }, null, 'sprite-redo', (!mxClient.IS_WIN) ? Editor.ctrlKey + '+Shift+Z' : Editor.ctrlKey + '+Y');
    this.addAction('cut', function () {
        mxClipboard.cut(graph);
    }, null, 'sprite-cut', Editor.ctrlKey + '+X');
    this.addAction('copy', function () {
        mxClipboard.copy(graph);
    }, null, 'sprite-copy', Editor.ctrlKey + '+C');
    this.addAction('paste', function () {
        if (graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent())) {
            mxClipboard.paste(graph);
        }
    }, false, 'sprite-paste', Editor.ctrlKey + '+V');
    this.addAction('pasteHere', function (evt) {
        if (graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent())) {
            graph.getModel().beginUpdate();
            try {
                var cells = mxClipboard.paste(graph);

                if (cells != null) {
                    var bb = graph.getBoundingBoxFromGeometry(cells);

                    if (bb != null) {
                        var t = graph.view.translate;
                        var s = graph.view.scale;
                        var dx = t.x;
                        var dy = t.y;

                        var x = Math.round(graph.snap(graph.popupMenuHandler.triggerX / s - dx));
                        var y = Math.round(graph.snap(graph.popupMenuHandler.triggerY / s - dy));

                        graph.cellsMoved(cells, x - bb.x, y - bb.y);
                    }
                }
            } finally {
                graph.getModel().endUpdate();
            }
        }
    });

    function deleteCells(includeEdges) {
        // Cancels interactive operations
        graph.escape();
        var cells = graph.getDeletableCells(graph.getSelectionCells());

        if (cells != null && cells.length > 0) {
            var parents = graph.model.getParents(cells);
            graph.removeCells(cells, true);

            // Selects parents for easier editing of groups
            if (parents != null) {
                var select = [];

                for (var i = 0; i < parents.length; i++) {
                    if (graph.model.contains(parents[i]) &&
                        (graph.model.isVertex(parents[i]) ||
                            graph.model.isEdge(parents[i]))) {
                        select.push(parents[i]);
                    }
                }

                graph.setSelectionCells(select);
            }
        }
    };

    this.addAction('delete', function (evt) {
        deleteCells(evt != null && mxEvent.isShiftDown(evt));
    }, null, null, 'Delete');
    this.addAction('deleteAll', function () {
        deleteCells(true);
    }, null, null, Editor.ctrlKey + '+Delete');
    this.addAction('duplicate', function () {
        graph.setSelectionCells(graph.duplicateCells());
    }, null, null, Editor.ctrlKey + '+D');
    this.put('turn', new Action(mxResources.get('turn') + ' / ' + mxResources.get('reverse'), function () {
        graph.turnShapes(graph.getSelectionCells());
    }, null, null, Editor.ctrlKey + '+R'));
    this.addAction('selectVertices', function () {
        graph.selectVertices();
    }, null, null, Editor.ctrlKey + '+Shift+I');
    this.addAction('selectEdges', function () {
        graph.selectEdges();
    }, null, null, Editor.ctrlKey + '+Shift+E');
    this.addAction('selectAll', function () {
        graph.selectAll(null, true);
    }, null, null, Editor.ctrlKey + '+A');
    this.addAction('selectNone', function () {
        graph.clearSelection();
    }, null, null, Editor.ctrlKey + '+Shift+A');
    this.addAction('lockUnlock', function () {
        if (!graph.isSelectionEmpty()) {
            graph.getModel().beginUpdate();
            try {
                var defaultValue = graph.isCellMovable(graph.getSelectionCell()) ? 1 : 0;
                graph.toggleCellStyles(mxConstants.STYLE_MOVABLE, defaultValue);
                graph.toggleCellStyles(mxConstants.STYLE_RESIZABLE, defaultValue);
                graph.toggleCellStyles(mxConstants.STYLE_ROTATABLE, defaultValue);
                graph.toggleCellStyles(mxConstants.STYLE_DELETABLE, defaultValue);
                graph.toggleCellStyles(mxConstants.STYLE_EDITABLE, defaultValue);
                graph.toggleCellStyles('connectable', defaultValue);
            } finally {
                graph.getModel().endUpdate();
            }
        }
    }, null, null, Editor.ctrlKey + '+L');

    // Navigation actions
    this.addAction('home', function () {
        graph.home();
    }, null, null, 'Home');
    this.addAction('exitGroup', function () {
        graph.exitGroup();
    }, null, null, Editor.ctrlKey + '+Shift+Page Up');
    this.addAction('enterGroup', function () {
        graph.enterGroup();
    }, null, null, Editor.ctrlKey + '+Shift+Page Down');
    this.addAction('expand', function () {
        graph.foldCells(false);
    }, null, null, Editor.ctrlKey + '+Page Down');
    this.addAction('collapse', function () {
        graph.foldCells(true);
    }, null, null, Editor.ctrlKey + '+Page Up');

    // Arrange actions
    this.addAction('toFront', function () {
        graph.orderCells(false);
    }, null, null, Editor.ctrlKey + '+Shift+F');
    this.addAction('toBack', function () {
        graph.orderCells(true);
    }, null, null, Editor.ctrlKey + '+Shift+B');
    this.addAction('group', function () {
        if (graph.getSelectionCount() == 1) {
            graph.setCellStyles('container', '1');
        } else {
            graph.setSelectionCell(graph.groupCells(null, 0));
        }
    }, null, null, Editor.ctrlKey + '+G');
    this.addAction('ungroup', function () {
        if (graph.getSelectionCount() == 1 && graph.getModel().getChildCount(graph.getSelectionCell()) == 0) {
            graph.setCellStyles('container', '0');
        } else {
            graph.setSelectionCells(graph.ungroupCells());
        }
    }, null, null, Editor.ctrlKey + '+Shift+U');
    this.addAction('removeFromGroup', function () {
        graph.removeCellsFromParent();
    });
    // Adds action
    this.addAction('edit', function () {
        if (graph.isEnabled()) {
            graph.startEditingAtCell();
        }
    }, null, null, 'F2/Enter');

    this.addAction('editData...', function () {
        var cell = graph.getSelectionCell() || graph.getModel().getRoot();

        if (cell != null) {
            var dlg = new EditDataDialog(ui, cell);
            ui.showDialog(dlg.container, 600, 600, true, true);
            dlg.init();
        }
    }, null, null, Editor.ctrlKey + '+M');


    this.addAction('editInfo...', function () {
        var graph = ui.editor.graph;

        if (graph.isEnabled() && !graph.isSelectionEmpty()) {
            var cell = graph.getSelectionCell();
            var info = '';
            var info1 = '';



            var tmp = graph.convertValueToString(cell);

            if (tmp != null) {
                info = tmp;
            }

            if (mxUtils.isNode(cell.value)) {
                tmp = cell.value.getAttribute('infoDesc');

                if (tmp != null) {
                    info1 = tmp;
                }
            }

            var dlg = new InfoTextDialog(ui, "Title" + ':', "Description :", info, info1, function (newValue, newValue1) {
                graph.labelChanged(cell, newValue);

                graph.setInfoDescForCell(cell, newValue1);

            }, null, null, 400, 350);


            ui.showDialog(dlg.container, 400, 500, true, true);
            dlg.init();
        }
    });


    this.addAction('editTooltip...', function () {
        var graph = ui.editor.graph;

        if (graph.isEnabled() && !graph.isSelectionEmpty()) {
            var cell = graph.getSelectionCell();
            var tooltip = '';

            if (mxUtils.isNode(cell.value)) {
                var tmp = cell.value.getAttribute('tooltip');

                if (tmp != null) {
                    tooltip = tmp;
                }
            }

            var dlg = new TextareaDialog(ui, mxResources.get('editTooltip') + ':', tooltip, function (newValue) {
                graph.setTooltipForCell(cell, newValue);
            });
            ui.showDialog(dlg.container, 320, 200, true, true);
            dlg.init();
        }
    });
    this.addAction('openLink', function () {
        var link = graph.getLinkForCell(graph.getSelectionCell());

        if (link != null) {
            window.open(link);
        }
    });
    this.addAction('editLink...', function () {
        var graph = ui.editor.graph;

        if (graph.isEnabled() && !graph.isSelectionEmpty()) {
            var cell = graph.getSelectionCell();
            var value = graph.getLinkForCell(cell) || '';

            ui.showLinkDialog(value, mxResources.get('apply'), function (link) {
                link = mxUtils.trim(link);
                graph.setLinkForCell(cell, (link.length > 0) ? link : null);
            });
        }
    });
    this.addAction('insertLink...', function () {
        if (graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent())) {
            var dlg = new LinkDialog(ui, '', mxResources.get('insert'), function (link, docs) {
                link = mxUtils.trim(link);

                if (link.length > 0) {
                    var title = link.substring(link.lastIndexOf('/') + 1);
                    var icon = null;

                    if (docs != null && docs.length > 0) {
                        icon = docs[0].iconUrl;
                        title = docs[0].name || docs[0].type;
                        title = title.charAt(0).toUpperCase() + title.substring(1);

                        if (title.length > 30) {
                            title = title.substring(0, 30) + '...';
                        }
                    }

                    var pt = graph.getFreeInsertPoint();
                    var linkCell = new mxCell(title, new mxGeometry(pt.x, pt.y, 100, 40),
                        'fontColor=#0000EE;fontStyle=4;rounded=1;overflow=hidden;' + ((icon != null) ?
                        'shape=label;imageWidth=16;imageHeight=16;spacingLeft=26;align=left;image=' + icon :
                        'spacing=10;'));
                    linkCell.vertex = true;

                    graph.setLinkForCell(linkCell, link);
                    graph.cellSizeUpdated(linkCell, true);
                    graph.setSelectionCell(graph.addCell(linkCell));
                    graph.scrollCellToVisible(graph.getSelectionCell());
                }
            });

            ui.showDialog(dlg.container, 420, 90, true, true);
            dlg.init();
        }
    }).isEnabled = isGraphEnabled;
    this.addAction('link...', mxUtils.bind(this, function () {
        var graph = ui.editor.graph;

        if (graph.isEnabled()) {
            if (graph.cellEditor.isContentEditing()) {
                var link = graph.getParentByName(graph.getSelectedElement(), 'A', graph.cellEditor.textarea);
                var oldValue = '';

                if (link != null) {
                    oldValue = link.getAttribute('href') || '';
                }

                var selState = graph.cellEditor.saveSelection();

                ui.showLinkDialog(oldValue, mxResources.get('apply'), mxUtils.bind(this, function (value) {
                    graph.cellEditor.restoreSelection(selState);

                    if (value != null) {
                        graph.insertLink(value);
                    }
                }));
            } else if (graph.isSelectionEmpty()) {
                this.get('insertLink').funct();
            } else {
                this.get('editLink').funct();
            }
        }
    })).isEnabled = isGraphEnabled;
    this.addAction('autosize', function () {
        var cells = graph.getSelectionCells();

        if (cells != null) {
            graph.getModel().beginUpdate();
            try {
                for (var i = 0; i < cells.length; i++) {
                    var cell = cells[i];

                    if (graph.getModel().getChildCount(cell)) {
                        graph.updateGroupBounds([cell], 20);
                    } else {
                        var state = graph.view.getState(cell);
                        var geo = graph.getCellGeometry(cell);

                        if (graph.getModel().isVertex(cell) && state != null && state.text != null &&
                            geo != null && graph.isWrapping(cell)) {
                            geo = geo.clone();
                            geo.height = state.text.boundingBox.height / graph.view.scale;
                            graph.getModel().setGeometry(cell, geo);
                        } else {
                            graph.updateCellSize(cell);
                        }
                    }
                }
            } finally {
                graph.getModel().endUpdate();
            }
        }
    }, null, null, Editor.ctrlKey + '+Shift+Y');
    this.addAction('formattedText', function () {
        var state = graph.getView().getState(graph.getSelectionCell());

        if (state != null) {
            var value = '1';
            graph.stopEditing();

            graph.getModel().beginUpdate();
            try {
                if (state.style['html'] == '1') {
                    value = null;
                    var label = graph.convertValueToString(state.cell);

                    if (mxUtils.getValue(state.style, 'nl2Br', '1') != '0') {
                        // Removes newlines from HTML and converts breaks to newlines
                        // to match the HTML output in plain text
                        label = label.replace(/\n/g, '').replace(/<br\s*.?>/g, '\n');
                    }

                    // Removes HTML tags
                    var temp = document.createElement('div');
                    temp.innerHTML = label;
                    label = mxUtils.extractTextWithWhitespace(temp.childNodes);

                    graph.cellLabelChanged(state.cell, label);
                } else {
                    // Converts HTML tags to text
                    var label = mxUtils.htmlEntities(graph.convertValueToString(state.cell), false);

                    if (mxUtils.getValue(state.style, 'nl2Br', '1') != '0') {
                        // Converts newlines in plain text to breaks in HTML
                        // to match the plain text output
                        label = label.replace(/\n/g, '<br/>');
                    }

                    graph.cellLabelChanged(state.cell, graph.sanitizeHtml(label));
                }

                graph.setCellStyles('html', value);
                ui.fireEvent(new mxEventObject('styleChanged', 'keys', ['html'],
                    'values', [(value != null) ? value : '0'], 'cells',
                    graph.getSelectionCells()));
            } finally {
                graph.getModel().endUpdate();
            }
        }
    });
    this.addAction('wordWrap', function () {
        var state = graph.getView().getState(graph.getSelectionCell());
        var value = 'wrap';

        graph.stopEditing();

        if (state != null && state.style[mxConstants.STYLE_WHITE_SPACE] == 'wrap') {
            value = null;
        }

        graph.setCellStyles(mxConstants.STYLE_WHITE_SPACE, value);
    });
    this.addAction('rotation', function () {
        var value = '0';
        var state = graph.getView().getState(graph.getSelectionCell());

        if (state != null) {
            value = state.style[mxConstants.STYLE_ROTATION] || value;
        }

        var dlg = new InputDialog(ui, value, mxResources.get('apply'), function (newValue) {
            if (newValue != null && newValue.length > 0) {
                graph.setCellStyles(mxConstants.STYLE_ROTATION, newValue);
            }
        }, mxResources.get('enterValue') + ' (' + mxResources.get('rotation') + ' 0-360)');

        ui.showDialog(dlg.container, 300, 80, true, true);
        dlg.init();
    });
    // View actions
    this.addAction('resetView', function () {
        graph.zoomTo(1);
        ui.resetScrollbars();
    }, null, null, Editor.ctrlKey + '+H');
    this.addAction('zoomIn', function (evt) {
        graph.zoomIn();
    }, null, null, Editor.ctrlKey + ' + (Numpad) / Alt+Mousewheel');
    this.addAction('zoomOut', function (evt) {
        graph.zoomOut();
    }, null, null, Editor.ctrlKey + ' - (Numpad) / Alt+Mousewheel');
    this.addAction('fitWindow', function () {
        graph.fit();
    }, null, null, Editor.ctrlKey + '+Shift+H');
    this.addAction('fitPage', mxUtils.bind(this, function () {
        if (!graph.pageVisible) {
            this.get('pageView').funct();
        }

        var fmt = graph.pageFormat;
        var ps = graph.pageScale;
        var cw = graph.container.clientWidth - 10;
        var ch = graph.container.clientHeight - 10;
        var scale = Math.floor(20 * Math.min(cw / fmt.width / ps, ch / fmt.height / ps)) / 20;
        graph.zoomTo(scale);

        if (mxUtils.hasScrollbars(graph.container)) {
            var pad = graph.getPagePadding();
            graph.container.scrollTop = pad.y * graph.view.scale;
            graph.container.scrollLeft = Math.min(pad.x * graph.view.scale, (graph.container.scrollWidth - graph.container.clientWidth) / 2);
        }
    }), null, null, Editor.ctrlKey + '+J');
    this.addAction('fitTwoPages', mxUtils.bind(this, function () {
        if (!graph.pageVisible) {
            this.get('pageView').funct();
        }

        var fmt = graph.pageFormat;
        var ps = graph.pageScale;
        var cw = graph.container.clientWidth - 10;
        var ch = graph.container.clientHeight - 10;

        var scale = Math.floor(20 * Math.min(cw / (2 * fmt.width) / ps, ch / fmt.height / ps)) / 20;
        graph.zoomTo(scale);

        if (mxUtils.hasScrollbars(graph.container)) {
            var pad = graph.getPagePadding();
            graph.container.scrollTop = Math.min(pad.y, (graph.container.scrollHeight - graph.container.clientHeight) / 2);
            graph.container.scrollLeft = Math.min(pad.x, (graph.container.scrollWidth - graph.container.clientWidth) / 2);
        }
    }), null, null, Editor.ctrlKey + '+Shift+J');
    this.addAction('fitPageWidth', mxUtils.bind(this, function () {
        if (!graph.pageVisible) {
            this.get('pageView').funct();
        }

        var fmt = graph.pageFormat;
        var ps = graph.pageScale;
        var cw = graph.container.clientWidth - 10;

        var scale = Math.floor(20 * cw / fmt.width / ps) / 20;
        graph.zoomTo(scale);

        if (mxUtils.hasScrollbars(graph.container)) {
            var pad = graph.getPagePadding();
            graph.container.scrollLeft = Math.min(pad.x * graph.view.scale,
                (graph.container.scrollWidth - graph.container.clientWidth) / 2);
        }
    }));
    this.put('customZoom', new Action(mxResources.get('custom') + '...', mxUtils.bind(this, function () {
        var dlg = new InputDialog(this.editorUi, parseInt(graph.getView().getScale() * 100), mxResources.get('apply'), mxUtils.bind(this, function (newValue) {
            var val = parseInt(newValue);

            if (!isNaN(val) && val > 0) {
                graph.zoomTo(val / 100);
            }
        }), mxResources.get('zoom') + ' (%)');
        this.editorUi.showDialog(dlg.container, 300, 100, true, true);
        dlg.init();
    }), null, null, Editor.ctrlKey + '+0'));
    this.addAction('pageScale...', mxUtils.bind(this, function () {
        var dlg = new InputDialog(this.editorUi, parseInt(graph.pageScale * 100), mxResources.get('apply'), mxUtils.bind(this, function (newValue) {
            var val = parseInt(newValue);

            if (!isNaN(val) && val > 0) {
                ui.setPageScale(val / 100);
            }
        }), mxResources.get('pageScale') + ' (%)');
        this.editorUi.showDialog(dlg.container, 300, 80, true, true);
        dlg.init();
    }));

    /*
        Bowtie++ feature
        add Action to show Risk computation dialog
     */
    this.addAction('showRisk', function(){ui.showDialog(new RiskDialog().container, 1000, (0.7*window.innerHeight), true, true);});

    this.addAction('showDiagramSearch',function (){
        const width = 1250;
        const height = 0.7*window.innerHeight;
        ui.showDialog(new OpenFromDBDialog(width,height).container,width,height,true,true)
    });

    this.addAction('showVersionSearch',function (){
        const width = 1250;
        const height = 0.7*window.innerHeight;
        ui.showDialog(new OpenVersioningDialog(width,height).container,width,height,true,true)
    });

    this.addAction('openRolesVue',function (){
        const width = 1000;
        const height = 0.6*window.innerHeight;
        ui.showDialog(new ManageRolesDialog(width,height).container,width,height,true,true)
    });
    // Option actions
    var action = null;
    action = this.addAction('grid', function () {
        graph.setGridEnabled(!graph.isGridEnabled());
        ui.fireEvent(new mxEventObject('gridEnabledChanged'));
    }, null, null, Editor.ctrlKey + '+Shift+G');
    action.setToggleAction(true);
    action.setSelectedCallback(function () {
        return graph.isGridEnabled();
    });
    action.setEnabled(false);

    action = this.addAction('guides', function () {
        graph.graphHandler.guidesEnabled = !graph.graphHandler.guidesEnabled;
        ui.fireEvent(new mxEventObject('guidesEnabledChanged'));
    });
    action.setToggleAction(true);
    action.setSelectedCallback(function () {
        return graph.graphHandler.guidesEnabled;
    });
    action.setEnabled(false);

    action = this.addAction('tooltips', function () {
        graph.tooltipHandler.setEnabled(!graph.tooltipHandler.isEnabled());
    });
    action.setToggleAction(true);
    action.setSelectedCallback(function () {
        return graph.tooltipHandler.isEnabled();
    });

    action = this.addAction('collapseExpand', function () {
        ui.setFoldingEnabled(!graph.foldingEnabled);
    });
    action.setToggleAction(true);
    action.setSelectedCallback(function () {
        return graph.foldingEnabled;
    });
    action.isEnabled = isGraphEnabled;
    action = this.addAction('scrollbars', function () {
        ui.setScrollbars(!ui.hasScrollbars());
    });
    action.setToggleAction(true);
    action.setSelectedCallback(function () {
        return graph.scrollbars;
    });
    action = this.addAction('pageView', mxUtils.bind(this, function () {
        ui.setPageVisible(!graph.pageVisible);
    }));
    action.setToggleAction(true);
    action.setSelectedCallback(function () {
        return graph.pageVisible;
    });
    action = this.addAction('connectionArrows', function () {
        graph.connectionArrowsEnabled = !graph.connectionArrowsEnabled;
        ui.fireEvent(new mxEventObject('connectionArrowsChanged'));
    }, null, null, 'Alt+Shift+A');
    action.setToggleAction(true);
    action.setSelectedCallback(function () {
        return graph.connectionArrowsEnabled;
    });
    action = this.addAction('connectionPoints', function () {
        graph.setConnectable(!graph.connectionHandler.isEnabled());
        ui.fireEvent(new mxEventObject('connectionPointsChanged'));
    }, null, null, 'Alt+Shift+P');
    action.setToggleAction(true);
    action.setSelectedCallback(function () {
        return graph.connectionHandler.isEnabled();
    });
    action = this.addAction('copyConnect', function () {
        graph.connectionHandler.setCreateTarget(!graph.connectionHandler.isCreateTarget());
        ui.fireEvent(new mxEventObject('copyConnectChanged'));
    });
    action.setToggleAction(true);
    action.setSelectedCallback(function () {
        return graph.connectionHandler.isCreateTarget();
    });
    action.isEnabled = isGraphEnabled;
    action = this.addAction('autosave', function () {
        ui.editor.setAutosave(!ui.editor.autosave);
    });
    action.setToggleAction(true);
    action.setSelectedCallback(function () {
        return ui.editor.autosave;
    });
    action.isEnabled = isGraphEnabled;
    action.visible = false;

    // Help actions
    this.addAction('help', function () {
        var ext = '';

        if (mxResources.isLanguageSupported(mxClient.language)) {
            ext = '_' + mxClient.language;
        }

        window.open(RESOURCES_PATH + '/help' + ext + '.html');
    });

    // Font style actions
    var toggleFontStyle = mxUtils.bind(this, function (key, style, fn, shortcut) {
        return this.addAction(key, function () {
            if (fn != null && graph.cellEditor.isContentEditing()) {
                fn();
            } else {
                graph.stopEditing(false);
                graph.toggleCellStyleFlags(mxConstants.STYLE_FONTSTYLE, style);
            }
        }, null, null, shortcut);
    });

    toggleFontStyle('bold', mxConstants.FONT_BOLD, function () {
        document.execCommand('bold', false, null);
    }, Editor.ctrlKey + '+B');
    toggleFontStyle('italic', mxConstants.FONT_ITALIC, function () {
        document.execCommand('italic', false, null);
    }, Editor.ctrlKey + '+I');
    toggleFontStyle('underline', mxConstants.FONT_UNDERLINE, function () {
        document.execCommand('underline', false, null);
    }, Editor.ctrlKey + '+U');

    // Color actions
    this.addAction('fontColor...', function () {
        ui.menus.pickColor(mxConstants.STYLE_FONTCOLOR, 'forecolor', '000000');
    });
    this.addAction('strokeColor...', function () {
        ui.menus.pickColor(mxConstants.STYLE_STROKECOLOR);
    });
    this.addAction('fillColor...', function () {
        ui.menus.pickColor(mxConstants.STYLE_FILLCOLOR);
    });
    this.addAction('gradientColor...', function () {
        ui.menus.pickColor(mxConstants.STYLE_GRADIENTCOLOR);
    });
    this.addAction('backgroundColor...', function () {
        ui.menus.pickColor(mxConstants.STYLE_LABEL_BACKGROUNDCOLOR, 'backcolor');
    });
    this.addAction('borderColor...', function () {
        ui.menus.pickColor(mxConstants.STYLE_LABEL_BORDERCOLOR);
    });

    // Format actions
    this.addAction('vertical', function () {
        ui.menus.toggleStyle(mxConstants.STYLE_HORIZONTAL, true);
    });
    this.addAction('shadow', function () {
        ui.menus.toggleStyle(mxConstants.STYLE_SHADOW);
    });
    this.addAction('solid', function () {
        graph.getModel().beginUpdate();
        try {
            graph.setCellStyles(mxConstants.STYLE_DASHED, null);
            graph.setCellStyles(mxConstants.STYLE_DASH_PATTERN, null);
            ui.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN],
                'values', [null, null], 'cells', graph.getSelectionCells()));
        } finally {
            graph.getModel().endUpdate();
        }
    });
    this.addAction('dashed', function () {
        graph.getModel().beginUpdate();
        try {
            graph.setCellStyles(mxConstants.STYLE_DASHED, '1');
            graph.setCellStyles(mxConstants.STYLE_DASH_PATTERN, null);
            ui.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN],
                'values', ['1', null], 'cells', graph.getSelectionCells()));
        } finally {
            graph.getModel().endUpdate();
        }
    });
    this.addAction('dotted', function () {
        graph.getModel().beginUpdate();
        try {
            graph.setCellStyles(mxConstants.STYLE_DASHED, '1');
            graph.setCellStyles(mxConstants.STYLE_DASH_PATTERN, '1 4');
            ui.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN],
                'values', ['1', '1 4'], 'cells', graph.getSelectionCells()));
        } finally {
            graph.getModel().endUpdate();
        }
    });
    this.addAction('sharp', function () {
        graph.getModel().beginUpdate();
        try {
            graph.setCellStyles(mxConstants.STYLE_ROUNDED, '0');
            graph.setCellStyles(mxConstants.STYLE_CURVED, '0');
            ui.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_ROUNDED, mxConstants.STYLE_CURVED],
                'values', ['0', '0'], 'cells', graph.getSelectionCells()));
        } finally {
            graph.getModel().endUpdate();
        }
    });
    this.addAction('rounded', function () {
        graph.getModel().beginUpdate();
        try {
            graph.setCellStyles(mxConstants.STYLE_ROUNDED, '1');
            graph.setCellStyles(mxConstants.STYLE_CURVED, '0');
            ui.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_ROUNDED, mxConstants.STYLE_CURVED],
                'values', ['1', '0'], 'cells', graph.getSelectionCells()));
        } finally {
            graph.getModel().endUpdate();
        }
    });
    this.addAction('toggleRounded', function () {
        if (!graph.isSelectionEmpty() && graph.isEnabled()) {
            graph.getModel().beginUpdate();
            try {
                var cells = graph.getSelectionCells();
                var state = graph.view.getState(cells[0]);
                var style = (state != null) ? state.style : graph.getCellStyle(cells[0]);
                var value = (mxUtils.getValue(style, mxConstants.STYLE_ROUNDED, '0') == '1') ? '0' : '1';

                graph.setCellStyles(mxConstants.STYLE_ROUNDED, value);
                graph.setCellStyles(mxConstants.STYLE_CURVED, null);
                ui.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_ROUNDED, mxConstants.STYLE_CURVED],
                    'values', [value, '0'], 'cells', graph.getSelectionCells()));
            } finally {
                graph.getModel().endUpdate();
            }
        }
    });
    this.addAction('curved', function () {
        graph.getModel().beginUpdate();
        try {
            graph.setCellStyles(mxConstants.STYLE_ROUNDED, '0');
            graph.setCellStyles(mxConstants.STYLE_CURVED, '1');
            ui.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_ROUNDED, mxConstants.STYLE_CURVED],
                'values', ['0', '1'], 'cells', graph.getSelectionCells()));
        } finally {
            graph.getModel().endUpdate();
        }
    });
    this.addAction('collapsible', function () {
        var state = graph.view.getState(graph.getSelectionCell());
        var value = '1';

        if (state != null && graph.getFoldingImage(state) != null) {
            value = '0';
        }

        graph.setCellStyles('collapsible', value);
        ui.fireEvent(new mxEventObject('styleChanged', 'keys', ['collapsible'],
            'values', [value], 'cells', graph.getSelectionCells()));
    });
    this.addAction('editStyle...', mxUtils.bind(this, function () {
        var cells = graph.getSelectionCells();

        if (cells != null && cells.length > 0) {
            var model = graph.getModel();

            var dlg = new TextareaDialog(this.editorUi, mxResources.get('editStyle') + ':',
                model.getStyle(cells[0]) || '', function (newValue) {
                    if (newValue != null) {
                        graph.setCellStyle(mxUtils.trim(newValue), cells);
                    }
                }, null, null, 400, 220);
            this.editorUi.showDialog(dlg.container, 420, 300, true, true);
            dlg.init();
        }
    }), null, null, Editor.ctrlKey + '+E');
    this.addAction('setAsDefaultStyle', function () {
        if (graph.isEnabled() && !graph.isSelectionEmpty()) {
            ui.setDefaultStyle(graph.getSelectionCell());
        }
    }, null, null, Editor.ctrlKey + '+Shift+D');
    this.addAction('clearDefaultStyle', function () {
        if (graph.isEnabled()) {
            ui.clearDefaultStyle();
        }
    }, null, null, Editor.ctrlKey + '+Shift+R');
    this.addAction('addWaypoint', function () {
        var cell = graph.getSelectionCell();

        if (cell != null && graph.getModel().isEdge(cell)) {
            var handler = editor.graph.selectionCellsHandler.getHandler(cell);

            if (handler instanceof mxEdgeHandler) {
                var t = graph.view.translate;
                var s = graph.view.scale;
                var dx = t.x;
                var dy = t.y;

                var parent = graph.getModel().getParent(cell);
                var pgeo = graph.getCellGeometry(parent);

                while (graph.getModel().isVertex(parent) && pgeo != null) {
                    dx += pgeo.x;
                    dy += pgeo.y;

                    parent = graph.getModel().getParent(parent);
                    pgeo = graph.getCellGeometry(parent);
                }

                var x = Math.round(graph.snap(graph.popupMenuHandler.triggerX / s - dx));
                var y = Math.round(graph.snap(graph.popupMenuHandler.triggerY / s - dy));

                handler.addPointAt(handler.state, x, y);
            }
        }
    });
    this.addAction('removeWaypoint', function () {
        // TODO: Action should run with "this" set to action
        var rmWaypointAction = ui.actions.get('removeWaypoint');

        if (rmWaypointAction.handler != null) {
            // NOTE: Popupevent handled and action updated in Menus.createPopupMenu
            rmWaypointAction.handler.removePoint(rmWaypointAction.handler.state, rmWaypointAction.index);
        }
    });
    this.addAction('clearWaypoints', function () {
        var cells = graph.getSelectionCells();

        if (cells != null) {
            cells = graph.addAllEdges(cells);

            graph.getModel().beginUpdate();
            try {
                for (var i = 0; i < cells.length; i++) {
                    var cell = cells[i];

                    if (graph.getModel().isEdge(cell)) {
                        var geo = graph.getCellGeometry(cell);

                        if (geo != null) {
                            geo = geo.clone();
                            geo.points = null;
                            graph.getModel().setGeometry(cell, geo);
                        }
                    }
                }
            } finally {
                graph.getModel().endUpdate();
            }
        }
    }, null, null, 'Alt+Shift+C');
    action = this.addAction('subscript', mxUtils.bind(this, function () {
        if (graph.cellEditor.isContentEditing()) {
            document.execCommand('subscript', false, null);
        }
    }), null, null, Editor.ctrlKey + '+,');
    action = this.addAction('superscript', mxUtils.bind(this, function () {
        if (graph.cellEditor.isContentEditing()) {
            document.execCommand('superscript', false, null);
        }
    }), null, null, Editor.ctrlKey + '+.');
    this.addAction('image...', function () {
        if (graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent())) {
            var title = mxResources.get('image') + ' (' + mxResources.get('url') + '):';
            var state = graph.getView().getState(graph.getSelectionCell());
            var value = '';

            if (state != null) {
                value = state.style[mxConstants.STYLE_IMAGE] || value;
            }

            var selectionState = graph.cellEditor.saveSelection();

            ui.showImageDialog(title, value, function (newValue, w, h) {
                // Inserts image into HTML text
                if (graph.cellEditor.isContentEditing()) {
                    graph.cellEditor.restoreSelection(selectionState);
                    graph.insertImage(newValue, w, h);
                } else {
                    var cells = graph.getSelectionCells();

                    if (newValue != null) {
                        var select = null;

                        graph.getModel().beginUpdate();
                        try {
                            // Inserts new cell if no cell is selected
                            if (cells.length == 0) {
                                var pt = graph.getFreeInsertPoint();
                                cells = [graph.insertVertex(graph.getDefaultParent(), null, '', pt.x, pt.y, w, h,
                                    'shape=image;imageAspect=0;aspect=fixed;verticalLabelPosition=bottom;verticalAlign=top;')];
                                select = cells;
                            }

                            graph.setCellStyles(mxConstants.STYLE_IMAGE, newValue, cells);

                            // Sets shape only if not already shape with image (label or image)
                            var state = graph.view.getState(cells[0]);
                            var style = (state != null) ? state.style : graph.getCellStyle(cells[0]);

                            if (style[mxConstants.STYLE_SHAPE] != 'image' && style[mxConstants.STYLE_SHAPE] != 'label') {
                                graph.setCellStyles(mxConstants.STYLE_SHAPE, 'image', cells);
                            }

                            if (graph.getSelectionCount() == 1) {
                                if (w != null && h != null) {
                                    var cell = cells[0];
                                    var geo = graph.getModel().getGeometry(cell);

                                    if (geo != null) {
                                        geo = geo.clone();
                                        geo.width = w;
                                        geo.height = h;
                                        graph.getModel().setGeometry(cell, geo);
                                    }
                                }
                            }
                        } finally {
                            graph.getModel().endUpdate();
                        }

                        if (select != null) {
                            graph.setSelectionCells(select);
                            graph.scrollCellToVisible(select[0]);
                        }
                    }
                }
            }, graph.cellEditor.isContentEditing(), !graph.cellEditor.isContentEditing());
        }
    }).isEnabled = isGraphEnabled;
    this.addAction('insertImage...', function () {
        if (graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent())) {
            graph.clearSelection();
            ui.actions.get('image').funct();
        }
    }).isEnabled = isGraphEnabled;
    action = this.addAction('layers', mxUtils.bind(this, function () {
        if (this.layersWindow == null) {
            // LATER: Check outline window for initial placement
            this.layersWindow = new LayersWindow(ui, document.body.offsetWidth - 280, 120, 220, 180);
            this.layersWindow.window.addListener('show', function () {
                ui.fireEvent(new mxEventObject('layers'));
            });
            this.layersWindow.window.addListener('hide', function () {
                ui.fireEvent(new mxEventObject('layers'));
            });
            this.layersWindow.window.setVisible(true);
            ui.fireEvent(new mxEventObject('layers'));
        } else {
            this.layersWindow.window.setVisible(!this.layersWindow.window.isVisible());
        }

        //ui.fireEvent(new mxEventObject('layers'));
    }), null, null, Editor.ctrlKey + '+Shift+L');
    action.setToggleAction(true);
    action.setSelectedCallback(mxUtils.bind(this, function () {
        return this.layersWindow != null && this.layersWindow.window.isVisible();
    }));
    action = this.addAction('formatPanel', mxUtils.bind(this, function () {
        ui.toggleFormatPanel();
    }), null, null, Editor.ctrlKey + '+Shift+P');
    action.setToggleAction(true);
    action.setSelectedCallback(mxUtils.bind(this, function () {
        return ui.formatWidth > 0;
    }));
    action = this.addAction('outline', mxUtils.bind(this, function () {
        if (this.outlineWindow == null) {
            // LATER: Check layers window for initial placement
            this.outlineWindow = new OutlineWindow(ui, document.body.offsetWidth - 260, 100, 180, 180);
            this.outlineWindow.window.addListener('show', function () {
                ui.fireEvent(new mxEventObject('outline'));
            });
            this.outlineWindow.window.addListener('hide', function () {
                ui.fireEvent(new mxEventObject('outline'));
            });
            this.outlineWindow.window.setVisible(true);
            ui.fireEvent(new mxEventObject('outline'));
        } else {
            this.outlineWindow.window.setVisible(!this.outlineWindow.window.isVisible());
        }

        ui.fireEvent(new mxEventObject('outline'));
    }), null, null, Editor.ctrlKey + '+Shift+O');

    action.setToggleAction(true);
    action.setSelectedCallback(mxUtils.bind(this, function () {
        return this.outlineWindow != null && this.outlineWindow.window.isVisible();
    }));
};

/**
 * Registers the given action under the given name.
 */
Actions.prototype.addAction = function (key, funct, enabled, iconCls, shortcut) {
    var title;

    if (key.substring(key.length - 3) == '...') {
        key = key.substring(0, key.length - 3);
        title = mxResources.get(key) + '...';
    } else {
        title = mxResources.get(key);
    }

    return this.put(key, new Action(title, funct, enabled, iconCls, shortcut));
};

/**
 * Registers the given action under the given name.
 */
Actions.prototype.put = function (name, action) {
    this.actions[name] = action;

    return action;
};

/**
 * Returns the action for the given name or null if no such action exists.
 */
Actions.prototype.get = function (name) {
    return this.actions[name];
};

/**
 * Constructs a new action for the given parameters.
 */
function Action(label, funct, enabled, iconCls, shortcut) {
    mxEventSource.call(this);
    this.label = label;
    this.funct = this.createFunction(funct);
    this.enabled = (enabled != null) ? enabled : true;
    this.iconCls = iconCls;
    this.shortcut = shortcut;
    this.visible = true;
};

// Action inherits from mxEventSource
mxUtils.extend(Action, mxEventSource);

/**
 * Sets the enabled state of the action and fires a stateChanged event.
 */
Action.prototype.createFunction = function (funct) {
    return funct;
};

/**
 * Sets the enabled state of the action and fires a stateChanged event.
 */
Action.prototype.setEnabled = function (value) {
    if (this.enabled != value) {
        this.enabled = value;
        this.fireEvent(new mxEventObject('stateChanged'));
    }
};

/**
 * Sets the enabled state of the action and fires a stateChanged event.
 */
Action.prototype.isEnabled = function () {
    return this.enabled;
};

/**
 * Sets the enabled state of the action and fires a stateChanged event.
 */
Action.prototype.setToggleAction = function (value) {
    this.toggleAction = value;
};

/**
 * Sets the enabled state of the action and fires a stateChanged event.
 */
Action.prototype.setSelectedCallback = function (funct) {
    this.selectedCallback = funct;
};

/**
 * Sets the enabled state of the action and fires a stateChanged event.
 */
Action.prototype.isSelected = function () {
    return this.selectedCallback();
};
