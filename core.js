window.states = window.states || {};
window.game = (function() {

	var container = document.getElementById('aplomb-game');
	window.state.stageWidth = container.clientWidth;
	window.state.stageHeight = container.clientHeight;
	var game = new Phaser.Game(container.clientWidth, container.clientHeight, Phaser.AUTO, 'aplomb-game');
	game.state.add('game', window.states.gameState);
	game.state.start('game');

	return game;

}());