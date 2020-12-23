//////////////////////////////////////////////////////////////////////////////
//
//  WebGL_example_26.js
//
//  Interaction using the keyboard and the mouse
//
//  J. Madeira - November 2015
//
//////////////////////////////////////////////////////////////////////////////


//----------------------------------------------------------------------------
//
// Global Variables
//
var numArrows = 1;

var initialPosPicked = null;

var gl = null; // WebGL context

var shaderProgram = null;

var triangleVertexPositionBuffer = null;

var triangleVertexColorBuffer = null;

//35
var globalAngleXX= 40.0;

//-20
var globalAngleYY = 0.0;

var globalTz = 0.0;

var globalSx= 1.0;

var globalSy= 1.0;

var globalSz= 1.0;

var idxMove= 1;

var moveX= -0.44;

var moveZ= -0.44;

var targetX; var targetZ; var stepX; var stepZ;
// To allow choosing the way of drawing the model triangles

var primitiveType = null;

var startStop = 1;

var addQuantity = 1;

// NEW --- Point Light Source Features

// Directional --- Homogeneous coordinate is ZERO

var pos_Light_Source = [ 0.0, 0.7, 1.5, 0.0 ];

// White light

var int_Light_Source = [ 1.0, 1.0, 1.0 ];

// Low ambient illumination

var ambient_Illumination = [ 0.2, 0.2, 0.2 ];

// NEW --- Model Material Features

// Ambient coef.

var kAmbi = [ 0.2, 0.2, 0.2 ];

// Difuse coef.

var kDiff = [ 1.0, 1.0, 1.0 ];

// Specular coef.

var kSpec = [ 0.7, 0.7, 0.7 ];

// Phong coef.

var nPhong = 100;

//----------------------------------------------------------------------------
//
// The WebGL code
//

//----------------------------------------------------------------------------
//
//  Rendering
//

// Handling the Vertex and the Color Buffers

function initBuffers( model ) {

	// Vertex Coordinates

	triangleVertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(model.vertices), gl.STATIC_DRAW);
	triangleVertexPositionBuffer.itemSize = 3;
	triangleVertexPositionBuffer.numItems =  model.vertices.length / 3;

	// Associating to the vertex shader

	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,
			triangleVertexPositionBuffer.itemSize,
			gl.FLOAT, false, 0, 0);

	// Colors

	triangleVertexColorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexColorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(model.colors), gl.STATIC_DRAW);
	triangleVertexColorBuffer.itemSize = 3;
	triangleVertexColorBuffer.numItems = model.colors.length / 3;

	// Associating to the vertex shader

	gl.vertexAttribPointer(shaderProgram.vertexColorAttribute,
			triangleVertexColorBuffer.itemSize,
			gl.FLOAT, false, 0, 0);
}

//----------------------------------------------------------------------------

