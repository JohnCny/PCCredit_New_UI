   /*
   * Template Name: Unify - Responsive Bootstrap Template
   * Author: @qinzhanming
   * Website: http://htmlstream.com
   */
   var ws;
   //websocket连接服务器
   function connect(url) {
            if (!url) {
                alert('Select whether to use W3C WebSocket or SockJS');
                return;
            }
           ws = (url.indexOf('sockjs') != -1) ?
            new SockJS(url, undefined, {protocols_whitelist: transports}) : new WebSocket(url);
            ws.onopen = function () {
                console.log('Info: connection opened.');
            };
            ws.onmessage = function (event) {
            	console.log('Received: ' + event.data);
            	QK.showMessages(event.data);
            };
            ws.onclose = function (event) {
                console.log('Info: connection closed.');
                console.log(event);
            };
        }
        //取消websocket服务器
        function disconnect() {
            if (ws != null) {
                ws.close();
                ws = null;
            }
            console.log('Info: dis connection closed.');
        }

