import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import Leaflet from 'leaflet'
import axios from 'axios'
import './App.css';

var qlueIcon = Leaflet.icon({
  iconUrl: 'http://www.qlue.co.id/vacancy/svc/icon-marker.png',
  iconSize: [25, 25],
  iconAnchor: [25, 25],
  popupAnchor: [-3, -26] })

var position=[-6.21462, 106.84513]

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      dataQlue: []
    }
  }

  componentDidMount(){
    const self = this
    axios.get('https://crossorigin.me/http://www.qlue.co.id/vacancy/svc/getDataExample.php')
      .then(response => { self.setState({ dataQlue: response.data }) })
      .catch(err => console.error(err))
  }

  render() {
    return (
      <div>
        <Map center={[-6.21462, 106.84513]} zoom={12}>
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {
            this.state.dataQlue.map((item, index) => {
              return(
                <Marker key={index} position={ [item.lat, item.lng] } icon={qlueIcon}>
                  <Popup>
                    <span>
                      Name : { item.name }<br/>
                      Address : { item.address }
                    </span>
                  </Popup>
                </Marker>
              )
            })
          }
        </Map>
      </div>
    );
  }
}

export default App;
