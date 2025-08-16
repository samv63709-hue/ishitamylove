function checkAnswer(missionNumber, correctAnswer, rewardContent) {
    const inputEl = document.getElementById("answer");
    const user = (inputEl?.value || "").trim().toLowerCase();

    if (user === correctAnswer.toLowerCase()) {
        const rewardBox = document.getElementById("reward-box");
        rewardBox.innerHTML = rewardContent;
        rewardBox.style.display = "block";

        const current = parseInt(localStorage.getItem("progress"), 10) || 1;
        const desired = missionNumber + 1;
        if (desired > current) {
            localStorage.setItem("progress", String(desired));
        }

        if (inputEl) inputEl.style.display = "none";
        const btn = document.querySelector("button");
        if (btn) btn.style.display = "none";

        const backBtn = document.createElement("button");
        backBtn.textContent = "Return to Love Cycle ❤️";
        backBtn.onclick = () => (window.location.href = "index.html");
        rewardBox.appendChild(document.createElement("br"));
        rewardBox.appendChild(backBtn);
    } else {
        alert("❌ Wrong answer, try again!");
    }
}
