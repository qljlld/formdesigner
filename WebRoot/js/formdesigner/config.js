formdesigner.editConfig = function(config) {
    //FORMDESIGNER_BASEPATH=BASE.basePath?BASE.basePath:"";
    //FORMDESIGNER_GETURL=BASE.getURL?BASE.getURL:"";
    if(!config) config = {};
    config.menu = "default";
    config.toolbar = "default";
    config.drawTool = "default";
    config.formItem={
                    ID: new Date().getTime(),
                    SortOrder: 0,
                    Name: this.ID,
                    DataSource: null,
                    Text: "控件名",
                    Required: false,
                    ControlType: null,
                    DataType: "String",
                    AccessPattern: "Write",
                    DefaultValue: "",
                    Rows: 1,
                    Cols: 1,
                    Width: 240,
                    Height: 25,
                    URL: "",
                    X: 0,
                    Y: 0,
                    Z: 0,
                    Container: '',
                    ListItems:[],
                    ExtendData:'',
                    CustomStyle:''
                };
    config.form_full = [{
        name: 'FormDesigner',
        items: {
            menus: 'menus',
            toolbars: 'toolbars',
            leftcontainer: 'leftcontainer',
            view: 'container_designer',
            htmlcontainer_designer: 'htmlcontainer_designer',
            jsoncontainer_designer: 'jsoncontainer_designer',
            jscontainer_designer: 'designerJavascript',
            csscontainer_designer: 'csscontainer_designer',
            attrcontainer: 'attrcontainer'
        }
    }, {
        name: 'ControlType',
        items: {
            Text: "Text",
            TextBox: "TextBox",
            DatePicker: "DatePicker",
            MonthPicker: "MonthPicker",
            YearPicker: "YearPicker",
            SingleCombox: "SingleCombox",
            MultiCombox: "MultiCombox",
            CheckBox: "CheckBox",
            DropDownList: "DropDownList",
            ChooseBox: "ChooseBox",
            ChooseTree: "ChooseTree",
            Button: "Button",
            TextArea: "TextArea",
            Radio: "Radio",
            Email: "Email",
            Combox: "Combox",
            Upload: "Upload",
            HiddenInput: "HiddenInput",
            SysVariable: "SysVariable",
            Div: "Div",
            Grid: "Grid",
            Wizard: "Wizard",
            Image: "Image",
            DataTable: "DataTable",
            Tabs: "Tabs",
            Tree: "Tree",
            Chart: "Chart"
        }
    }, {
        name: 'Form',
        items: {
            DataSource: null,
            Title: "表单",
            Fields: new Array(),
            Script: null,
            Style: null
        }
    }, {
        name: 'type',
        items: ["basictype", "quicktype", "containertype"]
    }]
    return config;
}