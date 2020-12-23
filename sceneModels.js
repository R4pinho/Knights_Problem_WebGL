//////////////////////////////////////////////////////////////////////////////
//
//  For instantiating the scene models.
//
//  J. Madeira - November 2018
//
//////////////////////////////////////////////////////////////////////////////

//----------------------------------------------------------------------------
//
//  Constructors
//


function emptyModelFeatures() {

	// EMPTY MODEL

	this.vertices = [];

	this.normals = [];

	this.originalColors = [];

	this.colors= [];

	// Transformation parameters

	// Displacement vector

	this.tx = 0.0;

	this.ty = 0.0;

	this.tz = 0.0;

	// Rotation angles

	this.rotAngleXX = 0.0;

	this.rotAngleYY = 0.0;

	this.rotAngleZZ = 0.0;

	// Scaling factors

	this.sx = 1.0;

	this.sy = 1.0;

	this.sz = 1.0;

	// Animation controls

	this.rotXXOn = false;

	this.rotYYOn = false;

	this.rotZZOn = false;

	this.rotXXSpeed = 1.0;

	this.rotYYSpeed = 1.0;

	this.rotZZSpeed = 1.0;

	this.rotXXDir = 1;

	this.rotYYDir = 1;

	this.rotZZDir = 1;

	// Material features

	this.kAmbi = [ 0.2, 0.2, 0.2 ];

	this.kDiff = [ 0.7, 0.7, 0.7 ];

	this.kSpec = [ 0.7, 0.7, 0.7 ];

	this.nPhong = 100;

}

