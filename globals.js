window.globals = {
	screenWidth: document.getElementById('aplomb-game').clientWidth,
	screenHeight: document.getElementById('aplomb-game').clientHeight,

	assets: {
		graphs: {
			blockMan: 'assets/block-man.png'
		}
	},

	fonts: {
		main: {
			font: '20px Consolas, monospace',
			fill: '#fff',
			align: 'center'
		}
	},

	controls: {
		left: 'LEFT',
		right: 'RIGHT',
		jump: 'UP',
	},
};

window.state = {
	processRegistry: {},
	controls: {}
};