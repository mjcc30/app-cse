/* eslint-disable comma-dangle */
/* eslint-disable semi */
import React, { useState, useCallback, useEffect } from 'react';
import websocket from 'socket.io-client';
import { GiftedChat, SystemMessage } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-community/async-storage';
const USER_ID = '@userId';
const hostname = 'backend-ce-news.herokuapp.com';
const url = `https://${hostname}`;

const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);

  const determineUser = () => {
    AsyncStorage.getItem(USER_ID)
      .then((userId) => {
        if (!userId) {
          socket.emit('userJoined', null);
          socket.on('userJoined', (userId) => {
            AsyncStorage.setItem(USER_ID, userId);
            setData({ userId });
          });
        } else {
          socket.emit('userJoined', userId);
          setData({ userId });
        }
      })
      .catch((e) => alert(e));
  };

  const [data, setData] = useState({
    userId: null,
    name: '',
    appIsReady: false,
    isLoadingEarlier: false,
    isTyping: false,
    determineUser,
  });

  const { userId } = useState();

  const socket = websocket(url);
  socket.on('message', (message) => {
    onReceivedMessage(message);
  });

  useEffect(async () => {
    setMessages([]);
  }, []);

  const onReceivedMessage = (messages) => {
    _storeMessages(messages);
    console.log(messages);
  };

  const onLoadEarlier = () => {
    setData(() => {
      return {
        isLoadingEarlier: true,
      };
    });
  };

  const onSend = useCallback((messages = []) => {
    socket.emit('message', messages);
  }, []);

  const parsePatterns = () => {
    return [
      {
        pattern: /#(\w+)/,
        style: { textDecorationLine: 'underline', color: 'darkorange' },
        onPress: () => Linking.openURL('http://gifted.chat'),
      },
    ];
  };

  const renderSystemMessage = () => {
    return (
      <SystemMessage
        containerStyle={{ marginBottom: 15 }}
        textStyle={{ fontSize: 14 }}
      />
    );
  };

  const _storeMessages = (messages) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: userId,
      }}
      showUserAvatar={true}
      showAvatarForEveryMessage={true}
      alwaysShowSend
      scrollToBottom
      infiniteScroll
      parsePatterns={parsePatterns}
      renderSystemMessage={renderSystemMessage}
    />
  );
};

export default ChatScreen;