var squares = Array.from(Array(8), () => new Array(8));
function simpleBoardModel( ) {

	var board = new emptyModelFeatures();

	var idxX = idxY = 0;

	var h= 0.1;
	var l= 0.5;

	for (let x=0; x<10; x++){
		for (let z=0; z<10; z++){
			if (x==0 || x==9 || z==0 || z==9) {
				board.vertices.push(
		 			-(l/2) + (x*l-4.5*l), -h,  (l/2) + (z*l-4.5*l),
		 			 (l/2) + (x*l-4.5*l), -h,  (l/2) + (z*l-4.5*l),
		 			 (l/2) + (x*l-4.5*l),  h,  (l/2) + (z*l-4.5*l),
		 			 (l/2) + (x*l-4.5*l),  h,  (l/2) + (z*l-4.5*l),
		 			-(l/2) + (x*l-4.5*l),  h,  (l/2) + (z*l-4.5*l),
		 			-(l/2) + (x*l-4.5*l), -h,  (l/2) + (z*l-4.5*l),
		 			// TOP FACE
		 			-(l/2) + (x*l-4.5*l),  h,  (l/2) + (z*l-4.5*l),
		 			 (l/2) + (x*l-4.5*l),  h,  (l/2) + (z*l-4.5*l),
		 			 (l/2) + (x*l-4.5*l),  h, -(l/2) + (z*l-4.5*l),
		 			 (l/2) + (x*l-4.5*l),  h, -(l/2) + (z*l-4.5*l),
		 			-(l/2) + (x*l-4.5*l),  h, -(l/2) + (z*l-4.5*l),
		 			-(l/2) + (x*l-4.5*l),  h,  (l/2) + (z*l-4.5*l),
		 			// BOTTOM FACE
		 			-(l/2) + (x*l-4.5*l), -h, -(l/2) + (z*l-4.5*l),
		 			 (l/2) + (x*l-4.5*l), -h, -(l/2) + (z*l-4.5*l),
		 			 (l/2) + (x*l-4.5*l), -h,  (l/2) + (z*l-4.5*l),
		 			 (l/2) + (x*l-4.5*l), -h,  (l/2) + (z*l-4.5*l),
		 			-(l/2) + (x*l-4.5*l), -h,  (l/2) + (z*l-4.5*l),
		 			-(l/2) + (x*l-4.5*l), -h, -(l/2) + (z*l-4.5*l),
		 			// LEFT FACE
		 			-(l/2) + (x*l-4.5*l),  h,  (l/2) + (z*l-4.5*l),
		 			-(l/2) + (x*l-4.5*l), -h, -(l/2) + (z*l-4.5*l),
		 			-(l/2) + (x*l-4.5*l), -h,  (l/2) + (z*l-4.5*l),
		 			-(l/2) + (x*l-4.5*l),  h,  (l/2) + (z*l-4.5*l),
		 			-(l/2) + (x*l-4.5*l),  h, -(l/2) + (z*l-4.5*l),
		 			-(l/2) + (x*l-4.5*l), -h, -(l/2) + (z*l-4.5*l),
		 			// RIGHT FACE
		 			 (l/2) + (x*l-4.5*l),  h, -(l/2) + (z*l-4.5*l),
		 			 (l/2) + (x*l-4.5*l), -h,  (l/2) + (z*l-4.5*l),
		 			 (l/2) + (x*l-4.5*l), -h, -(l/2) + (z*l-4.5*l),
		 			 (l/2) + (x*l-4.5*l),  h, -(l/2) + (z*l-4.5*l),
		 			 (l/2) + (x*l-4.5*l),  h,  (l/2) + (z*l-4.5*l),
		 			 (l/2) + (x*l-4.5*l), -h,  (l/2) + (z*l-4.5*l),
		 			// BACK FACE
		 			-(l/2) + (x*l-4.5*l),  h, -(l/2) + (z*l-4.5*l),
		 			 (l/2) + (x*l-4.5*l), -h, -(l/2) + (z*l-4.5*l),
		 			-(l/2) + (x*l-4.5*l), -h, -(l/2) + (z*l-4.5*l),
		 			-(l/2) + (x*l-4.5*l),  h, -(l/2) + (z*l-4.5*l),
		 			 (l/2) + (x*l-4.5*l),  h, -(l/2) + (z*l-4.5*l),
		 			 (l/2) + (x*l-4.5*l), -h, -(l/2) + (z*l-4.5*l));
				 board.colors.push(
					 0.70,  0.50,  0.30,
					 0.70,  0.50,  0.30,
					 0.70,  0.50,  0.30,
					 0.70,  0.50,  0.30,
					 0.70,  0.50,  0.30,
					 0.70,  0.50,  0.30,
					 0.70,  0.50,  0.30,
					 0.70,  0.50,  0.30,
					 0.70,  0.50,  0.30,
					 0.70,  0.50,  0.30,
					 0.70,  0.50,  0.30,
					 0.70,  0.50,  0.30,
					 0.70,  0.50,  0.30,
					 0.70,  0.50,  0.30,
					 0.70,  0.50,  0.30,
					 0.70,  0.50,  0.30,
					 0.70,  0.50,  0.30,
					 0.70,  0.50,  0.30,
					 0.70,  0.50,  0.30,
					 0.70,  0.50,  0.30,
					 0.70,  0.50,  0.30,
					 0.70,  0.50,  0.30,
					 0.70,  0.50,  0.30,
					 0.70,  0.50,  0.30,
					 0.70,  0.50,  0.30,
					 0.70,  0.50,  0.30,
					 0.70,  0.50,  0.30,
					 0.70,  0.50,  0.30,
					 0.70,  0.50,  0.30,
					 0.70,  0.50,  0.30,
					 0.70,  0.50,  0.30,
					 0.70,  0.50,  0.30,
					 0.70,  0.50,  0.30,
					 0.70,  0.50,  0.30,
					 0.70,  0.50,  0.30,
					 0.70,  0.50,  0.30,
				 );
			 }
			 else {
				 board.vertices.push(
		 			// TOP FACE
		 			-(l/2) + (x*l-4.5*l),  h,  (l/2) + (z*l-4.5*l),
		 			 (l/2) + (x*l-4.5*l),  h,  (l/2) + (z*l-4.5*l),
		 			 (l/2) + (x*l-4.5*l),  h, -(l/2) + (z*l-4.5*l),
		 			 (l/2) + (x*l-4.5*l),  h, -(l/2) + (z*l-4.5*l),
		 			-(l/2) + (x*l-4.5*l),  h, -(l/2) + (z*l-4.5*l),
		 			-(l/2) + (x*l-4.5*l),  h,  (l/2) + (z*l-4.5*l),
		 			// BOTTOM FACE
		 			-(l/2) + (x*l-4.5*l), -h, -(l/2) + (z*l-4.5*l),
		 			 (l/2) + (x*l-4.5*l), -h, -(l/2) + (z*l-4.5*l),
		 			 (l/2) + (x*l-4.5*l), -h,  (l/2) + (z*l-4.5*l),
		 			 (l/2) + (x*l-4.5*l), -h,  (l/2) + (z*l-4.5*l),
		 			-(l/2) + (x*l-4.5*l), -h,  (l/2) + (z*l-4.5*l),
		 			-(l/2) + (x*l-4.5*l), -h, -(l/2) + (z*l-4.5*l));
				 squares[idxX][idxY] = board.colors.length;
				 if (idxY == 7) {
					idxY = 0;
					idxX += 1;
				 } else {
					idxY++;
				 }
				 if((x%2 ==0 && z%2==0) || (x%2 ==1 && z%2==1) ) {
					 board.colors.push(
						 1.00, 1.00, 1.00,
						 1.00, 1.00, 1.00,
						 1.00, 1.00, 1.00,
						 1.00, 1.00, 1.00,
						 1.00, 1.00, 1.00,
						 1.00, 1.00, 1.00,
					 );
				 } else {
					 board.colors.push(
						 0.00,  0.00,  0.00,
						 0.00,  0.00,  0.00,
						 0.00,  0.00,  0.00,
						 0.00,  0.00,  0.00,
						 0.00,  0.00,  0.00,
						 0.00,  0.00,  0.00,
					 );
				 }
				 board.colors.push(
					0.70,  0.50,  0.30,
					0.70,  0.50,  0.30,
					0.70,  0.50,  0.30,
					0.70,  0.50,  0.30,
					0.70,  0.50,  0.30,
					0.70,  0.50,  0.30,
				 );
			 }
		}
	}

	board.originalColors = [...board.colors];
	computeVertexNormals( board.vertices, board.normals );
	return board;
}

