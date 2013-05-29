   function getUser(UserID) {
        if (UserID) {
            return $.post("/formdesigner/Home/GetUserInfo", { UserID: UserID });
        }
        else {
            return $.post("/formdesigner/Home/GetUserInfo");
        }
    }
   function getOrgPath(UserID) {
        if (UserID) {
            return $.post("/formdesigner/Home/GetOrgPath", { UserID: UserID });
        }
        else {
            return $.post("/formdesigner/Home/GetOrgPath");
        }
    }
   function resizeWindow() {
        var windowHeight = getWindowHeight();
        if (windowHeight == 0) return;
        if ($("#" + "actionDialog", window.parent.document).length > 0 && window.parent != window) {
            $("#" + "actionDialog", window.parent.document).parent().css("left", "200px");
            $("#" + "actionDialog", window.parent.document).parent().css("top", "50px");
            $("#" + "actionDialog", window.parent.document).parent().css("height", "669px");
            $("#" + "actionDialog", window.parent.document).parent().css("width", "1050px");
            window.parent.document.getElementById("actionDialog").style.height = "669px";
            window.parent.document.getElementById("actionDialog").style.width = "1050px";
            document.getElementById("mainbody").style.height = windowHeight - $("#header").height() - 38 + "px";
            document.getElementById("leftcontainer").style.height = windowHeight - $("#header").height() - 38 + "px";
            document.getElementById("maincontainer").style.height = windowHeight - $("#header").height() - 38 + "px";
            document.getElementById("attrcontainer").style.height = windowHeight - $("#header").height() - 38 + "px";
            document.getElementById("container_designer").style.height = windowHeight - $("#header").height() - 108 + "px";
            document.getElementById("htmlcontainer_designer").style.height = windowHeight - $("#header").height() - 108 + "px";
            document.getElementById("jsoncontainer_designer").style.height = windowHeight - $("#header").height() - 108 + "px";
            document.getElementById("csscontainer_designer").style.height = windowHeight - $("#header").height() - 108 + "px";
            document.getElementById("jscontainer_designer").style.height = windowHeight - $("#header").height() - 108 + "px";
            document.getElementById("maincontainer").style.width = document.body.offsetWidth - $("#leftcontainer").width() - $("#attrcontainer").width() - 8 + "px";
            document.getElementById("container_designer").style.width = document.body.offsetWidth - $("#leftcontainer").width() - $("#attrcontainer").width() - 54 + "px";
            document.getElementById("htmlcontainer_designer").style.width = document.body.offsetWidth - $("#leftcontainer").width() - $("#attrcontainer").width() - 54 + "px";
            document.getElementById("jsoncontainer_designer").style.width = document.body.offsetWidth - $("#leftcontainer").width() - $("#attrcontainer").width() - 54 + "px";
            document.getElementById("csscontainer_designer").style.width = document.body.offsetWidth - $("#leftcontainer").width() - $("#attrcontainer").width() - 54 + "px";
            document.getElementById("jscontainer_designer").style.width = document.body.offsetWidth - $("#leftcontainer").width() - $("#attrcontainer").width() - 54 + "px";
        }
        else {
            document.getElementById("mainbody").style.height = windowHeight - $("#header").height() - 8 + "px";
            document.getElementById("leftcontainer").style.height = windowHeight - $("#header").height() - 8 + "px";
            document.getElementById("maincontainer").style.height = windowHeight - $("#header").height() - 8 + "px";
            document.getElementById("attrcontainer").style.height = windowHeight - $("#header").height() - 8 + "px";
            document.getElementById("container_designer").style.height = windowHeight - $("#header").height() - 78 + "px";
            document.getElementById("htmlcontainer_designer").style.height = windowHeight - $("#header").height() - 78 + "px";
            document.getElementById("jsoncontainer_designer").style.height = windowHeight - $("#header").height() - 78 + "px";
            document.getElementById("csscontainer_designer").style.height = windowHeight - $("#header").height() - 78 + "px";
            document.getElementById("jscontainer_designer").style.height = windowHeight - $("#header").height() - 78 + "px";
            document.getElementById("maincontainer").style.width = document.body.offsetWidth - $("#leftcontainer").width() - $("#attrcontainer").width() - 8 + "px";
            document.getElementById("container_designer").style.width = document.body.offsetWidth - $("#leftcontainer").width() - $("#attrcontainer").width() - 54 + "px";
            document.getElementById("htmlcontainer_designer").style.width = document.body.offsetWidth - $("#leftcontainer").width() - $("#attrcontainer").width() - 54 + "px";
            document.getElementById("jsoncontainer_designer").style.width = document.body.offsetWidth - $("#leftcontainer").width() - $("#attrcontainer").width() - 54 + "px";
            document.getElementById("csscontainer_designer").style.width = document.body.offsetWidth - $("#leftcontainer").width() - $("#attrcontainer").width() - 54 + "px";
            document.getElementById("jscontainer_designer").style.width = document.body.offsetWidth - $("#leftcontainer").width() - $("#attrcontainer").width() - 54 + "px";
        }
    }
   function getGridInfo(options) {
        var me = $("#" + options.Name);
        $.post("/formdesigner/Home/GetTableSource", { DataSource: options.DataSource }, function (retValue) {
            var ListItems = [];
            if (form.Fields && form.Fields.length > 0) {
                for (var i = 0; i < form.Fields.length; i++) {
                    if (form.Fields[i].Name == options.OldID) {
                        ListItems = form.Fields[i].ListItems;
                    }
                }
            }
            var columns = [];
            if (retValue && retValue.length > 0) {
                var retColumns = retValue[0];
                var columnList = "";
                for (var columnsAttr in retColumns) {
                    var text = columnsAttr;
                    var value = columnsAttr;
                    var hide = true;

                    for (var i = 0; i < ListItems.length; i++) {
                        if (ListItems[i].Value == columnsAttr) {//|| (ListItems[i].Value.indexOf("template:") > -1 && ListItems[i].Value.indexOf(columnsAttr) > -1)) {
                            hide = false;
                        }
                        if (ListItems[i].Value.indexOf("template:") > -1) {
                            templateText = ListItems[i].Text.substring(0, ListItems[i].Text.indexOf("("));
                            bindValue = ListItems[i].Text.substring(ListItems[i].Text.indexOf("(") + 1, ListItems[i].Text.length - 1);
                            if (bindValue == columnsAttr) {
                                hide = false;
                            }
                        }
                    }
                    if (hide) {
                        columns.push({
                            field: value, title: text, hidden: true
                        });
                    }
                }
            }
            for (var j = 0; j < ListItems.length; j++) {
                var columnsSame = false;
                if (retValue && retValue.length > 0) {
                    var retColumns = retValue[0];
                    for (var columnsAttr in retColumns) {
                        var text = columnsAttr;
                        var value = columnsAttr;
                        if (ListItems[j].Value == columnsAttr) {
                            text = ListItems[j].Text;
                            value = ListItems[j].Value;
                            columnsSame = true;
                            if (value.indexOf("Time") > -1) {
                                columns.push({
                                    field: value, title: text,
                                    //  template: "<div id='" + value + "'>${ " + value + "}</div>",
                                    //  format: "{0:MM/dd/yyyy HH:mm:tt}",
                                    type: "date",
                                    format: "{0:yyyy-MM-dd}",
                                    filterable: {
                                        ui: "datetimepicker"
                                    }
                                });
                            }
                            else {
                                columns.push({
                                    title: text, field: value
                                    // template: "#="+value+"==\"test\"?1:"+value+" #"
                                });
                            }
                            break;
                        }
                        else if (ListItems[j].Value.indexOf("template:") > -1) {
                            columnsSame = true;
                            templateValue = ListItems[j].Value;
                            templateText = ListItems[j].Text.substring(0, ListItems[j].Text.indexOf("("));
                            bindValue = ListItems[j].Text.substring(ListItems[j].Text.indexOf("(") + 1, ListItems[j].Text.length - 1);
                            templateValue = templateValue.substr(templateValue.indexOf(":") + 1);
                            templateValue = templateValue;//eval("'" + templateValue + "'");
                            // columns.splice(
                            columns.push({
                                title: templateText,
                                field: bindValue,
                                template: templateValue
                            });

                            break;
                        }
                    }
                    //if (!columnsSame) {
                    //    columns.push({
                    //        field: value, title: text, hidden: true
                    //    });
                    //}
                }
                if (!columnsSame) {
                    columns.push({
                        title: ListItems[j].Text
                    });
                }
            }
            //for (var j = 0; j < ListItems.length; j++) {
            //    var text = ListItems[j].Text;
            //    var value = ListItems[j].Value;
            //    columns.push({ field: value, title: text });
            //}
            me.empty();
            var pageSize = parseInt(options.DefaultValue);
            $("#" + options.Name).kendoGrid({
                dataSource: {
                    data: retValue,
                    pageSize: pageSize ? pageSize : 5
                },
                // groupable: true,
                sortable: true,
                pageable: {
                    refresh: true,
                    pageSizes: false
                },
                filterable: {
                    messages: {
                        info: "显示符合以下条件的行", // sets the text on top of the filter menu
                        filter: "过滤", // sets the text for the "Filter" button
                        clear: "清除过滤", // sets the text for the "Clear" button

                        // when filtering boolean numbers
                        isTrue: "true", // sets the text for "isTrue" radio button
                        isFalse: "false", // sets the text for "isFalse" radio button

                        //changes the text of the "And" and "Or" of the filter menu
                        and: "并且",
                        or: "或者"

                    },
                    operators: {
                        string: {
                            eq: "等于",
                            neq: "不等于",
                            startswith: "开始于",
                            contains: "包含",
                            doesnotcontain: "不包含",
                            endswith: "结束于"
                        },
                        date: {
                            eq: "等于",
                            neq: "不等于",
                            gte: "大于等于",
                            gt: "大于",
                            lte: "小于等于",
                            lt: "小于"
                        }
                    }
                },
                selectable: "row",
                columns: columns
            });
            me.resizable('destroy');
            me.resizable({
                alsoResize: "#" + options.Name + " .k-grid-content",
                handles: "all"
            });
            $(".ui-resizable-handle").css("display", "none");
        });
    }
   function getTreeInfo(options) {
        $.post("/formdesigner/Home/GetTreeInfo", { DataSource: options.DataSource, NodeImg: options.DefaultValue }, function (retValue) {
            var ListItems = null;
            if (form.Fields && form.Fields.length > 0) {
                for (var i = 0; i < form.Fields.length; i++) {
                    if (form.Fields[i].Name == options.OldID) {
                        ListItems = form.Fields[i].ListItems;
                    }
                }
            }
            disFreeAtr(retValue);
            var icons = false;
            var plugins = ["themes", "json_data", "checkbox", "sort", "ui"];
            if (!options.Required) {
                plugins = ["themes", "json_data", "sort", "ui"];
                var icons = true;
            }
            $.ajaxSetup({ cache: false });
            $("#" + options.Name).jstree({
                "plugins": plugins,
                "themes": {
                    "theme": "default",
                    "url": "/Plugins/Resources/Content/Themes/Default/jstree/themes/default/style.css",
                    "dots": true,
                    "icons": icons
                },
                "lang": {
                    "loading": "目录加载中……"
                },
                "json_data": {
                    //"ajax": {
                    //    "url": "/formdesigner/Home/GetTreeInfo",
                    //    "data": { "DataSource": options.DataSource, "NodeImg": options.DefaultValue }// treeContent.dataSource }
                    //},
                    "data": retValue,
                    "progressive_render": true
                },
                "checkbox": {
                    //"two_state": true
                }
            }).bind("select_node.jstree", function (e, data) {
                if (selectNode) {
                    selectNode.call(this, e, data);
                    //     alert(data.rslt.obj.data("id"));
                }
            }).bind("open_node.jstree loaded.jstree", function (e, data) {
                if (ListItems.length > 0) {
                    //document.oncontextmenu = function (e) { return false };
                    initJSTreeContextMenu(ListItems, options.Name);
                }
            });
            $("#" + options.Name).css("overflow", "auto");
            //$("#" + options.Name).wrap("<div class='wrap'></div>");
            //$("#" + options.Name).resizable({
            //   // alsoResize: "#" + options.Name,
            //    handles: "all"
            //});
            $(".ui-resizable-handle").css("display", "none");
        });
    }