import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjectsData } from '../../../redux/actionsCreater';
import { useNavigate } from 'react-router-dom';

import DialogWindow from '../../dialogWindow/DialogWindow';
import EditTreeElementForm from '../../forms/editTreeElementForm/EditTreeElementForm';
import AddTreeFoldertForm from '../../forms/addTreeFolderForm/AddTreeFoldertForm';
import ConfirmWindow from '../../confirmWindow/ConfirmWindow';

import AddProjectFolderForm from '../../forms/addProjectFolderForm/AddProjectFolderForm';

import { Tree } from 'primereact/tree';
import { Button } from 'primereact/button';

import TreeNode from 'primereact/treenode';

import { formatDataToList } from '../../../helpers/formatDataToList';
import {
  createTemplateFolder,
  formatDataToTree,
} from '../../../helpers/formatDataToTree';
import { addFolder } from '../../../helpers/addFolder';
import {
  findNodeForEdit,
  createEditedTree,
  createTreeForRender,
} from '../../../helpers/editTree';
import { dataFolderNames } from '../../../helpers/constants';
import { deleteFolder } from '../../../helpers/deleteFolder';

import { ProjectsDataTreeItemType, StateType } from '../../../types/types';

import { sendDataToDatabase } from '../../../serviсes/db';

import { auth } from '../../../serviсes/firebase';

import './home.scss';

import DeckMapScatterPlot from '../../maps/DeckMapScatterplot';
import DeckMapGrid from '../../maps/DeckMapGrid';
import PigeonMap from '../../maps/PigeonMap';
import MyLeafletMap from '../../maps/MyLeafletMap';
import SimpleMap from '../../maps/SimpleMap';
import MyGoogleMap from '../../maps/MyGoogleMap';

