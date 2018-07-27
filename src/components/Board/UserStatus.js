import React, {
    Component
} from 'react';
import _ from 'lodash';
import moment from 'moment'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    LabelList,
    ResponsiveContainer
} from 'recharts';


class UserStatus extends Component {

   constructor(props){
     super(props);
     this.handleChange = this.handleChange.bind(this);
     this.state = {
        value: '',
      };
   }

   handleChange = (event, value) => {
    this.setState({ value });
  };

    render() {
        let ab = this.props.data;
        var data = {};
        var lines = {};

            let resultObj = _.groupBy(ab, function(element) {
                var dateElements = element.attendance_on.split('/');
                return dateElements[1] + '/' + dateElements[2];
            });


            var series_data = Object.keys(resultObj).map(function(key, index) {
                return ({
                    name: key,
                    value: resultObj[key].length
                })
            });

            data = _.sortBy(series_data, function(element) {

                return (new moment('01/' + element['name']).format('YYYYMMDD'));
            });

            lines =  <ResponsiveContainer width="90%" height={400}><LineChart width="100%" height="80%" data={data} margin={{ top: 10, right: 10, bottom: 5, left: 5 }}>
              <XAxis dataKey="name" type="category" interval="0" />
              <YAxis/>
              <Tooltip/>
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth="5" activeDot={{r: 10,stroke: 'red'}} dot={{ stroke: 'red', strokeWidth: 5 }}>
                <LabelList dataKey="value" position="top" />
              </Line>
            </LineChart></ResponsiveContainer>



            return ( <div>
              {lines}
            </div>
            )
        }
    }

    export default UserStatus
