import { FC, ReactNode } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import './dialogWindow.scss';

import 'primeflex/primeflex.scss';

type DialogWindowPropsType = {
  children: any;
  showDialog: () => void;
  hideDialog: () => void;
  displayBasic: boolean;
  buttonName: string;
};

const DialogWindow: FC<DialogWindowPropsType> = ({
  children,
  showDialog,
  hideDialog,
  displayBasic,
  buttonName,
}) => {
  return (
    <div>
      <Button
        className="p-m-4"
        label={buttonName}
        icon="pi pi-external-link"
        onClick={showDialog}
      />
      <Dialog
        // className="dialog-window p-fluid p-formgrid p-grid"
        visible={displayBasic}
        style={{ width: '100vw' }}
        onHide={hideDialog}
        resizable
      >
        {children}
      </Dialog>
    </div>
  );
};

export default DialogWindow;
