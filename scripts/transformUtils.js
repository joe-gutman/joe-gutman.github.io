function randRot(element, max_rot_deg, min_rot_deg) {
    const direction = Math.random() < 0.5 ? -1 : 1;
    const rotDeg = Math.floor(Math.random() * (max_rot_deg - min_rot_deg + 1)) + min_rot_deg;
    element.style.transform += `rotate(${rotDeg * direction}deg)`;   
}

function addScale(element, scale) {
    element.style.transform += `scale(${scale})`;
}

function resetRot(element) {
    element.style.transform = `rotate(0deg)`;
}

function resetScale(element) {
    element.style.transform = `scale(1)`;
}