//  Drawing the model
function drawModel( model,
					mvMatrix,
					primitiveType ) {
	// The the global model transformation is an input

	// Concatenate with the particular model transformations

    // Pay attention to transformation order !!

	mvMatrix = mult( mvMatrix, translationMatrix( model.tx, model.ty, model.tz ) );

	mvMatrix = mult( mvMatrix, rotationZZMatrix( model.rotAngleZZ ) );

	mvMatrix = mult( mvMatrix, rotationYYMatrix( model.rotAngleYY ) );

	mvMatrix = mult( mvMatrix, rotationXXMatrix( model.rotAngleXX ) );

	mvMatrix = mult( mvMatrix, scalingMatrix( model.sx, model.sy, model.sz ) );

	// Passing the Model View Matrix to apply the current transformation

	var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");

	gl.uniformMatrix4fv(mvUniform, false, new Float32Array(flatten(mvMatrix)));

	// NEW --- Phong Illumination Model

	// TO BE COMPLETED STEP BY STEP !!

	// TEST THE AMBIENT ILLUMINATION FIRST !!

	// Clearing the colors array

	model.colors.splice(0, model.colors.length);

	// Compute the 3 components: AMBIENT, DIFFUSE and SPECULAR

	var ambientTerm = [ 0.0, 0.0, 0.0 ];

	var diffuseTerm = [ 0.0, 0.0, 0.0 ];

	var specularTerm = [ 0.0, 0.0, 0.0 ];

    // INITIALIZE EACH COMPONENT, with the constant terms
    for( var i = 0; i < 3; i++ )
    {
		ambientTerm[i] = kAmbi[i] * ambient_Illumination[i];
		diffuseTerm[i] = kDiff[i] * int_Light_Source[i];
		specularTerm[i] = kSpec[i] * int_Light_Source[i];
    }

    // SMOOTH-SHADING

    // Compute the illumination for every vertex

    // Iterate through the vertices

    for( var vertIndex = 0; vertIndex < model.vertices.length; vertIndex += 3 )
    {
		// For every vertex

		// GET COORDINATES AND NORMAL VECTOR
		// point where illumination point is being calculated

		var auxP = model.vertices.slice(vertIndex, vertIndex + 3 );

		var auxN = model.normals.slice(vertIndex, vertIndex + 3);

        // CONVERT TO HOMOGENEOUS COORDINATES

		auxP.push(1.0);

		auxN.push(0.0);

        // APPLY CURRENT TRANSFORMATION (ROTATION, ETC.) -> IMPORTANT

        var pointP = multiplyPointByMatrix(mvMatrix, auxP);

        var vectorN = multiplyVectorByMatrix(mvMatrix, auxN);

        // NORMALIZE vectorN

		normalize(vectorN);

        // DIFFUSE ILLUMINATION

        // Check if light source is directional or not

        var vectorL = vec3();

		if ( pos_Light_Source[3] == 0.0) {
			// Directional light source
			// Focus at infinite distance -> direction is already given
			vectorL = pos_Light_Source.slice(0, 3);
		}
		else {
			for ( var i = 0 ; i < 3; i++ ) {
				vectorL[i] = pos_Light_Source[i] - pointP[i];
			}
		}

		normalize(vectorL);

        // Compute the dot product

        var cosNL = dotProduct(vectorN, vectorL);

        if (cosNL < 0.0) {
			cosNL = 0.0;		// No direct illumination
		}

        // SEPCULAR ILLUMINATION

		var vectorV = vec3();

		vectorV[2] = 1.0;

		normalize(vectorV);


		var vectorH = add(vectorL, vectorV);

		normalize(vectorH);

		var cosNH = dotProduct(vectorN, vectorH);

		if (cosNH < 0.0 || cosNL <= 0.0 ) {
			cosNH = 0.0;
		}

        // Compute the color values and store in the colors array

		// Copy ambient lighting
		// Copy difuse lighting
		for (var i = 0; i < 3; i++) {
			model.colors[vertIndex + i] = ambientTerm[i];

			model.colors[vertIndex + i] += (diffuseTerm[i] * cosNL);

			model.colors[vertIndex + i] += (specularTerm[i] * Math.pow(cosNH, nPhong));
		}
		model.colors[vertIndex] *= model.originalColors[vertIndex];
		model.colors[vertIndex+1] *= model.originalColors[vertIndex+1];
		model.colors[vertIndex+2] *= model.originalColors[vertIndex+2];


		// Avoid exceeding 1.0
    }

	// Associating the data to the vertex shader

	// This can be done in a better way !!

	// Vertex Coordinates and Vertex Normal Vectors

	initBuffers(model);

	// Drawing the contents of the vertex buffer

	// primitiveType allows drawing as filled triangles / wireframe / vertices

	if( primitiveType == gl.LINE_LOOP ) {

		// To simulate wireframe drawing!

		// No faces are defined! There are no hidden lines!

		// Taking the vertices 3 by 3 and drawing a LINE_LOOP

		var i;

		for( i = 0; i < triangleVertexPositionBuffer.numItems / 3; i++ ) {

			gl.drawArrays( primitiveType, 3 * i, 3 );
		}
	}
	else {

		gl.drawArrays(primitiveType, 0, triangleVertexPositionBuffer.numItems);

	}
}

