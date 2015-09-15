angular
    .module('app.pasture')
    .controller('PastureDetail', PastureDetail);

function PastureDetail(spinner) {
    spinner.spinnerHide();
}