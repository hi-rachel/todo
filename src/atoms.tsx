import { atom, selector } from "recoil";

export let Categories: string[] = ["To Do", "Doing", "Done"];

export interface IToDo {
  text: string;
  category: string;
  id: number;
}

export const categoryState = atom<string>({
  key: "category",
  default: Categories[0],
});

export const categoriesState = atom<string[]>({
  key: "categoriesState",
  default: JSON.parse(
    localStorage.getItem("addCategory") ?? JSON.stringify(Categories)
  ),
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: JSON.parse(localStorage.getItem("toDos") ?? "[]"),
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
