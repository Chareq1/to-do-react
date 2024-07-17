import React, { useState, useEffect, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Entypo from "@expo/vector-icons/Entypo";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import Home from "./src/screens/Home";
import ChosenTask from "./src/screens/ChosenTask";
import Edit from "./src/screens/Edit";
import Add from "./src/screens/Add";
import { GlobalContextProvider } from "./context/GlobalContext";

const Stack = createNativeStackNavigator();

//Utrzymywanie widocznego ekranu powitalnego podczas pobierania zasobów
SplashScreen.preventAutoHideAsync();

export default function App() {
  //Stan mówiący o załadowaniu aplikacji
  const [appIsLoaded, setAppIsLoaded] = useState(false);

  /*
  //ZARZĄDZANIE STANAMI GLOBALNYMI
  //Tworzenie hook'ów
  //const [nazwaZmiennej, funkcjaDoZmiany] = useState(startowyTypDanych/Dane)
  const [toDoList, setToDoList] = useState([
    { id: 1, task: "Umyj zęby", category: "Codzienne" },
  ]);
  const [categories, setCategories] = useState(["Codzienne", "Tymczasowe"]);
  const [chosenCategory, setChosenCategory] = useState("");
  const [task, setTask] = useState("");
  const [chosenTask, setChosenTask] = useState("");
  */

  /*Tworzenie globalneo stanu, czyli stanów w całej aplikacji*/
  /*Podczas tworzenia aplikacji moga być przekazywane do innych podstron w aplikacji*/
  /*
  const GlobalState = {
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
  };
  */

  //useEffect do ładowania zależności i utrzymywania SplashScreen
  useEffect(() => {
    const prepare = async () => {
      try {
        await Font.loadAsync(Entypo.font);
      } catch (error) {
        console.warn(error);
      } finally {
        setAppIsLoaded(true);
      }
    };

    prepare();
  }, []);

  //Callback do wywołania callback'u dla LayoutRootView
  const onLayoutRootView = useCallback(async () => {
    if (appIsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsLoaded]);

  if (!appIsLoaded) {
    return null;
  }

  /*NAWIGACJA*/
  return (
    <GlobalContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" options={{ headerShown: false }}>
            {(props) => <Home {...props} onLayoutRootView={onLayoutRootView} />}
          </Stack.Screen>

          <Stack.Screen name="ChosenTask" options={{ headerShown: false }}>
            {(props) => <ChosenTask {...props} />}
          </Stack.Screen>

          <Stack.Screen name="Edit" options={{ headerShown: false }}>
            {(props) => <Edit {...props} />}
          </Stack.Screen>

          <Stack.Screen name="Add" options={{ headerShown: false }}>
            {(props) => <Add {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalContextProvider>
  );
}
