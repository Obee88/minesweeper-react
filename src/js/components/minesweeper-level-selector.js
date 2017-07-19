"use strict";

import React from 'react';


class LevelSelector extends React.Component {

	constructor (props){
		super(props);
	}

	determinePillClassName(choice) {
		if (choice === this.props.selectedChoice) 
			return "active";
		return "";
	}

	doSelection(event){
		var dificulty = event.target.innerHTML;
		this.props.innitGameCallback(dificulty);
	}

	render() {
		let listItems = [];
		let choices = this.props.choices;
		for (var i=0; i<choices.length; ++i)
			listItems.push(
					<li role="presentation" className={this.determinePillClassName(choices[i])} 
						onClick={this.doSelection.bind(this)} >
						<a href="#">{choices[i]}</a>
					</li>
				);
		
		return (
				<ul className="nav nav-pills">
				  {listItems}
				</ul>
			);
	}
}

export default LevelSelector;