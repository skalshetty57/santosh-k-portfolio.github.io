let states=[];
let confirmed=[];
let discharged=[];
let deceased=[];
let active=[];
var statesLower=[];


const api_url ="https://api.rootnet.in/covid19-in/stats/latest";
async function getapi(url) {
    const response = await fetch(url);
    var data = await response.json();
    
    states=[];
    confirmed=[];
    discharged=[];
    deceased=[];
    active=[];
    var confirmedTotal=0;
    var deceasedTotal=0;
    
    var dischargedTotal=0;
    
    data.data.regional.forEach(element=>{
        states.push(element.loc);
        statesLower.push(element.loc.toLowerCase());
        confirmed.push(element.totalConfirmed);
        discharged.push(element.discharged);
        deceased.push(element.deaths);
        active.push(element.totalConfirmed-
                    element.discharged-
                    element.deaths);
        confirmedTotal+=element.totalConfirmed;
        deceasedTotal+=element.deaths;
        dischargedTotal+=element.discharged;
    })
    
    console.log(data);
    changeMap("total-confirmed");
    var dateUpdated=data.lastRefreshed;
    displayTime(dateUpdated);
    displayTotalCount(confirmedTotal,dischargedTotal,deceasedTotal);
    displayTable(states,confirmed,deceased,discharged,active);
    console.log(states);
}
getapi(api_url);


