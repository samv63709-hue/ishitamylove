document.addEventListener("DOMContentLoaded", () => {
  const svg = document.getElementById("snakePathSVG");
  const angel = document.getElementById("loveAngel");

  // Get level elements
  const levels = [
    document.getElementById("level1"),
    document.getElementById("level2"),
    document.getElementById("level3"),
    document.getElementById("level4"),
  ];

  // Build snake path
  const svgNS = "http://www.w3.org/2000/svg";
  const path = document.createElementNS(svgNS, "path");
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", "pink");
  path.setAttribute("stroke-width", "4");
  path.setAttribute("stroke-dasharray", "12,12");
  path.setAttribute("stroke-linecap", "round");

  let d = "";
  levels.forEach((level, i) => {
    const rect = level.getBoundingClientRect();
    const containerRect = svg.getBoundingClientRect();

    // Center position of each level box
    const x = rect.left + rect.width / 2 - containerRect.left;
    const y = rect.top + rect.height / 2 - containerRect.top;

    if (i === 0) {
      d += `M ${x} ${y} `;
    } else {
      // Snake-like curve: alternate left/right offsets
      const offsetX = (i % 2 === 0 ? 100 : -100);
      const prevRect = levels[i - 1].getBoundingClientRect();
      const prevX = prevRect.left + prevRect.width / 2 - containerRect.left;
      const prevY = prevRect.top + prevRect.height / 2 - containerRect.top;

      d += `C ${prevX + offsetX} ${prevY + 50}, ${x - offsetX} ${y - 50}, ${x} ${y} `;
    }
  });

  path.setAttribute("d", d);
  svg.appendChild(path);

  // Place angel based on progress
  const progress = parseInt(localStorage.getItem("progress") || "1", 10);
  const totalLevels = levels.length;
  const pathLength = path.getTotalLength();
  const pointAt = (progress - 1) / (totalLevels - 1);

  const point = path.getPointAtLength(pointAt * pathLength);
  angel.style.left = `${point.x - angel.width / 2}px`;
  angel.style.top = `${point.y - angel.height / 2}px`;

  // Rotate toward next level
  const nextPoint = path.getPointAtLength(
    Math.min((pointAt + 0.01) * pathLength, pathLength)
  );
  const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);
  angel.style.transform = `rotate(${angle}deg)`;
});
