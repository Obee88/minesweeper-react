import React from 'react';

class MinesweeperCell extends React.Component {
	/**
		props:
			model 	[MinesweeperCellModel]
			mouse 	[MouseModel]
	*/

	determineClassName(){
		return `square ${this.props.model.getState()}`;
	}

	render(){
		const {
			model,
			mouse,
		} = this.props;
		return (
			<div className={this.determineClassName()} key={model.getKey()} 
				data={model.getKey()}
				onContextMenu={e => {e.preventDefault();}}
				onMouseDown={mouse.catchMouseDown}
				onMouseUp={mouse.catchMouseUp} 
				onMouseOut={mouse.catchMouseOut}
				onMouseOver={mouse.catchMouseOver} />
		); 
	}
}

export default MinesweeperCell;