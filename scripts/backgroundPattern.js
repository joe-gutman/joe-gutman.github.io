function getNeighborsWithinRadius(x, y, radius, placedIcons) {
    return placedIcons.filter(p => {
        const distance = Math.sqrt((p.x - x) ** 2 + (p.y - y) ** 2);
        return distance < radius;
    });
}

function placeRandom(images, elements, iconMinSize, iconMaxSize, jitter, gap, maxRotation, imageClass, containerClass, opacity = 1) {
    Array.from(elements).forEach((element) => {
        const oldContainers = element.querySelectorAll(`.${containerClass}`);
        oldContainers.forEach(container => container.remove());

        const width = element.clientWidth;
        const height = element.clientHeight;
        const gapDistance = Math.min(gap, Math.max(gap, 10000 / width));
        const neighborDistance = 2 * gapDistance;

        const overflowContainer = document.createElement('div');
        overflowContainer.classList.add(containerClass);
        overflowContainer.style.position = 'fixed';
        const overflowAmount = 50;
        overflowContainer.style.width = `${100 + overflowAmount}vw`;
        overflowContainer.style.height = `${100 + overflowAmount}vh`;
        overflowContainer.style.left = `-${0.5 * overflowAmount}vw`;
        overflowContainer.style.top = `-${0.5 * overflowAmount}vh`;

        const fragment = document.createDocumentFragment();
        const placedIcons = [];

        for (let x = 0; x < width * 1.5; x += gapDistance) {
            for (let y = 0; y < height * 1.5; y += gapDistance) {
        
                const iconSize = Math.floor(Math.random() * (iconMaxSize - iconMinSize)) + iconMinSize;
        
                const jitterX = (Math.random() - 0.5) * jitter;
                const jitterY = (Math.random() - 0.5) * jitter;
        
                const finalX = x + jitterX;
                const finalY = y + jitterY;
        
                const isTooClose = placedIcons.some(p => {
                    const dx = p.x - finalX;
                    const dy = p.y - finalY;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const minGap = (p.size + iconSize) / 2 + 4;
                    return distance < minGap;
                });
        
                if (isTooClose) continue;
        
                const neighbors = getNeighborsWithinRadius(finalX, finalY, neighborDistance, placedIcons);
                const neighborSources = neighbors.map(n => n.src);
                const availableImages = images.filter(image => !neighborSources.includes(image));
                if (availableImages.length === 0) continue;
        
                const randomImage = availableImages[Math.floor(Math.random() * availableImages.length)];
        
                const icon = document.createElement('img');
                icon.classList.add(imageClass);
                icon.src = randomImage;
                icon.style.cssText = `
                    position: absolute;
                    top: ${finalY}px;
                    left: ${finalX}px;
                    width: ${iconSize}px;
                    height: ${iconSize}px;
                    opacity: ${opacity};
                `
        
                const rotDir = Math.random() < 0.5 ? -1 : 1;
                const initialRotation = Math.floor(Math.random() * maxRotation) * rotDir;
                icon.style.transform = `rotate(${initialRotation}deg)`;
                icon.style.setProperty('--initial-rotation', `${initialRotation}deg`);
                icon.style.setProperty('--current-rotation', `${initialRotation}deg`);
                fragment.appendChild(icon);

                placedIcons.push({ x: finalX, y: finalY, src: randomImage, size: iconSize });
            }
        }
        overflowContainer.appendChild(fragment);
        element.prepend(overflowContainer);
    });
}

function backgroundBlobs(elements) {
    function clearPatternBlobs() {
        const blobs = document.querySelectorAll('.pattern-blob');
        blobs.forEach(blob => blob.remove());
    }
    clearPatternBlobs();

    const iconMinSize = 225;
    const iconMaxSize = 400;
    const jitter = 300;
    const gap = 300;
    const maxRotation = 360;

    const images = [
        'assets/background_pattern/blobs/1.svg',
        'assets/background_pattern/blobs/2.svg',
        'assets/background_pattern/blobs/3.svg',
        'assets/background_pattern/blobs/4.svg',
        'assets/background_pattern/blobs/5.svg',
    ];

    placeRandom(images, elements, iconMinSize, iconMaxSize, jitter, gap, maxRotation, 'pattern-blob', 'pattern-blobs-container');
}


