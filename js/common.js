function postData(url, data, callback) {
	url = "http://192.168.199.220:8080"+url;
    mui.ajax(url,{  
        data:data,  
        dataType:'json',  
        type:'post',  
        headers:{"udid":"5362A6FB-6E18-425D-8E11-A4E088F85E71",
        			"name":"iphone"},
        contentType:"application/x-www-form-urlencoded; charset=utf-8",  
        timeout:60000,  
        async:true,
        success:callback,  
        error:function(xhr,type,errorThrown){  
            mui.alert("<网络连接失败，请重新尝试一下>", "错误", "OK", null);  
        }  
    });  
}  