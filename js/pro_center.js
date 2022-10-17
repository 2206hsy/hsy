(function() {

	var goodsId = getUrlVal('goodsId');

	//console.log(goodsId)

	var oTupian = document.querySelector('.tupian');
	var oProductlist = document.querySelector('.list2_img');
	var oProdumainr = document.querySelector('.main-2-m');
	var oBig = document.querySelector('.big');
	var aLi = oProductlist.getElementsByTagName('li');
	var oPrev = document.querySelector('.prev');
	var oNext = document.querySelector('.next');
	// 请求当前商品详情

	myAjax.get(baseURL + '/api_goods', {
		goodsId: goodsId
	}, function(res) {
		// console.log(res);
		if (res.code != 0) {
			console.log(res);
			return;
		};

		var goods = res.data[0];

		function clearUrl(str) {
			return str.replace(/url\('([^']+)'\)/g, function(match, $1) {
				return $1;
			});

		};

		// 渲染页面
		//一个图
		// for (var i = 0; i < goods.banner.length; i++) {
		var goods = res.data[0];
		var lbt1 = '';
		lbt1 +=
			`<img class="tu" src="${clearUrl(goods.banner[0])}" alt="">
			<div class="slide" style="position: absolute;left: 0 px;top: 0 px;"></div>`;
		// }
		oTupian.innerHTML = lbt1;
		oTupian.innerHTML += `<img class="tu" src="${clearUrl(goods.banner[0])}" alt="">`;
		// xtulbt();
		//放大镜图
		var goods = res.data[0];
		oBig.innerHTML += `<img class="big-img" src="${clearUrl(goods.banner[0])}" alt="">`;

		//七个图
		var lbt = '';
		for (var i = 0; i < goods.banner.length; i++) {
			var goods = res.data[0];
			// console.log(goods);
			lbt +=
				`<li><img class="tu1" src="${clearUrl(goods.banner[i])}" alt=""></li>`;
		}
		oProductlist.innerHTML = lbt;
		oTupian.innerHTML += oProductlist.innerHTML;
		console.log(goods);


		/* 放大镜 */
		// 调用放大镜方法
		foo();
		xtulbt();
		//品牌
		oProdumainr.innerHTML = `
			<div class="love">${goods.star_number}</div>
			<div class="cat"><a href="">${goods.brand_name}</a></div>
			<div class="headset">${goods.goods_name}</div>
			<div class="price">价格:<span>¥${goods.price}元</span></div>
			<div class="free">
				<span class="free-1">免运费</span>
				<span class="free-2">正版授权</span>
			</div>
			<div class="color">
				<div class="color-1">颜色:</div>
				<div class="color-2">
					<div class="color-3">
						<div class="color-4">
							<img src="images/461081.jpg" alt="">
						</div>
						<div class="name color-5">
							<p>粉色（RICO联名款）</p>
						</div>
					</div>
					<div class="name-1">
						<div class="name-2">
							<img src="images/461082.jpg" alt="">
						</div>
						<div class="name">
							<p>幸运粉</p>
						</div>
					</div>
					<div class="name-1">
						<div class="name-2">
							<img src="images/461083.jpg" alt="">
						</div>
						<div class="name">
							<p>纯真白</p>
						</div>
					</div>
				</div>
			</div>
			<div class="amount">数量:
				<div class="mopt">
					<span class="reduce">-</span>
					<span class="count">1</span>
					<span class="add">+</span>
				</div>
			</div>
			<div class="out">
				<input type="button" class="out-1 buy-btn" value="立即购买" />
				<p>已售罄，即将到货</p>
			</div>
			<div class="shopping">
				<input type="button" class="shopping-2" value="分享" />
				<input type="button" class="shopping-1" value="加入购物车" />
				<div class="tangchuang"><p><span class="logotupian"><img src="picture/loogoo.png"></span><span class="tuichu">X</span></p><p class="TC-wenzi"></p></div>
			</div>
		`;
		getAddGoods();
		Cart();
	});

	// 封装小图轮播
	function xtulbt() {
		var oTulist2 = document.querySelector('.list2_img');
		var aLi = document.querySelectorAll('.list2_img>li>img');
		var oPrev = document.querySelector('.prev');
		var oNext = document.querySelector('.next');
		// 设置ul的宽
		var liW = fetchComputedStyle(aLi[0], 'width');
		//设置一个图的宽
		// console.log(liW);
		oTulist2.style.width = '7' + liW * aLi.length + 'px';
		var time = 500;
		//全局信号量
		var n = 0;
		//点击上一张
		oPrev.onclick = function() {
			//节流
			if (oTulist2.lock) {
				return
			};
			//调用设置的方法
			play2();
		};
		//点击下一张
		oNext.onclick = function() {
			//节流
			if (oTulist2.lock) {
				return
			};
			//调用设置的方法
			play1();
		};
		//封装下一张
		function play1() {
			//累加
			n++;
			//设置元素运动 先运动
			animate(oTulist2, {
				left: -n * 70
			}, time, 'linear', function() {
				//再验证
				if (n >= aLi.length / 2) {
					// 拉回
					n = 0;
					this.style.left = '0px';
				};
			});
		};
		// 封装上一张
		function play2() {
			// 累减
			n--;
			//先验证
			if (n < 0) {
				// 拉回
				n = aLi.length / 2;
				oTulist2.style.left = -n * 70 + 'px';
				// console.log(n);
				n--;
			}
			//再运动
			animate(oTulist2, {
				left: -n * 70
			}, time, 'linear')
		};
	};

	// 封装放大镜方法
	function foo() {
		var oMain2 = document.querySelector('.main-2');
		var oMain2l = document.querySelector('.main-2-l');
		var oTupian = document.querySelector('.tupian');
		var oSlide = document.querySelector('.slide');
		var oTu = document.querySelector('.tu');
		var aLi = document.querySelectorAll('.list2_img>li');
		var oBig = document.querySelector('.big');
		var oBigImg = document.querySelector('.big-img');

		// 在tupian上面移动
		oTupian.onmousemove = function(event) {
			var x = event.clientX - oMain2.offsetLeft - oSlide.offsetWidth / 2;
			var y = event.clientY - oMain2.offsetTop - oSlide.offsetHeight / 2;
			// console.log()
			// 设置范围
			if (x <= 0) {
				x = 0
			};
			if (y <= 0) {
				y = 0
			};
			// console.log(oSlide.clientWidth);
			var maxWH = oTupian.clientWidth - oSlide.offsetWidth;
			if (x >= maxWH) {
				x = maxWH
			};
			if (y >= maxWH) {
				y = maxWH
			};
			// 设置
			oSlide.style.left = x + 'px';
			oSlide.style.top = y + 'px';
			// 同时操作右边大图
			// console.log(oBigImg.offsetWidth);
			// 求比例   oSmall.clientWidth - oSlide.offsetWidth
			var bili = (oBigImg.offsetWidth - oBig.clientWidth) / (oTupian.clientWidth - oSlide
				.offsetWidth);
			oBigImg.style.left = -x * bili + 'px';
			oBigImg.style.top = -y * bili + 'px';
			// console.log(oBigImg.style.left);
			// console.log(oBigImg.style.top);
		};
		// 批量监听
		for (var i = 0; i < aLi.length; i++) {
			aLi[i].onmouseover = function() {
				// 拿到当前img的src值
				// console.log(this.childNodes);
				// console.log(this.firstElementChild.src);
				var nowSrc = this.firstElementChild.getAttribute('src');
				// console.log(nowSrc);
				oTu.src = nowSrc;
				oBigImg.src = nowSrc;
			};
		};
		// 移入移出
		oTupian.onmouseenter = function() {
			oSlide.style.display = 'block';
			oBig.style.display = 'block';
		};
		oTupian.onmouseleave = function() {
			oSlide.style.display = 'none';
			oBig.style.display = 'none';
		};
	};


	// 封装加车方法
	function getAddGoods(count) {
		var oAddCartBtn = document.querySelector('.shopping-1');
		var oBuyBtn = document.querySelector('.buy-btn');
		var oRedBtn = document.querySelector('.reduce');
		var oCount = document.querySelector('.count');
		var oAddBtn = document.querySelector('.add');
		var oTangchuang = document.querySelector('.tangchuang');
		var oTuichu = document.querySelector('.tuichu');
		var oTCwenzi = document.querySelector('.TC-wenzi');
		// 数量
		var count = 1;
		oCount.innerHTML = count;

		// 数量加减
		oRedBtn.onclick = function() {
			count--;
			count = count < 1 ? 1 : count;
			oCount.innerHTML = count;
		};
		console.log(count);
		oAddBtn.onclick = function() {
			count++;
			count = count >= 10 ? 10 : count;
			oCount.innerHTML = count;
		};



		//事件监听
		oAddCartBtn.onclick = function() {
			//验证用户登录状态
			var TOKEN = localStorage.getItem('token');
			if (!TOKEN) {
				//跳转登录
				alert('请先登录');
				location.href = 'login_app.html?goodsId=' + goodsId;
				return;
			};

			// 加入购物车 接口
			myAjax.post(baseURL + '/api_cart', {
				status: 'addcart',
				userId: TOKEN,
				goodsId: goodsId,
				goodsNumber: count
			}, function(res) {

				if (res.code != 0) {
					oTangchuang.style.display = 'block';
					oTCwenzi.innerHTML = '加入购物车失败';
					console.log(res);
					return;
				};
				oTangchuang.style.display = 'block';
				oTCwenzi.innerHTML = '加入购物车成功';
				// 头部要渲染此商品
				// 手动去购物车查看
				Cart();
			})
		};

		oTuichu.addEventListener('click', function(e) {
			// console.log('点击了');
			e.stopPropagation();
			oTangchuang.style.display = 'none';
			// if (oTCwenzi.innerHTML == '请先登录') {
			// 	location.href = 'login2.html?goodsId=' + goodsId;
			// 	return;
			// };
		}, false);
	};
})();



// 最低下介绍图片
(function() {

	var goodsId = getUrlVal('goodsId');
	var oProductDetail = document.querySelector('.lucky');
	myAjax.get(baseURL + '/api_goods', {
		goodsId: goodsId
	}, function(res) {
		// console.log(res);
		if (res.code != 0) {
			console.log(res);
			return;
		};

		var goods = res.data[0];

		function clearUrl(str) {
			return str.replace(/url\('([^']+)'\)/g, function(match, $1) {
				return $1;
			});
		};
		//大图
		var strDetail = '';
		for (var i = 0; i < goods.product_banner.length; i++) {
			strDetail += `<img src="${goods.product_banner[i]}" />`;
		};
		oProductDetail.innerHTML = strDetail;
	});
})()
