import React from 'react';
import Sidebar from './sidebar'
import PostsList from './posts-list'

class MainPanel extends React.Component {
  
  constructor(props) {
    super(props);

    var posts = props.data.posts;
    var config = props.data.config;

    // lookup categories/tags of db
    var categoryHash = {};
    var tagsHash = {};
    
    posts.forEach(function(post) {
      categoryHash[post.category] = true;
      post.tags.forEach(function(tag) {
        tagsHash[tag] = true;
      });
    });

    var tags = Object.keys(tagsHash);
    var categories = Object.keys(categoryHash);

    // set state
    this.state = {
      config: config,
      posts: posts,
      tags: tags,
      categories: categories,
      route: "",
    }

    // simple primitive route
    this.updateRoute = this.updateRoute.bind(this);
    window.addEventListener('hashchange', this.updateRoute);
  }

  _filterPostsByCategory(category) {
    var posts = [];
    this.state.posts.forEach(function(post) {
      if (post.category === category) {
        posts.push(post);
      }
    });
    return posts;
  }

  _filterPostsByTag(tag) {
    var posts = [];
    this.state.posts.forEach(function(post) {
      if (post.tags.indexOf(tag) !== -1) {
        posts.push(post);
      }
    });
    return posts;
  }

  _filterPosts() {
    var posts = [];
    var route = this.state.route;

    if (/^#tags/.test(route)) {
      posts = this._filterPostsByTag(route.split("#tags/")[1]);
    } else if (/^#/.test(route)) {
      posts = this._filterPostsByCategory(route.split("#")[1]);
    } else {
      posts = this.state.posts;
    }

    return posts;
  }

  updateRoute() {
    this.setState({
      config: this.state.config,
      posts: this.state.posts,
      tags: this.state.tags,
      categories: this.state.categories,
      route: window.location.hash,
    });
  }

  render() {
    var posts = this._filterPosts();

    return (
      <div className="container-fluid">
        <Sidebar categories={this.state.categories} tags={this.state.tags} route={this.state.route} />
        <PostsList posts={posts}/>
      </div>
    );
  }
}

export default MainPanel;