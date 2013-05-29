if (!window.BASE) window.BASE = {};

(function(window, undefined) {
  /*数组操作*/
  Array.prototype.removeElement = function() {
    var newArray = [];
    var provisionalObject = {};
    for (var i = 0, item;
    (item = this[i]) != null; i++) {
      if (!provisionalObject[item]) {
        newArray.push(item);
        provisionalObject[item] = true;
      }
    }
    return newArray;
  };
  Array.prototype.indexOf = function(o) {
    var _self = this;
    for (var i = 0; i < _self.length; i++) {
      if (_self[i] == o) {
        return i;
      }
    }
    return -1;
  }
  /*数组元素位置*/

  function includes(array, obj) {
    return indexOf(array, obj) != -1;
  }
  /*鍒ゆ柇鍏冪礌鍦ㄦ暟缁勪腑鐨勪綅缃�*/

  function indexOf(array, obj) {
    if (array.indexOf) return array.indexOf(obj);

    for (var i = 0; i < array.length; i++) {
      if (obj === array[i]) return i;
    }
    return -1;
  }
  /*鍒犻櫎鏁扮粍涓殑鍏冪礌*/

  function arrayRemove(array, value) {
    var index = indexOf(array, value);
    if (index >= 0)
      array.splice(index, 1);
    return value;
  }


  /*版本信息*/
  var version = {
    full: '1.1.2', // all of these placeholder strings will be replaced
    major: 1, // compile task
    minor: 1,
    dot: 2,
    codeName: 'tofu-animation'
  };
  /*BASE变量*/
  var BASE = window.BASE;
  /*forEach*/

  function forEach(obj, iterator, context) {
    var key;
    if (obj) {
      if (isFunction(obj)) {
        for (key in obj) {
          if (key != 'prototype' && key != 'length' && key != 'name' && obj.hasOwnProperty(key)) {
            iterator.call(context, obj[key], key);
          }
        }
      } else if (obj.forEach && obj.forEach !== forEach) {
        obj.forEach(iterator, context);
      } else if (isObject(obj) && isNumber(obj.length)) {
        for (key = 0; key < obj.length; key++)
          iterator.call(context, obj[key], key);
      } else {
        for (key in obj) {
          if (obj.hasOwnProperty(key)) { //hasOwnProterty(涓嶅垽鏂師鍨嬮摼涓殑銆�
            iterator.call(context, obj[key], key);
          }
        }
      }
    }
    return obj;
  }

  function extend(dst) {
    forEach(arguments, function(obj) {
      if (obj !== dst) {
        forEach(obj, function(value, key) {
          dst[key] = value;
        });
      }
    });
    return dst;
  }
  /*
字符串小写和大写
*/
  var lowercase = function(string) {
    return isString(string) ? string.toLowerCase() : string;
  };
  var uppercase = function(string) {
    return isString(string) ? string.toUpperCase() : string;
  }
  var manualLowercase = function(s) {
    return isString(s) ? s.replace(/[A-Z]/g, function(ch) {
      return fromCharCode(ch.charCodeAt(0) | 32);
    }) : s;
  };
  var manualUppercase = function(s) {
    return isString(s) ? s.replace(/[a-z]/g, function(ch) {
      return fromCharCode(ch.charCodeAt(0) & ~32);
    }) : s;
  };


  // String#toLowerCase and String#toUpperCase don't produce correct results in browsers with Turkish
  // locale, for this reason we need to detect this case and redefine lowercase/uppercase methods
  // with correct but slower alternatives.
  if ('i' !== 'I'.toLowerCase()) {
    lowercase = manualLowercase;
    uppercase = manualUppercase;
  }

  function fromCharCode(code) {
    return String.fromCharCode(code);
  }
  /*鎬荤粨锛歵ypeof 鏄js鍩烘湰鏁版嵁绫诲瀷鐨勫垽鏂�

      instance of 鏄垽鏂疄渚嬩笌绫诲叧绯荤殑鍒ゆ柇

     constructor 鏄垽鏂疄渚嬩笌鏋勯�鍑芥暟鍏崇郴鐨勫垽鏂�
*/
  var isString = function(obj) {
    return typeof(obj) === "string"
  };
  var isNumber = function(obj) {
    return typeof(obj) === "number"
  };
  var isDefined = function(obj) {
    return typeof(obj) != "undefined"
  };
  var isNull = function(obj) {
    return typeof(obj) == "object" && obj === null
  };
  var isBoolean = function(obj) {
    return typeof(obj) === "boolean"
  };
  var isFunction = function(obj) {
    return typeof(obj) === "function"
  };
  var isArray = function(obj) {
    return typeof(obj) === "object" && obj.constructor === Array
  }; //toString.apply(value) == '[object Array]';
  var isDate = function(obj) {
    return typeof(obj) === "object" && obj.constructor === Date
  }; //toString.apply(value)=='[object Date']';
  var isObject = function(obj) {
    return obj != null && typeof(obj) === 'object'
  };
  var isWindow = function(obj) {
    return obj && obj.document && obj.location && obj.alert && obj.setInterval;
  }
  var isElementNode = function(obj) {
    return obj && (obj.nodeName || (obj.bind && obj.find))
  }

  var trim = function(obj) {
    return isString(obj) ? obj.replace(/^\s*/, "").replace(/\s*$/, "") : obj
  }
  var trimAll = function(obj) {
    return isString(obj) ? obj.eplace(/\s/g, "") : obj
  }

  /*复制*/

    function copy(source, destination) {
      if (!destination) {
        destination = source;
        if (source) {
          if (isArray(source)) {
            destination = copy(source, []);
          } else if (isDate(source)) {
            destination = new Date(source.getTime());
          } else if (isObject(source)) {
            destination = copy(source, {});
          }
        }
      } else {
        if (source === destination) throw Error("Can't copy equivalent objects or arrays");
        if (isArray(source)) {
          while (destination.length) {
            destination.pop();
          }
          for (var i = 0; i < source.length; i++) {
            destination.push(copy(source[i]));
          }
        } else {
          forEach(destination, function(value, key) {
            delete destination[key];
          });
          for (var key in source) {
            destination[key] = copy(source[key]);
          }
        }
      }
      return destination;
    }



    function addWaterfall(outterDiv) {
      var waterfall = $(document.createElement("div"));
      waterfall.css({
        "height": "100%",
        "width": "100%",
        "filter": "alpha(opacity = 50)",
        "-moz-opacity": "0.1",
        "opacity": "0.1",
        "background-color": "#fff",
        "position": "absolute",
        "left": "0px",
        "top": "30px",
        "display": "none"
      });
      $(waterfall).appendTo(outterDiv);
      $(waterfall).bind('click', function() {
        $(this).hide();
      });
      return $(waterfall);
    }

    function openDialog(options) {
      var defaults = {
        container: "actionDialog",
        position: document,
        width: 350,
        height: 400,
        maxDialog: false,
        minDialog: false,
        showModal: false,
        dialogType: 0, //0为div,1为iframe
        marginTop: 100,
        title: "窗口",
        url: null,
        contentUrl: null,
        content: null,
        resizable: true,
        dialogClass: null,
        customdialogSylte: null,
        windowStyle: {
          style: "edge: Raised; center: Yes; resizable: Yes; status: no;scrollbars=no",
          auguments: window
        },
        divContentStyle: {
          style: "font-size:14px;margin:0 auto;text-align:left;height:100%",
          bgiframe: true,
          autoOpen: false
        },
        buttons: null
      };
      var config = $.extend({}, defaults, options);
      var frame = config.url ? true : false;
      if (config.dialogType == 1) {
        var cssDialog = "dialogHeight:" + config.height + "px; dialogWidth:" + config.width + "px;" + config.windowStyle.style;
        if (config.showModal) {
          return window.showModalDialog(config.url, config.windowStyle.auguments, cssDialog);
        } else {
          return window.showModelessDialog(url, config.windowStyle.auguments, cssDialog);
          // var cssDialog = 'center: Yes,status=yes,menubar=no,scrollbars=no,resizable=yes,width=' + config.width + ',height=' + config.height;
          // window.open(url, title, cssDialog);
        }
      } else {
        var operateDialog = $("#" + config.container);
        if (operateDialog.length <= 0) {
          var id = config.container;
          dialogItem = '<div id="' + id + '" style="height: 0px; border: 0px; overflow: hidden; font-size: 13px;">';
          $(config.position).find("body").append(dialogItem);
          operateDialog = $("#" + id);
        }
        if (frame) {
          if (operateDialog && operateDialog.has("iframe")[0]) {
            operateDialog.dialog("destroy");
          }
          operateDialog.html('<iframe id="bg_div_iframe" width="100%" height="100%" allowTransparency="true" frameborder="0"></iframe>');
          operateDialog.find('#bg_div_iframe').attr('src', config.url);
          var $waterfall = addWaterfall("#" + config.container);
          $waterfall.hide();
          operateDialog.dialog({
            bgiframe: true,
            autoOpen: false,
            width: config.width,
            height: config.height,
            resizable: config.resizable,
            position: ['center', config.marginTop],
            modal: config.showModal,
            resizeStart: function(event, ui) {
              window.console.log("开始");
              $waterfall.show();
            },
            resizeStop: function(event, ui) {
              window.console.log("结束");
              $waterfall.hide();
            }
          });
          operateDialog.dialog("option", "title", config.title);
          operateDialog.dialog("open");
          var $headerBar = $("#" + config.container).prev();
          $headerBar.bind('dblclick', function() {});
          $headerBar.bind('mousedown', function() {
            $waterfall.show();
          });
          $headerBar.bind('mouseup', function() {
            $waterfall.hide();
          });
          return true;
        } else {
          if (operateDialog) {
            operateDialog.empty();
          }
          if (config.contentUrl) {
            $.get(config.contentUrl)
              .done(function(content, nativeStatusText, responses) {
              config.content = content;
              var reg = /<script[^>]*>([sS]*)<\/script>/g;
              var contentscript = content.match(reg);
              var currentscript = document.getElementsByTagName("script");
              var existscript = false;
              for (var i = 0; i < contentscript.length; i++) {
                for (var j = 0; j < currentscript.length; j++) {
                  if ($(currentscript[j]).attr("src") == $(contentscript[i]).attr("src")) {
                    existscript = true;
                    break;
                  }
                }
                if (!existscript) {
                  (function() {
                    //  function async_load() {
                    var po = document.createElement("script");
                    po.type = "text/javascript";
                    po.async = true;
                    po.src = $(contentscript[i]).attr("src");
                    var s = document.getElementsByTagName("script")[0];
                    s.parentNode.insertBefore(po, s);
                    //  };
                    //    if (window.attachEvent)
                    //        window.attachEvent('onload', async_load);
                    //     else
                    //         window.addEventListener('load', async_load, false);
                  })();
                }
                existscript = false;
              }
              operateDialog.html(content);
              operateDialog.dialog({
                bgiframe: config.divContentStyle.bgiframe,
                autoOpen: config.divContentStyle.autoOpen,
                width: config.width,
                height: config.height,
                resizable: config.resizable,
                position: ['center', config.marginTop],
                modal: config.showModal,
                close: function(event, ui) {
                  operateDialog.dialog("destroy");
                },
                buttons: config.buttons
              });
              operateDialog.dialog("option", "title", config.title);
              operateDialog.dialog("open");
            });
          } else {
            if (operateDialog && operateDialog.children().length > 0) {
              operateDialog.dialog("destroy");
            }
            operateDialog.html("<div style='" + config.divContentStyle.style + "'>" + config.content + "</div>");
            operateDialog.dialog({
              bgiframe: config.divContentStyle.bgiframe,
              autoOpen: config.divContentStyle.autoOpen,
              option: config.dialogClass,
              width: config.width,
              resizable: config.resizable,
              position: ['center', config.marginTop],
              modal: config.showModal,
              buttons: config.buttons
            });
            operateDialog.dialog("option", "title", config.title);
            if (config.customdialogSylte) {
              $(document).find(".ui-widget-header").attr("style", config.customdialogSylte.head);
              operateDialog.attr("style", config.customdialogSylte.body);
              $(document).find(".ui-dialog-buttonpane").attr("style", config.customdialogSylte.footer);
              $(document).find(".ui-dialog-buttonpane").children().css("float", "none");
            }
            operateDialog.dialog("open");
          }
        }
      }
    }

    /*获取窗口高度*/

    function getWindowHeight() {
      var windowHeight = 0;
      if (typeof(window.innerHeight) == 'number') {
        windowHeight = window.innerHeight;
      } else {
        if (document.documentElement && document.documentElement.clientHeight) {
          windowHeight = document.documentElement.clientHeight;
        } else {
          if (document.body && document.body.clientHeight) {
            windowHeight = document.body.clientHeight;
          }
        }
      }
      return windowHeight;
    }


    /*动态加载script*/

    function addScript(src, async) {
      var newScript = document.createElement("script");
      newScript.type = "text/javascript";
      newScript.src = src;
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(newScript, s);
    }



    /*动态加载css*/

    function addCss(href, async) {
      var newCss = document.CreateElement('link');
      newCss.type = 'text/css';
      newCss.href = href;
      var c = document.getElementsByTagName('head')[0];
      c.appendChild(newCss);
    }

    function addStyleContent(styleContent, descodeURI) {
      var sStyle = document.CreateElement('stype');
      sStyle.type = 'text/css'; //sStyle.setAttribute("type", "text/css");
      if (descodeURI) {
        styleContent = decodeURIComponent(styleContent);
      }
      if (sStyle.styleSheet) { //ie
        sStyle.styleSheet.cssText = styleContent;
      } else {
        var csstext = document.createTextNode(styleContent);
        sStyle.appendChild(csstext);
      }
      document.getElementsByTagName('head')[0].appendChild(sStyle);
    }
    /*html编解码*/

    function html_encode(str) {
      var encodeHtml = "";
      if (str.length == 0) return "";
      encodeHtml = str.replace(/&/g, "&amp;");
      encodeHtml = encodeHtml.replace(/</g, "&lt;");
      encodeHtml = encodeHtml.replace(/>/g, "&gt;");
      encodeHtml = encodeHtml.replace(/ /g, "&nbsp;");
      encodeHtml = encodeHtml.replace(/\'/g, "&#39;");
      encodeHtml = encodeHtml.replace(/\"/g, "&quot;");
      encodeHtml = encodeHtml.replace(/\n/g, "<br>");
      return encodeHtml;
    }

    function html_decode(str) {
      var decodeHtml = "";
      if (str.length == 0) return "";
      decodeHtml = str.replace(/&amp;/g, "&");
      decodeHtml = decodeHtml.replace(/&lt;/g, "<");
      decodeHtml = decodeHtml.replace(/&gt;/g, ">");
      decodeHtml = decodeHtml.replace(/&nbsp;/g, " ");
      decodeHtml = decodeHtml.replace(/&#39;/g, "\'");
      decodeHtml = decodeHtml.replace(/&quot;/g, "\"");
      decodeHtml = decodeHtml.replace(/<br>/g, "\n");
      decodeHtml = decodeHtml.replace(/<BR>/g, "\n");
      return decodeHtml;
    }
    /*阻止事件向下传播*/

    function stopPropagation(e) {
      if (e) //停止事件向下传播
        e.stopPropagation();
      else {
        window.event.cancelBubble = true
      }
    }

    function getBasePath() {
      var path = window.PATH || '';
      if (!path) {
        var e = document.getElementsByTagName('script');
        for (var f = 0; f < e.length; f++) {
          //var g=e[f].src.match(/(^|.*[\\\/])formdesigner(?:_base)?.js(?:\?.*)?$/i);
          var g = e[f].src.match(/(^|.*[\\\/])base?.js(?:\?.*)?$/i);
          if (g) {
            path = g[1];
            break;
          }
        }
      }
      if (path.indexOf(':/') == -1) {
        if (path.indexOf('/') === 0)
          path = location.href.match(/^.*?:\/\/[^\/]*/)[0] + path;
        else path = location.href.match(/^[^\?]*\/(?:)/)[0] + path;
      }
      if (!path)
        throw 'path error';
      return path;
    }

    function banContextMenu() {
      document.oncontextmenu = function(e) {
        return false
      };
    }
    (function publishBASE(BASE) {
      extend(BASE, {
        version: version,
        isString: isString,
        isNumber: isNumber,
        isDefined: isDefined,
        isNull: isNull,
        isBoolean: isBoolean,
        isFunction: isFunction,
        isArray: isArray,
        isDate: isDate,
        isObject: isObject,
        lowercase: lowercase,
        uppercase: uppercase,
        getWindowHeight: getWindowHeight,
        html_encode: html_encode,
        html_decode: html_decode,
        stopPropagation: stopPropagation,
        getBasePath: getBasePath,
        openDialog: openDialog,
        banContextMenu: banContextMenu,
        addScript: addScript,
        copy:copy
      })
    })(BASE);
})(window, undefined)