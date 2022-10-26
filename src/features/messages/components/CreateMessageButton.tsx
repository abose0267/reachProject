import { colors } from '@app/constants';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { FAB, Portal, Provider } from 'react-native-paper';
export const CreateMessageButton = () => {
  const [state, setState] = React.useState({ open: false });
  const {navigate} = useNavigation();

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    // <Provider>
      <Portal>
        <FAB.Group
          style={{backgroundColor: '#00000000', ...StyleSheet.absoluteFillObject, paddingBottom: 90}}
          open={open}
          visible
          color={colors.white}
          fabStyle={{
            backgroundColor: colors.green
            
          }}
          icon={open ? 'message' : 'message-plus'}
          // backdropColor="#00000000"
          actions={[
            // { icon: 'plus', onPress: () => console.log('Pressed add') },
            {
              icon: 'comment-text-multiple',
              label: 'Personalized DM',
              onPress: () => navigate('CreateBlast'),
            },
            {
              icon: 'account-group',
              label: 'Group Chat',
              onPress: () => navigate('CreateGroup'),
            },
            {
              icon: 'bell',
              label: 'Direct Message',
              onPress: () => console.log('Pressed notifications'),
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    // </Provider>
  );
};

