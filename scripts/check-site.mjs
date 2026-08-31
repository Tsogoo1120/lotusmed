import { existsSync, readFileSync } from "node:fs";
import { dirname, extname, isAbsolute, join, relative, resolve } from "node:path";

const root = resolve(process.cwd());
const htmlFiles = [
  "index.html",
  "tarifs.html",
  "mentions-legales.html",
  "politique-confidentialite.html"
];
const failures = [];
const pageSources = new Map();

for (const file of htmlFiles) {
  const absolute = join(root, file);
  if (!existsSync(absolute)) {
    failures.push(`${file}: page introuvable`);
    continue;
  }
  pageSources.set(absolute, readFileSync(absolute, "utf8"));
}

const isOutsideRoot = (target) => {
  const pathFromRoot = relative(root, target);
  return pathFromRoot.startsWith("..") || isAbsolute(pathFromRoot);
};

const checkLocalReference = (sourceFile, reference) => {
  if (!reference || /^(?:https?:|mailto:|tel:|data:|\/\/)/i.test(reference)) return;
  const [pathAndQuery, rawFragment] = reference.split("#", 2);
  const localReference = pathAndQuery.split("?", 1)[0];
  const target = localReference ? resolve(dirname(sourceFile), localReference) : sourceFile;

  if (isOutsideRoot(target) || !existsSync(target)) {
    failures.push(`${relative(root, sourceFile)}: ressource introuvable (${reference})`);
    return;
  }

  if (rawFragment && extname(target).toLowerCase() === ".html") {
    let fragment;
    try {
      fragment = decodeURIComponent(rawFragment);
    } catch {
      failures.push(`${relative(root, sourceFile)}: fragment invalide (${reference})`);
      return;
    }
    const targetSource = pageSources.get(target) || readFileSync(target, "utf8");
    const hasTarget = targetSource.includes(`id="${fragment}"`) || targetSource.includes(`id='${fragment}'`);
    if (!hasTarget) failures.push(`${relative(root, sourceFile)}: ancre introuvable (${reference})`);
  }
};

for (const [absolute, source] of pageSources) {
  const file = relative(root, absolute);
  const ids = [...source.matchAll(/\sid=["']([^"']+)["']/g)].map((match) => match[1]);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length) failures.push(`${file}: identifiants dupliqués (${[...new Set(duplicates)].join(", ")})`);

  if (!/^<!doctype html>/i.test(source.trim())) failures.push(`${file}: doctype manquant`);
  if (!/<html\s+lang=["']fr["']/i.test(source)) failures.push(`${file}: langue française manquante`);
  if (!/<meta\s+name=["']viewport["']/i.test(source)) failures.push(`${file}: viewport manquant`);
  if (!/<title>[^<]+<\/title>/i.test(source)) failures.push(`${file}: titre manquant`);
  if ((source.match(/<h1\b/gi) || []).length !== 1) failures.push(`${file}: un seul h1 est requis`);
  if ((source.match(/<main\b/gi) || []).length !== 1) failures.push(`${file}: un seul élément main est requis`);

  for (const match of source.matchAll(/(?:href|src|poster)=["']([^"']+)["']/g)) {
    checkLocalReference(absolute, match[1]);
  }
  for (const match of source.matchAll(/srcset=["']([^"']+)["']/g)) {
    for (const candidate of match[1].split(",")) checkLocalReference(absolute, candidate.trim().split(/\s+/, 1)[0]);
  }

  for (const image of source.matchAll(/<img\b[^>]*>/gi)) {
    if (!/\salt=["'][^"']*["']/i.test(image[0])) failures.push(`${file}: image sans texte alternatif`);
  }

  for (const control of source.matchAll(/<(input|select|textarea)\b[^>]*>/gi)) {
    if (/\stype=["']hidden["']/i.test(control[0])) continue;
    const id = /\sid=["']([^"']+)["']/i.exec(control[0])?.[1];
    if (!id) {
      failures.push(`${file}: champ de formulaire sans identifiant`);
      continue;
    }
    if (!source.includes(`for="${id}"`) && !source.includes(`for='${id}'`)) failures.push(`${file}: champ sans label associé (${id})`);
  }

  for (const script of source.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)) {
    try {
      JSON.parse(script[1]);
    } catch {
      failures.push(`${file}: données structurées JSON-LD invalides`);
    }
  }
}

const cssFile = join(root, "assets", "css", "styles.css");
const css = readFileSync(cssFile, "utf8");
for (const match of css.matchAll(/url\(\s*(["']?)(.*?)\1\s*\)/g)) checkLocalReference(cssFile, match[2]);
if ((css.match(/{/g) || []).length !== (css.match(/}/g) || []).length) failures.push("styles.css: accolades déséquilibrées");

const vttFile = join(root, "assets", "video", "lotusmed-intro-fr.vtt");
if (!readFileSync(vttFile, "utf8").startsWith("WEBVTT")) failures.push("lotusmed-intro-fr.vtt: en-tête WEBVTT manquant");

if (failures.length) {
  console.error(`Vérification échouée (${failures.length}) :`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Vérification réussie : ${htmlFiles.length} pages, liens, ancres, formulaires, médias et données structurées contrôlés.`);