//----------------------------------------------------------------------------

//  Drawing the 3D scene
function drawScene() {

	if (!initialPosPicked) {
		globalAngleXX = 90;
		globalAngleYY = 0.0;
	}

	var pMatrix;

	var mvMatrix = mat4();

	// Clearing with the background color

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

	// NEW --- Computing the Projection Matrix

	// A standard view volume.

	// Viewer is at (0,0,0)

	// Ensure that the model is "inside" the view volume

	pMatrix = perspective( 45, 1, 0.05, 15 );

	globalTz = -3;

	// Passing the Projection Matrix to apply the current projection

	var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");

	gl.uniformMatrix4fv(pUniform, false, new Float32Array(flatten(pMatrix)));

	mvMatrix = mult( mvMatrix, translationMatrix( 0, 0, globalTz ) );

	mvMatrix = mult( mvMatrix, rotationYYMatrix(globalAngleYY));

	mvMatrix = mult( mvMatrix, rotationXXMatrix(globalAngleXX));

	mvMatrix = mult( mvMatrix, scalingMatrix(globalSx, globalSy, globalSz));
	// NEW --- Instantianting the same model more than once !!

	// And with diferent transformation parameters !!

	// Call the drawModel function !!

	// Instance 1 --- RIGHT TOP

	for(var i = 0; i < 2 ; i++ ) {
		if (i==1 && initialPosPicked || i==0){
			drawModel( sceneModels[i], mvMatrix, primitiveType );
		}
	}

	// Instace Arrows
	for(var i = 2; i < numArrows + 1 ; i++ ) {
		if (i<65){
			drawModel( sceneModels[i], mvMatrix, primitiveType );
		}
	}

	if (idxMove < 65 && idxMove> 0) {
		document.getElementById("moveNumber").innerText = idxMove-1;
	}
}

//----------------------------------------------------------------------------
//
//  NEW --- Animation
//

// Animation --- Updating transformation parameters

var lastTime = 0;
var delay = 0;
var aCords;
function animate() {
	if (document.getElementById("moveSlider").style.display != 'none' && document.getElementById("moveSlider").disabled) {
		document.getElementById("moveSlider").value = idxMove;
	} else {
		if (document.getElementById("moveSlider").value != idxMove) {
			var temp = numArrows;
			for (let a = 0; a < temp; a++) {
				destroyArrow();
			}
			idxMove = parseInt(document.getElementById("moveSlider").value);
			t = getCoordMove(idxMove);
			if (t != null) {
				sceneModels[1].tx = moveX = t[0]*0.125 - 0.44;
				sceneModels[1].tz = moveZ = t[1]*0.125 - 0.44;
				sceneModels[1].ty = 0.08;
				delay = 0;
			}
		}
	}
	if (!initialPosPicked) {
		return;
	}

	var timeNow = new Date().getTime();

	if( lastTime != 0 && startStop==1) {

		var elapsed = timeNow - lastTime;

		if (delay > 0) {
			delay -= elapsed;
			sceneModels[1].ty += 0.002;
		} else if (sceneModels[1].tx.toFixed(3) == moveX && sceneModels[1].tz.toFixed(3) == moveZ && idxMove>= 0 && idxMove <= 65){
			//Fix Small Differences
			sceneModels[1].tx= moveX;
			sceneModels[1].tz= moveZ;
			sceneModels[1].ty = 0.08;
			if ((idxMove == 64 && addQuantity==1) || (idxMove==1 && addQuantity==-1)) {
				idxMove+=addQuantity;
				lastTime = timeNow;
				return;
			} else if ((idxMove == 65 && addQuantity==1) || (idxMove==0 && addQuantity==-1)){
				lastTime = timeNow;
				return;
			} else if((idxMove == 65 && addQuantity==-1) || (idxMove==0 && addQuantity==1)){
				idxMove+= addQuantity;
			}
			aCords= getCoordMove(idxMove+addQuantity);
			targetX= parseFloat((-0.44 + (aCords[0] * 0.5 * sceneModels[0].sx)).toFixed(3));
			targetZ= parseFloat((-0.44 + (aCords[1] * 0.5 * sceneModels[0].sz)).toFixed(3));
			stepX= (targetX - moveX) / 100;
			stepZ= (targetZ - moveZ) / 100;
			idxMove+=addQuantity;
			if (addQuantity == 1){
				drawArrow([moveX, moveZ], [targetX, targetZ]);
			} else {
				destroyArrow();
			}


			moveX= targetX;
			moveZ= targetZ;

			delay = 1000;
		} else if(idxMove <= 64 && idxMove >= 1 && delay <= 0) {
				sceneModels[1].tx += stepX;
				sceneModels[1].tz += stepZ;
				if (sceneModels[1].ty > 0.08) {
					sceneModels[1].ty -= 0.0012;
				}
		}

	}

	lastTime = timeNow;
}

