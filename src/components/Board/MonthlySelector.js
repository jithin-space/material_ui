import React,{PureComponent} from 'react'
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DatePicker from 'material-ui-pickers/DatePicker';


export default class MonthlySelector extends PureComponent {

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (date) => {
    this.props.onChange(date);
  }

  render() {
    const { currentMonth } = this.props;
    return (
      <MuiPickersUtilsProvider  utils={DateFnsUtils}>
        <DatePicker
          label='Month:'
          value={currentMonth}
          onChange={this.handleChange}
          autoOk={true}
          clearLabel='Clear'
          disableFuture={true}
          format='MMM YYYY'
          leftArrowIcon='<<'
          rightArrowIcon='>>'
        />
      </MuiPickersUtilsProvider>
    );
  }
}
