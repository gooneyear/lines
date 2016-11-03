/**
 * Created by Administrator on 2016/9/12.
 */
var api={
    init:"http://192.168.10.124:8096/api/Train/init",
    saveQuestion:"http://192.168.10.124:8096/api/Train/saveQuestion",
    saveTask:"http://192.168.10.124:8096/api/train/saveTask",
    getPara: function(paraName) {
        var surl = location.href;
        var reg = "(?:\\?|&){1}"+paraName+"=([^&]*)";
        var re = new RegExp(reg,'gi');
        re.exec(surl);
        return RegExp.$1;
    },
    loginFunction:function(title,aa){
        $.ajax({
            method: 'get',
            url: api.init,
            data: {'trainId':api.getPara("trainId"),'taskId':api.getPara("taskId"),"access_token":api.getPara("token")},
            dataType: "json",
            //headers: {
            //    "Authorization": "Bearer "+ $.cookie("token")
            //},
            success: function (init_data) {
                if(init_data){
                    console.log(init_data);
                    title.time=init_data.data.duration;
                    title.yesterdayPoints=init_data.data.lastScore;
                    //title.time=5
                    if(init_data.data.detailCode){
                        title.detailCode=init_data.data.detailCode
                    }
                    {
                        aa()
                    }
                }
            },
            error: function (msg) {
                console.log(msg);
            }
        });
    },
  //保存任务相关信息接口
    savaTaskFuction:function(title){
        $.ajax({
            type: "post",
            url: api.saveTask,
            data: {'trainId':api.getPara("trainId"),'taskId':api.getPara("taskId"),
                "detailCode":title.detailCode,"totalNum":title.totalNumber,
                "startLevel":title.startLevel,
                "lastLevel":title.level,"duration":title.time,
                "avgCorrectTime":Math.round(title.avgCorrectTime/title.rightNumber),"correctNum":title.rightNumber,
                "wrongNum":title.totalNumber-title.rightNumber,
                "correctRate":title.rightDate,"Score":title.todayPoints,"matters":title.matters,"unlock":title.unlock,"health":title.health,"access_token":api.getPara("token")},
            dataType: "json",
            success: function (data) {
                if(data){
                    console.log(data);
                }
            },
            error: function (msg) {
                console.log(msg);
            }
        });
    },
  //保存每一题相关信息
    savaQuestionFunction:function(title){
        $.ajax({
            type: "post",
            url: api.saveQuestion,
            data: {'trainId':api.getPara("trainId"),'taskId':api.getPara("taskId"),"detailCode":title.detailCode,"questionContent":title.questionContent,"reactTime":title.reactTime,"answer":title.answer,"specs":title.specs,"isCorrect":title.isCorrect,"score":title.score,"access_token":api.getPara("token")},//Ҫ���͵����ݣ���������ʽΪ{'val1':"1","val2":"2"}
            dataType: "json",
            success: function (data) {
                if(data){
                    console.log(data);
                }
            },
            error: function (msg) {
                console.log(msg);
            }
        });
    }
};