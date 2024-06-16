# UFO-project
This project is written in typescript, vue3 with vite scaffolding fully in composition API.
<br> **Check it out here on self-hosted domain: https://www.thelighthouseproject.life/ with CloudFlare.**

## Previews
Dive into our workspace, draw and upload your own piece of artwork to become a piece of this site
![image](https://github.com/csf233csf/UFO-project/assets/56235101/bc210d50-d98e-4c12-8d30-c20eb7cbd934)

## Main libs used:
**Gsap** for most animations <br> 
**THREEJS** for 3D model implements <br> 
**SASS** for advanced CSS writing <br> 
**Firebase database** for dynamic image manipulation <br> 
**vuetify** for some of the prebuilt overlays and temp-components <br> 

## Project Setups

1. Module Install
```sh
npm install --force
```
2. Compile and Hot-Reload for Development
```sh
npm run dev -- --host
```
3. Type-Check, Compile and Minify for Production
```sh
npm run build --force
```
4. To serve in production env
```sh
npm install -g serve
cd dist
npx serve
```
or if npx doesn't work
```sh
serve -s .
```
