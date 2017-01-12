/**
 * Created by Phenix ZZ on 2016/10/13.
 */
import Vue from 'vue'
import swal from 'sweetalert'
const QK = {}
//组件之间通讯，数据载体
QK.vector  = new Vue()
/**
 * 服务端URL
 **/
// QK.SERVER_URL = ''
// QK.SERVER_URL = 'http://114.55.225.130:8081'
// QK.SERVER_URL = 'http://192.168.1.117:8090'
QK.SERVER_URL = ('https:' == document.location.protocol ? 'https://www.advisingbank.com:8443' : '');
// QK.SERVER_URL = 'http://10.45.51.0:8081'
// QK.SERVER_URL = 'https://192.168.1.204:8443'
// QK.SERVER_URL = ('https:' == document.location.protocol ? 'https://www.advisingbank.com:8443' : 'http://www.advisingbank.com:8081');

/*用户列表删除弹出框*/
QK.deleteSwal = (option) => {
  swal({
      title: "你确定要删除这条信息吗?",
      text: "删除无法后将无法撤销！",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF5350",
      confirmButtonText: "确定!",
      cancelButtonText: "取消",
      closeOnConfirm: false,
      closeOnCancel: false
    },
    function (isConfirm) {
      if (isConfirm) {
        option['that'].$http.delete(QK.SERVER_URL + option['deleteUrl']).then(function (data) {
          var data = jQuery.parseJSON(data.body)
          var result = QK.getStateCode(option['that'], data.code)
          if (result.state) {
            swal({
              title: "删除成功！",
              text: "",
              confirmButtonColor: "#66BB6A",
              confirmButtonText: "确定",
              type: "success"
            },function(){
              option['that'].infos.$remove(option['that'].infos.find(t => t.id === option['id']))
            })
          }else{
            swal({
              title: "删除失败！",
              text: result.msg+'！',
              confirmButtonColor: "#2196F3",
              confirmButtonText: "确定",
              type: "error"
            })
          }
        });
      } else {
        swal({
          title: "",
          text: "您已取消！",
          confirmButtonColor: "#2196F3",
          confirmButtonText: "确定",
          type: "error"
        });
      }
    })
}
/*用户列表重置密码弹出框*/
QK.resetPwdSwal = (option) => {
  swal({
      title: "",
      text: "你确定要重置密码吗？",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF5350",
      confirmButtonText: "确定!",
      cancelButtonText: "取消",
      closeOnConfirm: false,
      closeOnCancel: false
    },
    function (isConfirm) {
      if (isConfirm) {
        option['that'].$http.put(QK.SERVER_URL + option['resetUrl'],option['sendData']).then(function (data) {
          var data = jQuery.parseJSON(data.body)
          var result = QK.getStateCode(option['that'], data.code)
          if (result.state) {
            swal({
              title: "重置成功！",
              text: "",
              confirmButtonColor: "#66BB6A",
              type: "success"
            },function(){
              option['that'].$router.go({path:option['listUrl']})
            })
          }else{
            swal({
              title: "重置失败！",
              text: result.msg+'！',
              confirmButtonColor: "#2196F3",
              confirmButtonText: "确定",
              type: "error"
            })
          }
        });
      } else {
        swal({
          title: "",
          text: "您已取消！",
          confirmButtonColor: "#2196F3",
          confirmButtonText: "确定",
          type: "error"
        });
      }
    })
}

/*成功弹出框*/
QK.successSwal = (option) => {
  swal({
      title: option['title'],
      text: "",
      confirmButtonColor: "#66BB6A",
      type: "success",
      confirmButtonText : '确定'
    },
    function(){
      option['that'].$router.go({path:option['listUrl']})
    })
}

/*失败弹出框*/
QK.errorSwal = (option) => {
  swal({
    title: option['title'],
    text: option['text'],
    confirmButtonColor: "#EF5350",
    type: "error",
    confirmButtonText : '确定'
  })
}

/**
 * 根据类名、标签名获取元素
 * @method getElementsByClassName
 * @param {String} className 类名
 * @param {String} tag  标签名
 * @returns {Array}
 * @author: Phenix ZZ
 * @date: 2016.10.13
 */
QK.getElementsByClassName = (className, tag) => {
  //对tag进行过滤，取出所有对象，如取出所有input类型对象。
  var allTags = document.getElementsByTagName(tag);
  var matchingElements = new Array();

  //正则表达式
  className = className.replace(/\-/g, "\\-");
  var regex = new RegExp("(^|\\s)" + className + "(\\s|$)");

  var element;

  //将取出的tag对象存入数组中。
  for (var i = 0; i < allTags.length; i++) {
    element = allTags[i];
    if (regex.test(element.className)) {
      matchingElements.push(element);
    }
  }
  return matchingElements;
}
/*
 * 时间戳转换
 * */
