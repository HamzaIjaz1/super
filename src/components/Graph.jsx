import React, { Component } from 'react';
import {Bar,Line,Pie} from 'react-chartjs-2';

class Graph extends Component {
    state = {  }
    

    
    render() { 
        return ( 
            <div>
                <head>
                <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
                </head>
                <canvas id="barchart" height="500" width="400"></canvas>

                
            </div>
         );
    }
}
 
export default Graph;