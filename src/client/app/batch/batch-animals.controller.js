(function () {
angular
    .module('app.batch')
    .controller('BatchAnimals', BatchAnimals);

function BatchAnimals(spinner, animalcontext) {
    var vm = this;
    activate();
    function activate() {
        getAnimals().then(function () {
            spinner.spinnerHide();
        });

    }

    function getAnimals() {
        return animalcontext.getAllAnimals().then(function (data) {
            return vm.animals = data.data;
        });
    }
}
})();