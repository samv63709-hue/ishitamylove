function startQuestions() {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('questions').style.display = 'block';
}

function checkQ1() {
    let selected = document.querySelector('input[name="ans2"]:checked');
    if (!selected) {
        alert("Please select an option 💖");
        return;
    }

    let ans2 = selected.value.toLowerCase();
    if (ans2 === "doing video call late night") {  // correct answer for Q2
        document.getElementById('q1').style.display = 'none';
        document.getElementById('q2').style.display = 'block';
    } else {
        alert("Not quite! Think again 💖");
    }
}

// Helper to set max progress
function unlockUpTo(level) {
    const current = parseInt(localStorage.getItem("progress"), 10) || 1;
    if (level > current) {
        localStorage.setItem("progress", String(level));
    }
}

function checkQ2() {
    let selected = document.querySelector('input[name="ans2"]:checked');
    if (!selected) {
        alert("Please select an option 💖");
        return;
    }

    let ans2 = selected.value.trim().toLowerCase();
    if (ans2 === "seeing everything on repeat") {  // correct answer
        unlockUpTo(999); // arbitrary high number to mean "all unlocked"

        alert("🎉 All levels unlocked!");
        document.getElementById('questions').style.display = 'none';
        document.getElementById('prize').style.display = 'block';
    } else {
        alert("maanu ga hi nhi , ye to sahi option choose karo 😂😂😂😂");
    }
}

const heartWave = document.querySelector(".heart-wave");
const colors = ["#ff4d88", "#ff80b3", "#ff99cc", "#ff3385", "#cc3399", "#ff66b3", "#b30059", "#d147a3"];

// for (let i = 0; i < 100; i++) {
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