function simpleKnightModel(){
		var knight = new emptyModelFeatures();

		knight.vertices= [-0.35, -0.48, -0.25, -0.47, -0.5, -0.25, -0.35, -0.48, 0.25, -0.47, -0.5, -0.25, -0.47, -0.5, 0.25, -0.35, -0.48, 0.25, -0.48, -0.62, -0.25, -0.63, -0.73, -0.25, -0.48, -0.62, 0.25, -0.63, -0.73, -0.25, -0.63, -0.73, 0.25, -0.48, -0.62, 0.25, -0.47, -0.5, -0.25, -0.5, -0.54, -0.25, -0.47, -0.5, 0.25, -0.5, -0.54, -0.25, -0.5, -0.54, 0.25, -0.47, -0.5, 0.25, 0.37, 0.55, -0.25, 0.37, 0.55, 0.25, 0.63, 0.32, 0.25, 0.63, 0.32, -0.25, 0.37, 0.55, -0.25, 0.63, 0.32, 0.25, 0.63, 0.32, -0.25, 0.63, 0.32, 0.25, 0.46, 0.16, -0.25, 0.46, 0.16, -0.25, 0.63, 0.32, 0.25, 0.46, 0.16, 0.25, 0.27, 0.72, 0.25, 0.37, 0.55, 0.25, 0.27, 0.72, -0.25, 0.37, 0.55, -0.25, 0.27, 0.72, -0.25, 0.37, 0.55, 0.25, 0.22, 0.2, -0.25, 0.28, 0.25, -0.25, 0.22, 0.2, 0.25, 0.28, 0.25, -0.25, 0.28, 0.25, 0.25, 0.22, 0.2, 0.25, 0.07, 0.1, -0.25, 0.05, 0.25, -0.25, 0.07, 0.1, 0.25, 0.05, 0.25, -0.25, 0.05, 0.25, 0.25, 0.07, 0.1, 0.25, 0.19, -0.05, -0.25, 0.07, 0.1, -0.25, 0.07, 0.1, 0.25, 0.19, -0.05, -0.25, 0.07, 0.1, 0.25, 0.19, -0.05, 0.25, 0.31, -0.2, -0.25, 0.19, -0.05, -0.25, 0.19, -0.05, 0.25, 0.31, -0.2, 0.25, 0.31, -0.2, -0.25, 0.19, -0.05, 0.25, 0.4, -0.35, -0.25, 0.31, -0.2, -0.25, 0.31, -0.2, 0.25, 0.4, -0.35, 0.25, 0.4, -0.35, -0.25, 0.31, -0.2, 0.25, 0.42, -0.48, -0.25, 0.4, -0.35, -0.25, 0.4, -0.35, 0.25, 0.42, -0.48, 0.25, 0.42, -0.48, -0.25, 0.4, -0.35, 0.25, 0.54, -0.5, -0.25, 0.42, -0.48, -0.25, 0.42, -0.48, 0.25, 0.54, -0.5, 0.25, 0.54, -0.5, -0.25, 0.42, -0.48, 0.25, 0.57, -0.54, -0.25, 0.54, -0.5, -0.25, 0.54, -0.5, 0.25, 0.57, -0.54, 0.25, 0.57, -0.54, -0.25, 0.54, -0.5, 0.25, 0.55, -0.62, -0.25, 0.57, -0.54, -0.25, 0.57, -0.54, 0.25, 0.55, -0.62, -0.25, 0.57, -0.54, -0.25, 0.57, -0.54, 0.25, 0.55, -0.62, 0.25, 0.55, -0.62, -0.25, 0.57, -0.54, 0.25, 0.7, -0.73, -0.25, 0.55, -0.62, -0.25, 0.55, -0.62, 0.25, 0.7, -0.73, 0.25, 0.7, -0.73, -0.25, 0.55, -0.62, 0.25, 0.72, -0.8, -0.25, 0.7, -0.73, -0.25, 0.7, -0.73, 0.25, 0.72, -0.8, 0.25, 0.72, -0.8, -0.25, 0.7, -0.73, 0.25, 0.73, -0.92, -0.25, 0.72, -0.8, -0.25, 0.72, -0.8, 0.25, 0.73, -0.92, 0.25, 0.73, -0.92, -0.25, 0.72, -0.8, 0.25, 0.27, 0.72, -0.25, 0.07, 0.75, -0.25, 0.27, 0.72, 0.25, 0.07, 0.75, -0.25, 0.07, 0.75, 0.25, 0.27, 0.72, 0.25, 0.46, 0.16, -0.25, 0.46, 0.16, 0.25, 0.28, 0.25, -0.25, 0.28, 0.25, -0.25, 0.46, 0.16, 0.25, 0.28, 0.25, 0.25, 0.15, 0.2, -0.25, 0.22, 0.2, -0.25, 0.22, 0.2, 0.25, 0.15, 0.2, 0.25, 0.15, 0.2, -0.25, 0.22, 0.2, 0.25, 0.07, 0.25, -0.25, 0.15, 0.2, -0.25, 0.15, 0.2, 0.25, 0.07, 0.25, 0.25, 0.07, 0.25, -0.25, 0.15, 0.2, 0.25, 0.07, 0.25, 0.25, 0.05, 0.25, -0.25, 0.07, 0.25, -0.25, 0.07, 0.25, 0.25, 0.05, 0.25, 0.25, 0.05, 0.25, -0.25, 0.07, 0.95, -0.25, -0.06, 0.85, -0.25, 0.07, 0.95, 0.25, 0.07, 0.95, 0.25, -0.06, 0.85, -0.25, -0.06, 0.85, 0.25, -0.14, 0.75, 0.25, -0.06, 0.85, 0.25, -0.06, 0.85, -0.25, -0.14, 0.75, 0.25, -0.06, 0.85, -0.25, -0.14, 0.75, -0.25, -0.14, 0.75, -0.25, -0.35, 0.65, -0.25, -0.14, 0.75, 0.25, -0.35, 0.65, -0.25, -0.35, 0.65, 0.25, -0.14, 0.75, 0.25, -0.35, 0.65, -0.25, -0.42, 0.55, -0.25, -0.35, 0.65, 0.25, -0.42, 0.55, -0.25, -0.42, 0.55, 0.25, -0.35, 0.65, 0.25, -0.42, 0.55, -0.25, -0.48, 0.45, -0.25, -0.42, 0.55, 0.25, -0.48, 0.45, -0.25, -0.48, 0.45, 0.25, -0.42, 0.55, 0.25, -0.48, 0.45, -0.25, -0.52, 0.25, -0.25, -0.48, 0.45, 0.25, -0.52, 0.25, -0.25, -0.52, 0.25, 0.25, -0.48, 0.45, 0.25, -0.52, 0.25, -0.25, -0.52, 0.1, -0.25, -0.52, 0.25, 0.25, -0.52, 0.1, 0.25, -0.52, 0.25, 0.25, -0.52, 0.1, -0.25, -0.52, 0.1, -0.25, -0.48, -0.05, -0.25, -0.52, 0.1, 0.25, -0.48, -0.05, -0.25, -0.48, -0.05, 0.25, -0.52, 0.1, 0.25, -0.48, -0.05, -0.25, -0.42, -0.2, -0.25, -0.48, -0.05, 0.25, -0.42, -0.2, -0.25, -0.42, -0.2, 0.25, -0.48, -0.05, 0.25, -0.42, -0.2, -0.25, -0.37, -0.35, -0.25, -0.42, -0.2, 0.25, -0.37, -0.35, -0.25, -0.37, -0.35, 0.25, -0.42, -0.2, 0.25, -0.37, -0.35, -0.25, -0.35, -0.48, -0.25, -0.37, -0.35, 0.25, -0.35, -0.48, -0.25, -0.35, -0.48, 0.25, -0.37, -0.35, 0.25, -0.5, -0.54, -0.25, -0.48, -0.62, -0.25, -0.5, -0.54, 0.25, -0.48, -0.62, -0.25, -0.48, -0.62, 0.25, -0.5, -0.54, 0.25, -0.63, -0.73, -0.25, -0.65, -0.8, -0.25, -0.63, -0.73, 0.25, -0.65, -0.8, -0.25, -0.65, -0.8, 0.25, -0.63, -0.73, 0.25, -0.65, -0.8, -0.25, -0.66, -0.92, -0.25, -0.65, -0.8, 0.25, -0.66, -0.92, -0.25, -0.66, -0.92, 0.25, -0.65, -0.8, 0.25, 0.07, 0.95, -0.25, 0.07, 0.95, 0.25, 0.07, 0.75, 0.25, 0.07, 0.75, -0.25, 0.07, 0.95, -0.25, 0.07, 0.75, 0.25, 0.73, -0.92, 0.25, -0.66, -0.92, 0.25, -0.66, -0.92, -0.25, 0.73, -0.92, -0.25, 0.73, -0.92, 0.25, -0.66, -0.92, -0.25, 0.63, 0.32, -0.25, 0.46, 0.16, -0.25, 0.28, 0.25, -0.25, 0.28, 0.25, -0.25, 0.37, 0.55, -0.25, 0.63, 0.32, -0.25, 0.37, 0.55, -0.25, 0.28, 0.25, -0.25, 0.07, 0.75, -0.25, 0.07, 0.75, -0.25, 0.27, 0.72, -0.25, 0.27, 0.55, -0.25, 0.27, 0.55, -0.25, 0.27, 0.72, -0.25, 0.37, 0.55, -0.25, 0.07, 0.75, -0.25, 0.28, 0.25, -0.25, 0.22, 0.2, -0.25, 0.07, 0.75, -0.25, 0.22, 0.2, -0.25, 0.15, 0.2, -0.25, 0.07, 0.75, -0.25, 0.15, 0.2, -0.25, 0.07, 0.25, -0.25, -0.52, 0.25, -0.25, 0.07, 0.95, -0.25, 0.07, 0.25, -0.25, -0.06, 0.85, -0.25, 0.07, 0.95, -0.25, -0.01, 0.85, -0.25, -0.01, 0.85, -0.25, -0.14, 0.75, -0.25, -0.06, 0.85, -0.25, -0.01, 0.85, -0.25, -0.03, 0.75, -0.25, -0.14, 0.75, -0.25, -0.52, 0.25, -0.25, -0.48, 0.45, -0.25, -0.35, 0.45, -0.25, -0.48, 0.45, -0.25, -0.42, 0.55, -0.25, -0.35, 0.45, -0.25, -0.35, 0.65, -0.25, -0.35, 0.45, -0.25, -0.42, 0.55, -0.25, -0.35, 0.65, -0.25, -0.1, 0.75, -0.25, -0.35, 0.45, -0.25, -0.35, 0.65, -0.25, -0.14, 0.75, -0.25, -0.1, 0.75, -0.25, -0.52, 0.25, -0.25, 0.07, 0.25, -0.25, -0.52, 0.1, -0.25, 0.05, 0.25, -0.25, 0.07, 0.1, -0.25, -0.52, 0.1, -0.25, -0.52, 0.1, -0.25, 0.07, 0.1, -0.25, -0.48, -0.05, -0.25, -0.48, -0.05, -0.25, 0.07, 0.1, -0.25, 0.19, -0.05, -0.25, -0.48, -0.05, -0.25, 0.19, -0.05, -0.25, -0.42, -0.2, -0.25, 0.19, -0.05, -0.25, 0.31, -0.2, -0.25, -0.42, -0.2, -0.25, -0.42, -0.2, -0.25, 0.31, -0.2, -0.25, -0.37, -0.35, -0.25, -0.37, -0.35, -0.25, 0.31, -0.2, -0.25, 0.4, -0.35, -0.25, -0.37, -0.35, -0.25, 0.4, -0.35, -0.25, -0.35, -0.48, -0.25, 0.4, -0.35, -0.25, 0.42, -0.48, -0.25, -0.35, -0.48, -0.25, 0.42, -0.48, -0.25, -0.35, -0.92, -0.25, -0.35, -0.48, -0.25, -0.35, -0.92, -0.25, 0.42, -0.48, -0.25, 0.42, -0.92, -0.25, -0.35, -0.92, -0.25, -0.66, -0.92, -0.25, -0.35, -0.48, -0.25, -0.45, -0.62, -0.25, -0.66, -0.92, -0.25, -0.65, -0.8, -0.25, -0.45, -0.62, -0.25, -0.65, -0.8, -0.25, -0.63, -0.73, -0.25, -0.45, -0.62, -0.25, -0.63, -0.73, -0.25, -0.48, -0.62, -0.25, -0.48, -0.62, -0.25, -0.5, -0.54, -0.25, -0.45, -0.62, -0.25, -0.47, -0.5, -0.25, -0.45, -0.62, -0.25, -0.5, -0.54, -0.25, -0.35, -0.48, -0.25, -0.45, -0.62, -0.25, -0.47, -0.5, -0.25, 0.42, -0.48, -0.25, 0.73, -0.92, -0.25, 0.42, -0.92, -0.25, 0.52, -0.62, -0.25, 0.72, -0.8, -0.25, 0.73, -0.92, -0.25, 0.52, -0.62, -0.25, 0.7, -0.73, -0.25, 0.72, -0.8, -0.25, 0.52, -0.62, -0.25, 0.55, -0.62, -0.25, 0.7, -0.73, -0.25, 0.52, -0.62, -0.25, 0.57, -0.54, -0.25, 0.55, -0.62, -0.25, 0.52, -0.62, -0.25, 0.54, -0.5, -0.25, 0.57, -0.54, -0.25, 0.52, -0.62, -0.25, 0.42, -0.48, -0.25, 0.54, -0.5, -0.25, 0.28, 0.25, 0.25, 0.46, 0.16, 0.25, 0.63, 0.32, 0.25, 0.28, 0.25, 0.25, 0.63, 0.32, 0.25, 0.37, 0.55, 0.25, 0.28, 0.25, 0.25, 0.37, 0.55, 0.25, 0.07, 0.75, 0.25, 0.07, 0.75, 0.25, 0.27, 0.55, 0.25, 0.27, 0.72, 0.25, 0.27, 0.72, 0.25, 0.27, 0.55, 0.25, 0.37, 0.55, 0.25, 0.07, 0.75, 0.25, 0.22, 0.2, 0.25, 0.28, 0.25, 0.25, 0.07, 0.75, 0.25, 0.15, 0.2, 0.25, 0.22, 0.2, 0.25, 0.07, 0.75, 0.25, 0.07, 0.25, 0.25, 0.15, 0.2, 0.25, -0.52, 0.25, 0.25, 0.07, 0.25, 0.25, 0.07, 0.95, 0.25, -0.06, 0.85, 0.25, -0.01, 0.85, 0.25, 0.07, 0.95, 0.25, -0.01, 0.85, 0.25, -0.06, 0.85, 0.25, -0.14, 0.75, 0.25, -0.01, 0.85, 0.25, -0.14, 0.75, 0.25, -0.03, 0.75, 0.25, -0.52, 0.25, 0.25, -0.35, 0.45, 0.25, -0.48, 0.45, 0.25, -0.48, 0.45, 0.25, -0.35, 0.45, 0.25, -0.42, 0.55, 0.25, -0.35, 0.65, 0.25, -0.42, 0.55, 0.25, -0.35, 0.45, 0.25, -0.35, 0.65, 0.25, -0.35, 0.45, 0.25, -0.1, 0.75, 0.25, -0.35, 0.65, 0.25, -0.1, 0.75, 0.25, -0.14, 0.75, 0.25, -0.52, 0.25, 0.25, -0.52, 0.1, 0.25, 0.07, 0.25, 0.25, 0.05, 0.25, 0.25, -0.52, 0.1, 0.25, 0.07, 0.1, 0.25, -0.52, 0.1, 0.25, -0.48, -0.05, 0.25, 0.07, 0.1, 0.25, -0.48, -0.05, 0.25, 0.19, -0.05, 0.25, 0.07, 0.1, 0.25, -0.48, -0.05, 0.25, -0.42, -0.2, 0.25, 0.19, -0.05, 0.25, 0.19, -0.05, 0.25, -0.42, -0.2, 0.25, 0.31, -0.2, 0.25, -0.42, -0.2, 0.25, -0.37, -0.35, 0.25, 0.31, -0.2, 0.25, -0.37, -0.35, 0.25, 0.4, -0.35, 0.25, 0.31, -0.2, 0.25, -0.37, -0.35, 0.25, -0.35, -0.48, 0.25, 0.4, -0.35, 0.25, 0.4, -0.35, 0.25, -0.35, -0.48, 0.25, 0.42, -0.48, 0.25, 0.42, -0.48, 0.25, -0.35, -0.48, 0.25, -0.35, -0.92, 0.25, -0.35, -0.92, 0.25, 0.42, -0.92, 0.25, 0.42, -0.48, 0.25, -0.35, -0.92, 0.25, -0.35, -0.48, 0.25, -0.66, -0.92, 0.25, -0.45, -0.62, 0.25, -0.65, -0.8, 0.25, -0.66, -0.92, 0.25, -0.45, -0.62, 0.25, -0.63, -0.73, 0.25, -0.65, -0.8, 0.25, -0.45, -0.62, 0.25, -0.48, -0.62, 0.25, -0.63, -0.73, 0.25, -0.48, -0.62, 0.25, -0.45, -0.62, 0.25, -0.5, -0.54, 0.25, -0.47, -0.5, 0.25, -0.5, -0.54, 0.25, -0.45, -0.62, 0.25, -0.35, -0.48, 0.25, -0.47, -0.5, 0.25, -0.45, -0.62, 0.25, 0.42, -0.48, 0.25, 0.42, -0.92, 0.25, 0.73, -0.92, 0.25, 0.52, -0.62, 0.25, 0.73, -0.92, 0.25, 0.72, -0.8, 0.25, 0.52, -0.62, 0.25, 0.72, -0.8, 0.25, 0.7, -0.73, 0.25, 0.52, -0.62, 0.25, 0.7, -0.73, 0.25, 0.55, -0.62, 0.25, 0.52, -0.62, 0.25, 0.55, -0.62, 0.25, 0.57, -0.54, 0.25, 0.52, -0.62, 0.25, 0.57, -0.54, 0.25, 0.54, -0.5, 0.25, 0.52, -0.62, 0.25, 0.54, -0.5, 0.25, 0.42, -0.48, 0.25];


		//Each face with a different color knight.colors= [1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0];
		knight.colors= [0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6, 0.9, 0.9, 0.6];

		knight.originalColors = [...knight.colors];
		computeVertexNormals( knight.vertices, knight.normals );

		return knight;
}

