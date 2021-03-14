import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import ConsultationsScreen from '../screens/Consultations';
import CreateConsultationScreen from '../screens/CreateConsultation';
import Login from '../screens/Login';

import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Consultations">
      <Stack.Screen
        name="Login"
        component={Login}
      />
      <Stack.Screen
        name="Consultations"
        component={ConsultationsScreen}
      />
      {/* not finished */}
      {/* <Stack.Screen
        name="CreateConsultation"
        component={CreateConsultationScreen}
      /> */}
    </Stack.Navigator>
  );
}
