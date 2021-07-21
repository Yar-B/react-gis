import React from "react";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

function Diagramm(props){
  const diagrammData = props.postsData.map((item, index) => {
    return [ item.propaddr, props.parcelsData.filter(items => items.own == index+1).length]
  }).sort( function(a, b) {
    return b[1] - a[1];
  })
  const options = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Диаграмма распределния посылок'
    },
    // subtitle: {
    //     text: 'Source: <a href="http://en.wikipedia.org/wiki/List_of_cities_proper_by_population">Wikipedia</a>'
    // },
    xAxis: {
        type: 'category',
        labels: {
            rotation: 0,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Количество посылок'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'Имеет <b>{point.y} точек</b>'
    },
    series: [{
        name: 'ParcelsGistogramm',
        data: diagrammData

    }]
};

    return (
        <HighchartsReact highcharts = {Highcharts} options = {options}/>
    )
}

export default Diagramm;