/**
 * Created by Administrator on 2016/8/19.
 */
$(function () {
  if($(window).width()<=1025&&$(window).height()<=660){
    $(".title_main").css("padding-top","0");
    $(".title_main").css("margin-top","-60px");
    $(".title_main").css("transform","scale(0.6)");
  }
  var title = {
    unlock:false,
    health:false,
    gameOver:false,
    startTime:"20",
    access_token:"",
    trainId:"123456",
    missNum:0,
    taskId:"1",
    startLevel:1,
    avgCorrectTime:0,   //正确答题平均时长
    time:300,
    reactTime:0,
    answer:[],
    specs:{},
    isCorrect:"",
    rightNumber:0,          //正确题数
    totalNumber:0,         //总题数
    meanFyTime:0,       //平均答题时间
    rightDate:0,       //正确率
    todayPoints:0,      //今日得分
    yesterdayPoints:0,      //昨日得分
    totalTimes:0,       //总时间
    L:0,
    flag:true,
    matters:[],
    h1_size:parseInt($(".h1").css("font-size")),
    lianxuRightNumber:0,
    lianxuErrorNumber:0,
    time1:0,
    trueOfFalse:"",
    flag1:true,
    totalPoints:0,
    level:1 ,
    bestLevel:3,
    fyTime:20,
    titleTimes:[],
    errorTitle:{
      random1:0,
      random2:0,
      array1:[],
      array2:[],
      array3:[]
    },
    titles:
    {
      pic1_class:"",
      pic2_class:"",
      pic3_class:"",
      pic4_class:"",
      pic5_class:"",
      pic6_class:"",
      pic7_class:"",
      pic8_class:"",
      pic1:"",
      pic2:"",
      pic3:"",
      pic4:"",
      pic5:"",
      pic6:"",
      pic7:"",
      pic8:"",
      data:""
    }
  };

  api.loginFunction(title,function(){});
  $("#jindutiao,#jindutiao_div").css("width",$("#h1_div").text().length*title.h1_size);
  var timerr;
  var title1_number = 0;
  var fytime=0;
  var timerJd;
  var random1=0;
  var random2=0;
  var m=0;
  var a_p=[];
  var a_a=[];
  var a_d=[];
  var a_t=[];
  var a_v=[];
  var array1=[];
  var array2=[];
  var array3=[];
  var picObj={
    src:"",
    data:""
  };
  var flag=true;
  var first=0;

  //初始化界面；
  $("#goFight").click(function(){
    $("audio").each(function(){
      $(this)[0].play();
      $(this)[0].pause();
    });
    $.getJSON("json/title22.json", function (json) {
      json.sort(randomsort);
      zhenglisucai(json,"plant",a_p);
      zhenglisucai(json,"animal",a_a);
      zhenglisucai(json,"dress",a_d);
      zhenglisucai(json,"tool",a_t);
      zhenglisucai(json,"vehicle",a_v);
      suijiqusucai();
      rechargeSite();
      $("#yindaoLv1,#goFight").hide();
      $("#title3_footer,#totalPointsDiv,#levelDiv").show();
    });
    timeFunction(title.time,"title1Time",function(){
      title.gameOver=true;
    });
  });

  //整理素材
  function zhenglisucai(json,Class,array){
    m=0;
    while (m<json.length){
      if(json[m].category==Class){
        array.push(json[m].imageName+Class);
      }
      m++;
      if(m==json.length){
        //console.log(array.length);
        break;
      }
    }
  }

  function xianzhiqucailiao(ary,num){
    while (m<99999){
      m++;
      var count1=[];
      var count2=[];
      count1.push(ary[0].split("g")[1]);
      for(var i=1;i<num;i++){
        if(ary[i].split("g")[1]==ary[0].split("g")[1]){
          count1.push(ary[i].split("g")[1])
        }else {
          count2.push(ary[i].split("g")[1])
        }
      }
      if(count1.length==4){
        ary.sort(randomsort);
      }else {
        return ary;
      }
    }
  }

  function addFunction(title,array1,array2){
    if(title.level==1){
      array3=array1.concat(array2);
      array3.sort(randomsort);
      xianzhiqucailiao(array3,4);
      title.titles.pic1=array3[0].split("g")[0]+"g";
      title.titles.pic1_class=array3[0].split("g")[1];
      title.titles.pic2=array3[1].split("g")[0]+"g";
      title.titles.pic2_class=array3[1].split("g")[1];
      title.titles.pic3=array3[2].split("g")[0]+"g";
      title.titles.pic3_class=array3[2].split("g")[1];
      title.titles.pic4=array3[3].split("g")[0]+"g";
      title.titles.pic4_class=array3[3].split("g")[1];
    }else if(title.level==2){
      array3=array1.concat(array2);
      array3.sort(randomsort);
      xianzhiqucailiao(array3,6);
      title.titles.pic1=array3[0].split("g")[0]+"g";
      title.titles.pic1_class=array3[0].split("g")[1];
      title.titles.pic2=array3[1].split("g")[0]+"g";
      title.titles.pic2_class=array3[1].split("g")[1];
      title.titles.pic3=array3[2].split("g")[0]+"g";
      title.titles.pic3_class=array3[2].split("g")[1];
      title.titles.pic4=array3[3].split("g")[0]+"g";
      title.titles.pic4_class=array3[3].split("g")[1];
      title.titles.pic5=array3[4].split("g")[0]+"g";
      title.titles.pic5_class=array3[4].split("g")[1];
      title.titles.pic6=array3[5].split("g")[0]+"g";
      title.titles.pic6_class=array3[5].split("g")[1];
    }else {
      array3=array1.concat(array2);
      array3.sort(randomsort);
      xianzhiqucailiao(array3,8);
      title.titles.pic1=array3[0].split("g")[0]+"g";
      title.titles.pic1_class=array3[0].split("g")[1];
      title.titles.pic2=array3[1].split("g")[0]+"g";
      title.titles.pic2_class=array3[1].split("g")[1];
      title.titles.pic3=array3[2].split("g")[0]+"g";
      title.titles.pic3_class=array3[2].split("g")[1];
      title.titles.pic4=array3[3].split("g")[0]+"g";
      title.titles.pic4_class=array3[3].split("g")[1];
      title.titles.pic5=array3[4].split("g")[0]+"g";
      title.titles.pic5_class=array3[4].split("g")[1];
      title.titles.pic6=array3[5].split("g")[0]+"g";
      title.titles.pic6_class=array3[5].split("g")[1];
      title.titles.pic7=array3[6].split("g")[0]+"g";
      title.titles.pic7_class=array3[6].split("g")[1];
      title.titles.pic8=array3[7].split("g")[0]+"g";
      title.titles.pic8_class=array3[7].split("g")[1];
    }
  }

  function randomFunction(){
    random2=Math.floor(Math.random()*100);
    //1-2 1-3 1-4 1-5 2-3 2-4 2-5 3-4 3-5 4-5
    if(random2<=10){
      addFunction(title,a_p,a_d);
    }else if(random2<=20&&random2>10){
      addFunction(title,a_p,a_t);
    }else if(random2<=30&&random2>20){
      addFunction(title,a_p,a_v);
    }else if(random2<=40&&random2>30){
      addFunction(title,a_a,a_d);
    }else if(random2<=50&&random2>40){
      addFunction(title,a_a,a_t);
    }else if(random2<=60&&random2>50){
      addFunction(title,a_a,a_v);
    }else if(random2<=70&&random2>60){
      addFunction(title,a_d,a_t);
    }else if(random2<=80&&random2>70){
      addFunction(title,a_d,a_v);
    }else if(random2<=90&&random2>80){
      addFunction(title,a_t,a_v);
    }else{
      addFunction(title,a_p,a_a);
    }
  }

  function daluanAarry(){
    a_p.sort(randomsort);
    a_d.sort(randomsort);
    a_a.sort(randomsort);
    a_t.sort(randomsort);
    a_v.sort(randomsort);
  }

  //随机取素材
  function suijiqusucai(){
    daluanAarry();
    randomFunction();
  }
  //点击填放图片
  $(".classBox").click(function(){
    if(picObj.src!=""){
      $(this).append("<img src="+picObj.src+" data="+picObj.data+">");
      if($(this).find("p").attr("data")==""&&$(this).siblings(".Class p").attr("data")!=picObj.data){
        $(this).find("p").attr("data",picObj.data);
      }
    }
    $(".main_left>img").each(function(){
      if($(this).attr("src")==picObj.src){
        $(this).remove();
      }
    });
    picObj.src="";
    picObj.data="";
    if($(".main_left>img").length<=0){
      $("#submitBtn").addClass("button");
      $("#nextZhezhao").hide();
      $("#submitBtn").removeAttr("disabled");
    }
  });

  var a="";
  var b="";
  var c=0;

  //点击提交按钮时
  $("#submitBtn").click(function(){
    clearInterval(timerJd);
    $(".classBox>img").each(function(){
      c++;
      if(c==1){
        a=$(this).attr("data");
      }else{
        b=$(this).attr("data");
        if(b==a){
          b=""
        }
      }
      if($(this).attr("data")==a){
        $(this).css("border","3px solid green");
        $(this).css("border-bottom","6px solid green");
      }else {
        $(this).css("border","3px solid #fe4e4e");
        $(this).css("border-bottom","6px solid #fe4e4e");
      }

      if($(this).attr("data")!=$(this).siblings("p").attr("data")){
        flag=false;
      }
    });

    $("#submitBtn,#nextZhezhao").hide();
    $("#redo_pic").show();
    if(flag==true){
      if(title.flag==true){
        title.L=1;
        tongze4Self(title,1,title.level);
        title.reactTime=title.fyTime-fytime;
      }
      $("#right_audio").attr("src","audio/right.mp3");
      $("#right_audio")[0].play();
      $("#right_pic").show();
      $("#error_pic").hide();
    }else {
      if(title.flag==true){
        title.L=2;
        tongze4Self(title,2);
        title.reactTime=title.fyTime-fytime;
      }
      $("#error_audio").attr("src","audio/wrong.mp3");
      $("#error_audio")[0].play();
      $("#right_pic").hide();
      $("#error_pic").show();
    }
  });

  //重做按钮
  $("#redo").click(function () {
    rechargeSite();
    tongze4Self(title,3);
  });

  var bb="";
  //下一题按钮
  $("#next").click(function () {
    title.answer.push(bb);
    HSfunction(title);
    api.savaQuestionFunction(title);
    if(title.L==2){
      errorFunction(title)
    }
    countFunction(title,fytime);
    $("#totalPoints").html(title.totalPoints);
    // 连续正确数目等于3说明升级了，连续正确的数目要清零。错误数也一样
    if (title.level < title.bestLevel) {
      if(title.lianxuRightNumber >= 3) {
        title.lianxuRightNumber=0;
      }
      if(title.lianxuErrorNumber >= 3){
        title.lianxuRightNumber=0;
      }
    } else {
      if (title.lianxuRightNumber == 3){
        title.health=true;
      } else if (title.lianxuRightNumber == 2){
        title.unlock = true;
      }
    }

    if(title.gameOver==true){
      $("#game_over").show();
      $("#todayPoints").html(title.todayPoints);
      $("#yesterdayPoints").html(title.yesterdayPoints);
      $("#meanFyTime").html(title.meanFyTime);
      $("#rightTotal").html(title.rightNumber+"/"+title.totalNumber);
      $("#rightDate").html(title.rightDate);
      $(".classBox").hidden();
      api.savaTaskFuction(title);
    }else{
      $.getJSON("json/title22.json", function (json) {
        json.sort(randomsort);
        suijiqusucai();
        rechargeSite();
      });
    }
  });

  function errorFunction(title){
    title.errorTitle.random1=random1;
    title.errorTitle.random2=random2;
    if(title.level==1){
      title.errorTitle.array1=array1;
    }else if(title.level==2){
      title.errorTitle.array2=array2;
    }else {
      title.errorTitle.array3=array3;
    }
  }

  //重置页面
  function rechargeSite(){
    $(".classBox>img").each(function(){
      $(this).css("border","3px solid #78839b");
      $(this).css("border-bottom","6px solid #78839b");
    });
    $("#now_level").html(title.level);
    $("#jindutiao,#jindutiao_div").css("width",$("#h1_div").text().length*title.h1_size);
    $(".classBox p").attr("data","");
    $(".classBox>img,.main_left>img").remove();
    $("#submitBtn").removeClass("button");
    $("#submitBtn").attr("disabled","disabled");
    $("#submitBtn,#nextZhezhao").show();
    $("#error_pic,#right_pic,#redo_pic").hide();
    if(title.level==1){
      suijipaibu(title);
      $(".main_left").append("<img  data1=' ' src="+"images/"+array1[0].split("g")[0]+"g"+" data="+array1[0].split("g")[1]+">");
      $(".main_left").append("<img  data1=' ' src="+"images/"+array1[1].split("g")[0]+"g"+" data="+array1[1].split("g")[1]+">");
      $(".main_left").append("<img  data1=' ' src="+"images/"+array1[2].split("g")[0]+"g"+" data="+array1[2].split("g")[1]+">");
      $(".main_left").append("<img  data1=' ' src="+"images/"+array1[3].split("g")[0]+"g"+" data="+array1[3].split("g")[1]+">");
    }else if(title.level==2){
      suijipaibu(title);
      $(".main_left").append("<img  data1=' ' src="+"images/"+array2[0].split("g")[0]+"g"+" data="+array2[0].split("g")[1]+">");
      $(".main_left").append("<img  data1=' ' src="+"images/"+array2[1].split("g")[0]+"g"+" data="+array2[1].split("g")[1]+">");
      $(".main_left").append("<img  data1=' ' src="+"images/"+array2[2].split("g")[0]+"g"+" data="+array2[2].split("g")[1]+">");
      $(".main_left").append("<img  data1=' ' src="+"images/"+array2[3].split("g")[0]+"g"+" data="+array2[3].split("g")[1]+">");
      $(".main_left").append("<img  data1=' ' src="+"images/"+array2[4].split("g")[0]+"g"+" data="+array2[4].split("g")[1]+">");
      $(".main_left").append("<img  data1=' ' src="+"images/"+array2[5].split("g")[0]+"g"+" data="+array2[5].split("g")[1]+">");
      $(".classBox").css("height","411px");
    }else if(title.level==3){
      suijipaibu(title);
      $(".main_left").append("<img  data1=' ' src="+"images/"+array3[0].split("g")[0]+"g"+" data="+array3[0].split("g")[1]+">");
      $(".main_left").append("<img  data1=' ' src="+"images/"+array3[1].split("g")[0]+"g"+" data="+array3[1].split("g")[1]+">");
      $(".main_left").append("<img  data1=' ' src="+"images/"+array3[2].split("g")[0]+"g"+" data="+array3[2].split("g")[1]+">");
      $(".main_left").append("<img  data1=' ' src="+"images/"+array3[3].split("g")[0]+"g"+" data="+array3[3].split("g")[1]+">");
      $(".main_left").append("<img  data1=' ' src="+"images/"+array3[4].split("g")[0]+"g"+" data="+array3[4].split("g")[1]+">");
      $(".main_left").append("<img  data1=' ' src="+"images/"+array3[5].split("g")[0]+"g"+" data="+array3[5].split("g")[1]+">");
      $(".main_left").append("<img  data1=' ' src="+"images/"+array3[6].split("g")[0]+"g"+" data="+array3[6].split("g")[1]+">");
      $(".main_left").append("<img  data1=' ' src="+"images/"+array3[7].split("g")[0]+"g"+" data="+array3[7].split("g")[1]+">");
      $(".classBox").css("height","548px");
    }
    title.flag=true;
    flag=true;
    c=0;
    title.errorTitle={
      random1:0,
      random2:0,
      array1:[],
      array2:[],
      array3:[]
    };
    if(title.level==1){
      title.fyTime=20;
    }else if(title.level==2){
      title.fyTime=30;
    }else{
      title.fyTime=40;
    }
    jindutiaoFunction(title.fyTime,title.h1_size,function amd(){
      $("#error_audio").attr("src","audio/wrong.mp3");
      $("#error_audio")[0].play();
      $("#error_pic").show();
      $("#right_pic").hide();
      $("#submitBtn,#nextZhezhao").hide();
      $("#redo_pic").show();
      if(title.flag==true){
        title.L=2;
        tongze4Self(title,2);
        if(title.level==1){
          title.reactTime=20;
        }else if(title.level==2){
          title.reactTime=30;
        }else{
          title.reactTime=40;
        }
      }
    });
    //点击图片选择
    $(".main_left>img").click(function(){
      $(this).attr("data1","1");
      picObj.src=$(this).attr("src");
      picObj.data=$(this).attr("data");
    });
  }

  // 随机排序函数
  function suijipaibu(title){
    random1=Math.floor(Math.random()*100);
    if(title.level==1){
      array1=[];
      array1.push(title.titles.pic1+title.titles.pic1_class);
      array1.push(title.titles.pic2+title.titles.pic2_class);
      array1.push(title.titles.pic3+title.titles.pic3_class);
      array1.push(title.titles.pic4+title.titles.pic4_class);
      array1.sort(randomsort);
    }else if(title.level==2){
      array2=[];
      array2.push(title.titles.pic1+title.titles.pic1_class);
      array2.push(title.titles.pic2+title.titles.pic2_class);
      array2.push(title.titles.pic3+title.titles.pic3_class);
      array2.push(title.titles.pic4+title.titles.pic4_class);
      array2.push(title.titles.pic5+title.titles.pic5_class);
      array2.push(title.titles.pic6+title.titles.pic6_class);
      array2.sort(randomsort);
    }else{
      array3=[];
      array3.push(title.titles.pic1+title.titles.pic1_class);
      array3.push(title.titles.pic2+title.titles.pic2_class);
      array3.push(title.titles.pic3+title.titles.pic3_class);
      array3.push(title.titles.pic4+title.titles.pic4_class);
      array3.push(title.titles.pic5+title.titles.pic5_class);
      array3.push(title.titles.pic6+title.titles.pic6_class);
      array3.push(title.titles.pic7+title.titles.pic7_class);
      array3.push(title.titles.pic8+title.titles.pic8_class);
      array3.sort(randomsort);
    }
  }

  //任务进度条
  function jindutiaoFunction(times,nums,aa){
    $("#jindutiao,#jindutiao_div").css("width",$("#h1_div").text().length*nums);
    var width=parseInt($("#jindutiao").css("width"));
    var widths=width/times;
    fytime=times;
    timerJd=setInterval(function(){
      if(times>0){
        times--;
      }
      width-=widths;
      $("#jindutiao").css("width",width);
      if(width<=0){
        clearInterval(timerJd);
        {
          aa()
        }
      }
      fytime=times;
    },1000);
  }
});

//通则4
function tongze4Self(title,tF,level){
  //tF 1:正确、2:错误、3:重做;MM:正确或者错误情况下重做
  if(tF==1){
    title.lianxuRightNumber++;
    title.lianxuErrorNumber=0;
    if(title.lianxuRightNumber>=3){
      if (title.level < title.bestLevel) {
        title.level ++;
        title.startLevel = title.level;
      }
      title.totalPoints+=15;
    }else {
      title.totalPoints+=10;
    }
    //辅助分
    title.totalPoints+=4;
    //级别分
    if(level>1){
      title.totalPoints+=(level-1)*10;
    }
  }else if(tF==2) {
    title.lianxuErrorNumber++;
    title.lianxuRightNumber=0;
    if (title.level > 1 && title.lianxuErrorNumber>=3) {
      title.level --;
      title.startLevel = title.level;
    }
  }else if(tF==3){
    title.flag=false;
  }
}