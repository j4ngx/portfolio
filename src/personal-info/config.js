// NAVIGATION BAR SECTION

const navBar = {};

// MAIN BODY SECTION

const mainBody = {
  gradientColors: '#FFFFFF, #3D3D3D, #000000',
  firstName: 'Jose Antonio',
  lastName: 'Navarro Guerrero',
  firstMessage: ' Dont document the problem;just fix it. ',
  secondMessage: ['Backend Developer', 'Junior Developer'],
};

// ABOUT SECTION

const about = {
  heading: 'About Me',
  message:
    'My name is Jose Antonio Navarro Guerrero. I am a Junior Developer focused on the backend. ' +
    'In my free time I like to improve my skills as a developer, so I am continuously learning new languages' +
    ' and development techniques. I am improving myself to become a dedicated and efficient backend developer.',
};

// PROJECTS SECTION
// Setting up project lenght will automatically fetch your that number of recently updated projects, or you can set this field 0 to show none.
//      i.e: reposLength: 0,
// If you want to display specfic projects, add the repository names,
//      i.e ["repository-1", "repo-2"]

const repos = {
  heading: 'Recent Projects',
  gitHubUsername: 'j4ngx',
  reposLength: 4,
  specificRepos: [],
};

// SKILLS SECTION

const skills = {
  heading: 'Skills',
};

// GET IN TOUCH SECTION

const getInTouch = {
  heading: 'Get In Touch',
  message:
    'Thank you for your time and consideration. Feel free to email me at',
  email: 'joseng2709@gmail.com',
};

export { navBar, mainBody, about, repos, skills, getInTouch };