function simpleOBJ(vertices, normals) {
	var obj = new emptyModelFeatures();
	obj.vertices = vertices;
	obj.normals = normals;
	computeVertexNormals(obj.vertices, obj.normals);
	return obj;
}

function simpleArrow(startPosition, endPosition, idx){
	var line = new emptyModelFeatures();

	if (startPosition[0] < endPosition[0]) {
		line.vertices = [startPosition[0]*4, -0.48, startPosition[1]*4+0.05,
					endPosition[0]*4, -0.48, endPosition[1]*4+0.05,
					startPosition[0]*4, -0.48, startPosition[1]*4-0.05,
					endPosition[0]*4, -0.48, endPosition[1]*4+0.05,
					endPosition[0]*4, -0.48, endPosition[1]*4-0.05,
					startPosition[0]*4, -0.48, startPosition[1]*4-0.05];
	} else {
		line.vertices = [startPosition[0]*4, -0.48, startPosition[1]*4-0.05,
					endPosition[0]*4, -0.48, endPosition[1]*4+0.05,
					startPosition[0]*4, -0.48, startPosition[1]*4+0.05,
					startPosition[0]*4, -0.48, startPosition[1]*4-0.05,
					endPosition[0]*4, -0.48, endPosition[1]*4-0.05,
					endPosition[0]*4, -0.48, endPosition[1]*4+0.05];
	}

	line.colors = [0.70,  0.50,  0.30,0.70,  0.50,  0.30,0.70,  0.50,  0.30,0.70,  0.50,  0.30,0.70,  0.50,  0.30,0.70,  0.50,  0.30];
	for (let c=0; c<line.colors.length; c++){
		line.colors[c] = line.colors[c]*(idx+27)/64;
	}

	line.originalColors = [...line.colors];
	computeVertexNormals( line.vertices, line.normals );

	return line;
}

//----------------------------------------------------------------------------
//
//  Instantiating scene models
//

var sceneModels = [];

// Model 0 --- Board

sceneModels.push( new simpleBoardModel() );

sceneModels[0].tx = 0; sceneModels[0].ty = 0;

sceneModels[0].sx = sceneModels[0].sy = sceneModels[0].sz = 0.25;

sceneModels.push( new simpleKnightModel() );

sceneModels[1].tx = -0.44; sceneModels[1].ty = 0.08; sceneModels[1].tz= -0.44;

sceneModels[1].sx = sceneModels[1].sy= 0.07;
sceneModels[1].sz= 0.07;
