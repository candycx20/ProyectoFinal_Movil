import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from '../navigation/StackNavigator';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

export const ProductsApp = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </ApplicationProvider>
  );
};
