import { useEffect, useState } from "react";
import DialogWindow from "../../dialogWindow/DialogWindow";
import Form from "../../form/Form";

import "./home.css";
import { Tree } from "primereact/tree";
import { Button } from "primereact/button";

import { formatDataToTree } from "../../../helpers/formatDataToTree";
import { ProjectsDataListItemType, StateType } from "../../../types/types";

import { useSelector, useDispatch } from 'react-redux'
import { saveData } from '../../../redux/actionsCreater'

const Home = () => {
  const dataTypes = {
    list: "list",
    tree: "tree",
  };

  const projectsData = useSelector((state: StateType) => state.projectsData.projectsData);
  const dispatch = useDispatch();

  console.log(projectsData);

  const [dataForRender, setDataForRender] = useState<ProjectsDataListItemType[]>([]);
  const [dataType, setDataType] = useState(dataTypes.list);
  const [dialogWindowStatus, setDialogWindowStatus] = useState(false);

  const saveFormData = (data: ProjectsDataListItemType[]) => {
    dispatch(saveData(data));
    setDialogWindowStatus(false);
  };

  const FormProps = [
    { inputName: "projectName", labelName: "Название проекта" },
    { inputName: "fullName", labelName: "ФИО" },
    { inputName: "position", labelName: "Должность" },
    { inputName: "phone", labelName: "Номер телефона" },
  ];

  useEffect(() => {
    setDataForRender(projectsData)
  }, [projectsData]);

  return (
    <div className="main-container">
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

      <div className="content-container">
        {!dataForRender.length && (
          <div className="message-no-data">
            <p>Данные для отображения отсутствуют</p>
          </div>
        )}
        {dataType === dataTypes.tree && (
          // @ts-ignore
          <Tree value={formatDataToTree(dataForRender)} className="tree" />
        )}
        {dataType === dataTypes.list && (
          <ol className="list">
            {dataForRender.map((item: ProjectsDataListItemType, index) => (
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
        <Form data={FormProps} sendData={saveFormData} />
      </DialogWindow>
    </div>
  );
};

export default Home;












