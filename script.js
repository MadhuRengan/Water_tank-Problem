
const form = document.getElementById('tank-form');
const input = document.getElementById('heights');
const error = document.getElementById('error');
const total = document.getElementById('total');
const visualization = document.getElementById('visualization');

function calculateWater(heights) {
  const n = heights.length;
  const leftMax = Array(n).fill(0);
  const rightMax = Array(n).fill(0);
  const water = Array(n).fill(0);

  if (n === 0) return { total: 0, water };

  leftMax[0] = heights[0];

  for (let i = 1; i < n; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], heights[i]);
  }

  rightMax[n - 1] = heights[n - 1];

  for (let i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], heights[i]);
  }

  let sum = 0;

  for (let i = 0; i < n; i++) {
    water[i] = Math.min(leftMax[i], rightMax[i]) - heights[i];
    sum += water[i];
  }

  return { total: sum, water };
}

function render(heights, water) {
  const cell = 30;
  const maxHeight = Math.max(
    1,
    ...heights.map((h, i) => h + water[i])
  );

  const width = heights.length * cell + 20;
  const height = maxHeight * cell + 45;

  const parts = [
    `<svg xmlns="http://www.w3.org/2000/svg"
      width="${width}" height="${height}"
      viewBox="0 0 ${width} ${height}"
      role="img"
      aria-label="Block and trapped water visualization">`
  ];

  heights.forEach((block, i) => {
    const x = 10 + i * cell;

    for (let level = 0; level < block + water[i]; level++) {
      const y = 10 + (maxHeight - level - 1) * cell;
      const color = level < block ? '#64748b' : '#38bdf8';

      parts.push(
        `<rect x="${x}" y="${y}"
          width="${cell - 2}" height="${cell - 2}"
          rx="2" fill="${color}"/>`
      );
    }

    parts.push(
      `<text x="${x + (cell - 2) / 2}"
        y="${height - 10}" font-size="12"
        text-anchor="middle" fill="#334155">${block}</text>`
    );
  });

  parts.push('</svg>');
  visualization.innerHTML = parts.join('');
}

form.addEventListener('submit', event => {
  event.preventDefault();

  const values = input.value
    .split(',')
    .map(value => value.trim());

  if (
    !values.length ||
    values.some(value =>
      !/^\d+$/.test(value) ||
      !Number.isSafeInteger(Number(value))
    )
  ) {
    error.textContent =
      'Enter non-negative whole numbers separated by commas.';
    return;
  }

  const heights = values.map(Number);
  const result = calculateWater(heights);

  if (!Number.isSafeInteger(result.total)) {
    error.textContent = 'Please use smaller heights.';
    return;
  }

  error.textContent = '';
  total.textContent = result.total;

  render(heights, result.water);
});

form.requestSubmit();