QK.add0 = (m) => {
  return m < 10 ? '0' + m : m
}
QK.formatDate = (num, bool)=> {
  if (num) {
    var myDate = new Date(num),
      year = myDate.getFullYear(),
      month = myDate.getMonth() + 1,
      date = myDate.getDate(),
      hour = myDate.getHours(),
      minute = myDate.getMinutes(),
      second = myDate.getSeconds(),
      dateStr = year + "-" + add0(month) + "-" + add0(date),
      timeStr = "   " + add0(hour) + ":" + add0(minute) + ":" + add0(second);
    if (bool) {
      return dateStr + timeStr
    } else {
      return dateStr
    }
  }
  else {
    return '未填写'
  }
}
/*记录当前跳转地址*/
QK.noteNowUrl = () => {
  var locationUrl = window.location.href
  var arr = locationUrl.split('#')
  localStorage.nowurl = arr[1]
}
/*搜索界面判空函数*/
QK.isNull = (data) => {
  return data = (data == null || data == "") ? "无" : data;
}
/*字符串去空格*/
QK.trim = (str) => {
  return str.replace(/(^\s*)|(\s*$)/g, '');
}
/**
 * 千分位显示
 * @method getThousands
 * @param {String} or {Number} num 需要转换的对象可以是数字字符串或数字
 * @param {Number} cent 需要保留的小数点后的位数，默认2
 * @param {Number} isThousand 是否以千分位显示，默认1，只有两个值1、0
 * @returns {string}
 * @author: Phoenix ZZ
 * @date: 2016.7.18
 */
QK.getThousands = (num) => {
  var cent = arguments[1] ? arguments[1] : 2;
  var isThousand = arguments[2] ? arguments[2] : 1;
  if (!num) {
    num = 0;
  }
  num = num.toString().replace(/\$|\,/g, '');
  if (isNaN(num))
    num = "0";
  if (isNaN(cent))
    cent = 0;
  cent = parseInt(cent);
  cent = Math.abs(cent);
  if (isNaN(isThousand))
    isThousand = 0;
  isThousand = parseInt(isThousand);
  if (isThousand < 0)
    isThousand = 0;
  if (isThousand >= 1)
    isThousand = 1;
  var sign = (num == (num = Math.abs(num)));
  num = Math.floor(num * Math.pow(10, cent) + 0.50000000001);
  var cents = num % Math.pow(10, cent);
  num = Math.floor(num / Math.pow(10, cent)).toString();
  cents = cents.toString();
  while (cents.length < cent) {
    cents = "0" + cents;
  }
  if (isThousand == 0)
    return (((sign) ? '' : '-') + num + '.' + cents);
  for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
    num = num.substring(0, num.length - (4 * i + 3)) + ',' +
      num.substring(num.length - (4 * i + 3));
  return (((sign) ? '' : '-') + num + '.' + cents);
}


/**
 * Ajax 回调即时更新显示页面数字
 * @method showThousands
 * @param {Object} obj 页面元素对象
 * @param {String} val 需要显示的值
 * @author: Phoenix ZZ
 * @date: 2016.7.18
 */
QK.showThousands = (obj, val) => {
  var html = getThousands(val, 2, 1);
  $(obj).html(html);
}

/**
 * 显示进件状态
 * @method getApplicationState
 * @param {String} 进件状态字符串
 * @returns {string} 返回进件状态标签代码
 * @author: Phenix ZZ
 * @date: 2016.10.13
 */
QK.getApplicationState = (state) => {
  var stateName = "",
    stateCalss = "";
  switch (state) {
    case "uncompleted":
      stateName = "未完成";
      stateCalss = "label-info";
      break;
    case "modelAccepted":
      stateName = "模型评估通过";//模型评估通过
      stateCalss = "label-success";
      break;
    // case "modelRejected":
    //   stateName = "模型评估禁入";
    //   stateCalss = "label-danger";
    //   break;
    case "expertReviewing":
      stateName = "专家评审中";
      stateCalss = "label-primary";
      break;
    case "finalPending":
      stateName = "已审核";//专家评审完成
      stateCalss = "label-warning";
      break;
    case "finalDone":
      stateName = "终审完成";
      stateCalss = "label-success";
      break;
    case "supplementarySurvey":
      stateName = "补充调查";
      stateCalss = "label-info";
      break;
  }
  return '<span class="label label-sm ' + stateCalss + '">' + stateName + '</span>';
}

/**
 * 判断是否为空
 * @method isEmpty
 * @param {Object} val 页面元素对象
 * @author: Phoenix qinwy
 * @returns {string}
 * @date: 2016.8.18
 */
QK.isEmpty = (val) => {
  val = val ? val : "未填写";
  return val;
}


/*授信评估消息类型转换接口*/
QK.getMsgType = (iType) => {
  var sType = 0;
  switch (iType) {
    case 0:
      sType = "info";
      break;
    case 1:
      sType = "warning";
      break;
    case 2:
      sType = "error";
      break;
  }
  return sType;
}

/**
 * 消息显示
 * @method showMessages
 * @param {string} data 消息Json字符串
 * @author: Phoenix ZZ
 * @date: 2016.8.24
 */
