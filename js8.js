function formShow() {
    $(".window").show();
    window.history.pushState({ "isActive": true }, "", "#form");
    $(".wrapper").addClass("modal-opened");
    $(".background").addClass("blur");
}

function formHide() {
    $(".window").hide();
    window.history.pushState({ "isActive": false }, "", "exercise8.html");
    $(".wrapper").removeClass("modal-opened");
    $(".background").removeClass("blur");
}

$(document).ready(function () {

    $(document).mouseup(function (e) {
        if (!$(".window").is(e.target) && $(".window").has(e.target).length === 0) {
            formHide();
        }
    });

    $("#check").change(function () {
        if ($("#check").is(":checked")) {
            $("#submitButton").prop("disabled", false);
        } else {
            $("#submitButton").prop("disabled", true);
        }
    });

    let data = document.querySelectorAll(".info");
    data.forEach(function (element) {
        element.value = localStorage.getItem(element.name);
        element.addEventListener("blur", function (event) {
            localStorage.setItem(event.target.name, event.target.value);
        });
    });

    window.addEventListener("popstate", function (event) {
        if (event.state.isActive) {
            formShow();
        } else {
            formHide();
        }
    });

    const ajaxSend = (formData) => {
        fetch("https://formcarry.com/s/EzbPKuFdyzV", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(function (response) {
                alert("Сообщение отправлено");
                data.forEach((element) => { element.value = ""; });
                $("#check").prop("checked", false);
                $("#submitButton").prop("disabled", true);
                localStorage.clear();
            })
            .catch((error) => {alert(error);})
    };

    const forms = $("#thatForm");
    for (let i = 0; i < forms.length; i++) {
        forms[i].addEventListener("submit", function (e) {
            e.preventDefault();

            let formData = new FormData(this);
            formData = Object.fromEntries(formData);

            ajaxSend(formData);
        });
    };

});