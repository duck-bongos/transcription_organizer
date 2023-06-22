let uploadButton = document.getElementById("upload-button");
let chosenImage = document.getElementById("chosen-image");
let fileName = document.getElementById("file-name");
let container = document.querySelector(".container");
let error = document.getElementById("error");
let imageDisplay = document.getElementById("image-display");
let textDisplay = document.getElementById("raw-text");
let fs = document.getElementById("form-structure");
let list = document.getElementById("list");
let saveButton = document.getElementById("save-button");
var pars;

function setSections() {
    var arr = [
        ['sec', 'SOURCE OF REFERRAL & PURPOSE OF EVALUATION'],
        ['sec', 'IDENTIFYING INFORMATION'],
        ['sec', 'DISCLOSURE OF PURPOSE AND LIMITS OF CONFIDENTIALITY'],
        ['sec', 'STATEMENT OF LIMITATIONS DUE TO COVID-19'],
        ['sec', 'SOURCES OF DATA AND METHODS'],
        ['sec', 'CHIEF COMPLAINT'],
        ['sec', 'PERSONAL HISTORY'],
        ['sec', 'EDUCATIONAL HISTORY'],
        ['sec', 'LEGAL HISTORY/PROBLEMS IN THE COMMUNITY'],
        ['sec', 'SUBSTANCE USE HISTORY'],
        ['sec', 'PHYSICAL HEALTH HISTORY'],
        ['sec', 'BEHAVIORAL HEALTH HISTORY'],
        ['sec', 'WORK HISTORY'],
        ['sec', 'ACTIVITIES OF DAILY LIVING'],
        ['sec', 'MENTAL STATUS'],
        ['sub', 'Appearance and Behavior'],
        ['sub', 'Flow of Conversation and Thought'],
        ['sub', 'Mood and Affect'],
        ['sub', 'Anxiety'],
        ['sub', 'Mental Content'],
        ['sub', 'Sensorium and Cognitive Functioning'],
        ['sub', 'Insight and Judgment'],
        ['sec', 'SUMMARY AND CONCLUSIONS'],
        ['sec', 'RELIABILITY ESTIMATE'],
        ['sec', 'ICD 10-DSM-5 CLASSIFICATION'],
        ['sec', 'MANAGEMENT OF FUNDS'],
        ['sec', 'FUNCTIONAL ASSESSMENT'],
        ['sub', 'Describe the claimant’s abilities and limitations in understanding, remembering, and carrying out instructions.'],
        ['sub', 'Describe the claimant’s abilities and limitations in maintaining attention and concentration, and maintaining persistence and pace to perform simple tasks and to perform multi-step tasks.'],
        ['sub', 'Describe the claimant’s abilities and limitations in responding appropriately to supervisors and coworkers in a work setting.'],
        ['sub', 'Describe the claimant’s abilities and limitations in responding appropriately to work pressures in a work setting.'],
    ]
    return arr;
}
var sections = setSections();

//Upload Button
uploadButton.addEventListener("change", () => {
    imageDisplay.innerHTML = "";
    Array.from(uploadButton.files).forEach((file) => {
        fileHandler(file, file.name, file.type);
    });

});



container.addEventListener(
    "dragenter",
    (e) => {
        e.preventDefault();
        e.stopPropagation();
        container.classList.add("active");
    },
    false
);

container.addEventListener(
    "dragleave",
    (e) => {
        e.preventDefault();
        e.stopPropagation();
        container.classList.remove("active");
    },
    false
);

container.addEventListener(
    "dragover",
    (e) => {
        e.preventDefault();
        e.stopPropagation();
        container.classList.add("active");
    },
    false
);

container.addEventListener(
    "drop",
    (e) => {
        e.preventDefault();
        e.stopPropagation();
        container.classList.remove("active");
        let draggedData = e.dataTransfer;
        let files = draggedData.files;
        imageDisplay.innerHTML = "";
        Array.from(files).forEach((file) => {
            fileHandler(file, file.name, file.type);
        });
    },
    false
);


function replaceNewLines(strings) {
    strings.forEach(function (str, index) {
        strings[index] = str.replace(/\n/g, ' ');
    });
    return strings;
}

function splitParagraphs(text) {
    var paragraphs = text.split('\n\n');
    for (var i = 0; i < paragraphs.length; i++) {
        paragraphs[i] = paragraphs[i].replace('\n', ' ')
    }
    var p = replaceNewLines(paragraphs);
    return p
}

window.onload = async () => {
    error.innerText = "";
    for (var i = 0; i < sections.length; i++) {
        var s = sections[i];
        if (s[0] == "sub") {
            list.innerHTML += `<li class="list-item sub-item" data-value=${s[1]}>${s[1]}</li>`

        } else {
            list.innerHTML += `<li class="list-item sec-item" data-value=${s[1]}>${s[1]}</li>`
        }
    }
    let listItems = document.querySelectorAll(".list-item");
    listItems.forEach((element) => {
        element.draggable = true;
        element.addEventListener("dragstart", dragStart, false);
        element.addEventListener("dragover", dragOver, false);
        element.addEventListener("drop", drop, false);
        element.addEventListener("touchstart", dragStart, false);
        element.addEventListener("touchmove", drop, false);
    });
}

