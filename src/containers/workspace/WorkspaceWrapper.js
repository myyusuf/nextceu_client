import { connect } from 'react-redux';
import Workspace from '../../pages/workspace/Workspace';


const mapStateToProps = state => (
  {
    students: state.studentReducers.students,
  }
);

const mapDispatchToProps = dispatch => (
  {
  }
);

const WorkspaceWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Workspace);

export default WorkspaceWrapper;
