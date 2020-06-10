init();
render();

function init() {
	scene = new THREE.Scene();

	// renderer

	renderer = new THREE.WebGLRenderer({
		alpha: true,
	});
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	// camera

	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.z = 12;

	// controls

	controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.addEventListener('change', render);
	controls.enableZoom = false;

	// mesh - cube

	// cube_geometry = new THREE.CubeGeometry(5, 5, 5);

	// for (var i = 0; i < cube_geometry.faces.length; i += 2) {
	// 	var color = Math.random() * 0xffffff;

	// 	cube_geometry.faces[i].color.setHex(color);
	// 	cube_geometry.faces[i + 1].color.setHex(color);
	// }

	// cube_material = new THREE.MeshLambertMaterial({
	// 	color: 0xffffff,
	// 	vertexColors: THREE.FaceColors,
	// });

	// cube = new THREE.Mesh(cube_geometry, cube_material);
	// scene.add(cube);
	//Load Model
	let loader = new THREE.GLTFLoader();
	loader.load('./house/scene.gltf', function (gltf) {
		scene.add(gltf.scene);
		house = gltf.scene.children[0];
		house.position.set(-2, -2, 2);
		render();
	});

	// Lights

	var light = new THREE.DirectionalLight(0xffffff);
	light.position.set(1, 1, 1);
	scene.add(light);

	var light = new THREE.DirectionalLight(0x002288);
	light.position.set(-1, -1, -1);
	scene.add(light);

	var light = new THREE.AmbientLight(0x222222);
	scene.add(light);

	//Plane

	// events

	window.addEventListener('resize', onWindowResize, false);
	var guiControls = new (function () {
		this.rotationX = 0.01;
		this.rotationY = 0.01;
		this.rotationZ = 0.01;
		this.scaleX = 0.01;
		this.scaleY = 0.01;
		this.scaleZ = 0.01;
	})();

	var datGUI = new dat.GUI();
	datGUI.add(guiControls, 'rotationX', 0, 5).onChange(function () {
		house.rotation.x = guiControls.rotationX;
	});
	datGUI.add(guiControls, 'rotationY', 0, 5).onChange(function () {
		house.rotation.y = guiControls.rotationY;
	});
	datGUI.add(guiControls, 'rotationZ', 0, 5).onChange(function () {
		house.rotation.z = guiControls.rotationZ;
	});
	datGUI.add(guiControls, 'scaleX', 0, 5).onChange(function () {
		house.scale.x = guiControls.scaleX;
	});
	datGUI.add(guiControls, 'scaleY', 0, 5).onChange(function () {
		house.scale.y = guiControls.scaleY;
	});
	datGUI.add(guiControls, 'scaleZ', 0, 5).onChange(function () {
		house.scale.z = guiControls.scaleZ;
	});
}

function render() {
	requestAnimationFrame(render);

	renderer.render(scene, camera);
}

function onWindowResize(event) {
	renderer.setSize(window.innerWidth, window.innerHeight);
	controls.update();
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
}
