document.addEventListener('DOMContentLoaded', () => {
  loadPortfolio();
});

async function loadPortfolio() {
  const statusEl = document.getElementById('projectsStatus');

  try {
    const response = await fetch('data/projects.json');

    if (!response.ok) {
      throw new Error(`File not found: ${response.status}`);
    }

    const data = await response.json();

    if (statusEl) {
      statusEl.style.display = 'none';
    }

    setText('studentName', data.name);
    setText('tagline', data.tagline);
    setText('introduction', data.introduction);

    const profileImg = document.getElementById('profileImage');
    if (profileImg && data.profileImage) {
      profileImg.src = data.profileImage;
    }

    if (data.about) {
      setText('biography', data.about.biography);
      setText('school', data.about.school);
      setText('program', data.about.program);
      setText('graduation', data.about.graduation);
      setText('careerGoal', data.about.careerGoal);
      setText('interests', data.about.interests);
    }

    const skillsContainer = document.getElementById('skillsContainer');
    if (skillsContainer && data.skills) {
      skillsContainer.innerHTML = '';
      data.skills.forEach(skill => {
        const span = document.createElement('span');
        span.textContent = skill;
        skillsContainer.appendChild(span);
      });
    }

    const projectsContainer = document.getElementById('projectsContainer');
    if (projectsContainer && data.projects) {
      projectsContainer.innerHTML = '';
      data.projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';

        card.innerHTML = `
          <img src="${project.image || 'images/profile.jpg'}" alt="${project.title}" onerror="this.src='images/profile.jpg'">
          <div>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <p><small><strong>Tech:</strong> ${project.technologies}</small></p>
            <p><small><strong>Role:</strong> ${project.role}</small></p>
            <a href="${project.link}" target="_blank">View Project</a>
          </div>
        `;
        projectsContainer.appendChild(card);
      });
    }

    // Contact Section
    if (data.contact) {
      setText('email', data.contact.email);
      setText('location', data.contact.location);

      const linkedin = document.getElementById('linkedin');
      if (linkedin && data.contact.linkedin) {
        linkedin.href = data.contact.linkedin;
        linkedin.textContent = data.contact.linkedin;
      }
    }

    // GitHub Link
    const githubLink = document.getElementById('githubLink');
    if (githubLink && data.githubUsername) {
      // Clean the username if it's an email
      let username = data.githubUsername;
      if (username.includes('@')) {
        username = username.split('@')[0];
      }
      githubLink.href = `https://github.com/${username}`;
      githubLink.textContent = `github.com/${username}`;
    }

  } catch (error) {
    console.error('Error loading portfolio data:', error);
    if (statusEl) {
      statusEl.innerHTML = `
        <strong style="color:red">Unable to load portfolio data. Check data/projects.json and try again.</strong>
        <br><small>Error: ${error.message}</small>
        <br><small>Tip: Use Live Server (Go Live) not double-click, and make sure file is named projects.json with S</small>
      `;
    }
  }
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el && text) {
    el.textContent = text;
  }
}