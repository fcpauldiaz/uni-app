import React, { useState } from 'react';
import { FlatList } from 'react-native';

const NotificationList = ({ renderItem, notification }) => {
  /*const [notifications, setNotifications] = useState([]);
  if (notification != null) {
    const notifications = [...notifications, notification];
    // process the notification here
    setNotifications(notifications);
  }*/
  const notifications = [notification];
  return (
    <FlatList
      data={notifications}
      renderItem={item => renderItem(item)}
      keyExtractor={item => item.title}
    />
  );
};

export default NotificationList;
