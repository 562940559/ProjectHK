import moment from 'moment';

/**
 * 时间转UTC
 */
export const formatDateToUTC = (val: number) =>
  `${moment(val * 1000)
    .utc()
    .format('LLL')} UTC`;

/**
 * 时间戳转日时分秒
 */
export const timeSToDate = (time: number) => {
  let returns = '-';

  if (time) {
    try {
      const newTime = Number(time);
      returns = moment(newTime).format('YYYY-MM-DD HH:mm:ss');
    } catch {
      throw new Error('格式错误');
    }
  }

  return returns;
};
