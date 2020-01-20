
import React, {Component} from 'react';
import Axios from 'axios';
import utils from '../utils';

export default class Current extends Component {
  constructor(props) {
    super();
    this.state = {
        location: props.location,
      station: props.station,
      currentTemp: NaN,
      currentWindChill: 0,
      currentText: '',
    };
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const res = await Axios.get(
        `https://api.weather.gov/stations/${
            this.state.station
        }/observations/latest`,
    );

    const current = res.data;

    this.setState({
        currentTemp: current.properties.temperature.value,
        currentWindChill: current.properties.windChill.value,
        currentText: current.properties.textDescription,
    });
  }

  render() {
    return (
    <div>     
        <h2>{this.state.location}</h2>     
        Currently:{' ' + this.state.currentText}<br />
        Wind Chill:{' ' + utils.convertTemp(this.state.currentWindChill)}<br />
        Temperature:{' ' + utils.convertTemp(this.state.currentTemp)}<br />
        
    </div>
    );
  }
}
