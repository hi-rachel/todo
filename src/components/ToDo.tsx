import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoriesState, IToDo, toDoState } from "../atoms";
import styled from "styled-components";
import { MdOutlineDelete } from "react-icons/md";

const DeleteToDo = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px;
`;

const Text = styled.div`
  overflow: hidden;
  word-wrap: break-word;
  padding: 5px;
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Log = styled.div`
  position: relative;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 15px;

  button {
    cursor: pointer;
    font-size: 10px;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    background: #fff;
    border-radius: 3px;
    margin-right: 5px;
    margin-bottom: 5px;
    padding: 5px;
    color: grey;
  }
  button:disabled {
    background-color: ${(props) => props.theme.sideBtnSelectColor};
  }
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoriesState);
  const changeCategory = (selectedCategory: string) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((oldToDo) => oldToDo.id === id);
      const newToDo = { text, category: selectedCategory, id };

      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  const handleDelete = (toDoName: string) => {
    if (window.confirm(`Are you sure delete ${toDoName}?`)) {
      setToDos((oldToDos) => {
        const targetIndex = oldToDos.findIndex((oldToDo) => oldToDo.id === id);

        return [
          ...oldToDos.slice(0, targetIndex),
          ...oldToDos.slice(targetIndex + 1),
        ];
      });
    }
  };
  return (
    <Log>
      <Text>{text}</Text>
      {Object.values(categories).map((availableCategory) => (
        <button
          disabled={availableCategory === category}
          key={availableCategory}
          onClick={() => changeCategory(availableCategory)}
        >
          {availableCategory}
        </button>
      ))}
      <DeleteToDo onClick={() => handleDelete(text)}>
        <MdOutlineDelete size="20" color="#0096FF" />
      </DeleteToDo>
    </Log>
  );
}

export default ToDo;
