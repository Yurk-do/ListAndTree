import { FC, useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { ProjectsDataTreeItemType } from '../../types/types';

import './formForEdit.scss';

interface FormPropsType {
  data: ProjectsDataTreeItemType;
  sendEditedData: (data: ProjectsDataTreeItemType) => void;
}

const FormForEdit: FC<FormPropsType> = ({ data, sendEditedData }) => {
  const [editData, setEditData] = useState(data);

  const changeInputData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditData((previousFormData) => ({
      ...previousFormData,
      label: event.target.value,
    }));
  };

  useEffect(() => {
    setEditData(data);
  }, [data]);

  return (
    <div className="form-edit-container">
      {
        <form
          className="p-d-flex p-flex-column p-mt-6 p-jc-center "
          onSubmit={(event) => event.preventDefault()}
        >
          {
            <div className="p-field p-col-12 p-pt-5" key={editData.data}>
              <label htmlFor="fullName" className="p-mr-5 p-d-block">
                {editData.data}
              </label>
              <InputText
                id={editData.data}
                value={editData.label}
                onChange={changeInputData}
              />
            </div>
          }
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