function drawArrow(startPosition, endPosition) {
	numArrows++;
	sceneModels.push( new simpleArrow(startPosition, endPosition, numArrows) );
	sceneModels[numArrows].sx = sceneModels[numArrows].sy = sceneModels[numArrows].sz = 0.25;
	sceneModels[numArrows].ty = 0.15;
}

function destroyArrow(){
	if (sceneModels.length > 2) {
		sceneModels.pop();
		numArrows--;
	}
}

//----------------------------------------------------------------------------

// Handling keyboard events

// Adapted from www.learningwebgl.com

var currentlyPressedKeys = {};

function handleKeys() {

	if (!initialPosPicked) {
			return;
    }

	if (currentlyPressedKeys[33]) {

		// Page Up

		globalSx *= 0.9;

		globalSy= globalSz= globalSx;
	}
	if (currentlyPressedKeys[34]) {

		// Page Down

		globalSx *= 1.1;

		globalSy= globalSz= globalSx;
	}
}

//----------------------------------------------------------------------------

// Handling mouse events

// Adapted from www.learningwebgl.com


var mouseDown = false;

var lastMouseX = null;

var lastMouseY = null;

var selected = [];
var startX = startY = null;
function handleMouseDown(event) {

    mouseDown = true;

    lastMouseX = event.clientX;

	lastMouseY = event.clientY;

	x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;

	var canvas= document.getElementById('my-canvas');
	var rect = event.target.getBoundingClientRect() ;
	//This is mainly to convert the coordinates of the client area to the coordinates of the canvas, and then to the coordinates of the webgl
	x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
	y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);


	if (x < 0.4 && x > -0.4 && y < 0.4 && y > -0.4 && !initialPosPicked) {
		arrayX = Math.floor(x*10+4);
		arrayY = Math.floor(-y*10+4);
		var oldIdx = selected[0];
		for (let i = oldIdx; i < oldIdx+18; i+=3) {
			sceneModels[0].originalColors[i] = selected.pop();
			sceneModels[0].originalColors[i+1] = selected.pop();
			sceneModels[0].originalColors[i+2] = selected.pop();
		}
		selected.pop();
		selected.push(squares[arrayX][arrayY]);
		for (let i = squares[arrayX][arrayY]; i < squares[arrayX][arrayY]+18; i+=3) {
			selected.push(sceneModels[0].originalColors[i]);
			selected.push(sceneModels[0].originalColors[i+1]);
			selected.push(sceneModels[0].originalColors[i+2]);
			sceneModels[0].originalColors[i] = 1.0;
			sceneModels[0].originalColors[i+1] = 1.0;
			sceneModels[0].originalColors[i+2] = 0.6;
		}

		document.getElementById("startButton").disabled = false;
		document.getElementById("startButton").innerText = "Start!";
		startX = arrayX;
		startY = arrayY;
	}
}

