import styles from './FormResponseErrors.module.scss';
import { getUUID } from '~/utils/getUUID';
import { ApiError } from '~/api/common.types';

interface FormResponseErrorsProps {
  responseErrors: ApiError;
  title: string;
}

interface FieldErrorItem {
  id: string;
  errors: string;
}

const ERROR_SEPARATOR = ' ';

export function FormResponseErrors({ responseErrors, title }: FormResponseErrorsProps) {
  const fieldsErrors: FieldErrorItem[] = [];
  const originalFieldsErrors = responseErrors.errors;
  if (originalFieldsErrors !== undefined) {
    const keys = Object.keys(originalFieldsErrors);

    keys.forEach((key) => {
      const fieldError = originalFieldsErrors[key];
      if (fieldError && Array.isArray(fieldError)) {
        fieldsErrors.push({
          id: getUUID(),
          errors: fieldError.join(ERROR_SEPARATOR),
        });
      }
    });
  }

  return (
    <div className={styles.FormResponseErrors}>
      <div className={styles.title}>{title}</div>
      <div>{responseErrors.errorResponseMessage ?? responseErrors.errorMessage}</div>
      <div className={styles.errors}>
        {fieldsErrors.map((fieldError) => (
          <div key={fieldError.id}>{fieldError.errors}</div>
        ))}
      </div>
    </div>
  );
}
