import {ContactCard, Header} from '@app/components';
import { removeMember } from '@app/lib/programchat';
import React from 'react';
import {View, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import { IconButton } from 'react-native-paper';
import {useMessageGroup} from '../useMessaging';

const GroupInfo = ({route}) => {
  const {id, members, admin, program} = route?.params;

  return (
    <View>
      <View>
        <FlatList
          data={members}
          renderItem={({item}) => 
          <ContactCard 
            data={item} 
            renderRight={(profile) => admin && program?.program_id && <IconButton icon="close-circle" color='red' onPress={() => removeMember(profile, program)}/>}
          />
        }
        />
      </View>
    </View>
  );
};

export default GroupInfo;
