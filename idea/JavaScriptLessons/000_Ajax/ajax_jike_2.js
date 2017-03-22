/**
 * Created by tongmeiyan on 2016/9/12.
 */

//对ajax操作的封装，以方便使用

//自运行函数
(function() {
    /**
     * 初始化一个对象，用来发起对ajax请求
     * @param {Object} options
     */
    window.ajax = function(options) {
        //默认参数
        var defaultOptions = {
            async:true
        };

        options = extend(defaultOptions, options);

        //核心功能对象，包含了xhr并实现了需求中各方法和属性
        var _obj = {
            xhr:createXHR(), //xhr对象
            successCallbacks: [],
            errorCallbacks:[],
            alwaysCallbacks:[],
            options:options
        };

        /**
         * 设置前置处理方法
         * @param {Function} callback
         */
        _obj.before = function(callback) {
            typeof(callback) === 'function' && callback(_obj.xhr); //如果callback是函数，则调用此函数，同时传递参数
            return _obj; //为支持链式操作，将原对象返回
        };

        /**
         * 设置单个请求头
         * header方法必须在get|post方法之前执行，否则请求已发出再设置header没有意义
         * @param {String} name
         * @param {String} value
         */
        _obj.header = function(name,value) {
            _obj.xhr.setRequestHeader(name, value);
            return _obj;
        };

        /**
         * 设置多个请求头
         * @param {Object} headers
         */
        _obj.headers = function (headers) {
            if(Object.prototype.toString.call(headers) === '[object Object]') {
                for(var name in headers) {
                    _obj.xhr.setRequestHeader(name, headers[name]);
                }
            }
            return _obj;
        };

        /**
         * 成功时的架设
         * @param {Function} callback
         * @param {Boolean} jsonForceValidate
         */
        _obj.success = function(callback, jsonForceValidate) {
            _obj.jsonForceValidate = jsonForceValidate;

            if (typeof(callback) === 'function') {
                _obj.successCallbacks.push(callback);
            }
            return _obj;
        };

        /**
         * 失败时的回调
         * @param {Function} callback
         */
        _obj.error = function(callback) {
            if (typeof(callback) === 'function') {
                _obj.errorCallbacks.push(callback);
            }
            return _obj;
        };

        /**
         * 执行完成时的回调，无论成功失败
         * @param callback
         */
        _obj.always = function(callback) {
            if(typeof(callback) === 'function') {
                _obj.alwaysCallbacks.push(callback);
            }
            return _obj;
        };

        /**
         * 设定超时时间并绑定超时回调
         * @param {Object}timeout
         * @param {Function}callback
         */
        _obj.timeout = function(timeout, callback) {
            _obj.xhr.timeout = timeout;

            if (typeof(callback) === 'function') {
                _obj.xhr.ontimeout = function() {
                    callback(_obj.xhr);
                }
            }
            return _obj;
        };

        /**
         * 以get method发起请求
         */
        _obj.get = function (url, data) {
            if (typeof(url) === 'undefined') throw 'url不能为空';
            if (Object.prototype.toString.call(data) !== '[object Object]') data = undefined;
            doAjax(_obj, 'get', url, data, 'urlencoded');
            return _obj;
        };

        /**
         * 以post method发起ajax请求
         */
        _obj.post = function (url, data, contentType) {
            if (typeof(url) === 'undefined') throw 'url不能为空';
            if (Object.prototype.toString.call(data) !== '[object Object]') data = undefined;
            if (typeof(contentType) !== 'string')  contentType = 'urlencoded';

            doAjax(_obj, 'post', url, data, contentType);

            return _obj;
        };
    };

    /**
     * 执行ajax操作
     * @param _obj
     * @param method
     * @param url
     * @param data
     * @param contentType
     */
    function doAjax(_obj, method, url, data, contentType) {
        var xhr = _obj.xhr;
        //编码数据对象
        data = encodeData(data, contentType);
        //如果是get请求，将编码后的data作为查询参数附加到url上
        if ('get' === method) {
            url += (url.indexOf('?') == -1 ? '?' : '&') + data; //GET方式在url上叠加参数(?作ulr地址结尾参数数据的开端,各组数据之间以&间隔)
        }
        //绑定事件处理器
        bindEventHandler();
        //open
        xhr.open(method,url,_obj.options.async);
        //send
        if ('post' === method && data) {
            xhr.setRequestHeader('Content-Type', _obj.postContentType);
            xhr.send(data);
        } else {
            xhr.send();
        }

        /**
         * 对数据进行编码
         * @param data
         * @param contentType
         * @returns {string}
         */
        function encodeData(data, contentType) {
            if(Object.prototype.toString.call(data) === '[object Object]') {
                //此处需要json转字符串，现代浏览器都支持内置的JSON对象，如果老浏览器不支持，可通过使用json2.js来模拟实现
                if ('json' === contentType.toLowerCase() //以application/json格式post数据
                    && typeof(JSON) === 'object'//支持JSON序列化
                    && typeof(JSON.stringify) === 'function') {
                    _obj.postContentType = 'application/json';
                    return JSON.stringify(data);
                } else {
                    // 其它所有情况都作为urlencoded处理
                    _obj.postContentType = 'application/x-www-form-urlencoded';
                    return encodeParam(data);
                }
            }
        }

        /**
         * 以urlencoded方式编码数据
         * @param data
         * @returns {string}
         */
        function encodeParam(data) {
            if(Object.prototype.toString.call(data) == '[object Object]') {
                var params = [];
                for(var name in data) {
                    var value = data[name];
                    if(Object.prototype.toString.call(value) === '[object Array]') {
                        //如果是数组，需要组装成paraName=v1&paraName=v2这样的形式，便于后台以数据形式接收数据
                        //x:[1,2,3] 编码成 x=1&x=2&x=3
                        for(var i=0; i<value.length; ++i) {
                            params.push(name + '=' + encodeURIComponent(value[i]));
                        }
                    } else {
                        params.push(name + '=' + encodeURIComponent(data[name]));
                    }
                }
                return params.join('&');
            }
        }

        function bindEventHandler() {
            xhr.onreadystatechange = function () {
                //仅当请求完成时执行处理
                if (xhr.readyState == 4) {
                    var i, len;
                    //如果有always回调，先执行always
                    for (i = 0, len = _obj.alwaysCallbacks.length; i < len; ++i) {
                        _obj.alwaysCallbacks[i](xhr.status, xhr.responseText, xhr);
                    }
                    //根据是否成功，决定调用success or error
                    var resText = xhr.responseText;
                    var resJson = toJson(resText);

                    if(xhr.status == 200) {
                        if(_obj.jsonForceValidate && typeof(resJson) === 'undefined') {
                            //强制json格式验证且转换失败,触发errorCallback
                            for(i = 0, len = _obj.errorCallbacks.length; i < len; ++i) {
                                _obj.errorCallbacks[i](xhr.status, xhr.responseText, xhr);
                            }
                        } else {
                            for(i = 0,len = _obj.successCallbacks.length; i < len; ++i) {
                                _obj.successCallbacks[i](resJson || resText, xhr);
                            }
                        }
                    } else {
                        //非 200 状态调用 errorCallback
                        for(i = 0, len = _obj.errorCallbacks.length; i < len; ++i) {
                            _obj.errorCallbacks[i](xhr.status, xhr.responseText, xhr);
                        }
                    }
                }
            }
        }

        function toJson(text) {
            var json;
            try{
                //尝试将结果转为JSON对象
                //优先使用JSON.parse，如果浏览器不支持内置JSON对象，则以eval方式执行
                if(typeof(JSON) ==='object' && typeof(JSON.parse) === 'function') {
                    json = JSON.parse(text);
                } else {
                    json = eval(text);
                }
            } catch(e) {}
            return json;
        }
    }

    function extend(obj1, obj2) {
        //obj1与obj2属性一样，则以obj2属性值覆盖obj1
        if (Object.prototype.toString.call(obj1) === '[object Object]'
            && Object.prototype.toString.call(obj2) === '[object Object]') {
            for(var pname in obj2) {
                obj1[pname] = obj2[pname];
            }
        }
        return obj1;
    }

    function createXHR() {
        var xhr = null;
        if(window.XMLHttpRequest) {
            xhr = new XMLHttpRequest(); //IE7以上
        } else if(window.ActiveXObject) {
            try{
                xhr = new ActiveXObject("Msxml2.XMLHTTP");  //IE6
            } catch (e) {
                try {
                    xhr = new ActiveXObject("Microsoft.XMLHTTP"); //IE5及更早
                } catch (e) {}
            }
        }
        return xhr;
    }
})();