# StickyLand

<!-- [![Lite](https://gist.githubusercontent.com/xiaohk/9b9f7c8fa162b2c3bc3251a5c9a799b2/raw/c3438b4c49d89e4c367f581520ddd4cf8dac0f41/lite-badge-launch-small.svg)](https://xiaohk.github.io/stickyland/) -->
[![Github Actions Status](https://github.com/xiaohk/stickyland/workflows/Build/badge.svg)](https://github.com/xiaohk/stickyland/actions/workflows/build.yml)
[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/xiaohk/stickyland/master?urlpath=lab/tree/examples/example-adult.ipynb)
[![Lite](https://gist.githubusercontent.com/xiaohk/9b9f7c8fa162b2c3bc3251a5c9a799b2/raw/a7fca1d0a2d62c2b49f60c0217dffbd0fe404471/lite-badge-launch-small.svg)](https://xiaohk.github.io/stickyland/)
[![pypi](https://img.shields.io/pypi/v/jupyterlab-stickyland?color=blue)](https://pypi.python.org/pypi/jupyterlab-stickyland)
[![license](https://img.shields.io/badge/License-BSD--3-orange)](https://github.com/xiaohk/stickyland/blob/master/LICENSE)
[![arxiv badge](https://img.shields.io/badge/arXiv-2202.11086-red)](https://arxiv.org/abs/2202.11086)
[![DOI:10.1145/3491101.3519653](https://img.shields.io/badge/DOI-10.1145/3491101.3519653-blue)](https://doi.org/10.1145/3491101.3519653)

Break the linear presentation of Jupyter Notebooks with sticky cells!

<table>
  <tr>
    <td colspan="3"><img src='https://i.imgur.com/FtmHafo.png'></td>
  </tr>
  <tr></tr>
  <tr>
    <td><a href="https://youtu.be/eMlTtloGyho">👨🏻‍🏫 Talk</a></td>
    <td><a href="https://youtu.be/OKaPmEBzEX0">📺 Video</a></td>
    <td><a href="https://arxiv.org/abs/2202.11086">📖 "StickyLand: breaking the linear presentation of computational Notebooks"</a></td>
  </tr>
</table>

## Live Demo

You can try StickyLand directly in your browser without installing anything:

|Fast loading|Full functionality|
|:---:|:---:|
|[![Lite](https://gist.githubusercontent.com/xiaohk/9b9f7c8fa162b2c3bc3251a5c9a799b2/raw/a7fca1d0a2d62c2b49f60c0217dffbd0fe404471/lite-badge-launch-small.svg)](https://xiaohk.github.io/stickyland/)|[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/xiaohk/stickyland/master?urlpath=lab/tree/examples/example-adult.ipynb)|

## Install

First, you need to install JupyterLab. Then you can install StickyLand with `pip`:

```bash
pip install stickyland
```

## Features

![feature-gif](https://user-images.githubusercontent.com/15007159/155863418-c4e616fa-a003-4d6c-ba12-74cdb22d9bf4.gif)

<details>
  <summary>Show details</summary>
  <table>
    <tr></tr>
    <tr></tr>
    <tr><td style="text-align:center"><b>Drag and drop to create sticky cells</b></td><td><b>Create sticky code and markdown from scratch</b></td></tr>
    <tr></tr>
    <tr><th><video src='https://user-images.githubusercontent.com/15007159/155241848-298e593e-de7b-4d6e-be48-fd738c2586e6.mp4' width=180></video></th><th><video src='https://user-images.githubusercontent.com/15007159/155241844-4a5a910d-3cdf-48d2-9c6d-acb9e23fe6a4.mp4' width=180></video></th></tr>
    <tr></tr>
    <tr><td><b>Automatically execute sticky cells</b></td><td><b>Use floating cells to create interactive dashboards</b></td></tr>
    <tr></tr>
    <tr><td style="width:20px"><video src='https://user-images.githubusercontent.com/15007159/155242259-925ca910-f1d4-4b8d-b085-5120f1a21da6.mp4' width=180></video></td><td><video src='https://user-images.githubusercontent.com/15007159/155243403-30625bd4-611c-4096-934d-7219fd6be8cb.mp4' width=180></video></td></tr>
  </table>

</details>

---

With multiple floating cells, users can create a full-fledged interactive dashboard. For example, a machine learning engineer can build an ML Error Analysis Dashboard (shown below) through simple drag-and-drop.

<table>
  <tr><td><img src="https://i.imgur.com/KN51RQV.png"></td></tr>
  <tr></tr>
  <tr><td>The <b>ML Error Analysis Dashboard</b> consists of: <b>(A)</b> markdown text describing the dashboard, <b>(B)</b>
input field to specify a feature to diagnose, <b>(C)</b> auto-run chart showing the distribution of the specified feature, <b>(D)</b> second
input field to further specify the range within the feature to diagnose, <b>(E)</b> auto-run table displaying all samples that meet the
criteria, <b>(F)</b> auto-run <a href="https://github.com/interpretml/interpret/">visualization</a> explaining how the ML model makes decision on these samples, <b>(G)</b> <a href="https://github.com/interpretml/gam-changer/">interactive tool</a> allowing
the ML engineer to fix the ML model by editing its parameters based on their error analysis.</td></tr>
</table>

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

## Citation

```bibTeX
@inproceedings{wangStickyLandBreakingLinear2022,
  title = {{{StickyLand}}: {{Breaking}} the {{Linear Presentation}} of {{Computational Notebooks}}},
  shorttitle = {{{StickyLand}}},
  booktitle = {Extended {{Abstracts}} of the 2022 {{CHI Conference}} on {{Human Factors}} in {{Computing Systems}}},
  author = {Wang, Zijie J. and Dai, Katie and Edwards, W. Keith},
  year = {2022},
  publisher = {{ACM}}
}
```

## License

The software is available under the [BSD-3-Clause License](https://github.com/xiaohk/stickyland/blob/master/LICENSE).

## Contact

If you have any questions, feel free to [open an issue](https://github.com/xiaohk/stickyland/issues/new) or contact [Jay Wang](https://zijie.wang).
