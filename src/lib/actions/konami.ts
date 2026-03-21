const KONAMI = [
	'ArrowUp',
	'ArrowUp',
	'ArrowDown',
	'ArrowDown',
	'ArrowLeft',
	'ArrowRight',
	'ArrowLeft',
	'ArrowRight'
];

export function initKonami() {
	let idx = 0;

	function handler(e: KeyboardEvent) {
		if (e.key === KONAMI[idx]) {
			idx++;
			if (idx === KONAMI.length) {
				triggerDownload('/quest.png');
				idx = 0;
			}
		} else {
			idx = e.key === KONAMI[0] ? 1 : 0;
		}
	}

	window.addEventListener('keydown', handler);

	return () => {
		window.removeEventListener('keydown', handler);
	};
}

function triggerDownload(url: string) {
	const a = document.createElement('a');
	a.href = url;
	a.download = 'quest.png';
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}
