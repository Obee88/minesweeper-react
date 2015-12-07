'use strict';

import React from 'react';

class MinesweeperCell extends React.Component {
	/**
		props:
			model 	[MinesweeperCellModel]
			mouse 	[MouseModel]
	*/

	constructor(props){
		super(props);
	}

	determineClassName(){
		var cn = "square "+this.props.model.getState();
		return cn;
	}

	render(){
		var ret = (
			<div className={this.determineClassName()} key={this.props.model.getKey()} 
				data={this.props.model.getKey()}
				onContextMenu={function(e){e.preventDefault();}}
				onMouseDown={this.props.mouse.catchMouseDown}
				onMouseUp={this.props.mouse.catchMouseUp} 
				onMouseOut={this.props.mouse.catchMouseOut}
				onMouseOver={this.props.mouse.catchMouseOver} />
			); 
		return ret;
	}
}

export default MinesweeperCell;