
import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import {Form, Checkbox} from 'semantic-ui-react'
import Articles from './Components/Articles'
// import Articles from './Components/Articles';
import Question from './Components/Question'
import Find_Question from './Components/FindQuestion'
import './App.css'
function App() {
  const [value, setValue] = React.useState('Question')
  return (
    <> 
    <h3 className='Heading'><strong>New Post</strong></h3>
    <div>
    <Form className='Form' >
    <Form.Field>
        {/* Selected value: <b>{value}</b> */}
      </Form.Field>
      <Form.Field>
        <h3 className='Select'>Select Post Type</h3>
        <Checkbox className='checkbox_Article' 
          radio
          label='Article'
          name='checkboxRadioGroup'
          value='Article'
          checked={value === 'Article'}
          onChange={(e, data) => setValue(data.value)}
          
          
        />

        
      </Form.Field> 
      
      <Form.Field>
        <Checkbox className='checkbox_Question' 
          radio
          label='Question'
          name='checkboxRadioGroup'
          value='Question'
          checked={value === 'Question'}
          onChange={(e, data) => setValue(data.value)}
        />
      </Form.Field>
      <Form.Field>
        <Checkbox className='Find_Question' 
          radio
          label='Find_Question'
          name='checkboxRadioGroup'
          value='Find_Question'
          checked={value === 'Find_Question'}
          onChange={(e, data) => setValue(data.value)}
        />
      </Form.Field>
    </Form>
    </div>
  {
  value === 'Question' ? (
    <Articles />
  ) : value === 'Article' ? (
    <Question />
  ) : (
    <Find_Question />
  )
}
   
    </>
  );
}
export default App;
