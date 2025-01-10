document.addEventListener('DOMContentLoaded', () => {
    const colorWheel = document.getElementById('colorWheel');
    const redSlider = document.getElementById('redSlider');
    const greenSlider = document.getElementById('greenSlider');
    const blueSlider = document.getElementById('blueSlider');
    const colorPreview = document.getElementById('colorPreview');
    const hexValue = document.getElementById('hexValue');
    const rgbValue = document.getElementById('rgbValue');
    const copyHex = document.getElementById('copyHex');
    
    // Update color values and preview
    function updateColor() {
        const red = redSlider.value;
        const green = greenSlider.value;
        const blue = blueSlider.value;
        
        const color = `rgb(${red}, ${green}, ${blue})`;
        const hex = rgbToHex(parseInt(red), parseInt(green), parseInt(blue));
        
        colorPreview.style.backgroundColor = color;
        document.body.style.backgroundColor = color;
        hexValue.value = hex;
        rgbValue.value = color;
        colorWheel.value = hex;
        
        // Update value displays
        document.getElementById('redValue').textContent = red;
        document.getElementById('greenValue').textContent = green;
        document.getElementById('blueValue').textContent = blue;
    }
    
    // Convert RGB to HEX
    function rgbToHex(r, g, b) {
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('').toUpperCase();
    }
    
    // Convert HEX to RGB
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    
    // Event listeners
    colorWheel.addEventListener('input', (e) => {
        const rgb = hexToRgb(e.target.value);
        redSlider.value = rgb.r;
        greenSlider.value = rgb.g;
        blueSlider.value = rgb.b;
        updateColor();
    });
    
    [redSlider, greenSlider, blueSlider].forEach(slider => {
        slider.addEventListener('input', updateColor);
    });
    
    // Copy HEX value to clipboard
    copyHex.addEventListener('click', () => {
        hexValue.select();
        document.execCommand('copy');
        copyHex.textContent = 'Copied!';
        setTimeout(() => {
            copyHex.textContent = 'Copy';
        }, 1500);
    });
    
    // Initial color update
    updateColor();
}); 