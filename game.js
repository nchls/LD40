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
		game.physics.p2.friction = 2;
	};

	var populate = function() {
		util.factory(Man, []);
		util.factory(Hand, []);
		for (var i=0; i<30; i++) {
			util.factory(Crate, [util.rand(0, window.state.stageWidth / 5), util.rand(0, window.state.stageHeight)]);
		}
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

	var handBody;
	var handConstraint;
	var Hand = (function() {
		util.extend(Hand, util.prototypes.Process);

		function Hand() {
			this.inputs = {};

			this.x = window.state.stageWidth / 2;
			this.y = window.state.stageHeight / 2;
			this.sprite = game.add.sprite(this.x, this.y, 'hand');

			handBody = new p2.Body();
			game.physics.p2.world.addBody(handBody);

			game.input.onDown.add(this.handleClick, game.input.activePointer);
			game.input.onUp.add(this.handleClickEnd);
			game.input.addMoveCallback(this.handleMouseMove, game.input.activePointer);
		}

		Hand.prototype.go = function() {

		};

		Hand.prototype.handleClick = function(pointer) {
			var crateSprites = window.state.processRegistry[Crate.toString()].map((crate) => {
				return crate.sprite;
			});
			var clickedBodies = game.physics.p2.hitTest(pointer.position, crateSprites);
			console.log(clickedBodies);
			clickedBodies.forEach((clickedBody) => {
				var p2pos = [game.physics.p2.pxmi(pointer.position.x), game.physics.p2.pxmi(pointer.position.y)];
				var localPointInBody = [0, 0];
				clickedBody.toLocalFrame(localPointInBody, p2pos);
				handConstraint = game.physics.p2.createRevoluteConstraint(handBody, [0, 0], clickedBody, [
					game.physics.p2.mpxi(localPointInBody[0]), 
					game.physics.p2.mpxi(localPointInBody[1]) 
				]);
			});
		};

		Hand.prototype.handleClickEnd = function() {
			game.physics.p2.removeConstraint(handConstraint);
		};

		Hand.prototype.handleMouseMove = function(pointer) {
			handBody.position[0] = game.physics.p2.pxmi(pointer.position.x);
			handBody.position[1] = game.physics.p2.pxmi(pointer.position.y);
		};

		return Hand;
	}());

	var Crate = (function() {
		util.extend(Crate, util.prototypes.Process);

		function Crate(x, y) {
			this.inputs = {};

			this.x = x;
			this.y = y;
			this.sprite = game.add.sprite(this.x, this.y, 'crate');
			this.sprite.anchor.set(0.5, 0.5);
			game.physics.p2.enable(this.sprite, false);
//			this.sprite.body.angularDamping = 3;
		}

		Crate.prototype.go = function() {

		};

		Crate.prototype.canJump = function() {

		};

		return Crate;
	}());

	return gameState;

}());