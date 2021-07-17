let lineGraphInfo=document.getElementById("lineGraphInfo");
let barGraphInfo=document.getElementById("barGraphInfo");
let pieChartInfo=document.getElementById("pieChartInfo");
let radarChartInfo=document.getElementById("radarChartInfo");
let plotButton=document.getElementById("plotButton");
let highlighter=document.getElementById("highlighter");
// let board=ocument.getElementById("board");

document.getElementById("selectGraphType").addEventListener("click",function(e){
    // console.log(e.target.innerHTML);
    if(e.target.id==="highlighter")
        return;
    lineGraphInfo.style.display="none";
    barGraphInfo.style.display="none";
    pieChartInfo.style.display="none";
    radarChartInfo.style.display="none";
    let clickedEle=e.target.innerHTML.toLowerCase();
    
    console.log(clickedEle);
    if(clickedEle==="line graph"){
        lineGraphInfo.style.display="block";       
        plotButton.innerHTML="Plot Line Graph";
        highlighter.style.top="0";
        highlighter.style.left="0";
    }
    else if(clickedEle==="bar graph"){
        barGraphInfo.style.display="block";
        plotButton.innerHTML="Plot Bar Graph";
        highlighter.style.top="0";
        highlighter.style.left="50%";
    }
    else if(clickedEle==="pie chart"){
        pieChartInfo.style.display="block";
        plotButton.innerHTML="Plot Pie Chart";
        highlighter.style.top="50%";
        highlighter.style.left="0";
    }
    else{
        radarChartInfo.style.display="block";
        plotButton.innerHTML="Plot Radar Chart";
        highlighter.style.top="50%";
        highlighter.style.left="50%";
    }
});

function lineGraphType(){
    let lineGraphX=document.getElementsByName("x-axis-type-b");
    if(lineGraphX[0].checked===true){
        document.getElementById("x-axis-label-cont").style.display="block";
        document.getElementById("x-axis-value-cont").style.display="none";
    }
    else{
        document.getElementById("x-axis-label-cont").style.display="none";
        document.getElementById("x-axis-value-cont").style.display="block";
    }
}
function plotGraph(namer){
    // console.log(namer);
    let graphArr=["Line Graph","Bar Graph","Pie Chart","Radar Chart"]
    let graphName=graphArr.indexOf(namer.substring(5));
    // console.log(graphName);
    document.getElementById("board").innerHTML="";
    if(graphName===0){
        let lineGraphTemp=document.getElementsByName("x-axis-type-b");
        let lineGraphX="value";
        if(lineGraphTemp[0].checked===true)
            lineGraphX="label";
        console.log(graphArr[graphName]+" "+lineGraphX);
        let ymax=document.getElementById("y-max-range").value;
        let ymin=document.getElementById("y-min-range").value;
        let yvals=document.getElementById("y-axis-values")
                        .value.split(" ");
        if(lineGraphX==='label'){   
            let xlabels=document.getElementById("x-axis-labels")
            .value.split(" ");
            plotLineLabel(ymax,ymin,yvals,xlabels);
        }
        else{
            let xmax=document.getElementById("x-max-range").value;
            let xmin=document.getElementById("x-min-range").value;
            let xvals=document.getElementById("x-axis-values")
                        .value.split(" ");
            // console.log(xvals);
            plotLineVals(ymax,ymin,yvals,xmax,xmin,xvals);
        }
    }
    else if(graphName===1){
        console.log(graphArr[graphName]);
        let ymax=document.getElementById("y-max-range-bar").value;
        let ymin=document.getElementById("y-min-range-bar").value;
        let yvals=document.getElementById("y-axis-values-bar")
                        .value.split(" ");
        let xlabels=document.getElementById("x-axis-labels-bar")
                        .value.split(" ");
        plotBar(ymax,ymin,yvals,xlabels);
    }
    else if(graphName===2){
        console.log(graphArr[graphName]);
        let pievals=document.getElementById("pie-chart-values").value.split(" ");
        let pielabels=document.getElementById("pie-chart-labels")
                        .value.split(" ");
        console.log(pievals);
        plotPie(pievals,pielabels);
    }
    else if(graphName===3){
        console.log(graphArr[graphName]);
        let radarnames=[];
        let radarcurrent=[];
        let radartotal=[];
        
        for(let i=1;i<6;i++){
            radarnames.push(
                document.getElementById("stat-name-"+i).value
            );
            radarcurrent.push(
                document.getElementById("stat-"+i+"-value").value
            );
            radartotal.push(
                document.getElementById("stat-"+i+"-max-value").value
            );
        }
        plotRadar(radarnames,radarcurrent,radartotal);
    }
}

