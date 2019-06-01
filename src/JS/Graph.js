import { type } from "os";

const CHART = document.getElementById("barchart");
Chart.defaults.global.animation=200;
let barchart=new Chart(CHART,{
    type:'bar',
    data:{
        labels:['jan','feb','march','apr'],
        datasets:[
            {
                data:[10,50,25,30]
            }
        ]
    }
});