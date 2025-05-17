async function loadTemplate(url) {
    const res = await fetch(url);
    const text = await res.text();
    const div = document.createElement('div');
    div.innerHTML = text;
    return div.firstElementChild;
}

async function renderList() {
    try {
        const dataRes = await fetch('/data/sections.json');
        const sections = await dataRes.json();

        const container = document.getElementById('profile-sections');

        let sectionRenderCount = 0;

        for (const section of sections) {
            sectionRenderCount++;
            console.log(`Rendering section #${sectionRenderCount}:`, section.title);
            
            const sectionContainer = await loadTemplate('./components/section/section.html');
            sectionContainer.querySelector('.section-title').innerHTML = section.title;


            for (const item of section.items) {
                const itemType = item.type;

                if (itemType === 'text') {
                    const itemElement = await loadTemplate('./components/section/item-text.html');
                    itemElement.querySelector('.item-title').innerHTML = item.title;
                    itemElement.querySelector('.item-description').
                    
                    innerHTML = item.description;
                    sectionContainer.appendChild(itemElement);

                } else if (itemType === 'project') {
                    const itemElement = await loadTemplate('./components/section/item-project.html');
                    itemElement.querySelector('.item-title').innerHTML = item.title;
                    itemElement.querySelector('.item-description').innerHTML = item.description;
                    sectionContainer.appendChild(itemElement);
                }

                // Add other types as needed here
            }

            container.appendChild(sectionContainer);
        }

    } catch (err) {
        console.error('Error rendering list:', err);
    }
}

function showDescription(event) {
  const item = event.target.closest('.section-item');
  if (!item) return;

  const description = item.querySelector('.item-description-container');
  if (!description) return;

  description.classList.toggle('visible');
}

document.addEventListener('DOMContentLoaded', event => {
    console.log("page loaded")
});
document.addEventListener('click', showDescription);