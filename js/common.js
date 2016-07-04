var base_server = "http://192.168.199.220:8080";
var k,version;
var version_key = "version";
var k_key = "k";

function initVersion(){
	 plus.runtime.getProperty(plus.runtime.appid,function(inf){
	 	plus.storage.setItem(version_key,inf.version);
	});
};

function postData(url, plus, data, callback) {
	k = plus.storage.getItem(k_key);
	if(k==null){
		k="";
	}
	version = plus.storage.getItem(version_key);
	if(version==null){
		version="1.0.0";
	}
	var headers = {"udid":plus.device.uuid,"name":plus.os.name,
					"version":version,"k":k};
    mui.ajax(base_server+url,{  
        data:data,  
        dataType:'json',  
        type:'post',  
        headers:headers,
        contentType:"application/x-www-form-urlencoded; charset=utf-8",  
        timeout:60000,  
        async:true,
        success:callback,  
        error:function(xhr,type,errorThrown){  
            mui.alert("<网络连接失败，请重新尝试一下>", "错误", "OK", null);  
        }  
    });  
}  