function startAlgorithm() {
	document.getElementById("moveSlider").disabled = true;
	idxMove = 1;
	document.getElementById("moveSlider").value = 1;
	var oldIdx = selected[0];
	for (let i = oldIdx; i < oldIdx+18; i+=3) {
		sceneModels[0].originalColors[i] = selected.pop();
		sceneModels[0].originalColors[i+1] = selected.pop();
		sceneModels[0].originalColors[i+2] = selected.pop();
	}
	selected.pop();
	solve(startX,startY);
	initialPosPicked = true;
	document.getElementById("startButton").disabled = true;
	document.getElementById("starter").style.display = "none";
	document.getElementById("display").style.display = "block";
	document.getElementById("on-off-button").style.display = "inline";
	document.getElementById("change-direction").style.display = "inline";
	document.getElementById("reset").style.display = "inline-block";
	document.getElementById("moveSlider").style.display = "inline-block";
	document.getElementById("on-off-button").innerText = "Pause";
	startStop= 1;
	document.getElementById("change-direction").innerText = "Backwards";
	addQuantity= 1;
	sceneModels[1] = new simpleKnightModel();
	sceneModels[1].sx = sceneModels[1].sy= 0.07; sceneModels[1].sz= 0.07;
	sceneModels[1].tx = moveX = startX*0.125 - 0.44;
	sceneModels[1].tz = moveZ = startY*0.125 - 0.44;
	document.getElementById("obj-file").style.display = "inline";
	document.getElementById("obj-text").style.display = "block";
	document.getElementById("scale").style.display = "block";
}

function stopAlgorithm() {
	initialPosPicked = false;
	document.getElementById("startButton").disabled = true;
	document.getElementById("startButton").innerText = "Click on the starting square!";
	document.getElementById("starter").style.display = "inline";
	document.getElementById("display").style.display = "none";
	document.getElementById("on-off-button").style.display = "none";
	document.getElementById("change-direction").style.display = "none";
	document.getElementById("moveSlider").style.display = "none";
	document.getElementById("reset").style.display = "none";
	var tempSize = sceneModels.length;
	for (let i = 2; i < tempSize; i++) {
		destroyArrow();
	}
	document.getElementById("moveSlider").disabled = true;
	document.getElementById("obj-file").value = "";
	document.getElementById("obj-text").style.display = "none";
	document.getElementById("obj-file").style.display = "none";
	document.getElementById("scale").style.display = "none";
	globalSx  = globalSy = globalSz= 1.0;
}

function handleMouseUp(event) {

    mouseDown = false;
}

function handleMouseMove(event, canvas) {

    if (!mouseDown || !initialPosPicked) {
			return;
    }

    // Rotation angles proportional to cursor displacement

    var newX = event.clientX;

		x = event.clientX + document.body.scrollLeft +
              document.documentElement.scrollLeft;
    y = event.clientY + document.body.scrollTop +
              document.documentElement.scrollTop;

		var canvas= document.getElementById('my-canvas');
		var rect = event.target.getBoundingClientRect() ;
	 //This is mainly to convert the coordinates of the client area to the coordinates of the canvas, and then to the coordinates of the webgl
	  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
	  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

    var newY = event.clientY;

    var deltaX = newX - lastMouseX;

		globalAngleYY += radians( 10 * deltaX  );

    var deltaY = newY - lastMouseY;

		globalAngleXX += radians( 10 * deltaY  );

    lastMouseX = newX;
		lastMouseY = newY;

  }
//----------------------------------------------------------------------------

// Timer

function tick() {
	requestAnimFrame(tick);

	// NEW --- Processing keyboard events

	handleKeys();

	drawScene();

	animate();
}




//----------------------------------------------------------------------------
//
//  User Interaction
//

function outputInfos(){

}

//----------------------------------------------------------------------------

