var http = require('http');

module.exports = function () {
    var mappings = {'get': {}, 'post': {}, 'put': {}, 'delete': {}},
        middlewares = [],
        Server = http.Server;

    Server.prototype.get = function () {
        var url = arguments[0];
        mappings.get[url] = Array.prototype.slice.call(arguments, 1);
    };

    Server.prototype.post = function () {
        var url = arguments[0];
        mappings.post[url] = Array.prototype.slice.call(arguments, 1);
    };

    Server.prototype.put = function () {
        var url = arguments[0];
        mappings.put[url] = Array.prototype.slice.call(arguments, 1);
    };

    Server.prototype.del = function () {
        var url = arguments[0];
        mappings.delete[url] = Array.prototype.slice.call(arguments, 1);
    };

    Server.prototype.use = function () {
        var firstArg = arguments[0];
        var secondArg = arguments[1];
        if (!!firstArg) {
            if (!!secondArg && typeof firstArg === 'string' && typeof secondArg === 'function') {
                middlewares.push(function (req, res, next) {
                    if (req.url === firstArg) {
                        secondArg(req, res, next);
                    }
                    else {
                        next();
                    }
                });
            }
            else if (typeof firstArg === 'function') {
                middlewares.push(firstArg);
            }
        }
    };

    function setupExecutionList(mw) {
        var i = 1;
        return function () {
            return mw[i++];
        }
    }

    var generateHttpServerInstance = function (mappings) {
        return http.createServer(function (req, res) {
            var method = req.method.toLowerCase();
            var url = req.url;


            //run appropriate callback for the url
            if (!!mappings[method][url] && !!mappings[method][url].length) {
                //getting tasks for given URL , starting with middlewares, and then with mappings
                var executionList = middlewares.concat(mappings[method][url]);
                var executionListIterator = setupExecutionList(executionList);
                var next = function () {
                    var execute = executionListIterator();
                    if (!!execute) {
                        execute(req, res, next);
                    }
                };
                executionList[0](req, res, next);
            }
            else {
                res.statusCode = 404;
                res.end('404');
            }
        });
    };
    return generateHttpServerInstance(mappings);
};
