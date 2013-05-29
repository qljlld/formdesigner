(function(window, undefined) {
    if (!window.formdesigner) window.formdesigner = {};
    var ControlType = {},
        currentActivity = {};

    function initDocumentContextMenu() {
        $("#container_designer").contextMenu({
            ulmenu: {
                id: 'uldocument',
                items: [{
                        liClass: 'pastecontrol',
                        liHref: 'pasteControl',
                        liText: '粘貼'
                    }
                ]
            }
        }, function(action, el, pos) {
            if (action == "pasteControl") {
                if (currentActivity) {
                    currentActivity.X = pos.docX - 180; //180是左边栏的宽度。
                    currentActivity.Y = pos.docY - 55; //55是上边栏的高度。
                    formdesigner.addItem(currentActivity);
                    currentActivity = {};
                }
            }
        });
    }

    function initContextMenu() {
        $(".control").contextMenu({
            ulmenu: {
                id: 'ulcontrol',
                items: [{
                        liClass: 'delcontrol',
                        liHref: 'delControl',
                        liText: '刪除'
                    }, {
                        liClass: 'cutcontrol',
                        liHref: 'cutControl',
                        liText: '剪切'
                    }, {
                        liClass: 'copycontrol',
                        liHref: 'copyControl',
                        liText: '复制'
                    }, {
                        liClass: 'leftcontrol',
                        liHref: 'leftControl',
                        liText: '居左'
                    }, {
                        liClass: 'centercontrol',
                        liHref: 'centerControl',
                        liText: '水平居中'
                    }, {
                        liClass: 'rightcontrol',
                        liHref: 'rightControl',
                        liText: '居右'
                    }, {
                        liClass: 'upcontrol',
                        liHref: 'upControl',
                        liText: '居上'
                    }, {
                        liClass: 'bottomcontrol',
                        liHref: 'bottomControl',
                        liText: '居下'
                    }, {
                        liClass: 'middlecontrol',
                        liHref: 'middleControl',
                        liText: '垂直居中'
                    }, {
                        liClass: 'attrcontrol',
                        liHref: 'attrControl',
                        liText: '属性'
                    }
                ]
            }
        }, function(action, el, pos) {
            var controlID = $(el.context).attr("id");
            if ($(el.context).attr("controlType") == ControlType.Wizard || $(el.context).attr("controlType") == ControlType.Tabs || $(el.context).attr("controlType") == ControlType.Tree) {
                controlID = $("#" + controlID).children()[0].id;
            }
            if (action == "delControl") {
                if (confirm("您确定要删除该控件吗？")) {
                    for (var i = 0; i < form.Fields.length; i++) {
                        if (form.Fields[i].Name == controlID) {
                            var position = form.Fields.indexOf(form.Fields[i]);
                            form.Fields.splice(position, 1);
                            if ($(el.context).attr("controlType") == ControlType.Wizard || $(el.context).attr("controlType") == ControlType.Tabs || $(el.context).attr("controlType") == ControlType.Tree) {
                                $("#" + controlID).parent().remove();
                            } else {
                                $("#" + controlID).remove();
                            }
                        }
                    }
                }
                return;
            }
            if (action == "cutControl") {
                for (var i = 0; i < form.Fields.length; i++) {
                    if (form.Fields[i].Name == controlID) {
                        currentActivity = form.Fields[i];
                        var position = form.Fields.indexOf(form.Fields[i]);
                        form.Fields.splice(position, 1);
                        if ($(el.context).attr("controlType") == ControlType.Wizard || $(el.context).attr("controlType") == ControlType.Tabs || $(el.context).attr("controlType") == ControlType.Tree) {
                            $("#" + controlID).parent().remove();
                        } else {
                            $("#" + controlID).remove();
                        }
                    }
                }
                return;
            }
            if (action == "copyControl") {
                for (var i = 0; i < form.Fields.length; i++) {
                    if (form.Fields[i].Name == controlID) {
                        for (var field in form.Fields[i]) {
                            if (!currentActivity) {
                                currentActivity = new Object();
                            }
                            currentActivity.Name = new Date().getTime();
                            currentActivity[field] = form.Fields[i][field];
                        }
                        //currentActivity = form.Fields[i];
                    }
                }
                return;
            }
            if (action == "leftControl") {
                for (var i = 0; i < form.Fields.length; i++) {
                    if (form.Fields[i].Name == controlID) {
                        form.Fields[i].CustomStyle = form.Fields[i].CustomStyle + ";text-align:left;";
                    }
                }
                $("#" + controlID).css("text-align", "left");
                return;
            }
            if (action == "centerControl") {
                for (var i = 0; i < form.Fields.length; i++) {
                    if (form.Fields[i].Name == controlID) {
                        form.Fields[i].CustomStyle = form.Fields[i].CustomStyle + ";text-align:center;";
                    }
                }
                $("#" + controlID).css("text-align", "center");
                return;
            }
            if (action == "rightControl") {
                for (var i = 0; i < form.Fields.length; i++) {
                    if (form.Fields[i].Name == controlID) {
                        form.Fields[i].CustomStyle = form.Fields[i].CustomStyle + ";text-align:right;";
                    }
                }
                $("#" + controlID).css("text-align", "right");
                return;
            }
            if (action == "upControl") {
                for (var i = 0; i < form.Fields.length; i++) {
                    if (form.Fields[i].Name == controlID) {
                        form.Fields[i].CustomStyle = form.Fields[i].CustomStyle + ";text-align:right;";
                    }
                }
                $("#" + controlID).css("text-align", "right");
                return;
            }
            if (action == "bottomControl") {
                for (var i = 0; i < form.Fields.length; i++) {
                    if (form.Fields[i].Name == controlID) {
                        form.Fields[i].CustomStyle = form.Fields[i].CustomStyle + ";text-align:right;";
                    }
                }
                $("#" + controlID).css("text-align", "right");
                return;
            }
            if (action == "middleControl") {
                for (var i = 0; i < form.Fields.length; i++) {
                    if (form.Fields[i].Name == controlID) {
                        form.Fields[i].CustomStyle = form.Fields[i].CustomStyle + ";" + "line-height:" + $("#" + controlID).css("height") + ";";
                    }
                }
                $("#" + controlID).css("line-height", $("#" + controlID).css("height"));
                return;
            }
            if (action == "attrControl") {
                for (var i = 0; i < form.Fields.length; i++) {
                    if (form.Fields[i].Name == controlID) {
                        var controlType = form.Fields[i].ControlType;
                        if (formdesigner.dialogs && formdesigner.dialogs.items[controlType]) {
                            var dialog = formdesigner.dialogs.items[controlType];
                            BASE.openDialog(dialog.dialogContent);
                            dialog.dialogScript.call(this, controlID,controlType);
                        } else {
                            var url = BASE.getBasePath();
                            BASE.openDialog({
                                'url': url
                            });
                        }
                    }
                }
                return;
            }
            /* switch(form.Fields[i].ControlType) {
                        case ControlType.Text:
                            window.parent.parent.openDialog("actionDialog2", "配置" + form.Fields[i].ControlType + "属性", "/formdesigner/Home/TextConfigure?ControlType=" + form.Fields[i].ControlType + "&ControlID=" + controlID, 650, 380, true);
                            break;
                        case ControlType.Div:
                            window.parent.parent.openDialog("actionDialog2", "配置" + form.Fields[i].ControlType + "属性", "/formdesigner/Home/TextConfigure?ControlType=" + form.Fields[i].ControlType + "&ControlID=" + controlID, 650, 380, true);
                            break;
                        case ControlType.ChooseBox:
                            window.parent.parent.openDialog("actionDialog2", "配置" + form.Fields[i].ControlType + "属性", "/formdesigner/Home/Choosebox?ControlType=" + form.Fields[i].ControlType + "&ControlID=" + controlID, 650, 380, true);
                            break;
                        case ControlType.Button:
                            window.parent.parent.openDialog("actionDialog2", "配置" + form.Fields[i].ControlType + "属性", "/formdesigner/Home/ButtonConfigure?ControlType=" + form.Fields[i].ControlType + "&ControlID=" + controlID, 650, 380, true);
                            break;
                        case ControlType.Radio:
                        case ControlType.DropDown:
                            window.parent.parent.openDialog("actionDialog2", "配置" + form.Fields[i].ControlType + "属性", "/formdesigner/Home/ChoiceBox?ControlType=" + form.Fields[i].ControlType + "&ControlID=" + controlID, 650, 380, true);
                            break;
                        case ControlType.SysVariable:
                            window.parent.parent.openDialog("actionDialog2", "配置" + form.Fields[i].ControlType + "属性", "/formdesigner/Home/SystemControl?ControlType=" + form.Fields[i].ControlType + "&ControlID=" + controlID, 650, 380, true);
                            break;
                        case ControlType.Chart:
                            window.parent.parent.openDialog("actionDialog2", "配置" + form.Fields[i].ControlType + "属性", "/formdesigner/Home/ChartConfigure?ControlType=" + form.Fields[i].ControlType + "&ControlID=" + controlID, 650, 380, true);
                            break;
                        case ControlType.Tree:
                            window.parent.parent.openDialog("actionDialog2", "配置" + form.Fields[i].ControlType + "属性", "/formdesigner/Home/TreeConfigure?ControlType=" + form.Fields[i].ControlType + "&ControlID=" + controlID, 650, 380, true);
                            break;
                        case ControlType.DataTable:
                            window.parent.parent.openDialog("actionDialog2", "配置" + form.Fields[i].ControlType + "属性", "/formdesigner/Home/DataCtrlConfigure?ControlType=" + form.Fields[i].ControlType + "&ControlID=" + controlID, 650, 380, true);
                            break;
                        case ControlType.Grid:
                            window.parent.parent.openDialog("actionDialog2", "配置" + form.Fields[i].ControlType + "属性", "/formdesigner/Home/DataCtrlConfigure?ControlType=" + form.Fields[i].ControlType + "&ControlID=" + controlID, 650, 380, true);
                            break;
                        default:
                            window.parent.parent.openDialog("actionDialog2", "配置" + form.Fields[i].ControlType + "属性", "/formdesigner/Home/ConfigureControl?ControlType=" + form.Fields[i].ControlType + "&ControlID=" + controlID, 650, 380, true);
                            break;
                        }

                    }
                }

                return;
            }*/
        });
    } /*初始化初始事件，右击事件等*/

    function initEvent(formdesignerContain) {
        BASE.banContextMenu();
        initDocumentContextMenu(); //右击
        $(".left_li").bind("mouseover", function() {
            this.style.background = "#cecece";
            $(this).css("z-index", "999999");
        });
        $(".left_li").bind("mouseout", function() {
            this.style.background = "white";
        });
        $(".left_li").draggable({
            cursor: "move",
            helper: "clone"
        });
        $("#tabs").on("tabsactivate", function(event, ui) {
            if (ui.oldTab.find("a").attr("id") === "json" && ui.newTab.find("a").attr("id") === "view") {
                /*   formdesigner.init({
                    formFirstInit: false,
                    formContent: $("#jsoncontainer_designer").val()
                });*/
                $(".control").each(function() {
                    $(this).remove();
                });
                form = JSON.parse($("#jsoncontainer_designer").val());
                initForm();
                $("form .ui-resizable-handle").css("display", "none");
            } else if (ui.newTab.find("a").attr("id") === "json") {
                var Name = $("#formName").val();
                var Title = $("#formTitle").val();
                var DataSource = $("#formDataSource").val();
                var Script = encodeURIComponent($("#jscontainer_designer").val());
                var Style = encodeURIComponent($("#csscontainer_designer").val());
                var saveform = getSaveFormInfo({
                    Name: Name,
                    Title: Title,
                    DataSource: DataSource,
                    Script: Script,
                    Style: Style
                });
                $("#jsoncontainer_designer").val(JSON.stringify(saveform));
            }
            if (ui.newTab.find("a").attr("id") === "html") {
                $("#htmlcontainer_designer").val(document.getElementById("container_designer").innerHTML);
            }
        })
        initDesign(formdesignerContain);
    }; /*初始化设计，当用户拖动控件进入绘制板，绘制出控件*/

    function initDesign(formdesignerContain) {
        $("#" + formdesignerContain).droppable({
            drop: function(event, ui) {
                var top = $("#header").height();
                var left = 0;
                if ($("#leftcontainer").css("position") != "absolute") {
                    left = $("#leftcontainer").width();
                }
                var scrollLeft = $(this).scrollLeft();
                var scrollTop = $(this).scrollTop();
                var itemtop = ui.offset.top - top + scrollTop;
                var itemleft = ui.offset.left - left + scrollLeft;
                var id = new Date().getTime();
                if (ui.draggable[0].className.indexOf('left_li ui-draggable') < 0) {
                    id = ui.draggable[0].id;
                    if ($("#" + ui.draggable[0].id).attr("controlType") == ControlType.Div) {
                        var me = $("#" + ui.draggable[0].id);
                        var preleft = parseFloat(me.attr("startDraggable_left"));
                        var pretop = parseFloat(me.attr("startDraggable_top"));
                        var endleft = ui.position.left;
                        var endtop = ui.position.top;
                        var left = endleft - preleft;
                        var top = endtop - pretop;
                        $(".control").each(function() {
                            if ($(this).position().left > preleft && $(this).position().top > pretop && $(this).position().left + $(this).width() < preleft + me.width() && $(this).position().top + $(this).height() < pretop + me.height()) {
                                this.style.left = left + $(this).position().left + "px";
                                this.style.top = top + $(this).position().top + "px";
                            }
                        });
                    } else if ($("#" + ui.draggable[0].id).attr("controlType") == ControlType.Wizard || $("#" + ui.draggable[0].id).attr("controlType") == ControlType.Tabs) {
                        var me = $("#" + ui.draggable[0].id);
                        var preleft = parseFloat(me.attr("startDraggable_left"));
                        var pretop = parseFloat(me.attr("startDraggable_top"));
                        var endleft = ui.position.left;
                        var endtop = ui.position.top;
                        var left = endleft - preleft;
                        var top = endtop - pretop;
                        $(".control").each(function() {
                            var meControl = $(this);
                            if (meControl.attr("parentControl") && meControl.attr("parentControl") != "null") {
                                this.style.left = left + parseFloat(meControl.css("left").substring(0, meControl.css("left").lastIndexOf("px"))) + "px";
                                this.style.top = top + parseFloat(meControl.css("top").substring(0, meControl.css("top").lastIndexOf("px"))) + "px";
                            }
                        });
                    }
                } else {
                    // $(".ui-resizable-handle").css("display", "none");
                    var dragType = $.trim($(ui.draggable[0]).text());
                    for (var type in ControlType) {
                        if (type == dragType) {
                            var item = {
                                ID: id,
                                Name: id,
                                Text: "控件名:",
                                X: itemleft,
                                Y: itemtop,
                                ControlType: dragType
                            }
                            formdesigner.addItem(item);
                            // formdesigner.plugins.items["TextBox"].addField(id, itemleft, itemtop, formdesignerContain);
                        }
                    }
                }
                /* if ($("#" + id).length > 0) {
                    divContain(id);
                }*/
                /*          $("#" + id).draggable({
                    start: function(event, ui) {
                        $("#" + id).attr("startDraggable_left", ui.position.left);
                        $("#" + id).attr("startDraggable_top", ui.position.top);
                    },
                    cursor: "move",
                    containment: "#container_designer",
                    handles: "all"
                });*/
            }
        });
        $("#" + formdesignerContain).bind("mousedown", function() {
            $(".control").each(function() {
                if ($(this).attr("standardcontrol")) {
                    $(this).removeAttr("standardcontrol");
                }
                if ($(this).attr("selectcontrol")) {
                    $(this).removeAttr("selectcontrol");
                }
            });
            $(".control").each(function() {
                if ($(this).attr("controltype") == ControlType.Div) {
                    var me = $(this);
                    var preleft = parseFloat(me.css("left").substring(0, me.css("left").lastIndexOf("px")));
                    var pretop = parseFloat(me.css("top").substring(0, me.css("top").lastIndexOf("px")));
                    if ($(this).css("display") == "none") {
                        $(".control").each(function() {
                            var left = parseFloat($(this).css("left").substring(0, $(this).css("left").lastIndexOf("px")));
                            var top = parseFloat($(this).css("top").substring(0, $(this).css("top").lastIndexOf("px")));
                            if (left > preleft && top > pretop && left + $(this).width() < preleft + me.width() && top + $(this).height() < pretop + me.height()) {
                                $(this).hide();
                            }
                        });
                    } else {
                        $(".control").each(function() {
                            var left = parseFloat($(this).css("left").substring(0, $(this).css("left").lastIndexOf("px")));
                            var top = parseFloat($(this).css("top").substring(0, $(this).css("top").lastIndexOf("px")));
                            if (left > preleft && top > pretop && left + $(this).width() < preleft + me.width() && top + $(this).height() < pretop + me.height()) {
                                $(this).show();
                            }
                        });
                    }
                }
            });
            $("form .ui-resizable-handle").css("display", "none");
        });
    } /*加载form信息，读取form的js和Css并根据form.Fields的信息加载绘制控件信息*/

    function initForm() {
        if (form.Script) {
            if ($("#jscontainer_designer").length > 0) {
                $("#jscontainer_designer").val(decodeURIComponent(form.Script));
            }
        }
        if (form.Style) {
            if ($("#csscontainer_designer").length > 0) {
                $("#csscontainer_designer").val(decodeURIComponent(form.Style));
                BASE.addStyleContent(decodeURIComponent(form.Style));
            }
        }
        if (form.Fields) {
            /* var WizardControl = new Array();
            var TabsControl = new Array();*/
            for (var i = 0; i < form.Fields.length; i++) {
                var field = form.Fields[i];
                /*  if(ControlType.Wizard == field.ControlType) {
                    WizardControl.push(field);
                } else if(ControlType.Tabs == field.ControlType) {
                    TabsControl.push(field);
                } else {*/
                formdesigner.addItem(field, true);
            }
        }
        /*  for(var m = 0; m < TabsControl.length; m++) {
                formdesigner.addItem(TabsControl[m]);
            }
            for(var n = 0; n < WizardControl.length; n++) {
                formdesigner.addItem(WizardControl[n]);
            }*/
    }

    function getSaveFormInfo(options) {
        var saveform = $.extend({}, form, options);
        var formFields = saveform.Fields;
        for (var i = 0; i < formFields.length; i++) {
            /*var x = 0;
        var y = 0*/
            /*   if(formFields[i].ControlType == ControlType.Wizard || formFields[i].ControlType == ControlType.Tabs || formFields[i].ControlType == ControlType.Tree) {
            x = $("#" + formFields[i].Name).parent().css("left");
            y = $("#" + formFields[i].Name).parent().css("top");
        } else {*/
            var x = $("#" + formFields[i].Name).css("left");
            var y = $("#" + formFields[i].Name).css("top");
            // }
            formFields[i].X = x.substring(0, x.lastIndexOf("px"));
            formFields[i].Y = y.substring(0, y.lastIndexOf("px"));
            if (formFields[i].Width.toString().indexOf("%") < 0) {
                formFields[i].Width = $("#" + formFields[i].Name).width();
            }
            if (formFields[i].Height.toString().indexOf("%") < 0) {
                formFields[i].Height = $("#" + formFields[i].Name).height();
            }
            if ($("#" + formFields[i].Name).find("input")[0] != undefined) if ($("#" + formFields[i].Name).find("input").attr("type") == "checkbox") {
                    if ($("#" + formFields[i].Name).find("input:checked")[0] != undefined) {
                        formFields[i].DefaultValue = 1;
                    } else {
                        formFields[i].DefaultValue = 0;
                    }
                } else formFields[i].DefaultValue = $("#" + formFields[i].Name).find("input").val();
            if ($("#" + formFields[i].Name).find("textarea")[0] != undefined) formFields[i].DefaultValue = $("#" + formFields[i].Name).find("textarea").val();
        }
        return saveform;
    }
    formdesigner = (function() {
        var _formdesigner = {
            timestamp: '',
            version: '0.01',
            revision: '1',
            rnd: Math.floor(Math.random() * 900) + 100,
            basePath: (function() {
                return BASE.getBasePath();
            })(),
            getUrl: function(d) {
                if (d.indexOf(':/') == -1 && d.indexOf('/') !== 0) d = this.basePath + d;
                if (this.timestamp && d.charAt(d.length - 1) != '/' && !/[&?]t=/.test(d)) d += (d.indexOf('?') >= 0 ? '&' : '?') + 't=' + this.timestamp;
                return d;
            },
            getConfig: function(_config, name) {
                if (formdesigner && formdesigner.editConfig) {
                    var configForm = formdesigner.editConfig(_config).form_full;
                    if (configForm && name) {
                        for (var i = 0; i < configForm.length; i++) {
                            if (configForm[i].name == name) {
                                return configForm[i].items;
                            }
                        }

                    } else if (configForm && !name) {
                        return configForm;
                    }
                }
                return null;
            },
            plugins: {
                add: function(type, event) {
                    if (BASE.isArray(type)) {
                        for (var i = 0; i < type.length; i++) {
                            formdesigner.plugins.items[type[i]] = event;
                        }
                    } else if (BASE.isString(type)) {
                        formdesigner.plugins.items[type] = event;
                    }

                },

                items: {}
            },
            dialogs: {
                add: function(type, event) {
                    if (BASE.isArray(type)) {
                        for (var i = 0; i < type.length; i++) {
                            formdesigner.dialogs.items[type[i]] = event;
                        }
                    } else if (BASE.isString(type)) {
                        formdesigner.dialogs.items[type] = event;
                    }
                },
                items: {}
            },

            initUI: function() {
                $("#tabs").tabs();
                // fix the classes
                $(".tabs-bottom .ui-tabs-nav, .tabs-bottom .ui-tabs-nav > *").removeClass("ui-corner-all ui-corner-top").addClass("ui-corner-bottom");
                $(".tabs-bottom .ui-tabs-nav").appendTo(".tabs-bottom");
                $("#left_accordion").accordion({
                    collapsible: true
                });
            },
            initEvent: function() {
                initEvent();
            },
            init: function(options) {
                window.form = this.getConfig({}, 'Form');
                var defaults = {
                    formName: "formName",
                    formTitle: "formTitle",
                    formDataSource: "formDataSource",
                    formDescription: "formDescription",
                    formApp: "formApp",
                    formFirstInit: true,
                    formContent: form,
                    formDesignerContain: "container_designer"
                };
                var options = $.extend({}, defaults, options);
                ControlType = formdesigner.getConfig({}, "ControlType");
                this.initUI();
                initEvent(options.formDesignerContain);
                var eFormID = $.query.get("eFormID");
                var activityID = $.query.get("ActivityID");
                if (eFormID) {
                    if (options.formFirstInit) {
                        $.post("/formdesigner/home/getFormInfo", {
                            EFormID: eFormID
                        }, function(retValue) {
                            if (retValue) {
                                var eFormContent = JSON.parse(retValue.Content);
                                form = eFormContent;
                                initForm();
                                if ($("#" + options.formDataSource).length > 0) $("#" + options.formDataSource).val(form.DataSource);
                                if ($("#" + options.formTitle).length > 0) $("#" + options.formTitle).val(form.Title);
                                if ($("#" + options.formName).length > 0) $("#" + options.formName).val(form.Name);
                                if ($("#" + options.formDescription).length > 0) $("#" + options.formDescription).val(retValue.Description);
                                if ($("#" + options.formApp).length > 0) $("#" + options.formApp).val(retValue.AppID);
                                //initContextMenu();
                                $(".ui-resizable-handle").css("display", "none");
                            }
                        });
                    } else {
                        $(".control").each(function() {
                            $(this).remove();
                        });
                        var eFormContent = JSON.parse(options.formContent);
                        form = eFormContent;
                        initForm();
                        if ($("#" + options.formDataSource).length > 0) $("#" + options.formDataSource).val(form.DataSource);
                        if ($("#" + options.formTitle).length > 0) $("#" + options.formTitle).val(form.Title);
                        if ($("#" + options.formName).length > 0) $("#" + options.formName).val(form.Name);
                        //initContextMenu();
                        $(".ui-resizable-handle").css("display", "none");
                    }
                } else if (activityID) {
                    var parentWindow = window.dialogArguments || window.parent;
                    var processDefine = parentWindow.parent.$("#actionDialog").find("#bg_div_iframe")[0].contentWindow.processDefine;
                    var activityID = $.query.get("ActivityID");
                    for (var i = 0; i < processDefine.Activities.length; i++) {
                        if (processDefine.Activities[i].ID == activityID) {
                            var activityForm = processDefine.Activities[i].Form;
                            if (activityForm.Fields) {
                                form = activityForm;
                            }
                            initForm();
                            if ($("#" + options.formDataSource).length > 0) $("#" + options.formDataSource).val(form.DataSource);
                            if ($("#" + options.formTitle).length > 0) $("#" + options.formTitle).val(form.Title);
                            if ($("#" + options.formName).length > 0) $("#" + options.formName).val(form.Name);
                            //initContextMenu();
                            $(".ui-resizable-handle").css("display", "none");
                        }
                    }
                }


            },


            // 添加控件元素Item
            addItem: function(options) {
                var defaults = formdesigner.editConfig().formItem;
                var field = $.extend({}, defaults, options);
                if (typeof(form) == "undefined") {
                    this.init();
                }
                if (field.ControlType && !arguments[1]) {
                    formdesigner.plugins.items[field.ControlType].addField(field);
                    form.Fields.push(field);
                } else if (field.ControlType && arguments[1]) {
                    formdesigner.plugins.items[field.ControlType].addField(field);
                }
                initContextMenu(); //增加右击菜单
            },
            setContorlValue: function(options, configure, unresized) {
                eval(decodeURIComponent(form.Script));
                var oldID = options.OldID;
                var me = $("#" + oldID);
                me.attr("ID", options.Name);
                //默认label为Text的值
                if (me.find("label").length > 0 && options.Text) {
                    me.find("label").text(options.Text);
                }
                //默认input的值为DefaultValue.
                if (me.find("input").length > 0) {
                    me.find("input").attr("Value", options.DefaultValue);
                    me.find("input").attr("DataType", options.DataType);
                    if ($.trim(options.AccessPattern) == "ReadOnly") {
                        me.find("input").attr("readonly", options.AccessPattern);
                    } else {
                        me.find("input").removeAttr("readonly");
                    }
                }
                if (me.find("textarea").length > 0) {
                    me.find("textarea").attr("Value", options.DefaultValue);
                    me.find("textarea").attr("DataType", options.DataType);
                    if ($.trim(options.AccessPattern) == "ReadOnly") {
                        me.find("textarea").attr("readonly", options.AccessPattern);
                    } else {
                        me.find("textarea").removeAttr("readonly");
                    }
                }
                /*定义长宽*/
                me.css("width", options.Width + "px");
                me.css("height", options.Height + "px");
                if (me.find("label").length > 0 && me.find("input").length > 0 && !unresized) {
                    me.find("input").css("width", options.Width - me.find("label").width() - 5 + "px");
                    me.find("input").css("height", options.Height - 6 + "px");
                }
                if (me.find("label").length > 0 && me.find("textarea").length > 0 && !unresized) {
                    me.find("textarea").css("width", options.Width - me.find("label").width() - 6 + "px");
                    me.find("textarea").css("height", options.Height - 6 + "px");
                }
                /*自定义样式*/
                if (options.CustomStyle && options.CustomStyle.split(";").length > 0) {
                    for (var i = 0; i < options.CustomStyle.split(";").length; i++) {
                        var cssText = options.CustomStyle.split(";")[i];
                        var cssProperty = cssText.split(":")[0];
                        var cssValue = cssText.split(":")[1];
                        me.css(cssProperty, cssValue);
                    }
                }
                /*
               闭包保存在内存中，活动对象不会随上下文删除。所以要释放内存。
                */
                $("#" + options.Name).unbind("dblclick"); //释放内存。qlj
                $("#" + options.Name).bind("dblclick", function() {
                    if (formdesigner.dialogs && formdesigner.dialogs.items[options.ControlType]) {
                        var dialog = formdesigner.dialogs.items[options.ControlType];
                        BASE.openDialog(dialog.dialogContent);
                        dialog.dialogScript.call(this, options.Name,options.ControlType);

                    } else {
                        var url = BASE.getBasePath();
                        BASE.openDialog({
                            'url': url
                        });
                    }
                });
                this.editItem(options);
                if (configure) alert("保存成功");
            },
            editItem: function(options) {
                for (var i = 0; i < form.Fields.length; i++) {
                    if (form.Fields[i].Name == options.OldID) {
                        form.Fields[i] = $.extend({}, form.Fields[i], options);
                    }
                }
            },
            beforeSaved: function(options) {
                var saveform = getSaveFormInfo(options);
                return saveform;
            },
            saveform: function(options) {
                saveform = this.beforeSaved(options);
                if (saveform.DataSource) {
                    var formResult = JSON.stringify(saveform);
                    var eFormID = $.query.get("eFormID");
                    var formApp = $("#formApp").val();
                    var formDescription = $("#formDescription").val();
                    $.post("/formdesigner/Home/saveForm", {
                        FormApp: formApp,
                        FormDescription: formDescription,
                        Form: formResult,
                        FormName: saveform.Name,
                        EFormID: eFormID
                    }, function(retValue) {
                        if (retValue.Result == 1) {
                            alert("保存成功");
                            return true;
                        } else {
                            alert("保存失败");
                            return false;
                        }
                    });
                } else {
                    alert("请在右侧属性列表输入表单绑定的数据库表");
                    return false;
                }

            },
            leftItems: function(options) {
                var defaults = {
                    left: 0,
                    top: 0,
                    width: 0,
                    standard: null
                };
                var field = $.extend({}, defaults, options);
                var selectItems = new Array();
                $(".control").each(function() {
                    if ($(this).attr("standardcontrol")) {
                        field.standard = this;
                        var left = $(this).css("left");
                        var top = $(this).css("top");
                        var width = $(this).width();
                        field.left = parseInt(left.substring(0, left.lastIndexOf("px")));
                        field.top = parseInt(top.substring(0, top.lastIndexOf("px")));
                        field.width = width
                    } else if ($(this).attr("selectcontrol")) {
                        selectItems.push(this);

                    }
                });
                if (field.standard && selectItems.length > 0) {
                    for (var i = 0; i < selectItems.length; i++) {
                        var left = field.left + "px";
                        $(selectItems[i]).css("left", left);
                    }
                }
            },
            centeredItems: function(options) {
                var defaults = {
                    left: 0,
                    top: 0,
                    width: 0,
                    standard: null
                };
                var field = $.extend({}, defaults, options);
                var selectItems = new Array();
                $(".control").each(function() {
                    if ($(this).attr("standardcontrol")) {
                        field.standard = this;
                        var left = $(this).css("left");
                        var top = $(this).css("top");
                        var width = $(this).width();
                        field.left = parseInt(left.substring(0, left.lastIndexOf("px")));
                        field.top = parseInt(top.substring(0, top.lastIndexOf("px")));
                        field.width = width
                    } else if ($(this).attr("selectcontrol")) {
                        selectItems.push(this);

                    }
                });
                if (field.standard && selectItems.length > 0) {
                    for (var i = 0; i < selectItems.length; i++) {
                        var left = field.left + field.width / 2 - $(selectItems[i]).width() / 2 + "px";
                        $(selectItems[i]).css("left", left);
                    }
                }
            },
            rightItems: function(options) {
                var defaults = {
                    left: 0,
                    top: 0,
                    width: 0,
                    labelwidth: 0,
                    inputwidth: 0,
                    standard: null
                };
                var field = $.extend({}, defaults, options);
                var selectItems = new Array();
                $(".control").each(function() {
                    if ($(this).attr("standardcontrol")) {
                        field.standard = this;
                        var left = $(this).css("left");
                        var top = $(this).css("top");
                        if ($(this).find("label").length > 0) {
                            field.labelwidth = $(this).find("label").width();
                        }
                        if ($(this).find("input").length > 0) {
                            field.inputwidth = $(this).find("input").width();
                        }
                        var width = $(this).width();
                        field.left = parseFloat(left.substring(0, left.lastIndexOf("px")));
                        field.top = parseFloat(top.substring(0, top.lastIndexOf("px")));
                        field.width = width;
                    } else if ($(this).attr("selectcontrol")) {
                        selectItems.push(this);

                    }
                });
                if (field.standard && selectItems.length > 0) {
                    for (var i = 0; i < selectItems.length; i++) {
                        if (field.labelwidth > 0 && field.inputwidth > 0) {
                            var selectLabelwidth = $(selectItems[i]).find("label").width();
                            var selectwidth = $(selectItems[i]).width();
                            $(selectItems[i]).css("width", selectLabelwidth + field.inputwidth + 5 + "px");
                            $(selectItems[i]).find("input").css("width", field.inputwidth);
                        }
                        var standardleft = field.left + field.width;
                        var width = $(selectItems[i]).width();
                        var left = standardleft - width + "px";
                        $(selectItems[i]).css("left", left);
                    }
                }
            },
            upItems: function(options) {
                var defaults = {
                    left: 0,
                    top: 0,
                    width: 0,
                    labelwidth: 0,
                    inputwidth: 0,
                    standard: null
                };
                var field = $.extend({}, defaults, options);
                var selectItems = new Array();
                $(".control").each(function() {
                    if ($(this).attr("standardcontrol")) {
                        field.standard = this;
                        var left = $(this).css("left");
                        var top = $(this).css("top");
                        field.left = parseInt(left.substring(0, left.lastIndexOf("px")));
                        field.top = parseInt(top.substring(0, top.lastIndexOf("px")));
                    } else if ($(this).attr("selectcontrol")) {
                        selectItems.push(this);
                    }
                });
                if (field.standard && selectItems.length > 0) {
                    for (var i = 0; i < selectItems.length; i++) {
                        var top = field.top + "px";
                        $(selectItems[i]).css("top", top);
                    }
                }
            },
            bottomItems: function(options) {
                var defaults = {
                    left: 0,
                    top: 0,
                    width: 0,
                    height: 0,
                    labelwidth: 0,
                    inputwidth: 0,
                    standard: null
                };
                var field = $.extend({}, defaults, options);
                var selectItems = new Array();
                $(".control").each(function() {
                    if ($(this).attr("standardcontrol")) {
                        field.standard = this;
                        var left = $(this).css("left");
                        var top = $(this).css("top");
                        field.left = parseInt(left.substring(0, left.lastIndexOf("px")));
                        field.top = parseInt(top.substring(0, top.lastIndexOf("px")));
                        field.height = $(this).height();
                    } else if ($(this).attr("selectcontrol")) {
                        selectItems.push(this);
                    }
                });
                if (field.standard && selectItems.length > 0) {
                    for (var i = 0; i < selectItems.length; i++) {
                        var height = $(selectItems[i]).height();
                        var top = field.top + field.height - height + "px";
                        $(selectItems[i]).css("top", top);
                    }
                }
            },
            middleItems: function(options) {
                var defaults = {
                    left: 0,
                    top: 0,
                    width: 0,
                    height: 0,
                    labelwidth: 0,
                    inputwidth: 0,
                    standard: null
                };
                var field = $.extend({}, defaults, options);
                var selectItems = new Array();
                $(".control").each(function() {
                    if ($(this).attr("standardcontrol")) {
                        field.standard = this;
                        var left = $(this).css("left");
                        var top = $(this).css("top");
                        field.left = parseInt(left.substring(0, left.lastIndexOf("px")));
                        field.top = parseInt(top.substring(0, top.lastIndexOf("px")));
                        field.height = $(this).height();
                    } else if ($(this).attr("selectcontrol")) {
                        selectItems.push(this);
                    }
                });
                if (field.standard && selectItems.length > 0) {
                    for (var i = 0; i < selectItems.length; i++) {
                        var height = $(selectItems[i]).height();
                        var top = field.top + field.height / 2 - height / 2 + "px";
                        $(selectItems[i]).css("top", top);
                    }
                }
            },
            clearAllItems: function() {
                form.Fields = null;
                $(".control").remove();
            },


            fullScreen: function(options) {
                var defaults = {
                    header: "header",
                    leftContainer: "leftcontainer",
                    maincontainer: "maincontainer",
                    attrcontainer: "attrcontainer"
                };
                var options = $.extend({}, defaults, options);
                $("#" + options.leftContainer).css({
                    "z-index": 10000,
                    "position": "absolute"
                });
                $("#" + options.leftContainer).draggable({
                    cursor: "move",
                    containment: "#container_designer",
                    handles: "all"
                });
                $("#" + options.attrcontainer).hide();
                $("#header_toolbar_restorescreen").show();
                $("#header_toolbar_fullscreen").hide();
                if ($("#" + "actionDialog", window.parent.document).length > 0 && window.parent != window) {
                    $("#" + "actionDialog", window.parent.document).parent().css("left", "0px");
                    $("#" + "actionDialog", window.parent.document).parent().css("top", "0px");
                    window.parent.document.getElementById("actionDialog").style.height = window.screen.availHeight - 88 + "px";
                    window.parent.document.getElementById("actionDialog").style.width = window.screen.availWidth - 2 + "px";
                    $("#" + "actionDialog", window.parent.document).parent().css("height", window.screen.availHeight - 88 + "px");
                    $("#" + "actionDialog", window.parent.document).parent().css("width", window.screen.availWidth - 2 + "px");
                    document.getElementById("leftcontainer").style.height = window.screen.availHeight - 180 - $("#header").height() + "px";
                    document.getElementById("mainbody").style.height = window.screen.availHeight - $("#header").height() - 78 + "px";
                    document.getElementById("maincontainer").style.height = window.screen.availHeight - $("#header").height() - 78 + "px";
                    document.getElementById("container_designer").style.height = window.screen.availHeight - 190 - $("#header").height() + "px";
                    document.getElementById("htmlcontainer_designer").style.height = window.screen.availHeight - 190 - $("#header").height() + "px";
                    document.getElementById("csscontainer_designer").style.height = window.screen.availHeight - 190 - $("#header").height() + "px";
                    document.getElementById("jsoncontainer_designer").style.height = window.screen.availHeight - 190 - $("#header").height() + "px";
                    document.getElementById("jscontainer_designer").style.height = window.screen.availHeight - 190 - $("#header").height() + "px";
                    document.getElementById("maincontainer").style.width = window.screen.availWidth - 2 + "px";
                    document.getElementById("container_designer").style.width = window.screen.availWidth - 52 + "px";
                    document.getElementById("htmlcontainer_designer").style.width = window.screen.availWidth - 52 + "px";
                    document.getElementById("csscontainer_designer").style.width = window.screen.availWidth - 52 + "px";
                    document.getElementById("jscontainer_designer").style.width = window.screen.availWidth - 52 + "px";
                    document.getElementById("jsoncontainer_designer").style.width = window.screen.availWidth - 52 + "px";
                } else {
                    document.getElementById("leftcontainer").style.height = window.screen.availHeight - 150 - $("#header").height() + "px";
                    document.getElementById("mainbody").style.height = window.screen.availHeight - $("#header").height() - 48 + "px";
                    document.getElementById("maincontainer").style.height = window.screen.availHeight - $("#header").height() - 48 + "px";
                    document.getElementById("container_designer").style.height = window.screen.availHeight - 120 - $("#header").height() + "px";
                    document.getElementById("htmlcontainer_designer").style.height = window.screen.availHeight - 120 - $("#header").height() + "px";
                    document.getElementById("csscontainer_designer").style.height = window.screen.availHeight - 120 - $("#header").height() + "px";
                    document.getElementById("jscontainer_designer").style.height = window.screen.availHeight - 120 - $("#header").height() + "px";
                    document.getElementById("jsoncontainer_designer").style.height = window.screen.availHeight - 120 - $("#header").height() + "px";
                    document.getElementById("maincontainer").style.width = window.screen.availWidth - 2 + "px";
                    document.getElementById("container_designer").style.width = window.screen.availWidth - 52 + "px";
                    document.getElementById("htmlcontainer_designer").style.width = window.screen.availWidth - 52 + "px";
                    document.getElementById("csscontainer_designer").style.width = window.screen.availWidth - 52 + "px";
                    document.getElementById("jscontainer_designer").style.width = window.screen.availWidth - 52 + "px";
                    document.getElementById("jsoncontainer_designer").style.width = window.screen.availWidth - 52 + "px";
                }
                $(window).unbind("resize");
                return false;
            },
            restoreScreen: function(options) {
                var defaults = {
                    header: "header",
                    leftContainer: "leftcontainer",
                    maincontainer: "maincontainer",
                    attrcontainer: "attrcontainer"
                };
                var options = $.extend({}, defaults, options);
                $("#" + options.leftContainer).css({
                    "z-index": 10,
                    "position": "static"
                });
                $("#" + options.leftContainer).draggable('destroy');
                $("#header_toolbar_restorescreen").hide();
                $("#header_toolbar_fullscreen").show();
                $("#attrcontainer").show();
                $(window).resize(function() {
                    resizeWindow();
                });
                resizeWindow();
            }
        },
            b = window.FORMDESIGNER_GETURL;
        if (b) {
            var c = _formdesigner.getUrl;
            _formdesigner.getUrl = function(d) {
                return b.call(_formdesigner, d) || c.call(_formdesigner, d);
            };
        }
        return _formdesigner;
    })();


})(window, undefined)