QK.showMessages = (data) => {
  var type, title, content, time, id;
//    var data = {"createTime":1472010044895,"endRow":0,"id":774,"msg":{"msg":"进件进入专家审核流程:","msgTitle":"审核消息"},"msgLimit":0,"msgState":0,"msgType":0,"pK":774,"staRow":0,"userId":3};
  if (data) {
    data = $.parseJSON(data);
    id = data.id;
    type = QK.getMsgType(data.msgType);
    title = data.msgTitle;
    content = data.msg;
    time = data.createTime;
  }
  toastr[type](content, title);
}

/**
 * 字段判空
 * @method isEmpty
 * @param {string} obj 消息Json字符串
 * @author: Phoenix ZZ
 * @returns {string}
 * @date: 2016.10.13
 */
QK.isEmpty = (obj) => {
  return obj ? obj : '未填写';
}

/**
 * 性别转换
 * @method reSex
 * @param {number || bool} num 性别表示
 * @returns {string}
 * @author: Phoenix ZZ
 * @date: 2016.10.13
 */
QK.reSex = (num) => {
  return (num == 1 || num == true) ? '男' : '女';
}




/**
 * 学历参照
 * @method reEdu
 * @param {number} num 学历标识
 * @returns {string}
 * @author: Phoenix ZZ
 * @date: 2016.10.13
 */
QK.reEdu = (num) => {
  var reStr = '未填写';
  switch (parseInt(num)) {
    case 1:
      reStr = '本科以上';
      break;
    case 2:
      reStr = '本科';
      break;
    case 3:
      reStr = '大专';
      break;
    case 4:
      reStr = '高中/中专';
      break;
    case 5:
      reStr = '初中及以下';
      break;
    default:
      reStr = '未填写'
  }
  return reStr;
}

/**
 * 房屋信息
 * @method residenceType
 * @param {number} num 房屋信息
 * @returns {string}
 * @author: Phoenix ZZ
 * @date: 2016.10.13
 */
QK.residenceType = (num) => {
  var reStr = '未填写';
  switch (parseInt(num)) {
    case 0:
      reStr = '租房';
      break;
    case 1:
      reStr = '全房产';
      break;
    case 2:
      reStr = '按揭';
      break;
    default:
      reStr = '未填写'
  }
  return reStr;
}

/**
 * 婚姻状态
 * @method marriageCondition
 * @param {number} num 婚姻状态
 * @returns {string}
 * @author: Phoenix ZZ
 * @date: 2016.10.13
 */
QK.marriageCondition = (num) => {
  var state = '未填写';
  switch (parseInt(num)) {
    case 1:
      state = '未婚';
      break;
    case 2:
      state = '已婚';
      break;
    case 3:
      state = '离婚';
      break;
    case 4:
      state = '丧偶';
      break;
    default:
      state = '未填写'
  }
  return state;
}

/**
 * 国籍信息
 * @method nationalName
 * @param {number} num 国籍信息
 * @returns {string}
 * @author: Phoenix ZZ
 * @date: 2016.10.13
 */
QK.nationalName = (num) => {
  var nationality = '未填写';
  switch (parseInt(num)) {
    case 0:
      nationality = '其他';
      break;
    case 1:
      nationality = '中国';
      break;
    default:
      nationality = '未填写'
  }
  return nationality;
}
/**
 * 服务端状态码
 * @method getStateCode
 * @param {number} 状态码
 * @returns {boolean,string} 返回{状态，字符串}
 * @author: Phenix ZZ
 * @date: 2016.10.17
 */
QK.getStateCode = (that, code) => {
  var result = {state: false, msg: ''}
  if (code == 200) {
    result.state = true
    result.msg = '登录成功'
  } else if (code == 500) {
    result.msg = '服务器错误'
  } else if (code == 401) {
    result.msg = '没有权限'
  } else if (code == 404) {
    result.msg = '未找到'
  } else if (code == 5001) {
    result.msg = 'token失效'
  } else if (code == 5002) {
    result.msg = '参数错误'
  } else if (code == 5003) {
    result.msg = '用户已存在'
  } else if (code == 5004) {
    result.msg = '用户或者密码错误'
  } else if (code == 5005) {
    result.msg = '账号未激活'
  } else if (code == 5006) {
    result.msg = '账号不存在'
  } else if (code == 5007) {
    result.msg = '账号被锁定'
  } else if (code == 5008) {
    result.msg = '登陆密码错误次数过多'
  } else if (code == 5009) {
    result.msg = '验证码错误'
  } else if (code == 5010) {
    result.msg = '验证码超时'
  } else if (code == 5011) {
    result.msg = '没有登录'
    that.$router.go({path: '/login'})
    return
  } else if (code == 5012) {
    result.msg = '没有权限'
  } else if (code == 5013) {
    result.msg = '不是合法的邮箱或手机号'
  } else if (code == 5014) {
    result.msg = '填写的绑定邮箱错误'
  } else if (code == 5015) {
    result.msg = '填入的绑定手机号错误'
  } else if (code == 5016) {
    result.msg = '原密码错误'
  } else if (code == 5017) {
    result.msg = '账号未激活'
  } else if (code == 5018) {
    result.msg = '账号或密码为空'
  } else if (code == 5019) {
    result.msg = '必填参数不能为空'
  } else if (code == 5020) {
    result.msg = '操作失败'
  } else if (code == 5021) {
    result.msg = '请求超时'
  } else if (code == 5022) {
    result.msg = '登陆超时'
  } else if (code == 5023) {
    result.msg = '接口签名不匹配'
  } else if (code == 5024) {
    result.msg = '客户输入验证码为空'
  } else if (code == 5025) {
    result.msg = '身份证格式错误'
  }
  return result
}

