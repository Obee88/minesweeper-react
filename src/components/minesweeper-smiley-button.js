import React from 'react';

class MinesweeperSmileyButton extends React.Component {
	/**
		props:
			model: 	[SmileyButtonModel]
			margin: [int] 
	*/

	constructor(props){
		super(props);
		this.getStyles = this.getStyles.bind(this);
	}

	getStyles(){
		const { margin } = this.props;
		return {
			"marginLeft": `${margin}px`,
			"marginRight": `${margin}px`,
			"marginTop": "3px",
			"marginBottom": "3px"
		};
	}

	render(){
		return (
			<div style={{'backgroundImage':'none'}}>
				<div id="smiley"
					className={this.props.model.getState()} style={this.getStyles()}
					onMouseDown={this.props.model.onMouseDown}
					onMouseUp={this.props.model.onMouseUp}
					onMouseOut={this.props.model.onMouseOut}
				/>
			</div>
		);
	}
}

export default MinesweeperSmileyButton;