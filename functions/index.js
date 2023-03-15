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
      const {text: message} = change.after.data();
      console.log(message);
      try {
        const {members} = (
          await db.collection("messageGroups").doc(groupId).get()
        ).data();

        console.log(JSON.stringify(members, null, 2));
        const tokenPromises = members.map((member) =>
          db.collection("users").doc(member.uid).get(),
        );

        const tokens = (await Promise.all(tokenPromises)).map(
            (item) => item.data().token,
        );

        console.log(tokens);

        const notifications = tokens
            .filter((t) => Expo.isExpoPushToken(t))
            .map((t) => ({
              to: t,
              sound: "default",
              body: message,
            }));

        const chunks = expo.chunkPushNotifications(notifications);
        const tickets = [];
        (async () => {
        // Send the chunks to the Expo push notification service. There are

          // time, which nicely spreads the load out over time:
          for (const chunk of chunks) {
            try {
              const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
              console.log(ticketChunk);
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


