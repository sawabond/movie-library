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
import { useLocation } from 'react-router-dom';
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  year: Yup.number().required('Year is required').positive().integer(),
  imdbRating: Yup.number().required('IMDB rating is required').min(0).max(10),
});

function UpdateFilmForm() {
  const token = localStorage.getItem('token');
  const filmprops = useLocation();
  const formik = useFormik({
    initialValues: {
      ...filmprops.state,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const BASE_URL = 'http://localhost:5100';
      try {
        const response = await axios.put(
          `${BASE_URL}/films/${filmprops.state.id}`,
          values,
          {
            headers: {
              Authorization: token,
            },
          }
        );
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
        Update
      </Button>
    </form>
  );
}

export default UpdateFilmForm;
