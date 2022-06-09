const { localStorage } = window;

const prefix = 'dex_';

export const setItem = (key: string, value: any) => {
  try {
    const setVal = JSON.stringify(value);
    localStorage.setItem(`${prefix}${key}`, setVal);
  } catch (e) {
    console.error(e);
  }
};

export const getItem = (key: string) => {
  let res = undefined;
  try {
    const val = localStorage.getItem(`${prefix}${key}`);

    if (typeof val === 'undefined' || val === 'undefined' || val === null) {
      res = undefined;
    } else {
      res = JSON.parse(val);
    }
  } catch (e) {
    console.error(e);
  }
  return res;
};

export const removeItem = (key: string) => {
  try {
    localStorage.removeItem(`${prefix}${key}`);
  } catch (e) {
    console.log(e);
  }
};

export const clear = () => {
  try {
    // 移除所有
    localStorage.clear();
  } catch (e) {
    console.log(e);
  }
};
