import { notification } from 'antd';
import {
  NotificationInstance,
  NotificationPlacement,
} from 'antd/lib/notification';

interface notificationPara {
  type: keyof NotificationInstance;
  message?: string;
  description?: string;
  duration?: number;
  placement?: NotificationPlacement;
}

const openNotification = ({
  type,
  message,
  description,
  duration,
  placement,
}: notificationPara) => {
  notification[type]({
    message: message,
    description: description,
    duration: duration !== undefined ? duration : 2,
    placement: placement !== undefined ? placement : 'bottomRight',
  });
};

export default openNotification;
