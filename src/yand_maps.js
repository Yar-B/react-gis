ymaps.ready(init);

function init () {
    var myMap = new ymaps.Map('map', {
        center: [55.751574, 37.573856],
        zoom: 9,
        controls: ['zoomControl', 'fullscreenControl'],
        // behaviors: ['drag']
    });

    var clusterer_collectoin = new ymaps.GeoObjectCollection(),
        mark_collectoin = new ymaps.GeoObjectCollection();
        kml_data_collectoin = new ymaps.GeoObjectCollection();

    clusterer = new ymaps.Clusterer({
        preset: 'islands#invertedVioletClusterIcons',
        groupByCoordinates: false,
        clusterDisableClickZoom: true,
        clusterHideIconOnBalloonOpen: false,
        geoObjectHideIconOnBalloonOpen: false
    });

    getPointOptions_clusterer = function () {
        return {
            preset: 'islands#violetIcon'
        };
    };
    getPointOptions_clusterer = function () {
        return {
            preset: 'islands#dotIcon',
            iconColor: '#735184'
        };
    };


    geoObjects = [];
    $.ajax({
            type : 'GET',
            url : 'data/properties.json'
        }).done(function(data) {
            getPointData = function (index) {
                return {
                    balloonContentHeader:'Номер посылки' + data[index].parcelno,
                    balloonContentBody: 'Адрес товара:' + data[index].propaddr,
                    balloonContentFooter: '<font size=1>Информация предоставлена: балуном <strong>метки ' + index + '</strong></font>',
                    clusterCaption: 'Посылка <strong>' + data[index].parcelno + '</strong>'
                };
            };
            if (data) {
                $.each(data, function(index, value) {
                    var coordinate = [data[index].latitude, data[index].longitude];
                    geoObjects[index] = new ymaps.Placemark(coordinate, getPointData(index), getPointOptions_clusterer());
                    mark_collectoin.add( new ymaps.Placemark(coordinate, getPointData(index), {
            preset: 'islands#circleIcon',
            iconColor: '#3caa3c'
        }));
                });
            }
        clusterer.add(geoObjects);
        clusterer_collectoin.add(clusterer);
        myMap.setBounds(clusterer.getBounds(), {
        checkZoomRange: true
        });
    });


        ymaps.geoXml.load('http://openflights.org/demo/openflights-sample.kml')
            .then(function (res) {
                res.geoObjects.each(function (obj) {
                    obj.options.set({preset: 'islands#blackCircleIcon'});
                    if (!obj.geometry) {
                        obj.each(function (obj) {
                            obj.options.set({strokeColor: "9090e8"});
                        });
                    }
                });
                kml_data_collectoin.add(res.geoObjects);
            });

    $('#clusterer_checkbox input[type=checkbox]').change(function(){
        ($(this).is(':checked')) ? myMap.geoObjects.add(clusterer_collectoin) : myMap.geoObjects.remove(clusterer_collectoin);
    });
    $('#mark_checkbox input[type=checkbox]').change(function(){
        ($(this).is(':checked')) ? myMap.geoObjects.add(mark_collectoin) : myMap.geoObjects.remove(mark_collectoin);
    });
    // $('#heatmap_checkbox input[type=checkbox]').change(function(){
    //     ($(this).is(':checked')) ? myMap.geoObjects.add(heatmap_collectoin) : myMap.geoObjects.remove(heatmap_collectoin);
    // });
    $('#kml_checkbox input[type=checkbox]').change(function(){
        ($(this).is(':checked')) ? myMap.geoObjects.add(kml_data_collectoin) : myMap.geoObjects.remove(kml_data_collectoin);
    });
}