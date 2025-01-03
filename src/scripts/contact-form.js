// this file define functions for handle contact form submission

const contactForm = document.getElementById('contact-form');

const emptyValidations = {
    name: (value) => value.trim() !== '',
    email: (value) => value.trim() !== '' && value.includes('@'),
    message: (value) => value.trim() !== '',
};

const dataIsValid = (name, value, validations) => {
    return validations[name](value);
};

const formIsValid = (form, validations) => {
    let isValid = true;
    const data = Object.fromEntries(new FormData(form));
    console.log({ form, data });

    Object.keys(validations).forEach((name) => {
        if (!dataIsValid(name, data[name], validations)) {
            isValid = false;
        }
    });

    return isValid;
};

const getFlagedErrors = (form, validations) => {
    const data = Object.fromEntries(new FormData(form));

    const errors = {};

    Object.keys(data).forEach((name) => {
        if (!dataIsValid(name, data[name], validations)) {
            errors[name] = true;
        } else {
            errors[name] = false;
        }
    });

    return errors;
};

const showErrors = (errors) => {
    Object.keys(errors).forEach((name) => {
        const errorContainer = document.getElementById(`${name}-error`);
        const inputContainer = contactForm.querySelector(`[name=${name}]`);
        if (errors[name]) {
            errorContainer.classList.replace('util--hidden', 'util--visible');
            inputContainer.classList.add('input-text--error');
        } else {
            errorContainer.classList.replace('util--visible', 'util--hidden');
            inputContainer.classList.remove('input-text--error');
        }
    });
};

const renderSuccess = (form) => {
    const data = Object.fromEntries(new FormData(form));

    Object.keys(data).forEach((name) => {
        const inputContainer = contactForm.querySelector(`[name=${name}]`);
        const errorContainer = document.getElementById(`${name}-error`);
        inputContainer.classList.remove('input-text--error');
        inputContainer.value = '';
        errorContainer.classList.replace('util--visible', 'util--hidden');
    });
}

const handleSubmit = (e) => {
    e.preventDefault();

    if (formIsValid(e.currentTarget, emptyValidations)) {
        // clearSuccess function
        renderSuccess(e.currentTarget);
    } else {
        // show validation errors
        const errors = getFlagedErrors(e.currentTarget, emptyValidations);
        showErrors(errors);
    }
}

contactForm.addEventListener('submit', handleSubmit);
