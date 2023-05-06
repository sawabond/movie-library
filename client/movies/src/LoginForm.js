import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
    flexDirection: 'column',
    width: '50%',
    padding: '10%',
    borderRadius: '12px',
    margin: '0 auto',
    maxWidth: '500px',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));
function LoginForm() {
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
  });
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios
        .post('http://localhost:5100/login', {
          ...values,
        })
        .then((res) => {
          localStorage.setItem('token', res.data.token);
          window.location.replace('/main');
        })
        .catch((err) => alert('Unable to login you'));
    },
  });

  const classes = useStyles();

  return (
    <form className={classes.form} onSubmit={formik.handleSubmit}>
      <TextField
        id="username"
        name="username"
        label="Username"
        variant="outlined"
        value={formik.values.username}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
      />
      <TextField
        id="password"
        name="password"
        label="Password"
        type="password"
        variant="outlined"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      <Button
        className={classes.submitButton}
        variant="contained"
        color="primary"
        type="submit"
        disabled={formik.isSubmitting || !formik.isValid}
      >
        Submit
      </Button>
    </form>
  );
}

export default LoginForm;
