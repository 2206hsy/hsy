// var baseURL = 'http://159.75.89.136:3000';
(function() {
	// 获取当前分类ID
	var catId = getUrlVal('catId');

	var oGoodsList = document.querySelector('.item-list');

	var page = 1;
	var pageSize = 6;

	getMaxCount(page, pageSize, function(n) {
		// 把总页面传递给分页器
		getPagination(n);
	});
	// 默认要先调用一次当前分类渲染
	getData(page, pageSize);

	//又写一个方法，去请求当前分类数据的总页数
	function getMaxCount(pageVal, pageSizeVal, callback) {
		myAjax.get(baseURL + '/api_goods', {
			page: pageVal,
			pagesize: pageSizeVal,
			catId: catId
		}, function(res) {
			if (res.code != 0) {
				console.log(res);
				return
			};
			// 拿到总页面
			callback(res.page);
		});
	};


	//请求当前分类的数据
	function getData(pageVal, pageSizeVal) {
		myAjax.get(baseURL + '/api_goods', {
			page: pageVal,
			pagesize: pageSizeVal,
			catId: catId
		}, function(res) {
			console.log(res);
			if (res.code != 0) {
				console.log(res);
				return;
			};

			// oK的数据遍历
			var str = '';
			for (var i = 0; i < res.data.length; i++) {
				str += `
				<li>
				<div class="item-aff">
					<a href="pro_center.html?goodsId=${res.data[i].goods_id}" target="_blank">
						<div class="item-aff-pear">
							<i>
								<h1>￥${res.data[i].price}.00</h1>
							</i>
						</div>
						<div class="item-aff-intr">
							<h3>${res.data[i].goods_name}</h3>
							<p>${res.data[i].goods_desc}</p>
						</div>
					</a>
				</div>
				<a href="">
					<div class="item-img">
						<img src="${res.data[i].goods_thumb}" alt="">
					</div>
				</a>
				<div class="item-end">
					<div class="item-end-l">
						<a href=""><img src="${res.data[i].brand_thumb}" alt="">
							<p>${res.data[i].brand_name}</p>
						</a>
					</div>
					<div class="item-end-r">
						<a href="">
							<p>0</p>
							<img src="images/coffe_bg.png" alt="">
						</a>
					</div>
				</div>
				</li>
			`;
			};

			// 覆盖商品
			oGoodsList.innerHTML = str;
			// 调用图片预加载方法
			hsyLazyload('.item-list');

		});
	}


	// 调用分页器
	function getPagination(maxCount) {
		$('.pagination-content').pagination({
			pageCount: maxCount,
			prevContent: '上一页',
			nextContent: '下一页',
			activeCls: 'pagination-active',
			count: 6,
			mode: 'fixed',
			coping: true,
			homePage: '首页',
			endPage: '尾页',
			isHide: true,
			jump: true,
			callback: function(p) {
				console.log(p.getCurrent());
				getData(p.getCurrent(), pageSize);
			}
		});
	};
})();
