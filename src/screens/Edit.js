import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { GlobalContext } from "../../context/GlobalContext";

import Header from "../Components/Header";
import Footer from "../Components/Footer";

import Icon from "react-native-vector-icons/MaterialIcons";

export default function Edit({ navigation }) {
  //Przypisujemy zmiennym wartości z GlobalState
  const {
    toDoList,
    task,
    setTask,
    chosenTask,
    categories,
    chosenCategory,
    setChosenCategory,
    selectedCategory,
    setFilteredList,
  } = useContext(GlobalContext);

  const handleEditChosenTask = () => {
    if (task !== "") chosenTask.task = task;
    if (chosenCategory !== "") chosenTask.category = chosenCategory;
    setTask("");
    setChosenCategory("");

    if (selectedCategory !== "Wszystkie") {
      setFilteredList(
        toDoList.filter((item) => item.category === selectedCategory)
      );
    }

    navigation.navigate("ChosenTask");
  };

  const handleChosenCategory = (item) => {
    setChosenCategory(item);
  };

  return (
    <View style={styles.screen}>
      <Header />
      <View style={styles.body}>
        <Text style={styles.titleText}>Treść zadania:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setTask}
          value={task}
          placeholder={chosenTask.task}
        />
        <Text style={styles.titleText}>Kategoria:</Text>
        <SelectList
          placeholder="Wybierz kategorię"
          search={false}
          setSelected={(item) => setChosenCategory(item)}
          data={categories}
          save="value"
          boxStyles={styles.categories}
          dropdownItemStyles={styles.items}
          dropdownStyles={{
            borderWidth: 1,
            borderColor: "#14141425",
            margin: 10,
            padding: 0,
          }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleEditChosenTask()}
        >
          <Icon name="add-task" size={20} color="white" />
          <Text style={styles.buttonText}>Edytuj</Text>
        </TouchableOpacity>
      </View>
      <Footer navigation={navigation} />
    </View>
  );
}

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
    justifyContent: "center",
    backgroundColor: "#14141410",
  },
  titleText: {
    marginLeft: 15,
    fontSize: 15,
    fontWeight: "700",
  },
  input: {
    backgroundColor: "white",
    padding: 25,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 10,
    marginTop: 5,
    marginBottom: 25,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  categories: {
    backgroundColor: "white",
    padding: 25,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 10,
    marginTop: 5,
    marginBottom: 0,
    borderRadius: 15,
    borderColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  items: {
    backgroundColor: "white",
    padding: 25,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 10,
    marginTop: 0,
    borderRadius: 15,
    borderColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ADCC00",
    padding: 25,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 10,
    marginTop: 25,
    marginBottom: 30,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  buttonText: {
    color: "white",
    fontWeight: "900",
    fontSize: 15,
  },
});
