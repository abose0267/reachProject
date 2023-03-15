import React from 'react';
import {
  View,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { HomeBubble } from '../../../features/home/components/HomeBubble';
import { useAnnouncements } from '@app/lib/announcement';
import { useCollection } from '@app/lib/useFirebase';

const ProgramChat = ({ route, navigation }) => {
  if (!route?.params?.data) return <></>;
  console.log(route);
  const { data } = route.params;
  const { announcements } = useAnnouncements();

  const { data: images } = useCollection(
    `programs/${data?.program_id}/messages`,
    { where: ['image', '!=', 'null'] },
  );

  console.log(images);
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <HomeBubble data={{ title: 'Attachments' }} last>
          <View
            style={{
              paddingVertical: 5,
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {images.map(doc => (
              <Image
                source={{
                  uri: doc.image,
                }}
                style={{ height: 80, width: 80, marginRight: 5, marginBottom: 5 }}
              />
            ))}
          </View>
        </HomeBubble>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProgramChat;
