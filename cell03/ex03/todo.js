const list = document.getElementById("ft_list");
const newBtn = document.getElementById("newBtn");

window.onload = function () {
    const saved = getCookie("todoList");
    if (saved) {
        const items = JSON.parse(saved); //string to array
        items.forEach(text => {
            addTask(text, false);
        });
    }
};

newBtn.addEventListener("click", () => {
    const task = prompt("Enter a new TO DO:");
    if (task && task.trim() !== "") {
        addTask(task.trim(), true);
    }
});

function addTask(text, save = true) {
    const div = document.createElement("div");
    div.textContent = text;

    div.addEventListener("click", () => {
        if (confirm("Do you want to remove this TO DO?")) {
            div.remove();
            saveTasks();
        }
    });

    list.insertBefore(div, list.firstChild);

    if (save) {
        saveTasks();
    }
}

function saveTasks() {
    const tasks = [];
    list.querySelectorAll("div").forEach(div => tasks.push(div.textContent));
    setCookie("todoList", JSON.stringify(tasks), 7);
}

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + d.toUTCString() + ";path=/";
}

function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let c of cookies) {
        const [key, val] = c.split("=");
        if (key === name) return decodeURIComponent(val);
    }
    return null;
}
