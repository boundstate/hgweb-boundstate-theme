# BoundState Theme for HgWeb

  A clean, modern theme for Mercurial's [hgweb](http://mercurial.selenic.com/wiki/HgWebDirStepByStep]) using the [Bootstrap](http://twitter.github.com/bootstrap/) CSS framework.

## Installation

  Download the files to a new folder `boundstate` in your hgweb themes folder
(`/usr/share/mercurial/templates` on default Ubuntu installs).

  Create a link to the static files:

    # cd /usr/share/mercurial/templates/static
    # ln -s boundstate ../boundstate/static/boundstate

  Edit your `hgweb.config` file to use the `boundstate` theme:

    [web]
    style = boundstate