$(function(){
  //導覽列開關 
  $("header button").on("click",function(){
    $(this).toggleClass('open');
    $('nav').toggleClass('open');
    if($('nav').hasClass("open")){  
        //內文及頁腳左滑
        $('.main,footer').css({
          transform: "translateX(-130px)",
          "transition-delay": "0.2s"
        });

        //禁止滑動
        $("nav").on("touchmove",handler,false);

        //蓋遮罩
        $('body').append('<div class="wrapper"></div>');  
        $('.wrapper').css({
          width: "100%",
          height: $('html').outerHeight(),
          "background-color" : "rgba(0,0,0,0.8)",
          "z-index": 9,
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        });
      }else{       
        $('.main,footer').css({
          transform: "",//translateX(0px)
          "transition-delay": "0s"
        });  
        $('.wrapper').remove();      
      }
  });

  // 登入燈箱
  $(".btn-login,.login-close").on("click",function(){
      $('html').toggleClass('noscroll');
      $(".login-section").toggleClass("open");
      $(".login-section").on("touchmove",handler,false);
  });
  //導覽列登入功能
  $('#login').on("click",function(e){
    e.preventDefault();
    $("header button").trigger("click");
    // console.log("nav");
    $(".btn-login").trigger("click");
    // console.log("login");
  });

  //動態設置關閉按鈕的位置
  setClosePos();
  $(window).resize(function(){
    setClosePos();
  });
  //输入框判断是否显示关闭按钮
  var input = $('.text-field input');
  input.on('keyup', function(){
    // console.log("keyup");
    if($(this).val().length <= 0){
      $(this).siblings('.input-reset').hide();
    }else{        
      $(this).siblings('.input-reset').show();
    }   
  }); 
  input.on('focus', function(){
    setClosePos();
    $(this).closest('form').find('.input-reset').hide();
    if($(this).val().length > 0){   
      $(this).siblings('.input-reset').show();
    }
  });   
  $('.input-reset').on('click', function(){ 
    $(this).siblings('input').val('');
    $(this).hide();
  })

  //表單送出按鈕注冊
  $('.regist-form .btn-fill').on("click",function(){

    var account = $("#account").val();
    var password = $("#password").val();
    var phone = $("#phone").val();
    var data = {
         "loginName":account,
         "password":password,
         "companyId":3,
         "firstName":"小明",
         "lastName":"王",
         "mailbox":"peter.chen28@arribatech.com",
         "telephone":phone,
         "qqnumber":"12345",
         "birthday":"1981-01-01",
         "sex":"1",
         "invitecode":null,
         "agent_code":null
        };
    var jqxhr = $.ajax(
    {
      method: "POST",
      url:"https://192.168.0.99:8443/api/v1/member/createMember",
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(data)
    })
      .done(function(data) {
           console.log( data );
           if(data.code == 0){
            console.log(data.data.token);
            window.location.replace("regist_suc.html");            
           }
           else{
            setPopup(false,{
                title: "注册失败",
                content: "<p>请重新输入。</p>",
                btnText: "确定"
            });
           }
        })
        .fail(function() {
           console.log( "error" );
        })
        .always(function() {
           console.log( "finished" );
        });

    $('.regist-form').submit();
  }); 
  $('.login-section .btn-fill').on("click",function(){

    var account = $(".account").val();
    var password = $(".password").val();
    var data = {
         "companyId":3,
         "loginName": account,
         "password": password
        };
    var jqxhr = $.ajax(
    {
      method: "POST",
      url:"https://192.168.0.99:8443/api/v1/member/login",
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(data)
    })
      .done(function(data) {
           console.log( data );
           if(data.code == 0){
            console.log(data.data.token);
            setPopup(true,{
                title: "登录成功",
                content: "<p>您尚未完成用户信息填写，为了您的帐号安全，建议您先至会员中心填写完整。</p>",
                btnText: "<a href ='member.html'>立刻前往</a>"
            });
           }
           else{
            setPopup(false,{
                title: "登录失败",
                content: "<p>用户名或密码错误，请重新输入。</p>",
                btnText: "确定"
            });
           }
        })
        .fail(function() {
           console.log( "error" );
        })
        .always(function() {
           console.log(account);
           console.log(password);
        });

    $("form").submit();  
    
  }); 

  $('.forgetpw-form .btn-fill').on("click",function(){
    var submitpw = true;
    if(submitpw){
      //提取密碼成功
      setPopup(true,{
          title: "提取密码成功",
          content: "<p>密码提取成功，请回登录页面进行登录</p>",
          btnText: "<a href ='index.html#'>立刻前往</a>"
      });
    }else{
      //提取密碼失敗
      setPopup(false,{
          title: "提取密码失败",
          content: "<p>密码提取失败，请咨询在线客服</p>",
          btnText: "确定"
      });
    }
    $(".forgetpw-form").submit();
  });

  //忘記密碼
  $(".forgetpw-form").validate({  
    submitHandler: function() {
      console.log("submit click");
    },
    errorElement: "span",
    rules: {
      account: "required",
      email: "required",
      verification: "required"
    },
    messages: {
      account: {
        required: " (必需字段)",
        minlength: " (不能少于 3 个字母)"
      },
      email: {
        required: " (必需字段)"
      },
      verification: {
        required: " (必需字段)"
      }
    }
  });
  //表單規則
  //註冊表單
  $(".regist-form").validate({  
    submitHandler: function() {
      console.log("submit click");
    },
    errorElement: "span",
    rules: {
      account: "required",
      password: "required",
      pwdconfirm: "required",
      phone: "required"
    },
    messages: {
      account: {
        required: " (必需字段)",
        minlength: " (不能少于 3 个字母)"
      },
      password: {
        required: " (必需字段)",
        minlength: " (字母不能少于 5 个且不能大于 12 个)",
        maxlength: " (字母不能少于 5 个且不能大于 12 个)"
      }
    }
  });
  //登入表單    
  $(".login-form").validate({
    submitHandler: function() {
      console.log("submit click");
    },
    errorElement: "p",
    errorLabelContainer: ".errors",
    rules: {
      account: "required",
      password: "required"
    },
    messages: {
      account: {
        required: " (必需字段)",
        minlength: " (不能少于 3 个字母)"
      },
      password: {
        required: " (必需字段)",
        minlength: " (字母不能少于 5 个且不能大于 12 个)",
        maxlength: " (字母不能少于 5 个且不能大于 12 个)"
      }
    }
  });
    
  //動態取得輸入欄位關閉按鈕的定位
  function setClosePos(){
    var input = $('.input-reset').siblings('input');
    if(input.length == 0) return;
    var pos = input.position();
    $('.input-reset').css({
      top: pos.top, 
      left: pos.left + input.outerWidth() - $('.input-reset').width()
    });
    // console.log(pos);
  }
});

