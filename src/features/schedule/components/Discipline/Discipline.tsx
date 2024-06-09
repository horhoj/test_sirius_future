import { memo, useEffect, useState } from 'react';
import { scheduleSlice } from '../../scheduleSlice';
import styles from './Discipline.module.scss';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { todo } from '~/utils/todo';

function DisciplineComponent() {
  const dispatch = useAppDispatch();
  const fetchDisciplineListRequest = useAppSelector((state) => state.schedule.fetchDisciplineListRequest);
  const [value, setValue] = useState('0');

  useEffect(() => {
    dispatch(scheduleSlice.thunks.fetchDisciplineListThunk());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    todo();
  };

  return (
    <div className={styles.Discipline}>
      {fetchDisciplineListRequest.data && (
        <>
          <select className={styles.select} value={value} onChange={handleChange}>
            <option key={'0'} value={'0'}>
              Выбрать предмет
            </option>
            {fetchDisciplineListRequest.data.map((el) => (
              <option key={el.id} value={el.id}>
                {el.title}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
}

export const Discipline = memo(DisciplineComponent);
