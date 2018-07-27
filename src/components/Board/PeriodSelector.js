import React,{PureComponent} from 'react'
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DatePicker from 'material-ui-pickers/DatePicker';


export default class PeriodSelector extends PureComponent {
  constructor(props){
    super(props);
    this.handleFromDateChange = this.handleFromDateChange.bind(this);
    this.handleToDateChange = this.handleToDateChange.bind(this);
  }

  handleFromDateChange = (date) => {
    this.props.onChange({from: date , to: this.props.current.to});
  }

  handleToDateChange = (date) => {
      this.props.onChange({from: this.props.current.from , to: date});
  }

  render() {
    const { from ,to } = this.props.current;
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          label="From:"
          value={from}
          onChange={this.handleFromDateChange}
          autoOk={true}
          clearLabel='Clear'
          disableFuture={true}
          format='MMM YYYY'
          leftArrowIcon='<<'
          rightArrowIcon='>>'
        /><br/><br/>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            label="To:"
            value={to}
            onChange={this.handleToDateChange}
            autoOk={true}
            clearLabel='Clear'
            disableFuture={true}
            format='MMM YYYY'
            leftArrowIcon='<<'
            rightArrowIcon='>>'
          />
        </MuiPickersUtilsProvider>
      </MuiPickersUtilsProvider>
    );
  }
}