/**
 * 时间戳转字符日期信息
 * @method formatDate
 * @param {number} num 时间戳信息
 * @returns {string}
 * @author: tianym
 * @date: 2016.10.14
 */
QK.formatDate = (num) => {
  if (num) {
    var myDate = new Date(parseInt(num) * 1000)
    var year = myDate.getFullYear();
    var month = myDate.getMonth() + 1;
    var date = myDate.getDate();
    var hour = myDate.getHours() - 8;//时区原因，小时要减去八小时
    var minute = myDate.getMinutes();
    var second = myDate.getSeconds();
    return year + '-' + month + '-' + date + '-' + hour + '-' + minute + '-' + second
  }
  else {
    return '未填写'
  }
}

/**
 * 身份证号码转生日日期信息
 * @method reBirtyhday
 * @param {idNumber} idNumber 身份证信息
 * @returns {string}
 * @author: tianym
 * @date: 2016.10.14
 */
QK.reBirtyhday = (idNumber)=> {
  if (idNumber) {
    var birthday = idNumber.substring(6, 15);
    var year = birthday.substring(0, 4);
    var mouth = birthday.substring(4, 6);
    var date = birthday.substring(6, 8);
    return year + "-" + mouth + "-" + date;
  } else {
    return "未填写";
  }
}

/**
 * 登录名验证重复
 * @method cnameCheck(验证方法)  messageCname(验证样式)
 * @param  checkName 登录名class
 * @param  message 显示验证结果信息ID
 * @param  btn_submit 表单ID
 * @returns {string}
 * @author: tianym
 * @date: 2016.10.14
 */

//清空对象的value值
QK.cleanValue = (obj)=> {
  for (var i in obj) {
    obj[i] = ''
  }
  return obj
}

QK.parseFloatOverWrite = (val)=> {
  val = val + "";
  if (val.indexOf(",") > 0) {
    val = val.replace(/,/g, '');
  }
  val = parseFloat(val);
  if (val == null || val == "" || typeof(val) == "undefined" || val == "undefined" || isNaN(val) || !val) {
    return 0;
  }
  return val;
}

//登录名验重
QK.cnameCheck = ()=> {
  $(".realName").change(function () {
    var loginName = $(this).val();
    var url = "/" + loginName + "/isHave";
    var msg1 = "用户名可用!";
    var msg3 = "请输入正确的登录名!";
    var msg4 = "用户名已存在!";
    var login_name = "^[A-Za-z0-9_-]{4,12}$"
    if (loginName.length != "" && loginName.match(login_name)) {
      this.$http.get(url, true)
        .then(function (res) {
          var data = JSON.parse(res.body)
          if (data) {
            QK.messageCname($("#nameDiv"), msg4)
          } else {
            $("#nameDiv").find("div.message").css("color", "#32c5d2").html(msg1);
            $("#nameDiv").find("i.checkName").removeClass("fa-warning").addClass("fa-check").css("color", "#32c5d2");
            $("#btn_submit").removeAttr("disabled");
          }
        })
    }
    else {
      QK.messageCname($("#nameDiv"), msg3)
    }
  })
}
/**
 * 身份证验证重复
 * @method idnumberCheck(验证方法)  messageIdNumber(验证样式)
 * @param  checkId 身份证class
 * @param  idMessage 身份证显示验证结果信息ID
 * @param  btn_submit 表单ID
 * @returns {string}
 * @author: tianym
 * @date: 2016.10.14
 */
QK.messageFun = (parent,msg) => {
  parent.find(".message").css("color", "#a94442").html(msg)
  parent.find("input").css("border-color","#a94442")
  $("#btn_submit").attr("disabled", "true")
}

QK.formValidation = (args) => {
  var e = $(args.id), r = $(".alert-danger", e), i = $(".alert-success", e), m = $(".message", e);
  var rel = e.validate({
    errorElement: "span",
    errorClass: "help-block help-block-error",
    focusInvalid: !1,
    ignore: "",
    rules: args.rulesMap,
    invalidHandler: function (e, t) {
      i.hide(), r.show()
      /*, App.scrollTo(r, -200)*/
    },
    errorPlacement: function (e, r) {
      var i = $(r).parent(".input-icon").children("i");
      var m = $(r).parent(".input-icon").children(".message");
      i.removeClass("fa-check").addClass("fa-warning")/*, i.attr("data-original-title", e.text())/*.tooltip({container: "body"})*/, m.html(e.text())
    },
    highlight: function (e) {
      $(e).closest(".form-group").removeClass("has-success").addClass("has-error")

    },
    unhighlight: function (e) {
    },
    success: function (e, r) {
      var i = $(r).parent(".input-icon").children("i");
      $(r).closest(".form-group").removeClass("has-error").addClass("has-success"), i.removeClass("fa-warning").addClass("fa-check")

    },
    submitHandler: function (e) {
      i.show(), r.hide(), console.log("类型:" + typeof(e[0]))
      /*, e[0].submit()*/
    }
  });
  $(".select2me", e).change(function () {
    e.validate().element($(this))
  })
  return rel.form();
}

