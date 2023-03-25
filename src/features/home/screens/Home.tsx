import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import 'react-native-gesture-handler';
import {ScrollView} from 'react-native-gesture-handler';
import {useCollection} from '@app/lib/useFirebase';
import {useAuthenticatedUser} from '@app/lib';
import {ProgramChatCard} from '../components/ProgramChatCard';
import {ProgramChat} from '@app/lib/programchat';
import {useAnnouncements} from '@app/lib/announcement';
import {HomeBubble} from '../components/HomeBubble';

const Home = ({route, navigation}) => {
  const {user} = useAuthenticatedUser();
  const {data: groups} = useCollection<ProgramChat>(
    `users/${user?.uid}/groups`,
  );

  const userPrograms = groups?.filter(group => group?.program_id != null).map(g => g.program_id);

  const {announcements} = useAnnouncements();
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ScrollView
        style={{
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            padding: 20,
            // marginLeft: 20,
          }}>
          <Text
            style={{
              fontSize: 25,
              // marginLeft: 20,
              color: '#000000',
            }}>
            Hi {user?.firstname}!
          </Text>
          <FlatList
            data={groups.filter(group => group.joinCode != null)}
            renderItem={({item}) => (
              <ProgramChatCard
                data={item}
                onPress={() =>
                  navigation.navigate('ProgramChat', {data: item})
                }
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <HomeBubble
          data={{
            title: 'Recent Announcements',
          }}
          first>
          <FlatList
            data={announcements
              .filter(item => item.program_id == null || userPrograms.includes(item.program_id))
              .sort((a, b) => b.createdAt - a.createdAt)
              .slice(0, 3)}
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
                    numberOfLines={1}
                    >
                    {`(${item.program_name})`}
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
        <HomeBubble
          data={{
            title: 'Upcoming Dates',
          }}></HomeBubble>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
