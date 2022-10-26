import { colors } from '@app/constants';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { FAB, Portal, Provider } from 'react-native-paper';
export const CreateMessageButton = () => {
  const [state, setState] = React.useState({ open: false });
  const {navigate} = useNavigation();

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <Provider>
      <Portal>
        <FAB.Group
          style={{backgroundColor: '#00000000'}}
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
              icon: 'star',
              label: 'Personal Message',
              onPress: () => navigate('CreateBlast'),
            },
            {
              icon: 'email',
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
    </Provider>
  );
};