QK.addMethod = () => {
  /**
   * @title：自定义验证规则列表
   * @author: Phoenix ZZ
   * @date: 2016.7.6
   */
  //汉化消息
  $.extend($.validator.messages, {
    required: "该项不能为空！",
    remote: "请修正此字段",
    homeAddress: "请输入地址",
    email: "请输入有效的电子邮件地址",
    residenceAddress: "请输入您的户籍地址",
    url: "请输入有效的网址",
    date: "请输入有效的日期",
    dateISO: "请输入有效的日期 (YYYY-MM-DD)",
    number: "请输入有效的数字",
    digits: "只能输入数字",
    creditcard: "请输入有效的信用卡号码",
    equalTo: "两次输入必须保持一致！",
    extension: "请输入有效的后缀",
    maxlength: $.validator.format("最多可以输入 {0} 个字符"),
    minlength: $.validator.format("最少要输入 {0} 个字符"),
    rangelength: $.validator.format("请输入长度在 {0} 到 {1} 之间的字符串"),
    range: $.validator.format("请输入范围在 {0} 到 {1} 之间的数值"),
    max: $.validator.format("请输入不大于 {0} 的数值"),
    min: $.validator.format("请输入不小于 {0} 的数值")
  });
  jQuery.validator.addMethod("rewriteRequired", function (value, element) {
    return this.optional(element) || /^\s+|\s+$/g.test(value);
  }, "该项不能为空");
  // 判断整数value是否等于0
  jQuery.validator.addMethod("isIntEqZero", function (value, element) {
    value = parseInt(value);
    return this.optional(element) || value == 0;
  }, "整数必须为0");

  // 判断整数value是否大于0
  jQuery.validator.addMethod("isIntGtZero", function (value, element) {
    value = parseInt(value);
    return this.optional(element) || value > 0;
  }, "整数必须大于0");

  // 判断整数value是否大于或等于0
  jQuery.validator.addMethod("isIntGteZero", function (value, element) {
    return this.optional(element) || /^[0-9]*[0-9][0-9]*$/.test(value);
  }, "整数必须大于或等于0！");
  // 判断整数value是否不等于0
  jQuery.validator.addMethod("isIntNEqZero", function (value, element) {
    value = parseInt(value);
    return this.optional(element) || value != 0;
  }, "整数必须不等于0");

  // 判断整数value是否小于0
  jQuery.validator.addMethod("isIntLtZero", function (value, element) {
    value = parseInt(value);
    return this.optional(element) || value < 0;
  }, "整数必须小于0");

  // 判断整数value是否小于或等于0
  jQuery.validator.addMethod("isIntLteZero", function (value, element) {
    value = parseInt(value);
    return this.optional(element) || value <= 0;
  }, "整数必须小于或等于0");

  // 判断浮点数value是否等于0
  jQuery.validator.addMethod("isFloatEqZero", function (value, element) {
    value = parseFloat(value);
    return this.optional(element) || value == 0;
  }, "浮点数必须为0");

  // 判断浮点数value是否大于0
  jQuery.validator.addMethod("isFloatGtZero", function (value, element) {
    value = parseFloat(value);
    return this.optional(element) || value > 0;
  }, "浮点数必须大于0");

  // 判断浮点数value是否大于或等于0
  jQuery.validator.addMethod("isFloatGteZero", function (value, element) {
    value = parseFloat(value);
    return this.optional(element) || value >= 0;
  }, "浮点数必须大于或等于0");

  // 判断浮点数value是否不等于0
  jQuery.validator.addMethod("isFloatNEqZero", function (value, element) {
    value = parseFloat(value);
    return this.optional(element) || value != 0;
  }, "浮点数必须不等于0");

  // 判断浮点数value是否小于0
  jQuery.validator.addMethod("isFloatLtZero", function (value, element) {
    value = parseFloat(value);
    return this.optional(element) || value < 0;
  }, "浮点数必须小于0");

  // 判断浮点数value是否小于或等于0
  jQuery.validator.addMethod("isFloatLteZero", function (value, element) {
    value = parseFloat(value);
    return this.optional(element) || value <= 0;
  }, "浮点数必须小于或等于0");

  // 判断浮点型
  jQuery.validator.addMethod("isFloat", function (value, element) {
    return this.optional(element) || /^[-\+]?\d+(\.\d+)?$/.test(value);
  }, "只能包含数字、小数点等字符");

  // 匹配integer
  jQuery.validator.addMethod("isInteger", function (value, element) {
    return this.optional(element) || (/^[-\+]?\d+$/.test(value) && parseInt(value) >= 0);
  }, "匹配integer");

  // 判断数值类型，包括整数和浮点数
  jQuery.validator.addMethod("isNumber", function (value, element) {
    return this.optional(element) || /^[-\+]?\d+$/.test(value) || /^[-\+]?\d+(\.\d+)?$/.test(value);
  }, "匹配数值类型，包括整数和浮点数");

  // 只能输入[0-9]数字
  jQuery.validator.addMethod("isDigits", function (value, element) {
    return this.optional(element) || /^\d+$/.test(value);
  }, "只能输入0-9数字");

  // 只能输入3-6位数字
  jQuery.validator.addMethod("isThreeNum", function (value, element) {
    return this.optional(element) || /^[0-9]{3,6}$/.test(value);
  }, "只能输入3-6位数字。");

  // 只能输入0-8位数字
  jQuery.validator.addMethod("iseightNum", function (value, element) {
    return this.optional(element) || /^[0-9]{0,8}$/.test(value);
  }, "只能输入0-8位数字。");

  // 判断英文字符
  jQuery.validator.addMethod("isEnglish", function (value, element) {
    return this.optional(element) || /^[A-Za-z]+$/.test(value);
  }, "只能包含英文字符。");

  // 手机号码验证
  jQuery.validator.addMethod("isMobile", function (value, element) {
    var length = value.length;
    return this.optional(element) || (length == 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value));
  }, "请正确填写您的手机号码。");

  // 手机号码验证包含170段位
  jQuery.validator.addMethod("tel", function (value, element) {
    var tel = /(^1[3|4|5|7|8][0-9]{9}$)/;
    return this.optional(element) || (tel.test(value));
  }, "请正确填写您的电话号码。");
