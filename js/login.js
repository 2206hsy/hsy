// 全局变量
var baseURL = 'http://159.75.89.136:3000';

var oLoginBtn = document.querySelector('.loginBtn');
var oUsername = document.querySelector('.user');
var oPwd = document.querySelector('.pwd');

// 点击登录按钮
oLoginBtn.onclick = function() {
	var username = oUsername.value;
	var pwd = oPwd.value;

	// 验证非空
	if (username == '' || pwd == '') {
		alert('用户名或密码不能空');
		return;
	};

	// 验证规则 前端验证给后端减轻压力

	//发起请求 登录
	myAjax.post(baseURL + '/api_user', {
		status: 'login',
		username: username,
		password: pwd
	}, function(res) {

		console.log(res);
		if (res.code != 0) {
			alert('用户名或密码错误');
			return;
		};

		//登录成功  考虑到登录状态  持久性 本地存储信息
		localStorage.setItem('token', res.user_id);
		localStorage.setItem('username', res.username);

		//跳转首页还是跳转到其它
		//获取当前页面地址栏参数 goodsId catId
		var goodsId = getUrlVal('goodsId');
		var catId = getUrlVal('catId');
		if (goodsId) {
			location.href = 'pro_center.html?goodsId=' + goodsId;
		} else if (catId) {
			location.href = 'classify.html?catId=' + catId;
		} else {
			location.href = 'index.html';
		};

	});
};
