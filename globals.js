window.globals = {
	screenWidth: document.getElementById('aplomb-game').clientWidth,
	screenHeight: document.getElementById('aplomb-game').clientHeight,

	assets: {
		graphs: {
			blockMan: 'assets/block-man.png',
			hand: 'assets/hand.png',
			crate: 'assets/crate.png'
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
		left: 'A',
		right: 'D',
		jump: 'W',
	},
};

window.state = {
	processRegistry: {},
	controls: {}
};