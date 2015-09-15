
function Animals(spinner, animalcontext) {
    var vm = this;
    vm.animals = [];
    activate();

    function activate() {
        getAnimals().then(function() {
             spinner.spinnerHide();
        });

    }

    function getAnimals() {
        return animalcontext.getAllAnimals().then(function(data) {
            return vm.animals = data.data;
        });
    }
}


angular
    .module('app.animal')
.controller(Animals);
