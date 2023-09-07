# electron-vite-bytecode-example

![electron version](https://img.shields.io/github/package-json/dependency-version/alex8088/electron-vite-bytecode-example/dev/electron)
![electron vite version](https://img.shields.io/github/package-json/dependency-version/alex8088/electron-vite-bytecode-example/dev/electron-vite)

> electron-vite source code protection example

---

[Check out the documentation to learn more](https://electron-vite.org/guide/source-code-protection.html).

## Repo Setup

Clone this repo to your local machine and install the dependencies.

```bash
pnpm i
```

## Run Tests

### Fully

Compile the main process and preload scripts source code to v8 bytecode.

Configure with [electron.vite.config.ts](./electron.vite.config.ts), run:

```
pnpm test:fully
```

result:

```bash
.
├──out /
│  ├──main /
│  │  ├──bytecode-loader.js # bytecode loader
│  │  ├──foo2.82d22e54.jsc  # dynamic import chunk bytecode file
│  │  ├──index.js           # entry file for electron
│  │  └──index.jsc          # main chunk bytecode file
│  ├──preload /
│  │  ├──bytecode-loader.js # bytecode loader
│  │  ├──index.js           # preload script entry
│  │  └──index.jsc          # preload script chunk bytecode file
│  └──renderer
├──...
└──package.json
```

### Protect Foo

Only compile `src/main/foo1.ts` and `src/main/foo2.ts` source code to v8 bytecode.

Configure with [electron.vite.config.foo.ts](./electron.vite.config.foo.ts), run:

```
pnpm test:foo
```

result:

```bash
.
├──out /
│  ├──main /
│  │  ├──bytecode-loader.js # bytecode loader
│  │  ├──foo.bafa5d6e.jsc   # foo1.ts and foo2.ts chunk bytecode file
│  │  └──index.js           # main chunk
│  ├──preload
│  └──renderer
├──...
└──package.json
```

### Assert Async Arrow Function Bug

Without transform arrow functions(the `transformArrowFunctions` option set `false`).

Configure with [electron.vite.config.bug.ts](./electron.vite.config.bug.ts) and `test` mode, run:

```
pnpm test:bug
```

result:

The Electron app will crash without any error message.

### Fix Async Arrow Function Bug

Set `transformArrowFunctions` option to `true`.

Configure with [electron.vite.config.ts](./electron.vite.config.ts) and `test` mode, run:

```
pnpm test:fixes
```

result:

The Electron will launch normally and get the error message.


### Keep Bundles

Set `removeBundleJS` option to `false`, keep bundle files which compiled as bytecode files.

Configure with [electron.vite.config.keep.ts](./electron.vite.config.keep.ts), run:

```
pnpm test:keep
```

result:

```bash
.
├──out /
│  ├──main /
│  │  ├──_foo2.82d22e54.js  # dynamic import chunk
│  │  ├──_index.js          # main chunk
│  │  ├──bytecode-loader.js # bytecode loader
│  │  ├──foo2.82d22e54.jsc  # dynamic import chunk bytecode file
│  │  ├──index.js           # entry file for electron
│  │  └──index.jsc          # main chunk bytecode file
│  ├──preload
│  └──renderer
├──...
└──package.json
```

### Multiple Entries

Configure with [electron.vite.config.multi.ts](./electron.vite.config.multi.ts), run:

```
pnpm test:multi
```

result:

```bash
.
├──out /
│  ├──main
│  ├──preload /
│  │  ├──bytecode-loader.js # bytecode loader
│  │  ├──index.js           # index entry file
│  │  ├──index.jsc          # index chunk bytecode file
│  │  └──webview.jsc        # webview entry file
│  └──renderer
├──...
└──package.json
```
