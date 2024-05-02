function validateForm(){
    const clientInput = document.getElementById('client');
    const carInput = document.getElementById('car');
    const dateFromInput = document.getElementById('dateFrom');
    const dateToInput = document.getElementById('dateTo');

    const errorClient = document.getElementById('errorClient');
    const errorCar = document.getElementById('errorCar');
    const errorDateFrom = document.getElementById('errorDateFrom');
    const errorDateTo = document.getElementById('errorDateTo');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([clientInput, carInput, dateFromInput, dateToInput], [errorClient, errorCar, errorDateFrom, errorDateTo], errorsSummary);

    let valid = true;

    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = '' + nowDate.getFullYear();
    
    if(month.length < 2)
        month = '0' + month;

    if(day.length < 2)
        day = '0' + day;
    
    const nowString = [year, month, day].join('-');
 

    if(!checkRequired(clientInput.value)){
        valid = false;
        clientInput.classList.add("error-input");
        errorClient.innerText = "Pole jest wymagane";
    }

    if(!checkRequired(carInput.value)){
        valid = false;
        carInput.classList.add("error-input");
        errorCar.innerText = "Pole jest wymagane";
    }

    if(!checkRequired(dateFromInput.value)){
        valid = false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText = "Pole jest wymagane";
    } else if(!checkDate(dateFromInput.value)){
        valid = false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText = "Pole powinno zawierać się w formacie yyyy-MM-dd (2000-01-01)";
    } else if(checkDateIfAfter(dateFromInput.value, nowString)){
        valid = false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText = "Data nie może byc z przyszlosci";
    } else if (checkRequired(dateToInput.value) && checkDate(dateToInput.value) && !checkDateIfAfter(dateToInput.value, dateFromInput.value)){
        valid = false;
        dateToInput.classList.add("error-input");
        errorDateTo.innerText = "Data do powinna byc pozniejsza niz data od"
    }

    if(!valid){
        errorsSummary.innerText = "Formularz zawiera błędy";
    }
}

function resetErrors(inputs, errorTexts, errorInfo){
    for(let i=0; i<inputs.length; i++){
        inputs[i].classList.remove("error-input");
    }
    for(let i=0; i<errorTexts.length; i++){
        errorTexts[i].innerText = "";
    }
    errorInfo.innerText = "";
}

function checkRequired(value){
    if(!value){
        return false;
    }
    value = value.toString().trim();
    if(value === ""){
        return false;
    }
    return true;
}

function checkTextLengthRange(value, min, max){
    if(!value){
        return false;
    }
    value = value.toString().trim();
    const length = value.length;
    if(max && length > max){
        return false;
    }
    if(min && length < min){
        return false;
    }
    return true;
}

function checkEmail(value){
    if(!value){
        return false;
    }
    value = value.toString().trim();
    const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return regex.test(value);
}

function checkPesel(value){
    if(!value){
        return false;
    }
    value = value.toString().trim();
    const regex = /^\d{11}$/;
    return regex.test(value);
}

function checkPhoneNumber(value){
    if(!value){
        return false;
    }
    value = value.toString().trim();
    const regex = /^\d{3}\-\d{3}\-\d{3}$/;
    return regex.test(value);
}

function checkNip(value){
    if(!value){
        return false;
    }
    value = value.toString().trim();
    const regex = /^\d{10}$/;
    return regex.test(value);
}

function checkRegistration(value){
    if(!value){
        return false;
    }
    value = value.toString().trim();
    const regex = /^([A-Z]{2}-*?[A-Z0-9]{5})|([A-Z]{3}-*?[A-Z0-9]{4})$/;
    return regex.test(value);
}

function checkNumberRange(value, min, max) {
    if (!value) {
        return false;
    }

    if (isNaN(value)) {
        return false;
    }

    value = parseFloat(value);
    if (value < min) {
        return false;
    }

    if (value > max) {
        return false;
    }

    return true;
}

function checkNumber(value) {
    if(!value){
        return false;
    }

    if (isNaN(value)) {
        return false;
    }

    return true;
}

function checkDate(value) {
    if (!value) {
        return false;
    }

    const pattern = /(\d{4})-(\d{2})-(\d{2})/
    return pattern.test(value);
}

function checkDateIfAfter(value, compareTo) {
    if (!value) {
        return false;
    }

    if (!compareTo) {
        return false;
    }

    const pattern = /(\d{4})-(\d{2})-(\d{2})/
    if (!pattern.test(value)) {
        return false;
    }

    if (!pattern.test(compareTo)) {
        return false;
    }

    const valueDate = new Date(value);
    const compareToDate = new Date(compareTo);
    if (valueDate.getTime() < compareToDate.getTime()) {
        return false;
    }
    return true;
}
