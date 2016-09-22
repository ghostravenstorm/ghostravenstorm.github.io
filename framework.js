
const HIGHLIGHT_FCOLOR = "#000000";
const HIGHLIGHT_BCOLOR = "#00FF00";
const BACKGROUND_COLOR = "#262626";
const BLUE_COLOR       = "#00BBCC";
const PURPLE_COLOR     = "#AA80FF";
const WHITE_COLOR      = "#FFFFFF";
const BLACK_COLOR      = "#000000";
const GRAY_COLOR       = "#777777";


const DEFAULT_COLOR = WHITE_COLOR;


function Button(label, normalColor, parentNode, address){

	var element = document.createElement("A");

	var func;
	var param;

	element.style.cursor = "pointer";
	element.appendChild(document.createTextNode(label));
	parentNode.appendChild(element);

	if(!normalColor)
		normalColor = DEFAULT_COLOR;
	
	element.style.color = "inherit";
	element.style.color = normalColor;
	element.style.textDecoration = "none";

	if(address){
		element.setAttribute('href', address);
		element.setAttribute('target', '_blank');
	}	


	element.onclick = function(){
		buttonFunction();
	}

	element.onmouseenter = function(){
		this.style.color = HIGHLIGHT_FCOLOR;
		this.style.background = HIGHLIGHT_BCOLOR;
	}	

	element.onmouseleave = function(){
		this.style.color = normalColor;
		this.style.background = "transparent";
	}

	var buttonFunction = function(){
		func.apply(this, param);
	}

	this.addFunction = function(functionToAdd, parameters){
		//functions.push(functionToAdd);
		func = functionToAdd;
		param = parameters;
	}

	this.addTo = function(parentNode){
		parentNode.appendChild(element);
	}
}

function TextBlock(text, color, parentNode, width, height){

	if(!text)
		text = "Default stirng";
	if(!color)
		color = "WHITE_COLOR";

	var element = document.createElement("P");

	element.appendChild(document.createTextNode(text));
	element.style.color = color;
	element.style.overflow = "auto";
	element.style.whiteSpace = "pre-wrap";

	if(width)
		element.style.width = width.toString()+"px";
	if(height)
		element.style.height = height.toString()+"px";
	if(parentNode)
		parentNode.appendChild(element);
}

function Container(id, parentNode, width, height){

	var element = document.createElement("DIV");

	element.setAttribute("id", id);

	if(parentNode)
		parentNode.appendChild(element);
	
	if(width)
		element.style.width = width.toString()+"px";
	if(height)
		element.style.height = width.toString()+"px";

	this.setDimensions = function(width, height){
		if(width)
			element.style.width = width.toString()+"px";
		if(height)
			element.style.height = width.toString()+"px";
	}

	this.addThis = function(parentNode){
		parentNode.appendChild(element);
	}

	this.appendChild = function(childNode){
		element.appendChild(childNode);
	}

	this.getElement = function(){
		return element;
	}

	this.clearAllNodes = function(){
		while(element.hasChildNodes())
			element.removeChild(element.lastChild);
	}
}

function IFrame(width, height, address, parentNode){
	if(!address)
		address = "_blank";

	var element = document.createElement("IFRAME");
	element.setAttribute('width', width);
	element.setAttribute('height', height);
	element.setAttribute('scrolling', 'no');
	element.setAttribute('frameborder', 'no');
	element.setAttribute('src', address);

	if(parentNode)
		parentNode.appendChild(element);

	this.getElement = function(){
		return element;
	}

	this.appendTo = function(parentNode){
		parentNode.appendChild(element);
	}
}

function fetchFile(file){

	//Does not work in Chrome with file:/// requests
	//except when actaully running from a websevrer and not locally.

	//concatenate file path with file name
	file = "abouttext/"+file;
	
	var data = new XMLHttpRequest();
	var textData;

	data.open("GET", file, false);

	data.onreadystatechange = function(){
		if(data.readyState === 4){
			if(data.status === 200 || data.status == 0){
				textData = data.responseText;
			}
		}
	}
	data.send(null);
	return textData;
}

function cleanUpChildNodes(rootNode){
	while(rootNode.hasChildNodes())
		rootNode.removeChild(rootNode.lastChild);
}

function addBreak(node){
	node.appendChild(document.createElement("BR"));
}

function addSpace(node){
	node.appendChild(document.createTextNode(" "));
}