//設定跑馬燈的顏色
// hasMarquee: 該頁面是否有跑馬燈
// color: 跑馬燈背景顏色(配合該頁面色調)
function setMarquee(hasMarquee,color){   
  //沒有跑馬燈的情況下，扣除35px
  if(hasMarquee){
    marquee.init(".marquee_content",".marquee_content span",0.5,"还记得去年金曲奖的台上， #彭佳慧 一接到奖座瞬间类崩，大喊：「这座金曲奖，我等了20年」，真谓 #二十年磨一剑。其中某一段7年被唱片公司打枪，没有一家公司愿意为她发片，在Pub坚持她的歌手之路！这座奖真的来得太晚了，却给了依然在音乐之路努力的歌手们，一个正面的教材。歌后说：「我相信所有有梦想的朋友，都可以像彭佳慧一样20年努力坚持，我会再唱另外一个20年」");
    marquee.play();  
    $('.marquee_container').css("background-color","#f9f9f9");  
    // $('header').css("background-color","#ececec");  
    if(color){
      $('.marquee_container').css("background-color",color);
      // console.log("set marquee_color : "+color)
    } 
  } 
}

//移除默認
function handler(e) {
    e.preventDefault();
}

/* 手風琴單開
 * $this   : 點擊的 $物件
 * closeBtn: 是否為關閉按鈕
 */
