

# Dokuwiki-DirtyLittleHelper

dirtylittlehelper (dlh) is as plugin for  [Dokuwiki](https://www.dokuwiki.org). 

## THANK YOU / credits
@turnermm: [overlay plugin](https://github.com/turnermm/Dokuwiki-Nav-Overlay) - the base I began with  
@samfisch: [dokubook template](https://github.com/samfisch/dokuwiki-template-dokubook) - here I found the tree  
@lisps: [linksuggest plugin](https://github.com/lisps/plugin-linksuggest/) - I copied it :-)  
@giterlizzi [bootstrap3 template](https://github.com/giterlizzi/dokuwiki-template-bootstrap3) - there I found the inspiration for the admin menu  
@jakob1111 [flowcharts plugin](https://github.com/jakob1111/dokuwiki-plugin-flowcharts/) - the base for mermaid integration  
@mermaid-js [mermaid-live-editor](https://github.com/mermaid-js/mermaid-live-editor) - the mermaid live editor  


## why? / history
I wanted a better way for inserting wiki-internal-links in the editor. After some searching and probing I found the way that fits best for me: with "bureaucracy" and "struct" plugin  you can build nice lookups for namespaces...  

Then I took the "overlay" plugin and modified it for my needs. After a while I thought that it would be cool not to click on a button to have the search input and the insert button.  

Some jQuery later: it works. After the editor ist opened the dlh-page is loaded in the overlay, then the elements are transferred in a new line under the toolbar in the editor. The overlay is not shown anymore - but it's still there.  

Building and integrating flow-charts with mermaid: integrated. And dlh ships a mermaid live editor (the first chart in the wiki-editor is now transferred to the live editor; the rest: copy and paste).  

And i needed / wanted a quick-admin-menu -> added (inspired by bootstrap3 template)  

And sometimes the wiki should be wider - especially when editing and with "advanced config" plugin - done ...that means that after install of this plugin your wiki can look a bit different (thats life).  

Then i thought it would be nice to have a tree on the left side like "dokubook" template  -> added syntax for the tree.  

The tree on the left is not always needed - added syntax for "no sidebar"...  

I like comments -> syntax added  

right now it works fine...  

# what can dlh do four you?

## main feature - page-search in the editor
#### you need:
[bureaucracy-plugin](https://www.dokuwiki.org/plugin:bureaucracy)  
[struct-plugin](https://www.dokuwiki.org/plugin:bureaucracy)  

#### let's go  
- install the both plugins  
- create a struct-scheme   
- create at least one field in this scheme  
-- typ "page"  
-- config "usetitles" > thats better  
-- config "autocomplete" - "namespace" > put your namespace here  
- create the dokuwiki page that is configured  "plugin»dirtylittlehelper»page"  
````
~~NOCACHE~~
~~NOTOC~~
=== DLH ===
<form>
action script dummy.php
struct_field "scheme_name.field_name_1" !
struct_field "scheme_name.field_name_2" !
</form>
````
- open the editor and smile  

## dlh tree
```` <dlh.tree>````
put it in your sidebar page and be happy  
if there would be several trees -> only the first one is displayed  

```` <dlh.notree>````
no tree will be rendered  

```` <dlh.forcetree>````
only this tree will be rendered (overrides ````notree````)  
works only once  



## sidebar
```` <dlh.nosb> ````
The sidebar will not be shown (css) - beware that the sidebar / tree will be generated.  

```` <dlh.togglesb> ````
there will be a button at the top left of the sidebar to toggle it  
with   

```` <dlh.hidesb ```` 
you can hide the sidebar  


## mermaid
````
<dlh.mm>
graph LR
DOKUWIKI----DLH
</dlh.mm>
````
When you click the mermaid live editor you can follow the links to syntax etc.  

## comments
````
<dlh.*> this one line comment will only be seen in the editor </dlh.*>

<dlh.*>
this 
multi 
line 
comment will also only be seen in the editor 
</dlh.*>
````

## div

```` <dlh.div.html[ id="" class="" style=""...]> Your html content </dlh.div.html>````  
will build a html div like ````<html><div>Your html content</div></html>````  

```` <dlh.div.wiki [ id="" class="" style=""...]> **Your** WIKI __content__ </dlh.div.wiki>````  
will build a div around your wiki code  like ````<html><div></html>**Your** WIKI __content__ <html></div></html>````  

## table
```` 
<dlh.table.html[ id="" class="" style=""...]>
  <caption>your caption</caption>
  <tr>
    <th>tablehead a</th>
    <th>tablehead b</th>
  </tr>
  <tr>
    <td> cell with text </td>
    <td> amnother cell </td>
  </tr>
<dlh.table.html>
```` 

is for pure html and like ```` <dlh.div.wiki> ```` you can build a table around wiki content  

```` 
<dlh.table.wiki [ id="" class="" style=""...]>
  <dlh.caption.wiki> **wiki caption content** </dlh.caption.wiki>
  <dlh.tr.wiki>
    <dlh.th.wiki> table head __wiki__ syntax </dlh.th.wiki>
    <dlh.th.wiki> **another** table head __wiki__ syntax </dlh.th.wiki>
  </dlh.tr.wiki>
  <dlh.tr.wiki>
    <dlh.td.wiki> call a plugin or some other cool stuff </dlh.th.wiki>
    <dlh.td.wiki> **wiki syntax here** </dlh.th.wiki>
  </dlh.tr.wiki>
</dlh.table.wiki>

````


## BEWARE !
This plugin is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  
This plugin is generally made for MY personal needs.
