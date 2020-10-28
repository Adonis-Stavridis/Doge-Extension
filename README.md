# Doge for Visual Studio Code <!-- omit in toc -->

![Visual Studio Marketplace
Version](https://img.shields.io/visual-studio-marketplace/v/adonis-stavridis.doge?logo=visual-studio-code)
![Visual Studio Marketplace
Installs](https://img.shields.io/visual-studio-marketplace/i/adonis-stavridis.doge?logo=visual-studio-code)
![Visual Studio Marketplace
Downloads](https://img.shields.io/visual-studio-marketplace/d/adonis-stavridis.doge?logo=visual-studio-code)
![Visual Studio Marketplace Last
Updated](https://img.shields.io/visual-studio-marketplace/last-updated/adonis-stavridis.doge?logo=visual-studio-code)

This extension adds Dogelore characters into Visual Studio Code and a feature to
create memes.

It was initially inspired by the **[doge](https://atom.io/packages/doge)** Atom
package developped by **tyler0706**!

---

## Summary <!-- omit in toc -->

- [Features](#features)
  - [Show Dogelore characters on hover](#show-dogelore-characters-on-hover)
  - [Create memes inside your browser](#create-memes-inside-your-browser)
- [Characters](#characters)
- [Installation](#installation)
- [Known Issues](#known-issues)
- [Release Notes](#release-notes)
  - [[1.1.0] - Local images](#110---local-images)
- [Upcoming release](#upcoming-release)

---

## Features

### Show Dogelore characters on hover

When hovering above the name of the characters in your code, a popup will appear
with the character's image.

![Hover Gif](./img/hover.gif "Hover Gif")

### Create memes inside your browser

This extension lets you create memes, or in general images, inside your default
browser. It is a very basic and simple version of a photo editing software. This
feature also works offline.

To execute this feature / command, you can either :

- Press `Ctrl+E, Ctrl+D` or `Cmd+E, Cmd+D` on Mac.
- Open the command terminal with `Ctrl+Shift+P` or `Cmd+Shift+P` on Mac)
  and type the command `Doge`.

This will create a `.dogeapp` folder and a `Doge.md` file inside your current
workspace / folder. The folder contains all of the code that allows you to use
the app to create memes, while the file displays how to use the app.

The extension already has several defaults images already available for use, but
you can add your personal images inside of a `img` folder. The app will take the
images inside that folder each time you execute the feature / command.

![Example Png](./img/example.png "Example Png")

**Comment** : the next tool to be implemented in the app will allow adding text
into the memes.

**Warning** : in order to launch the app you need to install the
`ritwickdey.liveserver` Visual Studio Code extension (available on the
marketplace, or
[here](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)).

---

## Characters

| Character   |                          Image                          |
| :---------- | :-----------------------------------------------------: |
| Abomination | ![Abomination](./src/img/abomination.png "Abomination") |
| BigBro      |        ![BigBro](./src/img/bigbro.png "BigBro")         |
| Caeser      |        ![Caeser](./src/img/caeser.png "Caeser")         |
| Cheems      |        ![Cheems](./src/img/cheems.png "Cheems")         |
| Doge        |           ![Doge](./src/img/doge.png "Doge")            |
| Dogelas     |       ![Dogelas](./src/img/dogelas.png "Dogelas")       |
| Engineer    |     ![Engineer](./src/img/engineer.png "Engineer")      |
| Heavy       |          ![Heavy](./src/img/heavy.png "Heavy")          |
| Henry       |          ![Henry](./src/img/henry.png "Henry")          |
| Isabelle    |     ![Isabelle](./src/img/isabelle.png "Isabelle")      |
| Jim         |             ![Jim](./src/img/jim.png "Jim")             |
| Karen       |          ![Karen](./src/img/karen.png "Karen")          |
| KidDoge     |       ![KidDoge](./src/img/kiddoge.png "KidDoge")       |
| Kyle        |           ![Kyle](./src/img/kyle.png "Kyle")            |
| Kylie       |          ![Kylie](./src/img/kylie.png "Kylie")          |
| LilBro      |        ![LilBro](./src/img/lilbro.png "LilBro")         |
| Loafe       |          ![Loafe](./src/img/loafe.png "Loafe")          |
| Milton      |        ![Milton](./src/img/milton.png "Milton")         |
| Monke       |          ![Monke](./src/img/monke.png "Monke")          |
| Murphy      |        ![Murphy](./src/img/murphy.png "Murphy")         |
| Perro       |          ![Perro](./src/img/perro.png "Perro")          |
| Petyr       |          ![Petyr](./src/img/petyr.png "Petyr")          |
| Phishe      |        ![Phishe](./src/img/phishe.png "Phishe")         |
| Phoebe      |        ![Phoebe](./src/img/phoebe.png "Phoebe")         |
| Rupert      |        ![Rupert](./src/img/rupert.png "Rupert")         |
| Soldier     |       ![Soldier](./src/img/soldier.png "Soldier")       |
| Spym        |           ![Spym](./src/img/spym.png "Spym")            |
| Stuff       |          ![Stuff](./src/img/stuff.png "Stuff")          |
| Swagcat     |       ![Swagcat](./src/img/swagcat.png "Swagcat")       |
| Walter      |        ![Walter](./src/img/walter.png "Walter")         |

---

## Installation

[How to install Visual Studio Code
extensions](https://code.visualstudio.com/docs/editor/extension-gallery)

---

## Known Issues

No known issues until now.

---

## Release Notes

### [1.1.0] - Local images

- Images are now locally displayed
- Allows for them to be viewed offline

---

## Upcoming release

Next release will allow adding text into memes.
