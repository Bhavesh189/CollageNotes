const login = [
    { username: "bhavesh", password: "bhavesh" }
];
const form = document.querySelector(".login");
const user = document.getElementById("user");
const pass = document.getElementById("pass");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const u = user.value.toLowerCase();
    const p = pass.value.toLowerCase();
    const valid = login.find(item => item.username === u && item.password === p);
    if (valid) {
        localStorage.setItem("isLoggedIn", "true"); 
        window.location.href = "index.html";
    } else {
        alert("Wrong id pass");
    }
});