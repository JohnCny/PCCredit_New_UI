/**
 * Created by zhangzhan on 2016/10/31.
 */

/**
 * 根据类名、标签名获取元素
 * @method getElementsByClassName
 * @param {String} className 类名
 * @param {String} tag  标签名
 * @returns {Array}
 * @author: Phenix ZZ
 * @date: 2016.10.13
 */
export const getElementsByClassName = (className, tag) => {
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

/**
 * 获取角色状态
 * @method getRoleState
 * @param {number} num
 * @returns {string}
 * @author: qwy
 * @date: 2017.1.18
 */
export const getRoleState = (num) => {
  var reStr = '未填写';
  switch (parseInt(num)) {
    case 0:
      reStr = '正常';
      break;
    case 1:
      reStr = '停用';
      break;
    default:
      reStr = '未填写'
  }
  return reStr;
}



/**
 * 获取ipc表单种类
 * @method getType
 * @param {number} num
 * @returns {string}
 * @author: qwy
 * @date: 2017.2.6
 */
export const getType = (num) => {
  var typeTxt = 'text';
  switch (parseInt(num)) {
    case 0:
      typeTxt = 'number';
      break;
    case 1:
      typeTxt = 'text';
      break;
    case 2||3:
      typeTxt = 'number';
      break;
    case 4:
      typeTxt = 'date';
      break;
    default:
      typeTxt = 'text'
  }
  return typeTxt;
}
/**
 * 获取ipc表单number类型
 * @method getNumType
 * @param {number} num
 * @returns {string}
 * @author: qwy
 * @date: 2017.2.6
 */
export const getNumType = (num) => {
  var num = 'text';
  switch (parseInt(num)) {
    case 2:
      num = '0.01';
      break;
    case 3:
      num = '1';
      break;
    default:
      num = ''
  }
  return num;
}

/**
 * 获取角色
 * @method getRole
 * @param {number} num
 * @returns {string}
 * @author: qwy
 * @date: 2017.1.18
 */
export const getRole = (num) => {
  var reStr = '未填写';
  switch (parseInt(num)) {
    case 0:
      reStr = '正常';
      break;
    case 1:
      reStr = '停用';
      break;
    default:
      reStr = '未填写'
  }
  return reStr;
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
export const getThousands = (num) => {
  var cent = 2,
    isThousand = 1;
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
 * 显示进件状态
 * @method getApplicationState
 * @param {String} 进件状态字符串
 * @returns {string} 返回进件状态标签代码
 * @author: Phenix ZZ
 * @date: 2016.10.13
 */
export const getApplicationState = (state) => {
  var stateName = "";
  switch (state) {
    case "uncompleted":
      stateName = "未完成";
      break;
    case "modelAccepted":
      stateName = "模型评估通过";//模型评估通过
      break;
    // case "modelRejected":
    //   stateName = "模型评估禁入";
    //   break;
    case "expertReviewing":
      stateName = "专家评审中";
      break;
    case "finalPending":
      stateName = "已审核";//专家评审完成
      break;
    case "finalDone":
      stateName = "终审完成";
      break;
    case "supplementarySurvey":
      stateName = "补充调查";
      break;
  }
  return stateName;
}

export const getApplicationClass = (state) => {
  var stateCalss = "";
  switch (state) {
    case "uncompleted":
      stateCalss = "label-info";
      break;
    case "modelAccepted":
      stateCalss = "label-success";
      break;
    // case "modelRejected":
    //   stateCalss = "label-danger";
    //   break;
    case "expertReviewing":
      stateCalss = "label-primary";
      break;
    case "finalPending":
      stateCalss = "label-warning";
      break;
    case "finalDone":
      stateCalss = "label-success";
      break;
    case "supplementarySurvey":
      stateCalss = "label-info";
      break;
  }
  return stateCalss;
}

/**
 * 显示客户状态
 * @method getCusState
 * @param {num} 客户状态码
 * @returns {string} 返回客户状态标签代码
 * @author: Phenix qwy
 * @date: 2017.2.8
 */
export const getCusState = (state) => {
  var stateName = "";
  switch (parseInt(state)) {
    case 0:
      stateName = "正常";
      break;
    case 1:
      stateName = "高风险用户";//模型评估通过
      break;
    case 2:
      stateName = "黑名单用户";
      break;
    case 3:
      stateName = "高风险转黑名单审核";//专家评审完成
      break;
    case 4:
      stateName = "黑名单转出";
      break;
    case 5:
      stateName = "禁用客户";
      break;
    case 6:
      stateName = "客户移交中";
      break;
  }
  return stateName;
}

export const getCusClass = (state) => {
  var stateCalss = "";
  switch (state) {
    case 0:
      stateCalss = "label-success";
      break;
    case 1:
      stateCalss = "label-warning";
      break;
    case 2:
       stateCalss = "label-danger";
    break;
    case 3:
      stateCalss = "label-warning";
      break;
    case 4:
      stateCalss = "label-info";
      break;
    case 5:
      stateCalss = "label-danger";
      break;
    case 6:
      stateCalss = "label-info";
      break;
  }
  return stateCalss;
}

/**
 * 显示客户移交状态
 * @method getCusTransferState
 * @param {num} 客户移交状态码
 * @returns {string} 返回客户移交状态标签代码
 * @author: Phenix qwy
 * @date: 2017.2.8
 */
export const getCusTransferState = (state) => {
  var stateName = "";
  switch (parseInt(state)) {
    case 0:
      stateName = "待接收人确认";
      break;
    case 1:
      stateName = "接收人确认";//模型评估通过
      break;
    case 2:
      stateName = "接收人拒绝";
      break;
  }
  return stateName;
}

export const getCusTransferClass = (state) => {
  var stateCalss = "";
  switch (state) {
    case 0:
      stateCalss = "label-info";
      break;
    case 1:
      stateCalss = "label-success";
      break;
    case 2:
      stateCalss = "label-warning";
      break;
  }
  return stateCalss;
}

/**
 * 登入结果
 * @method changeLog
 * @param {number} num
 * @returns {string}
 * @author: zx
 * @date: 2017.1.11
 */
export const changeLog = (num) => {
  var reStr = '未填写';
  switch (parseInt(num)) {
    case 1:
      reStr = '账号未知';
      break;
    case 2:
      reStr = '密码错误';
      break;
    case 3:
      reStr = '账号锁定';
      break;
    case 4:
      reStr = '账号禁用';
      break;
    case 5:
      reStr = '成功';
      break;
    default:
      reStr = '未填写'
  }
  return reStr;
}

export const logColor = (num) => {
  var stateCalss = "";
  switch (num) {
    case 1:
      stateCalss = "label-info";
      break;
    case 2:
      stateCalss = "label-danger";
      break;
    case 3:
      stateCalss = "label-primary";
      break;
    case 4:
      stateCalss = "label-warning";
      break;
    case 5:
      stateCalss = "label-success";
      break;
  }
  return stateCalss;
}

/**
 * 显示状态
 * @method reStatus
 * @param {String} 用户状态代码
 * @returns {string} 返回用户状态标签代码
 * @author: Phenix ZZ
 * @date: 2016.10.13
 */

export const reStatus = (state) => {
  var stateName = ""
  switch (state) {
    case 0:
      stateName = "正常";
      break;
    case 1:
      stateName = "锁定";
      break;
    case 3:
      stateName = "待激活";
      break;
    default :
      stateName = "未填写";
      break;
  }
  return stateName
}
export const reStatusClass = (state) => {
  var stateCalss = "";
  switch (state) {
    case 0:
      stateCalss = "label-success";
      break;
    case 1:
      stateCalss = "label-important";
      break;
    case 3:
      stateCalss = "label-warning";
      break;
    default :
      stateCalss = "label-default";
      break;
  }
  return stateCalss;
}


/**
 * 根据模型评估结果显示是否继续调查
 * @method getPassState
 * @param {string} 审核状态
 * @returns {boolean} 返回进件状态标签代码
 * @author: Phenix ZZ
 * @date: 2016.11.10
 */
export const getPassState = (state) => {
  var bool = false;
  if (state == 'modelRejected') {
    bool = 'disabled';
  }
  return bool;
}

export const getModelState = (remark) => {
  var bool = false;
  if (!(remark == '1')) {
    bool = 'disabled';
  }
  return bool;
}
/*授信评估消息类型转换接口*/
export const getMsgType = (iType) => {
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
 * 字段判空
 * @method isEmpty
 * @param {string} obj 消息Json字符串
 * @author: Phoenix ZZ
 * @returns {string}
 * @date: 2016.10.13
 */
export const isEmpty = (obj) => {
  return obj ? obj : '未填写';
}
/**
 * 专家级别转换
 * @method expertChange
 * @date: 2016.11.30
 */
export const expertChange = (num) => {
  if (num == '0') {
    return '0';
  } else if (num == '1') {
    return '1';
  } else if (num == '2') {
    return '2';
  } else if (num == '3') {
    return '3';
  } else {
    return '无数据';
  }
}

/**
 * 性别转换
 * @method reSex
 * @param {number || bool} num 性别表示
 * @returns {string}
 * @author: Phoenix ZZ
 * @date: 2016.10.13
 */
export const reSex = (num) => {
  return (num == 1 || num == true) ? '女' : '男';
}

/**
 * 证件类型转换
 * @method reId
 * @param {number} num 证件类型转换
 * @returns {string}
 * @author: zx
 * @date: 2017.1.13
 */
export const reId = (num) => {
  var reStr = '未填写';
  switch (parseInt(num)) {
    case 0:
      reStr = '身份证';
      break;
    case 1:
      reStr = '护照';
      break;
    case 2:
      reStr = '驾驶证';
      break;
    default:
      reStr = '未填写'
  }
  return reStr;
}

/**
 * 登陆登出
 * @method reLog
 * @param {number || bool} num
 * @returns {string}
 * @author: zx
 * @date: 2017.1.11
 */
export const reLog = (num) => {
  var reStr = '未填写';
  switch (parseInt(num)) {
    case 0:
      reStr = '退出';
      break;
    case 1:
      reStr = '登陆';
      break;
    default:
      reStr = '未填写'
  }
  return reStr;
}
/**
 * 登陆登出颜色转换
 * @method loginColor
 * @param {number || bool} num
 * @returns {string}
 * @author: zx
 * @date: 2017.1.11
 */
export const loginColor = (num) => {
  var stateCalss = "";
  switch (num) {
    case 0:
      stateCalss = "label-info";
      break;
    case 1:
      stateCalss = "label-success";
      break;
  }
  return stateCalss;
}

/**
 * 进件审批类型转换
 * @method approvalChange
 * @param {number || bool} num
 * @returns {string}
 * @author: zx
 * @date: 2017.1.11
 */
export const approvalChange = (num) => {
  var reStr = '未填写';
  switch (parseInt(num)) {
    case 0:
      reStr = '通过';
      break;
    case 1:
      reStr = '有条件通过';
      break;
    case 2:
      reStr = '退回修改';
      break;
    case 3:
      reStr = '拒绝';
      break;
    default:
      reStr = '未填写'
  }
  return reStr;
}
/**
 * 进件审批类型颜色转换
 * @method approvalColor
 * @param {number || bool} num
 * @returns {string}
 * @author: zx
 * @date: 2017.1.11
 */
export const approvalColor = (num) => {
  var stateCalss = "";
  switch (num) {
    case 0:
      stateCalss = "label-success";
      break;
    case 1:
      stateCalss = "label-primary";
      break;
    case 2:
      stateCalss = "label-danger";
      break;
    case 3:
      stateCalss = "label-warning";
      break;
  }
  return stateCalss;
}

/**
 * 删除
 * @method getDelete
 * @param {number || bool} num
 * @returns {string}
 * @author: zx
 * @date: 2017.1.11
 */
export const getDelete = (ifDel) => {
  var bool = false;
  if (!(ifDel == '0')) {
    bool = 'disabled';
  }
  return bool;
}
/**
 * 进件查询当前状态转换
 * @method appliChange
 * @date: 2016.11.30
 */
export const appliChange = (num) => {
  if (num == '0') {
    return '未完成';
  } else if (num == '1') {
    return '禁入';
  } else if (num == '2') {
    return '待审核';
  } else if (num == '3') {
    return '审核通过';
  } else if (num == '4') {
    return '审核不通过';
  }else{
    return '无数据';
  }
}
/**
 * 进件查询当前状态颜色转换
 * @method appliColor
 * @date: 2016.11.30
 */
export const appliColor = (num) => {
  var stateCalss = "";
  switch (num) {
    case 0:
      stateCalss = "label-danger";
      break;
    case 1:
      stateCalss = "label-info";
      break;
    case 2:
      stateCalss = "label-primary";
      break;
    case 3:
      stateCalss = "label-warning";
      break;
    case 4:
      stateCalss = "label-success";
      break;
  }
  return stateCalss;
}

/**
 * 审核状态转换
 * @method checkColor
 * @date: 2016.11.30
 */
export const checkStatus = (num) => {
  if (num == '0') {
    return '未审核';
  } else if (num == '1') {
    return '完成审核';
  }else{
    return '无数据';
  }
}
/**
 * 审核状态颜色转换
 * @method checkColor
 * @date: 2016.11.30
 */
export const checkColor = (num) => {
  var stateCalss = "";
  switch (num) {
    case 0:
      stateCalss = "label-danger";
      break;
    case 1:
      stateCalss = "label-success";
      break;
  }
  return stateCalss;
}
/**
 * 客户状态
 * @method reCus
 * @param {number} num
 * @returns {string}
 * @author: zx
 * @date: 2017.2.7
 */
export const reCus = (num) => {
  var reStr = '未填写';
  switch (parseInt(num)) {
    case 0:
      reStr = '正常';
      break;
    case 1:
      reStr = '高风险用户';
      break;
    case 2:
      reStr = '黑名单用户';
      break;
    case 3:
      reStr = '高风险转黑名单审核';
      break;
    case 4:
      reStr = '黑名单转出';
    case 5:
      reStr = '禁用客户';
    case 6:
      reStr = '客户移交中';
  }
  return reStr;
}
/**
 * 客户当前状态颜色转换
 * @method cusColor
 * @date: 2016.11.30
 */
export const cusColor = (num) => {
  var stateCalss = "";
  switch (num) {
    case 0:
      stateCalss = "label-success";
      break;
    case 1:
      stateCalss = "label-danger";
      break;
    case 2:
      stateCalss = "label-default";
      break;
    case 3:
      stateCalss = "label-warning";
      break;
    case 4:
      stateCalss = "label-primary";
      break;
    case 5:
      stateCalss = "label-danger";
      break;
    case 6:
      stateCalss = "label-info";
      break;
    default:
      stateCalss = "label-info";
  }
  return stateCalss;
}
/**
 * 维护类型转换
 * @method getDelete
 * @param {number || bool} num
 * @returns {string}
 * @author: zx
 * @date: 2017.1.11
 */
export const changeMain = (num) => {
  var reStr = '未填写';
  switch (parseInt(num)) {
    case 0:
      reStr = '电话联系';
      break;
    case 1:
      reStr = '上门拜访';
      break;
    case 2:
      reStr = '其他渠道';
      break;
    default:
      reStr = '未填写'
  }
  return reStr;
}

/**
 * 学历参照
 * @method reEdu
 * @param {number} num 学历标识
 * @returns {string}
 * @author: Phoenix ZZ
 * @date: 2016.10.13
 */
export const reEdu = (num) => {
  var reStr = '未填写';
  switch (parseInt(num)) {
    case 0:
      reStr = '文盲';
      break;
    case 1:
      reStr = '小学';
      break;
    case 2:
      reStr = '初中';
      break;
    case 3:
      reStr = '中专';
      break;
    case 4:
      reStr = '高中';
      break;
    case 5:
      reStr = '大专';
      break;
    case 6:
      reStr = '本科';
      break;
    case 7:
      reStr = '硕士';
      break;
    case 8:
      reStr = '博士';
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
export const residenceType = (num) => {
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
export const marriageCondition = (num) => {
  var state = '未填写';
  switch (parseInt(num)) {
    case 0:
      state = '未婚';
      break;
    case 1:
      state = '已婚';
      break;
    case 2:
      state = '离异';
      break;
    case 3:
      state = '未知';
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
export const nationalName = (num) => {
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
 * 转换url
 * @method changeUrl
 * @param {url} url 转换url
 * @returns {string}
 * @author: zx
 * @date: 2017.2.7
 */
export const changeUrl = (fileUrl)=> {
  var str = "";
  //console.log(fileUrl)
  //var strUrl=fileUrl.indexOf('/');
  //var sUrl=fileUrl.substring(strUrl+1);
 var arr = fileUrl.split("/")
   console.log(arr)
   arr[0] = ""
   var newArr = arr
   console.log(newArr)
   var newStr = newArr.join("")
 // str.replace('QK.SERVER_URL'+sUrl);
  str = document.location.protocol +"//"+newStr
  console.log(str)
  //return str;
}
/**
 * 时间戳转字符日期信息
 * @method formatDate
 * @param {number} num 时间戳信息
 * @returns {string}
 * @author: tianym
 * @date: 2016.10.14
 */
export const add0 = (m) => {
  return m < 10 ? '0' + m : m
}
export const formatDate = (num, bool) => {
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

/**
 * 身份证号码转生日日期信息
 * @method reBirtyhday
 * @param {idNumber} idNumber 身份证信息
 * @returns {string}
 * @author: tianym
 * @date: 2016.10.14
 */
export const reBirtyhday = (idNumber)=> {
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

export const messageCname = (parent, msg)=> {
  $("#nameDiv").find(".checkName").removeClass("fa-check").addClass("fa-warning").css("color", "#ed6b75");
  $("#nameDiv").find(".message").css("color", "red").html(msg);
  $("#btn_submit").attr("disabled", "true");
}
/**
 * 客户经理级别显示
 * @method managerLevel
 * @param {number} num 级别嘻嘻你
 * @returns {string}
 * @author: Phoenix ZZ
 * @date: 2016.10.31
 */
export const managerLevel = (num) => {
  if (num == 0) {
    return '客户经理';
  } else if (num == 1) {
    return '高级经理';
  } else if (num == 2) {
    return '主管';
  } else if (num == 3) {
    return '高级主管';
  }
}
//expertLevel
/**
 * 专家水平
 * @method expertLevel
 * @param {number} num 专家水平
 * @returns {string}
 * @author: Phoenix ZZ
 * @date: 2016.10.31
 */
export const expertLevel = (num) => {
  var nationality = '未填写';
  switch (parseInt(num)) {
    case 1:
      nationality = '初级';
      break;
    case 2:
      nationality = '中级';
      break;
    case 3:
      nationality = '高级';
      break;
    default:
      nationality = '未填写'
  }
  return nationality;
}
/*
 * 转义符转换
 * */
export const escape2Html = (str) => {
  var arrEntities = {'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"','middot':'·'};
  return str.replace(/&(lt|gt|nbsp|amp|quot|middot);/ig, function (all, t) {
    return arrEntities[t];
  });
}
//清空对象的value值
export const cleanValue = (obj)=> {
  for (var i in obj) {
    obj[i] = ''
  }
  return obj
}

export const parseFloatOverWrite = (val)=> {
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
