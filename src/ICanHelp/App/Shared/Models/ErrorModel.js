var Shared;
(function (Shared) {
    (function (Models) {
        var ErrorModel = (function () {
            function ErrorModel() {
                this.message = "";
            }
            return ErrorModel;
        })();
        Models.ErrorModel = ErrorModel;
    })(Shared.Models || (Shared.Models = {}));
    var Models = Shared.Models;
})(Shared || (Shared = {}));
//# sourceMappingURL=ErrorModel.js.map
