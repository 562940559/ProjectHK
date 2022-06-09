/**
 * 国际化暂时静置
 */
// import { useState, useCallback } from 'react';
// import { getLocale, setLocale, useIntl } from 'umi';

/**
 * 国际化相关
 * @returns nowLang 当前语言
 * @returns changeLang 修改当前语言
 * @returns langList 支持语言列表
 */
export default function useLangModel() {
  // const [nowLang, setNowLang] = useState(getLocale());
  // const langList = [
  //   {
  //     lang: 'zh-CN',
  //     langText: '中文',
  //   },
  //   {
  //     lang: 'en-US',
  //     langText: '英文',
  //   },
  // ];
  // const changeLang = useCallback((lang: string) => {
  //   setNowLang(lang);
  //   setLocale(lang, false);
  // }, []);
  // const t = (key: string, vars?: string | number | undefined) => {
  //   return useIntl().formatMessage({ id: key }, { name: vars });
  // };
  // return {
  //   nowLang,
  //   langList,
  //   changeLang,
  //   t,
  // };
}
