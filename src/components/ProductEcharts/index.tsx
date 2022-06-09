import { FC } from 'react';
import * as charts from 'echarts';
import ReactEcharts from 'echarts-for-react';

type EChartsOption = charts.EChartsOption;

interface PerformanceChartPropsType {
  seriesData: { [k: number]: number };
}

const PerformanceChart: FC<PerformanceChartPropsType> = ({ seriesData }) => {
  const getOption = () => {
    const option: EChartsOption = {
      // 鼠标移上去的显示
      // tooltip: {
      //   trigger: 'axis',
      //   axisPointer: {
      //     type: 'cross',
      //     animation: false,
      //     label: {
      //       backgroundColor: '#ccc',
      //       borderColor: '#aaa',
      //       borderWidth: 1,
      //       shadowBlur: 0,
      //       shadowOffsetX: 0,
      //       shadowOffsetY: 0,
      //       color: '#222'
      //     }
      //   },
      // },
      grid: {
        top: '5%',
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: Object.keys(seriesData),
          axisLine: {
            show: true,
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: '#DD81FF', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#491CFF', // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
          },
          axisLabel: {
            color: '#a0a0a1',
            rotate: 45,
          },
          splitLine: {
            show: false,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            color: '#a0a0a1',
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: '#414142',
            },
          },
        },
      ],
      series: [
        {
          name: 'Union Ads',
          type: 'line',
          lineStyle: {
            color: '#15FFAB',
            width: 1,
          },
          data: Object.values(seriesData),
          symbol: 'none',
        },
      ],
    };
    return option;
  };
  return (
    <div style={{ width: '100%', marginTop: '12px' }}>
      <ReactEcharts option={getOption()} />
    </div>
  );
};

export default PerformanceChart;
