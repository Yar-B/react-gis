import { React, useRef, useState } from "react";
import parcel_data from '../data/properties.json';
import post_data from '../data/postOffice.json';
import CustomMap from "../Components/Map/customMap";
import Diagramm from "../Components/HighCharts/Diagramm"
import Selector from "../Components/Select/selector";
import SearchSelect from "../Components/Select/SearchSelector";
import Loader from "../Components/Loader/loader";
import { Button, Table, Modal, message } from 'antd';
import { SearchOutlined, CloseOutlined  } from '@ant-design/icons';




const columns = [
  {
    title: 'Код посылки',
    dataIndex: 'parcelno',
    width: '25%',
  },
  {
    title: 'Адрес посылки',
    dataIndex: 'propaddr',
    width: '25%',
  },
  {
    title: 'Долгота',
    dataIndex: 'latitude',
    width: '25%',
  },
  {
    title: 'Широта',
    dataIndex: 'longitude',
    width: '25%',
  }
];

const loadJS = (id, url, location, onLoad) => {
  if (!document.getElementById(id)) {
    const scriptTag = document.createElement("script");
    location.appendChild(scriptTag);
    scriptTag.src = url;
    scriptTag.id = id;
    if (onLoad) {
      scriptTag.onload = onLoad;
    }
  }
};


// function FormatWord(word){
//   return word.split("").join('.');
// }
// const name = 'GIS';
parcel_data.map((item, index) => {
  item['visible']=false; 
  item['key'] = index; 
  item['own'] = Math.floor(Math.random() * (6 - 1)) + 1}
  )
post_data.map((item, index) => {
  if (index===0){
    item['visible']=true;
  }
  else{
    item['visible']=false;
  } 
  item['id'] = index
})

