import { connect } from 'react-redux';
import Workspace from '../../pages/workspace/Workspace';
import { openAddStudentWindow } from '../../actions/student/student_window';

const mapStateToProps = state => (
  {
    students: state.studentReducers.students,
  }
);

const mapDispatchToProps = dispatch => (
  {
    openAddStudentWindow: () => {
      dispatch(openAddStudentWindow());
    },
  }
);

const WorkspaceWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Workspace);

export default WorkspaceWrapper;
