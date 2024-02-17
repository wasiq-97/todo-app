import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface IProps {
    onCreateTodo:(val:any)=>void
}


export const CreateTodoForm = ({ onCreateTodo }:IProps) => {
  const formik = useFormik({
    initialValues: {
      todo: '',
    },
    validationSchema: Yup.object({
      todo: Yup.string().required('Description is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      onCreateTodo(values);
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
  
      <div className="mb-4">
        <label htmlFor="description" className="text-white block mb-2">Description:</label>
        <textarea
          id="todo"
          name="todo"
          onChange={formik.handleChange}
          value={formik.values.todo}
          className="w-full p-2 border-blue-500 border rounded shadow text-black"
        />
        {formik.touched.todo && formik.errors.todo ? (
          <div className="text-red-500 mt-1">{formik.errors.todo}</div>
        ) : null}
      </div>
      <button
        type="submit"
        className=" btn-effect"
      >
        Create Todo
      </button>
    </form>
  );
};

