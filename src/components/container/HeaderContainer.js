import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class App extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/videos">Videos</Link></li>
          <li><Link to="/topics">not found</Link></li>
        </ul>
      </div>
    );
  }
}
