import { StyleSheet, View, Text } from "react-native";

import Icon from "react-native-vector-icons/AntDesign";
import IconOcticons from "react-native-vector-icons/Octicons";

export default function Footer({ navigation }) {
  return (
    <View style={styles.footer}>
      <IconOcticons
        name="diff-added"
        style={styles.button}
        size={35}
        color="#141414"
        onPress={() => navigation.navigate("Add")}
      />
      <Icon
        name="home"
        style={styles.button}
        size={35}
        color="#141414"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ADCC00",
    zIndex: 5,
    borderTopWidth: 1,
    borderTopColor: "#14141425",
  },
  text: {
    fontSize: 18,
    fontWeight: "900",
  },
  button: {
    marginLeft: 15,
    marginRight: 15,
  },
});
