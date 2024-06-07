import { ComponentProps } from 'react';
import { Button } from '../Button';
import styles from './Table.module.scss';

type DataItem = Record<string, any>;

interface TableProps<T extends DataItem> {
  columns: { id: string; title: string; key: keyof T }[];
  data: T[];
  onDelete: (rowId: string) => void;
  onEdit: (rowId: string) => void;
  isLoading: boolean;
}

export type Columns<T extends DataItem> = NonNullable<ComponentProps<typeof Table<T>>['columns']>;

export function Table<T extends DataItem>({ columns, data, onDelete, onEdit, isLoading }: TableProps<T>) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.Table}>
        <thead>
          <tr>
            <th>№</th>
            <th>Actions</th>
            {columns.map((column) => (
              <th key={column.id}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={row.id}>
              <td>{i + 1}</td>
              <td>
                <span className={styles.actionsContent}>
                  <Button onClick={() => onEdit(row.id)} className={styles.actionBtn} disabled={isLoading}>
                    E
                  </Button>
                  <Button onClick={() => onDelete(row.id)} className={styles.actionBtn} disabled={isLoading}>
                    D
                  </Button>
                </span>
              </td>
              {columns.map((column) => (
                <td key={column.id}>{row[column.key] ?? '_'}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
