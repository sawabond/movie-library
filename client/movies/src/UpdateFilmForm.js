import React, { useEffect } from 'react';
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

function UpdateFilmForm({ film }) {
  const token = localStorage.getItem('token');
  console.log(film);
  const formik = useFormik({
    initialValues: {
      name: '',
      year: '',
      imdbRating: '',
      isSeries: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const BASE_URL = 'http://localhost:5100';
      try {
        const response = await axios.put(
          // `${BASE_URL}/update/${props.film.id}`,
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

  // useEffect(() => {
  //   formik.setValues({
  //     name: props.film.name,
  //     year: props.film.year,
  //     imdbRating: props.film.imdbRating,
  //     isSeries: props.film.isSeries,
  //   });
  // }, [formik, props.film]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        id="name"
        name="name"
        label="Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      <br />
      <TextField
        id="year"
        name="year"
        label="Year"
        type="number"
        value={formik.values.year}
        onChange={formik.handleChange}
        error={formik.touched.year && Boolean(formik.errors.year)}
        helperText={formik.touched.year && formik.errors.year}
      />
      <br />
      <TextField
        id="imdbRating"
        name="imdbRating"
        label="IMDB Rating"
        type="number"
        value={formik.values.imdbRating}
        onChange={formik.handleChange}
        error={formik.touched.imdbRating && Boolean(formik.errors.imdbRating)}
        helperText={formik.touched.imdbRating && formik.errors.imdbRating}
      />
      <br />
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
      <br />
      <Button type="submit" variant="contained" color="primary">
        Update
      </Button>
    </form>
  );
}

export default UpdateFilmForm;