function plotLineVals(ymax,ymin,yvals,xmax,xmin,xvals){
    let board=document.getElementById("board");
    const linex=document.createElementNS("http://www.w3.org/2000/svg","line");
    linex.setAttribute("x1",30);
    linex.setAttribute("x2",30);
    linex.setAttribute("y1",-15);
    linex.setAttribute("y2",371);
    const gx=document.createElementNS("http://www.w3.org/2000/svg","g");
    gx.classList.add("grid");
    gx.classList.add("x-grid");
    gx.appendChild(linex);

    const liney=document.createElementNS("http://www.w3.org/2000/svg","line");
    liney.setAttribute("x1",30);
    liney.setAttribute("x2",416);
    liney.setAttribute("y1",371);
    liney.setAttribute("y2",371);
    const gy=document.createElementNS("http://www.w3.org/2000/svg","g");
    gy.classList.add("grid");
    gy.classList.add("y-grid");
    gy.appendChild(liney);

    const yLabels=document.createElementNS("http://www.w3.org/2000/svg","g");
    yLabels.classList.add("labels");
    yLabels.classList.add("y-labels");
    console.log(ymax);
    for(let i=0;i<6;i++){
        const tempLabely=document.createElementNS("http://www.w3.org/2000/svg","text");
        tempLabely.setAttribute("x",8);
        tempLabely.setAttribute("y",371-(i*381/5));
        tempLabely.innerHTML=(i*ymax/5);
        yLabels.appendChild(tempLabely);
    }

    const xLabels=document.createElementNS("http://www.w3.org/2000/svg","g");
    xLabels.classList.add("labels");
    xLabels.classList.add("x-labels");
    console.log(xmax);
    for(let i=0;i<6;i++){
        const tempLabelx=document.createElementNS("http://www.w3.org/2000/svg","text");
        tempLabelx.setAttribute("x",30+(i*385/5));
        tempLabelx.setAttribute("y",381);
        tempLabelx.innerHTML=(i*ymax/5);
        xLabels.appendChild(tempLabelx);
    }
    let graphClr=document.getElementById("graph-color").value;
    // console.log
    let ylims=386;
    let xlims=386;
    const inGraphLine=document.createElementNS("http://www.w3.org/2000/svg","polyline");
    inGraphLine.setAttribute("fill","none");
    inGraphLine.setAttribute("stroke",graphClr);
    inGraphLine.setAttribute("stroke-width","2");
    let temppoly="";
    let xvalLen=xvals.length;
    for(let i=0;i<xvalLen;i++){
        let tempxval=30 + xvals[i]/xmax*xlims;
        let tempyval=371 - yvals[i]/ymax*ylims;
        temppoly+=tempxval+","+tempyval+" ";
    }
    // console.log(xvals);
    if(xvals[0]!==""){
        inGraphLine.setAttribute("points",temppoly);
    }

    let xaxislbl=document.createElementNS("http://www.w3.org/2000/svg","text");
    xaxislbl.setAttribute("x",30+xlims/2*0.8);
    xaxislbl.setAttribute("y",391);
    xaxislbl.innerHTML=document.getElementById("x-axis-title-value").value;
    xLabels.appendChild(xaxislbl);
    let yaxislbl=document.createElementNS("http://www.w3.org/2000/svg","text");
    yaxislbl.setAttribute("x",5);
    yaxislbl.setAttribute("y",371-ylims/2*0.9);
    yaxislbl.innerHTML=document.getElementById("y-axis-title").value;
    yaxislbl.setAttribute("transform","rotate(270 5 "+(371-ylims/2*0.9)+")");
    yLabels.appendChild(yaxislbl);
    let graphlbl=document.createElementNS("http://www.w3.org/2000/svg","text");
    graphlbl.setAttribute("x",30+xlims/2*0.8);
    graphlbl.setAttribute("y",-20);
    graphlbl.innerHTML=document.getElementById("graph-name").value;
    xLabels.appendChild(graphlbl);
    

    board.appendChild(gx);
    board.appendChild(gy);
    board.appendChild(yLabels);
    board.appendChild(xLabels);
    board.appendChild(inGraphLine);

}
function plotLineLabel(ymax,ymin,yvals,xlabels){
    let board=document.getElementById("board");
    let graphClr=document.getElementById("graph-color").value;
    const linex=document.createElementNS("http://www.w3.org/2000/svg","line");
    linex.setAttribute("x1",30);
    linex.setAttribute("x2",30);
    linex.setAttribute("y1",-15);
    linex.setAttribute("y2",371);
    const gx=document.createElementNS("http://www.w3.org/2000/svg","g");
    gx.classList.add("grid");
    gx.classList.add("x-grid");
    gx.appendChild(linex);

    const liney=document.createElementNS("http://www.w3.org/2000/svg","line");
    liney.setAttribute("x1",30);
    liney.setAttribute("x2",416);
    liney.setAttribute("y1",371);
    liney.setAttribute("y2",371);
    const gy=document.createElementNS("http://www.w3.org/2000/svg","g");
    gy.classList.add("grid");
    gy.classList.add("y-grid");
    gy.appendChild(liney);

    const yLabels=document.createElementNS("http://www.w3.org/2000/svg","g");
    yLabels.classList.add("labels");
    yLabels.classList.add("y-labels");
    // console.log(ymax);
    for(let i=0;i<6;i++){
        const tempLabely=document.createElementNS("http://www.w3.org/2000/svg","text");
        tempLabely.setAttribute("x",8);
        tempLabely.setAttribute("y",371-(i*381/5));
        tempLabely.innerHTML=(i*ymax/5);
        yLabels.appendChild(tempLabely);
    }
    
    const xLabels=document.createElementNS("http://www.w3.org/2000/svg","g");
    xLabels.classList.add("labels");
    xLabels.classList.add("x-labels");
    // console.log(xmax);
    let xlabelLen=xlabels.length;
    for(let i=0;i<xlabelLen;i++){
        const tempLabelx=document.createElementNS("http://www.w3.org/2000/svg","text");
        tempLabelx.setAttribute("x",30+(i*385/xlabelLen));
        tempLabelx.setAttribute("y",381);
        tempLabelx.innerHTML=xlabels[i];
        xLabels.appendChild(tempLabelx);
    }
    let ylims=386;
    let xlims=386;
    console.log(graphClr);
    const inGraphLine=document.createElementNS("http://www.w3.org/2000/svg","polyline");
    inGraphLine.setAttribute("fill","none");
    inGraphLine.setAttribute("stroke",graphClr);
    inGraphLine.setAttribute("stroke-width","2");
    let temppoly="";
    
    for(let i=0;i<xlabelLen;i++){
        let tempxval=30+(i*385/xlabelLen);
        let tempyval=371 - yvals[i]/ymax*ylims;
        temppoly+=tempxval+","+tempyval+" ";
    }
    // // console.log(xvals);
    if(xlabels[0]!=="" && yvals[0]!==""){
        inGraphLine.setAttribute("points",temppoly);
    }
    
    let xaxislbl=document.createElementNS("http://www.w3.org/2000/svg","text");
    xaxislbl.setAttribute("x",30+xlims/2*0.8);
    xaxislbl.setAttribute("y",391);
    xaxislbl.innerHTML=document.getElementById("x-axis-title-label").value;
    xLabels.appendChild(xaxislbl);
    let yaxislbl=document.createElementNS("http://www.w3.org/2000/svg","text");
    yaxislbl.setAttribute("x",5);
    yaxislbl.setAttribute("y",371-ylims/2*0.9);
    yaxislbl.innerHTML=document.getElementById("y-axis-title").value;
    yaxislbl.setAttribute("transform","rotate(270 5 "+(371-ylims/2*0.9)+")");
    yLabels.appendChild(yaxislbl);
    let graphlbl=document.createElementNS("http://www.w3.org/2000/svg","text");
    graphlbl.setAttribute("x",30+xlims/2*0.8);
    graphlbl.setAttribute("y",-20);
    graphlbl.innerHTML=document.getElementById("graph-name").value;
    xLabels.appendChild(graphlbl);

    board.appendChild(gx);
    board.appendChild(gy);
    board.appendChild(yLabels);
    board.appendChild(xLabels);
    board.appendChild(inGraphLine);
}
function plotBar(ymax,ymin,yvals,xlabels){
    let board=document.getElementById("board");
    let graphClr=document.getElementById("graph-color").value;
    const linex=document.createElementNS("http://www.w3.org/2000/svg","line");
    linex.setAttribute("x1",30);
    linex.setAttribute("x2",30);
    linex.setAttribute("y1",-15);
    linex.setAttribute("y2",371);
    const gx=document.createElementNS("http://www.w3.org/2000/svg","g");
    gx.classList.add("grid");
    gx.classList.add("x-grid");
    gx.appendChild(linex);

    const liney=document.createElementNS("http://www.w3.org/2000/svg","line");
    liney.setAttribute("x1",30);
    liney.setAttribute("x2",416);
    liney.setAttribute("y1",371);
    liney.setAttribute("y2",371);
    const gy=document.createElementNS("http://www.w3.org/2000/svg","g");
    gy.classList.add("grid");
    gy.classList.add("y-grid");
    gy.appendChild(liney);

    const yLabels=document.createElementNS("http://www.w3.org/2000/svg","g");
    yLabels.classList.add("labels");
    yLabels.classList.add("y-labels");
    // console.log(ymax);
    let ylims=386;
    let xlims=386;
    for(let i=0;i<6;i++){
        const tempLabely=document.createElementNS("http://www.w3.org/2000/svg","text");
        tempLabely.setAttribute("x",8);
        tempLabely.setAttribute("y",371-(i*381/5));
        tempLabely.innerHTML=(i*ymax/5);
        yLabels.appendChild(tempLabely);
    }
    
    const xLabels=document.createElementNS("http://www.w3.org/2000/svg","g");
    xLabels.classList.add("labels");
    xLabels.classList.add("x-labels");
    // console.log(xmax);
    let xlabelLen=xlabels.length;
    for(let i=1;i<xlabelLen+1;i++){
        const tempLabelx=document.createElementNS("http://www.w3.org/2000/svg","text");
        // tempLabelx.setAttribute("x",30+(i*385/(xlabelLen+1)));
        tempLabelx.setAttribute("x",30+(xlims/(2*xlabelLen+1)*(2*i-0.8)));
        tempLabelx.setAttribute("y",381);
        tempLabelx.innerHTML=xlabels[i-1];
        xLabels.appendChild(tempLabelx);
    }

    const bars=document.createElementNS("http://www.w3.org/2000/svg","g");
    for(let i=0;i<xlabelLen;i++){
        let bar=document.createElementNS("http://www.w3.org/2000/svg","rect");
        bar.setAttribute("x",30+(xlims/(2*xlabelLen+1)*(2*i+1)));
        bar.setAttribute("y",-15+ylims-yvals[i]/ymax*ylims);
        bar.setAttribute("width",xlims/(2*xlabelLen+1));
        bar.setAttribute("height",yvals[i]/ymax*ylims);
        bar.setAttribute("stroke-color",graphClr);
        bar.setAttribute("fill",graphClr);
        bars.appendChild(bar);
    }

    let xaxislbl=document.createElementNS("http://www.w3.org/2000/svg","text");
    xaxislbl.setAttribute("x",30+xlims/2*0.8);
    xaxislbl.setAttribute("y",391);
    xaxislbl.innerHTML=document.getElementById("x-axis-title-label-bar").value;
    xLabels.appendChild(xaxislbl);
    let yaxislbl=document.createElementNS("http://www.w3.org/2000/svg","text");
    yaxislbl.setAttribute("x",5);
    yaxislbl.setAttribute("y",371-ylims/2*0.9);
    yaxislbl.innerHTML=document.getElementById("y-axis-title-label-bar").value;
    yaxislbl.setAttribute("transform","rotate(270 5 "+(371-ylims/2*0.9)+")");
    yLabels.appendChild(yaxislbl);
    let graphlbl=document.createElementNS("http://www.w3.org/2000/svg","text");
    graphlbl.setAttribute("x",30+xlims/2*0.8);
    graphlbl.setAttribute("y",-20);
    graphlbl.innerHTML=document.getElementById("graph-name-bar").value;
    xLabels.appendChild(graphlbl);

    board.appendChild(gx);
    board.appendChild(gy);
    board.appendChild(yLabels);
    board.appendChild(xLabels);
    board.appendChild(bars);
}
function plotPie(pievals,pielabels){
    let board=document.getElementById("board");
    let ylims=386;
    let xlims=386;
    let graphClr=document.getElementById("graph-color").value;

    const circle=document.createElementNS("http://www.w3.org/2000/svg","circle");
    circle.setAttribute("cx",30+xlims/2);
    circle.setAttribute("cy",-15+ylims/3);
    circle.setAttribute("r",xlims/6);
    circle.setAttribute("stroke-width",xlims/3+6);
    circle.setAttribute("stroke",graphClr);
    circle.setAttribute("fill","none");
    const gc=document.createElementNS("http://www.w3.org/2000/svg","g");
    gc.classList.add("circle-pie");
    gc.appendChild(circle);
    let pielen=pievals.length;
    let pieclrs=[];
    for(let i=0;i<pielen;i++){
        pieclrs.push(randomColor());
    }
    let currTotal=0;
    let total=0;
    pievals.forEach(element => {
        total+=Number(element);
    });
    let cir=2*Math.PI*xlims/6;//2pi r
    
    const gl=document.createElementNS("http://www.w3.org/2000/svg","g");
    

    for(let i=0;i<pielen;i++){
        // console.log(total+" "+currTotal);
        const labelcircle=document.createElementNS("http://www.w3.org/2000/svg","circle");
        const labeltext=document.createElementNS("http://www.w3.org/2000/svg","text");
        const labelper=document.createElementNS("http://www.w3.org/2000/svg","text");
        if(i%2==0){
            labelcircle.setAttribute("cx",30+xlims/6);
            labeltext.setAttribute("x",30+xlims/6+xlims/30);
            labelper.setAttribute("x",30+xlims/6-xlims/30-2*xlims/17);
        }
        else{
            labelcircle.setAttribute("cx",30+4*xlims/6);
            labeltext.setAttribute("x",30+4*xlims/6+xlims/30);
            labelper.setAttribute("x",30+4*xlims/6-xlims/30-2*xlims/17);
        }
        labelcircle.setAttribute("cy",371-(ylims/3)*(5-(Math.floor(i/2)+1))/5);
        labeltext.setAttribute("y",371-(ylims/3)*(5-(Math.floor(i/2)+1))/5+xlims/90);
        labelper.setAttribute("y",371-(ylims/3)*(5-(Math.floor(i/2)+1))/5+xlims/90);
        labelper.innerHTML=Math.floor((pievals[i]/total*100)*10)/10+"%";
        labeltext.innerHTML=pielabels[i];
        labelcircle.setAttribute("r",xlims/34);
        labelcircle.setAttribute("stroke",pieclrs[i]);
        labelcircle.setAttribute("stroke-width",0);
        labelcircle.setAttribute("fill",pieclrs[i]);
        gl.appendChild(labeltext);
        gl.appendChild(labelcircle);
        gl.appendChild(labelper);

        const tempCircle=document.createElementNS("http://www.w3.org/2000/svg","circle");
        tempCircle.setAttribute("cx",30+xlims/2);
        tempCircle.setAttribute("cy",-15+ylims/3);
        tempCircle.setAttribute("r",xlims/6);
        tempCircle.setAttribute("stroke",pieclrs[i]);
        tempCircle.setAttribute("stroke-width",xlims/3);
        tempCircle.setAttribute("fill","none");
        tempCircle.setAttribute("stroke-dashoffset",-(cir*currTotal/total));
        tempCircle.setAttribute("stroke-dasharray",cir*pievals[i]/total+" "+
        (cir-(cir*pievals[i]/total)));
        currTotal+=Number(pievals[i]);
        gc.appendChild(tempCircle);
    }
    let graphlbl=document.createElementNS("http://www.w3.org/2000/svg","text");
    graphlbl.setAttribute("x",30+xlims/2*0.8);
    graphlbl.setAttribute("y",-30);
    graphlbl.innerHTML=document.getElementById("pie-chart-name").value;
    gl.appendChild(graphlbl);

    board.appendChild(gl);
    board.appendChild(gc);
}
function plotRadar(radarnames,radarcurrent,radartotal){
    let board=document.getElementById("board");
    let graphClr=document.getElementById("graph-color").value;
    // console.log(graphClr);
    let ylims=386;
    let xlims=386;
    let rad=ylims/3;
    let x0=xlims/2;
    let y0=ylims/2;
    const gout=document.createElementNS("http://www.w3.org/2000/svg","g");
    gout.classList.add("grid");
    const line1=document.createElementNS("http://www.w3.org/2000/svg","line");
    line1.setAttribute("x1",x0);
    line1.setAttribute("x2",x0-rad*Math.sin(36/180*Math.PI));
    line1.setAttribute("y1",y0);
    line1.setAttribute("y2",y0+rad*Math.cos(36/180*Math.PI));
    gout.appendChild(line1);
    const line2=document.createElementNS("http://www.w3.org/2000/svg","line");
    line2.setAttribute("x1",x0+rad*Math.sin(36/180*Math.PI));
    line2.setAttribute("x2",x0);
    line2.setAttribute("y1",y0+rad*Math.cos(36/180*Math.PI));
    line2.setAttribute("y2",y0);
    gout.appendChild(line2);
    const line3=document.createElementNS("http://www.w3.org/2000/svg","line");
    line3.setAttribute("x1",x0);
    line3.setAttribute("x2",x0-rad*Math.sin(72/180*Math.PI));
    line3.setAttribute("y1",y0);
    line3.setAttribute("y2",y0-rad*Math.cos(72/180*Math.PI));
    gout.appendChild(line3);
    const line4=document.createElementNS("http://www.w3.org/2000/svg","line");
    line4.setAttribute("x1",x0);
    line4.setAttribute("x2",x0);
    line4.setAttribute("y1",y0-rad);
    line4.setAttribute("y2",y0);
    gout.appendChild(line4);
    const line5=document.createElementNS("http://www.w3.org/2000/svg","line");
    line5.setAttribute("x1",x0);
    line5.setAttribute("x2",x0+rad*Math.sin(72/180*Math.PI));
    line5.setAttribute("y1",y0);
    line5.setAttribute("y2",y0-rad*Math.cos(72/180*Math.PI));
    gout.appendChild(line5);
    const polyline1=document.createElementNS("http://www.w3.org/2000/svg","polyline");
    polyline1.setAttribute("fill","none");
    polyline1.setAttribute("stroke","gray");
    polyline1.setAttribute("stroke-width",2);
    let polyText1=
    (x0+rad*Math.sin(36/180*Math.PI))+","+(y0+rad*Math.cos(36/180*Math.PI))
    +" "+(x0-rad*Math.sin(36/180*Math.PI))+","+(y0+rad*Math.cos(36/180*Math.PI))
    +" "+(x0-rad*Math.sin(72/180*Math.PI))+","+(y0-rad*Math.cos(72/180*Math.PI))
    +" "+(x0)+","+(y0-rad)
    +" "+(x0+rad*Math.sin(72/180*Math.PI))+","+(y0-rad*Math.cos(72/180*Math.PI))
    +" "+(x0+rad*Math.sin(36/180*Math.PI))+","+(y0+rad*Math.cos(36/180*Math.PI));
    polyline1.setAttribute("points",polyText1);
    gout.appendChild(polyline1);

    for(let i=1;i<=4;i++){
        let temprad=i*rad/5;
        const temppolyline=document.createElementNS("http://www.w3.org/2000/svg","polyline");
        temppolyline.setAttribute("fill","none");
        temppolyline.setAttribute("stroke","gray");
        temppolyline.setAttribute("stroke-width",1);
        let temppolyText=
        (x0+temprad*Math.sin(36/180*Math.PI))+","+(y0+temprad*Math.cos(36/180*Math.PI))
        +" "+(x0-temprad*Math.sin(36/180*Math.PI))+","+(y0+temprad*Math.cos(36/180*Math.PI))
        +" "+(x0-temprad*Math.sin(72/180*Math.PI))+","+(y0-temprad*Math.cos(72/180*Math.PI))
        +" "+(x0)+","+(y0-temprad)
        +" "+(x0+temprad*Math.sin(72/180*Math.PI))+","+(y0-temprad*Math.cos(72/180*Math.PI))
        +" "+(x0+temprad*Math.sin(36/180*Math.PI))+","+(y0+temprad*Math.cos(36/180*Math.PI));
        temppolyline.setAttribute("points",temppolyText);
        gout.appendChild(temppolyline);
    }

    const polylineres=document.createElementNS("http://www.w3.org/2000/svg","polyline");
    polylineres.setAttribute("fill",graphClr);
    polylineres.setAttribute("fill-opacity","25%");
    polylineres.setAttribute("stroke",graphClr);
    polylineres.setAttribute("stroke-width",2);
    let resvals=[];
    let vallength=radarcurrent.length;
    for(let i=0;i<vallength;i++){
        resvals.push(radarcurrent[i]/radartotal[i]*rad);
        // console.log(resvals[i]);
    }
    let polyTextres=
    (x0+resvals[2]*Math.sin(36/180*Math.PI))+","+(y0+resvals[2]*Math.cos(36/180*Math.PI))
    +" "+(x0-resvals[3]*Math.sin(36/180*Math.PI))+","+(y0+resvals[3]*Math.cos(36/180*Math.PI))
    +" "+(x0-resvals[4]*Math.sin(72/180*Math.PI))+","+(y0-resvals[4]*Math.cos(72/180*Math.PI))
    +" "+(x0)+","+(y0-resvals[0])
    +" "+(x0+resvals[1]*Math.sin(72/180*Math.PI))+","+(y0-resvals[1]*Math.cos(72/180*Math.PI))
    +" "+(x0+resvals[2]*Math.sin(36/180*Math.PI))+","+(y0+resvals[2]*Math.cos(36/180*Math.PI));
    polylineres.setAttribute("points",polyTextres);
    gout.appendChild(polylineres);
    
    const glabels=document.createElementNS("http://www.w3.org/2000/svg","g");
    for(let i=0;i<vallength+1;i++){
        const tempnumlabel=document.createElementNS("http://www.w3.org/2000/svg","text");
        tempnumlabel.setAttribute("x",x0+10);
        tempnumlabel.setAttribute("y",y0-i*rad/vallength+8);
        tempnumlabel.innerHTML=i;
        glabels.appendChild(tempnumlabel);
    }
    for(let i=0;i<vallength;i++){
        const tempnumlabel=document.createElementNS("http://www.w3.org/2000/svg","text");
        let xcorr=0,ycorr=0;
        if(i==0){
            xcorr=-15;
            ycorr=-5;
        }
        else if(i==1){
            xcorr=10;
            ycorr=0;
        }
        else if(i==2){
            xcorr=-10;
            ycorr=15;
        }
        else if(i==3){
            xcorr=-20;
            ycorr=15;
        }
        else if(i==4){
            xcorr=-35;
            ycorr=0;
        }
        tempnumlabel.setAttribute("x",x0+xcorr+(rad)*Math.sin(i*360/vallength/180*Math.PI));
        tempnumlabel.setAttribute("y",y0+ycorr-(rad)*Math.cos(i*360/vallength/180*Math.PI));
        tempnumlabel.innerHTML=radarnames[i];
        glabels.appendChild(tempnumlabel);
    }

    let graphlbl=document.createElementNS("http://www.w3.org/2000/svg","text");
    graphlbl.setAttribute("x",30+xlims/2*0.6);
    graphlbl.setAttribute("y",30);
    graphlbl.innerHTML=document.getElementById("radar-chart-name").value;
    glabels.appendChild(graphlbl);

    board.appendChild(gout);
    board.appendChild(glabels);
    
}
function randomColor(){
    let clr="#";
    let clrarr=['a','b','c','d','e','f','0','1','2','3','4','5','6','7','8','9'];
    for(let i=0;i<6;i++){
        let idx=Math.floor(Math.random()*16);
        clr+=clrarr[idx];
    }
    return clr;
}
function autofill(){
    document.getElementById("graph-name").value="Line graph plotted";
    document.getElementById("y-axis-title").value="Y-axis";
    document.getElementById("x-axis-title-label").value="X-axis";
    document.getElementById("x-axis-title-value").value="X-axis";
    document.getElementById("y-min-range").value=0;
    document.getElementById("y-max-range").value=100;
    document.getElementById("y-axis-values").value="10 20 40 30 100 25";
    document.getElementById("x-axis-labels").value="lbl1 lbl2 lbl3 lbl4 lbl5 lbl6";
    document.getElementById("x-min-range").value=0;
    document.getElementById("x-max-range").value=100;
    document.getElementById("x-axis-values").value="20 40 50 80 85 90";

    document.getElementById("graph-name-bar").value="Bar graph plotted";
    document.getElementById("y-axis-title-label-bar").value="Y-axis";
    document.getElementById("x-axis-title-label-bar").value="X-axis";
    document.getElementById("y-min-range-bar").value=0;
    document.getElementById("y-max-range-bar").value=100;
    document.getElementById("y-axis-values-bar").value="10 20 40 30 100 25";
    document.getElementById("x-axis-labels-bar").value="lbl1 lbl2 lbl3 lbl4 lbl5 lbl6";

    document.getElementById("pie-chart-name").value="Pie chart plotted";
    document.getElementById("pie-chart-labels").value="lbl1 lbl2 lbl3 lbl4 lbl5 lbl6";
    document.getElementById("pie-chart-values").value="10 20 40 30 100 25";

    document.getElementById("radar-chart-name").value="Radar chart plotted";
    document.getElementById("stat-name-1").value="label1";
    document.getElementById("stat-1-value").value=20;
    document.getElementById("stat-1-max-value").value=100;
    document.getElementById("stat-name-2").value="label2";
    document.getElementById("stat-2-value").value=35;
    document.getElementById("stat-2-max-value").value=100;
    document.getElementById("stat-name-3").value="label3";
    document.getElementById("stat-3-value").value=60;
    document.getElementById("stat-3-max-value").value=100;
    document.getElementById("stat-name-4").value="label4";
    document.getElementById("stat-4-value").value=80;
    document.getElementById("stat-4-max-value").value=100;
    document.getElementById("stat-name-5").value="label5";
    document.getElementById("stat-5-value").value=50;
    document.getElementById("stat-5-max-value").value=100;

}
function save_as_svg(){
    fetch('projectGraphPlotterStyles.css')
    .then(response => response.text())
    .then(text => {
        var svg_data = document.getElementById("board").innerHTML;
        var head = '<svg viewBox="-10 -50 450 450" class="chart" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" pointer-events="auto" id="board" style="font-size: 0.7rem;font-family:Calibri">';
        var style = "<style>" + text + "</style>";
        var full_svg = head +style+ svg_data + "</svg>";
        var blob = new Blob([full_svg], {type: "image/svg+xml"});  
        console.log(full_svg);
        saveAs(blob, "graph.svg");
    })
}


