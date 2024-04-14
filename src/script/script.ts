function octocat() {
  const url = `https://api.github.com/users/octocat`;
  const result = document.getElementById("result");
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const date = new Date(data.created_at).toDateString();
      const [month, day, year] = date.split(" ").slice(1);
      if (result) {
        result.innerHTML = `
          <img src="${data.avatar_url}" alt="Avatar">
          <h1>${data.name}</h1>
          <a href="https://github.com/${data.login}" target="_blank">@${data.login}</a>
          <p>Joined <time datetime="${year}-${month}-${day}">${day} ${month} ${year}</time></p>
          <p>${data.bio}</p>
        `;
      }
    });
}

function result(user: string) {
  const errorMsg = document.getElementById("error-msg");
  const url = `https://api.github.com/users/${user}`;
  const result = document.getElementById("result");
  fetch(url)
    .then((response) => {
      if (errorMsg) {
        errorMsg.textContent = response.ok ? "" : "No results";
      }
      if (!response.ok) {
        octocat();
      }
      return response.json();
    })
    .then((data) => {
      const date = new Date(data.created_at).toDateString();
      const [month, day, year] = date.split(" ").slice(1);
      if (result) {
        const name = data.name || data.login;
        const bio = data.bio || "This profile has no bio";
        const location = data.location
          ? `<a href="https://www.google.com/maps/place/${data.location}" target="_blank">${data.location}</a>`
          : "Not available";
        const blog = data.location
          ? `<a href="${data.blog}" target="_blank">${data.blog}</a>`
          : "Not available";
        const social = data.twitter_username
          ? `<a href="https://twitter.com/${data.twitter_username}" target="_blank">${data.twitter_username}</a>`
          : "Not available";
        const company = data.company
          ? `<a href="https://github.com/${data.company.replace(
              "@",
              ""
            )}" target="_blank">${data.company}</a>`
          : "Not available";
        result.innerHTML = `
          <img src="${data.avatar_url}" alt="Avatar">
          <h1>${name}</h1>
          <a href="https://github.com/${data.login}" target="_blank">@${data.login}</a>
          <p>Joined <time datetime="${year}-${month}-${day}">${day} ${month} ${year}</time></p>
          <p>${bio}</p>
          <div>
            <ul>
              <li>Repos</li>
              <li>${data.public_repos}</li>
            </ul>
            <ul>
              <li>Followers</li>
              <li>${data.followers}</li>
            </ul>
            <ul>
              <li>Following</li>
              <li>${data.following}</li>
            </ul>
          </div>
          <ul>
            <li>${location}</li>
            <li>${blog}</li>
            <li>${social}</li>
            <li>${company}</li>
          </ul>
        `;
      }
    })
    .catch((error) => {
      if (error && errorMsg) {
        errorMsg.textContent = "No results";
        octocat();
      }
    });
}

window?.addEventListener("load", () => {
  result("octocat");
});
