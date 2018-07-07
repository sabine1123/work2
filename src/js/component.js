var el_header = `<div class="bg"></div>
                  <div class="user_bar">
                    <div class="profile">
                      <span class="user_icon"></span>
                      <span class="user_name">USER</span>
                    </div>
                    <div class="has_login">
                      <div class="btn btn-fill left">
                        <a href="member.html">会员中心</a>
                      </div>    
                      <div class="btn btn-fill right">
                        <a href="#">登出</a>
                      </div>
                    </div>
                  </div>
                  <button>
                    <span></span>
                    <span></span>
                    <span></span>
                  </button>`;
var el_nav = `<ul>
                  <li><a href="index.html">首页</a></li>
                  <li><a href="slot.html">老虎机</a></li>
                  <li><a href="livegame.html">真人娱乐</a></li>
                  <li><a href="fishing.html">捕鱼王</a></li>
                  <li><a href="promotions.html">优惠活动</a></li>
                  <li><a href="about.html">关于我们</a></li>
                  <li class="phone_only"><a id="login" href="#">登入</a></li>
                  <li class="phone_only"><a href="regist.html">注册</a></li>
              </ul>`;                  
var el_footer = `<div class="footer_container">
                  <div class="footer_top clearfix">
                    <div class="partner">
                      <p class="title">合作伙伴</p>
                      <div class="img">
                        <div class="img_partner"></div>
                      </div>
                    </div>
                    <div class="certification">
                      <p class="title">监管机构</p>
                      <div class="img">
                        <div class="img_certification"></div>
                      </div>
                    </div>
                    <div class="browser">
                      <p class="title">推荐浏览器</p>
                      <div class="img">
                        <div class="img_browser"></div>
                      </div>
                    </div> 
                  </div>    
                  <div class="footer_bottom clearfix">
                    <ul>
                      <li><a href="#">关于我们</a></li>
                      <li><a href="#">博彩责任</a></li>
                      <li><a href="#">规定条款</a></li>
                      <li><a href="#">责任条款</a></li>
                      <li><a href="#">隐私政策</a></li>
                      <li><a href="#">常见问题</a></li>
                      <li><a href="#">联系我们</a></li>
                    </ul>    
                  </div> 
                </div>`;

var el_marquee = `<div class="marquee_container">
                    <i class="fa fa-volume-up"></i>
                    <div class="marquee_content">
                      <span></span>  
                    </div>
                  </div>`;

var el_loginBox = `<div class="login-section">
                      <div class="login-wrapper"></div>
                      <div class="login-box">
                        <span class="login-close"></span>
                        <h3 class="login-title">126游戏网登录</h3>
                        <div class="login-content">
                          <form action="" class="login-form">
                            <div class="text-field">
                              <label for="account">请输入用户名</label>
                              <input type="text" class="account" name="account" id="account"/>
                              <span class="input-reset"></span>
                            </div>
                            <div class="text-field">
                              <label for="password">请输入密码</label>
                              <input type="text" class="password" name="password" id="password"/>
                              <span class="input-reset"></span>
                            </div>
                            <div class="forgot clearfix"><a href="forgetpw.html">忘记密码?</a></div>
                            <div class="errors"></div>
                            <div class="btn btn-fill btn-submit">登入</div>  
                          </form>
                        </div>
                      </div>
                    </div>`;

var el_popup =`<div class="popup-section">
                  <div class="popup-wrapper"></div>
                  <div class="popup-box">
                    <div class="popup-content">
                      <div class="popup-title">登录失败</div>
                      <div class="popup-text">
                      </div>
                      <div class="btn btn-fill btn-pop"></div>  
                    </div>
                  </div>
                </div>`;

var el_validationMail = `<div class="validation-section open">
                          <div class="validation-wrapper"></div>
                          <div class="validation-box">
                            <span class="validation-close"></span>
                            <h3 class="validation-title">郵箱驗證</h3>
                            <div class="validation-content">
                              <form action="" class="validation-form">
                                <div class="text-field">
                                  <label for="email">郵箱</label>
                                  <input type="text" class="account" name="email" id="email"/>
                                  <span class="input-reset"></span>
                                </div>
                                <div class="text-field">
                                  <label for="validcode">郵箱驗證碼</label>
                                  <input type="text" class="password" name="validcode" id="validcode"/>
                                  <span class="input-reset"></span>            
                                </div>
                                <div class="btn btn-fill btn-check">取得郵箱驗證碼</div>  
                                <div class="errors"></div>
                                <div class="btn btn-fill btn-submit">驗證郵箱</div>  
                              </form>
                            </div>
                          </div>
                        </div>`;