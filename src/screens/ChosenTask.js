import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import * as Clipboard from "expo-clipboard";
import { GlobalContext } from "../../context/GlobalContext";

import Icon from "react-native-vector-icons/Octicons";
import IconMaterial from "react-native-vector-icons/MaterialIcons";
import IconFeather from "react-native-vector-icons/Feather";

import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function ChosenTask({ navigation }) {
  //Przypisujemy zmiennym wartości z GlobalState
  const { toDoList, setToDoList, chosenTask, setQuery } =
    useContext(GlobalContext);

  //Kopiowanie do schowka
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(chosenTask.task);
  };

  //Alert o usunięciu zadania
  const deleteAlert = () =>
    Alert.alert(
      "USUWANIE ZADANIA",
      "Czy na pewno chcesz usunąć wybrane zadanie?",
      [
        { text: "Tak", onPress: () => deleteChosenTask() },
        {
          text: "Anuluj",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );

  useEffect(() => {
    setQuery("");
  });

  //Usunięcie zadania
  const deleteChosenTask = () => {
    let idx = toDoList[0].id;
    let arrayFiltered = toDoList.filter(
      (element) => element.id !== chosenTask.id
    );

    arrayFiltered.forEach((element) => {
      element.id = idx;
      idx++;
    });

    setToDoList(arrayFiltered);
    navigation.navigate("Home");
  };

  return (
    <View style={styles.screen}>
      <Header />
      <View style={styles.body}>
        <IconMaterial name="task-alt" size={50} color="#141414" />
        <Text style={styles.taskNumber}>ZADANIE #{chosenTask.id}</Text>
        <Text style={styles.taskNumber}>KATEGORIA: {chosenTask.category}</Text>
        <Text style={styles.taskText} selectable>
          {chosenTask.task}
        </Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.edit}
          onPress={() => navigation.navigate("Edit")}
        >
          <IconFeather name="edit" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.delete} onPress={() => deleteAlert()}>
          <Icon name="trash" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.copy} onPress={() => copyToClipboard()}>
          <Icon name="copy" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <Footer navigation={navigation} />
    </View>
  );
}

//Wygląd -> flexDirection: row, jeśli obok
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 8,
    width: "100%",
    backgroundColor: "#14141410",
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#14141410",
    paddingBottom: 10,
  },
  delete: {
    width: "25%",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#ED2939",
    padding: 25,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    zIndex: 5,
  },
  copy: {
    width: "25%",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#ADCC00",
    padding: 25,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    zIndex: 5,
  },
  edit: {
    width: "25%",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#ADCC00",
    padding: 25,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    zIndex: 5,
  },
  taskNumber: {
    fontWeight: "900",
    fontSize: 15,
  },
  taskText: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 25,
    marginTop: 15,
    margin: 0,
    paddingLeft: 15,
    paddingRight: 15,
  },
});
