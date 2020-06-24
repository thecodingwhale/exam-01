import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import * as Yup from 'yup';
import { REGISTER_USER } from '@nostack/no-stack';

import RegistrationField from './RegistrationField';
import { Wrapper, Row, ErrorContainer } from './RegistrationForm.style';
import StyledForm from '../../styles';

const initialValues = {
  name: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirmation: ''
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .label('name')
    .required('Please enter desired username.'),
  firstName: Yup.string()
    .label('firstName')
    .required('Please enter your first name.'),
  lastName: Yup.string()
    .label('lastName')
    .required('Please enter your last name.'),
  email: Yup.string()
    .label('email')
    .email('Enter a valid email.')
    .required('Please enter your email.'),
  password: Yup.string()
    .label('password')
    .matches(/(?=.*\d)/, 'Must have at least one numerical character')
    .matches(
      /(?=.*[#?!@$%^&*-.,:;'"><[\]{}()_|\\/~])/,
      'Must have at least one special character.'
    )
    .min(8, 'Must be at least 8 characters.')
    .required('Please enter your desired password.'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), '', null], 'Passwords must match.')
    .required('Please confirm your password.')
});

const RegistrationForm = ({ userClassId, onSuccess }) => {
  const [register] = useMutation(REGISTER_USER);
  const [registrationCompleted, setRegistrationCompleted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (values, { setSubmitting }) => {
    setFormError('');

    if (values.password !== values.passwordConfirmation) {
      return;
    }

    try {
      await register({
        variables: {
          userClassId,
          name: values.name,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password
        }
      });

      setRegistrationCompleted(true);

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.log(error);
      console.log(error.graphQLErrors);

      setFormError('Something went wrong. Please try again.');
    }

    setSubmitting(false);
  };

  if (registrationCompleted) {
    return (
      <Wrapper>
        <p>
          Please check your email and confirm that you are really you. Then you
          can log in!
        </p>
      </Wrapper>
    );
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid, dirty, isValidating }) => (
        <StyledForm className="max-w-sm mx-auto">
          <h1>Sign Up</h1>
          <RegistrationField fieldLabel="Username:" type="text" name="name" />
          <RegistrationField
            fieldLabel="First Name:"
            type="text"
            name="firstName"
          />
          <RegistrationField
            fieldLabel="Last Name:"
            type="text"
            name="lastName"
          />
          <RegistrationField fieldLabel="Email:" type="email" name="email" />
          <RegistrationField
            fieldLabel="Password:"
            type="password"
            name="password"
          />
          <RegistrationField
            fieldLabel="Confirm Password:"
            type="password"
            name="passwordConfirmation"
          />
          <div>
            <button
              type="submit"
              disabled={isSubmitting || !isValid || isValidating || !dirty}
            >
              Sign Up!
            </button>
            {formError && <ErrorContainer>{formError}</ErrorContainer>}
          </div>
        </StyledForm>
      )}
    </Formik>
  );
};

export default RegistrationForm;
