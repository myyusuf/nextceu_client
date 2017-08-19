import { connect } from 'react-redux';
import Workspace from '../../pages/workspace/Workspace';
import { filterStudentsByLevelText } from '../../actions/student/students';


const mapStateToProps = state => (
  {
    students: state.studentReducers.students,
    studentFilter: state.studentReducers.studentFilter,
  }
);

const mapDispatchToProps = dispatch => (
  {
    filterStudents: level => (
      dispatch(filterStudentsByLevelText(level))
    ),
  }
);

const WorkspaceWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Workspace);

export default WorkspaceWrapper;
