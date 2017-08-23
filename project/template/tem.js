window.onload=function(){
	const _url="http://api.dev.gilieye.com";
	$.ajax({
		type:"get",
			url:_url+"/search?tag=动漫",
			async:true,
			success:function(data){
				console.log(data.data);
				var tpl = document.getElementById('tpl').innerHTML;
				var inner=template(tpl, {list: data.data});
				document.getElementById('content').innerHTML=inner;
			},
			error:function(){
				console.log('获取数据有误');
			}
	});
	
	
}
		
