function countFunction(title,fytime){
  title.answer=[];
  title.totalNumber++;
  if(title.L==1){
    if(title.reactTime==title.fyTime) {
      title.reactTime=0;
    }
    title.avgCorrectTime+=title.reactTime;
    title.isCorrect="1";
    title.rightNumber++;
  } else {
    title.isCorrect="0";
    title.matters.push(JSON.stringify(title.errorTitle));
  }
  if(fytime==0) {
    title.reactTime=0;
  } else {
    title.reactTime=title.fyTime-fytime;
  }
  title.totalTimes+=title.reactTime;
  title.todayPoints=title.totalPoints;        //今日得分
  title.rightDate=Math.round((title.rightNumber/title.totalNumber)*100)+"%";    //正确率
  title.meanFyTime=(title.totalTimes/title.totalNumber).toFixed(2)+"S";       //平均答题时间
}

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

// 训练结果的页面大小动态调整
$(function () {
  if ($(window).width() <= 1025 && $(window).height() <= 658) {
    $(".game_over_main").css("width", "70%");
    $(".game_over_message div").css("line-height", "150px")
  }
});

//打乱数组
function randomsort(a, b) {
  return Math.random()>.5 ? -1 : 1;
  //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
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
  }else {
    title.specs.award_score=0;
    title.specs.help_score=0;
    title.specs.award_reason="连续正确次数<3";
    title.isCorrect="0";
    title.score=0;
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
