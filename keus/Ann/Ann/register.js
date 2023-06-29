var months = [
    "January",
    "Febury",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "Octber",
    "november",
    "December"
];

var weekdays = [
    "Sunday",
    "Monday",
    "Tuesdayt",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

var weekdays_abr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

Number.prototype.pad = function(num) {
    var str = "";
    for (var i = 0; i < num - this.toString().length; i++) str += "0";
    return (str += this.toString());
};

function calender(widget, data) {
    var original = widget.getElementsByClassName("active")[0];

    if (typeof original === "undefined") {
        original = document.createElement("table");
        original.setAttribute(
            "data-actual",
            data.getFullYear() +
            "/" +
            data.getMonth().pad(2) +
            "/" +
            data.getDate().pad(2)
        );
        widget.appendChild(original);
    }

    var diff = data - new Date(original.getAttribute("data-actual"));

    diff = new Date(diff).getMonth();

    var e = document.createElement("table");

    e.className = diff === 0 ? "amagat-esquerra" : "amagat-dreta";
    e.innerHTML = "";

    widget.appendChild(e);

    e.setAttribute(
        "data-actual",
        data.getFullYear() +
        "/" +
        data.getMonth().pad(2) +
        "/" +
        data.getDate().pad(2)
    );

    var row = document.createElement("tr");
    var tabel_head = document.createElement("th");
    tabel_head.setAttribute("colspan", 7);

    var button_prev = document.createElement("button");
    button_prev.className = "button-prev";
    button_prev.innerHTML = "&#9666;";

    var button_next = document.createElement("button");
    button_next.className = "button-next";
    button_next.innerHTML = "&#9656;";

    tabel_head.appendChild(button_prev);
    tabel_head.appendChild(document.createElement("span")).innerHTML =
        months[data.getMonth()] +
        '<span class="any">' +
        data.getFullYear() +
        "</span>";

    tabel_head.appendChild(button_next);

    button_prev.onclick = function() {
        data.setMonth(data.getMonth() - 1);
        calender(widget, data);
    };

    button_next.onclick = function() {
        data.setMonth(data.getMonth() + 1);
        calender(widget, data);
    };

    row.appendChild(tabel_head);
    e.appendChild(row);

    row = document.createElement("tr");

    for (var i = 1; i < 7; i++) {
        row.innerHTML += "<th>" + weekdays_abr[i] + "</th>";
    }

    row.innerHTML += "<th>" + weekdays_abr[0] + "</th>";
    e.appendChild(row);

    var intial_date = new Date(data.getFullYear(), data.getMonth(), -1).getDay();

    var actual = new Date(data.getFullYear(), data.getMonth(), -intial_date);


    for (var s = 0; s < 6; s++) {
        var row = document.createElement("tr");

        for (var d = 1; d < 8; d++) {
            var cela = document.createElement("td");
            var span = document.createElement("span");

            cela.appendChild(span);

            span.innerHTML = actual.getDate();

            if (actual.getMonth() !== data.getMonth()) cela.className = "fora";

            if (
                data.getDate() == actual.getDate() &&
                data.getMonth() == actual.getMonth()
            )
                cela.className = "avui";

            actual.setDate(actual.getDate() + 1);
            row.appendChild(cela);
        }

        e.appendChild(row);
    }

    setTimeout(function() {
        e.className = "active";
        original.className += diff === 0 ? " amagat-dreta" : " amagat-esquerra";
    }, 20);

    original.className = "inactive";

    setTimeout(function() {
        var inactives = document.getElementsByClassName("inactive");
        for (var i = 0; i < inactives.length; i++) widget.removeChild(inactives[i]);
    }, 1000);
}

calender(document.getElementById("calender"), new Date());