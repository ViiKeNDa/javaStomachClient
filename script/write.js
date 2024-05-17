fetch("https://javastomachserver.onrender.com/doctor/read", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
})
    .then((response) => response.json())
    .then((json) => {
        let doctorsData = json;
        let select = document.querySelector(".list__doctors");

        doctorsData.forEach(function (doctor) {
            let option = document.createElement("option");
            option.text = doctor.username + " - " + doctor.speciality;
            option.value = doctor.id;
            select.appendChild(option);
        });
    });

document
    .getElementById("DoctorNameForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();
        let select = document.querySelector(".list__doctors");
        var selectedOption = select.options[select.selectedIndex];
        var optionValue = selectedOption.value;
        fetch(
            `https://javastomachserver.onrender.com/secured/doctor/add/${optionValue}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        ).then(() => {
            location.reload();
        });
    });
