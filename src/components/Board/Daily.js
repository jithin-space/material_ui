import React,{PureComponent} from 'react'
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DatePicker from 'material-ui-pickers/DatePicker';


export default class Daily extends PureComponent {

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange = (date) => {
    this.props.onChange(date);
  }

  render() {

    const { currentDate } = this.props;

  return (
      <MuiPickersUtilsProvider  utils={DateFnsUtils}>
        <DatePicker
          label='Date:'
          value={currentDate}
          onChange={this.handleChange}
          autoOk={true}
          clearLabel='Clear'
          disableFuture={true}
          format='DD/MM/YYYY'
          leftArrowIcon='<<'
          rightArrowIcon='>>'
        />
      </MuiPickersUtilsProvider>
    );
  }
}
