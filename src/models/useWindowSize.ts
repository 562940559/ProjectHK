import { useEffect, useState } from 'react';

/**
 * 屏幕监听相关相关
 * @returns windowSize 页面当前size
 */
export default function useWindowSizeModel() {
  const getWindowSize = () => ({
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth,
  });

  const mobileLimit = 767;

  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [isMobile, setIsMobile] = useState(
    getWindowSize().innerWidth < mobileLimit,
  );

  const handleResize = () => {
    setWindowSize(getWindowSize());
    setIsMobile(getWindowSize().innerWidth < mobileLimit);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return {
    windowSize,
    isMobile,
  };
}
