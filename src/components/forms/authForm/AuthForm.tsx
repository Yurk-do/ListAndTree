import { FC, useState } from 'react';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import './authForm.scss';

interface AuthFormPropsType {
  inputsData: {
    name: string;
    type: string;
  }[];
  buttonName: string;
  formName: string;
  sendLoginData: (data: any) => void;
}

const AuthForm: FC<AuthFormPropsType> = ({
  inputsData,
  buttonName,
  sendLoginData,
  formName,
}) => {
  const [formData, setFormData] = useState({});

  const changeLoginData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((previousFormData) => ({
      ...previousFormData,
      [event.target.id]: event.target.value,
    }));
  };
  return (
    <form className="auth-form" onSubmit={(event) => event.preventDefault()}>
      <h2>{formName}</h2>
      {inputsData.map((data: any) => (
        <div>
          <label
            htmlFor={data.name}
            className="label"
            style={{ width: '100px' }}
          >
            {data.name}
          </label>
          <div className="p-col">
            <InputText
              id={data.name}
              type={data.type}
              onChange={changeLoginData}
            />
          </div>
        </div>
      ))}
      <Button
        label={buttonName}
        className="p-mt-3"
        icon="pi pi-check"
        onClick={() => sendLoginData(formData)}
      />
    </form>
  );
};

export default AuthForm;
