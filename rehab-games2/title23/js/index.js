/**
 * Created by zhouxin on 2016/10/19.
 */
$(function () {
  // 需要文件间传递的参数，都放在title对象中
  var title = {
    unlock:false,
    health:false,
    gameOver:false,
    startTime:"20",
    //以下三个参数用于传递用户信息
    access_token:"",
    trainId:"123456",
    taskId:"1",

    questionContent:{}, // 当前题目的训练内容
    missNum:0,
    startLevel:1,
    avgCorrectTime:0,   // 正确答题平均时长
    time:"300",         //
    reactTime:0,        // 用户反应时长
    answer:[],          // ??????有用保留
    specs:{
      help_score:"",
      award_score:"",
      award_reason:""
    },
    isCorrect:"",           //是否正确，返回正确或者错误
    rightNumber:0,          //全对的题目数
    totalNumber:0,          //训练的总题数
    meanFyTime:0,           //平均答题时间
    rightDate:0,            //正确率
    todayPoints:0,          //本次得分
    yesterdayPoints:0,      //上次得分
    totalTimes:0,           //总时间
    L:0,
    matters:[],
    flag:true,            // 是否计分。false表示当前题目是重做的，不计分
    h1_size:parseInt($(".h1").css("font-size")),
    lianxuRightNumber:0,  // 连续正确题目数
    lianxuErrorNumber:0,  // 连续错误题目数
    flag1:true,
    totalPoints:0,        // 历史以来的总分
    level:1,              // 当前等级
    bestLevel:3,          // 最高等级
    fyTime:20,            // 题目时长(S)
    titleTimes:[],
    errorTitle:{
      "file"  : [],
      "level" : "1"
    },
    titles:{           // 获取json数据，文字图片等
      "file"  : [],
      "level" : "1"
    },
    startAxes : [],    // 文字坐标
    endAxes   : [],    // 图片坐标
    axesNum   : -1     // 已存储的坐标数
  };

  var preTimer;        // 倒计时开启时间
  var leftTime=0;      // 进度条剩余时间
  var timerJd;         // 进度条时间
  var rightLines=0;    // 每题中的正确连线数

  //初始化界面；
  $("#jindutiao,#jindutiao_div").css("width",$("#h1_div").text().length*title.h1_size);
  $("#goFight").click(function(){
    $.getJSON("./json/title23.json", function (json) {
      json.sort(randomsort);
      getFiles(title.level,json);
      rechargeSite();

      $("#yindaoLv1,.goFightDiv").hide();
      $(".title1_main,#title3_footer,#totalPointsDiv,#levelDiv").show();
    });
    timeFunction(title.time,"title1Time",function(){
        title.gameOver=true;
    });
  });

  //重做按钮
  $("#redo").click(function () {
    rechargeSite();
    tongze7(title,3);
  });

  //下一题按钮
  $("#next").click(function () {
    title.reactTime=title.fyTime-leftTime;
    api.savaQuestionFunction(title);
    title.answer=[];
    // 连续正确数目大于3说明升级了，连续正确的数目要清零。错误数也一样
    if (title.level < title.bestLevel) {
      if(title.lianxuRightNumber >= 3){
        title.lianxuRightNumber=0;
      }
      if(title.lianxuErrorNumber >= 3){
        title.lianxuRightNumber=0;
      }
    }

    $("#now_level").html(title.level);
    // 计算当前阶段的得分情况
    countFunction(title,leftTime);
    // 判断训练是否结束
    if(title.gameOver){
      $("#game_over").show();
      $("#todayPoints").html(title.todayPoints);
      $("#yesterdayPoints").html(title.yesterdayPoints);
      $("#meanFyTime").html(title.meanFyTime);
      $("#rightTotal").html(title.rightNumber+"/"+title.totalNumber);
      $("#rightDate").html(title.rightDate);
      api.savaTaskFuction(title);
    } else {
      $.getJSON("json/title23.json", function (json) {
        json.sort(randomsort);
        getFiles(title.level,json);
        rechargeSite();
      });
    }
    console.log(title.totalNumber+"/"+title.rightNumber);
  });

  // 解冻'下一题'按钮
  function showNext(){
    $("#nextZhezhao").hide();
    $("#redo_pic,#text").show();
  }

  //重新生成页面
  function rechargeSite(){
    $("#jindutiao,#jindutiao_div").css("width",$("#h1_div").text().length*title.h1_size);

    // 清空页面中的原有内容
    $("#words").empty();
    $("#images").empty();
    $("svg").empty();
    $("#nextZhezhao").show();
    $(".right_div img,#redo_pic").hide();
    title.startAxes = [];
    title.endAxes   = [];
    title.axesNum   = -1;

    // 重新获取内容，随机显示
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

    // 开始计时
    preTimer=setTimeout(function(){
      preTimer=jindutiaoFunction(title.fyTime,title.h1_size,function amd(){
        showNext();
        if(title.flag==true){
          title.L=2;
          title.reactTime=title.fyTime-leftTime;
        }
      });
    },500);
    console.log("=========="+preTimer);
    title.flag=true;
    rightLines=0;
    title.fyTime=20;
    title.errorTitle={
      file:[],
      level:""
    };
  }

  //循环取材料的
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

  // 点击文字事件
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
    if ($("line").length == title.level+1){
      judgeResult();
    }
    console.log(title.startAxes);
  });

  // 判断连线是否正确
  function judgeResult(){
    var subNum = title.titles.file.length;
    var textNum = 0;
    var srcNum = 0;
    var text = "";
    var src  = "";
    // 根据坐标值来判断图文索引
    for (var i=0; i<$("line").length; i++) {
      if (title.level >1) {
        switch ($("#line" + i).attr("x1")) {
          case "112":
          case "214":
            textNum = 0;
            break;
          case "316":
          case "418":
            textNum = 1;
            break;
          case "520":
          case "622":
            textNum = 2;
            break;
          case "724":
            textNum = 3;
            break;
        }
        switch ($("#line" + i).attr("x2")) {
          case "112":
          case "214":
            srcNum = 0;
            break;
          case "316":
          case "418":
            srcNum = 1;
            break;
          case "520":
          case "622":
            srcNum = 2
            break;
          case "724":
            srcNum = 3;
            break;
        }
      } else {
        switch ($("#line" + i).attr("x1")) {
          case "316":
            textNum = 0;
            break;
          case "520":
            textNum = 1;
            break;
        }
        switch ($("#line" + i).attr("x2")) {
          case "316":
            srcNum = 0;
            break;
          case "520":
            srcNum = 1;
            break;
        }
      }
      // 根据索引值，在json数组中查找对应的值
      text = $("#word" + textNum).text();
      src  = $("#pic" + srcNum).attr("src");
      for (var j=0; j<subNum; j++) {
        if (title.titles.file[j].word == text) {
          if (src.indexOf(title.titles.file[j].pic) != -1) {
            $("#line"+i).attr("style","stroke:green;stroke-width:3");
            $("#word"+textNum+",#pic"+srcNum).removeClass("divBorder");
            $("#word"+textNum+",#pic"+srcNum).addClass("rightStyle");
            rightLines += 1;
            clearInterval(timerJd);
          } else {
            $("#line"+i).attr("style","stroke:red;stroke-width:3");
            $("#word"+textNum+",#pic"+srcNum).removeClass("divBorder");
            $("#word"+textNum+",#pic"+srcNum).addClass("errorStyle");
            clearInterval(timerJd);
          }
        }
      }
    }
    // 如果样式重置完毕，则添加按钮
    if (rightLines == subNum) {
      $("#right_pic").show();
      // 标识为真时计分，标识为假说明是重做的，不计分
      if (title.flag) {
        tongze7(title,1,rightLines);
      } else {
        tongze7(title,3);
      }
    } else {
      $("#error_pic").show();
      if(title.flag) {
        tongze7(title,2,rightLines);
      } else {
        tongze7(title,3);
      }
    }
    $("#totalPoints").html(title.totalPoints);
    showNext();

    console.log("项目标识："+title.flag);
  }

  // 获取点击图片的事件
  $("#images").on('click','.clickPic',function(){
    if ($("svg line").length == $("#images img").length){
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
    // 查找坐标是否存在
    for (var i=0; i<title.endAxes.length; i++) {
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
    leftTime=times;
    timerJd=setInterval(function(){
      if(times>0){
          times--;
      }
      width -= widths;
      $("#jindutiao").css("width",width);
      if(width<=0){
        clearInterval(timerJd);
        {
          aa()
        }
      }
      leftTime=times;
    },1000);
  }

});