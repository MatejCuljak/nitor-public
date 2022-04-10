import { fileRead, fileWrite } from "../modules/content.mjs";
import { cssCompiler } from "../modules/css.compiler.mjs";

export const staticIndexHTML = async(_root, main, _temp, env, locale)=>{
    let styles_path = "./";
    if(env["static-structure"]["styles"] == "root"){
        styles_path = "./";
    }
    const utf8 = "utf8";
    const fonts_css = await fileRead(_temp+"min.bundle.css", utf8);
    const index_css = await fileRead(_temp+"min.index.css", utf8);
    const index_file = await fileRead(_root+"raw.index.html", utf8);
    
    const css_map = await fileRead(_temp+"temp.index.map.json", utf8);
    //*Compile html
    const index_body = await cssCompiler(index_file, JSON.parse(css_map));
    

    //*Template
    const root = `
    <!DOCTYPE html>
    <html lang="${locale}">
    `;
    const head = `
    <head>
        <script>if(window.matchMedia('(prefers-color-scheme: dark)').media==='not all'){document.documentElement.style.display='none';document.head.insertAdjacentHTML('beforeend','<link rel="stylesheet" href="/styles/light.css" onload="document.documentElement.style.display='+' ">');}</script>
        <style>
            ${fonts_css}
        </style>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${env["index-template"]["title"]}</title>
        <link rel="icon" type="image/svg+xml" href="${env["index-template"]["icons"][0]}">
        <link rel="alternate icon" href="${env["index-template"]["icons"][1]}">
        <link rel="shortcut icon" href="${env["index-template"]["icons"][2]}" type="image/png">
        <link rel="stylesheet" href="${styles_path}min.dark.css" media="(prefers-color-scheme: dark)">
        <link rel="stylesheet" href="${styles_path}min.light.css" media="(prefers-color-scheme: light)">
        <style>
            ${index_css}
        </style>
    </head>
    `;
    const body = `
    <body>
    ${index_body}
    </body>
    </html>
    `;

    const result = root+head+body;

    fileWrite(main+"index.html", result);
    return console.log("BODY done")
}