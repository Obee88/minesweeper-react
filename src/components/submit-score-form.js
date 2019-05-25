import React from 'react';

class SubmitScoreForm extends React.Component {
	/**
		props:
			gameStatus: 			[string] 
			currentTimeGetter: 		[function]
			worstScore: 			[int]
			submitScoreCallback: 	[function]
	*/
	constructor(props){
		super(props);
		this.state = {
			enteredName: "anonymous"
		};
	}

	getWorstTime(){
		if(typeof this.props.worstScore==='undefined')
			return 999;
		return this.props.worstScore["time"];
	}

	submitName(e){
		var name = this.state.enteredName;
		var time = this.props.currentTimeGetter();
		this.props.submitScoreCallback(name, time);
	}

	onNameTextboxChanged(e){
		var value = e.target.value;
		if (value.length<=10){
			this.setState({enteredName:value});
		}
	}

	render(){
		var content = "";

		if (this.props.gameStatus==="win"  && this.props.currentTimeGetter() <= this.getWorstTime.bind(this)() ){
			content = (
				<div className="well submit-form-msw">
					<div className="row">
						<div className="col-xs-2" />
						<div className="col-xs-8">
							<h2>Congratulations!</h2>
						</div>
						<div className="col-xs-2" />
					</div>
					<div className="row" style={{"margin-bottom":"10px"}}>
						<div className="col-xs-4">
							name: 
						</div>
						<div className="col-xs-2">
						</div>
						<div className="col-xs-4">
							<input type="text" onChange={this.onNameTextboxChanged.bind(this)} value={this.state.enteredName} />
						</div>
						<div className="col-xs-2" />
					</div>	
					<div className="row">
						<div className="col-xs-4">
						</div>
						<div className="col-xs-2">
						</div>
						<div className="col-xs-4">
							<button className="btn btn-sm btn-success" onClick={this.submitName.bind(this)}>publish</button>
						</div>
						<div className="col-xs-2" />
					</div>	
				</div>
				);
		}

		return (
			<div>
				{content}
			</div>
		);
	}
}

export default SubmitScoreForm;