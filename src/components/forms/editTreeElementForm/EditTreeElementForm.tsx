import { FC, useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import {
  ProjectsDataTreeItemType,
  NameAndPhoneFolderType,
} from '../../../types/types';
import { dataFolderNames } from '../../../helpers/constants';

import './editTreeElementForm.scss';

interface FormPropsType {
  data: ProjectsDataTreeItemType;
  editingData: (data: ProjectsDataTreeItemType) => void;
  sendEditedData: (data: ProjectsDataTreeItemType) => void;
}

const EditTreeElementForm: FC<FormPropsType> = ({ data, editingData, sendEditedData }) => {
  const [editData, setEditData] = useState(data);

  const changeInputData = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editData.data === dataFolderNames.nameAndPhone) {
      const newLabel = {
        [event.target.id]: event.target.value,
      };
      setEditData((previousEditData) => ({
        ...previousEditData,
        label: {
          ...(previousEditData.label as NameAndPhoneFolderType),
          ...newLabel,
        },
      }));
    } else {
      setEditData((previousEditData) => ({
        ...previousEditData,
        label: event.target.value,
      }));
    }
  };

  useEffect(() => {
    editingData(editData);
    setEditData(data);
  }, [data, editData]);

  return (
    <div>
      <h2>Форма для редактирования</h2>
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
                value={(editData.label as NameAndPhoneFolderType).name}
                onChange={changeInputData}
              />
            </div>
            <div className="p-field p-col-12 p-pt-5" key={editData.data}>
              <label htmlFor="fullName" className="p-mr-5 p-d-block">
                Phone:
              </label>
              <InputText
                id="phone"
                value={(editData.label as NameAndPhoneFolderType).phone}
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
              value={editData.label as string}
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
    </div>
  );
};

export default EditTreeElementForm;
