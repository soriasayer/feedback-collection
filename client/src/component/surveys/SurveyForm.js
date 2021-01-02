import _ from 'lodash'
import React from 'react'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import validateEmails from "../../utils/validateEmails"
import SurveyField from './SurveyField'

const FIELDS = [
  {label: 'Survey Title', name: 'title'},
  {label: 'Subject Line', name: 'subject'},
  {label: 'Email Body', name: 'body'},
  {label: 'Recipient List', name: 'emails'}
]

const SurveyForm = ({handleSubmit}) => {

  const renderFields = () => (
    <div>
      {_.map(FIELDS, ({label, name}) => (
        <Field
          key={name}
          label={label}
          type='text'
          name={name}
          component={SurveyField}
        />
      ))}
    </div>
  )

  return (
    <div>
      <form onSubmit={handleSubmit(values => console.log(values)) }>
        {renderFields()}
        <Link to='/surveys' className='red btn-flat white-text'>
          Cancel
        </Link>
        <button type='submit' className='teal btn-flat right white-text'>
          Next
          <i className='material-icons right'>done</i>
        </button>
      </form>
    </div>
  )
}

const validate = values => {
  const errors = {}

  _.each(FIELDS, ({name}) => {
    if(!values[name]){
      errors[name] = 'You must provide a value'
    }
  })

  errors.emails = validateEmails(values.emails || '')

  return errors
}

export default reduxForm({
  validate,
  form: 'surveyForm',
})(SurveyForm)
