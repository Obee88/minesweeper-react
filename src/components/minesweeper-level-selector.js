import React from 'react';
import { startCase } from 'lodash';
import classNames from 'classnames';
import 'bootstrap/dist/css/bootstrap.css';


class LevelSelector extends React.Component {

	constructor (props){
		super(props);
		this.doSelection = this.doSelection.bind(this);
		this.determineItemClassName = this.determineItemClassName.bind(this);
	}

	determineItemClassName(choice) {
		return classNames('nav-item', { active: choice === this.props.selectedChoice });
	}

	doSelection(dificulty){
		this.props.innitGameCallback(dificulty);
	}

	render() {
		const { choices } = this.props;
		return (
			<nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#e3f2fd' }}>
				<div className="collapse navbar-collapse" id="navbarText">
					<ul className="navbar-nav mr-auto">
					  {choices.map(choice => (
							<li role="presentation" className={this.determineItemClassName(choice)} 
								onClick={() => this.doSelection(choice)} key={choice}>
								<a className="nav-link" href="#">{startCase(choice)}</a>
							</li>
					  ))}
					</ul>
				</div>
			</nav>
			);
	}
}

export default LevelSelector;