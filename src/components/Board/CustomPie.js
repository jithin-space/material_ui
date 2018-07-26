import React, {
    Component
} from 'react';
import  {PieChart, Pie, Sector,Cell,ResponsiveContainer} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';


  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Classes ${value}/${parseInt(value/percent)}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`( ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};



class CustomPie extends Component{

  constructor(props){
    super(props);
    this.state={
      activeIndex: 0
    }

    this.onPieEnter = this.onPieEnter.bind(this);
  }

  onPieEnter = (data, index)=> {
    this.setState({
      activeIndex: index,
    });
  }


  render(){


    const reducer = (accumulator, currentValue) => {
    return  accumulator + parseInt(currentValue.value);

    }
    let total = this.props.data.value.reduce(reducer,0);

  

    return(
       <ResponsiveContainer width="80%" height="100%">
         <PieChart ><Pie
           data={this.props.data.value}
           activeIndex={this.state.activeIndex}
           activeShape={renderActiveShape}
           cx={'60%'}
           cy={'50%'}
           innerRadius={'50%'}
           outerRadius={'80%'}
           onMouseEnter={this.onPieEnter}

         >

         </Pie></PieChart></ResponsiveContainer>);
  }
}

export default CustomPie
