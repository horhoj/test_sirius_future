import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect } from 'react';
import { authSlice } from '../../store/authSlice';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import { Button } from '~/ui/Button';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { Input } from '~/ui/Input';
import { getFormikFieldData } from '~/utils/getFormikFieldData';
import { FormResponseErrors } from '~/ui/FormResponseErrors';
import { Form } from '~/ui/Form';
import { FormTitle } from '~/ui/FormTitle';
import { AuthLayout } from '~/layouts/AuthLayout';
import { SiriusLogoIconBig } from '~/assets/icons';
import { Row } from '~/ui/Row';

interface InitialValues {
  email: string;
  password: string;
}

const initialValues: InitialValues = {
  email: 'miha@mail.ru',
  password: '12345678',
};

const VALIDATION_IS_EMPTY_MSG = 'Должно быть заполнено';
const VALIDATION_PASSWORD_MUST_MIN = 'Пароль должен иметь 8 символов минимум';

const validationSchema: yup.ObjectSchema<InitialValues> = yup.object({
  email: yup.string().required(VALIDATION_IS_EMPTY_MSG).email(),
  password: yup.string().required(VALIDATION_IS_EMPTY_MSG).min(8, VALIDATION_PASSWORD_MUST_MIN),
});

export function LoginPage() {
  const dispatch = useAppDispatch();
  useAuthRedirect();
  const formik = useFormik<InitialValues>({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      dispatch(
        authSlice.thunks.loginThunk({
          loginPayload: values,
        }),
      );
    },
  });

  useEffect(
    () => () => {
      dispatch(authSlice.actions.loginRequestClear());
    },
    [],
  );

  const loginRequest = useAppSelector((state) => state.auth.loginRequest);

  const emailFieldData = getFormikFieldData(formik, 'email');
  const passwordFieldData = getFormikFieldData(formik, 'password');

  return (
    <AuthLayout isLoading={loginRequest.isLoading}>
      <Form onSubmit={formik.handleSubmit} noValidate autoComplete={'off'}>
        <Row isCenter={true}>
          <SiriusLogoIconBig />
        </Row>
        <Row mt={32}>
          <FormTitle>Вход в Sirius Future</FormTitle>
        </Row>
        {loginRequest.error && (
          <Row mt={16}>
            <FormResponseErrors responseErrors={loginRequest.error} title={'Ошибка входа в систему'} />
          </Row>
        )}
        <Row mt={16}>
          <Input
            {...emailFieldData.fieldProps}
            placeholder={'E-mail'}
            isError={emailFieldData.isError}
            disabled={loginRequest.isLoading}
          />
        </Row>
        <Row mt={4}>{emailFieldData.errorText}</Row>

        <Row mt={12}>
          <Input
            {...passwordFieldData.fieldProps}
            placeholder={'Пароль'}
            isError={passwordFieldData.isError}
            type={'password'}
            disabled={loginRequest.isLoading}
          />
        </Row>
        <Row mt={4}>{passwordFieldData.errorText}</Row>

        <Row mt={32}>
          <Button type={'submit'} disabled={loginRequest.isLoading} isFullWidth={true}>
            Submit
          </Button>
        </Row>
      </Form>
    </AuthLayout>
  );
}
