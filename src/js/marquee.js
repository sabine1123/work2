var marquee = {
  container: null,
  containerOffset: null,
  containerWidth: null,
  content: null,
  contentWidth: null,
  speed: null,
  n: 0,
  timer: null,
  status: 0,
  init: function(containerID,contentID,speed,content){
    var that = this;
    if(arguments.length < 1)
      throw "missing arguments";
    if($(containerID).length < 0 )
      throw "container selector is wrong";
    if($(contentID).length < 0 )
      throw "content selector is wrong";
    if(content.length < 0 )
      throw "content is empty";
    this.container = $(containerID);    
    this.content = $(contentID);    
    this.speed = speed || 1;
    this.content.text(content);
    
    this.containerOffset = this.container.offset().left;
    this.containerWidth = this.container.innerWidth();
    this.contentWidth = this.content.outerWidth();
    
    //將跑馬燈內容偏移至顯示區右側
    this.content.css("left",this.containerWidth + "px");
    
    //滑鼠移入暫停/移出繼續
    this.container.on("mouseenter",function(){
      that.stop();
    });
    this.container.on("mouseleave",function(){
      if(!that.status)
        that.play();      
    });
    //點擊暫停，再點擊恢復
    this.container.on("click",function(){
      if(!that.status)
        that.play();
      else
        that.stop();
    });
    return this;
  },
  play: function(){
    //每次Play時都重置
    clearInterval(this.timer);
    
    var that = this;
    that.status = 1;
    // console.log(this.status);
    //--------------
    that.timer = setInterval(function(){
      var contentOffset = that.content.offset().left;
      var containerOffset = that.containerOffset = that.container.offset().left;
      var containerWidth = that.containerWidth = that.container.innerWidth();
      that.n -= that.speed;
      that.content.css("transform","translateX(" + that.n + "px)");
      if(that.contentWidth + contentOffset < containerOffset){
        that.content.css("left",that.containerWidth + 10 + "px");
        that.content.css("transform","");
        that.n = 0;
      }   
    },10);
  },
  stop: function(){
    this.status = 0;
    // console.log(this.status);
    clearInterval(this.timer);
  }
}