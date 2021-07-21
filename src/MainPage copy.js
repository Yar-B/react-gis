import { React, useRef, useState } from "react";
import parcel_data from './data/properties.json';
import post_data from './data/postOffice.json';
import CustomMap from "./Components/Map/customMap";
import Diagramm from "./Components/HighCharts/Diagramm"
import Selector from "./Components/Select/selector";
import SearchSelect from "./Components/Select/SearchSelector";
import { BrowserRouter as  Router, Route, Switch, Link } from "react-router-dom";
import ParcelsTable from "./Components/Table/parcelsTable";
import Loader from "./Components/Loader/loader";
import { Button, Table, Modal, message } from 'antd';




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


// function FormatWord(word){
//   return word.split("").join('.');
// }
// const name = 'GIS';
parcel_data.map((item, index) => {
  item['visible']=false; 
  item['id'] = index; 
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
          if (index == 0){
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
    if (ymaps && coordinates[1].length != 0) {
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
  


  return (
    <div className = 'backgroundContent'>
      <div className='wrapper'>
        {/* <div className = 'top'>{FormatWord(name)} 
        <br/>
        </div> */}
          {/* <Button type="primary" onClick={showModalDiagramm} style={{ margin: '20px' }}>Показать диаграмму</Button> */}
          <CustomMap
          showModalDiagramm ={showModalDiagramm}
          parcels = {parcels} 
          posts = {posts} 
          ymaps = {ymaps}
          setYmaps = {setYmaps}
          refs = {ref}
          setRef = {setRef}
          // mapState = {mapState} 
          />
          <div className = 'content'>
            <div>
                <span>Точка отправки:</span>
                &nbsp;
                <Selector data = {posts} onChange = {changePosts} startPos = {startPos} selected = {selectedPosts}/>
                <span>Конечная точка:</span>
                &nbsp;
                <SearchSelect data = {parcels} onChange = {changeProperties} startPos = {startPos} selected = {selectedParcels} owner = {ownID}/>
            </div>
            <div>
                <Button type="primary" onClick={() => getRoute(ref)} style={{ margin: '20px' }}>Построить маршрут</Button>
                <Button type="primary" danger disabled={false} onClick = {() => cleanMap()}>Очистить</Button>
            </div>
          </div>
          {/* <ParcelsTable data = {parcels} /> */}
          <Table columns={columns} dataSource={parcels} scroll={{ y: 240 }} />
          <Modal 
          visible={isModalDiagrammVisible} 
          onOk={handleCancel} 
          okText = "Закрыть" 
          cancelButtonProps={{hidden: true}}
          >
            <Diagramm parcelsData = {parcels} postsData = {posts}/>
          </Modal>
      </div>
    </div>);
}


export default MainPage;
