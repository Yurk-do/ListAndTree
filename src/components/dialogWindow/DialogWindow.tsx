import { FC, ReactNode } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import './dialogWindow.scss';

import 'primeflex/primeflex.scss';

type DialogWindowPropsType = {
  children: ReactNode;
  showDialog: () => void;
  hideDialog: () => void;
  displayBasic: boolean;
};

const DialogWindow: FC<DialogWindowPropsType> = ({
  children,
  showDialog,
  hideDialog,
  displayBasic,
}) => {
  return (
    <div>
      <Button
        label="Добавить"
        icon="pi pi-external-link"
        onClick={showDialog}
      />
      <Dialog
        className="dialog-window p-fluid p-formgrid p-grid"
        visible={displayBasic}
        style={{ width: '50vw' }}
        onHide={hideDialog}
        resizable
      >
        {children}
      </Dialog>
    </div>
  );
};

export default DialogWindow;
