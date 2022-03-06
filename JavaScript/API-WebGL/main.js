const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
	// The field of view: How wide the area in front of the camera is that should be visible onscreen, in degrees.
	75,
	// The aspect ratio: Usually, this is the ratio of the scene's width divided by the scene's height. Using another value will distort the scene (which might be what you want, but usually isn't).
	window.innerWidth / window.innerHeight,
	// The near plane: How close to the camera objects can be before we stop rendering them to the screen. Think about how when you move your fingertip closer and closer to the space between your eyes, eventually you can't see it anymore.
	0.1,
	// The far plane: How far away things are from the camera before they are no longer rendered.
	1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let cube;

let loader = new THREE.TextureLoader();

loader.load("metal003.png", function (texture) {
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(2, 2);

	let geometry = new THREE.BoxGeometry(2.4, 2.4, 2.4);
	let material = new THREE.MeshLambertMaterial({
		map: texture,
		shading: THREE.FlatShading,
	});
	cube = new THREE.Mesh(geometry, material);
	scene.add(cube);

	draw();
});

let light = new THREE.AmbientLight("rgb(255, 255, 255)"); // soft white light
scene.add(light);

let spotLight = new THREE.SpotLight("rgb(255, 255, 255)");
spotLight.position.set(100, 1000, 1000);
spotLight.castShadow = true;
scene.add(spotLight);

function draw() {
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	renderer.render(scene, camera);

	requestAnimationFrame(draw);
}
