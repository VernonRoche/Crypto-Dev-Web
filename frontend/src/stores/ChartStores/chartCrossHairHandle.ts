export function crosshairLine(chart,mousemove:MouseEvent){
    const {canvas, ctx, data, chartArea,scales} = chart;
    const {left, right, top, bottom} = chartArea;
    const {x, y} = scales; 
  
    chart.update('none');
    ctx.restore();
    /////////////////////////////////////////////////////
    //              Change cursor to Cross             //
    //               if inside Chart                   //
    /////////////////////////////////////////////////////
    if(mousemove.offsetX >= left && mousemove.offsetX <= right && mousemove.offsetY >= top && mousemove.offsetY <= bottom){
      canvas.style.cursor = 'crosshair';
    }else{
      canvas.style.cursor = 'default';
    }
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 1;
    ctx.setLineDash([3,3]);
  

    if(mousemove.offsetX >= left && mousemove.offsetX <= right && mousemove.offsetY >= top && mousemove.offsetY <= bottom ){
        /////////////////////////////////////////////////////
        //              Draw lines on Cursor               //
        //                                                 //
        /////////////////////////////////////////////////////
        //ligne horizontale
        ctx.beginPath();
        ctx.moveTo(left,mousemove.offsetY);
        ctx.lineTo(right,mousemove.offsetY);
        ctx.stroke();
        
    
        //ligne Vertical
        ctx.moveTo(mousemove.offsetX,top);
        ctx.lineTo(mousemove.offsetX,bottom);
        ctx.stroke();
        ctx.closePath();
    
        ctx.font= '12px sans-serif';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';

        /////////////////////////////////////////////////////
        //              Draw Labels according              //
        //               To cursor Position                //
        /////////////////////////////////////////////////////
        //label Y
        const date:string = (new Date(x.getValueForPixel(mousemove.offsetX))).toString().split("GMT")[0];
        const textwidth = ctx.measureText(date).width;
        
        ctx.beginPath();
        ctx.fillStyle = 'rgba(132,132,132,1)';
        ctx.fillRect(left-50,mousemove.offsetY - 10,50,20);
        ctx.closePath();
        ctx.fillStyle = 'white';
        ctx.fillText(y.getValueForPixel(mousemove.offsetY).toFixed(0),left-25, mousemove.offsetY);
    
        //label X
        ctx.beginPath();
        ctx.fillStyle = 'rgba(132,132,132,1)';
        ctx.fillRect(mousemove.offsetX-55,bottom,textwidth,20);
        ctx.closePath();
        ctx.fillStyle = 'white';
        ctx.fillText( date,mousemove.offsetX + 25, bottom + 10);

        /////////////////////////////////////////////////////
        //              Interpolation on curve             //
        //            according To cursor Position         //
        /////////////////////////////////////////////////////
 /*       
        const arrayLength = data.datasets[0].data.length - 1; 

        const xFirst= data.datasets[0].data[0];
        const xLast = data.datasets[0].data[arrayLength];    
        const yFirst = data.labels[0].getTime(); 
        const yLast = data.labels[arrayLength].getTime();
        const yInterpolate = y.getValueForPixel(mousemove.offsetY); 
        
        const xDiff = xLast - xFirst;
        const yDiffInterpolate = yInterpolate - yFirst;
        const yDiff = yLast - yFirst;

        const xInterpolate = (xDiff * yDiffInterpolate) / yDiff + xFirst;      
        ctx.beginPath();
        ctx.fillStyle= 'rgba(255,26,104,1)';
        ctx.strokeStyle= '#666';
        ctx.lineWidth = 3;
        ctx.setLineDash([]);
        
       if(x._gridLineItems) {
        console.log(x._gridLineItems);
        
          for (const key in x._gridLineItems) {
            
          }
          for(let i:number = 0; i< x._gridLineItems.lenght - 1; i++){
            console.log(x._gridLineItems[i].tx1 );
            console.log(x._gridLineItems[i+1].tx1);
            
            
            if(mousemove.offsetX >= x._gridLineItems[i].tx1 && mousemove.offsetX <= x._gridLineItems[i+1].tx1 ){
              console.log((i));
              
            } 
          } 
        }
        ctx.arc(
          mousemove.offsetX,
          5,
          5,
          (Math.PI / 180) * 0,
          (Math.PI / 180) * 360,
          false
        );
        ctx.fill();
        ctx.stroke();
        */
    }
}

export default crosshairLine;