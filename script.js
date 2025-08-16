document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("progress") === null) {
        localStorage.setItem("progress", "1");
    }

    const progress = parseInt(localStorage.getItem("progress"), 10) || 1;

    for (let i = 1; i <= 4; i++) {
        const level = document.getElementById(`level${i}`);
        const lockIcon = level.querySelector(".lock-icon");

        if (i <= progress) {
            level.classList.remove("locked");
            if (lockIcon) lockIcon.textContent = "🔓";
            level.style.pointerEvents = "auto";
            level.addEventListener("click", () => {
                window.location.href = `mission${i}.html`;
            });
        } else {
            level.classList.add("locked");
            if (lockIcon) lockIcon.textContent = "🔒";
            level.style.pointerEvents = "none";
        }
    }
});
document.addEventListener("scroll", () => {
    document.querySelectorAll(".cloud").forEach(cloud => {
      const rect = cloud.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        cloud.classList.add("visible");
      }
    });
  });
  
window.resetProgress = () => {
    localStorage.setItem("progress", "1");
    location.reload();
};
(function () {
    const TOTAL_LEVELS = 4;
    const LATERAL_OFFSET = 190; // how far to the side of each level the dotted line runs
    const SMOOTHING = 1.0;      // curve softness (0.6–1.2 feels good)
  
    const pathEl = document.getElementById("journeyPath");
    const svgEl  = document.getElementById("lovePath");
    const angel  = document.getElementById("loveAngel");
    const levelsContainer = document.querySelector(".levels");
    const missionsSection = document.getElementById("missions");
  
    if (!pathEl || !svgEl || !angel || !levelsContainer || !missionsSection) return;
  
    function getProgress() {
      return parseInt(localStorage.getItem("progress"), 10) || 1;
    }
  
    // Get anchor point for each level, offset left/right near the clouds
    function computeWaypoints() {
      const rootBox = missionsSection.getBoundingClientRect();
      const points = [];
  
      for (let i = 1; i <= TOTAL_LEVELS; i++) {
        const lvl = document.getElementById(`level${i}`);
        if (!lvl) continue;
        const r = lvl.getBoundingClientRect();
  
        const centerX = (r.left + r.right) / 2 - rootBox.left;
        const centerY = (r.top + r.bottom) / 2 - rootBox.top;
  
        // odd levels (1,3) clouds are left; even (2,4) clouds are right
        const side = i % 2 === 1 ? -1 : 1;
        const x = centerX + side * (r.width / 2 + LATERAL_OFFSET);
        const y = centerY;
  
        points.push({ x, y });
      }
      return points;
    }
  
    // Catmull-Rom to Cubic Bezier converter (smooth curves through points)
    // C1 = P1 + (P2 - P0)/6 * s, C2 = P2 - (P3 - P1)/6 * s
    function buildSmoothPath(points, s = 1.0) {
      if (points.length === 0) return "";
      if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
      let d = `M ${points[0].x} ${points[0].y}`;
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i - 1] || points[i];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[i + 2] || p2;
  
        const c1x = p1.x + (p2.x - p0.x) / 6 * s;
        const c1y = p1.y + (p2.y - p0.y) / 6 * s;
        const c2x = p2.x - (p3.x - p1.x) / 6 * s;
        const c2y = p2.y - (p3.y - p1.y) / 6 * s;
  
        d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
      }
      return d;
    }
  
    function sizeSvgToSection() {
      // Match SVG viewBox to the missions section box
      const b = missionsSection.getBoundingClientRect();
      svgEl.setAttribute("viewBox", `0 0 ${b.width} ${b.height}`);
    }
  
    function drawPathAndAngel() {
      sizeSvgToSection();
  
      const pts = computeWaypoints();
      pathEl.setAttribute("d", buildSmoothPath(pts, SMOOTHING));
  
      const progress = getProgress();
      // Position angel along total path length according to progress:
      // L1 => 0%, L2 => 33%, L3 => 66%, L4 => 100%
      const len = pathEl.getTotalLength();
      const frac = (progress - 1) / (TOTAL_LEVELS - 1);
      const dist = len * frac;
  
      const p = pathEl.getPointAtLength(dist);
      angel.style.left = `${p.x - angel.offsetWidth / 2}px`;
      angel.style.top  = `${p.y - angel.offsetHeight / 2}px`;
  
      // Rotate to face toward next segment (or keep last heading)
      if (progress < TOTAL_LEVELS) {
        const pNext = pathEl.getPointAtLength(len * Math.min(1, frac + 1 / (TOTAL_LEVELS - 1)));
        const angle = Math.atan2(pNext.y - p.y, pNext.x - p.x) * 180 / Math.PI;
        angel.style.transform = `rotate(${angle}deg)`;
      }
    }
  
    // Redraw on load, resize, and when levels unlock (storage event)
    window.addEventListener("resize", () => {
      // debounce a bit
      clearTimeout(window.__pathResizeTO);
      window.__pathResizeTO = setTimeout(drawPathAndAngel, 80);
    });
  
    window.addEventListener("storage", (e) => {
      if (e.key === "progress") drawPathAndAngel();
    });
  
    // If your code updates progress locally, call drawPathAndAngel() afterward.
    drawPathAndAngel();
  })();
  