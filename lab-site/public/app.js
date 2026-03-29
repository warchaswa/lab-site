const page = window.location.pathname.split("/").pop() || "index.html";

// About page
if (page === "about.html") {
  fetch("/api/professor")
    .then((r) => r.json())
    .then((d) => {
      document.getElementById("professor-info").innerHTML = `
        <h3>${d.name}</h3>
        <p><strong>${d.title}</strong></p>
        <p>${d.bio}</p>
        <p><strong>Email:</strong> <a href="mailto:${d.email}">${d.email}</a></p>
        <p><strong>Research:</strong> ${d.research_areas}</p>
        <p><a href="${d.google_scholar}" target="_blank">Google Scholar Profile</a></p>
      `;
    })
    .catch(() => {
      document.getElementById("professor-info").innerHTML =
        "<p>Error loading.</p>";
    });
}

// Research page
if (page === "research.html") {
  fetch("/api/professor")
    .then((r) => r.json())
    .then((d) => {
      document.getElementById("research-areas").innerHTML = d.research_areas
        .split(",")
        .map((r) => `<div class="research-item">🔬 ${r.trim()}</div>`)
        .join("");
    })
    .catch(() => {
      document.getElementById("research-areas").innerHTML =
        "<p>Error loading.</p>";
    });
}

// Publications page
if (page === "publications.html") {
  fetch("/api/publications")
    .then((r) => r.json())
    .then((list) => {
      const ul = document.getElementById("publications-list");
      if (list.length === 0) {
        ul.innerHTML = "<p>No publications yet.</p>";
      } else {
        ul.innerHTML = list
          .map(
            (p) => `
          <li style="margin:10px 0;">
            <strong>${p.title}</strong><br/>
            ${p.authors} (${p.year}), <em>${p.journal}</em>
            ${p.link ? `<br/><a href="${p.link}" target="_blank">[Link]</a>` : ""}
            ${p.doi ? `<br/>DOI: ${p.doi}` : ""}
          </li>
        `,
          )
          .join("");
      }
    })
    .catch(() => {
      document.getElementById("publications-list").innerHTML =
        "<p>Error loading.</p>";
    });
}

// Team page
if (page === "team.html") {
  fetch("/api/team")
    .then((r) => r.json())
    .then((list) => {
      const grid = document.getElementById("team-grid");
      if (list.length === 0) {
        grid.innerHTML = "<p>Team members coming soon...</p>";
      } else {
        grid.innerHTML = list
          .map(
            (m) => `
          <div class="team-card">
            <h4>${m.name}</h4>
            <p><strong>${m.role}</strong></p>
            <p>${m.bio || ""}</p>
          </div>
        `,
          )
          .join("");
      }
    })
    .catch(() => {
      document.getElementById("team-grid").innerHTML = "<p>Error loading.</p>";
    });
}

// Projects page
if (page === "projects.html") {
  fetch("/api/projects")
    .then((r) => r.json())
    .then((list) => {
      const ul = document.getElementById("projects-list");
      if (list.length === 0) {
        ul.innerHTML = "<p>No projects yet.</p>";
      } else {
        ul.innerHTML = list
          .map(
            (p) => `
          <li style="margin:10px 0;">
            <strong>${p.title}</strong> - ${p.status}<br/>
            ${p.description || ""}
            ${p.start_date ? `<br/>Started: ${p.start_date}` : ""}
          </li>
        `,
          )
          .join("");
      }
    })
    .catch(() => {
      document.getElementById("projects-list").innerHTML =
        "<p>Error loading.</p>";
    });
}

// Contact page
if (page === "contact.html") {
  fetch("/api/contact")
    .then((r) => r.json())
    .then((d) => {
      let html = `
        <p><strong>Lab:</strong> ${d.lab_name}</p>
        <p><strong>Address:</strong> ${d.address}</p>
        <p><strong>Email:</strong> <a href="mailto:${d.email}">${d.email}</a></p>
        ${d.phone ? `<p><strong>Phone:</strong> ${d.phone}</p>` : ""}
      `;
      if (d.google_form_link) {
        html += `<p style="margin-top:20px;"><a href="${d.google_form_link}" target="_blank" class="btn-login" style="display:inline-block;text-decoration:none;">📝 Mark Attendance (Google Form)</a></p>`;
      }
      document.getElementById("contact-info").innerHTML = html;
    })
    .catch(() => {
      document.getElementById("contact-info").innerHTML =
        "<p>Error loading.</p>";
    });
}
