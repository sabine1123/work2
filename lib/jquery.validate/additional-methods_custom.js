// 大陸地區手機號碼
$.validator.addMethod("phoneCN", function(value, element, param) {
    return this.optional( element ) || /^(?=\d{11}$)^1((?:3(?!49)[4-9\D]|47|5[012789]|7[8]|8[23478])\d{8}$|70[356]\d{7}$)/.test( value );  	  
}, "手机号码格式不正确，请核对后重新输入");

//信用卡認證
$.validator.addMethod("creditcardtype", function(value, element, param) {
    if (/[^0-9-]+/.test(value)) {
        return false;
    }

    value = value.replace(/\D/g, "");

    var validTypes = 0x0000;

    if (param.mastercard)
        validTypes |= 0x0001;
    if (param.visa)
        validTypes |= 0x0002;

    if (validTypes & 0x0001 && /^(5[12345])/.test(value)) { //mastercard
        return value.length == 16;
    }
    if (validTypes & 0x0002 && /^(4)/.test(value)) { //visa
        return value.length == 16;
    }
    return false;
}, "请输入有效的信用卡号码");

//選擇銀行必選
$.validator.addMethod("bankchoice", function(value, element, param) {
   if(value === "选择银行"){
   		return false;
   }
   else{
   		return true;
   }
}, "请选择银行");

//選擇省份必選
$.validator.addMethod("citychoice", function(value, element, param) {
   if(value === ""){
   		return false;
   }
   else{
   		return true;
   }
}, "请选择省");

//選擇市區必選
$.validator.addMethod("areachoice", function(value, element, param) {
   if(value === ""){
   		return false;
   }
   else{
   		return true;
   }
}, "请选择市");

//選擇市區必選
$.validator.addMethod("streetchoice", function(value, element, param) {
   if(value === ""){
   		return false;
   }
   else{
   		return true;
   }
}, "请选择区");

//中文檢證
$.validator.addMethod("chinese", function(value, element) {
	var chinese = /^[\u4e00-\u9fa5]+$/;
	return this.optional(element) || (chinese.test(value));
	}, "只能输入中文");

//數字及英文
$.validator.addMethod("numAndAlphabet", function(value, element, param) {
    return this.optional( element ) || /^[a-zA-Z0-9]*$/.test( value );  	  
}, "只能由字母、数字组成");

//用戶名 必填
$.validator.addMethod("userName", function(value, element, param) {
	// Check if dependency is met
	if ( !this.depend( param, element ) ) {
		return "dependency-mismatch";
	}
	if ( element.nodeName.toLowerCase() === "select" ) {

		// Could be an array for select-multiple or a string, both are fine this way
		var val = $( element ).val();
		return val && val.length > 0;
	}
	if ( this.checkable( element ) ) {
		return this.getLength( value, element ) > 0;
	}
	return value.length > 0;    	  
}, "请输入用户名");

//密碼 必填
$.validator.addMethod("pwd", function(value, element, param) {
	// Check if dependency is met
	if ( !this.depend( param, element ) ) {
		return "dependency-mismatch";
	}
	if ( element.nodeName.toLowerCase() === "select" ) {

		// Could be an array for select-multiple or a string, both are fine this way
		var val = $( element ).val();
		return val && val.length > 0;
	}
	if ( this.checkable( element ) ) {
		return this.getLength( value, element ) > 0;
	}
	return value.length > 0;    	  
}, "请输入密码");

//確認密碼 必填
$.validator.addMethod("chkPwd", function(value, element, param) {
	// Check if dependency is met
	if ( !this.depend( param, element ) ) {
		return "dependency-mismatch";
	}
	if ( element.nodeName.toLowerCase() === "select" ) {

		// Could be an array for select-multiple or a string, both are fine this way
		var val = $( element ).val();
		return val && val.length > 0;
	}
	if ( this.checkable( element ) ) {
		return this.getLength( value, element ) > 0;
	}
	return value.length > 0;    	  
}, "请输入确认密码");

//綁定個人資料生日區間
$.validator.addMethod("birthdayRange", function(value, element, param) {
	return this.optional( element ) || ( value >= param[ 0 ] && value <= param[ 1 ] );
}, "请输入正确的日期区间，{0} 至 {1}");

//確認用戶名是否存在
$.validator.addMethod("loginameCheck", function(value, element) {
    return checkLoginname(value);
}, "该用户名已存在，请更换。");

//確認郵箱是否存在
$.validator.addMethod("emailExists", function(value, element) {
    return isEmailExists(value);
}, "邮箱已被注册,请更换。");

//確認手機號是否存在
$.validator.addMethod("mobileNoCheck", function(value, element) {
    return mobileNoCheck(value);
}, "手机号码已被注册，请更换。");

//驗證驗證碼是否正確
$.validator.addMethod("verifyCaptcha", function(value, element) {
    return verifyCaptcha(value);
}, "验证码错误，请重新输入。");


function checkLoginname(loginname) {
    $.ajaxSetup({
        async: false,
        cache: false
    });
    var flag = true;
    var url = "/register/verifyLoginName";
    $.get(url, {
        loginName: loginname
    }, function(rsp) {
        if (rsp == 'false') {
            flag = false;
        }
    }, "text").error(function() {
        flag = false;
    });
    return flag;
};

function isEmailExists(email) {
    if (email.trim() == '') {
        return true;
    }
    $.ajaxSetup({
        async: false,
        cache: false
    });
    var flag = true;
    var url = "/register/verifyEmail";
    $.get(url, {
        "email": email
    }, function(rsp) {
        if (rsp == 'false') {
            flag = false;
        }
    }, "text").error(function() {
        flag = false;
    });
    return flag;
};

function mobileNoCheck(mobileNo) {
    $.ajaxSetup({
        async: false,
        cache: false
    });
    var flag = true;
    var url = "/register/verifyMobileNo";
    $.get(url, {
        "mobileNo": mobileNo
    }, function(rsp) {
        if (rsp == 'false') {
            flag = false;
        }
    }, "text").error(function() {
        flag = false;
    });
    return flag;
}

function verifyCaptcha(captcha) {
    $.ajaxSetup({
        async: false,
        cache: false
    });
    var flag = true;
    var url = "/register/verifyCaptcha";
    $.get(url, {
        "captcha": captcha
    }, function(rsp) {
        if (rsp == 'false') {
            flag = false;
        }
    }, "text").error(function() {
        flag = false;
    });
    return flag;
}