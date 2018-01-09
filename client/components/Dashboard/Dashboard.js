import { actionCreators, selectors } from '../../HackerStore';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import MenuBar from '../utils/MenuBar';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../utils/PrivateRoute';
import { Landing as AdminLanding} from '../Admin';
import { Landing as HackerLanding } from '../Hacker';
import { NotFound} from '../utils';

const { logout } = actionCreators;
const { getIsAdmin } = selectors;

class Dashboard extends Component {

    handleLogoutClick() {
        this.props.logout();
    }

    render() {
        return (
            <div>
                <MenuBar onLogoutClick={this.handleLogoutClick.bind(this)}/>
                <Switch>
                    <PrivateRoute exact path="/" type="admin" component={AdminLanding}/>
                    <PrivateRoute exact path="/" type="hacker" component={HackerLanding}/>
                    <Route path="*" component={NotFound}/>
                </Switch>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        isAdmin: getIsAdmin(state)
    };
}

export default connect(mapStateToProps, { logout })(Dashboard);
