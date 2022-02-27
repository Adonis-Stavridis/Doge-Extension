import * as vscode from 'vscode';

export const DOGE_CHARACTERS = new Set([
  'abomination',
  'bigbro',
  'caeser',
  'cheems',
  'doge',
  'dogelas',
  'engineer',
  'heavy',
  'henry',
  'isabelle',
  'jim',
  'karen',
  'kiddoge',
  'kyle',
  'kylie',
  'lilbro',
  'loafe',
  'milton',
  'monke',
  'murphy',
  'perro',
  'petyr',
  'phishe',
  'phoebe',
  'rupert',
  'soldier',
  'spym',
  'stuff',
  'swagcat',
  'walter'
]);

export const EXT_PATH = vscode.extensions.getExtension(
  'adonis-stavridis.doge'
)?.extensionUri;

export const GITHUB_PATH = vscode.Uri.parse(
  'https://raw.githubusercontent.com/Adonis-Stavridis/Doge-Extension/master/src'
);
