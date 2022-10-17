//验证码：a-zA-Z0-9  arr = ['a', 'b'........]
//随机在数组中拷贝 四个 出来
//每次随机到的字符又进行一些随机 字体大小，颜色，倾斜
//每次可以有一张大的背景图片随机位置

// 全局变量
var baseURL = 'http://159.75.89.136:3000';

//验证交互：点击注册按钮再进行验证
//验证交互：失去焦点进验证
//验证交互：keyup进验证 input事件

var oUserName = document.querySelector('.user');
var oPwd = document.querySelector('.pwd');
var userMsg = document.querySelector('.user-msg');
var pwdMsg = document.querySelector('.pwd-msg');
var registerBtn = document.querySelector('.regbtn');

// 设定 用户名 和 密码 的一个状态
var isUsername = false;
var isPwd = false;
var isQwd = false;
var isYzm = false;

function isDisabled() {
	if (isUsername && isPwd && isYzm) {
		registerBtn.disabled = false;
	} else {
		registerBtn.disabled = true;
	}
};

//验证用户名
oUserName.onblur = function() {
	// oUserName.onkeyup = function(){
	// 获取它的值 ，进行正则校验 3-12位字母数字下划线组成
	var res = /^[a-z0-9_]{3,12}$/g;
	var userName = this.value;

	if (userName == '') {
		usernameMsg('block', '用户名不能为空', 'orangered');
		isUsername = false;
		isDisabled();
		return;
	};

	if (!res.test(userName)) {
		usernameMsg('block', '用户名必须是3-12位数字字母下划线组成', 'orangered');
		isUsername = false;
		isDisabled()
		return;
	};

	//每输入一个字符都会去请求一下后台，对服务器的一个压力！
	//前端验证通过，还要请求后台用户名是否可用！！！
	myAjax.post(baseURL + '/api_user', {
		username: userName,
		status: 'check'
	}, function(res) {
		if (res.code != 0) {
			usernameMsg('block', '用户名已存在', 'orangered');
			isUsername = false;
			isDisabled()
			return;
		};

		usernameMsg('block', '用户名可用', 'green');
		isUsername = true;
		isDisabled();
	});
};

var oYzm = document.querySelector('.auth');
var oSrk = document.querySelector('.regcode');
var yzmMsg = document.querySelector('.yzm-msg');

//验证码
function getHyz() {
	oYzm.innerHTML = getYzm();
}
oYzm.innerHTML = getYzm();

oSrk.onkeyup = function() {
	if (oYzm.innerHTML === oSrk.value) {
		yzmaMsg('block', '验证码正确', 'green');
		isYzm = true;
		isDisabled();
	} else if (oSrk.value == '') {
		yzmaMsg('block', '请输入验证码', 'orangered');
		isYzm = false;
		isDisabled();
		return;
	} else if (oYzm.innerHTML !== oSrk.value) {
		yzmaMsg('block', '验证码不正确,请重新输入!', 'orangered');
		isYzm = false;
		isDisabled();
	}
};

function getYzm() {
	var arr = [
		'a', 'b', 'c', 'd', 'e', 'f', 'j', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q',
		'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'J', 'H',
		'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
		'1', '2', '3', '4', '5', '6', '7', '8', '9'
	]
	var codestr = ''
	for (var i = 0; i < 4; i++) {
		var index = parseInt(Math.random() * arr.length);
		codestr += arr[index]
	}
	return codestr;
}


//验证密码
oPwd.onkeyup = function() {
	var pwd = this.value;
	if (pwd == '') {
		passwordMsg('block', '密码不能为空', 'orangered');
		isPwd = false;
		isDisabled();
		return;
	};

	var pwdReg = /^[0-9]{6,12}$/g;
	if (!pwdReg.test(pwd)) {
		passwordMsg('block', '密码为6-12位数字', 'orangered');
		isPwd = false;
		isDisabled();
		return;
	};
	passwordMsg('block', '密码OK', 'green');
	isPwd = true;
	isDisabled()
};
// 点击注册按钮
registerBtn.onclick = function() {
	if (!isPwd || !isUsername) {
		return;
	};

	console.log('去注册');

	// 请求注册接口
	myAjax.post(baseURL + '/api_user', {
		username: oUserName.value,
		password: oPwd.value,
		status: 'register'
	}, function(res) {
		//console.log(res);
		if (res.code != 0) {
			console.log(res);
			alert('后台繁忙~~~');
			return;
		};

		// 清空
		oUserName.value = '';
		oPwd.value = '';
		//跳转登录 延迟转  3 2 1...  3秒之后跳转登录
		// window.location.href = 'login_app.html';
		var oTiaozhuang = document.querySelector('.tiaozhuang');
		var oTZwenzi = document.querySelector('.TZwenzi');
		var t = 5;
		oTiaozhuang.style.display = 'block';
		var timer = setInterval(function() {
			t--;
			oTZwenzi.innerHTML = t + "秒后跳转登录";
			if (t == 0) {
				window.location.href = 'login_app.html';
				oTiaozhuang.style.display = 'none';
			};
		}, 800);

	});

};


function usernameMsg(dis, msg, color) {
	oUserName.style.borderColor = color;
	userMsg.style.display = dis;
	userMsg.innerHTML = msg;
	userMsg.style.color = color;
};

function passwordMsg(dis, msg, color) {
	oPwd.style.borderColor = color;
	pwdMsg.style.display = dis;
	pwdMsg.innerHTML = msg;
	pwdMsg.style.color = color;
};


function yzmaMsg(dis, msg, color) {
	oSrk.style.borderColor = color;
	yzmMsg.style.display = dis;
	yzmMsg.innerHTML = msg;
	yzmMsg.style.color = color;
}
