import { fileWrite } from "../modules/content.mjs";

export const htaccess = async (env, production)=>{
    let htaccessFile = `
            
            # DO NOT REMOVE THIS LINE AND THE LINES BELLOW SSL_REDIRECT:pwa.nitorapp.com
            RewriteEngine on
            RewriteCond %{HTTPS} off
            RewriteCond %{HTTP_HOST} (www\.)?pwa.nitorapp.com
            RewriteRule (.*) https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
            # DO NOT REMOVE THIS LINE AND THE LINES BELLOW SSL_REDIRECT:pwa.nitorapp.com

            `;
            if(env["HTACCESS"]["cache_controle"] == "no-cache"){
                htaccessFile = htaccessFile + 
                `
                # DISABLE CACHING
                <IfModule mod_headers.c>
                    Header set Cache-Control "no-cache, no-store, must-revalidate"
                    Header set Pragma "no-cache"
                    Header set Expires 0
                </IfModule>

                <FilesMatch "\.(css|flv|gif|htm|html|ico|jpe|jpeg|jpg|js|mp3|mp4|png|pdf|swf|txt)$">
                    <IfModule mod_expires.c>
                        ExpiresActive Off
                    </IfModule>
                    <IfModule mod_headers.c>
                        FileETag None
                        Header unset ETag
                        Header unset Pragma
                        Header unset Cache-Control
                        Header unset Last-Modified
                        Header set Pragma "no-cache"
                        Header set Cache-Control "max-age=0, no-cache, no-store, must-revalidate"
                        Header set Expires "Thu, 1 Jan 1970 00:00:00 GMT"
                    </IfModule>
                </FilesMatch>
                `; 
            }
            if(env["HTACCESS"]["CORS"]){
                for(const origin of env["HTACCESS"]["CORS"]){
                    htaccessFile = htaccessFile + `
                    <IfModule mod_headers.c>
                      Header set Access-Control-Allow-Origin ${origin}"
                    </IfModule>
                    `;
                }
            }
            fileWrite(production+".htaaccess", htaccessFile.replace(/  /g,""));
            return console.log("Htaccess file done!");
}