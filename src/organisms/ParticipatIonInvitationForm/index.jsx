import { useState } from 'react';
import { useRouter } from 'next/router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Alert } from 'react-bootstrap';

import { TextFieldGroup } from 'src/molecules/TextFieldGroup';
import { FileFieldGroup } from 'src/molecules/FileFieldGroup';
import { SendButton } from 'src/molecules/SendButton';

import t from 'src/Locales/ar/centers/researchCenter/sciencePublishing/participationInvitation.json';
import tForms from 'src/Locales/ar/forms';

import styles from './style.module.css';

export const ParticipatIonInvitationForm = ({ endPoint }) => {
  const [formErrors, setFormErrors] = useState([]);
  const [status, setStatus] = useState(false);

  const [cvDoc, setCvDoc] = useState(t.form.cv.title);
  const [disabledButton, setDisabledButton] = useState(false);

  const requestSchema = Yup.object().shape({
    bookTitle: Yup.string()
      .min(2, t.form.bookTitle.error)
      .required(tForms.require),

    brief: Yup.string().min(3, t.form.brief.error).required(tForms.require),

    name: Yup.string().min(3, t.form.name.error).required(tForms.require),

    email: Yup.string().email(t.form.email.error).required(tForms.require),

    phone: Yup.string().required(tForms.require),

    index: Yup.mixed().required(tForms.require),

    cv: Yup.mixed().required(tForms.require),
  });
  const router = useRouter();

  const formErrorsList = formErrors.map(formError => (
    <p key={formError}>{formError}</p>
  ));

  return (
    <Formik
      initialValues={{
        bookTitle: '',
        brief: '',
        name: '',
        phone: '',
        email: '',
        index: '',
        cv: '',
      }}
      validationSchema={requestSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setDisabledButton(true);

        const dataForm = new FormData();
        dataForm.append('special[booktitle]', values.bookTitle);
        dataForm.append('special[bookbrief]', values.brief);
        dataForm.append('name', values.name);
        dataForm.append('email', values.email);
        dataForm.append('special[phone]', values.phone);
        dataForm.append('special[index]', values.index);
        dataForm.append('special[cv]', values.cv);

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
              setCvDoc(t.form.select.cv);
              setIndexDoc(t.index_placeholder);
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
        setFieldValue,
      }) => (
        <form
          className={styles.ParticipatIonInvitationForm}
          onSubmit={handleSubmit}
        >
          <p>{t.intro}</p>

          <TextFieldGroup
            label={t.form.bookTitle.title}
            labelTarget={'bookTitle'}
            errors={errors.bookTitle}
            touched={touched.bookTitle}
            placeholder={t.form.bookTitle.placeholder}
            name={'bookTitle'}
            value={values.bookTitle}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <TextFieldGroup
            label={t.form.brief.title}
            labelTarget={'brief'}
            errors={errors.brief}
            touched={touched.brief}
            placeholder={t.form.brief.placeholder}
            name={'brief'}
            value={values.brief}
            onChange={handleChange}
            onBlur={handleBlur}
          />

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
            placeholder={t.form.phone.placeholder}
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

          <FileFieldGroup
            label={t.form.cv}
            labelTarget={'cv'}
            id='cv'
            name='cv'
            onBlur={handleBlur}
            errors={errors.cv}
            touched={touched.cv}
            setFieldValue={setFieldValue}
            stateName={cvDoc}
            setStateName={setCvDoc}
          />

          <TextFieldGroup
            label={t.form.researchTitle.title}
            labelTarget={'researchTitle'}
            errors={errors.researchTitle}
            touched={touched.researchTitle}
            placeholder={t.form.researchTitle.title}
            name={'researchTitle'}
            value={values.researchTitle}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <TextFieldGroup
            label={t.form.researchType.title}
            labelTarget={'researchType'}
            errors={errors.researchType}
            touched={touched.researchType}
            placeholder={t.form.researchType.title}
            name={'researchType'}
            value={values.researchType}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <TextFieldGroup
            label={t.form.creationDate.title}
            labelTarget={'creationDate'}
            errors={errors.creationDate}
            touched={touched.creationDate}
            placeholder={t.form.creationDate.title}
            name={'creationDate'}
            value={values.creationDate}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <TextFieldGroup
            label={t.form.isPublished.title}
            labelTarget={'isPublished'}
            errors={errors.isPublished}
            touched={touched.isPublished}
            placeholder={t.form.isPublished.title}
            name={'isPublished'}
            value={values.isPublished}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <p>{t.note}</p>

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
