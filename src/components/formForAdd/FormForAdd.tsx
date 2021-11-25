import { FC, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

interface ItemFormType {
  inputName: string;
  labelName: string;
}

interface FormPropsType {
  data: ItemFormType[];
  sendData: (data: any) => void;
}

const FormForAdd: FC<FormPropsType> = ({ data, sendData }) => {
  const inputsNames: any = {};

  data.forEach((dataItem) => (inputsNames[dataItem.inputName] = ''));

  const [formData, setFormData] = useState(inputsNames);

  const changeInputData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((previousFormData: {}) => ({
      ...previousFormData,
      [event.target.id]: event.target.value,
    }));
  };

  return (
    <form
      className="p-d-flex p-flex-column p-ai-center p-mt-5"
      onSubmit={(event) => event.preventDefault()}
    >
      {data.map((dataItem: ItemFormType) => (
        <>
          <div className="p-field p-col-11 p-pb-5" key={dataItem.inputName}>
            <span className="p-float-label">
              <InputText
                id={dataItem.inputName}
                value={formData[dataItem.inputName]}
                onChange={changeInputData}
              />
              <label htmlFor="fullName" className="p-mr-2">
                {dataItem.labelName}
              </label>
            </span>
          </div>
        </>
      ))}
      <div>
        <Button
          label="Добавить"
          icon="pi pi-check"
          autoFocus
          onClick={() => sendData(formData)}
        />
      </div>
    </form>
  );
};

export default FormForAdd;
