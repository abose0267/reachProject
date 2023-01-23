import {ContactCard, Header} from '@app/components';
import React from 'react';
import {View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useMessageGroup} from '../useMessaging';

const GroupInfo = ({route}) => {
  const {id, members} = route?.params;

  return (
    <View>
      <View>
        <FlatList
          data={members}
          renderItem={({item}) => <ContactCard data={item} />}
        />
      </View>
    </View>
  );
};

export default GroupInfo;
