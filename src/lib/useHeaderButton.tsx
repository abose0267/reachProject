import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {IconButton} from 'react-native-paper';

export const useRightHeaderIconButton = ({icon, onPress, show = true, watch}) => {
  const navigation = useNavigation();
  useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () =>
        show && (
          <IconButton
            icon={icon}
            size={30}
            onPress={onPress}
            style={{position: 'relative', marginLeft: 'auto', left: 18}}
          />
        ),
    });
  }, [navigation, show, watch]);
};

export const useRightHeaderComponent = ({ component, show = true, watch}) => {
  const navigation = useNavigation();
  useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () =>
        show && (
          component
        ),
    });
  }, [navigation, show, watch]);
};