function setEventListeners( canvas ){
	
	document.getElementById("obj-file").onchange = function(){
		
		var file = this.files[0];
		
		var reader = new FileReader();
		
		reader.onload = function( progressEvent ){
			
			// Entire file read as a string
			
			// The file lines
			
			var lines = this.result.split('\n');
			
			// The new vertices
			
			var newVertices = [];
			
			// The new normal vectors
			
			var newNormals = [];
			
			// Check every line and store 
    
			for(var line = 0; line < lines.length; line++){
      
				// The tokens/values in each line
    
			    // Separation between tokens is 1 or mode whitespaces
    
			    var tokens = lines[line].split(/\s\s*/);
			    
			    // Array of tokens; each token is a string
			    
			    if( tokens[0] == "v" ) 
			    {
					// For every vertex we have 3 floating point values
			
				    for( j = 1; j < 4; j++ ) {
					
						newVertices.push( parseFloat( tokens[ j ] ) );
					}
				}

			    if( tokens[0] == "vn" ) 
			    {
					// For every normal we have 3 floating point values
			
				    for( j = 1; j < 4; j++ ) {
					
						newNormals.push( parseFloat( tokens[ j ] ) );
					}
				}
			}	
						
			// Assigning to the current model
			
			vertices = newVertices.slice();
			
			normals = newNormals.slice();

			// RESET the transformations - NEED AUXILIARY FUNCTION !!
			
			aux = sceneModels[1]
			sceneModels[1] = new simpleOBJ(vertices, normals);
			sceneModels[1].sx = sceneModels[1].sy = aux.sx;sceneModels[1].sz = aux.sz;
			sceneModels[1].tx = aux.tx;
			sceneModels[1].ty = aux.ty;
			sceneModels[1].tz = aux.tz;
			delay = 0;
		};
		
		// Entire file read as a string
			
		reader.readAsText( file );		
	}

	// NEW ---Handling the mouse

	// From learningwebgl.com

    canvas.onmousedown = handleMouseDown;

    document.onmouseup = handleMouseUp;

    document.onmousemove = handleMouseMove;

    // NEW ---Handling the keyboard

	// From learningwebgl.com

    function handleKeyDown(event) {

        currentlyPressedKeys[event.keyCode] = true;
    }

    function handleKeyUp(event) {

        currentlyPressedKeys[event.keyCode] = false;
    }

	document.onkeydown = handleKeyDown;

    document.onkeyup = handleKeyUp;

	document.getElementById("on-off-button").onclick = function(){

		if (startStop==1){
			document.getElementById("moveSlider").disabled = false;
			document.getElementById("on-off-button").innerText = "Resume";
			startStop= 0;
		} else {
			document.getElementById("moveSlider").disabled = true;
			document.getElementById("on-off-button").innerText = "Pause";
			startStop= 1;
		}
	};

	document.getElementById("change-direction").onclick = function(){

		if (addQuantity==1){
			document.getElementById("change-direction").innerText = "Forwards";
			addQuantity= -1;
		} else {
			document.getElementById("change-direction").innerText = "Backwards";
			addQuantity= 1;
		}
	};
}

//----------------------------------------------------------------------------
//
// WebGL Initialization
//

function initWebGL( canvas ) {
	try {

		// Create the WebGL context

		// Some browsers still need "experimental-webgl"

		gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

		// DEFAULT: The viewport occupies the whole canvas

		// DEFAULT: The viewport background color is WHITE

		// NEW - Drawing the triangles defining the model

		primitiveType = gl.TRIANGLES;

		gl.enable( gl.CULL_FACE );

		gl.cullFace( gl.BACK );

		gl.enable( gl.DEPTH_TEST );

	} catch (e) {
	}
	if (!gl) {
		alert("Could not initialise WebGL, sorry! :-(");
	}
}

//----------------------------------------------------------------------------
function runWebGL() {
	var canvas = document.getElementById("my-canvas");

	initWebGL( canvas );

	shaderProgram = initShaders( gl );

	setEventListeners( canvas );

	tick();		// A timer controls the rendering / animation

	outputInfos();
}
