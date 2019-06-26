;(function(window){
	var QcountDown=function(target,callback,finish){
		// callback=callback||function(){}; 
		// finish=finish||function(){}; 
		// this.timer=null;
		// this.restart = this.init();
		// this.restart();
		this.fns = [];
	};
	QcountDown.prototype={
		constructor: QcountDown,
		init:function(target,callback,finish){

				var newDate = +new Date();
				var targetTime= + parseDateString(target);
				var dur =  Math.ceil((targetTime-newDate) / 1000);
				var newValue,oldValue;
				var restart;
				this.date = {
							'D': "00",
							'H': "00",
							"M": "00",
							'S': "00",
						};
				var _this=this;
					this.restart = function(){
						clearInterval(_this.timer);
						_this.timer=setInterval(function(){
						if(dur > 0){
						newDate = +new Date();
						dur = Math.ceil((targetTime-newDate) / 1000);
						newValue= dur % 60;
						if(newValue!=oldValue){
						_this.date.S = _this.zero(newValue);
						_this.date.M = Math.floor((dur / 60)) > 0? _this.zero(Math.floor((dur / 60)) % 60) : "00";
						_this.date.H = Math.floor((dur / 3600)) > 0? _this.zero(Math.floor((dur / 3600)) % 24) : "00";
						_this.date.D = Math.floor((dur / 86400)) > 0? _this.zero(Math.floor((dur / 86400)) ) : "00";
						
						_this.update2(_this.date);
						oldValue=newValue;
						}
						}else{
								_this.update2(_this.date);
								_this.finish2(_this.date);

								_this.timeGo();
								clearInterval(_this.timer);
							}
					},100)	;
					}
					this.restart();
					return this;
				},

		zero:function(n){
			var n = parseInt(n, 10);
			if(n > 0){
				if(n <= 9){
					n = "0" + n;	
				}
				return String(n);
			}else{
				return "00";	
			}
		},
		finish:function(fn){
			
				 this.finish2 = fn; 
				 return this;
		},
		finish2:function(fn){},
		span:function (num) {
		 	 if (num < 10) {
                        num = "<span>0</span><span>" + num%10+"</span>";
                    }
                    else{
                        num = "<span>"+  parseInt(num/10) +"</span><span>" + num%10+"</span>";
                    }
                    return num;
		 },
		 stop:function(){
		 	clearInterval(this.timer);
		 },
		 update:function(fn){
		 		if( typeof fn =='function'){
				 this.update2 = fn;
		 		}
		 		return this;
		 },
		 update2:function(fn){},
		 then:function(fn){
		 		if( typeof fn =='function'){
		 			this.fns.push(fn);
		 		}
		 		return this;
		 },
		 timeGo:function(){
		 		var fn =this.fns.shift();
		 		if( typeof fn =='function'){
		 			setTimeout(fn,0)
		 		}
		 	
		 }
	}
	window.QcountDown=QcountDown;
	var matchers = [];
    matchers.push(/^[0-9]*$/.source);
    matchers.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source);
    matchers.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source);
    matchers = new RegExp(matchers.join("|"));
	function parseDateString(dateString) {
        if (dateString instanceof Date) {
            return dateString;
        }
        if (String(dateString).match(matchers)) {
            if (String(dateString).match(/^[0-9]*$/)) {
                dateString = Number(dateString);
            }
            if (String(dateString).match(/\-/)) {
                dateString = String(dateString).replace(/\-/g, "/");
            }
            return new Date(dateString);
        } else {
            throw new Error("Couldn't cast `" + dateString + "` to a date object.");
        }
    }
})(window);