import React, { Component } from "react";
import MenuBar from "../MenuBar/MenuBar";
class AdminWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <MenuBar />
        {this.props.children}
      </div>
    );
  }
}

export default AdminWrapper;
