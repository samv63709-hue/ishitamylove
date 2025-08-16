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
    if (ans2 === "seeing everything on repeat") {  // correct answer for Q2
        document.getElementById('q1').style.display = 'none';
        document.getElementById('q2').style.display = 'block';
    } else {
        alert("Not quite! Think again 💖");
    }
}

// Reusable helper: move progress forward (never backwards)
function unlockUpTo(level) {
    const current = parseInt(localStorage.getItem("progress"), 10) || 1;
    if (level > current) {
      localStorage.setItem("progress", String(level));
    }
  }
  
  function checkQ2() {
    const selected = document.querySelector('input[name="ans2"]:checked');
    if (!selected) {
      alert("Please select an option 💖");
      return;
    }
  
    const ans2 = selected.value.trim().toLowerCase();
    if (ans2 === "skydiving") { // correct answer
      unlockUpTo(4); // 🔓 unlock levels up to Level 4
  
      alert("🎉 Level 4 unlocked!");
      document.getElementById('questions').style.display = 'none';
      document.getElementById('prize').style.display = 'block';
    } else {
      alert("Not quite! Think again 💖");
    }
  }




const heartWave = document.querySelector(".heart-wave");
const colors = ["#ff4d88", "#ff80b3", "#ff99cc", "#ff3385", "#cc3399", "#ff66b3", "#b30059", "#d147a3"];

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

