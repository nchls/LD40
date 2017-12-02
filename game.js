window.states = window.states || {};
window.states.gameState = (function() {

	function gameState() {};

	gameState.prototype.preload = function() {
		game.stage.backgroundColor = '#ddd';
		Object.entries(globals.assets.graphs).forEach(function(src, name) {
			game.load.image(name, src);
		});
	};

	gameState.prototype.create = function() {
		initControls();
		initWorld();
		initPhysics();
		populate();
	};

	var viewport = {
		top: null,
		right: null,
		bottom: null,
		left: null
	};
	gameState.prototype.update = function() {
		Object.entries(window.state.processRegistry).forEach(function(processes, key) {
			processes.forEach(function(process) {
				if (process) {
					process.go();
				}
			});
		});
		viewport.left = game.world.camera.x;
		viewport.right = game.world.camera.x + globals.screenWidth;
		viewport.top = game.world.camera.y;
		viewport.bottom = game.world.camera.y + globals.screenHeight;
	};

	gameState.prototype.render = function() {

	};

	var initControls = function() {
		Object.entries(globals.controls).forEach(function(key, action) {
			window.state.controls[action] = game.input.keyboard.addKey(Phaser.Keyboard[key]);
		});
	};

	var initWorld = function() {

	};

	var initPhysics = function() {
		window.game.physics.startSystem(Phaser.Physics.P2JS);
	};

	var populate = function() {

	};

	return gameState;

}());