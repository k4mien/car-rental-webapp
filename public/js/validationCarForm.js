function validateForm(){
    const brandNameInput = document.getElementById('brandName');
    const modelInput = document.getElementById('model');
    const registrationInput = document.getElementById('registration');
    const insuranceInput = document.getElementById('insurance');
    const inspectionInput = document.getElementById('inspection');
    const descriptionInput = document.getElementById('description');
    
    const errorBrandName = document.getElementById('errorBrandName');
    const errorModel = document.getElementById('errorModel');
    const errorRegistration = document.getElementById('errorRegistration');
    const errorInsurance = document.getElementById('errorInsurance');
    const errorInspection = document.getElementById('errorInspection');
    const errorDescription = document.getElementById('errorDescription');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([brandNameInput, modelInput, registrationInput, insuranceInput, inspectionInput, descriptionInput], [errorBrandName, errorModel, errorRegistration, errorInsurance, errorInspection, errorDescription], errorsSummary);

    let valid = true;

    if(!checkRequired(brandNameInput.value)){
        valid = false;
        brandNameInput.classList.add("error-input");
        errorBrandName.innerText = "Pole jest wymagane";
    } else if(!checkTextLengthRange(brandNameInput.value, 2, 20)){
        valid = false;
        brandNameInput.classList.add("error-input");
        errorBrandName.innerText = "Pole powinno zawierać od 2 do 20 znaków";
    }

    if(!checkRequired(modelInput.value)){
        valid = false;
        modelInput.classList.add("error-input");
        errorModel.innerText = "Pole jest wymagane";
    } else if(!checkTextLengthRange(modelInput.value, 2, 20)){
        valid = false;
        modelInput.classList.add("error-input");
        errorModel.innerText = "Pole powinno zawierać od 2 do 20 znaków";
    }

    if(!checkRequired(registrationInput.value)){
        valid = false;
        registrationInput.classList.add("error-input");
        errorRegistration.innerText = "Pole jest wymagane";
    } else if(!checkRegistration(registrationInput.value)){
        valid = false;
        registrationInput.classList.add("error-input");
        errorRegistration.innerText = "Rejestracja powinna mieć format WF-12345 albo WFF-1234";
    }

    //insurance/inspection

    if(descriptionInput.value != "" && !checkTextLengthRange(descriptionInput.value, 1, 1000)){
        valid = false;
        descriptionInput.classList.add("error-input");
        errorDescription.innerText = "Pole powinno zawierać do 1000 znaków";
    }

    if(!valid){
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;

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