import FeedComments from './feed_comments';
import { createComment, deleteComment } from '../../actions/comment_actions';
import { deleteLike } from '../../actions/like_actions';
import {fetchUser } from '../../actions/user_actions';
import { connect } from 'react-redux';


const mapStateToProps = (state, ownProps) => {
    return {
        photo_id: ownProps.photo_id,
        currentUser: state.session.id,
        users: state.entities.users,
        comments: state.entities.comments,
    };
};

const mapDispatchToProps = dispatch => ({
    createComment: (comment) => dispatch(createComment(comment)),
    deleteComment: (id) => dispatch(deleteComment(id)),
    deleteLike: (photo_id) => dispatch(deleteLike(photo_id)),
    fetchUser: (id) => dispatch(fetchUser(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedComments);