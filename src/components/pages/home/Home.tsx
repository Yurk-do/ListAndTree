import { useEffect, useState } from 'react';
import DialogWindow from '../../dialogWindow/DialogWindow';
import FormForAdd from '../../formForAdd/FormForAdd';
import FormForEdit from '../../formForEdit/FormForEdit';

import './home.scss';
import { Tree } from 'primereact/tree';
import { Button } from 'primereact/button';

import { formatDataToTree } from '../../../helpers/formatDataToTree';
import {
  ProjectsDataListItemType,
  ProjectsDataTreeItemType,
  StateType,
} from '../../../types/types';

import { useSelector, useDispatch } from 'react-redux';
import { setProjectsData } from '../../../redux/actionsCreater';

import {
  findNodeForEdit,
  createEditedTree,
  createTreeForRender,
} from '../../../helpers/editTree';
import { dataFolderNames } from '../../../helpers/constants';
import {
  deletePositionFolder,
  deleteNameFolder,
} from '../../../helpers/deleteFolders';

const Home = () => {
  const dataTypes = {
    list: 'list',
    tree: 'tree',
  };

  const projectsData = useSelector(
    (state: StateType) => state.data.projectsData
  );
  const dispatch = useDispatch();

  const [dataTree, setDataTree] = useState<ProjectsDataTreeItemType[]>([]);
  const [dataType, setDataType] = useState(dataTypes.list);
  const [dialogWindowStatus, setDialogWindowStatus] = useState(false);
  const [dataForEdit, setDataForEdit] =
    useState<ProjectsDataTreeItemType | null>(null);

  const saveProjectsData = (data: ProjectsDataListItemType[]) => {
    dispatch(setProjectsData(data));
    setDialogWindowStatus(false);
  };

  const formForAddData = [
    { inputName: 'projectName', labelName: 'Название проекта' },
    { inputName: 'fullName', labelName: 'ФИО' },
    { inputName: 'position', labelName: 'Должность' },
    { inputName: 'phone', labelName: 'Номер телефона' },
  ];

  useEffect(() => {
    setDataTree(formatDataToTree(projectsData));
  }, [projectsData]);

  const editDataTree = (editedNode: ProjectsDataTreeItemType) => {
    const newTree = createEditedTree(dataTree, editedNode);
    setDataTree(newTree);
  };

  const selectNodeForEdit = (event: any) => {
    const editNode = findNodeForEdit(dataTree, event.node);
    setDataForEdit(editNode);
  };

  const deleteNodeHandler = (event: any, node: ProjectsDataTreeItemType) => {
    event.stopPropagation();
    if (node.data === dataFolderNames.projectName) {
      return setDataTree(
        dataTree.filter(
          (itemTree: ProjectsDataTreeItemType) => itemTree.key !== node.key
        )
      );
    }
    if (node.data === dataFolderNames.position) {
      setDataTree(deletePositionFolder(dataTree, node));
    }
    if (node.data === dataFolderNames.nameAndPhone) {
      setDataTree(deleteNameFolder(dataTree, node));
    }
  };

  const addNodeHandler = (event: any, node: ProjectsDataTreeItemType) => {
    event.stopPropagation();
  };

  const nodeTemplate = (node: ProjectsDataTreeItemType) => {
    let label = (
      <div className="tree-node-container p-flex-row p-d-flex p-jc-between">
        <div className="tree-label-container tree-label-row p-mr-5">
          <div className="label">
            <b>{node.label}</b>
          </div>
        </div>
        <div className="tree-node-button-container">
          <Button
            label="Delete"
            className="button-delete p-button-rounded p-button-danger p-button-sm"
            onClick={(event) => deleteNodeHandler(event, node)}
          />
          {node.data !== dataFolderNames.nameAndPhone && (
            <Button
              label="Add"
              className=" p-button-rounded button-add p-ml-5 p-button-sm"
              onClick={(event) => addNodeHandler(event, node)}
            />
          )}
        </div>
      </div>
    );

    return <span>{label}</span>;
  };

  return (
    <div className="main-container p-d-flex p-flex-row p-flex-nowrap p-jc-around">
      <div className="information">
        <Button
          className="button-toggle p-mr-4"
          name={dataTypes.list}
          label={dataTypes.list}
          onClick={(event) => setDataType(event.currentTarget.name)}
        />
        <Button
          className="button-toggle"
          name={dataTypes.tree}
          label={dataTypes.tree}
          onClick={(event) => setDataType(event.currentTarget.name)}
        />
        <div className="content">
          {!dataTree.length && (
            <div className="message-no-data">
              <p>Данные для отображения отсутствуют</p>
            </div>
          )}
          {dataType === dataTypes.tree && (
            <Tree
              // @ts-ignore
              value={createTreeForRender(dataTree)}
              nodeTemplate={nodeTemplate}
              className="tree"
              selectionMode="single"
              onSelect={selectNodeForEdit}
            />
          )}
          {dataType === dataTypes.list && (
            <ol className="list">
              {projectsData.map((item: ProjectsDataListItemType, index) => (
                <li className="list-item" key={index}>
                  Имя сотрудника: {item.fullName}. Должность: {item.position}.
                  Название проекта: "{item.projectName}". Телефон: {item.phone}
                </li>
              ))}
            </ol>
          )}
        </div>
        <DialogWindow
          showDialog={() => setDialogWindowStatus(true)}
          hideDialog={() => setDialogWindowStatus(false)}
          displayBasic={dialogWindowStatus}
        >
          <FormForAdd data={formForAddData} sendData={saveProjectsData} />
        </DialogWindow>
      </div>
      {dataForEdit && (
        <FormForEdit data={dataForEdit} sendEditedData={editDataTree} />
      )}
    </div>
  );
};

export default Home;
