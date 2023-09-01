import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useRouter } from 'next/router';

import { TextFieldGroup } from 'src/molecules/TextFieldGroup';
import { SendButton } from 'src/molecules/SendButton';

import t from 'src/Locales/ar/centers/researchCenter/encyclopedias/suggestEncyclopedia.json';
import tForms from 'src/Locales/ar/forms';

import styles from './style.module.css';

export const SuggestEncyclopediaForm = ({ endPoint }) => {
  const [formErrors, setFormErrors] = useState([]);
  const [status, setStatus] = useState(false);

  const [disabledButton, setDisabledButton] = useState(false);

  const requestSchema = Yup.object().shape({
    name: Yup.string().min(3, t.form.name.error).required(tForms.require),

    email: Yup.string().email(t.form.email.error).required(tForms.require),

    phone: Yup.string().required(tForms.require),
  });

  const router = useRouter();

  const formErrorsList = formErrors.map(formError => (
    <p key={formError}>{formError}</p>
  ));

  return (
    <Formik
      initialValues={{
        encyclopediaName: '',
        brief: '',
        name: '',
        phone: '',
        email: '',
        plan: '',
      }}
      validationSchema={requestSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setDisabledButton(true);

        const dataForm = new FormData();
        dataForm.append('special[encyclopediabrief]', values.encyclopediaName);
        dataForm.append('special[encyclopediabrief]', values.brief);
        dataForm.append('name', values.name);
        dataForm.append('email', values.email);
        dataForm.append('special[phone]', values.phone);
        dataForm.append('special[plan]', values.plan);

        axios
          .post(`${endPoint}`, dataForm, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(res => {
            if (res.status == 200) {
              setSubmitting(false);
              setStatus(true);
              setFormErrors([]);

              setTimeout(() => {
                setStatus(false);
                router.reload();
              }, 3000);
              resetForm();
              setPlanDoc(t.form.select.plan_placeholder);
            }
          })
          .catch(error => {
            setDisabledButton(false);
            setSubmitting(false);
            setStatus(false);

            setFormErrors(
              error.response.data.errors.map(error => tForms.api_errors[error])
            );
          });
      }}
    >
      {({
        values,
        errors,
        touched,
        isSubmitting,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <form
          className={styles.SuggestEncyclopediaForm}
          onSubmit={handleSubmit}
        >
          <TextFieldGroup
            label={t.form.name.title}
            labelTarget={'name'}
            errors={errors.name}
            touched={touched.name}
            placeholder={t.form.name.title}
            name={'name'}
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <TextFieldGroup
            label={t.form.phone.title}
            labelTarget={'phone'}
            errors={errors.phone}
            touched={touched.phone}
            placeholder={t.form.phone.title}
            name={'phone'}
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <TextFieldGroup
            label={t.form.email.title}
            labelTarget={'email'}
            errors={errors.email}
            touched={touched.email}
            placeholder={t.form.email.title}
            name={'email'}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextFieldGroup
            label={t.form.work.title}
            labelTarget={'work'}
            errors={errors.work}
            touched={touched.work}
            placeholder={t.form.work.title}
            name={'work'}
            value={values.work}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextFieldGroup
            label={t.form.address.title}
            labelTarget={'address'}
            errors={errors.address}
            touched={touched.address}
            placeholder={t.form.address.title}
            name={'address'}
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextFieldGroup
            label={t.form.cv.title}
            labelTarget={'cv'}
            errors={errors.cv}
            touched={touched.cv}
            placeholder={t.form.cv.title}
            name={'cv'}
            value={values.cv}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextFieldGroup
            label={t.form.encyclopediaTopic.title}
            labelTarget={'encyclopediaTopic'}
            errors={errors.encyclopediaTopic}
            touched={touched.encyclopediaTopic}
            placeholder={t.form.encyclopediaTopic.title}
            name={'encyclopediaTopic'}
            value={values.encyclopediaTopic}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextFieldGroup
            label={t.form.researcher.title}
            labelTarget={'researcher'}
            errors={errors.researcher}
            touched={touched.researcher}
            placeholder={t.form.researcher.title}
            name={'researcher'}
            value={values.researcher}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <SendButton
            isSubmitting={isSubmitting}
            disableState={disabledButton}
          />

          {status ? (
            <Alert
              variant='success'
              className='mt-3 text-center'
            >
              {tForms.success}
            </Alert>
          ) : null}

          {formErrors.length > 0 ? (
            <Alert
              variant='danger'
              className='mt-3  text-center'
            >
              {formErrorsList}
            </Alert>
          ) : null}
        </form>
      )}
    </Formik>
  );
};