function accordion($this,closeBtn){
  var $this_content = $this.siblings(".content_section");
  //header 的高度
  var top = $(window).outerWidth() > 768 ? $(window).outerWidth() > 1024 ? 167 : 147 : 115;
  
  //優惠活動的關閉按鈕
  //先滑動至頂才做開關
  if(closeBtn){
    $('body').animate({
      scrollTop: $this.offset().top - top
    },500,function(){
      $this.toggleClass('open');
      $this_content.slideToggle();
    });
    return;
  }   
  
  if($this.parent().siblings('.no_tap_highlight').find(".main_section").hasClass('open')){
    console.log("hasOpen");
    $this.parent().siblings('.no_tap_highlight').find(".content_section").slideUp(500);
    $this.parent().siblings('.no_tap_highlight').find(".main_section").removeClass('open');
    setTimeout(function(){
      $('body').animate({
        scrollTop: $this.offset().top - top
      },500,function(){      
        $this.toggleClass('open'); 
        $this_content.slideToggle(800);
      });
    },500)
  }else{
    console.log("NoHasOpen");
    $('body').animate({
      scrollTop: $this.offset().top - top
    },500,function(){      
      $this.toggleClass('open'); 
      $this_content.slideToggle(800);
    });
  }
}
//popup通用格式
function setPopup(popuptype,popupobj){
  $('.btn-pop').off("click");

  $('.login-section').removeClass("open");
  $('.popup-section').addClass("open");

  if(popuptype){    
    $('.popup-title').html(popupobj.title);
    $('.popup-text').html(popupobj.content);
    $('.btn-pop').append(popupobj.btnText);
  }else{
    $('.popup-title').html(popupobj.title);
    $('.popup-text').html(popupobj.content);
    $('.btn-pop').html(popupobj.btnText);
    $('.btn-pop').on("click",function(){
      $('.popup-section').removeClass("open");
      $('.login-section').addClass("open");
    });
  }
}

function validationBox(type){
  if($('.validation-section').length > 0){
    $('.validation-section').remove();
    // console.log("REMOVE");
  }

  switch(type){
    case "mail":  
      $('body').append(el_validationMail);
      $('.validation-section').css({
        top: $(window).scrollTop()
      });

      console.log("html: " + $('html').height());
      console.log("body: " + $('body').height());
      console.log("validation-section: " + $('.validation-section').height());
      $('.btn-check').on("click", function(){
        //取得驗證碼
      })
      $('.btn-submit').on("click", function(){
        //驗證郵箱
      })

      //鎖住整個頁面無法滾動
      $('html').toggleClass('noscroll');
      break;
    case "phone":      
      $('body').append();
      
      $('.btn-check').on("click", function(){
        //取得驗證碼
      })
      $('.btn-submit').on("click", function(){
        //驗證郵箱
      })

      //鎖住整個頁面無法滾動
      $('html').toggleClass('noscroll');
      break;
  }

  $('html').on("click", '.validation-close', function(){
    $('.validation-section').remove();   
    $('html').removeClass('noscroll');
  })

}


//JSON時間轉換 BY Eason
function _toLocalDateTime(sDate) {
  try {
    var date = new Date(sDate + "Z");//add Z for all browser
    var nValue = date.valueOf();

    if (nValue > 0) {
        return date.toLocaleString();
    } else {
        return "-";
    }
  } catch (e) {
    return "-";
  }
}

//需要在畫面變動時做處理/更新的 fn
function pageRefresh(fn){
  $(window).on('load resize', function(){
    fn();
  })
}


