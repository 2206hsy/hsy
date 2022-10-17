// 全局变量
var baseURL = 'http://159.75.89.136:3000';

// 轮播图板块
(function() {

	var oBanner = document.querySelector('.banner');
	var oBannerList = document.querySelector('.banner-list');
	var aLi = oBannerList.getElementsByTagName('li');
	var oPrev = document.querySelector('.prev');
	var oNext = document.querySelector('.next');
	var oNumber = document.querySelector('.number');
	var aSpan = oNumber.getElementsByTagName('span');
	// 获取轮播图数据
	myAjax.get(baseURL + '/api_banner', {
		bannerId: 1
	}, function(res) {
		// console.log(res);
		if (res.code != 0) {
			console.log(res);
			return;
		};

		// 获取成功
		// var str = '';
		for (var i = 0; i < res.data.length; i++) {
			var li = document.createElement('li');
			li.innerHTML =
				`<a href=""><img src="picture/loading.gif" hsy-lazyload="${res.data[i].goods_thumb}" alt=""></a>`;
			oBannerList.appendChild(li);
		};
		//添加障眼法
		li.innerHTML =
			`<a href=""><img src="picture/loading.gif" hsy-lazyload="${res.data[0].goods_thumb}" alt=""></a>`;
		oBannerList.appendChild(li);
		hsyLazyload('.banner-list');
		//遍历小圆点
		for (var j = 0; j < res.data.length - 1; j++) {
			var span = document.createElement('span');
			oNumber.appendChild(span);
		};
		// 设置ul的宽
		var liw = fetchComputedStyle(aLi[0], 'width');
		// console.log(liw);
		oBannerList.style.width = liw * aLi.length + 'px';

		//封装一个轮播效果的方法
		// function banner() {

		var time = 500;
		// 全局变量
		var n = 0;
		//小圆点全局变量
		var m = 0;
		// 点击下一张
		oNext.onclick = play;

		function play() {
			//节流
			if (oBannerList.lock) {
				return
			};
			//累加
			n++;

			//运动
			animate(oBannerList, {
				left: -n * liw
			}, time, function() {
				if (n >= aLi.length - 1) {
					// 拉回
					n = 0;
					oBannerList.style.left = '0px';
				};
			});
			// 小圆点跟随
			m++;
			m = m >= aSpan.length ? 0 : m;
			setYuan();
		};

		//点击上一张
		oPrev.onclick = function() {
			// 节流
			if (oBannerList.lock) {
				return
			};
			// 累减
			n--;

			//后验证
			if (n < 0) {
				//设置信号量为最后一个
				n = aLi.length - 1;
				// 拉回
				oBannerList.style.left = -n * liw + 'px';
				//累减一下
				n--;
			};

			//再运动
			animate(oBannerList, {
				left: -n * liw
			}, time, 'sineEaseIn');

			// 小圆点
			m--;
			m = m < 0 ? aSpan.length - 1 : m;
			setYuan();
		};

		// 点击小圆点，批量监听
		for (var i = 0; i < aSpan.length; i++) {
			// 获取点击元素下标
			(function(j) {
				aSpan[j].onclick = function() {
					// 联动
					n = j;
					m = j;
					// 运动
					animate(oBannerList, {
						left: -n * liw
					}, time, 'sineEaseIn');
					setYuan();
				};
			})(i);
		};
		// 自动播放
		var timer = setInterval(play, 2000);
		// 鼠标移入
		oBanner.onmouseover = function() {
			clearInterval(timer);
		};

		// 鼠标移出
		oBanner.onmouseout = function() {
			timer = setInterval(play, 2000);
		};

		function setYuan() {
			// 设置排他
			for (var i = 0; i < aSpan.length; i++) {
				aSpan[i].style.backgroundColor = '#e8e8e8';
			};
			// 设置当前
			aSpan[m].style.backgroundColor = '#45494d';
		};
		/* // 点击上一张按钮事件
		oPrev.onclick = function() {
			n--;
			//验证
			n = n < 0 ? 3 : n;
			//调用设置方法
			xc();
		};
		//点击下一张按钮事件
		oNext.onclick = btnNext;

		function btnNext() {
			//自增
			n++;
			//验证
			n = n >= aLi.length ? 0 : n;
			//调用设置方法
			xc();
		};
		//点击小圆点
		for (var i = 0; i < aSpan.length; i++) {
			//编号下标
			aSpan[i].idx = i;
			aSpan[i].onclick = function() {
				// 联动
				n = this.idx;
				//调用设置方法
				xc();
			};
		};
		//自动播放
		var timer = setInterval(btnNext, 3000);
		oBanner.onmouseover = function() {
			// 清除定时器
			clearInterval(timer);
		};
		oBanner.onmouseout = function() {
			// 清除定时器
			timer = setInterval(btnNext, 3000);
		};
		//封装方法
		function xc() {
			//排它
			for (var i = 0; i < aLi.length; i++) {
				aLi[i].className = '';
				// aSpan[i].style.background = 'red';
			};
			//设置
			aLi[n].className = 'active';
			// aSpan[n].style.background = 'gray';
		}; */
		// };
	});
})();



