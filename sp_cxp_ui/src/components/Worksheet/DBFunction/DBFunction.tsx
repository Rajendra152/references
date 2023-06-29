
import * as DBService from '../../../services/ImportODBCServices';

export const disConnection = () =>{
  let disConn = DBService.disConnection();
  disConn.then((result)=>{
    let data = result.data;
    if(data.status==='error'){
      alert(data.error);
    }
  }).then(error=>{
    console.error(error);
  }).finally(()=>{

  });
}
