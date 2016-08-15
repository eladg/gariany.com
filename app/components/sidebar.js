import React from 'react';

import CategorieList from './category-list';
import SocialList from  './social-list'
import TagsList from  './tags-list';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: props.categories,
      tags: props.tags,
      route: props.route,
    }
  }

  render() {
    return (
      <div className="sidebar col-xs-12 col-md-3">
        <div className="header">
          <a href="/#"><h1 className="title">gariany&#39;s drafts</h1></a>
          <h2 className="tagline">thoughts<br/> code<br/> music and art showcase</h2>

          <div className="navigation">
            <CategorieList categories={this.props.categories} route={this.props.route} />
            <TagsList tags={this.props.tags} route={this.props.route} />
            <SocialList/>
          </div>
        </div>
      </div>      
    );
  }
}

export default Sidebar;