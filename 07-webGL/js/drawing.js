var camera, scene, renderer, controls;
var mesh;


function init() {

    scene = new THREE.Scene();

    var width = window.innerWidth;
    var height = window.innerHeight;

    camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 30000);
    camera.position.set(-1146, 192, -255);
    scene.add(camera);

    var light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(0, 5, 5);
    scene.add(light);

    var spotlight = new THREE.SpotLight(0xffffff, 1, 2000); // color, intensity, distance
    spotlight.position.set(500, 500, 500);
    spotlight.castShadow = true;
    scene.add(spotlight);

    spotlight.shadow.mapSize.width = 4096;
    spotlight.shadow.mapSize.height = 4096;
    spotlight.shadow.camera.near = 500;
    spotlight.shadow.camera.far = 2500;
    spotlight.shadow.camera.fov = 60;

    // var helper = new THREE.CameraHelper(spotlight.shadow.camera);
    // scene.add(helper);

    var textureLoader = new THREE.TextureLoader();
    textureLoader.load('imgs/aluminum.jpg', function(texture) {

        var material = new THREE.MeshBasicMaterial({map: texture});

        var loader = new THREE.BufferGeometryLoader();

        loader.load("obj/robot.json", function(geometry) {
            mesh = new THREE.Mesh(geometry, material);
            mesh.scale.set(80, 80, 80);
            mesh.position.y = -250;
            mesh.position.z = -400;
            mesh.castShadow = true;
            mesh.overdraw = true;
            scene.add(mesh);
        });
    });

    var groundMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, side: THREE.DoubleSide});
    groundGeometry = new THREE.SphereGeometry(800, 100, 100);
    ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.position.y = -1010;
    ground.position.z = -400;
    ground.receiveShadow = true;
    scene.add(ground);

    var particleCount = 2000;
    var particles = new THREE.Geometry();
    var pMaterial = new THREE.PointsMaterial({color: 0xffffff, size: Math.random()*40});

    for (var p = 0; p < particleCount; p++) {
      // create a particle with random position (-15000, 150000)
      var pX = Math.random() * 30000 - 15000,
          pY = Math.random() * 30000 - 15000,
          pZ = Math.random() * 30000 - 15000,
          particle = new THREE.Vector3(pX, pY, pZ);

      particles.vertices.push(particle);
    }
    var particleSystem = new THREE.Points(particles, pMaterial);
    scene.add(particleSystem);

    renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    // set the min distance btw object and camera
    controls.minDistance = 300;

    document.body.appendChild(renderer.domElement);
}

function animate() {
    requestAnimationFrame(animate);

    if (mesh) {
        mesh.rotation.y += 0.01;
    }
    renderer.render(scene, camera);
    controls.update();
}

init();
animate();
