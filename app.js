
let openingTime = "09:30"
let closingTime = "18:30"
let openHour = openingTime.split(":")[0]
let openMinute = openingTime.split(":")[1]
let closingHour = closingTime.split(":")[0]
let closingMinute = closingTime.split(":")[1]

document.addEventListener("DOMContentLoaded", function () {

    document.querySelector('.btn-primary[data-target="#bookingModal"]').addEventListener('click', function () {

        document.querySelector('#serviceName').value = this.getAttribute('data-service');
    });


    document.querySelector('#bookingModal .btn-primary').addEventListener('click', function () {

        if (validateBookingForm()) {
            submitBookingForm();
        }
    });


    function validateBookingForm() {
        let serviceName = document.querySelector('#serviceName').value;
        //let selectedDate = document.querySelector('#bookingDate').value;
        let selectedTime = document.querySelector('#bookingTime').value;
        let userName = document.querySelector('#userName').value;
        let userEmail = document.querySelector('#userEmail').value;

        // call all validations so they update ui
        validateName()
        validateDate()
        validateTime()

        if (serviceName && validateDate() && selectedTime && validateName() && userEmail) {
            return true;
        } else {
            alert('Please fill in all the required fields.');
            return false;
        }
    }


    function submitBookingForm() {

        let formData = {
            serviceName: document.querySelector('#serviceName').value,
            date: document.querySelector('#bookingDate').value,
            time: document.querySelector('#bookingTime').value,
            name: document.querySelector('#userName').value,
            email: document.querySelector('#userEmail').value,
        };

        console.log('Form submitted:', formData);


        $('#bookingModal').modal('hide');
    }
});


function validDate() {
    let currentDate = new Date()

    let currentMonth = currentDate.getMonth() + 1
    let currentDay = currentDate.getDate()


    if (currentMonth < 10) {
        currentMonth = `0${currentMonth}` // need to append a 0 to match date format if only 1 digit
    }

    if (currentDay < 10) {
        currentDay = `0${currentDay}` // need to append a 0 to match date format if only 1 digit
    }

    let earliestDate = `${currentDate.getFullYear()}-${currentMonth}-${currentDay}`
    let latestDate = `${currentDate.getFullYear() + 1}-${currentMonth}-${currentDay}` // can book upto 1 year ahead of time

    document.getElementById("bookingDate").setAttribute("min", earliestDate)
    document.getElementById("bookingDate").setAttribute("max", latestDate)

}

function validateDate() {
    let bookedDate = new Date(document.getElementById("bookingDate").value + "EST") // must be EST or else date is off by a day
    console.log(bookedDate)
    let currentDate = new Date()
    let message

    let feedback = document.createElement("div")

    feedback.setAttribute("class", "invalid-feedback")

    if (bookedDate == "Invalid Date") { // date will be an "Invalid Date" if date passed into date constructer is null/invalid. Also if date is invalid (ex april 31 2024)
        message = "Please enter a valid date"
    } else if (bookedDate < currentDate ) {
        message = "Cannot book for past date. Please book a date in the future"
    } else if (bookedDate > currentDate.setFullYear(currentDate.getFullYear()+1)) {
        message = "Please select a date within a year of today!"
    } else {
        feedback.setAttribute("class", "valid-feedback d-block")
        message = "Looks good!"
    }

    feedback.innerHTML = message

    if (document.getElementById("bookingDate").nextElementSibling == null) {
        document.getElementById("bookingDate").insertAdjacentElement('afterend', feedback)
    } else {
        document.getElementById("bookingDate").nextElementSibling.replaceWith(feedback)
    }
}


function validTime() {
    let currentDate = new Date()

    let currentHour = currentDate.getHours()
    let currentMinute = currentDate.getMinutes()

    let scheduledDate = document.getElementById("bookingDate").value
    console.log(scheduledDate)

    document.getElementById("bookingTime").setAttribute("min", openingTime)
    document.getElementById("bookingTime").setAttribute("max", closingTime)
}

function validateTime() {
    let bookedDate = new Date(document.getElementById("bookingDate").value + "EST")
    let feedback = document.createElement("div")

    let time = document.getElementById("bookingTime").value
    let splitTime = time.split(":")
    let message = "Looks good!"
    bookedDate.setHours(splitTime[0])
    bookedDate.setMinutes(splitTime[1])

    feedback.setAttribute("class", "valid-feedback")

    if (document.getElementById("bookingDate").value == "") {
        message = "Please enter a time"
        feedback.setAttribute("class", "invalid-feedback d-block")
    } else if (bookedDate.getHours() > openHour && bookedDate.getHours() < closingHour) {
        message = "Looks good!"
    } else if (bookedDate.getHours() === openHour && bookedDate.getMinutes() >= openMinute) { // if opening hour compare minutes also!
        message = "Looks good!"
    } else if (bookedDate.getHours() === closingHour && bookedDate.getMinutes() <= closingMinute) { // if closing hour compare minutes also!
        message = "Looks good!"
    } else {
        message = `Sorry we are closed at that hour :( Our hours are from ${openingTime} until ${closingTime}`
        feedback.setAttribute("class", "invalid-feedback d-block")
    }

    feedback.innerHTML = message

    if (document.getElementById("bookingTime").nextElementSibling == null) {
        document.getElementById("bookingTime").insertAdjacentElement('afterend', feedback)
    } else {
        document.getElementById("bookingTime").nextElementSibling.replaceWith(feedback)
    }
}

function validateName() {
    console.log("HERHERERER")
    //just check that only alphabetic characters
    let alphabetic = new RegExp("^[a-z A-Z]+$") // this regex makes sure only allowed characters are alphabetic and spaces. Also ensures at least 1 character long
    let name = document.getElementById("userName").value.trim()
    let message

    let feedback = document.createElement("div")
    feedback.setAttribute("class", "invalid-feedback")

    if (name.length === 0) {
        message = "Please enter a name"
    } else if (!alphabetic.test(name)) {
        message = "You can only enter alphabetic characters."
    } else {
        message = "Looks good!"
        feedback.setAttribute("class", "valid-feedback")
    }

    feedback.innerHTML = message

    console.log("h")
    if (document.getElementById("userName").nextElementSibling == null) {
        document.getElementById("userName").insertAdjacentElement('afterend', feedback)
    } else {
        document.getElementById("userName").nextElementSibling.replaceWith(feedback)
    }

    return alphabetic.test(name)
}

function validateEmail() {

}
