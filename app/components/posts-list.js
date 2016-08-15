import React from 'react';

class PostsItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: props.posts,
    }
  }

  render() {
    var post = this.props.post;

    var underText;
    if (post.tags.length > 0) {
      underText = " under: "
    }

    return (
      <div className="post post-table">
        <div className="post-row">
          <div className="post-cell post-category post-category-js">
            <a key={post.category} className="" href={'/#'+post.category}>{post.category}</a>
          </div>
          <div className="post-cell post-details">
            <div className="post-table">
              <div className="post-row">
                <div className="post-cell post-title">
                  <a href={post.url} target="_blank">{post.title}</a>
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
}

class PostsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: props.posts,
    }
  }

  render() {
    
    var allPosts = this.props.posts.map(function(post) {
      return (
        <PostsItem key={'post-' + post.id} post={post}/>
      );
    });

    return (
      <div className="content col-xs-12 col-md-9 col-md-offset-3">
        <div className="all-posts">
          <div className="posts">
            {allPosts}
          </div>
        </div>
      </div>
    );    
  }
}

export default PostsList;