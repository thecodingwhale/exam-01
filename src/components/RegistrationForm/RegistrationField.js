import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { ErrorContainer } from './RegistrationForm.style';

const RegistrationField = ({ fieldLabel, type, name }) => (
  <div>
    <Field placeholder={fieldLabel} type={type} name={name} />
    <ErrorContainer>
      <ErrorMessage name={name} />
    </ErrorContainer>
  </div>
);

export default RegistrationField;
