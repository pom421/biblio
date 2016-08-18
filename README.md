# Biblio

Biblio est une application de gestion personnelle de livres. Elle permet de scanner les codes bar des livres de sa bibliothèque, de les organiser en catégorie, ajouter des favoris, filtrer, voir les détails (auteurs, image, etc..).

## Architecture

- Ionic 2
- PouchDB
- TypeScript
- Google Book API pour accès aux informations des livres via REST

## Prérequis

- Git
- node & npm

## Installation

```sh
$ git clone https://github.com/pom421/biblio.git
$ cd biblio
$ npm i
$ # for using in a browser
$ ionic serve
$ # for using in an android emulator or an android device
$ ionic run android
```