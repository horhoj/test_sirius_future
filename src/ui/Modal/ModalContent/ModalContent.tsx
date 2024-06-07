import styles from './ModalContent.module.scss';

interface ModalContentProps {
  children?: React.ReactNode;
  className?: string;
}
export function ModalContent({ children, className }: ModalContentProps) {
  return (
    <div className={className ? className : styles.ModalContent} onMouseDown={(e) => e.stopPropagation()}>
      {children}
    </div>
  );
}
