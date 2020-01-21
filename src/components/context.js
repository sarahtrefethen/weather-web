import React, {Component} from 'react';
import Axios from 'axios';
import secrets from '../secrets';

export default class Context extends Component {

    constructor(props) {
        super();
        this.state = {
            stationId: props.stationId,
            pastWeek: {},
            normals: {},
        }
    }

    componentDidMount() {
        this.loadData();
    }
    
    async loadData() {

        // last week this year
        const now = new Date();
        const lastWeek = new Date(now - 604800000)
        const uri = `https://www.ncdc.noaa.gov/cdo-web/api/v2/data?stationid=${
            this.state.stationId
        }&datasetid=GHCND&startdate=${
            `${lastWeek.toISOString().slice(0, 10)}`
        }&enddate=${
            `${now.toISOString().slice(0, 10)}`
        }&units=standard&limit=200&datatypeid=TMAX&datatypeid=TMIN`;
        

        try {
            const { data } = await Axios.get(uri,
                { headers: {'token': secrets.NOAA_TOKEN } }
            );


            const pastWeek = data.results.reduce((history, elem) => {
                if (!history[elem.date.slice(5, 10)]) {
                    history[elem.date.slice(5, 10)] = {};
                }
                history[elem.date.slice(5, 10)][elem.datatype] = elem.value;
                return history;
            }, {});

            // get last week 'normals' 
            const normRes = await Axios.get(`https://www.ncdc.noaa.gov/cdo-web/api/v2/data?stationid=${
                this.state.stationId}&datasetid=NORMAL_DLY&enddate=2010-${
                    now.toISOString().slice(5, 10)
                }&units=standard&limit=200&startdate=2010-${
                    lastWeek.toISOString().slice(5, 10)
                }&datatypeid=DLY-TMAX-NORMAL&datatypeid=DLY-TMIN-NORMAL`,
            { headers: {'token': secrets.NOAA_TOKEN } });
            console.log(normRes.data);

            const normals = normRes.data.results.reduce((history, elem) => {
                if (!history[elem.date.slice(5, 10)]) {
                    history[elem.date.slice(5, 10)] = {};
                }
                history[elem.date.slice(5, 10)][elem.datatype] = elem.value;
                return history;
            }, {});

            this.setState({
                pastWeek,
                normals
            })
    
        
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        const {pastWeek, normals} = this.state;
        const pastWeekDates = Object.keys(pastWeek);
        const normalsDates = Object.keys(normals);
        return (
          <div>
                        <h3>Last Week:</h3>
                    <table>
                        <tr>
                        <td>Date:</td>
                    <td>High:</td>
                    <td>Low:</td>

                    </tr>
                    {pastWeekDates.map((date, index) => {
                    return (
                    <tr key={index}>
                        <td>{date}</td>
                        <td>{pastWeek[date].TMAX + "F"}</td>
                        <td>{pastWeek[date].TMIN + "F"}</td>
                    </tr>
                    )
                    })}    
                        
                                            
                    </table>
                    
            
                <h3>Past Averages:</h3>
                    <table>
                        <tr>
                    <td>Date:</td>
                    <td>High:</td>
                    <td>Low:</td>
                    </tr>
                    {normalsDates.map((date, index) => {
                    return (
                    <tr key={index}>
                        <td>{date}</td>
                        <td>{normals[date]['DLY-TMAX-NORMAL'] + "F"}</td>
                        <td>{normals[date]['DLY-TMIN-NORMAL'] + "F"}</td>
                    </tr>
                    )
                    }
                    )}
                    </table>

           </div>
        )
    }

}