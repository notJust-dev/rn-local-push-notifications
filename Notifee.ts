import notifee, {
  AuthorizationStatus,
  EventType,
  RepeatFrequency,
  TimestampTrigger,
  TriggerType,
  Notification,
} from '@notifee/react-native';
import {AppState, Platform} from 'react-native';

class Notifications {
  constructor() {
    this.bootstrap();
    notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
      }
    });

    notifee.onBackgroundEvent(async ({type, detail}) => {
      const {notification} = detail;
      console.log('Notification received: background', type, detail);
      if (notification) {
        this.handleNotificationOpen(notification);
      }
    });

    notifee
      .getTriggerNotificationIds()
      .then(ids => console.log('All trigger notifications: ', ids));
    // notifee.cancelAllNotifications()
  }

  public async onMessageReceived(message) {
    // Do something
    console.log('Firebase Notification ', message);
  }

  public handleNotificationOpen(notification: Notification) {
    const {data} = notification;
  }

  public async bootstrap() {
    const initialNotification = await notifee.getInitialNotification();

    if (initialNotification) {
      console.log(
        'Notification caused application to open',
        initialNotification.notification,
      );
      console.log(
        'Press action used to open the app',
        initialNotification.pressAction,
      );
      this.handleNotificationOpen(initialNotification.notification);
    }
  }
  public async checkPermissions() {
    const settings = await notifee.requestPermission();

    if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
      console.log('Permission settings:', settings);
      return true;
    } else {
      console.log('User declined permissions');
      return false;
    }
  }
}

AppState.addEventListener('change', state => {
  if (state === 'active') {
    notifee.setBadgeCount(0).then(() => console.log('Badge count removed'));
  }
});

export default new Notifications();
