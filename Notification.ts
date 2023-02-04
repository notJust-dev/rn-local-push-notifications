import notifee, {
  AuthorizationStatus,
  EventType,
  Notification,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';

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
          this.handleNotificationOpen(detail.notification as Notification);
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

  public handleNotificationOpen(notification: Notification) {
    const {data} = notification;
    console.log('Notification received: foreground', data);
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

  public async scheduleNotification({
    reminder,
    date,
  }: {
    reminder: string;
    date: Date;
  }) {
    const hasPermissions = await this.checkPermissions();
    if (hasPermissions) {
      const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: +date,
      };

      await notifee.createTriggerNotification(
        {
          id: '1',
          title: `🔔 You asked for this reminder -  ${reminder}`,
          body: 'Tap on it to check',
          android: {
            channelId: 'reminder',
            pressAction: {
              id: 'default',
            },
          },
          data: {
            id: '1',
            action: 'reminder',
            details: {
              reminder,
              date,
            },
          },
        },
        trigger,
      );
    }
  }
}

export default new Notifications();
