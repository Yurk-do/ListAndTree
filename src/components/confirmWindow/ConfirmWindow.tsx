import { FC } from 'react';
import './confirmWindow.scss';

type ConfirmWindowPropsType = {
  confirm: () => void;
  cancel: () => void;
};

const ConfirmWindow: FC<ConfirmWindowPropsType> = ({ confirm, cancel }) => {
  return (
    <div className="container-confirm-window">
      <p className="confirm-window-title">
        Вы уверены, что хотите выйти из профиля?
      </p>
      <div className="confirm-window-button-container">
        <button className="button-confirm" onClick={confirm}>
          Да
        </button>
        <button className="button-cancel" onClick={cancel}>
          Нет
        </button>
      </div>
    </div>
  );
};

export default ConfirmWindow;
