var base_server = "http://192.168.199.220:8080";
//base_server = "http://www.helpyourecord.com:8088";
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
};

function postRequest(url,plus,data,callback,waitingDialog){
	var headers = {"udid":plus.device.uuid,
					"name":plus.os.name,
					"version":plus.storage.getItem(version_key),
					"k":plus.storage.getItem(k_key)};
	mui.ajax(base_server+url,{  
        data:data,  
        dataType:'json',  
        type:'post',  
        headers:headers,
        contentType:"application/x-www-form-urlencoded; charset=utf-8",  
        timeout:60000,  
        success:callback,  
        error:function(xhr,type,errorThrown){  
        		waitingDialog.close();  
            mui.alert("<网络连接失败，请重新尝试一下>", "错误", "OK", null);  
        }  
    });  				
};


function postNoDialog(url,plus,data,callback){
	var headers = {"udid":plus.device.uuid,
					"name":plus.os.name,
					"version":plus.storage.getItem(version_key),
					"k":plus.storage.getItem(k_key)};
	mui.ajax(base_server+url,{  
        data:data,  
        dataType:'json',  
        type:'post',  
        headers:headers,
        contentType:"application/x-www-form-urlencoded; charset=utf-8",  
        timeout:60000,  
        success:callback,  
        error:function(xhr,type,errorThrown){  
            mui.alert("<网络连接失败，请重新尝试一下>", "错误", "OK", null);  
        }  
    });  				
};

function uploadFile(url,plus,path,callback){
	var wt=plus.nativeUI.showWaiting();  
	var task = plus.uploader.createUpload(base_server+url, 
				{method:"POST"},
				function (t, status ) {
					// 上传完成
					if ( status == 200 ) { 
						wt.close();  
						callback(t.responseText);
					} else {
						wt.close();  
					}
				}
	);
	task.setRequestHeader("udid",plus.device.uuid);
	task.setRequestHeader("name",plus.os.name);
	task.setRequestHeader("version",plus.storage.getItem(version_key));
	task.setRequestHeader("k",plus.storage.getItem(k_key));
	task.addData("data","test");
	task.addFile(path,{key:"file"})
	task.start();  
}

