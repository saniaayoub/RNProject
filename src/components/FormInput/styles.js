import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrix } from "../../config";

const styles = StyleSheet.create({
    inputStyle: {
        width: Metrix.HorizontalSize(341),
        height: Metrix.VerticalSize(50),
        paddingHorizontal: 10,
        borderWidth: Metrix.VerticalSize(1),
        borderColor: Colors.Primary,
        borderRadius: Metrix.LightRadius,
        fontFamily: Fonts["Montserrat-Regular"],
        fontSize: Metrix.FontSmall,
        color: Colors.Text,
        textAlignVertical: "center",
        letterSpacing: 0.49,
    },
    errMsgStyle: {
        letterSpacing: 0.49,
        fontFamily: Fonts["Montserrat-Medium"],
        fontSize: Metrix.FontExtraSmall,
        color: Colors.Danger,
        marginTop: Metrix.VerticalSize(10)
    }
})

export default styles