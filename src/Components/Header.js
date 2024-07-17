import { StyleSheet, View, Text } from "react-native";
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants'

export default function Header() {
    return (
        <View style={styles.header}>
            <StatusBar style="auto" translucent backgroundColor='transparent' />
            <Text style={styles.text}>Lista To-Do</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        width: '100%', 
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ADCC00',
        paddingTop: Constants.statusBarHeight,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        zIndex: 5,
        color: '#141414'
    },
    text: {
        fontSize: 20,
        fontWeight: '900'
    }
})