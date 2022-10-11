import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue, useRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";
import styled from "styled-components";

interface IForm {
  toDo: string;
}

const WriteForm = styled.form`
  min-width: 330px;
  width: 100%;
  text-align: center;
  margin-top: 18px;
  margin-bottom: 18px;

  input {
    text-decoration: none;
    width: 83%;
    padding: 6px 10px;
    border: none;
    border-bottom: 2px solid ${(props) => props.theme.accentColor};
    border-radius: 3px;
    box-sizing: border-box;
  }

  button {
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    align-items: center;
    padding: 8px 15px;
    border-radius: 3px;
    border: none;
    color: ${(props) => props.theme.btnTextColor};
    background-color: ${(props) => props.theme.accentColor};
  }
`;

function CreateToDo() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setValue("toDo", "");
    setToDos((oldToDos: any) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
  };
  useEffect(() => {
    localStorage.setItem("toDos", JSON.stringify(toDos));
  }, [toDos]);
  return (
    <WriteForm onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="Write your project"
      />
      <button>Add</button>
    </WriteForm>
  );
}

export default CreateToDo;
