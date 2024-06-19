export function getStepColors(color1, color2, steps) {
    // Regex to check if valid hex color
    const hexRegex = /^#?([A-Fa-f\d]{3}){1,2}$/;

    // Validate input colors
    if (!hexRegex.test(color1) || !hexRegex.test(color2)) {
        throw new Error(
            "Invalid color format. Please use hex code (e.g. #FF0000)"
        );
    }

    // Convert hex strings to RGB arrays
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);

    // Calculate step values for each color channel
    const stepR = (rgb2[0] - rgb1[0]) / (steps - 1);
    const stepG = (rgb2[1] - rgb1[1]) / (steps - 1);
    const stepB = (rgb2[2] - rgb1[2]) / (steps - 1);

    // Create an array to store step colors
    const colors = [];

    // Loop through steps and generate colors
    for (let i = 0; i < steps; i++) {
        const red = Math.round(rgb1[0] + stepR * i);
        const green = Math.round(rgb1[1] + stepG * i);
        const blue = Math.round(rgb1[2] + stepB * i);
        colors.push(`rgb(${red}, ${green}, ${blue})`);
    }

    return colors;
}

// Helper function to convert hex string to RGB array
function hexToRgb(hex) {
    const result = /^#?([A-Fa-f\d]{2})([A-Fa-f\d]{2})([A-Fa-f\d]{2})$/.exec(
        hex
    );

    return result
        ? [
              parseInt(result[1], 16),
              parseInt(result[2], 16),
              parseInt(result[3], 16),
          ]
        : null;
}

export function getEquiDistantNumbers(min, max, n) {
    if (n <= 0) {
        throw new Error("n must be a positive integer");
    }

    if (n === 1) {
        return [min + (max - min) / 2];
    }

    const spacing = (max - min) / (n - 1);
    const result = [];
    for (let i = 0; i < n; i++) {
        result.push(min + i * spacing);
    }

    return result;
}
