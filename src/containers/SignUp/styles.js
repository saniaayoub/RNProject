import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrix } from "../../config";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Secondary
    },
    content: {
        flex: 1,
        paddingBottom: Metrix.VerticalSize(25),
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        width: Metrix.HorizontalSize(299),
        height: Metrix.VerticalSize(100),
        marginTop: Metrix.VerticalSize(100)
    },
    headingStyle: {
        fontSize: Metrix.FontLarge,
        fontFamily: Fonts["Montserrat-Bold"],
        color: Colors.Text,
        marginTop: Metrix.VerticalSize(52),
        letterSpacing: 0.77,
    },
    forgetPassText: {
        fontSize: Metrix.FontExtraSmall,
        fontFamily: Fonts["Montserrat-Regular"],
        color: Colors.Text,
        marginTop: Metrix.VerticalSize(25),
        textDecorationLine: "underline",
        letterSpacing: 0.42,
    }
})

export default styles