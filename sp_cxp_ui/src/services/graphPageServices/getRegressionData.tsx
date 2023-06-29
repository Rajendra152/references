import { getRegressionDataBykey } from './../RedisServices';
import * as Config from '../../components/App/Config';
import { post } from './DataService';

export async function  getRegressionData(plotData:Object){
    const columnData = {
        // data_format:0,
        // data_params:{​​​
        //     key:"test34",
        //     type:"string"
        // }​​​,
        // data_columns:{​​​
        //     data1:"col1",
        //     data2:"col2"
        // }​  ​  ​
    }
    // const data = await axios.post('http://127.0.0.1:8000/plot_regression/execute_regression', columnData).then(response=>{
    const data = await post(Config.getRegressionData, columnData).then(response=>{  
      const res_data = response.data
      const reg_key = res_data['result'].data_key
      const reg_data = getRegressionDataBykey(reg_key).then(res=>{
        const new_res = JSON.parse(res)
        const new_graph_data = []
  
        new_graph_data.push([{
          x: new_res.x,
          y: new_res.y,
        }])
        return new_graph_data
      })
      return reg_data
    })
    return data
  }