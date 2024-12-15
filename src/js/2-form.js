// 01 // Оголоси поза будь-якими функціями об’єкт formData з полями email та message, які спочатку мають порожні рядки як значення: { email: "", message: "" }.
// 02 //Використовуй метод делегування для відстеження змін у формі через подію input. Зберігай актуальні дані з полів email та message у formData та записуй цей об’єкт у локальне сховище. Використовуй ключ "feedback-form-state" для зберігання даних у сховищі.
// 03 // При завантаженні сторінки перевір, чи є дані у локальному сховищі. Якщо так, використовуй їх для заповнення форми та об'єкта formData. Якщо ні, залиш поля форми порожніми.
// 04 // Перед відправленням форми переконайся, що обидва поля форми заповнені. Якщо будь-яке з полів (властивостей об’єкта formData) порожнє, показуй сповіщення з текстом «Fill please all fields». Якщо всі поля заповнені, виведи у консоль об’єкт formData з актуальними значеннями, очисти локальне сховище, об’єкт formData і поля форми.

// Default values
const formData = {
    email: "",
    message: "",
}

// Find form
const form = document.querySelector(".feedback-form");

// Check localStorage for saved data
const fillFormFields = () => {
    try {
        const formValuesLS = JSON.parse(localStorage.getItem("feedback-form-state"));

        if (formValuesLS === null) {
            return;
        }

        // Update values one by one (easy one)
        // formData.email = formValuesLS.email;
        // formData.message = formValuesLS.message;
        // form.email.value = formValuesLS.email;
        // form.message.value = formValuesLS.message;

        // Update all in cycle (better one)
        const formLocalStorageKeys = Object.keys(formValuesLS);
        formLocalStorageKeys.forEach(key => {
            form.elements[key].value = formValuesLS[key];
            formData[key] = formValuesLS[key];
        })

    } catch (err) {
        console.log(err);
    }
    
}

fillFormFields();

// Save input values to formData
const onFormFieldInput = event => {
    const { target: formField } = event;

    const fieldName = formField.name;
    const fieldValue = formField.value;

    formData[fieldName] = fieldValue;
    localStorage.setItem("feedback-form-state", JSON.stringify(formData))

}

// Submit listener
const formSubmit = form.addEventListener("submit", event => {
    event.preventDefault();
    const emailValue = form.email.value;
    const messageValue = form.message.value;
    console.log(messageValue)
    if ((messageValue && emailValue) == "") {
        alert('Fill please all fields')
        return
    }
    console.log(formData)
    localStorage.removeItem("feedback-form-state")
    form.email.value = "";
    form.message.value = "";

})
// Input listener
form.addEventListener("input", onFormFieldInput)