// 全局变量
var baseURL = 'http://159.75.89.136:3000';

// 获取当前用户登录
var TOKEN = window.localStorage.getItem('token');

// 验证登录状态
(function() {

	var oLoginBtn = document.querySelector('.login-btn');
	var oRegBtn = document.querySelector('.reg-btn');
	var oWelcome = document.querySelector('.welcome');
	var oLoginOut = document.querySelector('.login-out');
	var oCartBtn = document.querySelector('.cart-btn');

	loginStatus();

	function loginStatus() {
		// 获取本地存储
		var TOKEN = window.localStorage.getItem('token');
		var USERNAME = window.localStorage.getItem('username');

		if (!TOKEN) {
			oLoginBtn.style.display = 'block';
			oRegBtn.style.display = 'block';
			oWelcome.style.display = 'none';
			oLoginOut.style.display = 'none';
		} else {
			oLoginBtn.style.display = 'none';
			oRegBtn.style.display = 'none';
			oWelcome.style.display = 'block';
			oWelcome.innerHTML = '欢迎，' + USERNAME;
			oLoginOut.style.display = 'block';
		};
	};

	// 点击退出
	oLoginOut.onclick = function() {
		// 清除本地存储
		localStorage.removeItem('token');
		localStorage.removeItem('username');
		localStorage.removeItem('goods');
		//loginStatus();
		// 跳转到登录
		window.location.href = 'login_app.html';
	};

	// 点击购物车
	oCartBtn.onclick = function() {
		var TOKEN = window.localStorage.getItem('token');
		if (TOKEN) {
			window.location.href = 'shopcar.html';
		} else {
			alert('请登录');
		};
	};

	// 点击 登录
	oLoginBtn.onclick = function() {
		// 获取当前页面地址栏参数 goodsId catId
		var goodsId = getUrlVal('goodsId');
		var catId = getUrlVal('catId');
		if (goodsId) {
			location.href = 'login_app.html?goodsId=' + goodsId;
		} else if (catId) {
			location.href = 'login_app.html?catId=' + catId;
		} else {
			location.href = 'login_app.html';
		}
	}

})();

// 可以分类三大板块
// 分类导航板块
(function() {
	var oNav = document.querySelector('.sd-c');
	var oNavTem = document.querySelector('#nav-template').innerHTML;
	// 发起请求，请求导航分类的数据
	myAjax.get(baseURL + '/api_cat', {}, function(res) {
		// 验证数据
		if (res.code != 0) {
			console.log(res);
			return;
		};
		//代码运行到这一行，证明数据获取成功；
		var str = '';
		// 拿到数据拼装渲染到页面
		for (var i = 0; i < res.data.length; i++) {
			str +=
				`<li><img class="sd-c-img" src="${res.data[i].cat_img}"></img><a target="_blank" href="classify.html?catId=${res.data[i].cat_id}">${res.data[i].cat_name}</a></li>`;
		};
		// 添加到页面
		oNav.innerHTML = str;
	})
})();


/* 购物车渲染 */
// (function() {


var oSubnav = document.querySelector('.subnav');
var oSubnav_b = document.querySelector('.subnav-b');
var oAddshop = document.querySelector('.add_shop');

function Cart() {
	myAjax.post(baseURL + '/api_cart', {
		status: 'viewcart',
		userId: TOKEN
	}, function(res) {
		if (res.code != 0) {
			console.log(res);
			return;
		};
		var cart = res.data;
		if (cart.length != 0) {
			var yer = '';
			for (var i = 0; i < cart.length; i++) {
				yer += `
						<div class="subnav_list">
							<div class="subnav_list_left">
								<a href="pro_center.html?goodsId=${cart[i].goods_id}"><img src="${cart[i].goods_thumb}" alt=""></a>
							</div>
							<div class="subnav_list_rigt">
								<p class="protit"><a href="pro_center.html?goodsId=${cart[i].goods_id}">${cart[i].goods_name}</a></p>
								<p class="procosize">${cart[i].brand_name}</p>
								<div class="list_sun">
									数量：${cart[i].goods_number}
									<p class="proPrice">￥${cart[i].goods_number*cart[i].price}</p>
								</div>
							</div>
						</div>
					`;
			};
			oSubnav.innerHTML = yer + '<a class="add-cat" href="shopcar.html">查看我的购物车</a>';
			oSubnav_b.style.display = 'none';
			oAddshop.style.display = 'none';
			return;
		}
	});
}
Cart();
// })();