function fileHandler(file, name, type) {
    var reader = new FileReader();
    var scrapedText = '';

    reader.onload = function (event) {
        var htmlContent = event.target.result;
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;

        var paragraphs = tempDiv.getElementsByTagName('p');

        for (var i = 0; i < paragraphs.length; i++) {
            scrapedText += paragraphs[i].textContent + '\n';
        }
        pars = splitParagraphs(scrapedText);

        console.log('File Name:', name);
        console.log('File Type:', type);
    };

    // write scraped text to id='raw-text'
    reader.onloadend = () => {
        // create all the bubbles
        for (var i = 1; i < pars.length + 1; i++) {
            if (pars[i - 1] == '[END] ') {
                console.log('Complete');
            } else {
                list.innerHTML += `<li class="list-item" data-value ="${pars[i - 1]}">${pars[i - 1]} </li>`
            }
        }

        // add listeners to each item
        let listItems = document.querySelectorAll(".list-item");
        listItems.forEach((element) => {
            element.draggable = true;
            element.addEventListener("dragstart", dragStart, false);
            element.addEventListener("dragover", dragOver, false);
            element.addEventListener("drop", drop, false);
            element.addEventListener("touchstart", dragStart, false);
            element.addEventListener("touchmove", drop, false);
        });
    }

    reader.readAsText(file, 'UTF-8');
}

//Returns element index with given value
const getPosition = (value) => {
    let elementIndex;
    let listItems = document.querySelectorAll(".list-item, .sec-item");
    listItems.forEach((element, index) => {
        let elementValue = element.getAttribute("data-value");
        if (value == elementValue) {
            elementIndex = index;
        }
    });
    return elementIndex;
};

//Drag and drop functions
function dragStart(e) {
    initialX = isTouchDevice() ? e.touches[0].clientX : e.clientX;
    initialY = isTouchDevice() ? e.touches[0].clientY : e.clientY;
    //Set current Element
    currentElement = e.target;
}
function dragOver(e) {
    e.preventDefault();
}

const drop = (e) => {
    e.preventDefault();
    let newX = isTouchDevice() ? e.touches[0].clientX : e.clientX;
    let newY = isTouchDevice() ? e.touches[0].clientY : e.clientY;

    //Set targetElement(where we drop the picked element).It is based on mouse position
    let targetElement = document.elementFromPoint(newX, newY);
    let currentValue = currentElement.getAttribute("data-value");
    let targetValue = targetElement.getAttribute("data-value");
    //get index of current and target based on value
    let [currentPosition, targetPosition] = [
        getPosition(currentValue),
        getPosition(targetValue),
    ];
    initialX = newX;
    initialY = newY;

    try {
        //'afterend' inserts the element after the target element and 'beforebegin' inserts before the target element
        if (currentPosition < targetPosition) {
            targetElement.insertAdjacentElement("afterend", currentElement);
        } else {
            targetElement.insertAdjacentElement("beforebegin", currentElement);
        }
    } catch (err) { }
};

const isTouchDevice = () => {
    try {
        //We try to create TouchEvent (it would fail for desktops and throw error)
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
};

function saveHandler() {
    var m = new Map();
    var savedInput = saveInput();
    var savedListItems = saveListItems();
    m = new Map([...savedInput, ...savedListItems])
    console.log(m);
    return m;
}

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function saveInput() {
    var m = new Map();
    var name = document.getElementById("name").value;
    var pid = document.getElementById("pid").value;
    var dob = document.getElementById("dob").value;
    var doe = document.getElementById("doe").value;
    var age = getAge(dob);

    m.set("NAME", name);
    m.set("PID", pid);
    m.set("DOB", dob);
    m.set("AGE", age);
    m.set("DOE", doe);

    return m;
}

function saveListItems() {
    var m = new Map();
    const listElement = document.getElementById("list");
    var lll = listElement.querySelectorAll("li");
    var k = lll[0].firstChild.data;  // The last key that entered the dictionary.
    for (var i = 0; i < lll.length; i++) {
        var item = lll[i];
        // (DOMTokenList) item.classList
        if (item.classList.contains("sec-item") || item.classList.contains("sub-item")) {
            k = `${item.firstChild.data}`;
            m.set(k, "");
        }
        else {
            var x = m.get(k);
            x += " ";
            x += item.firstChild.data;
            m.set(k, x);
        }
    }
    return m;
}

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function latexMatcher(map) {
    var tex = getLateX();
    // iterate through the map and replace the LaTeX
    map.forEach(function (value, key) {
        tex = tex.replaceAll(key, value);
    })
    return tex
}

function htmlMatcher(map) {
    var f = document.getElementById("exportContent")

    map.forEach(function (value, key) {
        document.getElementById(key).innerHTML += ` ${value}`;
    })
}

saveButton.addEventListener("click", () => {
    imageDisplay.innerHTML = ""
    var m = new Map();
    console.log("Save Handler about to run");
    // first save everything
    m = saveHandler();
    console.log("Save Handler ran");

    // then fill in the LaTeX
    var out = htmlMatcher(m);

    // Then compile and save the LaTeX as a PDF
    ExportToDoc("exportContent", `transcription`);
})

function getLateX() {
    const d = document.getElementById("template").innerHTML;
    return d;
}

function ExportToDoc(element, filename = '') {
    var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";

    var footer = "</body></html>";

    var html = header + document.getElementById(element).innerHTML + footer;

    var blob = new Blob(['\ufeff', html], {
        type: 'application/msword'
    });

    // Specify link url
    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);

    // Specify file name
    filename = filename ? filename + '.docx' : 'document.docx';

    // Create download link element
    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        // Create a link to the file
        downloadLink.href = url;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
    }

    document.body.removeChild(downloadLink);
}