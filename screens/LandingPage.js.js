import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  StatusBar,
  SafeAreaView,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const LandingPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/image3.png")} />
      <Text style={styles.text}> Welcome to The REACH Portal</Text>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          position: "absolute",
          bottom: "1%",

          width: "100%",
          height: "25%",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#F8F8F8",
            borderWidth: 1,
            width: "75%",
            alignItems: "center",
            borderRadius: 10,
            justifyContent: "center",
            height: "25%",
            marginTop: "5%",
          }}
          onPress={{}}
        >
          <Text style={{ fontSize: 20, fontWeight: "500" }}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#379770",
            borderWidth: 1,
            width: "75%",
            alignItems: "center",
            borderRadius: 10,
            justifyContent: "center",
            height: "25%",
            marginTop: "5%",
          }}
          onPress={{}}
        >
          <Text style={{ fontSize: 20, fontWeight: "500" }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default LandingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 25,
    color: "black",
    fontWeight: "bold",
    paddingTop: 20,
  },
});
