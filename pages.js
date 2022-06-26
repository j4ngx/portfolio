const ghpages = require('gh-pages');

const pathname = `${__dirname}/build`;
const repoURL =
  'https://github.com/j4ngx/j4ngx.github.io.git';

ghpages.publish(
  pathname,
  {
    branch: 'main',
    repo: repoURL,
  },
  (err) => {
    if (err) console.log('ERROR: ', err);
    else console.log('PUBLISHED');
  }
);
