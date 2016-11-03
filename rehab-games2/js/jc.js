var config = {
  TRAINTASK_URL: 'http://192.168.10.124:8096/',
  KANGFU_URL:'http://192.168.10.124/'
};

function countFunction(title,fytime){
    title.answer=[];
    title.totalNumber++;
    title.reactTime=title.fyTime-fytime;
    if(title.L==1){
        title.avgCorrectTime+=title.reactTime;
        title.isCorrect="1";
        title.rightNumber++;
    }else {
        title.isCorrect="0";
        title.matters.push(JSON.stringify(title.errorTitle));
    }
    title.totalTimes+=title.reactTime;
    title.todayPoints=title.totalPoints;        //今日得分
    title.rightDate=Math.round((title.rightNumber/title.totalNumber)*100)+"%";    //正确率
    title.meanFyTime=(title.totalTimes/title.totalNumber).toFixed(2)+"S";       //平均答题时间
}

function preload(array,rechargeSite){
    var loader = new resLoader({
        resources : array,
        onStart : function(){},
        onProgress : function(current, total){},
        onComplete : function(){
            rechargeSite();
            $("#yindaoLv1,#goFight,#yindaoLv2").hide();
            $("#title3_footer,#totalPointsDiv,#levelDiv,.title1_footer").show();
        }
    });
    loader.start();
}
//播放并高亮显示
function playHighFunction(audioId,text1Id,text2Id,text11Id,text22Id){
    $(text1Id).css("border","blue 6px solid");
    $(text2Id).css("border","#bebfc1 6px solid");
    $(text11Id).css("color", "#ee9641");
    $(text22Id).css("color", "#ee9641");
    pauseNatherAudioFunction(audioId);
    setTimeout(function(){
        setTimeout(function(){
            $(text11Id).css("color", "#57585e");
            $(text22Id).css("color", "#fff");
            $(text1Id).css("border","#bebfc1 6px solid");
        },audioLength(audioId))
    },500);
}
//播放并暂停播放其他按钮函数
function pauseNatherAudioFunction(audioId){
    $(audioId)[0].play();
}
function browserRedirect() {

}
function audioLength(audioId){
        var num=0;
        var ab=$(audioId)[0].duration*1000;
        browserRedirect();
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
            num=ab+1200;
        } else {
            num=ab/2.2;
        }

        return num
}
function HSfunction(title){
    if(title.L==1){
        title.isCorrect="1";
        title.specs.help_score=4;
        if(title.lianxuwutishiNumber>=3){
            title.specs.award_score=5;
            title.specs.award_reason="连续正确次数>=3";
        }else {
            title.specs.award_score=0;
            title.specs.award_reason="连续正确次数<3";
        }
        title.score=title.specs.help_score+title.specs.award_score+10+(title.level-1)*10;
    } else {
        title.specs.award_score=0;
        title.specs.help_score=0;
        title.specs.award_reason="连续正确次数<3";
        title.isCorrect="0";
        title.score=0;
    }
}
function orient() {
    var ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
        if (window.orientation == 0 || window.orientation == 180) {
            $("body").attr("class", "portrait");
            orientation = 'portrait';
            $(".tishi").show();
            return false;
        }
        else if (window.orientation == 90 || window.orientation == -90) {
            $("body").attr("class", "landscape");
            orientation = 'landscape';
            $(".tishi").hide();
            return false;
        }
    } else if (/android/.test(ua)) {
        if (window.orientation == 0 || window.orientation == 180) {
            $("body").attr("class", "portrait");
            orientation = 'portrait';
            $(".tishi").show();
            return false;
        }
        else if (window.orientation == 90 || window.orientation == -90) {
            $("body").attr("class", "landscape");
            orientation = 'landscape';
            $(".tishi").hide();
            return false;
        }
    }
    //if (window.orientation == 0 || window.orientation == 180) {
    //    $("body").attr("class", "portrait");
    //    orientation = 'portrait';
    //    $(".tishi").show();
    //    return false;
    //}
    //else if (window.orientation == 90 || window.orientation == -90) {
    //    $("body").attr("class", "landscape");
    //    orientation = 'landscape';
    //    $(".tishi").hide();
    //    return false;
    //}
}
$(function(){
    orient();
});
$(window).bind( 'orientationchange', function(e){
    orient();
});
//任务时间函数
function timeFunction(times,divID,aa){
    var time=times;
    var time1;
    var time2;
    var timer;
    time1=time%60;
    if(time1<10){
        time1="0"+time1;
    }
    time2=Math.floor(time/60);
    if(time2<10){
        time2="0"+time2
    }
    var time11=parseInt(time1);
    var time22=parseInt(time2);
    timer=time2+":"+time1;
    document.getElementById(divID).innerHTML=timer;
    timerr=setInterval(function(){
        time11--;
        if(time11==-1&&time22>0){
            time11=59;
            time22--;
        }
        if(time11<10){
            time11="0"+time11;
        }
        timer="0"+time22+":"+time11;
        //console.log(timer);
        if(timer=="00:00"){
            clearInterval(timerr);
            {
                aa()
            }
        }
        document.getElementById(divID).innerHTML=timer
    },1000);
}
//打乱数组
function randomsort(a, b) {
    return Math.random()>.5 ? -1 : 1;
    //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
}
$(function () {
    if ($(window).width() <= 1025 && $(window).height() <= 658) {
        $(".game_over_main").css("width", "70%");
        $(".game_over_message div").css("line-height", "150px")
    }
});
//清楚音频播放
function pauseAudios(timerr1){
    clearTimeout(timerr1);
    $("audio").each(function(){
        $(this)[0].pause();
    })
}
//通则4
function tongze4(title,tF,level){
    //tF 1:正确、2:错误、3:重做;MM:正确或者错误情况下重做
    if(tF==1){
        title.lianxuwutishiNumber++;
        title.lianxuErrorNumber=0;
        if(title.lianxuwutishiNumber>=3){
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
        title.lianxuwutishiNumber=0;
    }else if(tF==3){
        title.flag=false;
    }
}

//通则7
function tongze7(title,tF,rightLines){
  //tF 1:正确、2:错误、3:重做;MM:正确或者错误情况下重做
  if(tF==1){
    title.lianxuRightNumber ++;
    title.lianxuErrorNumber = 0;
    title.rightNumber ++;
    // 单条线20分，辅助分4分
    title.totalPoints += rightLines*24;
    // 升级加分规则,保存当前级别
    if (title.lianxuRightNumber >= 3) {
      if (title.level < title.bestLevel) {
        title.totalPoints += (title.level+1)*20;
        title.level ++;
        title.startLevel = title.level;
      }
    }
  } else if (tF==2){
    title.lianxuErrorNumber++;
    title.lianxuRightNumber=0;
    title.totalPoints += rightLines*24;
    // 降级规则
    if (title.lianxuErrorNumber >= 3) {
      if (title.level > 1) {
        title.level --;
        title.startLevel = title.level;
      }
    }
  } else if (tF==3){
    title.flag=false;
  }
}
// 通则7的附加信息上传
function HSfunctionSeven(title,rightLines){
  if(title.L==1){
    title.isCorrect="1";
    title.specs.help_score=4*rightLines;
    if(title.lianxuRightNumber>=3){
      title.specs.award_score=title.level*20;
      title.specs.award_reason="连续正确次数>=3";
    } else {
      title.specs.award_score=0;
      title.specs.award_reason="连续正确次数<3";
    }
    title.score=title.specs.help_score+title.specs.award_score+rightLines*20;
  } else {
    title.specs.award_score=0;
    title.specs.help_score=0;
    title.specs.award_reason="连续正确次数<3";
    title.isCorrect="0";
    title.score=0;
  }
}

function getPara(paraName) {
  var surl = location.href;
  var reg = "(?:\\?|&){1}"+paraName+"=([^&]*)";
  var re = new RegExp(reg,'gi');
  re.exec(surl);
  return RegExp.$1;
}
// 任务结束时，点击返回或下一题的处理
$(".game_over_foot img:eq(0)").click(function(){
  var id = getPara("uid");
  var url = config.KANGFU_URL + 'case/train-task/'+id+'#';
  window.location.assign(url);
});

$(".game_over_foot a").hover(function(){
  $(this).attr("href","#")
});

$(".game_over_foot img:eq(1)").click(function(){
  var title = {
    8: 'title1',
    18: 'title2',
    9: 'title3',
    6: 'title6',
    4: 'title7',
    20: 'title4',
    19: 'title5',
    3: 'title8',
    13: 'title9',
    15: 'title10',
    16: 'title12',
    14: 'title11',
    2: 'title17',
    1: 'title18',
    25: 'title14',
    11: 'title20',
    10: 'title13',
    12: 'title19',
    17: 'title15',
    23: 'title16',
    21: 'title24',
    7: 'title22',
    5: 'title23',
    22: 'title21'
  };
  var train = getPara("trainId");
  var token = getPara("token");
  var nextId= getPara("nextId");
  var url = config.TRAINTASK_URL + title[nextId]+'/index.html?trainId='+ train +'&taskId=' + nextId + '&token=' + token;
  window.location.assign(url);
});

// 完成任务后的分数统计
function showScore(title){
  var avgTime = (title.avgCorrectTime/title.rightNumber).toFixed(2);
  alert(avgTime);
  if (isNaN(avgTime)){
    avgTime = '';
  }
  $("#game_over").show();
  $("#todayPoints").html(title.todayPoints);
  $("#yesterdayPoints").html(title.yesterdayPoints);
  $("#meanFyTime").html(avgTime);
  $("#rightTotal").html(title.rightNumber+"/"+title.totalNumber);
  $("#rightDate").html(title.rightDate);
}
