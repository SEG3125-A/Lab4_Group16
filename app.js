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
        let selectedDate = document.querySelector('#bookingDate').value;
        let selectedTime = document.querySelector('#bookingTime').value;
        let userName = document.querySelector('#userName').value;
        let userEmail = document.querySelector('#userEmail').value;


        if (serviceName && selectedDate && selectedTime && userName && userEmail) {
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
