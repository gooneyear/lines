/**
 * Created by zhouxin on 2016/10/19.
 */
$(function () {
  var title = {
    unlock:false,
    health:false,
    gameOver:false,
    //每一题数据
    startTime:"20",
    access_token:"",
    trainId:"123456",
    taskId:"1",
    questionContent:{},
    missNum:0,
    startLevel:1,
    avgCorrectTime:0,   //正确答题平均时长
    time:"300",
    reactTime:0,
    answer:[],
    specs:{
      help_score:"",
      award_score:"",
      award_reason:""
    },
    isCorrect:"",           //是否正确，返回正确或者错误
    rightNumber:0,          //正确题数
    totalNumber:0,         //总题数
    meanFyTime:0,       //平均答题时间
    rightDate:0,       //正确率
    todayPoints:0,      //今日得分
    yesterdayPoints:0,      //昨日得分
    totalTimes:0,       //总时间
    L:0,
    matters:[],
    flag:true,
    h1_size:parseInt($(".h1").css("font-size")),
    lianxuwutishiNumber:0,
    lianxuErrorNumber:0,
    flag1:true,
    totalPoints:0,
    level:2,
    bestLevel:4,
    fyTime:20,
    titleTimes:[],
    errorTitle:{
      "file"  : [],
      "level" : "1"
    },
    titles:
    {
      "file"  : [],
      "level" : "1"
    },
    
      // 获取点击事件
    startAxes : [],// 文字坐标
    endAxes   : [], // 图片坐标
    axesNum   : -1
  };
  var timerr1;
  var title1_number = 0;
  var fytime=0;
  var timerJd;
  var rightNum=0;
  var audioNum=0;
  var audioNum1=0;
  //初始化界面；
  $("#jindutiao,#jindutiao_div").css("width",$("#h1_div").text().length*title.h1_size);
  $("#goFight").click(function(){
    $.getJSON("./json/title23.json", function (json) {
      json.sort(randomsort);
      if(title1_number==json.length){
        title1_number=0;
      }
      if(title.level==1){
        getFiles("1",json);
      }else if(title.level==2){
        getFiles("2",json);
      }else if(title.level==3){
        getFiles("3",json);
      }
      rechargeSite();
      $("#yindaoLv1,.goFightDiv").hide();
      $(".title1_main,#title3_footer,#totalPointsDiv,#levelDiv").show();
    });
    timeFunction(title.time,"title1Time",function(){
        title.gameOver=true;
    });
  });

  function changeSite(){
    $("#yesBtn,#noBtn,#nextZhezhao").hide();
    $("#redo_pic,#text").show();
  }

  //重做按钮
  $("#redo").click(function () {
    rechargeSite();
    tongze7(title,1,title.level);
  });

  //下一题按钮
  $("#next").click(function () {
    title.reactTime=title.fyTime-fytime;
    HSfunction(title);
    $("#totalPoints").html(title.totalPoints);
    api.savaQuestionFunction(title);
    title.answer=[];
    if(title.lianxuwutishiNumber==10&&title.level==1){
      title.level=2;
      title.lianxuwutishiNumber=0;
    }else if(title.lianxuwutishiNumber==10&&title.level==2){
      title.level=3;
      title.lianxuwutishiNumber=0;
    }

  if(title.lianxuErrorNumber==10&&title.level==3){
    title.level=2;
    title.lianxuErrorNumber=0;
  }else if(title.lianxuErrorNumber==10&&title.level==2){
    title.level=1;
    title.lianxuErrorNumber=0;
  }
  if(title.L==2){
    errorFunction(title);
  }
  countFunction(title,fytime);
  $("#now_level").html(title.level);

  if(title.lianxuwutishiNumber==6&&title.level==4){
    //alert("达到解锁标准")
    title.unlock=true;
  }else if(title.lianxuwutishiNumber==10&&title.level==4){
    //alert("达到健康标准")
    title.health=true;
  }
    if(title.gameOver==true){
      $("#game_over").show();
      $("#todayPoints").html(title.todayPoints);
      $("#yesterdayPoints").html(title.yesterdayPoints);
      $("#meanFyTime").html(title.meanFyTime);
      $("#rightTotal").html(title.rightNumber+"/"+title.totalNumber);
      $("#rightDate").html(title.rightDate);
      api.savaTaskFuction(title);
    }else {
      title1_number++;
      $.getJSON("json/title23.json", function (json) {
        json.sort(randomsort);
        if(title1_number==json.length){
          title1_number=0;
        }
        if(title.level==1){
          getFiles("1",json);
        }else if(title.level==2){
          getFiles("2",json);
        }else if(title.level==3){
          getFiles("3",json);
        }
        rechargeSite();
      });
    }
  });

  function errorFunction(title){
    title.errorTitle.name=title.titles.name;
    title.errorTitle.pic=title.titles.pic;
    title.errorTitle.level=title.titles.level;
  }
  //重置页面
  function rechargeSite(){
    $("#now_level").html(title.level);
    $("#jindutiao,#jindutiao_div").css("width",$("#h1_div").text().length*title.h1_size);
    $("#words").empty();
    $("#images").empty();
    $("svg").empty();
    $(".right_div img").hide();
    title.startAxes = [];
    title.endAxes = [];
    title.axesNum = -1;
    console.log(title.startAxes);
    title.titles.file.sort(randomsort);
    var arrW = [];
    var arrP = [];
    for(var i=0; i<title.titles.file.length; i++){
      arrW.push(title.titles.file[i].word);
      arrP.push(title.titles.file[i].pic);
    }
    arrW.sort(randomsort);
    arrP.sort(randomsort);

    for(var j=0; j<arrW.length; j++){
      $("#words").append("<a href='#'><span class='clickWord' id='word"+j+"'>" + arrW[j] + "</span></a>");
      $("#images").append("<a href='#'><img class='clickPic' id='pic"+j+"' src='./images/" + arrP[j] + "' /></a>");
    }
    $("#words span").addClass('fileStyle');
    $("#images img").addClass('fileStyle');

    timerr1=setTimeout(function(){
      timerr1=jindutiaoFunction(title.fyTime,title.h1_size,function amd(){
        changeSite();
        $("#error_audio").attr("src","audio/wrong.mp3");
        if(title.flag==true){
          tongze7(title,1,title.level);
          title.L=2;
          title.reactTime=title.fyTime-fytime;
        }
      });
    },500);
    title.flag=true;
    rightNum=0;
    title.fyTime=10;
    audioNum=0;
    audioNum1=0;
    title.errorTitle={
      file:[],
      level:""
    };
  }

  //循环取材料
  function getFiles(a,json){
    var m=0;
    title.titles.file = [];
    while (m<json.length){
      if (json[m].level == a) {
        for (var i = 0; i < json[m].groups.length; i++) {
          var arr = {
            "word": json[m].groups[i].name,
            "pic": json[m].groups[i].image1Name
          };
          title.titles.file.push(arr);
        }
        title.titles.level = json[m].level;
        title.questionContent=JSON.stringify(title.titles);
        break;
      }
      m++;
    }
  }


  $("#words").on('click','.clickWord',function(){
    if ($("svg line").length == $("#images img").length) {
      return true;
    }
    // 获取当前选中文字的坐标
    var $id    = $(this).attr("id");
    var index  = $id.replace(/[^0-9]/ig,"");
    var margin = $("#words").outerWidth()-($(".clickWord").outerWidth()+20)*(title.level+1);
    var x1val  = $(".clickWord").outerWidth()*(1/2+parseInt(index)) + margin/2 + 10*(parseInt(index)*2+1);
    var axes = {
      "x1": x1val,
      "y1": 0,
      "index": index
    };
    $('#' + $id).addClass('divBorder');
    
    var idFlag = 0;
    var axesNum = 0;
    // 点击的时候直接在数组中查找是否存在，无需判断是否为空
    for (var i=0; i<title.startAxes.length; i++){
      if (title.startAxes[i].index == index) {
        idFlag = 1;
        break;
      }
    }
    // 如果坐标已存在，则不让点击
    if (idFlag != 0) {
      return true;
    } else {
      // 如果坐标不存在,直接插入
      if (title.startAxes.length > title.endAxes.length){
        $("#word"+title.startAxes[title.startAxes.length-1].index).removeClass('divBorder');
        title.startAxes.pop();        
        title.startAxes.push(axes);
      } else {
        title.startAxes.push(axes);
      }

      if (title.startAxes.length == title.endAxes.length) {
        title.axesNum += 1;
      }      
    }
    // 如果坐标非空，且两边坐标数相等，则连线
    var svg = document.getElementById("svgArea");
    if (title.startAxes.length != 0 && title.startAxes.length == title.endAxes.length) {
      svg.innerHTML += "<line x1='" + title.startAxes[title.axesNum].x1 + "' y1='" + title.startAxes[title.axesNum].y1 + "' x2='" + title.endAxes[title.axesNum].x2 + "' y2='" + title.endAxes[title.axesNum].y2 + "' id='line"+title.axesNum+"' style='stroke:black;stroke-width:2'/>";
    }
    if ($("line").length == title.level+1) {
      judgeResult();
    }
    console.log($("svg").html());
    
  });

  // 判断连线是否正确
  function judgeResult(){
    var rightNum = 0;
    var subNum = title.titles.file.length;
    var textNum = 0;
    var srcNum = 0;
    var text = "";
    var src  = "";
    // 根据坐标值来判断图文索引
    for (var i=0; i<$("line").length; i++) {
      switch ($("#line"+i).attr("x1")) {
        case "214":
          textNum = 0;
          break;
        case "418":
          textNum = 1;
          break;
        case "622":
          textNum = 2;
          break;
      }
      text = $("#word"+textNum).text();
      switch ($("#line"+i).attr("x2")) {
        case "214":
          srcNum = 0;
          break;
        case "418":
          srcNum = 1;
          break;
        case "622":
          srcNum = 2
          break;
      }
      // 根据索引值，在json数组中查找对应的值
      src = $("#pic"+srcNum).attr("src");
      for (var j=0; j<subNum; j++){
        if (title.titles.file[j].word == text) {
          if (src.indexOf(title.titles.file[j].pic) != -1) {
            $("#line"+i).attr("style","stroke:green;stroke-width:3");
            $("#word"+textNum+",#pic"+textNum).removeClass("divBorder");
            $("#word"+textNum+",#pic"+textNum).addClass("rightStyle");
            rightNum += 1;
          }else{
            $("#line"+i).attr("style","stroke:red;stroke-width:3");
            $("#word"+textNum+",#pic"+textNum).removeClass("divBorder");
            $("#word"+textNum+",#pic"+textNum).addClass("errorStyle");
          }
        }
      }
    }
    // 如果样式重置完毕，则添加按钮
    if (rightNum == subNum) {
      $("#right_pic").show();
    } else {
      $("#error_pic").show();
    }

  }

  // 获取点击图片的事件
  $("#images").on('click','.clickPic',function(){
    if ($("svg line").length == $("#images img").length) {
      return true;
    }
    // 获取当前选中图片的坐标
    var $id = $(this).attr("id");
    var index = $id.replace(/[^0-9]/ig,"");
    var margin = $("#images").outerWidth()-($(".clickPic").outerWidth()+20)*(title.level+1);
    var x2val  = $(".clickPic").outerWidth()*(1/2+parseInt(index)) + margin/2 + 10*(parseInt(index)*2+1);
    var axes = {
      "x2": x2val,
      "y2": 100,
      "index": index
    };
    $('#' + $id).addClass('divBorder');
    
    var idFlag = 0;
    var axesNum = 0;
    // 查找坐标是否存在
    for (var i=0; i<title.endAxes.length; i++){
      if (title.endAxes[i].index == index) {
        idFlag = 1;
        break;
      }
    }
    // 如果坐标已存在
    if (idFlag != 0) {
      return true;
    } else {
      // 如果坐标不存在直接插入
      if (title.endAxes.length > title.startAxes.length){
        $("#pic"+title.endAxes[title.endAxes.length-1].index).removeClass('divBorder');
        title.endAxes.pop();
        title.endAxes.push(axes);
      } else {
        title.endAxes.push(axes);
      }
      if (title.startAxes.length == title.endAxes.length) {
        title.axesNum += 1;
      }
    }

    var svg = document.getElementById("svgArea");
    if (title.endAxes.length != 0 && title.startAxes.length == title.endAxes.length) {
      svg.innerHTML += "<line x1='" + title.startAxes[title.axesNum].x1 + "' y1='" + title.startAxes[title.axesNum].y1 + "' x2='" + title.endAxes[title.axesNum].x2 + "' y2='" + title.endAxes[title.axesNum].y2 + "' id='line"+title.axesNum+"' style='stroke:black;stroke-width:2'/>";
    }
    if ($("line").length == title.level+1) {
      judgeResult();
    }    
  });


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