import React from 'react';
import { BaseForm } from './BaseForm';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TField } from './interface';

export default function DemoBaseForm() {
  const formField: Record<string, TField> = {
    name: {
      name: 'name',
      className: 'col-span-6',
      label: `<span className="text-red-600">*</span> Name`,
      component: 'Input',
      placeholder: 'Press Name',
      value: ''
    },
    phone: {
      name: 'phone',
      className: 'col-span-6',
      label: 'Phone',
      component: 'TextArea',
      placeholder: 'Press Phone',
      value: ''
    }
  };

  const initialValues = Object.keys(formField).map((key: string) => {
    return { [key]: formField[key].value };
  });
  console.log('initialValues: ', initialValues);
  const formik = useFormik({
    initialValues: {
      full_name: '',
      email: '',
      password: '',
      confirm_password: ''
    },
    validationSchema: Yup.object({
      full_name: Yup.string()
        .min(2, 'Mininum 2 characters')
        .max(15, 'Maximum 15 characters')
        .required('Required!'),
      email: Yup.string().email('Invalid email format').required('Required!'),
      password: Yup.string().min(8, 'Minimum 8 characters').required('Required!'),
      confirm_password: Yup.string()
        .oneOf([Yup.ref('password')], "Password's not match")
        .required('Required!')
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  return (
    <div>
      <BaseForm formField={formField} />
    </div>
  );
}
