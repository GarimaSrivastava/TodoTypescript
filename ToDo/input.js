window.onload = function () {
    var btn = document.getElementById("add");
    var input = document.getElementById("input");
    var localstorage = JSON.parse(localStorage.getItem("key"));
    if (localstorage != null)
        displayTaskOuter();
    btn.onclick = function () {
        if (input.value.trim() !== "")
            addTaskOuter(input.value, false);
        input.value = "";
    };
};
