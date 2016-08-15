import React from 'react';

class SocialList extends React.Component {
  render() {
    return (
      <nav className="nav-icons">
        <ul className="nav-list">
          <li className="nav-icon">
            <a href="https://github.com/eladg"><i className="fa fa-github"></i></a>
          </li>
          <li className="nav-icon">
            <a href="https://twitter.com/elad_g"><i className="fa fa-twitter"></i></a>
          </li>
          <li className="nav-icon">
            <a href="https://no.linkedin.com/in/eladgariany/en"><i className="fa fa-linkedin"></i></a>
          </li>
          <li className="nav-icon">
            <a href="https://bitbucket.org/"><i className="fa fa-bitbucket"></i></a>
          </li>
          <li className="nav-icon">
            <a href="mailto:elad@gariany.com"><i className="fa fa-envelope"></i></a>
          </li>
          <li className="nav-icon">
            <a href="http://gariany.com/files/elad.gariany.cv.pdf"><i className="fa fa-file-text"></i></a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default SocialList;