import Papa from 'papaparse';

const productsFileInput = document.getElementById('products-file-input');
const productsFileUploadButton = document.getElementById('products-file-upload-button');

const tasksFileInput = document.getElementById('tasks-file-input');
const tasksFileUploadButton = document.getElementById('tasks-file-upload-button');

productsFileInput.onchange = function() {
    let productsCsvFile = this.files[0];

}
