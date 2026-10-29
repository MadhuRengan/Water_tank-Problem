# Water Tank Problem

A simple web application built using **HTML, CSS, and Vanilla JavaScript** to calculate and visualize the amount of rainwater trapped between blocks of different heights.

## Features
- Accepts block heights as user input.
- Calculates total trapped water.
- Visualizes blocks and water using SVG.
- Uses an efficient O(n) algorithm.

## Example

**Input:**
```text
[0,4,0,0,0,6,0,6,4,0]
```

**Output:**
```text
Total Water Trapped: 18 Units
```

## How to Run

1. Clone or download the repository.
2. Open `index.html` in any web browser.
3. Enter block heights separated by commas and click **Calculate**.

## Tech Stack

HTML | CSS | JavaScript | SVG

## Algorithm

Uses the **Prefix and Suffix Maximum** approach to calculate trapped water at each position.

- **Time Complexity:** O(n)
- **Space Complexity:** O(n)
