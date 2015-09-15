angular
    .module('app.batch')
    .controller('BatchTreatments', BatchTreatments);

function BatchTreatments(spinner) {
    spinner.spinnerHide();
}