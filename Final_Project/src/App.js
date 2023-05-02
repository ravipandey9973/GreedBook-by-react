import { useState } from 'react';
import './App.css';

const initialData = [
  {
    id: 1,
    name: 'Ravi Pandey',
    ticketNumber: 1234,
    ticketTopic: 'React',
    examGrade: 4.2,
    ratingGrade: 4.0,
    comments: 'Good work!',
  },
  {
    id: 2,
    name: 'Rohit Singh',
    ticketNumber: 5678,
    ticketTopic: 'React',
    examGrade: 1.3,
    ratingGrade: 4.0,
    comments: 'Well done!',
  },
  {
    id: 3,
    name: 'Raj',
    ticketNumber: 9012,
    ticketTopic: 'React',
    examGrade: 2.7,
    ratingGrade: 4.0,
    comments: 'Needs improvement.',
  },
  {
    id: 4,
    name: 'Rocky',
    ticketNumber: 4421,
    examGrade: 2.8,
    ratingGrade: 4.0,
    comments: 'Excellent.',

  },
  {
    id: 5,
    name: 'Vivek Kumar Sahu',
    ticketNumber: 4422,
    examGrade: 2.9,
    ratingGrade: 4.0,
    comments: 'Excellent.',
  },
  {
    id: 6,
    name: 'Rahul Gandhi',
    ticketNumber: 4423,
    examGrade: 3.1,
    ratingGrade: 4.0,
    comments: 'Excellent.',
  },
  {
    id: 7,
    name: 'Arvind kejrival',
    ticketNumber: 4424,
    examGrade: 3.2,
    ratingGrade: 4.0,
    comments: 'Excellent.',
  },
  {
    id: 8,
    name: 'Ms Dhoni',
    ticketNumber: 4425,
    examGrade: 4.2,
    ratingGrade: 4.8,
    comments: 'very bad performance.',
  }
];

function GradebookPage() {
  const [students, setStudents] = useState(initialData);
  const [showStats, setShowStats] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const calculateFinalGrade = (examGrade, ratingGrade) => {
    return 0.6 * examGrade + 0.4 * ratingGrade;
  };

  const getStudentStatus = (finalGrade) => {
    return finalGrade > 4 ? 'Passed' : 'Failed';
  };

  const handleSortChange = (event) => {
    const sortValue = event.target.value;
    let sortedStudents = [...students];
    if (sortValue === 'name') {
      sortedStudents.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortValue === 'finalGradeAsc') {
      sortedStudents.sort((a, b) => calculateFinalGrade(a.examGrade, a.ratingGrade) - calculateFinalGrade(b.examGrade, b.ratingGrade));
    } else if (sortValue === 'finalGradeDesc') {
      sortedStudents.sort((a, b) => calculateFinalGrade(b.examGrade, b.ratingGrade) - calculateFinalGrade(a.examGrade, a.ratingGrade));
    }
    setStudents(sortedStudents);
  };

  const handleFilterChange = (event) => {
    const filterValue = event.target.value.toLowerCase();
    const filteredStudents = initialData.filter((student) =>
      student.name.toLowerCase().includes(filterValue)
    );
    setStudents(filteredStudents);
  };

  const renderTableRows = () => {
    return students.map((student, index) => {
      const finalGrade = calculateFinalGrade(student.examGrade, student.ratingGrade);
      const status = getStudentStatus(finalGrade);
      const isSelected = index === selectedRow;
      const rowClass = isSelected ? "selected" : "";
      return (
        <tr key={student.id} className={rowClass} onClick={() => setSelectedRow(index)}>
          <td>{index + 1}</td>
          <td>{isSelected ? student.name.toUpperCase() : student.name}</td>
          <td>{student.ticketNumber}</td>
          <td>{student.ratingGrade}</td>
          <td>{student.examGrade}</td>
          <td>{finalGrade.toFixed(2)}</td>
          <td>{status}</td>
          <td>
            <button>Details</button>
          </td>
        </tr>
      );
    });
  };
  

  const showStatistics = () => {
    setShowStats(true);
  };

  const hideStatistics = () => {
    setShowStats(false);
  };

  const renderStatistics = () => {
    const passedStudents = students.filter((student) => {
      const finalGrade = calculateFinalGrade(student.examGrade, student.ratingGrade);
      return finalGrade > 4;
    });
    const failedStudents = students.filter((student) => {
      const finalGrade = calculateFinalGrade(student.examGrade, student.ratingGrade);
      return finalGrade <= 4
    });

    const averageGrade = students.reduce((total, student) => {
      const finalGrade = calculateFinalGrade(student.examGrade, student.ratingGrade);
      return total + finalGrade;
    }, 0) / students.length;
    
    const passedPercentage = (passedStudents.length / students.length) * 100;
    const failedPercentage = (failedStudents.length / students.length) * 100;
    
    return (
      <div>
        <p>Number of passed students: {passedStudents.length}</p>
        <p>Number of failed students: {failedStudents.length}</p>
        <p>Passed percentage: {passedPercentage.toFixed(2)}%</p>
        <p>Failed percentage: {failedPercentage.toFixed(2)}%</p>
        <p>Average final grade: {averageGrade.toFixed(2)}</p>
        <button onClick={hideStatistics}>Hide statistics</button>
      </div>
    );
  };

  return (
    <div>
    <h1>Web Development&nbsp; May 20 2023&nbsp; Sandeep Kaur&nbsp; Lovely Professional University&nbsp; 8th&nbsp; CSE&nbsp; Group-A</h1>
    <div>

  <label htmlFor="sort">Sort by:</label>
  <select id="sort" onChange={handleSortChange}>
  <option value="name">Name</option>
  <option value="finalGradeAsc">Final grade (ascending)</option>
  <option value="finalGradeDesc">Final grade (descending)</option>
  </select>
  </div>
  <div>
  <label htmlFor="filter">Filter by name:</label>
  <input type="text" id="filter" onChange={handleFilterChange} />
  </div>
  <table>
  <thead>
  <tr>
  <th>Id</th>
  <th>Name</th>
  <th>Ticket number</th>
  <th>Rating grade</th>
  <th>Exam grade</th>
  <th>Final grade</th>
  <th>Status</th>
  <th>Details</th>
  </tr>
  </thead>
  <tbody>{renderTableRows()}</tbody>
  </table>
  {!showStats && (
  <button onClick={showStatistics}>Show statistics</button>
  )}
  {showStats && renderStatistics()}
  <h3>Ravi Pandey   30-April-2023</h3>
  </div>
 
  );
  
  }
  
  export default GradebookPage;    