var React    = require('react');
var ReactDOM = require("react-dom");
var CONFIG   = require("react-global-configuration");

// --------------- SIDE BAR -------------- //

var CategorieListItem = React.createClass({
  render: function() {
    return (
      <li className={"nav-item" + (this.props.selected ? ' selected' : '') }><a href={'#' + this.props.category} title="">/{this.props.category}</a></li>
    );
  }
});

var CategorieList = React.createClass({
  render: function() {
    return (
      <nav className="nav">
        <ul className="nav-list">
          {this.props.categories.map(function(category) {

            var selected = false;
            if (this.props.route.split("#")[1] === category) {
              selected = true;
            }

            return (
              <CategorieListItem key={'category-' + category} category={category} selected={selected}/>
            );
          }, this)}
        </ul>
      </nav>
    );
  }
});

var TagsListItem = React.createClass({
  render: function() {
    return (
      <li className={"nav-item" + (this.props.selected ? ' selected' : '') }><a href={'#tags/' + this.props.tag}>#{this.props.tag}</a></li>
    );
  }
});

var TagsList = React.createClass({
  render: function() {
    return (
      <nav className="nav">
        <ul className="nav-list">
          {this.props.tags.map(function(tag) {

            var selected = false;
            if (this.props.route.split("#tags/")[1] === tag) {
              selected = true;
            }

            return (
              <TagsListItem key={'tag-' + tag} tag={tag} selected={selected}/>
            );
          }, this)}
        </ul>
      </nav>
    );
  }
});

var SocialList = React.createClass({
  render: function() {
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
});

var LeftPanel = React.createClass({
  render: function() {
    return(
      <div className="sidebar col-xs-12 col-md-2">
        <div className="header">
          <a href="/#"><h1 className="title">gariany&#39;s drafts</h1></a>
          <h2 className="tagline">thoughts<br/> code<br/> music and art showcast</h2>

          <div className="navigation">
            <CategorieList categories={this.props.categories} route={this.props.route} />
            <TagsList tags={this.props.tags} route={this.props.route} />
            <SocialList/>
          </div>
        </div>
      </div>
    );
  }
});

// ------------- POSTS LIST ------------- //

var PostsItem = React.createClass({
  render: function() {
    var post = this.props.post;

    var underText;
    if (post.tags.length > 0) {
      underText = " under: "
    }

    return (
      <div className="post post-table">
        <div className="post-row">
          <div className="post-cell post-category post-category-js">{post.category}</div>
          <div className="post-cell post-details">
            <div className="post-table">
              <div className="post-row">
                <div className="post-cell post-title">
                  <a href={post.url}>{post.title}</a>
                </div>
              </div>

              <div className="post-row">
                <div className="post-cell post-meta">
                  Published on: {post.date} {underText}
                  {post.tags.map(function(tag) {
                    return (
                      <a key={tag} className="post-meta-category post-meta-color" href={'/#tags/' + tag}>{tag}</a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
});

var PostsList = React.createClass({
  render: function() {

    var posts = this.props.posts.map(function(post) {
      return (
        <PostsItem key={'post-' + post.id} post={post}
        />
      );
    }.bind(this));

    return (
      <div className="content col-xs-12 col-md-9 col-md-offset-2">
        <div className="all-posts">
          <div className="posts">
            {posts}
          </div>
        </div>
      </div>
    );
  }
});

// --------------- MAIN PANEL --------------- //

var MainPanel = React.createClass({
  getInitialState: function() {
    return {
      posts: [],
      categories: [],
      tags: [],
      route: "",
    };
  },

  componentDidMount: function() {
    this.serverRequest = $.get("data/db.json", function (data) {

      // set up global configurations
      CONFIG.set(data.config);

      // lookup categories/tags of db
      var categoryHash = {};
      var tagsHash = {};
      data.posts.forEach(function(post) {
        categoryHash[post.category] = true;
        post.tags.forEach(function(tag) {
          tagsHash[tag] = true;
        });
      });

      var tags = Object.keys(tagsHash);
      var categories = Object.keys(categoryHash);

      // update the state
      this.setState({
        posts: data.posts,
        tags: tags,
        categories: categories,
        route: window.location.hash,
      });

      window.addEventListener('hashchange', this.updateRoute);

    }.bind(this));
  },

  updateRoute: function() {
    this.setState({
      posts: this.state.posts,
      tags: this.state.tags,
      categories: this.state.categories,
      route: window.location.hash,
    });
  },

  filterPostsByCategory: function(category) {
    var posts = [];
    this.state.posts.forEach(function(post) {
      if (post.category === category) {
        posts.push(post);
      }
    });
    return posts;
  },

  filterPostsByTag: function(tag) {
    var posts = [];
    this.state.posts.forEach(function(post) {
      if (post.tags.indexOf(tag) !== -1) {
        posts.push(post);
      }
    });
    return posts;
  },

  filterPosts: function() {
    var posts = [];
    var route = this.state.route;

    if (this.state.posts) {
      if (/^#tags/.test(route)) {
        posts = this.filterPostsByTag(route.split("#tags/")[1]);
      } else if (/^#/.test(route)) {
        posts = this.filterPostsByCategory(route.split("#")[1]);
      } else {
        posts = this.state.posts;
      }
    }
    return posts;
  },

  render: function() {
    var posts = this.filterPosts();

    return (
      <div className="container-fluid">
        <LeftPanel
          categories={this.state.categories}
          tags={this.state.tags}
          route={this.state.route}
        />
        <PostsList posts={posts}/>
      </div>
    );
  }
});

ReactDOM.render(<MainPanel />, document.getElementById("app"));
