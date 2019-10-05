import React from 'react';
import './button.css';
const button = (props)=>{
	//console.log("In button, Value: "+props.buttonValue)
	let classNames = 'button';
	if(props.selected === true){
		classNames = `${classNames} selected`;
	}
	console.log("In button, classNames: "+classNames);
	return(
			<div className='no-margin'>
				<button className={classNames} value={props.buttonValue} onClick={props.buttonClicked}>{props.buttonLabel}</button>
			</div>
		);
}

export default button;