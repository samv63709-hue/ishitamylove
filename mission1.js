function startQuestions() {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('questions').style.display = 'block';
    document.getElementById('prize').style.display = 'none'; // ensure prize is hidden
}

function backToHome() {
    document.getElementById('intro').style.display = 'block';
    document.getElementById('questions').style.display = 'none';
    document.getElementById('prize').style.display = 'none';
}

function checkQ1() {
    let ans1 = document.getElementById('ans1').value.trim().toLowerCase();
    let validAnswers = [
        "drummond college", "drummond", 
        "dramand", "dramand college"
    ];

    if (validAnswers.includes(ans1)) {
        document.getElementById('q1').style.display = 'none';
        document.getElementById('q2').style.display = 'block';
    } else {
        alert("Oops! Try again 💕");
    }
}

function checkQ2() {
    let selected = document.querySelector('input[name="ans2"]:checked');
    if (!selected) {
        alert("Please select an option 💖");
        return;
    }

    let ans2 = selected.value.toLowerCase();
    if (ans2 === "seeing everything on repeat") {
        alert("🎉 Level 2 unlocked!");

        const current = parseInt(localStorage.getItem("progress"), 10) || 1;
        const desired = 2;
        if (desired > current) {
            localStorage.setItem("progress", String(desired));
        }

        document.getElementById('questions').style.display = 'none';
        document.getElementById('prize').style.display = 'block';
    } else {
        alert("Not quite! Think again 💖");
    }
}
// for (let i = 0; i < 150; i++) {
//     const heart = document.createElement("span");
//     heart.classList.add("heart");
//     heart.textContent = "❤";
//     heart.style.setProperty("--clr", colors[Math.floor(Math.random() * colors.length)]);
//     heart.style.setProperty("--rot", `${Math.floor(Math.random() * 20) - 10}deg`);
//     heart.style.left = `${Math.random() * 100}%`;
//     heart.style.bottom = `${Math.random() * 100}%`;
//     heart.style.fontSize = `${68  + Math.random() * 12}px`;
//     heartWave.appendChild(heart);
// }