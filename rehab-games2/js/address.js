/**
 * Created by Administrator on 2016/9/12.
 */
var api={
    login:"http://rehab-games.66nao.dev/api/Auth/login",
    init:"http://rehab-games.66nao.dev/api/Train/init",
    saveQuestion:"http://rehab-games.66nao.dev/api/Train/saveQuestion",
    saveTask:"http://rehab-games.66nao.dev/api/train/saveTask",
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
    savaTaskFuction:function(title){
        //保存任务相关信息接口
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
    savaQuestionFunction:function(title){
        //保存每一题相关信息
        $.ajax({
            type: "post",//数据发送的方式（post 或者 get）
            url: api.saveQuestion,//要发送的后台地址
            data: {'trainId':api.getPara("trainId"),'taskId':api.getPara("taskId"),"detailCode":title.detailCode,"questionContent":title.questionContent,"reactTime":title.reactTime,"answer":title.answer,"specs":title.specs,"isCorrect":title.isCorrect,"score":title.score,"access_token":api.getPara("token")},//要发送的数据（参数）格式为{'val1':"1","val2":"2"}
            dataType: "json",//后台处理后返回的数据格式
            success: function (data) {//ajax请求成功后触发的方法
                if(data){
                    console.log(data);
                }
            },
            error: function (msg) {//ajax请求失败后触发的方法
                console.log(msg);//弹出错误信息
            }
        });
    }
};