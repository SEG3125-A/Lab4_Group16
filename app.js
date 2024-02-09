document.addEventListener("DOMContentLoaded", function () {

    document.querySelectorAll('.btn-primary[data-target="#bookingModal"]').forEach(function (button) {
        button.addEventListener('click', function () {
            document.querySelector('#serviceName').value = this.getAttribute('data-service');
            document.querySelector('#barberName').value = this.getAttribute('data-barber');
            var isHaircutStyle = this.getAttribute('data-service').includes('Haircut');
            $('#serviceName').prop('readonly', isHaircutStyle);
        });
    });

    document.querySelector('#bookingModal .btn-primary').addEventListener('click', function () {
        if (validateBookingForm()) {
            submitBookingForm();
        }
    });

    function validateBookingForm() {
        let barberName = document.querySelector('#barberName').value;
        let serviceName = document.querySelector('#serviceName').value;
        let selectedDate = document.querySelector('#bookingDate').value;
        let selectedTime = document.querySelector('#bookingTime').value;
        let userName = document.querySelector('#userName').value;
        let userEmail = document.querySelector('#userEmail').value;

        if (barberName && serviceName && selectedDate && selectedTime && userName && userEmail) {
            return true;
        } else {
            alert('Please fill in all the required fields.');
            return false;
        }
    }

    function submitBookingForm() {
        let formData = {
            barberName: document.querySelector('#barberName').value,
            serviceName: document.querySelector('#serviceName').value,
            date: document.querySelector('#bookingDate').value,
            time: document.querySelector('#bookingTime').value,
            name: document.querySelector('#userName').value,
            email: document.querySelector('#userEmail').value,
        };

        console.log('Form submitted:', formData);

        $('#bookingModal').modal('hide');
    }

    $('[data-target="#bookingModal"]').on('click', function () {
        var serviceName = $(this).data('service');
        $('#serviceName').val(serviceName);

        var barberName = $(this).data('barber');
        $('#barberName').val(barberName);

        var isHaircutStyle = serviceName.includes('Haircut');
        $('#serviceName').prop('readonly', isHaircutStyle);

        var isBarberName = barberName.includes('Barber');
        $('#barberName').prop('readonly', isBarberName);

        var isStaffSection = $(this).closest('#staff').length > 0;

        if (isStaffSection) {
            $('#serviceDropdownGroup').show();
            $('#serviceNameInputGroup').hide();
        } else {
            $('#serviceDropdownGroup').hide();
            $('#serviceNameInputGroup').show();
        }
    });

});

