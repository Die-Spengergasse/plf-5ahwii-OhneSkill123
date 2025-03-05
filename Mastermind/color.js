"use strict";

// Klasse für EINEN STECKER (PEG)
class Color {
    obj = undefined;
    currentValue = undefined;
    visible = undefined;
    isUpdated = undefined;
    domObj = null;

    static rgbValues = [
    "#ff3333", // Rot
    "#ff9900", // Orange
    "#ffdd00", // Gelb
    "#66cccc", // Türkis/Mintgrün
    "#6699cc", // Hellblau
    "#cc66cc", // Lila/Violett
];

    
    static getRGB(i) {
        return this.rgbValues[i % this.rgbValues.length];
    }

    constructor(parent, num) {
        this.obj = parent;
        this.currentValue = 0;
        this.visible = true;
        this.isUpdated = false;
        this.domObj = document.createElement("div");
        this.domObj.obj = this;
        this.domObj.classList.add("circle");
        this.domObj.classList.add("peg");
        this.domObj.classList.add(`s${num}`);
        this.domObj.addEventListener("click", (e) => {
            e.target.obj.rotate();
        });
    }

    updateDisplay(visible = true) {
    this.visible = visible;
    if (visible) {
        const color = Color.getRGB(this.currentValue);
        this.domObj.style.backgroundColor = color;
        this.domObj.style.boxShadow = `inset -3px -3px 5px rgba(0,0,0,0.4), inset 3px 3px 5px rgba(255,255,255,0.3), 2px 2px 3px rgba(0,0,0,0.2)`;
    } else {
        this.domObj.style.backgroundColor = "#74503a";
        this.domObj.style.boxShadow = "inset -2px -2px 5px rgba(0,0,0,0.4), inset 2px 2px 5px rgba(255,255,255,0.1)";
    }
}

    setInt(i) {
        this.currentValue = i;
        this.updateDisplay(true);
        this.isUpdated = true;
    }

    randomize() {
        this.currentValue = Math.floor(Math.random() * 6);
        this.updateDisplay(false);
        this.isUpdated = true;
    }

    rotate() {
        if (!this.visible) {
            this.obj.parent.notify("Ist unsichtbar -> Keine Änderung");
            return;
        }
        if (!this.isUpdated) {
            this.isUpdated = true;
        } else {
            this.currentValue = (this.currentValue + 1) % 6;
        }
        this.updateDisplay(true);
    }
}
