!function (root, factory) {
    if (root.define && define.amd) {
        define('q.computed', factory);
    } else {
        root['QComputed'] = factory();
    }
}(window, function () {

    var tokens = [
        // function begin
        [/^function ?\(\) ?\{/],
        // function end
        [/^}$/],
        // return
        [/^return /],
        // space
        [/^(\s+|\;+)/],
        // string
        [/^(['"])(((\\['"])?([^\1])*)+)\1/],
        // operation
        [/^([\+\-\*\/]|(\|\||\&\&))/],
        // variable
        [/^this\.([\w\.]+)/, function (captures, res) {
            res.push(captures[1]);
        }]
    ];

    function parse(getter) {
        var res = [],
            str = getter.toString(),
            capture = false,
            i,
            l = tokens.length,
            captures,
            foo;
        while (str.length) {
            for (i = 0; i < l; i++) {
                if (captures = tokens[i][0].exec(str)) {
                    capture = true;
                    foo = tokens[i][1];
                    foo && foo(captures, res);
                    str = str.replace(tokens[i][0], '');
                    break;
                }
                
            }
            if (capture) {
                capture = false;
            } else {
                throw new Error('some error at: ' + str);
            }
        }

        return res;
    }

    /**
     * computed
     * @param {Data} scope
     * @param {Function} getter 
     */
    function computed(scope, key, getter) {
        var oldVal,
            res = parse(getter),
            handle = function (isInit) {
                var val = getter.call(scope);
                if (isInit || oldVal !== val) {
                    scope.$set(key, val);
                    oldVal = val;
                }
            };

        res.forEach(function (value) {
            scope.$watch(value, handle);
        });
        handle(true);
    }

    return computed;
});