function displayTime(date){
    let e=document.getElementById("time");
    let months={"01":"Jan","02":"Feb",
                "03":"Mar","04":"Apr",
                "05":"May","06":"Jun",
                "07":"Jul","08":"Aug",
                "09":"Sep","10":"Oct",
                "11":"Nov","12":"Dec",}
    let timeStr=date.substring(8,10)+" "+
                months[date.substring(5,7)]+
                ", "+date.substring(11,16)+
                " IST";
    e.innerHTML+=timeStr;       
}
function displayTotalCount(confirmedTotal,dischargedTotal,deceasedTotal){
    let confirmBox=document.getElementById("confirmed-total");
    confirmBox.innerHTML=numberWithCommas(confirmedTotal);
    let dischargeBox=document.getElementById("recovered-total");
    dischargeBox.innerHTML=numberWithCommas(dischargedTotal);
    let deceasedBox=document.getElementById("deceased-total");
    deceasedBox.innerHTML=numberWithCommas(deceasedTotal);
    let activeBox=document.getElementById("active-total");
    activeBox.innerHTML=numberWithCommas(confirmedTotal-
        dischargedTotal-deceasedTotal);

    
}
function displayTable(states,confirmed,deceased,discharged,active){
    var tableBody=document.getElementById("table-body");
    for(let i=0;i<states.length;i++){
        tableBody.innerHTML+="<tr class='animation-apply'>"+
        "<td class='animation-apply'>"+
        numberWithCommas(states[i])
        +"</td>"+
        "<td class='animation-apply'>"+
        numberWithCommas(confirmed[i])
        +"</td>"+
        "<td class='animation-apply'>"+
        numberWithCommas(active[i])
        +"</td>"+
        "<td class='animation-apply'>"+
        numberWithCommas(discharged[i])
        +"</td>"+
        "<td class='animation-apply'>"+
        numberWithCommas(deceased[i])
        +"</td>"+
        "</tr>";   
    }
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// stroke="rgba(40, 167, 69, 0.4392156862745098)"
function changeMap(clickerId){
    // console.log(clickerId);
    let mapColor="";
    let fillColor="";
    let arr=[];
    let highlighterEle=document.getElementsByClassName("highlighter");
    // console.log(highlighterEle);
    if(clickerId==="total-confirmed"){
        mapColor="#ff073a";
        fillColor="#ff073a";
        arr=confirmed;
        highlighterEle[0].style.left="0";
        highlighterEle[0].style.background="#ff073a";
    }
    else if(clickerId==="total-active"){
        mapColor="#007bff";
        fillColor="#007bff";
        arr=active;
        highlighterEle[0].style.left="25%";
        highlighterEle[0].style.background="#007bff";
    }
    else if(clickerId==="total-recovered"){
        mapColor="#28a745";
        fillColor="#28a745";
        arr=discharged;
        highlighterEle[0].style.left="50%";
        highlighterEle[0].style.background="#28a745";
    }
    else if(clickerId==="total-deceased"){
        mapColor="gray";
        fillColor="gray";
        arr=deceased;
        highlighterEle[0].style.left="75%";
        highlighterEle[0].style.background="gray";
    }
    let map=document.getElementById("map-state");
    let mapCircle=document.querySelectorAll("circle");
    // console.log(mapCircle);
    let n=39;
    let mx=Math.max.apply(null,arr);
    let divider1=40.00/mx;
    let divider2=25.0/(0.4*mx);
    let divider3=15.0/(mx/10);
    let arr2=[];
    let circleLegends=document.querySelectorAll("text");
    circleLegends[0].innerHTML=(Math.round(mx/10000)/100)+"L";
    circleLegends[1].innerHTML=(Math.round(mx*0.4/1000)/100)+"L";
    circleLegends[2].innerHTML=(Math.round(mx/1000)/100)+"L";
    circleLegends[0].setAttribute("fill",fillColor);
    circleLegends[1].setAttribute("fill",fillColor);
    circleLegends[2].setAttribute("fill",fillColor);
    

    for(let i=0;i<n;i++){
        if(arr[i]<=(mx/10))
            arr2.push(arr[i]*divider3);
        else if(arr[i]<=(mx*0.4))
            arr2.push(arr[i]*divider2);
        else 
            arr2.push(arr[i]*divider1);
    }
    map.setAttribute("stroke",mapColor);
    
    for(let i=0;i<n;i++){
        
        mapCircle[i].setAttribute("stroke",fillColor);
        if(i<36){
            mapCircle[i].setAttribute("fill",fillColor);
            mapCircle[i].setAttribute("r",arr2[i]);
        }
    }
    // console.log(states);
    // console.log(Math.max.apply(null,arr));
    // console.log(divider);
    // console.log
    // console.log(mapCircle[0].getAttribute("fill"));
}
// fill="rgba(40, 167, 69, 0.4392156862745098)"
function stateSelector(){
    let stateList=document.getElementById("searcher");
    if(stateList.getAttribute("size")==="1"){
        stateList.setAttribute("size","6");
        
    }
    else{
        stateList.setAttribute("size","1");
    }
}

document.getElementById("search-state-list").addEventListener("click",function(e){
    
    if(e.target && e.target.nodeName=='LI'){
        // console.log(e.target.innerHTML+" was clicked.");
        // let temp=e.target.innerHTML;
        // console.log(temp);
        displayResult(e.target.innerHTML);
        document.getElementById("searcher").value=e.target.innerHTML;
        // console.log(e.target.innerHTML);
        
    }
    document.getElementById("result-box").style.display="none";
});

function stateExists(e){
    
    let searcherText=document.getElementById("searcher").value;
    let stateList=document.getElementsByClassName("search-state-names");
    document.getElementById("result-box").style.display="block";
    // console.log(searcherText.toLowerCase());
    let keynum;
    if(window.event){
        keynum=e.keyCode;
    }
    else if(e.which){
        keynum=e.which;
    }
    // console.log(keynum+" "+ typeof keynum);
    // console.log(keynum===13);
    if(keynum===13){
        displayResult(searcherText);
    }
    // alert(keynum);
    for(let i=0;i<36;i++){
        if(stateList[i].innerHTML.toLowerCase().search(searcherText.toLowerCase())==0)
            stateList[i].style.display="list-item";
        else{
            stateList[i].style.display="none";
        }
        
    }
}
function showSearchResult(){
    let searchResults=document.getElementById("result-box");
    if(searchResults.style.display=="none"){
        searchResults.style.display="block";
    }
    else
        searchResults.style.display="none";
}
function hideResult(){
    document.getElementById("result-box").style.display="none";
}
function displayResult(attri){
    // console.log(attri);
    
    let idx=statesLower.indexOf(attri.toLowerCase());
    // console.log(attri+" "+idx);
    // console.log(idx);
    if(idx>=0){
        document.getElementById("state-result-name").innerHTML=states[idx];
    document.getElementById("state-confirmed").innerHTML=
    numberWithCommas(confirmed[idx]);
    document.getElementById("state-active").innerHTML=
    numberWithCommas(active[idx]);
    document.getElementById("state-recovered").innerHTML=
    numberWithCommas(discharged[idx]);
    document.getElementById("state-deceased").innerHTML=
    numberWithCommas(deceased[idx]);
    }

}
// let states=[];
// let confirmed=[];
// let discharged=[];
// let deceased=[];
// let active=[];
function changeColorScheme(){
    let tt=document.getElementsByTagName("BODY")[0];
    let tableEle=document.getElementsByTagName("TR");
    let tableRows=tableEle.length;
    console.log(tableEle);
    if(tt.style.color=="rgb(22, 22, 37)"){
        tt.style.color="mintcream";
        tt.style.background="#161625";
        document.getElementById("searcher").style.background="#1e1e30";
        for(let j=0;j<5;j++){
            tableEle[0]["cells"][j].style.background="rgb(68,77,85";
        }
        for(let i=0;i<tableRows;i++){
            if(i%2==0){
                tableEle[i].style.background="rgb(30,30,48";
            }
            tableEle[i]["cells"][0].style.background="rgb(68,77,85";
        }
        document.getElementById("view-mode-switch").innerHTML=
        "<i class='far fa-sun'></i>";
        document.getElementById("result-box").style.background=
        "#161625";
        
    }
    else{
        tt.style.color="#161625";
        tt.style.background="mintcream";
        document.getElementById("searcher").style.background="mintcream";
        for(let j=0;j<5;j++){
            tableEle[0]["cells"][j].style.background="rgb(220,220,247";
        }
        for(let i=1;i<tableRows;i++){
            if(i%2==0){
                tableEle[i].style.background="rgb(220,220,247";
            }
            tableEle[i]["cells"][0].style.background="rgb(220,220,247";
        }
        document.getElementById("view-mode-switch").innerHTML=
        "<i class='fas fa-moon'></i>";
        document.getElementById("result-box").style.background=
        "mintcream";
    }
    // console.log(tt);
}
// changeColorScheme();