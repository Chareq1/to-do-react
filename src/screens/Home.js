import React, { useState, useEffect, useContext } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { GlobalContext } from "../../context/GlobalContext";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";

import Header from "../Components/Header";
import Footer from "../Components/Footer";

import Icon from "react-native-vector-icons/MaterialIcons";

export default function Home({ navigation, onLayoutRootView }) {
  //Przypisujemy zmiennym wartości z GlobalState
  const {
    toDoList,
    setChosenTask,
    query,
    setQuery,
    filteredList,
    setFilteredList,
    selectedCategory,
    setSelectedCategory,
    categoriesHome,
  } = useContext(GlobalContext);

  /*
    //W useEffect zawsze tworzymy funkcję anonimową (useEfect jest wykonywane, kiedy strona jest ładowana)
    useEffect(() => {
        setToDoList(prevState => [...prevState, { id: 2, task: 'Idź spać' }])
    }, []) //}, [] - jeden raz
    */

  function handleCategoryChange(item) {
    setQuery("");
    setSelectedCategory(item);
  }

  useEffect(() => {
    let filtered;

    if (selectedCategory === "Wszystkie") {
      filtered = toDoList;
    }

    if (selectedCategory !== "Wszystkie") {
      filtered = toDoList.filter((item) => item.category === selectedCategory);
    }

    if (query !== "") {
      filtered = filtered.filter((item) =>
        item.task.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredList(filtered);
  }, [toDoList, query, selectedCategory]);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.task}
        onPress={() => handleChosenTask(item)}
      >
        <Icon name="task-alt" size={20} color="#141414" />
        <Text style={styles.listText}>{item.task}</Text>
      </TouchableOpacity>
    );
  };

  //Funkcja do wybrania zadania
  const handleChosenTask = (item) => {
    setChosenTask(item);
    navigation.navigate("ChosenTask");
  };

  return (
    <View style={styles.screen} onLayout={onLayoutRootView}>
      <Header />
      <View style={styles.body}>
        <View style={styles.search}>
          <View style={styles.icon}>
            <Icon name="search" size={20} color="#141414" />
          </View>
          <TextInput
            style={styles.input}
            onChangeText={setQuery}
            value={query}
            placeholder="Szukaj..."
          />
        </View>
        <SelectList
          placeholder="Wybierz kategorię"
          search={false}
          setSelected={(item) => handleCategoryChange(item)}
          value="value"
          defaultOption={{ key: categoriesHome[0], value: categoriesHome[0] }}
          data={categoriesHome}
          boxStyles={styles.categories}
          dropdownItemStyles={styles.items}
          dropdownStyles={{
            borderWidth: 1,
            borderColor: "#14141425",
            margin: 10,
            padding: 0,
          }}
        />
        <View style={{ marginBottom: 25 }} />
        <FlatList
          data={filteredList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
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
  },
  task: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 25,
    margin: 10,
    marginBottom: 5,
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
  listText: {
    fontSize: 15,
    margin: 0,
    marginLeft: 20,
    padding: 0,
  },
  input: {
    flex: 8,
    paddingLeft: 10,
    paddingRight: 10,
  },
  search: {
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    padding: 25,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 10,
    marginBottom: 5,
    marginTop: 25,
    borderRadius: 15,
    borderColor: "black",
    borderWidth: 1,
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
    borderColor: "black",
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
  icon: {
    flex: 1,
  },
});
