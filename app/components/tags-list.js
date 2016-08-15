import React from 'react';

class TagsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      route: props.route,
      tags: props.tags,
    }
  }

  render() {
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
}

class TagsListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
     <li className={"nav-item" + (this.props.selected ? ' selected' : '') }><a href={'#tags/' + this.props.tag}>#{this.props.tag}</a></li>
    );
  }
}

export default TagsList;