function MainPage() {
  const [ parcels, setData ] = useState(parcel_data);
  const [ posts, setPost ] = useState(post_data);
  const [loading, setLoading] = useState(true);
  const [ selectedPosts, SetSelectedPosts ] = useState();
  const [ selectedParcels, SetSelectedParcels ] = useState();
  const [ ownID, SetOwnID ] = useState(1);
  const [ coordinates, setCoordinates ] = useState ([[42.3141419577, -83.1221815483],  []]);
  const [ startPos, setStartPos ] = useState(true)
  const infOfEndPoint = () => {
    message.warning('Выберите конечную точку');
  };
// useEffect(() => {
//   data.map(item => setData(item), setLoading(false))
//   }, [])
//   data.map(item => {item['visible']=false})

  function changeProperties(value) {
    removeRoute();
    ref.setCenter([42.3141419577, -83.1221815483]);
    ref.setZoom(10);
    SetSelectedParcels(value);
    setCoordinates(
      coordinates.map((coordinate, index) =>{
        if (index === 1){
          parcels.map(item => {
            if (item.propaddr ===value){
              coordinate = [item.latitude, item.longitude]
            }
          })
        }
        return coordinate
      })
  )
  setData(
      parcels.map(item => {
        if (item.propaddr === value){
          item.visible = true;
        }
        else{
          item.visible = false
        }
        return item
      })
    )
  }

  
  function changePosts(value) {
    removeRoute();
    ref.setCenter([42.3141419577, -83.1221815483]);
    ref.setZoom(10);
    SetSelectedPosts(value);
    SetSelectedParcels(null);
    setData(parcels.map(item=>{
      item.visible = false
      return item
    }
    ))

    setCoordinates(
        coordinates.map((coordinate, index) =>{
          if (index === 0){
            posts.map(item => {
              if (item.propaddr ===value){
                coordinate = [item.latitude, item.longitude]
              }
            })
          }
          else{
            coordinate = []
          }
          return coordinate
        })
    )
    setPost(
      posts.map((item, index) => {
        if (item.propaddr === value){
          item.visible = true;
          SetOwnID(index+1);
        }
        else{
          item.visible = false
        }
        return item
      })
    )
  }

  const [isModalDiagrammVisible, setIsModalDiagrammVisible] = useState(false);
  function showModalDiagramm() {
    setIsModalDiagrammVisible(true);
  };
  const handleCancel = () => {
    setIsModalDiagrammVisible(false);
  };

  const [ymaps, setYmaps] = useState(null);
  const [ref, setRef] = useState(null);
  function cleanMap(){
        ref.setCenter([42.3141419577, -83.1221815483])
        ref.setZoom(10)
        ref.geoObjects.remove(routes.current);
        SetSelectedPosts(posts[0].propaddr);
        SetSelectedParcels(null);
        SetOwnID(1);
        setCoordinates([[42.3141419577, -83.1221815483],  []])
        setStartPos(true)
        setData(parcels.map(item=>{
          item.visible = false
          return item
        }
        ))
        setPost(posts.map((item, index)=>{
          if (index === 0){
            item.visible = true
          }
          else{
            item.visible = false
          }
          return item
        }))
  }
  const routes = useRef(null);
  function getRoute (ref) {
    if (ymaps && coordinates[1].length !== 0) {
      const multiRoute = new ymaps.multiRouter.MultiRoute({
          // Описание опорных точек мультимаршрута.
          referencePoints: coordinates,
          // Параметры маршрутизации.
          params: {
            // Ограничение на максимальное количество маршрутов, возвращаемое маршрутизатором.
            results: 10
          }
        },
        {
          // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
          boundsAutoApply: true,
          wayPointVisible: false,
          // Внешний вид линии маршрута.
          routeActiveStrokeWidth: 6,
          routeActiveStrokeColor: "#1890ff"
        }
      )

     // Кладем полученный маршрут в переменную
     ref.geoObjects.remove(routes.current);
      routes.current = multiRoute;
      ref.geoObjects.add(routes.current);
      
    }
    else
    {
    infOfEndPoint();
    }
  };    
  function removeRoute(){
    ref.geoObjects.remove(routes.current)
  }
  
  function initHeatMap (ymaps){
    loadJS(
      "Heatmap",
      "https://yastatic.net/s3/mapsapi-jslibs/heatmap/0.0.1/heatmap.min.js",
      document.head,
      () => getHeatMap(ymaps)
    );
  };
  const hm = useRef(null);

  function getHeatMap(ymaps){
    ymaps.ready(["Heatmap"]).then(function() {
      var data = [];

      for (var i = 0; i < parcel_data.length; i++) {
        data.push([parcel_data[i].latitude, parcel_data[i].longitude])
      };

      var heatmap = new ymaps.Heatmap(data, {
          radius: 15,
          dissipating: false,
          opacity: 0.8,
          intensityOfMidpoint: 0.2,
          gradient: {
              0.1: 'rgba(128, 255, 0, 0.7)',
              0.2: 'rgba(255, 255, 0, 0.8)',
              0.7: 'rgba(234, 72, 58, 0.9)',
              1.0: 'rgba(162, 36, 25, 1)'
          }
      });
      hm.current = heatmap;
      console.log(hm.current);
      // ref.geoObjects.add(hm.current)
      hm.current.setMap(ref);
  });
  }

  function setHeatMap(){
    if (hm.current){
      hm.current.setMap(ref);
    }
    else{
      initHeatMap(ymaps);
    }
  }

  function destroyHeatMap(){
    hm.current.destroy()
  }

  const hmIsShow = useRef(null);

  function toggleStateHeatMap(){
    if (hmIsShow.current){
      destroyHeatMap();
      console.log("del");
      hmIsShow.current = false;
    }
    else{
      setHeatMap();
      console.log("set");
      hmIsShow.current = true;

    }
  }

  return (
    <div className = "wrapper">
        {/* <div className = 'top'>{FormatWord(name)} 
        <br/>
        </div> */}
          {/* <Button type="primary" onClick={showModalDiagramm} style={{ margin: '20px' }}>Показать диаграмму</Button> */}
          {ref ? (null) : (<Loader/>)}
          <CustomMap
            showModalDiagramm ={showModalDiagramm}
            parcels = {parcels} 
            posts = {posts} 
            ymaps = {ymaps}
            setYmaps = {setYmaps}
            refs = {ref}
            setRef = {setRef}
            setLoading = {setLoading}
            toggleStateHeatMap = {toggleStateHeatMap}
            // mapState = {mapState} 
          />
          <div className = 'content'>
            <div className = 'selectCont'>
              <div className = "selectItem selectMargin">
                <span>Точка отправки: </span>
                <Selector data = {posts} onChange = {changePosts} startPos = {startPos} selected = {selectedPosts}/>
              </div>
              <div className = "selectItem">
                <span>Конечная точка: </span>
                <SearchSelect data = {parcels} onChange = {changeProperties} startPos = {startPos} selected = {selectedParcels} owner = {ownID}/>
              </div>
            </div>
            <div className = 'buttonCont'>
                <Button className = "routeSearchBut" type="primary" onClick={() => getRoute(ref)} style={{ marginRight: '20px'}}>Построить маршрут</Button>
                <Button className = "routeSearchButMob" type="primary" onClick={() => getRoute(ref)} icon={<SearchOutlined />}/>
                <Button className = "routeDeleteBut" type="primary" danger disabled={false} onClick = {() => cleanMap()}>Очистить</Button>
                <Button className = "routeDeleteButMob" type="primary" danger disabled={false} onClick = {() => cleanMap()} icon={<CloseOutlined  />}/>
            </div>
          </div>
          {/* <ParcelsTable data = {parcels} /> */}
          <Table columns={columns} dataSource={parcels} scroll={{ y: 240 }} pagination={{size: "small"}}/>
          <Modal 
            visible={isModalDiagrammVisible} 
            onOk={handleCancel} 
            okText = "Закрыть" 
            cancelButtonProps={{hidden: true}}
          >
            <Diagramm parcelsData = {parcels} postsData = {posts}/>
          </Modal>
          </div>
    );
}


export default MainPage;