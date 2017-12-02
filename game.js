window.states = window.states || {};
window.states.gameState = (function() {

	function gameState() {};

	gameState.prototype.preload = function() {
		game.stage.backgroundColor = '#fff';
		Object.entries(globals.assets.graphs).forEach(function([name, src]) {
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
		Object.entries(window.state.processRegistry).forEach(function([key, processes]) {
			processes.forEach(function(process) {
				if (process) {
					process.go();
				}
			});
		});
		viewport.left = game.world.camera.x;
		viewport.right = game.world.camera.x + window.state.stageWidth;
		viewport.top = game.world.camera.y;
		viewport.bottom = game.world.camera.y + window.state.screenHeight;
	};

	var yAxis = p2.vec2.fromValues(0, 1);

	gameState.prototype.render = function() {

	};

	var initControls = function() {
		Object.entries(globals.controls).forEach(function([action, key]) {
			window.state.controls[action] = game.input.keyboard.addKey(Phaser.Keyboard[key]);
		});
	};

	var initWorld = function() {

	};

	var initPhysics = function() {
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.gravity.y = 1000;
	};

	var populate = function() {
		util.factory(Man, []);
	};

	var Man = (function() {
		util.extend(Man, util.prototypes.Process);

		function Man() {
			this.inputs = {};

			this.x = 200;
			this.y = 200;
			this.sprite = game.add.sprite(this.x, this.y, 'blockMan');
			this.sprite.anchor.set(0.5, 0.5);
			game.physics.p2.enable(this.sprite, false);
//			this.sprite.body.setCircle(21);
		}

		Man.prototype.go = function() {
			this.inputs.left = state.controls.left.isDown;
			this.inputs.right = state.controls.right.isDown;
			this.inputs.jump = state.controls.jump.isDown;

			if (this.inputs.left) {
				this.sprite.body.moveLeft(250);
			}
			if (this.inputs.right) {
				this.sprite.body.moveRight(250);
			}
			if (this.inputs.jump && this.canJump()) {
				this.sprite.body.moveUp(600);
			}
		};

		Man.prototype.canJump = function() {
			var result = false;
			game.physics.p2.world.narrowphase.contactEquations.forEach((equation) => {
				if ([equation.bodyA, equation.bodyB].includes(this.sprite.body.data)) {
					var what = p2.vec2.dot(equation.normalA, yAxis);

					if (equation.bodyA === this.sprite.body.data) {
						what *= -1;
					}

					if (what > 0.5) {
						result = true;
					}
				}

			});
			return result;
		};

		return Man;
	}());

	return gameState;

}());