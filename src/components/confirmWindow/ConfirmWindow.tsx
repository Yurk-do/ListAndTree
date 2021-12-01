import { FC } from 'react';
import './confirmWindow.scss';
import { Button } from 'primereact/button';

type ConfirmWindowPropsType = {
  cancel: () => void;
  confirm: () => void;
};

const ConfirmWindow: FC<ConfirmWindowPropsType> = ({ cancel, confirm }) => {
  return (
    <div className="container-confirm-window">
      <p className="confirm-window-title">
        Вы уверены, что хотите выйти из профиля?
      </p>
      <div className="confirm-window-button-container">
        <Button label="Да" className="button-confirm" onClick={confirm} />
        <Button label="Нет" className="button-cancel" onClick={cancel} />
      </div>
    </div>
  );
};

export default ConfirmWindow;
