import Papa from 'papaparse';

const segmentsContainer = document.getElementById('segments-container');

const productsFileInput = document.getElementById('products-file-input');
const productsFileUploadButton = document.getElementById('products-file-upload-button');
const productsFileUploadIcon = productsFileUploadButton.getElementsByTagName('I')[0];
const productsFileInputText = productsFileUploadButton.getElementsByTagName('P')[0];

const tasksFileInput = document.getElementById('tasks-file-input');
const tasksFileUploadButton = document.getElementById('tasks-file-upload-button');
const tasksFileUploadIcon = tasksFileUploadButton.getElementsByTagName('I')[0];
const tasksFileInputText = tasksFileUploadButton.getElementsByTagName('P')[0];

const noTaskToggle = document.getElementById('no-task-toggle');
const rankingModeToggle = document.getElementById('ranking-mode-toggle');
const tasksBelowMatrixToggle = document.getElementById('tasks-below-matrix-toggle');

const generateButton = document.getElementById('generate-button');

const codeSegment = document.createElement("div");
const htmlPre = document.createElement("pre");
const codePre = document.createElement("pre");

codeSegment.setAttribute('class', 'ui left aligned bottom attached segment')
codeSegment.appendChild(htmlPre);
codeSegment.appendChild(codePre);


let config = {
    products: {},
    tasks: {},
    noTaskMode: false,
    rankingMode: false,
    tasksBelowMatrix: false
}

productsFileInput.onchange = function() {
    let productsCsvFile = this.files[0];
    Papa.parse(productsCsvFile, {
        complete: function(results, file) {
            config.products = processIntoJsonArray(results.data)
                .map(transformToProductComponent);

            productsFileInputText.innerHTML = 'Reupload Products CSV';
            productsFileUploadIcon.classList.add('green');
        }
    })
}

tasksFileInput.onchange = function() {
    let tasksCsvFile = this.files[0];
    Papa.parse(tasksCsvFile, {
        complete: function(results, file) {
            config.tasks = processIntoJsonArray(results.data);

            tasksFileInputText.innerHTML = 'Reupload Tasks CSV';
            tasksFileUploadIcon.classList.add('green');
        }
    })
}

noTaskToggle.onchange = function(e) {
    config.noTaskMode = e.target.checked;
}

rankingModeToggle.onchange = function(e) {
    config.rankingMode = e.target.checked;
}

tasksBelowMatrixToggle.onchange = function(e) {
    config.tasksBelowMatrix = e.target.checked;
}

generateButton.onclick = function() {
    htmlPre.textContent = getHtmlCodeString();
    codePre.innerHTML = getCodeString();
    if (segmentsContainer.childElementCount == 1)
        segmentsContainer.appendChild(codeSegment);
}

function processIntoJsonArray(_data) {
    let data = _data;
    let headers = data.shift();
    return data.map(attributeArray => {
        let obj = {};
        headers.map((header, index) => {
            obj[header] = attributeArray[index];
        });
        return obj;
    });
}

function transformToProductComponent(productAttributes) {
    let identifier = Object.keys(productAttributes)[0];
    let obj = {
        name: productAttributes[identifier],
        attributes: productAttributes
    };
    delete obj.attributes[identifier];
    return obj;
}

function prettifyJSON(obj) {
    return JSON.stringify(obj, null, 2);
}

function getHtmlCodeString() {
    let message = '<!-- Copy and paste this into the question HTML -->';
    let code = '\<div id="question-matrix-app">\&nbsp\</div>'
    return message + '\n' + code;
}

function getCodeString() {
    let message = '// Copy and paste this into the question JavaScript\n';
    let hideChoicesCode = 'this.hideChoices();\n'
    let configJson = prettifyJSON(config).slice(0, -2);
    configJson += ',\n'
    configJson += '  thisInstance: this';
    configJson += ',\n'
    configJson += '  engineInstance: Qualtrics.SurveyEngine';
    configJson += '\n}';
    let code = 'initQuestionMatrix(' + configJson + ');';
    return message + hideChoicesCode + code;
}
