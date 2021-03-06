import _ from "lodash";
import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actions from "../../actions";
import { FIELDS } from "../../utils/validateEmails";

const SurveyFormReview = ({onCancel, formValues, saveSurvey, history}) => {
  const submitSurvey = () => {
    saveSurvey(formValues)
    history.push('/surveys')
  }
  return (
    <div>
      <h5>Pleas confirm your entries</h5>
      <div>
        {
          _.map(FIELDS, ({label, name}) => (
            <div key={name}>
              <label>{label}</label>
              <div>{formValues[name]}</div>
            </div>
          ))
        }
      </div>
      <button
        className='yellow darken-3 white-text btn-flat'
        style={{marginTop: 20}}
        onClick={onCancel}
      >
        Back
      </button>
      <button
        onClick={submitSurvey}
        className='green btn-flat right white-text'
        style={{marginTop: 20}}
      >
        Send Survey
        <i className='material-icons right'>email</i>
      </button>
    </div>
  )
}

const mapStateToProps = ({form}) => {
  return {
    formValues: form.surveyForm.values
  }
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview))
