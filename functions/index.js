const functions = require("firebase-functions");
const {Expo} = require("expo-server-sdk");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const expo = new Expo({accessToken: process.env.EXPO_ACCESS_TOKEN});

exports.sendMessageNotifications = functions.firestore
    .document("messageGroups/{groupId}/messages/{messageId}")
    .onWrite(async (change, context) => {
      const {groupId} = context.params;
      const {text: message, user} = change.after.data();
      try {
        const {members} = (
          await db.collection("messageGroups").doc(groupId).get()
        ).data();

        const tokenPromises = members.map((member) =>
          db.collection("users").doc(member.uid).get(),
        );

        const tokens = (await Promise.all(tokenPromises)).map(
            (item) => item.data().token,
        );

        const notifications = tokens
            .filter((t) => Expo.isExpoPushToken(t))
            .map((t) => ({
              to: t,
              sound: "default",
              title: user?.name,
              body: message,
            }));

        const chunks = expo.chunkPushNotifications(notifications);
        const tickets = [];
        (async () => {
          for (const chunk of chunks) {
            try {
              const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
              tickets.push(...ticketChunk);
            } catch (error) {
              console.error(error);
            }
          }
        })();
      } catch (err) {
        console.log("Error getting documents", err);
        throw err;
      }
    });

exports.sendProgramMessageNotifications = functions.firestore
    .document("programs/{groupId}/messages/{messageId}")
    .onWrite(async (change, context) => {
      const {groupId} = context.params;
      const {text: message, user} = change.after.data();

      try {
        const group = (await db.collection("programs").doc(groupId).get())
            .data();

        const members = (await db.collection(`programs/${groupId}/members`)
            .get()).docs.map((doc) => doc.data());


        const tokenPromises = members.map((member) =>
          db.collection("users").doc(member.uid).get(),
        );

        const tokens = (await Promise.all(tokenPromises)).map(
            (item) => item.data().token,
        );

        const notifications = tokens
            .filter((t) => Expo.isExpoPushToken(t))
            .map((t) => ({
              to: t,
              sound: "default",
              title: `Reach Project - ${group.name}`,
              body: `${user?.name}: ${message}`,
            }));

        const chunks = expo.chunkPushNotifications(notifications);
        const tickets = [];
        (async () => {
          for (const chunk of chunks) {
            try {
              const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
              tickets.push(...ticketChunk);
            } catch (error) {
              console.error(error);
            }
          }
        })();
      } catch (err) {
        console.log("Error getting documents", err);
        throw err;
      }
    });


exports.sendAnnouncementNotifications = functions.firestore
    .document("announcements/{id}")
    .onWrite(async (change, context) => {
      const {id} = context.params;
      // eslint-disable-next-line camelcase
      const {title, message, program_name} = change.after.data();
      try {
        const users = (await
        db.collectionGroup("groups")
            .where("program_id", "==", id)
            .get()).map((doc) => doc.data());


        console.log(users);
        const tokenPromises = users.map((user) =>
          db.collection("users").doc(user.uid).get(),
        );

        const tokens = (await Promise.all(tokenPromises)).map(
            (item) => item.data().token,
        );

        const notifications = tokens
            .filter((t) => Expo.isExpoPushToken(t))
            .map((t) => ({
              to: t,
              sound: "default",
              // eslint-disable-next-line camelcase
              title: `Reach Project - ${title} (${program_name}) `,
              body: message,
            }));

        const chunks = expo.chunkPushNotifications(notifications);
        const tickets = [];
        (async () => {
          for (const chunk of chunks) {
            try {
              const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
              tickets.push(...ticketChunk);
            } catch (error) {
              console.error(error);
            }
          }
        })();
      } catch (err) {
        console.log("Error getting documents", err);
        throw err;
      }
    });
