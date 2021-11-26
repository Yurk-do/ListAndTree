import { FC, useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { ProjectsDataTreeItemType } from '../../types/types';
import { dataFolderNames } from '../../helpers/constants';

import './formForEdit.scss';

interface FormPropsType {
  data: ProjectsDataTreeItemType;
  sendEditedData: (data: ProjectsDataTreeItemType) => void;
}

const FormForEdit: FC<FormPropsType> = ({ data, sendEditedData }) => {
  console.log(data);

  const [editData, setEditData] = useState(data);

  const changeInputData = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editData.data === dataFolderNames.nameAndPhone) {
      const newLabel = {
        [event.target.id]: event.target.value,
      };
      setEditData((previousEditData) => ({
        ...previousEditData,
        // @ts-ignore
        label: { ...previousEditData.label, ...newLabel },
      }));
    } else {
      setEditData((previousEditData) => ({
        ...previousEditData,
        label: event.target.value,
      }));
    }
  };

  useEffect(() => {
    setEditData(data);
    sendEditedData(editData);
    console.log(editData);
  }, [data, editData]);

  return (
    <div className="form-edit-container">
      {
        <form
          className="p-d-flex p-flex-column p-mt-6 p-jc-center "
          onSubmit={(event) => event.preventDefault()}
        >
          {editData.data === dataFolderNames.nameAndPhone ? (
            <>
              <div className="p-field p-col-12 p-pt-5" key={editData.data}>
                <label htmlFor="fullName" className="p-mr-5 p-d-block">
                  Name:
                </label>
                <InputText
                  id="name"
                  // @ts-ignore
                  value={editData.label.name}
                  onChange={changeInputData}
                />
              </div>
              <div className="p-field p-col-12 p-pt-5" key={editData.data}>
                <label htmlFor="fullName" className="p-mr-5 p-d-block">
                  Phone:
                </label>
                <InputText
                  id="phone"
                  // @ts-ignore
                  value={editData.label.phone}
                  onChange={changeInputData}
                />
              </div>
            </>
          ) : (
            <div className="p-field p-col-12 p-pt-5" key={editData.data}>
              <label htmlFor="fullName" className="p-mr-5 p-d-block">
                {editData.data}
              </label>
              <InputText
                id={editData.data}
                // @ts-ignore
                value={editData.label}
                onChange={changeInputData}
              />
            </div>
          )}
          <div>
            <Button
              label="Сохранить изменения"
              icon="pi pi-check"
              autoFocus
              onClick={() => sendEditedData(editData)}
            />
          </div>
        </form>
      }
    </div>
  );
};

export default FormForEdit;
