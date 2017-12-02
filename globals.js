window.globals = {
	screenWidth: document.getElementById('aplomb-game').clientWidth,
	screenHeight: document.getElementById('aplomb-game').clientHeight,

	assets: {
		graphs: {

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
	},
};

window.state = {
	processRegistry: {},
	controls: {}
};