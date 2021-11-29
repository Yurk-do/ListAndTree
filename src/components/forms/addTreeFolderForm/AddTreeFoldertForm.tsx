import { FC, useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import {
  ProjectsDataTreeItemType,
  NameAndPhoneFolderType,
} from '../../../types/types';
import { dataFolderNames } from '../../../helpers/constants';

import { createNewFolder } from '../../../helpers/addFolder';

interface AddTreeFolderFormType {
  node: ProjectsDataTreeItemType;
  sendAddedFolder: (data: ProjectsDataTreeItemType) => void;
}

const AddTreeFoldertForm: FC<AddTreeFolderFormType> = ({
  node,
  sendAddedFolder,
}) => {
  const newFolder = createNewFolder(node);

  const [addedFolder, setAddedFolder] =
    useState<ProjectsDataTreeItemType>(newFolder);

  const changeInputData = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (addedFolder.data === dataFolderNames.nameAndPhone) {
      const newLabel = {
        [event.target.id]: event.target.value,
      };
      setAddedFolder((previousFolder) => ({
        ...previousFolder,
        label: {
          ...(previousFolder.label as NameAndPhoneFolderType),
          ...newLabel,
        },
      }));
    } else {
      setAddedFolder((previousFolder) => ({
        ...previousFolder,
        label: event.target.value,
      }));
    }
  };
  useEffect(() => {
    setAddedFolder(newFolder);
  }, [node]);

  return (
    <div>
      <h2>Форма для добавления записи</h2>
      <form
        className="p-d-flex p-flex-column p-mt-6 p-jc-center "
        onSubmit={(event) => event.preventDefault()}
      >
        {addedFolder.data === dataFolderNames.nameAndPhone ? (
          <>
            <div className="p-field p-col-12 p-pt-5" key={addedFolder.data}>
              <label htmlFor="fullName" className="p-mr-5 p-d-block">
                Name:
              </label>
              <InputText
                id="name"
                value={(addedFolder.label as NameAndPhoneFolderType).name}
                onChange={changeInputData}
              />
            </div>
            <div className="p-field p-col-12 p-pt-5" key={addedFolder.data}>
              <label htmlFor="fullName" className="p-mr-5 p-d-block">
                Phone:
              </label>
              <InputText
                id="phone"
                value={(addedFolder.label as NameAndPhoneFolderType).phone}
                onChange={changeInputData}
              />
            </div>
          </>
        ) : (
          <div className="p-field p-col-12 p-pt-5" key={addedFolder.data}>
            <label htmlFor="fullName" className="p-mr-5 p-d-block">
              {addedFolder.data}
            </label>
            <InputText
              value={addedFolder.label as string}
              onChange={changeInputData}
            />
          </div>
        )}
        <div>
          <Button
            label="Добавить запись"
            icon="pi pi-check"
            autoFocus
            onClick={() => sendAddedFolder(addedFolder)}
          />
        </div>
      </form>
    </div>
  );
};

export default AddTreeFoldertForm;
