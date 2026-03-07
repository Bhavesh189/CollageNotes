let sem = document.getElementById('sem');

function semSelect() {
    let val = sem.value;
    if(val == "sem1") {
        return;
    }
    else {
        window.location.href = val + '.html';
        return;
    }
}

sem.addEventListener('change', semSelect);