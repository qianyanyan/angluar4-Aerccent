var ipAdress = window.location.protocol+"//"+window.location.host;  //测试
// varipAdress ='http://172.29.39.223:2815'; //叶冬服务172.29.36.150
if(ipAdress.indexOf('localhost') >=1) {
    ipAdress = 'http://localhost:2818';  //测试
    // ipAdress = "http://172.29.39.223:2815";
}

// ipAdress = "http://172.29.39.223:2815"; //叶冬
ipAdress = "http://172.31.193.126:2818";    //测试  http://172.31.193.126:2818

// ipAdress = "http://172.31.193.151:2818";  //生产


//var ipAdress="192.168.210.18";
//var Url="172.31.193.128"

var headers = {
    Authorization:''
};
var token = localStorage.getItem('token');
if(token) {
    headers.Authorization = "Bearer " + JSON.parse(token);
}