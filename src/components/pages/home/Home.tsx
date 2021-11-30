import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProjectsData } from '../../../redux/actionsCreater';
import { useNavigate } from 'react-router-dom';

import DialogWindow from '../../dialogWindow/DialogWindow';
import AddTreeElementForm from '../../forms/addTreeElementForm/AddTreeElementForm';
import EditTreeElementForm from '../../forms/editTreeElementForm/EditTreeElementForm';
import AddTreeFoldertForm from '../../forms/addTreeFolderForm/AddTreeFoldertForm';
import ConfirmWindow from '../../confirmWindow/ConfirmWindow';

import { Tree } from 'primereact/tree';
import { Button } from 'primereact/button';

import TreeNode from 'primereact/treenode';

import { formatDataToTree } from '../../../helpers/formatDataToTree';
import { addFolder } from '../../../helpers/addFolder';
import {
  findNodeForEdit,
  createEditedTree,
  createTreeForRender,
} from '../../../helpers/editTree';
import { dataFolderNames } from '../../../helpers/constants';
import { deleteFolder } from '../../../helpers/deleteFolder';

import {
  ProjectsDataListItemType,
  ProjectsDataTreeItemType,
  StateType,
} from '../../../types/types';

import { getDatabase, ref, onValue, push, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';

import './home.scss';

const Home = () => {
  const dataTypes = {
    list: 'list',
    tree: 'tree',
  };

  const [confirmWindowIsActive, setConfirmWindowIsActive] = useState(false);

  const navigate = useNavigate();

  const [userEmail, setUserName] = useState('');

  const userId = getAuth().currentUser?.uid;

  const db = getDatabase();

  const setDataToDatabase = (userId: any, data: any) => {
    push(ref(db, 'users/' + userId), data);
  };

  const getDataFromDataBase = () => {
    const snapshot = ref(db, 'users/' + userId);
    onValue(snapshot, (projectsData) => {
      const data = projectsData.val();
      console.log(data);
    });
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

  const [nodeForAddFolder, setNodeForAddFolder] =
    useState<ProjectsDataTreeItemType | null>(null);

  const saveProjectsData = (data: ProjectsDataListItemType[]) => {
    setDataToDatabase(userId, data);
    dispatch(setProjectsData(data));
    setDialogWindowStatus(false);
  };

  const formForAddData = [
    { inputName: 'projectName', labelName: 'Название проекта' },
    { inputName: 'fullName', labelName: 'ФИО' },
    { inputName: 'position', labelName: 'Должность' },
    { inputName: 'phone', labelName: 'Номер телефона' },
  ];

  // useEffect(() => {
  //   getDataFromDataBase();
  //   setDataTree(formatDataToTree(projectsData));
  // }, [projectsData]);

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      setUserName(userEmail);
    }
  }, []);

  const editDataTree = (editedNode: ProjectsDataTreeItemType) => {
    const newTree = createEditedTree(dataTree, editedNode);
    setDataTree(newTree);
  };

  const selectNodeForEdit = (event: any) => {
    const editNode = findNodeForEdit(dataTree, event.node);
    setNodeForAddFolder(null);
    setDataForEdit(editNode);
  };

  const deleteNodeHandler = (event: any, node: ProjectsDataTreeItemType) => {
    event.stopPropagation();
    switch (node.data) {
      case dataFolderNames.projectName:
        setDataTree(
          dataTree.filter(
            (itemTree: ProjectsDataTreeItemType) => itemTree.key !== node.key
          )
        );
        break;
      case dataFolderNames.position:
        setDataTree(deleteFolder(dataTree, node, node.key[0]));
        break;
      case dataFolderNames.nameAndPhone:
        setDataTree(deleteFolder(dataTree, node, node.key.slice(0, 3)));
        break;
    }
    setDataForEdit(null);
  };

  const addNodeHandler = (event: any, node: ProjectsDataTreeItemType) => {
    event.stopPropagation();
    setDataForEdit(null);
    setNodeForAddFolder(node);
  };

  const loginOut = (event: any) => {
    console.log(event)
    console.log('hello');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    setConfirmWindowIsActive(false);

  };

  console.log(confirmWindowIsActive);

  const nodeTemplate = (node: ProjectsDataTreeItemType) => {
    return (
      <div className="tree-node-container p-flex-row p-d-flex p-jc-between">
        <div className="tree-label-container tree-label-row p-mr-5">
          <div className="label">
            <b>{node.label}</b>
          </div>
        </div>
        <div className="tree-node-button-container">
          {node.data !== dataFolderNames.nameAndPhone && (
            <Button
              label="Add"
              className=" p-button-rounded button-add p-mr-4 p-button-sm"
              onClick={(event) => addNodeHandler(event, node)}
            />
          )}
          <Button
            label="Delete"
            className="button-delete p-button-rounded p-button-danger p-button-sm"
            onClick={(event) => deleteNodeHandler(event, node)}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="main-container p-d-flex p-flex-row p-flex-nowrap p-jc-around">
      <div
        className="user-name-container"
        onClick={() => setConfirmWindowIsActive(true)}
      >
        <span className="user-field-name">User:</span>
        <span className="user-name">{userEmail}</span>
        {confirmWindowIsActive && (
          <ConfirmWindow
            cancel={() => setConfirmWindowIsActive(false)}
            confirm={loginOut}
          />
        )}
      </div>
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
              value={createTreeForRender(dataTree) as TreeNode[]}
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
          <AddTreeElementForm
            data={formForAddData}
            sendData={saveProjectsData}
          />
        </DialogWindow>
      </div>
      <div className="edit-form-container">
        {dataForEdit && (
          <EditTreeElementForm
            data={dataForEdit}
            sendEditedData={editDataTree}
          />
        )}
        {nodeForAddFolder && (
          <AddTreeFoldertForm
            node={nodeForAddFolder}
            sendAddedFolder={(addedFolder) =>
              setDataTree(addFolder(dataTree, nodeForAddFolder, addedFolder))
            }
          />
        )}
      </div>
    </div>
  );
};

export default Home;