/* (function() {
	var oSlides = document.querySelector('.slides');
	var oBigphoto = document.querySelector('.bigphoto');
	var aLi = oBigphoto.getElementsByTagName('li');
	var oPrev = document.querySelector('.slides-l');
	var oNext = document.querySelector('.slides-r');
	var oNumber = document.querySelector('.slides-b');
	var aSpan = oNumber.getElementsByTagName('span');
	// 获取轮播图数据
	myAjax.get(baseURL + '/api_banner', {
		bannerId: 1
	}, function(res) {
		// console.log(res);
		// 验证数据
		if (res.code != 0) {
			console.log(res);
			return;
		};

		// 遍历
		for (var i = 0; i < res.data.length; i++) {

			var li = document.createElement('li');
			li.innerHTML =
				`<a href=""><img src="images/loading.gif" wj-lazyload="${res.data[i].goods_thumb}" alt=""></a>`;
			oBigphoto.appendChild(li);

		};
		// 添加障眼法
		li.innerHTML =
			`<a href=""><img src="images/loading.gif" wj-lazyload="${res.data[0].goods_thumb}" alt=""></a>`;
		oBigphoto.appendChild(li);
		// 调用图片预加载方法
		wjLazyload('.bigphoto');
		//遍历小圆点
		for (var j = 0; j < res.data.length - 1; j++) {
			var span = document.createElement('span');
			oNumber.appendChild(span);
		};

		// 设置ul的宽
		var liw = fetchComputedStyle(aLi[0], 'width');
		// console.log(liw);
		oBigphoto.style.width = liw * aLi.length + 'px';
		// 元素运动一次的时长
		var time = 500;
		// 全局变量
		var n = 0;
		//小圆点全局变量
		var m = 0;
		// 点击下一张
		oNext.onclick = play;

		function play() {
			//节流
			if (oBigphoto.lock) {
				return
			};
			//累加
			n++;
			//运动
			animate(oBigphoto, {
				left: -n * liw
			}, time, function() {
				if (n >= aLi.length - 1) {
					// 拉回
					n = 0;
					oBigphoto.style.left = '0px';
				};
			});
			// 小圆点跟随
			m++;
			m = m >= aSpan.length ? 0 : m;
			setYuan();

		};
		//点击上一张
		oPrev.onclick = function() {
			// 节流
			if (oBigphoto.lock) {
				return
			};
			// 累减
			n--;

			//后验证
			if (n < 0) {
				//设置信号量为最后一个
				n = aLi.length - 1;
				// 拉回
				oBigphoto.style.left = -n * liw + 'px';
				//累减一下
				n--;
			};

			//再运动
			animate(oBigphoto, {
				left: -n * liw
			}, time, 'sineEaseIn');

			// 小圆点
			m--;
			m = m < 0 ? aSpan.length - 1 : m;
			setYuan();
		};

		// 点击小圆点，批量监听
		for (var i = 0; i < aSpan.length; i++) {
			// 获取点击元素下标
			(function(j) {
				aSpan[j].onclick = function() {
					// 联动
					n = j;
					m = j;
					// 运动
					animate(oBigphoto, {
						left: -n * liw
					}, time, 'sineEaseIn');
					setYuan();
				};
			})(i);
		};
		// 自动播放
		var timer = setInterval(play, 2000);

		// 鼠标移入
		oSlides.onmouseover = function() {
			clearInterval(timer);
		};

		// 鼠标移出
		oSlides.onmouseout = function() {
			timer = setInterval(play, 2000);
		};

		function setYuan() {
			// 设置排他
			for (var i = 0; i < aSpan.length; i++) {
				aSpan[i].style.backgroundColor = '#e8e8e8';
			};
			// 设置当前
			aSpan[m].style.backgroundColor = '#45494d';
		};
	});
})(); */
// 人气良品板块
(function() {
	var oGoodsList = document.querySelector('.lp-a-list');
	var oMore = document.querySelector('.more-center');
	// var oLoad = document.querySelector('.load');

	var pageSize = 6;
	var page = 1;

	// 锁
	var lock = false;

	// 封装热门商品方法
	function getHotGoods(pageSize, page) {
		myAjax.get(baseURL + '/api_goods', {
			pagesize: pageSize,
			page: page
		}, function(res) {
			if (res.code != 0) {
				console.log(res);
				return;
			};

			// 验证是不是最后一页
			if (res.data.length == 0) {
				// oMore.innerHTML = '暂无更多...';

				// oLoad.innerHTML = '暂无更多...';
				// oLoad.style.display = 'block';
				// 下面点击 按钮 上锁
				lock = true;
				return;
			};
			console.log(res);
			// 遍历
			for (var i = 0; i < res.data.length; i++) {
				var li = document.createElement('li');
				li.innerHTML = `
					<div class="lp-yc">
						<a href="pro_center.html?goodsId=${res.data[i].goods_id}" target="_blank">
							<div class="yc-a">
								<h1>￥${res.data[i].price}.00</h1>
							</div>
							<div class="yc-b">
								<h3>${res.data[i].goods_name}</h3>
								<p>${res.data[i].goods_desc}</p>
							</div>
						</a>
					</div>
					<a href="">
						<div class="lp-t">
							<img src="picture/loading.gif" hsy-lazyload="${res.data[i].goods_thumb}" alt="">
						</div>
					</a>
					<div class="lp-b">
						<div class="lp-l">
							<a href=""><img src="${res.data[i].brand_thumb}" alt="">
								<p>${res.data[i].brand_name}</p>
							</a>
						</div>
						<div class="lp-r">
							<a href="">
								<p>${res.data[i].goods_number}</p>
								<img src="images/lp-r.png" alt="">
							</a>
						</div>
					</div>
				`;
				oGoodsList.appendChild(li);
			};
			// 调用图片预加载方法
			hsyLazyload('.lp-a-list');

			// 开锁
			lock = false;
			// 隐藏交互
			// oLoad.style.display = 'none';
		});
	};
	// 默认调用一次
	getHotGoods(pageSize, page);
	// 滚动到底部加载更多
	oMore.onclick = function() {



		// if ((windowH + scrollTop) / pageH >= 0.9999999999) {
		// 	if (lock) {
		// 		return
		// 	};
		// 	lock = true;
		page++;
		// console.log(page);
		// 设置交互
		// oLoad.innerHTML = '加载中....';
		// oLoad.style.display = 'block';
		getHotGoods(pageSize, page);
		// };
	};
})();
