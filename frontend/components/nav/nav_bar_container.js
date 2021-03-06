import { connect } from 'react-redux';
import React from 'react'
import NavBar from './nav_bar';
import { openModal } from '../../actions/modal_actions';

const mapStateToProps = ({ session, entities: { users } }) => {
    return {
        currentUser: users[session.id]
    };
};

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    openModal: (id) => dispatch(openModal('photoForm', id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavBar);