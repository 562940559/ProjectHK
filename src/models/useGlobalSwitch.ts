import { useState } from 'react';

/**
 * 控制全局通用参数
 * @returns navMenuSwitch 移动端顶部菜单开关
 * @returns changeNavMenuSwitch 修改移动端顶部菜单开关
 */
export default function useGlobalSwitchModel() {
  const [navMenuSwitch, setNavMenuSwitch] = useState(false);

  const changeNavMenuSwitch = (result: boolean) => {
    setNavMenuSwitch(result);
  };

  return {
    navMenuSwitch,
    changeNavMenuSwitch,
  };
}
