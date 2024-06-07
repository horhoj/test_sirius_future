import { CSSTransition } from 'react-transition-group';
import { ComponentProps, ReactNode, useRef, useEffect } from 'react';
import classNames from 'classnames';
import styles from './Drawer.module.scss';
import { Portal } from '~/ui/Portal';

interface DrawerProps {
  isOpen: boolean;
  children?: ReactNode;
  onClose: () => void;
  position?: 'left' | 'right';
}
export function Drawer({ isOpen, children, onClose, position = 'left' }: DrawerProps) {
  const refBackground = useRef<HTMLDivElement>(null);
  const refLeftMenu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const contentCSSTransitionClassName: ComponentProps<typeof CSSTransition>['classNames'] =
    position === 'left'
      ? {
          enter: styles.contentLeftEnter,
          enterActive: styles.contentLeftEnterActive,
          exit: styles.contentLeftExit,
          exitActive: styles.contentLeftExitActive,
        }
      : {
          enter: styles.contentRightEnter,
          enterActive: styles.contentRightEnterActive,
          exit: styles.contentRightExit,
          exitActive: styles.contentRightExitActive,
        };

  const contentClassName = classNames(
    styles.content,
    position === 'left' && styles.contentLeft,
    position === 'right' && styles.contentRight,
  );

  return (
    <Portal>
      <CSSTransition
        in={isOpen}
        nodeRef={refBackground}
        timeout={300}
        unmountOnExit
        classNames={{
          enter: styles.backgroundEnter,
          enterActive: styles.backgroundEnterActive,
          exit: styles.backgroundExit,
          exitActive: styles.backgroundExitActive,
        }}
      >
        <div className={styles.DrawerBackground} ref={refBackground} onClick={onClose} />
      </CSSTransition>
      <CSSTransition
        in={isOpen}
        nodeRef={refLeftMenu}
        timeout={300}
        unmountOnExit
        classNames={contentCSSTransitionClassName}
      >
        <div className={contentClassName} ref={refLeftMenu}>
          {children}
        </div>
      </CSSTransition>
    </Portal>
  );
}
