import {ContactCard, Header} from '@app/components';
import React from 'react';
import {View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useMessageGroup} from '../useMessaging';

const GroupInfo = ({route}) => {
  const {id} = route?.params;
  const {group} = useMessageGroup(id);

  return (
    <View>
        <View style={{marginHorizontal: 20, marginTop: 20}}>
        <Header label={group?.name} />

        </View>
      <View>
        <FlatList
          data={group?.members}
          renderItem={({item}) => (
            <ContactCard
              //   onSelect={uid => toggleSelection(uid)}
              data={item}
              //   selected={selected[item.uid] ?? false}
            />
          )}
        />
      </View>
    </View>
  );
};

export default GroupInfo;
