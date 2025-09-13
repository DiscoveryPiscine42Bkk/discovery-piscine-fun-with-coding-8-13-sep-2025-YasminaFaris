$(document).ready(function() {
    const saved = getCookie("todoList");
    if (saved) {
        const items = JSON.parse(saved);
        items.forEach(text => addTask(text, false));
    }

    $("#newBtn").click(function() {
        const task = prompt("Enter a new TO DO:");
        if (task && task.trim() !== "") {
            addTask(task.trim(), true);
        }
    });

    function addTask(text, save = true) {
        const $div = $("<div>").text(text);

        $div.click(function() {
            if (confirm("Do you want to remove this TO DO?")) {
                $div.remove();
                saveTasks();
            }
        });

        $("#ft_list").prepend($div);

        if (save) saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        $("#ft_list div").each(function() {
            tasks.push($(this).text());
        });
        setCookie("todoList", JSON.stringify(tasks), 7);
    }

    function setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + (days*24*60*60*1000));
        document.cookie = name + "=" + encodeURIComponent(value) +
                          ";expires=" + d.toUTCString() + ";path=/";
    }

    function getCookie(name) {
        const cookies = document.cookie.split("; ");
        for (let c of cookies) {
            const [key, val] = c.split("=");
            if (key === name) return decodeURIComponent(val);
        }
        return null;
    }
});
