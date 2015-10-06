(function () {
    angular
        .module('app.batch')
        .controller('BatchAnimals', BatchAnimals);
    BatchAnimals.$inject = ['animalcontext'];
    function BatchAnimals(animalcontext) {
        var vm = this;
        activate();
        function activate() {
            getAnimals();

        }

        function getAnimals() {
            return animalcontext.getAllAnimals().then(function (data) {
                return vm.animals = data.data;
            });
        }
    }
})();