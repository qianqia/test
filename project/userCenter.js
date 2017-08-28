$(function(){
//	$('.userCenter_top').load('../header/header.html',()=>{
//		let  _cookie=Cookie.readCookie().split(";");
//		var token_10,token_5,token;
//		
//		for(var i=0;i<_cookie.length;i++){
//			console.log(1)
//			if(_cookie[i].substring(0,5)=='token'){
//				token=_cookie[i].split('=')[1];
//			}
//		}
	var _url = "http://api.dev.gilieye.com";
	//获取cookie中用户信息 此变量名称相同，最终注意修改
	 let  _cookie=Cookie.readCookie().split(";");
	 let  _list=[];
	 let  _list1=[];
	 var token,user,tokenFlag;
	 
	 for(var i=0;i<_cookie.length;i++){
	 	_list.push(_cookie[i].split('=')[0])
	 	_list1.push(_cookie[i].split('=')[1])
	}
	 for(var i=0;i<_list.length;i++){
		_list[i]=_list[i].replace(/(^\s*)|(\s*$)/g, "");
	 	if(_list[i]=="token1"){
	 		
	 		token='Bearer '+_list1[i]
	 		
	 	}else if(_list[i]=="user1"){
	 		user=JSON.parse(_list1[i]);
	 	}else {
	 		if(_list[i]=="token"){
	 			token='Bearer '+_list1[i]
	 			
	 		}else if(_list[i]=="user"){
	 			user=JSON.parse(_list1[i]);
	 		}
	 	}
	 	if(_list[i]=="tokenFlag"){
	 		tokenFlag=_list1[i];
	 	}
	 }
	 //获取用户头像信息
	 if(token!=undefined){
	 	$.ajax({
	 		type:"get",
	 		url:_url+"/users/"+user.id,
	 		async:true,
	 		success:function(data){
	 		
	 			
	 			$('.userCenter_user_avatar').attr('src','http://oihfvurw3.bkt.clouddn.com'+data.data.avatar);
	 			$('.userCenter_user_username').html(unescape(data.data.username));
	 			$('.userCenter_user_sign').html(data.data.sign)
	 		},
	 		error:function(data){
	 			console.log('获取用户信息失败')
	 		}
	 	});
	 }
	 
	 
	 //底部内容切换
		var userCenter_title_i=0;
		var j=0;
		var _s=1,_e=20;
		$('.userCenter_title_wrap div').on('click', function() {
				 userCenter_title_i=$(this).index()
				$('.userCenter_title_wrap div').map((i) => {
					$('.userCenter_title_wrap div').eq(i).removeClass('userCenter_color');
				})
				$(this).addClass('userCenter_color')
				$('.userCenter_bottom_line').css({
					'left': $(this).index() * 88  + 'px'
				})
				$('.userCenter_box').map((i) => {
					$('.userCenter_box').eq(i).removeClass('userCenter_dis');
				})
				$('.userCenter_box').eq($(this).index()).addClass('userCenter_dis')
				//作品显示
				if($(this).index()==1){
					j++
					if(j==1){
						
						loadImage(_s,_e)
					}
					var k=0;
					window.onscroll=function(){
			        	var _h=document.getElementById("userCenter_title_works_waterfall").offsetHeight;
			            var s_t=document.body.scrollTop||document.documentElement.scrollTop;//获取滚动条滚动距离的时候使用document.body.scrollTop
			            var c_t=document.documentElement.clientHeight;
			            console.log(_h+1,s_t+c_t)
			            console.log((_h+1)==s_t+c_t)
			            if((_h+1)==s_t+c_t){
			            	console.log('qqq')
			                _s=_e+1;
			                _e=_e+20;
			                console.log(_s,_e)
			                loadImage(_s,_e);
			            }
			        }
					
				}else{
					
				}
		})
		
		$('.userCenter_title_wrap div').hover(function(){
			$(this).addClass('userCenter_color')
		},function(){
			if(userCenter_title_i!=$(this).index()){
				$(this).removeClass('userCenter_color')
			}
			
		})
		
		
		//作品
		
		var  _arr=new Array(3);
			for(i=0;i<3;i++){
				_arr[i]=0;
			}
			function resetContainerHeight(_arr){
	            var _max=_arr[0];
	            for(var i=1;i<_arr.length;i++){
	                if(_max<_arr[i]){
	                    _max=_arr[i];
	                }
	            }
	            document.getElementById("userCenter_title_works_waterfall").style.height=_max+"px";
	        }
			function minHeight(_arr){
	            var _min=_arr[0];
	            var _index=0;
	            for(var i=1;i<_arr.length;i++){
	                if(_min>_arr[i]){
	                    _min=_arr[i];
	                    _index=i;
	                }
	            }
	            return _index;
	        }
			function waterfall(_arr,_s){
	            var _index=0;
	            
	            for(var i=_s-1;i<$('.module').length;i++){
	                _index=minHeight(_arr);//找到最小值
	                
	                if(_index==0){
	                	var t=0;
	                }else{
	                	var t=15*_index;
	                }
	                $('.module').eq(i).css({
	                	'left':310*_index+t+"px",
	                	'top':_arr[_index]+"px"
	                })
	                _arr[_index]+=document.getElementById("userCenter_title_works_waterfall").children[i].offsetHeight//将当前图片的高度保存到数组与之对应的列的索引值中
	               
	            }
	            resetContainerHeight(_arr);//设置外边框的高度
	        }
			function checkImgComplete(_arr,_s){
	            var _timer=0;
	            var _container=document.getElementById('userCenter_title_works_waterfall');
	            var _con=document.querySelectorAll('.box_body_img ')
	            console.log(_con)
	            function checking(){
	                window.clearTimeout(_timer);
	                var _complete=true;

	                for(var i=_s-1;i<$('.module').length;i++){
	                    if(!_container.children[i].children[0].complete){//complete：img标签自带的一个属性。图片加载完成该属性自动变为true，否则false
                        _complete=false;
                        break;
                    }
	                }
	                if(_complete){
	                    waterfall(_arr,_s);//开始瀑布流布局
	                }else{
	                    _timer=setTimeout(checking,60);
	                }
	            }
	            checking();
	        }
			function loadImage(_s,_e){
				var _module=null,_img=null,_span=null;
				var _contant=""
//	            var _box=$("#userCenter_title_works_waterfall");
	            for(var i=_s;i<=_e && i<=75;i++){
//	                _contant+="<div class='module'><img src='../images/"+i+".jpg'"+"/><sapn>H51610WATERFALL</span>"+i+"</div>";
	                _contant+="<div class='module'><div class='box_header '><div class'fl'><img src='../images/1.jpg'/><span>skd</span></div><div class='fr box_header_follow'>关注+</div></div></div>"
	                _contant+="<div class='module'><div class='box_header '><div class'fl'><img src='../images/1.jpg'/><span>skd</span></div><div class='fr box_header_follow'>关注+</div></div>"+
			"<div class='box_body'><img class='box_body_img' src='../images/"+i+".jpg'"+"/><div class='box_body_sign'><div class='box_body_sign_wrap'><span>阴阳师</span><span>鬼使黑</span><span>小黑</span></div>"+
			"<div class='box_body_sign_describe'>鬼使黑是什么的什么东西抽不到，鬼使黑是什么的什么东西抽不到蓝受，香菇......蓝受，香菇......蓝受，香菇......</div></div></div>"+
			"<div class='box_footer'><img src='../images/img_like_num.png' class='img_like_num fl'/>"+
				"<span class='fl link_num'>3</span>"+
				"<span class='fl '>删除</span>"+
				"<span class='fl'>评论</span>"+
				"<span class='fl'>分享</span>"+
				"<img src='../images/img_like_no.png' class='img_like_no fr'/></div></div>"
	            }
	           
	            
	           $("#userCenter_title_works_waterfall").append(_contant);
	           checkImgComplete(_arr,_s)
			}
			
			function isBottom(){
	            var _h=document.getElementById("userCenter_title_works_waterfall").offsetHeight;
	            var s_t=document.body.scrollTop||document.documentElement.scrollTop;//获取滚动条滚动距离的时候使用document.body.scrollTop
	            var c_t=document.documentElement.clientHeight;
	            if(_h==s_t+c_t){
	                _s=_e+1;
	                _e=_e+20;
	                console.log(_s,_e)
	                loadImage(_s,_e);
	            }
	            
	        }
//	        window.onscroll=function(){
//				var _h=document.getElementById("userCenter_title_works_waterfall").offsetHeight;
//				
//	            var s_t=document.body.scrollTop||document.documentElement.scrollTop;//获取滚动条滚动距离的时候使用document.body.scrollTop
//	            var c_t=document.documentElement.clientHeight;
//	            console.log(_h,s_t+c_t)
//	            if(_h==s_t+c_t){
//	            	console.log(1)
////	                _s=_e+1;
////	                _e=_e+20;
////	                console.log(_s,_e)
////	                loadImage(_s,_e);
//					
//	            }
//			}
//			$('.userCenter_more').on('click',function(){
//				loadImage(10,20);
//				$(this).css('display','none')
//			})
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		//关注 、点击关注或以关注按钮
		let _attention_content_box="";
		for(var i=0;i<4;i++){
			_attention_content_box+="<div class='userCenter_title_attention_content_box'>"+
							"<div class='userCenter_title_attention_content_left fl'>"+
							"<img src=''/>"+
							"<div class='attention_content_left_followed'>已关注</div></div>"+
							"<div class='userCenter_title_attention_content_right fl'>"+
							"<div class='attention_content_right_username'>道道好厉害</div>"+
							"<div class='attention_content_right_sign'>这里放置简介内容，这里是简介内容，这里是简介内容，这里是简介内容，这里是简介内容</div>"+
							"<div class='attention_content_right_fans'><span>粉丝"+
							"<i>3</i></span><span>|</span>"+
							"<span>关注<i>5</i></span></div></div></div>"
		}
		 $('.attention_content_box').html(_attention_content_box);
		
		$(document).on('click','.attention_content_left_followed',function(){
			console.log(1)
		})
		
		
		
		
		
		
		
		//控制弹出框的
//		$('.insert_content').load('../login_register/login_register.html',function(){
//				login_register();
//		})
//		$('.header_login').on('click',function(){
//			$('.lR_title').map((i) => {
//				$('.lR_title').eq(i).removeClass('color');
//			})
//			$('.lR_title').eq(0).addClass('color')
//			$('.bottom_line').css({
//				'left': '170px'
//			})
//			$('.login_content_box').map((i) => {
//				$('.login_content_box').eq(i).removeClass('dis');
//			})
//			$('.login_content_box').eq(1).addClass('dis')
//			
//			
//			$('.ceng').css("display",'block');
//			$('.insert_content').animate({
//				'top':'120px'
//			},400)
//			
//		})
//		$('.ceng').on('click',function(){
//
//			$('.ceng').css("display",'none');
//			$('.insert_content').animate({
//				'top':'-700px'
//			},400)
//		})

//	})
})
