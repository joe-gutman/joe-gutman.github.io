async function initializeFitty() {
  await Promise.all([
    document.fonts.ready,
    renderList()
  ]);
  fitty('.fit');
}

document.addEventListener('DOMContentLoaded', initializeFitty);