import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [toDoList, setToDoList] = useState([
    { id: 1, task: "Umyj zęby", category: "Codzienne" },
  ]);
  const [categoriesHome, setCategoriesHome] = useState([
    "Wszystkie",
    "Codzienne",
    "Tymczasowe",
  ]);
  const [categories, setCategories] = useState(["Codzienne", "Tymczasowe"]);
  const [chosenCategory, setChosenCategory] = useState("");
  const [task, setTask] = useState("");
  const [chosenTask, setChosenTask] = useState("");
  const [filteredList, setFilteredList] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [query, setQuery] = useState("");

  return (
    <GlobalContext.Provider
      value={{
        toDoList,
        setToDoList,
        task,
        setTask,
        chosenTask,
        setChosenTask,
        categories,
        setCategories,
        chosenCategory,
        setChosenCategory,
        filteredList,
        setFilteredList,
        selectedCategory,
        setSelectedCategory,
        query,
        setQuery,
        categoriesHome,
        setCategoriesHome,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
