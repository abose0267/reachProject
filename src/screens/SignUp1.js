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
  TextInput,
} from "react-native";

const SignUp1 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          paddingTop: "18%",
          width: "92%",
          flexDirection: "column",
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "600", paddingBottom: "10%" }}>
          Sign Up
        </Text>
        <View style={{ paddingBottom: 20, borderRadius: 50 }}>
          <TextInput label="First Name" />
        </View>

        <TextInput stye={styles.input} label="Last Name" />
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "column",
          position: "absolute",
          bottom: "1%",
          width: "100%",
          height: "25%",
          alignItems: "center",
          justifyContent: "flex-end",
          marginBottom: "20%",
        }}
      >
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
          <Text style={{ fontSize: 20, fontWeight: "500" }}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp1;

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
  input: {
    paddingTop: "10%",
    width: "100%",
    height: "25%",
    borderRadius: 20,
  },
});
