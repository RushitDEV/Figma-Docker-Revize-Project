function fitTitleByLines(selector, maxFontSize = 40, minFontSize = 20, maxLines = 2) {
    const el = document.querySelector(selector);
    if (!el) return;

    el.style.fontSize = maxFontSize + "px"; // baştan büyüt
    el.style.wordBreak = "break-word";
    el.style.whiteSpace = "normal";

    let fontSize = maxFontSize;

    while (fontSize > minFontSize) {
        const rect = el.getBoundingClientRect();
        const lineHeight = parseFloat(window.getComputedStyle(el).lineHeight);
        const lines = Math.round(rect.height / lineHeight);

        if (lines <= maxLines) break; // artık sığıyorsa dur
        fontSize--;
        el.style.fontSize = fontSize + "px";
    }
}

window.addEventListener("load", () => fitTitleByLines(".bottom-header-title"));
window.addEventListener("resize", () => fitTitleByLines(".bottom-header-title"));

