import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
      return (  
        <div>          
          <table className="table table-bordered">
            <tbody>
            {
              this.props.emotions.map((emo, index)=>{
                return Object.entries(emo).map((val, index) =>{
                  let aux = val.toString().split(',');
                  return <tr><td>{aux[0]}</td><td>{aux[1]}</td></tr>
                })
              })
            }
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;