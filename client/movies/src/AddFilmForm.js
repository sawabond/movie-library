import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from '@material-ui/core';
import axios from 'axios';
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  year: Yup.number().required('Year is required').positive().integer(),
  imdbRating: Yup.number().required('IMDB rating is required').min(0).max(10),
});
const BASE_URL = 'http://localhost:5100';
const token = localStorage.getItem('token');
function AddFilmForm() {
  const formik = useFormik({
    initialValues: {
      name: '',
      year: '',
      imdbRating: '',
      isSeries: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${BASE_URL}/films`, values, {
          headers: {
            Authorization: token,
          },
        });
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{
        width: '75%',
        height: '50%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        margin: '0px auto',
        gap: '2%',
        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
        padding: '10%',
        borderRadius: '12px',
        maxWidth: '800px',
      }}
    >
      <h1 style={{ textAlign: 'center' }}>Add a movie/series</h1>

      <TextField
        id="name"
        name="name"
        label="Name"
        variant="outlined"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      <TextField
        id="year"
        name="year"
        label="Year"
        type="number"
        variant="outlined"
        value={formik.values.year}
        onChange={formik.handleChange}
        error={formik.touched.year && Boolean(formik.errors.year)}
        helperText={formik.touched.year && formik.errors.year}
      />
      <TextField
        id="imdbRating"
        name="imdbRating"
        label="IMDB Rating"
        type="number"
        variant="outlined"
        value={formik.values.imdbRating}
        onChange={formik.handleChange}
        error={formik.touched.imdbRating && Boolean(formik.errors.imdbRating)}
        helperText={formik.touched.imdbRating && formik.errors.imdbRating}
      />
      <FormControlLabel
        control={
          <Checkbox
            id="isSeries"
            name="isSeries"
            color="primary"
            checked={formik.values.isSeries}
            onChange={formik.handleChange}
          />
        }
        label="Is Series"
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
}

export default AddFilmForm;
