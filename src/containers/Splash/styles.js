import { StyleSheet } from "react-native";
import { Colors } from "../../config";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Secondary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: "100%",
        height: "100%",
    }
})

export default styles