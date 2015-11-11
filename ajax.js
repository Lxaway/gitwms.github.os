一、AJAX = 异步 JavaScript 和 XML（Asynchronous JavaScript and XML）。

	简短地说，在不重载整个网页的情况下，AJAX 通过后台加载数据，并在网页上进行显示。

	使用 AJAX 的应用程序案例：谷歌地图、腾讯微博、优酷视频、人人网等等。

二、Ajax的优点：无刷新，异步通讯

	1.不需要插件支持（一般浏览器且默认开启 JavaScript 即可）；

	2.用户体验极佳（不刷新页面即可获取可更新的数据）；

	3.提升 Web 程序的性能（在传递数据方面做到按需放松，不必整体提交）；

	4.减轻服务器和带宽的负担（将服务器的一些操作转移到客户端）；

三、Ajax的缺点：

	1.搜索引擎的支持度不够（因为搜索引擎爬虫还不能理解 JS 引起变化数据的内容）；

	2.开发调试工具缺乏（相对于其他语言的工具集来说， JS 或 Ajax 调试开发少的可怜）。

四、Ajax的底层封装的方法$.ajax():
	1.基本实现方法：
		$(选择器).事件(function(){
			$.ajax({
				type : 'POST', 			//传值方式，可换成GET
				url : 'demo.php',		//传值的目标地址
				data : {				//传输的数据
					url : 'ycku'
				},
				success : function (response, stutas, xhr){ //成功后要做的事
					$(选择器).html(response);//一般是将demo.php处理过后的数据写到html文档当中。
				}
			});
		});
		xhr是一个对象，它有一下属性(可以通过alert(xhr.属性)来打印)：
			responseText 作为响应主体被返回的文本
			responseXML
				如果响应主体内容类型是"text/xml"或"application/xml"，
				则返回包含响应数据的 XML DOM 文档
			status 响应的 HTTP 状态
			statusText HTTP 状态的说明
	2.加载请求使用.ajaxStart()和.ajaxStop()两个全局事件：
		.ajaxStart():ajax请求开始时激活。
		.ajaxStop():请求结束时激活。

		使用方法：
		$(document).ajaxStart(function(){
			$(选择器).show();//被选择的元素一般为正在加载的图片或者‘正在加载中...’的提示文字。
		}).ajaxStop(function(){
			$(选择器).hide();
		});
		
	3.错误处理：

		属性方法：error:function(xhr,errorText,errorType){}即直接在$.ajax({})里面添加错误属性。
			xhr:XMLHttpRequest 对象
			errorText:错误信息
			errorType:（可选）捕获的异常对象

		全局方法：$(选择器).ajaxError(event,xhr,options,exc)事件返回错误信息。
			event - 包含 event 对象
			xhr - 包含 XMLHttpRequest 对象
			options - 包含 AJAX 请求中使用的选项
			exc - 包含 JavaScript exception

		局部方法：使用.error()连缀追加处理，或者使用.fail()替代
			一般用于封装后($.post,$.get)的报错

		参数都可以用for in方法查看
		for(var i in event){
			document.write(i + '<br />');
		}

	4.请求全局事件：
		.ajaxSuccess():请求成功时执行，对应一个局部方法：.success();
		.ajaxComplete():请求完成后执行，不论失败或成功，对应一个局部方法：.complete();
		.ajaxSend():请求发送之前要绑定的函数，没有对应的局部方法，只有属性beforeSend;

	5.$.ajax()返回的是jqXHR对象，所以才有连缀操作。
		jqXHR对象：
			对于 jQuery 1.5，所有 jQuery 的 AJAX 方法返回的是 XMLHTTPRequest 对象的超集。由 $.post() 返回的 jQuery XHR 对象或 "jqXHR,"实现了约定的接口，赋予其所有的属性、方法，以及约定的行为。出于对由 $.ajax() 使用的回调函数名称便利性和一致性的考虑，它提供了 .error(), .success() 以及 .complete() 方法。这些方法使用请求终止时调用的函数参数，该函数接受与对应命名的 $.ajax() 回调函数相同的参数。
			jQuery 1.5 中的约定接口同样允许 jQuery 的 Ajax 方法，包括 $.post()，来链接同一请求的多个 .success()、.complete() 以及 .error() 回调函数，甚至会在请求也许已经完成后分配这些回调函数。
		//可以将返回的对象赋给jqXHR变量，然后用连缀的方式来做一系列处理。
		var jqXHR = $.ajax({
			type:'POST',
			url:'demo.php',
			data:{
				username:'psd',
			}
		})
		//当需要success(),.complete(),.error()时,可以直接
		jqXHR.success(function(){})

		//但以后可以使用.done(),.always(),.fail()来代替上面三者。

		jqXHR的优点：
			1.可连缀操作，可读性大大提高；
				jqXHR.done(exp1)
				jqXHR.done(exp2)
				jqXHR.done(exp3)
			2.可以多次执行同一个回调函数；
				jqXHR.done().done().done()
			3.为多个操作指定回调函数；
				var jqXHR1 = $.ajax();
				var jqXHR2 = $.ajax();
				$.when(jqXHR1,jqXHR2,jqXHR3).done(function(jq1,jq2){})

				$.when():等到两个请求都返回之后才触发回调函数
