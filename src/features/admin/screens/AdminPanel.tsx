import { Header } from "@app/components";
import { useAuthenticatedUser } from "@app/lib";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  SectionList,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const AdminPanel = ({ navigation }) => {
  const { user } = useAuthenticatedUser();
  const DATA = [
    {
      title: "Create an announcement",
      icon: "megaphone-outline",
      description: "Send a quick message to all users of REACH or a program.",
      onPress: () =>
        navigation.navigate("sendannouncement", { isAnnouncement: true }),
    },
    {
      title: "Create a program chat",
      icon: "apps-outline",
      description: "Create a group chat for a specific program within REACH",
      onPress: () => navigation.navigate("blasts", { isAnnouncement: false }),
    },
    {
      title: "Create an event",
      icon: "calendar-outline",
      description:
        "Let REACH members know about an upcoming event or activity.",
      onPress: () => navigation.navigate("events"),
      disabled: true,
    },
  ];
  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar style="auto" />
      <View
        style={{
          marginTop: 10,
          // marginHorizontal: 0,
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: "300",
            color: "gray",
            marginBottom: 5,
          }}
        >
          What would you like to do?
        </Text>
        <FlatList
          data={DATA}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={item.onPress}
              disabled={!!item.disabled}
              style={{
                flexDirection: "row",
                width: "100%",
                paddingVertical: 10,
                alignItems: "center",
                borderBottomColor: "lightgray",
                marginVertical: 5,
                opacity: item.disabled ? .3 : 1,
              }}
            >
              <Ionicons name={item.icon} size={35} color="black" />

              <View style={{ flexDirection: "column", marginLeft: 20 }}>
                <Text
                  style={{ fontSize: 17, fontWeight: "600", color: "black" }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "300",
                    color: "gray",
                    maxWidth: 300,
                  }}
                >
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default AdminPanel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  topContainer: {
    paddingHorizontal: 20,
    marginTop: 0,
  },
});
