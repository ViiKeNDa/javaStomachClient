let select = document.querySelector(".myDoctors");

const token = localStorage.getItem("token");
if (!token) {
    console.error("Token not found in localStorage");
} else {
    fetch("https://javastomachserver.onrender.com/secured/doctors", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log("");
            json.forEach((doctor) => {
                let option = document.createElement("option");
                option.textContent = `${doctor.username} - ${doctor.speciality}`;

                let button = document.createElement("button");
                button.textContent = "удалить";
                button.addEventListener("click", () => {
                    sendPostRequest(doctor.id);
                });

                let div = document.createElement("div");
                div.appendChild(option);
                div.appendChild(button);

                select.appendChild(div);
            });
        });
}

function sendPostRequest(doctorId) {
    const token = localStorage.getItem("token");

    fetch(
        `https://javastomachserver.onrender.com/secured/doctor/remove/${doctorId}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    ).then(() => location.reload());
}
