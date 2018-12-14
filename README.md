## RSL

`rsl` is a tool which helps you to bootstrap your **universal** React application.

While developing your app with `rsl` you can achieve the same convenience as with `next.js`, but forget about any restrictions.

## Features

1. Hot reloading (HMR) both on client and server. No more restarts.
2. Single webpack configuration entry for all the environments. You no longer need to create a dozen of `webpack.config` files.
3. Extremely simple CLI. When your project is set, just run `npx rsl start` and start developing.
4. Flexibility. With `rsl` you can configure your application any way you desire. While the project was initially made for React applications, it should also work for Angular or any other framework which supports SSR.

## Example

Check out the `examples` folder for a sample project configuration.

## Usage

1. `npm install @atamore/rsl` or `yarn install @atamore/rsl`
2. Add a `rsl` section to your `package.json` with the following fields:

```
"rsl": {
    "entry": "server.js",
    "client": "src/core/client/entry.js",
    "server": "src/core/server/entry.js",
    "webpack": "webpack/compose.js"
}
```

`entry` is a path to the file, which launches the server  
`client` is a path to file, which initializes the client side of your app  
`server` is a path to file, which handles SSR  
`webpack` is a path to file, which generates the webpack configs  

For more information about the exported modules please refer to the examples.

3. `npx rsl start`

## Similar packages

-   [universal-webpack](https://github.com/catamphetamine/universal-webpack)
    Works in a similar way, but is harder to configure and does not support hot reloading on the server.
