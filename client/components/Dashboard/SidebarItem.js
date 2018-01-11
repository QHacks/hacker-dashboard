import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../../HackerStore/HackerActions';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const { toggleSidebarVisibility } = actionCreators;

class SidebarItem extends Component {
    render() {
        const { children, toggleSidebarVisibility, ...rest } = this.props;
        return (
            <Menu.Item as={Link}
                       onClick={() => toggleSidebarVisibility()}
                       {...rest}>
                {children}
            </Menu.Item>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return { ...ownProps };
}

export default connect(mapStateToProps, { toggleSidebarVisibility })(SidebarItem);
