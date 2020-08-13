import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';

import { DrawerContent } from './src/screens/DrawerContent';

import MainTabScreen from './src/screens/MainTabScreen';
import SupportScreen from './src/screens/SupportScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingScreen from './src/screens/SettingScreen';
import BookmarkScreen from './src/screens/BookmarkScreen';
import RootStackScreen from './src/screens/RootStackScreen';

import { Context } from './src/components/context';
import store from './src/redux/store';

const Drawer = createDrawerNavigator();

function App() {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const initialLoginState = {
    isLoading: true,
    email: true,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333',
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff',
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...prevState,
          email: action.id,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          email: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          email: action.id,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const context = React.useMemo(
    () => ({
      signIn: async (foundUser) => {
        const email = foundUser[0].email;
        try {
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: 'LOGIN', id: email });
      },
      signOut: async () => {
        try {
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: 'LOGOUT' });
      },
      signUp: () => {},
      toggleTheme: () => {
        setIsDarkTheme((isDarkTheme) => !isDarkTheme);
      },
    }),
    []
  );

  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <Context.Provider value={context}>
          <NavigationContainer theme={theme}>
            {loginState.email !== null ? (
              <Drawer.Navigator
                drawerContent={(props) => <DrawerContent {...props} />}
              >
                <Drawer.Screen name="HomeScreen" component={MainTabScreen} />
                <Drawer.Screen name="SupportScreen" component={SupportScreen} />
                <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
                <Drawer.Screen name="SettingScreen" component={SettingScreen} />
                <Drawer.Screen
                  name="BookmarkScreen"
                  component={BookmarkScreen}
                />
              </Drawer.Navigator>
            ) : (
              <RootStackScreen />
            )}
          </NavigationContainer>
        </Context.Provider>
      </PaperProvider>
    </ReduxProvider>
  );
}

export default App;
