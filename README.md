# StickyLand

[![Github Actions Status](https://github.com/xiaohk/stickyland/workflows/Build/badge.svg)](https://github.com/xiaohk/stickyland/actions/workflows/build.yml)
[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/xiaohk/stickyland/master?urlpath=lab/tree/examples/example-adult.ipynb)
[![pypi](https://img.shields.io/pypi/v/jupyterlab-stickyland?color=blue)](https://pypi.python.org/pypi/jupyterlab-stickyland)
[![npm](https://img.shields.io/npm/v/jupyterlab-stickyland?color=blue)](https://www.npmjs.com/package/jupyterlab-stickyland)
[![license](https://img.shields.io/pypi/l/jupyterlab-stickyland?color=orange)](https://github.com/xiaohk/stickyland/blob/master/LICENSE)

Break the linear presentation of Jupyter Notebooks with sticky cells!

|<img src='https://i.imgur.com/FtmHafo.png'>|
|:---:|
|[Demo video](https://youtu.be/OKaPmEBzEX0)|

## Live Demo

You can try StickyLand directly in your browser without installing anything:

[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/anonchi/stickyland/master?urlpath=lab/tree/examples/example-adult.ipynb)

## Install

First, you need to install JupyterLab. Then you can install StickyLand with `pip`:

```bash
pip install stickyland
```

## Features

|![](https://user-images.githubusercontent.com/15007159/155228615-04bd45a6-0d85-46a5-abb2-841b440c6871.mp4)|![](https://user-images.githubusercontent.com/15007159/155228628-e17bb6ea-ceae-4f0f-b88e-6573fe081aac.mp4)|
|:---:|:---:|
|Drag and drop to create sticky cells|Create sticky cells from scratch|

|![](https://user-images.githubusercontent.com/15007159/155228640-5280ebe8-9b3e-4610-9672-cae20acb3412.mp4)|![](https://user-images.githubusercontent.com/15007159/155233626-19d53769-49b2-4673-8ed1-bcb42172cec3.mp4)|
|:---:|:---:|
|Automatically execute sticky cells|Use multiple floating cells to create an interactive dashboard|

## Development

You will need NodeJS to build the extension package.
The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Change directory to the jupyterlab_stickyland directory
# Install package in development mode
pip install -e .
# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite
# Rebuild extension Typescript source after making changes
jlpm run build
```

You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm run watch
# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser (you may need to wait several seconds for the extension to be rebuilt).

By default, the `jlpm run build` command generates the source maps for this extension to make it easier to debug using the browser dev tools. To also generate source maps for the JupyterLab core extensions, you can run the following command:

```bash
jupyter lab build --minimize=False
```

## License

The software is available under the [BSD-3-Clause License](https://github.com/xiaohk/stickyland/blob/master/LICENSE).

## Contact

If you have any questions, feel free to [open an issue](https://github.com/xiaohk/stickyland/issues/new) or contact [Jay Wang](https://zijie.wang).