//授信额度验证
  jQuery.validator.addMethod("applyQuota", function (value, element,params) {
    var min = $("#applyQuota").data("min");
    // console.log(min);
    var max = $("#applyQuota").data("max");
    // var min1 = $("#applyQuota").data("min1");
    // var max1 = $("#applyQuota").data("max1");
    if (value >= min && value <= max && isPositiveNum(value)) {
      return true;
    } else {
      return false;
    }
  }, (function () {
    return $("#applyQuota").attr("placeholder")
  }));
  //贷款期限验证
  jQuery.validator.addMethod("loanTerm", function (value, element) {
    var min = $("#loanTerm").data("min");
    var max = $("#loanTerm").data("max");
    // var min1 = $("#loanTerm").data("min1");
    // var max1 = $("#loanTerm").data("max1");
    if (value >= min && value <= max && isPositiveNum(value)) {
      return true;
    } else {
      return false;
    }
  }, (function () {
    return $("#loanTerm").attr("placeholder")
  }));
  //数字区间验证
  jQuery.validator.addMethod("numRange", function (value, element,params) {
    if (value >= params[0] && value <= params[1] && isPositiveNum(value)) {
      return true;
    } else {
      return false;
    }
  }, "请输入规定区间内整数");
  // 联系电话(手机/电话皆可)验证
  jQuery.validator.addMethod("isTel", function (value, element) {
    var length = value.length;
    var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    var tel = /^(\d{3,4}-?)?\d{7,9}$/g;
    return this.optional(element) || tel.test(value) || (length == 11 && mobile.test(value));
  }, "请正确填写您的联系方式");

  // 匹配qq
  jQuery.validator.addMethod("isQq", function (value, element) {
    return this.optional(element) || /^[1-9]\d{4,12}$/;
  }, "匹配QQ");

  //邮箱验证方式
  jQuery.validator.addMethod("email", function (value, element) {
    return this.optional(element) || /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(value);
  }, "请输入有效的电子邮件地址");

  // 邮政编码验证
  jQuery.validator.addMethod("isZipCode", function (value, element) {
    var zip = /^[0-9]{6}$/;
    return this.optional(element) || (zip.test(value));
  }, "请正确填写您的邮政编码。");

  // 匹配密码，以字母开头，长度在6-12之间，只能包含字符、数字和下划线。
  jQuery.validator.addMethod("isPwd", function (value, element) {
    return this.optional(element) || /^[a-zA-Z]\w{6,18}$/.test(value);
  }, "以字母开头，长度在6-18之间，只能包含字符、数字和下划线。");

  // 身份证号码验证
  jQuery.validator.addMethod("isIdCardNo", function (value, element) {
    //var idCard = /^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/;
    return this.optional(element) || isIdCardNo(value);
  }, "请输入正确的身份证号码。");

  //身份证号码验证方式
  jQuery.validator.addMethod("idNumber", function (value, element) {
    return this.optional(element) || /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(value);
  }, "请输入正确的身份证号");

  // IP地址验证
  jQuery.validator.addMethod("ip", function (value, element) {
    return this.optional(element) || /^(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.)(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.){2}([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))$/.test(value);
  }, "请填写正确的IP地址。");

  // 字符验证，只能包含中文、英文、数字、下划线等字符。  产品名称验证
  jQuery.validator.addMethod("stringCheck", function (value, element) {
    return this.optional(element) || /^[a-zA-Z0-9\(-\)-（-）\u4e00-\u9fa5-_]{4,30}$/.test(value);
  }, "4到30位只能包含中文、英文、数字、下划线等字符");

  // 匹配english
  jQuery.validator.addMethod("isEnglish", function (value, element) {
    return this.optional(element) || /^[A-Za-z]+$/.test(value);
  }, "匹配english");

  // 匹配汉字和·
  jQuery.validator.addMethod("isChinese", function (value, element) {
    return this.optional(element) || /^[\u4e00-\u9fa5\·]{2,10}$/.test(value);
  }, "请输入中文名2到10位");

  // 匹配中文(包括汉字和字符)
  jQuery.validator.addMethod("isChineseChar", function (value, element) {
    return this.optional(element) || /^[\u0391-\uFFE5]+$/.test(value);
  }, "匹配中文(包括汉字和字符) ");

  // 判断是否为合法字符(a-zA-Z0-9-_)
  jQuery.validator.addMethod("isRightfulString", function (value, element) {
    return this.optional(element) || /^[A-Za-z0-9_-]{3,12}$/.test(value);
  }, "请输入由数字、大小写字母以及下划线组成的3到12位字符");

  // 判断是否包含中英文特殊字符，除英文"-_"字符外
  jQuery.validator.addMethod("isContainsSpecialChar", function (value, element) {
    var reg = RegExp(/[(\ )(\`)(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\+)(\=)(\|)(\{)(\})(\')(\:)(\;)(\')(',)(\[)(\])(\.)(\<)(\>)(\/)(\?)(\~)(\！)(\@)(\#)(\￥)(\%)(\…)(\&)(\*)(\（)(\）)(\—)(\+)(\|)(\{)(\})(\【)(\】)(\‘)(\；)(\：)(\”)(\“)(\’)(\。)(\，)(\、)(\？)]+/);
    return this.optional(element) || !reg.test(value);
  }, "含有中英文特殊字符");

  // 判断是住居地址不超过100
  jQuery.validator.addMethod("isHomeAddress", function (value, element) {
    return this.optional(element) || /^.{1,100}$/.test(value);
  }, "请输入中英文的1到100位字符");

  //新建进件下拉框验证
  jQuery.validator.addMethod("downList", function (value, element) {
    if (!value.indexOf("请选择")) {
      return false;
    }
    return true;
  }, "请选择");

  jQuery.validator.addMethod("proposedDate", function (value, element) {
    /*var now = new Date();
     var nowDate = now.setDate(now.getDate()+7);
     /!*自动获取系统当前时间显示在添加用户创建时间中*!/
     function format(date){
     //获取date的年,保存在变量y中
     var y = date.getFullYear();
     //获得date的月,保存在变量M中
     var M = date.getMonth()+1;
     //如果M<10，则在M前补"0"
     (M<10)&&(M= "0"+M);
     //获得date的日,保存在变量d中
     var d = date.getDate();
     //如果d<10，则在d前补"0"
     (d<10)&&(d= "0"+d);
     return y+"-"+M+"-"+d;
     }
     var workDate = format(nowDate);
     alert("workDate:"+workDate.split("-"));
     alert("value:"+value);
     if(workDate == value){
     return true;
     }
     */
  }, "请选择七天之后的日期");


  /*
   * @title:客户验证
   * @author:tianym
   * @date:2016.8.25
   */
  //新建客户年龄限制验证方式
  jQuery.validator.addMethod("age", function (value, element) {
    return this.optional(element) || /\d{2}/.test(value);
  }, "请输入10-99之间的年龄值");
  //是否为正整数
  function isPositiveNum(s) {
    var re = /^[0-9]*[1-9][0-9]*$/;
    return re.test(s)
  }

  //身份证号码的验证规则
  function isIdCardNo(num) {
    //if (isNaN(num)) {alert("输入的不是数字！"); return false;}
    var len = num.length, re;
    if (len == 15)
      re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{2})(\w)$/);
    else if (len == 18)
      re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/);
    else {
      //alert("输入的数字位数不对。");
      return false;
    }
    var a = num.match(re);
    if (a != null) {
      if (len == 15) {
        var D = new Date("19" + a[3] + "/" + a[4] + "/" + a[5]);
        var B = D.getYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];
      }
      else {
        var D = new Date(a[3] + "/" + a[4] + "/" + a[5]);
        var B = D.getFullYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];
      }
      if (!B) {
        //alert("输入的身份证号 "+ a[0] +" 里出生日期不对。");
        return false;
      }
    }
    if (!re.test(num)) {
      //alert("身份证最后一位只能是数字和字母。");
      return false;
    }
    return true;
  }

  //车牌号校验
  function isPlateNo(plateNo) {
    var re = /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/;
    if (re.test(plateNo)) {
      return true;
    }
    return false;
  }

  //新建客户邮编验证方式
  jQuery.validator.addMethod("zipCode", function (value, element) {
    var zip = /^[0-9]{6}$/;
    return this.optional(element) || (zip.test(value));
  }, "请输入正确的邮编");


  /*
   * @title:产品验证
   * @author:tianym
   * @date:2016.8.25
   */
  //新建产品年龄最小验证方式
  jQuery.validator.addMethod("ageMin", function (value, element) {
    var value2 = parseInt($("#ageMax").val());
    return this.optional(element) || /\d{2}/.test(value) && value > 0 && value2 > 0 && value < value2;
  }, "请输入比年龄上限小的值！");

  //新建产品年龄最大验证方式
  jQuery.validator.addMethod("ageMax", function (value, element) {
    var value1 = parseInt($("#ageMin").val());
    return this.optional(element) || /\d{2}/.test(value) && value1 > 0 && value < 100 && value > value1;
  }, "请输入比年龄下限大的值！");

//贷款期限下界
  jQuery.validator.addMethod("loanTermMin", function (value, element) {
    var value2 = parseInt($("#loanTermMax").val());
    return this.optional(element) || /^[0-9]{1,3}$/.test(value) && value > 0 && value2 > 0 && value <= value2;
  }, "请输入比贷款期限上界小的整数！");

  //贷款期限上界
  jQuery.validator.addMethod("loanTermMax", function (value, element) {
    var value1 = parseInt($("#loanTermMin").val());
    return this.optional(element) || /^[0-9]{1,3}$/.test(value) && value > 0 && value1 > 0 && value1 <= value;
  }, "请输入比贷款期限下界大的整数！");


//贷款额度下界
  jQuery.validator.addMethod("creditLineMin", function (value, element) {
    var value2 = parseInt($("#creditLineMax").val());
    return this.optional(element) || /^[0-9]{1,10}$/.test(value) && value > 0 && value2 > 0 && value <= value2;
  }, "请输入比贷款额度上限小的整数！");

  //贷款额度上界
  jQuery.validator.addMethod("creditLineMax", function (value, element) {
    var value1 = parseInt($("#creditLineMin").val());
    return this.optional(element) || /^[0-9]{1,10}$/.test(value) && value > 0 && value1 > 0 && value1 <= value;
  }, "请输入比贷款额度下限大的整数！");

//利率下界
  jQuery.validator.addMethod("rangeMin", function (value, element) {
    var value2 = parseFloat($("#rateRangeMax").val());
    return this.optional(element) || value > 0 && value2 > 0 && value <= value2;
  }, "请输入比利率上限小的值！");

  //利率上界
  jQuery.validator.addMethod("rangeMax", function (value, element) {
    var value1 = parseFloat($("#rateRangeMin").val());
    return this.optional(element) || value > 0 && value1 > 0 && value1 <= value;
  }, "请输入比利率下限大的值！");

  //罚息
  jQuery.validator.addMethod("penaltyNumbererest", function (value, element) {
    return this.optional(element) || /\d{1,2}/.test(value) && value > 0;
  }, "请输入罚息比例！eg:24或者0.24");

  //风险容忍度
  jQuery.validator.addMethod("productRiskTolerance", function (value, element) {
    return this.optional(element) || /\d{1,2}/.test(value) && value > 0;
  }, "请输入风险容忍度！eg:24或者0.24");

  //年费
  jQuery.validator.addMethod("annualFee", function (value, element) {
    return this.optional(element) || /\d{1,10}/.test(value) && value > 0;
  }, "请输入年费");


  // 只能输入0-100之间的数，小数后保留两位，罚息，风险容忍度
  jQuery.validator.addMethod("ishundredNum", function (value, element) {
    return this.optional(element) || /^(\d{1,2}(\.\d{1,2})?|100)$/.test(value);
  }, "只能输入0-100的数字，小数保留两位。");

  // 字符验证，只能包含中文、英文、数字、下划线等字符。  产品名称验证
  jQuery.validator.addMethod("pduName", function (value, element) {
    return this.optional(element) || /^[a-zA-Z0-9\u4e00-\u9fa5-\uff08-\uff09-\u0028-\u0029-_]{2,12}$/.test(value);
  }, "2到12位只能包含中文、英文、数字、下划线等字符");

}


QK.idnumberCheck = () => {
  $(".idNumber").change(function () {
    var idNumber = $(this).val();
    var len = idNumber.length;
    var url = "/api/user/isIdCard";
    var msg1 = "身份证格式不正确！";
    var msg3 = "证件已经存在！";
    var msg4 = "证件可用";
    var msg5 = "身份证长度不够！";
    if (len < 14) {
      QK.messageIdNumber(msg5);
    }
    else {
      this.$http.post(url, idNumber,true)
        .then(function (res) {
          var data = JSON.parse(res.body)
          var idVerify = data.idVerify;
          var idExist = data.idExist;
          if (!idVerify) {
            QK.messageIdNumber(msg1);
            return;
          } else {
            if (idExist) {
              QK.messageIdNumber(msg3);
            } else {
              $("#idMessage").css("color", "#32c5d2").html(msg4);
              $("#btn_submit").removeAttr("disabled");
            }
          }

        })
    }
  })
}

export default QK