const Home = () => {
  const mapStatusButton = {
    close: 'Закрыть',
    open: 'Открыть',
  };

  const [mapDeckScatterPlotIsActive, setMapDeckScatterPlotIsActive] =
    useState(false);
  const [mapDeckGridIsActive, setMapDeckGridIsActive] = useState(false);
  const [mapPigeonIsActive, setMapPigeonIsActive] = useState(false);
  const [mapLeafletIsActive, setMapLeafletIsActive] = useState(false);
  const [mapSimpleIsActive, setMapSimpleIsActive] = useState(false);
  const [mapGoogleIsActive, setMapGoogleIsActive] = useState(false);

  const currentUserId = auth.currentUser?.uid;
  const currentUserEmail = auth.currentUser?.email;

  const [confirmWindowIsActive, setConfirmWindowIsActive] = useState(false);

  const navigate = useNavigate();

  const projectsData = useSelector(
    (state: StateType) => state.data.projectsData
  );

  const dispatch = useDispatch();

  const [userEmail, setUserEmail] = useState(currentUserEmail);
  const [dataTree, setDataTree] = useState<ProjectsDataTreeItemType[]>([]);
  const [dialogWindowStatus, setDialogWindowStatus] = useState(false);
  const [dataForEdit, setDataForEdit] =
    useState<ProjectsDataTreeItemType | null>(null);

  const [nodeForAddFolder, setNodeForAddFolder] =
    useState<ProjectsDataTreeItemType | null>(null);

  const formAddProjectFolderData = [
    { inputName: 'projectName', labelName: 'Название проекта' },
  ];

  useEffect(() => {
    if (currentUserId) {
      dispatch(fetchProjectsData(currentUserId));
    }
    if (userEmail) {
      setUserEmail(userEmail);
    }
  }, []);

  useEffect(() => {
    setDataTree(formatDataToTree(projectsData));
  }, [projectsData]);

  const selectNodeForEdit = (event: any) => {
    const editNode = findNodeForEdit(dataTree, event.node);
    setNodeForAddFolder(null);
    setDataForEdit(editNode);
  };

  const editDataTree = (editedNode: ProjectsDataTreeItemType) => {
    const newTree = createEditedTree(dataTree, editedNode);
    setDataTree(newTree);
  };

  const deleteNodeHandler = (event: any, node: ProjectsDataTreeItemType) => {
    event.stopPropagation();
    switch (node.data) {
      case dataFolderNames.projectName:
        sendDataToDatabase(
          currentUserId,
          formatDataToList(
            dataTree.filter(
              (itemTree: ProjectsDataTreeItemType) => itemTree.key !== node.key
            )
          )
        );
        break;
      case dataFolderNames.position:
        sendDataToDatabase(
          currentUserId,
          formatDataToList(deleteFolder(dataTree, node, node.key[0]))
        );
        break;
      case dataFolderNames.nameAndPhone:
        sendDataToDatabase(
          currentUserId,
          formatDataToList(deleteFolder(dataTree, node, node.key.slice(0, 3)))
        );
        break;
    }

    setDataForEdit(null);
  };

  const addNodeHandler = (event: any, node: ProjectsDataTreeItemType) => {
    event.stopPropagation();
    setDataForEdit(null);
    setNodeForAddFolder(node);
  };

  const loginOut = () => {
    auth.signOut();
    setConfirmWindowIsActive(false);
    navigate('/');
  };

  const addProjectFolder = (folderData: any) => {
    const newFolder = createTemplateFolder(
      dataTree.length.toString(),
      folderData.projectName,
      dataFolderNames.projectName
    );

    sendDataToDatabase(
      currentUserId,
      formatDataToList([...dataTree, newFolder])
    );

    setDialogWindowStatus(false);
  };

  const saveEditedData = () => {
    sendDataToDatabase(currentUserId, formatDataToList(dataTree));
    setDataForEdit(null);
  };

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
      {mapDeckScatterPlotIsActive && (
        <div className="map-container">
          <DeckMapScatterPlot />
        </div>
      )}
      {mapDeckGridIsActive && (
        <div className="map-container">
          <DeckMapGrid />
        </div>
      )}
      {mapPigeonIsActive && (
        <div className="map-container">
          <PigeonMap />
        </div>
      )}
      {mapLeafletIsActive && (
        <div className="map-container">
          <MyLeafletMap />
        </div>
      )}
      {mapSimpleIsActive && (
        <div className="map-container">
          <SimpleMap />
        </div>
      )}
      {mapGoogleIsActive && (
        <div className="map-container">
          <MyGoogleMap />
        </div>
      )}
      <div
        className="user-name-container"
        onClick={() => setConfirmWindowIsActive(true)}
      >
        <span className="user-field-name">User:</span>
        <span className="user-name">{userEmail}</span>
      </div>
      {confirmWindowIsActive && (
        <ConfirmWindow
          cancel={() => setConfirmWindowIsActive(false)}
          confirm={loginOut}
        />
      )}

      <div className="information">
        <div className="content">
          {!dataTree.length ? (
            <div className="message-no-data">
              <p>Данные для отображения отсутствуют</p>
            </div>
          ) : (
            <Tree
              value={createTreeForRender(dataTree) as TreeNode[]}
              nodeTemplate={nodeTemplate}
              className="tree"
              selectionMode="single"
              onSelect={selectNodeForEdit}
            />
          )}
        </div>
        <DialogWindow
          showDialog={() => setDialogWindowStatus(true)}
          hideDialog={() => setDialogWindowStatus(false)}
          displayBasic={dialogWindowStatus}
          buttonName="Добавить новый проект"
        >
          <AddProjectFolderForm
            data={formAddProjectFolderData}
            sendData={addProjectFolder}
          />
        </DialogWindow>
        <Button
          className="p-mr-3"
          label={`${
            mapDeckScatterPlotIsActive
              ? mapStatusButton.close
              : mapStatusButton.open
          } карту Deck ScatterPlot`}
          onClick={() =>
            setMapDeckScatterPlotIsActive(!mapDeckScatterPlotIsActive)
          }
        />
        <Button
          className="p-mr-3"
          label={`${
            mapDeckGridIsActive ? mapStatusButton.close : mapStatusButton.open
          } карту Deck Grid`}
          onClick={() => setMapDeckGridIsActive(!mapDeckGridIsActive)}
        />
        <Button
          className="p-mr-3"
          label={`${
            mapPigeonIsActive ? mapStatusButton.close : mapStatusButton.open
          } карту Pigeon`}
          onClick={() => setMapPigeonIsActive(!mapPigeonIsActive)}
        />
        <Button
          className="p-mr-3"
          label={`${
            mapLeafletIsActive ? mapStatusButton.close : mapStatusButton.open
          } карту Leaflet`}
          onClick={() => setMapLeafletIsActive(!mapLeafletIsActive)}
        />
        <Button
          className="p-mr-3 p-mt-3"
          label={`${
            mapSimpleIsActive ? mapStatusButton.close : mapStatusButton.open
          } карту SimpleMap`}
          onClick={() => setMapSimpleIsActive(!mapSimpleIsActive)}
        />
        <Button
          className="p-mt-3"
          label={`${
            mapGoogleIsActive ? mapStatusButton.close : mapStatusButton.open
          } карту GoogleMap`}
          onClick={() => setMapGoogleIsActive(!mapGoogleIsActive)}
        />
      </div>
      <div className="edit-form-container">
        {dataForEdit && (
          <EditTreeElementForm
            data={dataForEdit}
            editingData={editDataTree}
            sendEditedData={saveEditedData}
          />
        )}
        {nodeForAddFolder && (
          <AddTreeFoldertForm
            node={nodeForAddFolder}
            sendAddedFolder={(addedFolder) =>
              sendDataToDatabase(
                currentUserId,
                formatDataToList(
                  addFolder(dataTree, nodeForAddFolder, addedFolder)
                )
              )
            }
          />
        )}
      </div>
    </div>
  );
};

export default Home;