function backgroundIcons(elements) {
    function clearPatternIcons() {
        const icons = document.querySelectorAll('.pattern-icon');
        icons.forEach(icon => icon.remove());
    }
    clearPatternIcons();

    const iconMinSize = 40; 
    const iconMaxSize = 70; 
    const jitter = 100;
    const gap = 150;
    const maxRotation = 50;

    const images = [
        'assets/background_pattern/icons/1.svg',
        // 'assets/background_pattern/icons/2.svg',
        'assets/background_pattern/icons/3.svg',
        'assets/background_pattern/icons/4.svg',
        'assets/background_pattern/icons/5.svg',
        'assets/background_pattern/icons/6.svg',
        'assets/background_pattern/icons/7.svg',
        'assets/background_pattern/icons/8.svg',
        'assets/background_pattern/icons/9.svg',
        'assets/background_pattern/icons/10.svg',
        'assets/background_pattern/icons/11.svg'
    ];

    placeRandom(images, elements, iconMinSize, iconMaxSize, jitter, gap, maxRotation, 'pattern-icon', 'pattern-icons-container');
}

function backgroundNoise(elements) {
    // Create canvas
    const noiseSize = 64;
    const canvas = document.createElement('canvas');
    canvas.width = noiseSize;
    canvas.height = noiseSize;
    const context = canvas.getContext("2d");

    // Generate noise pixels
    for (let i = 0; i < canvas.width; i++) {
        for (let j = 0; j < canvas.height; j++) {
            const num = Math.floor(Math.random() * 255);
            context.fillStyle = `rgb(${num},${num},${num})`;
            context.fillRect(i, j, 1, 1);
        }
    }

    const dataURL = canvas.toDataURL();

    Array.from(elements).forEach(element => {
        const oldContainers = element.querySelectorAll(`.noise-container`);
        Array.from(oldContainers).forEach(container => container.remove());

        const width = element.clientWidth;
        const height = element.clientHeight;

        // Create a container div if needed
        const noiseContainer = document.createElement('div');
        noiseContainer.classList.add('noise-container');
        noiseContainer.classList.add('pattern-container');
        noiseContainer.style.cssText = `
            width: ${width}px;
            height: ${height}px;
            pointer-events: none;
            background-image: url(${dataURL});
            background-repeat: repeat;
            background-size: auto;
            mix-blend-mode: overlay;
        `;

        element.prepend(noiseContainer);
    });
}


function createBackgroundPattern() {
    const elements = document.getElementsByClassName('background-pattern');

    backgroundNoise(elements);
    // backgroundIcons(elements);
    backgroundBlobs(elements);
    // backgroundNubs(elements);
}

document.removeEventListener('mouseenter', handleWiggle, true);
document.removeEventListener('mouseleave', stopWiggle, true);

document.addEventListener('mouseenter', handleWiggle, true);
document.addEventListener('mouseleave', stopWiggle, true);

function handleWiggle(event) {
    if (event.target.classList.contains('pattern-icon') && !event.target.style.animation) {
        const element = event.target;

        const initialRotation = parseFloat(getComputedStyle(element).getPropertyValue('--initial-rotation')) || 0;

        const rotDir = Math.random() < 0.5 ? -1 : 1;
        const wiggleAmount = 7;

        element.style.setProperty('--wiggle-start', `${initialRotation}deg`);
        element.style.setProperty('--wiggle-side', `${initialRotation + (wiggleAmount * rotDir)}deg`);
        element.style.setProperty('--wiggle-side-1', `${initialRotation + (wiggleAmount * rotDir)}deg`);
        element.style.setProperty('--wiggle-side-2', `${initialRotation - (wiggleAmount * rotDir)}deg`);

        element.style.animation = `wiggle-start 0.15s ease-in-out forwards`;

        element.addEventListener('animationend', (e) => {
            if (e.animationName === 'wiggle-start') {
                element.style.animation = `wiggle-loop 0.3s infinite ease-in-out alternate`;
            }
        }, { once: true });
    }
}

function stopWiggle(event) {
    if (event.target.classList.contains('pattern-icon')) {
        const element = event.target;

        element.style.animation = '';

        const initialRotation = getComputedStyle(element).getPropertyValue('--initial-rotation');
        element.style.transition = 'transform 0.3s ease';
        element.style.transform = `rotate(${initialRotation})`;
        
        setTimeout(() => element.style.transition = '', 300);
    }
}


document.addEventListener('DOMContentLoaded', createBackgroundPattern);
window.addEventListener('resize', createBackgroundPattern);