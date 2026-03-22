<script lang="ts">
	import { onMount, tick } from 'svelte';

	interface Line {
		type: 'input' | 'output' | 'fetch';
		text: string;
	}

	const ASCII_TELESCOPE = [
		'             _           ',
		'           /((_))        ',
		'         _/   /          ',
		'        //   /           ',
		'       //   /            ',
		'       /\\___/            ',
		'       \\O_/=-.           ',
		'   _  / || \\  ^o        ',
		'   \\\\/ ()_) \\.          ',
		'    ^^ <__> \\()         ',
		'      //||\\\\            ',
		'     //_||_\\\\           ',
		'    // \\||/ \\\\          ',
		'   //   ||   \\\\         ',
		'  \\/    |/    \\/        ',
		'  /     |      \\        ',
		' /      |       \\       ',
		'        |                '
	];

	const FETCH_INFO = [
		'visitor@umarbek.dev',
		'-------------------',
		'OS: UmarbekOS 1.0.0 aarch64',
		'Host: Umbrella-Tokyo',
		'Kernel: DietPi GNU/Linux',
		'Uptime: since 2026',
		'Shell: /bin/zsh',
		'Terminal: umarbek.dev/terminal',
		'CPU: Intel 4004 @ 740kHz',
		'GPU: In this economy?',
		'Memory: Infinite',
		'',
		'Type "help" for commands.'
	];

	function buildFetchLines(): Line[] {
		const lines: Line[] = [];
		const maxArt = ASCII_TELESCOPE.length;
		const maxInfo = FETCH_INFO.length;
		const rows = Math.max(maxArt, maxInfo);

		for (let i = 0; i < rows; i++) {
			const artPart = i < maxArt ? ASCII_TELESCOPE[i] : ''.padEnd(25);
			const infoPart = i < maxInfo ? FETCH_INFO[i] : '';
			lines.push({ type: 'fetch', text: `${artPart.padEnd(28)}${infoPart}` });
		}
		lines.push({ type: 'output', text: '' });
		return lines;
	}

	let lines = $state<Line[]>(buildFetchLines());
	let input = $state('');
	let inputEl: HTMLInputElement;
	let terminalEl: HTMLDivElement;

	const projects = [
		{ name: 'umarbek.dev', url: 'https://github.com/umarbek/umarbek.dev' },
		{ name: 'vault', url: 'https://github.com/umarbek/vault' },
		{ name: 'dotfiles', url: 'https://github.com/umarbek/dotfiles' }
	];

	const commands: Record<string, (args: string[]) => string[]> = {
		help: () => [
			'  help             Show this message',
			'  neofetch         Show system info',
			'  whoami           About me',
			'  date             Current date',
			'  ls               List sections',
			'  cat <file>       Read files',
			'  cd <section>     Navigate to section',
			'  clear            Clear terminal',
			'  sudo rm -fr /    Delete French',
			'  home             Go to homepage'
		],
		neofetch: () => {
			return buildFetchLines().map((l) => l.text);
		},
		whoami: () => [
			'Umarbek Bakhodirjonov',
			'Studying at Shinagawa International School',
			'Fav tools: Blender, Golang, Tailscale, Ollama, Signal'
		],
		ls: () => {
			return [
				'drwxr-xr-x  writing/',
				'drwxr-xr-x  projects/',
				'-rw-r--r--  about.txt'
			];
		},
		cat: (args) => {
			if (args[0] === 'about.txt') {
				return [
					"I'm Umarbek.",
					'I write code, read books, and tinker with servers.',
					'This site runs on a Raspberry Pi 5 in Tokyo.',
					'',
					'hello@umarbek.dev'
				];
			}
			return [`cat: ${args[0] || ''}: No such file or directory`];
		},
		open: (args) => {
			const name = args.join(' ');
			const project = projects.find((p) => p.name.toLowerCase() === name.toLowerCase());
			if (project) {
				window.open(project.url, '_blank');
				return [`Opening ${project.url}...`];
			}
			return [`open: ${name}: not found. Try "ls projects".`];
		},
		home: () => {
			window.location.href = '/';
			return ['Navigating to /...'];
		},
		cd: (args) => {
			const dest = args[0];
			const valid = ['writing', 'projects', 'admin', 'wall-of-shame'];
			if (dest && valid.includes(dest)) {
				window.location.href = `/${dest}`;
				return [`Navigating to /${dest}...`];
			}
			if (dest === '~' || dest === '/') {
				window.location.href = '/';
				return ['Navigating to /...'];
			}
			return [`cd: ${dest || ''}: no such directory`];
		},
		date: () => [new Date().toString()],
		uname: (args) => {
			if (args[0] === '-a') return ['UmarbekOS 1.0.0 raspberrypi5 aarch64 GNU/Linux'];
			return ['UmarbekOS'];
		},
		pwd: () => ['/home/visitor'],
		echo: (args) => [args.join(' ')],
		sudo: (args) => {
			if (args.join(' ').startsWith('rm -rf /')) {
				return [
					'Nice try.',
					'Your punishment: Install CUDA on arch linux with no LLM or YouTube, pure documentation and agony ❤️‍🔥'
				];
			}
			return ['You really though you could do that 🙏'];
		}
	};

	async function handleSubmit() {
		const cmd = input.trim();
		if (!cmd) return;

		lines.push({ type: 'input', text: `$ ${cmd}` });
		input = '';

		if (cmd === 'clear') {
			lines = [];
			return;
		}

		const parts = cmd.split(/\s+/);
		const handler = commands[parts[0]];
		if (handler) {
			handler(parts.slice(1)).forEach((line) => lines.push({ type: 'output', text: line }));
		} else {
			lines.push({ type: 'output', text: `command not found: ${parts[0]}` });
		}

		lines.push({ type: 'output', text: '' });

		await tick();
		if (terminalEl) terminalEl.scrollTop = terminalEl.scrollHeight;
	}

	onMount(() => inputEl?.focus());
</script>

<svelte:head>
	<title>terminal.umarbek.dev</title>
</svelte:head>

<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
<div class="fullscreen-term" onclick={() => inputEl?.focus()}>
	<div class="term-body" bind:this={terminalEl}>
		{#each lines as line}
			<div
				class="line"
				class:is-input={line.type === 'input'}
				class:is-fetch={line.type === 'fetch'}
			>{line.text}</div>
		{/each}

		<form class="input-row" onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
			<span class="prompt">$</span>
			<input
				bind:this={inputEl}
				bind:value={input}
				type="text"
				class="cmd-input"
				autocomplete="off"
				autocorrect="off"
				autocapitalize="off"
				spellcheck="false"
			/>
		</form>
	</div>
</div>

<style>
	.fullscreen-term {
		position: fixed;
		inset: 0;
		z-index: 200;
		background: var(--bg-base);
		display: flex;
		flex-direction: column;
	}

	.term-body {
		flex: 1;
		overflow-y: auto;
		padding: 2rem;
		font-family: var(--font-mono);
		font-size: 1rem;
		line-height: 1.5;
	}

	.line {
		white-space: pre;
		min-height: 1.1em;
		color: var(--text);
	}

	.line.is-input {
		color: var(--accent);
	}

	.line.is-fetch {
		color: var(--text-dim);
	}

	.input-row {
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	.prompt {
		color: var(--accent);
		flex-shrink: 0;
	}

	.cmd-input {
		flex: 1;
		background: none;
		border: none;
		color: var(--text);
		font-family: var(--font-mono);
		font-size: 1rem;
		outline: none;
		caret-color: var(--accent-orange);
	}
</style>
