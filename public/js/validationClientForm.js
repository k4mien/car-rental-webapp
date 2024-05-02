function validateForm() {
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const peselInput = document.getElementById('pesel');
    const emailInput = document.getElementById('email');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const companyNameInput = document.getElementById('companyName');
    const nipInput = document.getElementById('nip');

    const errorFirstName = document.getElementById('errorFirstName');
    const errorLastName = document.getElementById('errorLastName');
    const errorPesel = document.getElementById('errorPesel');
    const errorEmail = document.getElementById('errorEmail');
    const errorPhoneNumber = document.getElementById('errorPhoneNumber');
    const errorCompanyName = document.getElementById('errorCompanyName');
    const errorNip = document.getElementById('errorNip');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([firstNameInput, lastNameInput, peselInput, emailInput, phoneNumberInput, companyNameInput, nipInput], [errorFirstName, errorLastName, errorPesel, errorEmail, errorPhoneNumber, errorCompanyName, errorNip], errorsSummary);

    let valid = true;

    if(!checkRequired(firstNameInput.value)){
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole jest wymagane";
    } else if(!checkTextLengthRange(firstNameInput.value, 2, 60)){
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if(!checkRequired(lastNameInput.value)){
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole jest wymagane";
    } else if(!checkTextLengthRange(lastNameInput.value, 2, 60)){
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if(!checkRequired(peselInput.value)){
        valid = false;
        peselInput.classList.add("error-input");
        errorPesel.innerText = "Pole jest wymagane";
    } else if(!checkPesel(peselInput.value)){
        valid = false;
        peselInput.classList.add("error-input");
        errorPesel.innerText = "Pole powinno zawierać poprawny numer pesel (11 cyfr)";
    }

    if(!checkRequired(emailInput.value)){
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Pole jest wymagane";
    } else if(!checkTextLengthRange(emailInput.value, 5, 60)){
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Pole powinno zawierać od 5 do 60 znaków";
    } else if(!checkEmail(emailInput.value)){
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Pole powinno zawierać prawidłowy adres email";
    }

    if(!checkRequired(phoneNumberInput.value)){
        valid = false;
        phoneNumberInput.classList.add("error-input");
        errorPhoneNumber.innerText = "Pole jest wymagane";
    } else if(!checkPhoneNumber(phoneNumberInput.value)){
        valid = false;
        phoneNumberInput.classList.add("error-input");
        errorPhoneNumber.innerText = "Zły format, prawidłowy format to: 111-222-333";
    }

    if(companyNameInput.value != "" && !checkTextLengthRange(companyNameInput.value, 1, 60)){
        valid = false;
        companyNameInput.classList.add("error-input");
        errorCompanyName.innexText = "Pole powinno zawierać od 1 do 60 znaków";
    }

    if(nipInput.value != "" && !checkNip(nipInput.value)){
        valid = false;
        nipInput.classList.add("error-input");
        errorNip.innerText = "Pole powinno zawierać prawidłowy numer NIP (10 cyfr)";
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
