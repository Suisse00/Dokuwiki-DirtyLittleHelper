# Dokuwiki-DirtyLittleHelper

dirtylittlehelper (dlh) is as plugin for  [Dokuwiki](https://www.dokuwiki.org). 

## why? / history
I wanted a better way for inserting wiki-internal-links in the editor. After some searching and probing I found the way that fits best for me: with "bureaucracy" and "struct" plugin  you can build nice lookups for namespaces... 

Then I took the "overlay" plugin and modified it for my needs. After a while I thought that it would be cool not to click on a button to have the search input and the insert button.

Some jQuery and it works. After the editor ist opened the dlh-page is loaded in the overlay, then the elements are transferred unter the toolbar. The overlay is not shown anymore - but it's still there.

Building and integrating flow-charts with mermaid: integrated. And dlh ships a mermaid live editor (till now the chart-data aren't transferred to the editor -> copy and paste).

And i needed a quick-admin menu -> added

And sometimes the wiki should be wider -especially when editing and with "advanced config" plugin - done ...that means that after install of this plugin your wiki can look a bit different (thats life).

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
- create a struct-scheme 
- create at least one field in this scheme
typ "page"
config "usetitles" > thats better
config "autocomplete" - "namespace" > put your namespace here
- create the dokuwiki page that is configured  "plugin»dirtylittlehelper»page"
````
~~NOCACHE~~
~~NOTOC~~
=== DLH ===
<form>
action script dummy.php
struct_field "scheme_name.field_name" !
</form>
````
- open the editor and smile

## dlh tree
```` ~~dlhtree~~````
put it in your sidebar page and be happy
if there would be several trees -> only the first one is displayed

## nosidebar
````
~~dlhnosb~~
````
The sidebar will not be shown and the tree wioll not be generated.

## mermaid
````
~~dlhmm 
graph LR
DOKUWIKI----DLH
/dlh~~
````
When you click the mermaid live editor you can follow the links to syntax etc.

## comments
````
~~dlh* this one line comment will only be seen in the editor /dlh~~

~~dlh* 
this 
multi 
line 
comment will also only be seen in the editor /dlh~~
````

## BEWARE !
This plugin is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
