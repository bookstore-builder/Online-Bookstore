import React from 'react';
import ReactECharts from 'echarts-for-react';

export class LineChart extends React.Component {

  getOption = () => {
    return (
      {
        title: {
          text: '近几日销量曲线',
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['销量']
        },
        toolbox: {
          show: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['-6天', '-5天', '-4天', '-3天', '-2天', '-1天', '0天']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          }
        },
        series: [
          {
            name: '销量',
            type: 'line',
            data: this.props.data.reverse(),
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
              ]
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          },
        ]
      }
    )
  }

  render() {
    return <ReactECharts option={this.getOption()} />;
  }
};

export class BookBarChart extends React.Component {

  getOption = () => {
    return (
      {
        title: {
          text: this.props.text,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['书籍']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: this.props.bookChartData.name.reverse(),
        },
        series: [
          {
            name: '书籍',
            type: 'bar',
            data: this.props.bookChartData.num.reverse(),
          },
        ]
      }
    );
  }

  render() {
    return <ReactECharts option={this.getOption()} />;
  }
};

export class UserBarChart extends React.Component {

  getOption = () => {
    return (
      {
        title: {
          text: 'Top10用户消费榜',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['用户']
        },
        color: ['green'],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: this.props.userChartData.name.reverse(),
        },
        series: [
          {
            name: '用户',
            type: 'bar',
            data: this.props.userChartData.num.reverse(),
          },
        ]
      }
    );
  }

  render() {
    return <ReactECharts option={this.getOption()} />;
  }
}

export class UserPieChart extends React.Component {

  getOption = () => {
    return (
      {
        title: {
          text: '不同类型书籍购买分布',
          left: 'center',
          bottom: '0%',
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: '购买量',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
              show: false
            },
            data: this.props.data,
          }
        ]
      }
    );
  }

  render() {
    return <ReactECharts option={this.getOption()} />
  }
}
