module.exports = function (gen) {
    var args = [].slice.call(arguments, 1), it;
    it = gen.apply(this, args);
    
    return Promise.resolve()
        .then(function handleNext(value) {
            var next = it.next(value);
            return (function handleResult(next) {
                if (next.done) {
                    return next.value;
                }
                else {
                    return Promise.resolve(next.value)
                        .then(
                            handleNext,
                            function handleErr(err) {
                                return Promise.resolve(
                                    it.throw(err)
                                )
                                    .then(handleResult);
                            }
                        );
                }
            })(next);
        });
};