import React from 'react';

class CategoryList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: props.categories,
      route: props.route,
    }
  }

  render() {
    return ( 
      <nav className="nav">
        <ul className="nav-list">
          {this.props.categories.map(function(category) {

            var selected = false;
            if (this.props.route.split("#")[1] === category) {
              selected = true;
            }

            return (
              <CategoryListItem key={'category-' + category} category={category} selected={selected}/>
            );
          }, this)}
        </ul>
      </nav>
    );
  }
}

class CategoryListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: props.selected,
      category: props.category,
    }
  }

  render() {
    return (
      <li className={"nav-item" + (this.props.selected ? ' selected' : '') }><a href={'#' + this.props.category} title="">/{this.props.category}</a></li>
    );
  }
}

export default CategoryList;