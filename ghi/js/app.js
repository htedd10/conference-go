function createCard(name, location, description, pictureUrl, date) {
  return `
  <div class="card shadow p-3 mb-3 bg-body-tertiary rounded">
    <img src="${pictureUrl}" class="card-img-top">
    <div class="card-body">
      <h5 class="card-title">${name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
      <p class="card-text">${description}</p>
    </div>
    <div class="card-footer">
      <p>${date}</p>
    </div>
  </div>
  `;
}

function createError(text) {
  return `
  <div class="alert alert-danger" role="alert">
  ${text}
  </div>
  `;
}

window.addEventListener('DOMContentLoaded', async () => {

  const url = 'http://localhost:8000/api/conferences/';
  const columns = document.querySelectorAll('.col')
  let colIndx = 0;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const html = createError("The URL can not be accessed.");
      const column = columns[1];
      column.innerHTML += html;
    } else {
      const data = await response.json();

      for (let conference of data.conferences) {
        const detailUrl = `http://localhost:8000${conference.href}`;
        const detailResponse = await fetch(detailUrl);
        if (detailResponse.ok) {
          const details = await detailResponse.json();
          const title = details.conference.name;
          const location = details.conference.location.name;
          const description = details.conference.description;
          const pictureUrl = details.conference.location.picture_url;
          const start = new Date(details.conference.created).toLocaleDateString();
          const end = new Date(details.conference.ends).toLocaleDateString();
          const date = `${start}-${end}`;
          const html = createCard(title, location, description, pictureUrl, date);
          const column = columns[colIndx % 3];
          column.innerHTML += html;
          colIndx = (colIndx + 1);
        }
      }
    }
  } catch (e) {
    console.error(e);
  }

});
