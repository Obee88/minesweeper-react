var Oc = {
	e: function(t, n){
		var s = this.m(this.y,this.vls(n), t);
		var sb = "", tpd=t%10;
        if (tpd ==0) {tpd=10;}
		console.log("s= " +s)
		for(var i=0; i<s.length;i++){
			var c = s.charAt(i);
			var nc="";
			if(i%3==1){
				var x = s.charCodeAt(i);
				console.log("x="+x);
				nc = String.fromCharCode(x+x%tpd);
			} else if(i%3==2){
				var x = s.charCodeAt(i);
				console.log("x="+x);
				nc = String.fromCharCode(x-x%tpd);
			}
			sb+=nc;
		}
		return sb;
	},

	vls: function(s){
		var sb="";
		for (var i=0;i<s.length;i++){
			var c = s.charCodeAt(i);
			if (c>80 && c<118){
				sb+=String.fromCharCode(c);
			}
		}
		return sb;
	},

	m: function(y,v,t){
		var sb = "";
		for(var i=0;i<y.length+v.length+t.toString().length;i++){
			sb+=this.ca(i,y)+this.ca(i,v)+this.ca(i,t);
		}
		return sb;
	},

	ca:function(i,r){
		r=r.toString();
		if(i>=r.length)
			return "";
		return r.charAt(i);
	},
	y:"some key"
}

export default Oc;