　　			即只有当两个请求都成功返回时才会触发done回调

五、第二层封装的方法：.load(),$.post(),$.get();
	1. .load():方法通过 AJAX 请求从服务器加载数据，然后把数据返回到 HTML 放入匹配元素。它是局部方法，必须要先选择到指定的元素

	.load(url,data,function(response,status,xhr)):
		url:要提交的目标文件
		data:提交给目标文件时所带的数据，以get的方式提交
		function:提交成功后所要处理的事情

	2.$.post():通过 HTTP POST 请求从服务器载入数据,全局方法

		$.post(url,data,success(data, textStatus, jqXHR),dataType)

		url		必需。规定把请求发送到哪个 URL。
		data	可选。映射或字符串值。规定连同请求发送到服务器的数据。
		success(data, textStatus, jqXHR)
				可选。请求成功时执行的回调函数。
		dataType 
				可选。规定预期的服务器响应的数据类型。默认执行智能判断（xml、json、script 或 html）。

		它等价于：
		$.ajax({
			  type: 'POST',
			  url: url,
			  data: data,
			  success: success,
			  dataType: dataType
			});

	3. $.get():通过远程 HTTP GET 请求载入信息。
		$(selector).get(url,data,success(response,status,xhr),dataType)

		url		必需。规定将请求发送的哪个 URL。
		data	可选。规定连同请求发送到服务器的数据。
		success(response,status,xhr)	
				可选。规定当请求成功时运行的函数。
				额外的参数：
					response - 包含来自请求的结果数据
					status - 包含请求的状态
					xhr - 包含 XMLHttpRequest 对象
		dataType	
				可选。规定预计的服务器响应的数据类型。
				默认地，jQuery 将智能判断。可能的类型：
				"xml"
				"html"
				"text"
				"script"
				"json"
				"jsonp"

		它等价于:
		$.ajax({
			  url: url,
			  data: data,
			  success: success,
			  dataType: dataType
			});

六、表单序列化和ajax预设置：
	1.表单序列化
	html文件：
	<form>
		<input type="text" name="psd" value="">
		<input type="password" name="pwd" value="">
		<input type="submit" value="确认提交">
	</form>
	js文件：
	$.ajax({
			  type: 'POST',
			  url: url,
			  data: $(form).serialize(),
			  <!-- 这样就可同时以键值对的方式获取psd和pwd的值;	若要以json的方式就使用.serializeArray();
			  可以使用console.log($($this).serializeArray()在firebug里查看
			  也可以：
			  	var json = $(this).serializeArray();
			  	$(选择器).html(json[0].name + '=' +json[0].value); -->

			  success: success,
			  dataType: dataType
			});

	php文件：
	$_POST['psd']
	$_POST['pwd']
	2.ajax预设置：
		<!-- $.ajaxSetup({}):方法设置全局 AJAX 默认选项 -->
			$.ajaxSetup({
			  url: "/xmlhttp/",
			  global: false,
			  type: "POST"
			});
			$.ajax({ data: myData });