import { connect } from 'react-redux';
import StudentList from '../components/StudentList';
import { studentAction } from '../actions'

const mapStateToProps = state => {
  return {
    students: state.todos,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onItemClick: () => {
      const newStudent =
      {
        id: 1,
        name: 'Student Test add',
        newSid: '333',
        oldSid: '444',
      }
      dispatch(studentAction.addStudent(newStudent))
    }
  }
}

const StudentListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentList)

export default StudentListContainer;

