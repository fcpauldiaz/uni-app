import React, { useEffect } from 'react';
import PushNotification from 'react-native-push-notification';
import { SENDER_ID, API_URL } from 'react-native-dotenv';

const PushController = ({ navigation }) => {
  useEffect(() => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
        fetch(`${API_URL}/tokens`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(token)
        });
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        if (notification != null || navigation == null) {
          navigation.navigate('PushContainer', notification);
        }
        // required on iOS only
        //notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      // Android only
      senderID: SENDER_ID,
      // iOS only
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },
      popInitialNotification: true,
      requestPermissions: true
    });
  }, []);
  // no UI
  return null;
};

export default PushController;
