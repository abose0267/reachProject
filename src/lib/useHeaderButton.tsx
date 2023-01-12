import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import { IconButton } from 'react-native-paper';

export const useRightHeaderIconButton = ({icon, onPress}) => {
  const navigation = useNavigation();
  useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon={icon}
          size={30}
          onPress={onPress}
          style={{position: 'relative', marginLeft: 'auto', left:18}}
        />
      ),
    });
  }, [navigation]);
};
