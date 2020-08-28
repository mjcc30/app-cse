import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import HomeStackScreen from './HomeStackScreen';
import ChatScreen from './ChatScreen';
import InfoScreen from './InfoScreen';
import VisioScreen from './VisioScreen';

const Home = createStackNavigator();
const Chat = createStackNavigator();
const Visio = createStackNavigator();
const Info = createStackNavigator();

const Tab = createBottomTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator initialRouteName="Home" activeColor="#fff">
      <Tab.Screen name="Acceuil" component={HomeStack}
        options={{ tabBarLabel: 'Home', tabBarColor: '#009387',
          tabBarIcon: ({ color }) => ( <Ionicons name="ios-home" color={color} size={26} /> ),
        }}
      />
      <Tab.Screen name="Chat" component={ChatStack}
        options={{ tabBarLabel: 'Chat', tabBarColor: '#009387',
        tabBarIcon: ({ color }) => ( <Ionicons name="ios-chatboxes" color={color} size={26} /> ),
        }}
      />
      <Tab.Screen
        name="Visio"
        component={VisioStack}
        options={{ tabBarLabel: 'Visio', tabBarColor: '#009387',
          tabBarIcon: ({ color }) => ( <Ionicons name="ios-images" color={color} size={26} /> ),
        }}
      />
      <Tab.Screen name="Infos" component={InfoStack}
        options={{ tabBarLabel: 'Infos', tabBarColor: '#009387',
          tabBarIcon: ({ color }) => ( <Ionicons name="ios-megaphone" color={color} size={26} /> ),
        }}
      />
    </Tab.Navigator>
);

export default MainTabScreen;

const HomeStack = ({navigation}) => (
    <Home.Navigator screenOptions={{
            headerStyle: {
            backgroundColor: '#009387',
            }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' }
        }}>
        <Home.Screen name="Acceuil" component={HomeStackScreen} options={{
            title:'Acceuil',
            headerLeft: () => (
                <Ionicons.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}>
                </Ionicons.Button>
            )
        }} />
    </Home.Navigator>
);

const ChatStack = ({navigation}) => (
    <Chat.Navigator screenOptions={{
            headerStyle: {
            backgroundColor: '#009387',
            }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' }
        }}>
            <Chat.Screen name="Chat" component={ChatScreen} options={{
            title:'Chat',
            headerLeft: () => (
                <Ionicons.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}>
                </Ionicons.Button>
            )
            }} />
    </Chat.Navigator>
);

const VisioStack = ({navigation}) => (
  <Visio.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: '#009387',
            }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' }
        }}>
          <Visio.Screen name="Detailles" component={VisioScreen} options={{
            title:'Visio',
          headerLeft: () => (
              <Ionicons.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}>
              </Ionicons.Button>
          )
          }} />
  </Visio.Navigator>
);

const InfoStack = ({navigation}) => (
    <Info.Navigator screenOptions={{
            headerStyle: {
              backgroundColor: '#009387',
              }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' }
          }}>
            <Info.Screen name="Detailles" component={InfoScreen} options={{
              title:'Info',
            headerLeft: () => (
                <Ionicons.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}>
                </Ionicons.Button>
            )
            }} />
    </Info.Navigator>
);
