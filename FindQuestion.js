import React, { useState, useEffect } from 'react';
import { db } from './Firebase_Config';
import { collection, getDocs,addDoc,deleteDoc,doc } from 'firebase/firestore';
import "./FindQuestion.css"

function FindQuestion() {
  const [questions, setQuestions] = useState([]);
  const [TitleFilter, setTitle] = useState('');
  const [Filter_Tags, setFilter_Tags] = useState('');
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    tag: '',
    desc: '',
  });
  const [Expand_Index, setExpandedIndex] = useState(null);

  const userQuestionsRef = collection(db, 'users');
  const [filteredQuestions, setFilteredQuestions] = useState([]); // Separate filtered array

  useEffect(() => {
    const getQuestions = async () => {
      const data = await getDocs(userQuestionsRef);
      const questionData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setQuestions(questionData);
      setFilteredQuestions(questionData); // Initialize filtered array with all questions
    };
    getQuestions();
  }, []);

  const handleFilter = () => {
    const filteredQuestions = questions.filter(
      (question) =>
        question.title.toLowerCase().includes(TitleFilter.toLowerCase()) &&
        question.tag.toLowerCase().includes(Filter_Tags.toLowerCase())
    );
    setFilteredQuestions(filteredQuestions); // Update filtered array, not questions
  };

  const Handle_Deleted_Question = async (id) => {
    // Remove the question with the given id from the database
    //await deleteDoc(doc(db, 'questions', id));

    // Update filteredQuestions to remove the deleted question
    const Updated_Questions = filteredQuestions.filter((question) => question.id !== id);
    setFilteredQuestions(Updated_Questions);
  };

  // const handleSubmitNewQuestion = async () => {
  //   // Add the new question to the database
  //   await addDoc(collection(db, 'users'), newQuestion);

  //   // Update filteredQuestions with the new question
  //   setFilteredQuestions([...filteredQuestions, newQuestion]);

  //   // Clear the form fields
  //   setNewQuestion({ title: '', tag: '', desc: '' });
  // };

  const handleExpand = (index) => {
    // Toggle the expanded state for the clicked question
    setExpandedIndex(index === Expand_Index ? null : index);
  };

  return (
    <div>
      <h1>Filter Questions</h1>
      <div className='filter'>
        <h5>Title:</h5>
        <input
          type="text"
          placeholder="Filter by title"
          value={TitleFilter}
          onChange={(e) => setTitle(e.target.value)}
        />

        <h5>Tag:</h5>
        <input
          type="text"
          placeholder="Filter by tags"
          value={Filter_Tags}
          onChange={(e) => setFilter_Tags(e.target.value)}
        />
        <button onClick={handleFilter}>Filter</button>
      </div>
      <h1>Questions</h1>
      {filteredQuestions.map((question, index) => (
        <div className="card" key={question.id}>
          <h2>Question: {index + 1}</h2> 
          <h2>Title: {question.title}</h2>
          <button onClick={() => Handle_Deleted_Question(question.id)}>Delete</button>
          <button onClick={() => handleExpand(index)}>
            {Expand_Index === index ? 'Collapse' : 'Expand'}
          </button>
          {Expand_Index === index && (
            <div>
              <h3>More Details:</h3>
              <p>Description: {question.desc}</p>
              <p>Tag: {question.tag}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FindQuestion;
