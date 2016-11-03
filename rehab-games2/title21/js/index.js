/**
 * Created by Administrator on 2016/8/19.
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
    time:"10",
    reactTime:0,
    answer:[],
    specs:{
      l1:0,
      l2:0,
      l3:0,
      l1_score:0,
      l2_score:0,
      l3_score:0
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
    h1_size:parseInt($(".h1").css("font-size")),
    flag:true,
    flag1:true,
    flag2:true,
    reactTime1:0,
    reactTime2:0,
    reactTime3:0,
    HSPoints:[],
    lianxuwutishiNumber:0,
    lianxuErrorNumber:0,
    totalPoints:0,
    level:1,
    L1:3,
    L2:3,
    L3:3,
    L1Array:[],
    L2Array:[],
    L3Array:[],
    matters:[],
    bestLevel:2,
    fyTime1:20,
    fyTime2:60,
    fyTime3:100,
    titleTimes:[],
    errorTitle:{
      title4_text1: "",
      title4_text1_audio1: "",
      title4_text1_audio2: "",
      title4_text2:"",
      title4_text2_audio1:"",
      title4_text2_audio2:""
    },
    titles:
    {
      title4_text1: "智",
      title4_text1_audio1: "p_0ut_Ass_20l1_60I1.wav",
      title4_text1_audio2: "p_0ut_Ass_20l1_60F1.wav",
      title4_text2: "祝",
      title4_text2_audio1: "p_0ut_Ass_20l1_60I2.wav",
      title4_text2_audio2: "p_0ut_Ass_20l1_60F2.wav",
      level:"1"
    }
  };
  var timerr;
  var title1_number = 0;
  var fytime=0;
  var timerJd;
  var numfy=0;
  var numbersRight=0;
  var numbersError=0;
  var numbers1=0;
  var numbers2=0;
  var timerr1;
  api.loginFunction(title,function(){});
  //初始化界面；
  $("#goFight").click(function(){
    $("audio").each(function(){
      $(this)[0].play();
      $(this)[0].pause();
    });
    if(title.level==1){
      $.getJSON("json/title4_1.json",function(json){
        json.sort(randomsort);
        if(title1_number==json.length){
          title1_number=0;
        }
        title.titles.title4_text1=json[title1_number].name1;
        title.titles.title4_text1_audio1="audio/"+json[title1_number].audio1Name;
        title.titles.title4_text1_audio2="audio/"+json[title1_number].audio2Name;
        title.titles.title4_text2=json[title1_number].name2;
        title.titles.title4_text2_audio1="audio/"+json[title1_number].audio3Name;
        title.titles.title4_text2_audio2="audio/"+json[title1_number].audio4Name;
        title.questionContent=JSON.stringify(json[title1_number]);
        rechargeSite();
        $("#yindaoLv1,#goFight,.zhezhao,.audioBtn_div").hide();
        $("#title3_footer,#totalPointsDiv,#levelDiv").show();
      });
    }
    else if(title.level>1){
      $("#content").html("词语");
      $.getJSON("json/title4_2.json",function(json){
        json.sort(randomsort);
        title.titles.title4_text1=json[title1_number].name1;
        title.titles.title4_text1_audio1="audio/"+json[title1_number].audio1Name;
        title.titles.title4_text1_audio2="audio/"+json[title1_number].audio2Name;
        title.titles.title4_text2=json[title1_number].name2;
        title.titles.title4_text2_audio1="audio/"+json[title1_number].audio3Name;
        title.titles.title4_text2_audio2="audio/"+json[title1_number].audio4Name;
        title.questionContent=JSON.stringify(json[title1_number]);
        rechargeSite();
        $("#yindaoLv1,#goFight,.zhezhao,.audioBtn_div").hide();
        $("#title3_footer,#totalPointsDiv,#levelDiv").show();
      });
    }
    setTimeout(function(){
      timeFunction(title.time,"title1Time",function(){
        title.gameOver=true;
      });
    },500);
  });
  //相对应按钮播放对应音频
  $("#text1_audioBtn").click(function(){
    pauseAudios();
    $("#text1_audio").attr("src",title.titles.title4_text1_audio1);
    timerr1=setTimeout(function(){
      playHighFunction("#text1_audio","#title4_text1,.pic_div1,#t1","#title4_text2,.pic_div2,#t2")
    },500)
  });
  $("#text2_audioBtn").click(function(){
    pauseAudios();
    $("#text2_audio").attr("src",title.titles.title4_text2_audio1);
    timerr1=setTimeout(function(){
      playHighFunction("#text2_audio","#title4_text2,.pic_div2,#t2","#title4_text1,.pic_div1,#t1")
    },500)
  });
  //相对应按钮播放对应音频
  $(".pic1,#text3_audioBtn").click(function(){
    numbers1++;
    if(numbers1<=2){
      pauseAudios();
      $("#text1_audio").attr("src",title.titles.title4_text1_audio2);
      timerr1=setTimeout(function(){
        playHighFunction("#text1_audio","#title4_text1,.pic_div1,#t1","#title4_text2,.pic_div2,#t2")
      },500)
    }
  });
  $(".pic2,#text4_audioBtn").click(function(){
    numbers2++;
    if(numbers2<=2){
      pauseAudios();
      $("#text2_audio").attr("src",title.titles.title4_text2_audio2);
      timerr1=setTimeout(function(){
        playHighFunction("#text2_audio","#title4_text2,.pic_div2,#t2","#title4_text1,.pic_div1,#t1")
      },500)
    }
  });
  //正确按钮;
  $("#right").click(function(){
    pauseAudios();
    clearInterval(timerJd);
    numbers1=0;
    numbers2=0;
    numfy++;
    $("#right_audio").attr("src","audio/right.mp3");
    pauseNatherAudioFunction("#right_audio");
    if($("#one_phase").css("display")=="block"){
      timerr1=setTimeout(function(){
        playHighFunction("#text1_audio",".pic_div1",".pic_div2");
        timerr1=setTimeout(function(){
          playHighFunction("#text2_audio",".pic_div2",".pic_div1")
        }, audioLength("#text1_audio"));
      },500);
      $("#one_phase").hide();
      $("#two_phase").show();
      $("#titleName").html("跟读三遍语音播放");
      //记录总分
      if(title.flag==true&&title.flag1==true){
        title.L1=1;
        title.totalPoints+=10;
        title.reactTime1=title.fyTime1-fytime;
      }
      numfy=0;
      jindutiaoFunction(title.fyTime2,title.h1_size,function amd(){
        $("#two_phase").attr("abc","abc");
        if(title.flag==true){
          title.L2=0;
          title.reactTime2=60
        }
        title.flag1=false;
        title.flag2=false;
        $("#text1_audio").attr("src",title.titles.title4_text1_audio2);
        $("#text2_audio").attr("src",title.titles.title4_text2_audio2);
        timerr1=setTimeout(function(){
          playHighFunction("#text1_audio","#l1","#l2");
          timerr1=setTimeout(function(){
            playHighFunction("#text2_audio","#l2","#l1");
          },audioLength("#text1_audio"))
        },500);
      });
      title.flag1=true;
    }else if($("#one_phase").css("display")=="none"&&$("#two_phase").css("display")=="block"){
      $("#two_phase").hide();
      $("#three_phase").show();
      $("#titleName").html("交替朗读三遍屏幕上");
      //alert($("#h1_div").text().length)
      $("#text1_audio").attr("src",title.titles.title4_text1_audio1);
      $("#text2_audio").attr("src",title.titles.title4_text2_audio1);
      if(title.flag==true&&title.flag1==true){
        title.L2=1;
        title.totalPoints+=30;
        title.reactTime2=title.fyTime2-fytime;
      }
      numfy=0;
      jindutiaoFunction(title.fyTime3,title.h1_size,function amd(){
        if(title.flag==true){
          title.L3=0;
          title.reactTime3=100;
        }
        title.flag1=false;
        title.flag2=false;
        timerr1=setTimeout(function(){
          playHighFunction("#text1_audio","#t1","#t2");
          timerr1=setTimeout(function(){
            playHighFunction("#text2_audio","#t2","#t1");
          },audioLength("#text1_audio"));
        },500);
      });
      title.flag1=true;
    } else if($("#two_phase").css("display")=="none"&&$("#three_phase").css("display")=="block"){
      $(".zh,.au").show();
      $("#rightErrorDiv").hide();
      $("#redoNestDiv").show();
      $("#two_phase").removeAttr("abc");
      if(title.flag==true&&title.flag1==true){
        title.L3=1;
        title.totalPoints+=50;
        title.reactTime3=title.fyTime3-fytime;
      }
    }
  });
  //错误按钮；
  $("#error").click(function(){
    title.flag2=false;
    title.flag1=false;
    pauseAudios();
    clearInterval(timerJd);
    numbers1=0;
    numbers2=0;
    $("#error_audio").attr("src","audio/wrong.mp3");
    pauseNatherAudioFunction("#error_audio");
    if(title.flag==true){
      title.L=2;
    }
    if($("#one_phase").css("display")=="block"){
      $(".zhezhao,.audioBtn_div").show();
      if(title.flag==true){
        title.L1=0;
      }
      timerr1=setTimeout(function(){
        playHighFunction("#text1_audio","#title4_text1","#title4_text2");
        timerr1=setTimeout(function(){
          playHighFunction("#text2_audio","#title4_text2","#title4_text1");
        },audioLength("#text1_audio"))
      },500);
    }else if($("#one_phase").css("display")=="none"&&$("#two_phase").css("display")=="block"){
      $("#two_phase").attr("abc","abc");
      if(title.flag==true){
          title.L2=0;
      }
      $("#text1_audio").attr("src",title.titles.title4_text1_audio2);
      timerr1=setTimeout(function(){
        playHighFunction("#text1_audio","#l1");
        timerr1=setTimeout(function(){
          timerr1=setTimeout(function(){
            $("#text2_audio").attr("src",title.titles.title4_text2_audio2);
            timerr1=setTimeout(function(){
              playHighFunction("#text2_audio","#l2");
            },500)
          },audioLength("#text1_audio"))
        },500);
      },500);
    } else if($("#two_phase").css("display")=="none"&&$("#three_phase").css("display")=="block"){
      $(".zh,.au").show();
      if(title.flag==true){
        title.L3=0;
      }
      $("#text1_audio").attr("src",title.titles.title4_text1_audio2);
      timerr1=setTimeout(function(){
        playHighFunction("#text1_audio","#t1");
        timerr1=setTimeout(function(){
          timerr1=setTimeout(function(){
            $("#text2_audio").attr("src",title.titles.title4_text2_audio2);
            timerr1=setTimeout(function(){
              playHighFunction("#text2_audio","#t2");
            },500)
          },audioLength("#text1_audio"))
        },500);
      },500);
    }
  });
  //重做按钮
  $("#redo").click(function () {
    title.L1Array[title1_number]=3;
    title.L2Array[title1_number]=3;
    title.L3Array[title1_number]=3;
    rechargeSite();
    title.flag=false;
  });
  function countFunction(title,fytime){
    title.totalNumber++;
    if(title.L==1){
      title.avgCorrectTime+=title.reactTime;
      title.isCorrect="1";
      title.rightNumber++;
    }else {
      title.isCorrect="0";
      errorFunction(title);
      title.matters.push(JSON.stringify(title.errorTitle));
    }
    if(fytime==0){
      title.reactTime=0;
    }else {
      title.reactTime+=title.reactTime1;
      title.reactTime+=title.reactTime2;
      title.reactTime+=title.reactTime3;
    }
    title.totalTimes+=title.reactTime;
    title.todayPoints=title.totalPoints;        //今日得分
    title.rightDate=Math.round((title.rightNumber/title.totalNumber)*100)+"%";    //正确率
    title.meanFyTime=(title.totalTimes/title.totalNumber).toFixed(2)*3+"S";       //平均答题时间
  }
  var b="";
  //下一题按钮
  $("#next").click(function () {
    if(title.flag2==true){
      title.L=1;
      b="T";
      title.isCorrect="1";
      title.lianxuwutishiNumber++;
      title.lianxuErrorNumber=0;
    }else {
      title.L=2;
      b="F";
      title.isCorrect="0";
      title.lianxuErrorNumber++;
      title.lianxuwutishiNumber=0;
    }
    title.answer.push(b);
    title.specs.l1=title.L1;
    title.specs.l2=title.L2;
    title.specs.l3=title.L3;
    if(title.L1==1){
      title.specs.l1_score=10;
    }else {
      title.specs.l1_score=0;
    }
    if(title.L2==1){
      title.specs.l2_score=30;
    }else {
      title.specs.l2_score=0;
    }
    if(title.L3==1){
      title.specs.l3_score=50;
    }else {
      title.specs.l3_score=0;
    }
    title.score=title.specs.l1_score+title.specs.l2_score+title.specs.l3_score;
    title.reactTime=title.reactTime1+title.reactTime2+title.reactTime3;

    api.savaQuestionFunction(title);
    title.answer=[];
    countFunction(title,fytime);
    $("#totalPoints").html(title.totalPoints);
    title.L1Array.push(title.L1);
    title.L2Array.push(title.L2);
    title.L3Array.push(title.L3);
    if(title.lianxuwutishiNumber==3&&title.level==1){
      title.level=2;
      title.lianxuwutishiNumber=0;
    }
    if(title.lianxuErrorNumber==6&&title.level==2){
      title.level=1;
      title.lianxuErrorNumber=0;
    }
    if(title.lianxuwutishiNumber==4&&title.level==2){
      //alert("达到解锁标准")
      title.unlock=true;
    }else if(title.lianxuwutishiNumber==6&&title.level==2){
      //alert("达到健康标准")
      title.health=true;
    }

    if(title.gameOver==true){
      pauseAudios();
      showScore(title);
      api.savaTaskFuction(title);
    }else{
      title1_number++;
      if(title.level==1){
        $.getJSON("json/title4_1.json",function(json){
          json.sort(randomsort);
          if(title1_number==json.length){
            title1_number=0;
          }
          title.titles.title4_text1=json[title1_number].name1;
          title.titles.title4_text1_audio1="audio/"+json[title1_number].audio1Name;
          title.titles.title4_text1_audio2="audio/"+json[title1_number].audio2Name;
          title.titles.title4_text2=json[title1_number].name2;
          title.titles.title4_text2_audio1="audio/"+json[title1_number].audio3Name;
          title.titles.title4_text2_audio2="audio/"+json[title1_number].audio4Name;
          title.questionContent=JSON.stringify(json[title1_number]);
          rechargeSite();
        });
      }
      else if(title.level>1){
        $("#content").html("词语");
        $.getJSON("json/title4_2.json",function(json){
          json.sort(randomsort);
          title.titles.title4_text1=json[title1_number].name1;
          title.titles.title4_text1_audio1="audio/"+json[title1_number].audio1Name;
          title.titles.title4_text1_audio2="audio/"+json[title1_number].audio2Name;
          title.titles.title4_text2=json[title1_number].name2;
          title.titles.title4_text2_audio1="audio/"+json[title1_number].audio3Name;
          title.titles.title4_text2_audio2="audio/"+json[title1_number].audio4Name;
          title.questionContent=JSON.stringify(json[title1_number]);
          rechargeSite();
        });
      }
    }
  });
  function errorFunction(title){
    title.errorTitle.title4_text1=title.titles.title4_text1;
    title.errorTitle.title4_text1_audio1=title.titles.title4_text1_audio1;
    title.errorTitle.title4_text1_audio2=title.titles.title4_text1_audio2;
    title.errorTitle.title4_text2=title.titles.title4_text2;
    title.errorTitle.title4_text2_audio1=title.titles.title4_text2_audio1;
    title.errorTitle.title4_text2_audio2=title.titles.title4_text2_audio2;
  }
  function pauseAudios(){
    clearTimeout(timerr1);
    $("audio").each(function(){
      $(this)[0].pause();
    })
  }
  //重置页面
  function rechargeSite(){
    $("#now_level").html(title.level);
    $(".zhezhao,.audioBtn_div,.zh,.au").hide();
    pauseAudios();
    $("#titleName").html("朗读一遍屏幕上");
    $("#one_phase,#rightErrorDiv").show();
    $("#two_phase,#redoNestDiv,#three_phase").hide();
    $(".text1").html(title.titles.title4_text1);
    $(".text2").html(title.titles.title4_text2);
    $("#text1_audio").attr("src",title.titles.title4_text1_audio1);
    $("#text2_audio").attr("src",title.titles.title4_text2_audio1);
    numbers1=0;
    numbers2=0;
    numbersRight=0;
    numbersError=0;
    title.flag=true;
    title.flag1=true;
    title.flag2=true;
    numfy=0;
    //title.L=0;
    title.errorTitle={
      title4_text1: "",
      title4_text1_audio1: "",
      title4_text1_audio2: "",
      title4_text2:"",
      title4_text2_audio1:"",
      title4_text2_audio2:""
    };
    clearInterval(timerJd);
    jindutiaoFunction(title.fyTime1,title.h1_size,function amd(){
      title.lianxuwutishiNumber=0;
      title.lianxuErrorNumber++;
      pauseAudios();
      clearInterval(timerJd);
      numbers1=0;
      numbers2=0;
      pauseNatherAudioFunction("#error_audio");
      if(title.flag==true){
        title.L=2;
        title.L1=0;
        title.reactTime1=20;
      }
      $(".zhezhao,.audioBtn_div").show();
      timerr1=setTimeout(function(){
        playHighFunction("#text1_audio","#title4_text1","#title4_text2");
        timerr1=setTimeout(function(){
          playHighFunction("#text2_audio","#title4_text2","#title4_text1");
        },audioLength("#text1_audio"))
      },500);
      title.flag1=false;
      title.flag2=false;
    });
  }
  //打乱数组
  function randomsort(a, b) {
    return Math.random()>.5 ? -1 : 1;
    //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
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