//function to update map
function updateMap() {

    mapboxgl.accessToken = 'pk.eyJ1IjoiY2hldHZpc2hhbCIsImEiOiJja2JxMnFxamcyaHRiMzFwamJvb2JmdzU2In0.o881WJBOZvNoe6EWUEI4aQ';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: -2
    });


    // alert("blue: less than 20000, green: between 20000 and 40000, red: more than 40000");
 

    fetch("https://www.trackcorona.live/api/provinces")
        .then(response => response.json())
        .then(rsp => {
            console.log(rsp.data);
            rsp.data.forEach(element => {
                latitude = element.latitude;
                longitude = element.longitude;

                cases = element.confirmed;
                if (cases > 40000) { //more than 40000
                    color = "rgb(255,0,0)";
                }
                else if (cases > 20000 && cases < 40000) { // between 20000 and 40000
                    // color = `rgb(${cases},0,0)`;
                    color = `rgb(0,128,0)`;
                }
                else { //less than 20000
                    color = `rgb(0,0,255)`;
                }

                console.log(` ${element.location} : ${element.confirmed}`)

                //Marker's on the map
                new mapboxgl.Marker({
                    draggable: false,
                    color: color
                })
                    .setLngLat([longitude, latitude])//These two are promises
                    .addTo(map);
            });
            
        })

        

 


}
updateMap();
let interval = 600000;
setInterval(updateMap, interval);

// updateMap();
