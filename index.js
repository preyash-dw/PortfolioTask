//---------------services toggle
const serviceButtons=document.querySelectorAll(".service_item");
const serviceLog=document.querySelector(".services_right");


const getService=(category)=>{
    const details=servicesdata.find(item => item.category===category);
    serviceLog.innerHTML=`
          <h3>${details.title}</h3>
          ${details.description.map(paragraph=>"<p>"+paragraph+"</p>").join("")}
    `
    
}


const removeActive=()=>{
    serviceButtons.forEach(button=>{
        button.classList.remove("active");
    })
}
serviceButtons.forEach(item=>{
    item.addEventListener('click',()=>{
        removeActive();
        const serviceClass=item.classList[1];
        getService(serviceClass);
        item.classList.add("active");
    })
})

//on load this
document.addEventListener('DOMContentLoaded', () => {
    getService("frontend");
});


//for projects

function createProjectElement(project) {
  const projectElement = document.createElement('article');
  projectElement.classList.add('project', 'mix', project.category.toLowerCase());

  projectElement.innerHTML = `
    <div class="project_image">
      <img src="${project.image}" alt="Project Image">
    </div>
    <div class="project_desc">
    <h3>${project.title}</h3>
    <p>${project.description}</p>
    </div>
    <div class="project_cta">
      <a href="${project.demoLink}" class="btn sm primary" target="_blank">Demo</a>
      <a href="${project.githubLink}" class="btn sm primary" target="_blank">Github</a>
    </div>
  `;

  return projectElement;
}

// Function to render projects
function renderProjects(data) {
  const projectsContainer = document.querySelector('.container.project_container');

  data.forEach((project) => {
    const projectElement = createProjectElement(project);
    projectsContainer.appendChild(projectElement);
  });
}

document.addEventListener('DOMContentLoaded', function () {
 
  renderProjects(projects);
});


//to make functionality of clicking and filtering projects

// Function to filter and render projects 
function filterAndRenderProjects(category) {
  const projectsContainer = document.querySelector('.container.project_container');
  projectsContainer.innerHTML = ''; 

  const filteredProjects = category === 'All' ? projects : projects.filter(project => project.category === category);

  filteredProjects.forEach((project) => {
    const projectElement = createProjectElement(project);
    projectsContainer.appendChild(projectElement);
  });

  // Remove 'active' class from all list items
  const categoryListItems = document.querySelectorAll('.project_category li');
  categoryListItems.forEach(item => item.classList.remove('active'));

  // Add 'active' class to the clicked list item
  const clickedListItem = Array.from(categoryListItems).find(item => item.textContent.trim() === category);
  if (clickedListItem) {
    clickedListItem.classList.add('active');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const categoryList = document.querySelector('.project_category');

  categoryList.addEventListener('click', function (event) {
    if (event.target.tagName === 'LI') {
      const selectedCategory = event.target.textContent.trim();
      filterAndRenderProjects(selectedCategory);
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  filterAndRenderProjects('All');
});


