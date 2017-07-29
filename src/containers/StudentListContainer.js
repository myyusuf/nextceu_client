import { connect } from 'react-redux';
import StudentList from '../components/pages/student/StudentList';
import action from '../actions'

const mapStateToProps = state => {
  return {
    students: state.students,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onItemClick: () => {
      const newStudent =
      {
        id: 2,
        name: 'Student Test add',
        newSid: '333',
        oldSid: '444',
      }
      dispatch(action.addStudent(newStudent))
    }
  }
}

const StudentListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentList)

export default StudentListContainer;

