function rem(value) {
  return value * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function getMaxSize() {
  const width = window.innerWidth;

  if (width >= 1100) return rem(3);     // large screens
  if (width >= 768)  return rem(2);     // tablets
  return rem(1.25);                        // small/mobile
}

async function initializeFitty() {
  await Promise.all([
    document.fonts.ready,
    renderList()
  ]);
  fitty('.fitty-title');
  fitty('.fitty-text', {
    maxSize: getMaxSize(),
    multiLine: true
  });
}

function applyFitty() {
  fitty('.fitty-title');
  fitty('.fitty-text', {
    maxSize: getMaxSize(),
    multiLine: true
  });
}

document.addEventListener('DOMContentLoaded', initializeFitty);
window.addEventListener('resize', applyFitty);