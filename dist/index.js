'use strict';

var _papaparse = require('papaparse');

var _papaparse2 = _interopRequireDefault(_papaparse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var productsFileInput = document.getElementById('products-file-input');
var productsFileUploadButton = document.getElementById('products-file-upload-button');

var tasksFileInput = document.getElementById('tasks-file-input');
var tasksFileUploadButton = document.getElementById('tasks-file-upload-button');

productsFileInput.onchange = function () {
    var productsCsvFile = this.files[0];
};