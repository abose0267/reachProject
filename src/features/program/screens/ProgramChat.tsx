import React from 'react';
import {
  View,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Share
} from 'react-native';
import { HomeBubble } from '../../../features/home/components/HomeBubble';
import { useAnnouncements } from '@app/lib/announcement';
import { useCollection } from '@app/lib/useFirebase';
import { useGroupedPins } from '@app/lib/pinned';
import { renderBubble } from '@app/features/chat/components';
import { Bubble } from 'react-native-gifted-chat';
import { useProgramChatGroup } from '@app/lib/programchat';
import * as Sharing from 'expo-sharing';
import QRCode from 'react-native-qrcode-svg';
import { Button, IconButton } from 'react-native-paper';
import { colors } from '@app/constants';

const ProgramChat = ({ route, navigation }) => {
  if (!route?.params?.data) return <></>;
  // console.log(route);
  const { data } = route.params;
  const { announcements } = useAnnouncements();

  const {group} = useProgramChatGroup(data?.program_id);

  const { data: images } = useCollection(
    `programs/${data?.program_id}/messages`,
    { where: ['image', '!=', 'null'] },
  );


  const { pins } = useGroupedPins(data?.program_id)
  // console.log(pins);

  // console.log(images);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        // marginTop: 15,
      }}>
      <ScrollView style={{ flex: 1 }} contentInset={{top: 15, bottom: 30}} showsVerticalScrollIndicator={false}>
        <HomeBubble data={{ title: 'Attachments' }} first>
          <View
            style={{
              paddingTop: images.filter(im => im.image).length > 0 ? 10 : 0,
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {images.filter(im => im.image).map(doc => (
              <Image
                source={{
                  uri: doc.image,
                }}
                style={{ height: 80, width: 80, marginRight: 10, marginBottom: 10, borderRadius: 10  }}
              />
            ))}
          </View>
        </HomeBubble>
        <HomeBubble data={{ title: 'Announcements' }}>
         
        <FlatList
            data={announcements
              .filter(item => item.program_id == data?.program_id)
              .sort((a, b) => b.createdAt - a.createdAt)
              // .slice(0, 3)
            }
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={{
                  marginTop: 10,
                }}
                onPress={() =>
                  navigation.navigate('Announcements', {data: item})
                }>
                <>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '500',
                      color: '#000000',
                      marginBottom: 3,
                    }}
                    numberOfLines={1}
                    >
                    {item.title}
                  </Text>
                 {item.program_id &&  <Text
                    style={{
                      fontSize: 15,
                      // fontWeight: '500',
                      color: '#000000',
                    }}
                    // numberOfLines={1}
                    >
                    {/* {`(${item.program_name})`} */}
                  </Text>}
                  </View>
                  <Text
                    style={{
                      fontSize: 15,
                      marginBottom: 5,
                      color: '#666',
                    }}
                    numberOfLines={2}
                    >
                    {item.message}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: 'gray',
                    }}>
                    {/* @ts-ignore */}
                    {item.createdAt.toDate().toDateString().toUpperCase()}
                  </Text>
                </>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </HomeBubble>

        <HomeBubble data={{ title: 'Pinned' }} last>
         
        <FlatList
            data={pins
              .sort((a, b) => b.createdAt - a.createdAt)
              // .slice(0, 3)
            }
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={{
                  marginTop: 10,
                }}
               >
                <>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  </View>
                  <Text
                    style={{
                      fontSize: 15,
                      marginBottom: 5,
                      // color: '#666',
                    }}
                    numberOfLines={2}
                    >
                    {item.text}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: 'gray',
                    }}>
                    {/* @ts-ignore */}
                    {item.createdAt.toDate().toDateString().toUpperCase()}
                  </Text>
                </>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </HomeBubble>

        <HomeBubble data={{ title: 'Share' }} last>
          <View style={{marginTop: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
            {/* <View style={{flex: 1}}> */}
              <QRCode value={group?.qrCode} size={130}/>
            {/* </View> */}
            <View style={{flex: 1, justifyContent: 'center', 'maxWidth': 180}}>
            <Button icon="send" mode='contained' buttonColor={colors.green} onPress={() => Share.share({url: group?.qrCode, message: `Join ${group?.name}!`})}>
   Share Link
  </Button>
            </View>
          </View>
         
          {/* <Text>{group.qrCode}</Text> */}
        </HomeBubble>


      </ScrollView>
    </SafeAreaView>
  );
};

export default ProgramChat;
