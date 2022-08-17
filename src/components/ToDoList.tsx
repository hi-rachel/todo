import { useRecoilState, useRecoilValue } from "recoil";
import { categoriesState, categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import styled from "styled-components";
import { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";

const BoxWrap = styled.div`
  margin: 100px auto;
  max-width: 480px;
  height: 600px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
`;

const Box = styled.div`
  padding: 20px;
  max-width: 480px;
  height: 600px;
  overflow: auto;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.boxColor};

  h1 {
    color: ${(props) => props.theme.accentColor};
    text-align: center;
    font-weight: 600;
    font-size: 45px;
    margin-bottom: 15px;
  }
`;

const CategoryBtn = styled.div`
  font-size: 15px;
  position: absolute;
  top: 50px;
  left: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  h1 {
    font-size: 30px;
  }
`;

const Btn = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;

  button {
    word-break: keep-all;
    cursor: pointer;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    padding: 5px 10px;
    border-radius: 5px;
    border: none;
    color: ${(props) => props.theme.btnTextColor};
    background-color: ${(props) => props.theme.btnColor};
  }

  button:disabled {
    background-color: rgba(36, 0, 103, 1);
  }
`;

const LastBtn = styled.div`
  margin-bottom: 30px;
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const [addCategory, setAddCategory] = useRecoilState(categoriesState);
  const onClick = (category: string) => {
    setCategory(category);
  };
  const newCategory = () => {
    const plus = prompt("Write new category name that you want to make.", "");

    if (plus) {
      if (addCategory.includes(plus)) {
        alert("Sorry. The same category name is already exist.");
        return;
      }
      setAddCategory([...addCategory, plus]);
      setCategory(plus);
    }
  };

  useEffect(() => {
    localStorage.setItem("addCategory", JSON.stringify(addCategory));
  }, [addCategory]);

  return (
    <>
      <CategoryBtn>
        <h1>Categories</h1>
        {addCategory.map((availableCategory) => (
          <Btn key={availableCategory}>
            <button
              onClick={() => onClick(availableCategory)}
              disabled={availableCategory === category}
            >
              {availableCategory}
            </button>
          </Btn>
        ))}
        <LastBtn>
          <Btn>
            <button onClick={newCategory}>
              <AiOutlinePlus />
            </button>
          </Btn>
        </LastBtn>
      </CategoryBtn>
      <BoxWrap>
        <Box>
          <h1>Just Do It.</h1>
          <CreateToDo />
          {toDos?.map((toDo) => (
            <ToDo key={toDo.id} {...toDo} />
          ))}
        </Box>
      </BoxWrap>
    </>
  );
}

export default ToDoList;
