import React from 'react';

class ComponentPreview extends React.Component {
	/**
		props:
			model	[ModelObject]
	*/

	objectToString(obj){
		if (obj===null) return 'null';
		try{
			return obj.getAttribute("data");
		}catch(e){
			return obj;
		}
	}

	render(){
		var c = this.props.model;
		var properties = Object.keys(c);
		var items = {props : [], functions : []};
		for(var i=0; i<properties.length; i++){
			var property = properties[i];
			var val = c[property];
			var type = typeof val === 'function' ? 'functions' : 'props';
			items[type].push(<li>{property}:{" "}{this.objectToString(val)}</li>);
		}
		try{
			items.props.add(<li>state: {c.getState()}</li>)
		} catch(r){};
		return(
			<div>
				Properties:
				<ul>{items.props}</ul>
				Functions:
				<ul>{items.functions}</ul>
			</div>
		);
	}
}

export default ComponentPreview;