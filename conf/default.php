<?php
/*
$conf['page'] = 'zzz:dlh:0_0_dlh';
$conf['page_top'] = 'zzz:dlh:0_0_dlh_top';
$conf['show_id'] = '1';
$conf['show_mermaid'] = '1';
$conf['show_drawio'] = '1';
$conf['show_menu'] = '1';
$conf['hidden_area'] = 'zzz:';
$conf['hidden_area_label'] = '&#8734 hidden area';
$conf['fullscreen_edit'] = '1';
*/
$conf['must_login'] = '0';

$conf['edit_active'] = '1';
$conf['edit_dlh_wikiid'] = 'wiki:dlh:editor';
$conf['edit_tb_struct'] = '1';
$conf['edit_tb_minmax'] = '1';
$conf['edit_tb_maximize'] = '1';
$conf['edit_tb_code'] = '1';
$conf['edit_tb_mermaid'] = '1';
$conf['edit_tb_drawio'] = '1';
$conf['edit_tb_dlhid'] = '1';

$conf['top_active'] = '1';
$conf['top_templates'] = 'template A | path:to:template_a
template B | path:to:template_b
template C | path:to:template_c
';
$conf['top_helper_wikiid'] = 'wiki:dlh:top_helper';
$conf['top_struct_wikiid'] = 'wiki:dlh_top_struct';
$conf['top_pagesuggest'] = '1';
$conf['top_dlhid_active'] = '1';
$conf['top_adm_active'] = '1';
$conf['top_adm_link_text'] = '&#8734 hidden area';
$conf['top_adm_link_wikiid'] = 'secretnamespace:';



/* IP HELPER */

$conf['iphelper_subnetcalculatortarget']    = '_blank';
$conf['iphelper_subnetcalculator']    = 'https://www.tunnelsup.com/subnet-calculator/?ip=%ip%';
$conf['iphelper_tool1urltarget']    = '_self';
$conf['iphelper_tool1name']    = 'RDP starten (erfordert Windows mit Anpassungen)';
$conf['iphelper_tool1url']    = 'rdp:%ip%';
$conf['iphelper_tool2urltarget']    = '_blank';
$conf['iphelper_tool2name']    = 'https://%ip%:4444';
$conf['iphelper_tool2url']    = 'https://%ip%:4444';
$conf['iphelper_tool3urltarget']    = '_self';
$conf['iphelper_tool3name']    = 'Ping (erfordert Windows mit Anpassungen)';
$conf['iphelper_tool3url']    = 'ping:%ip%';
$conf['iphelper_tool4urltarget']    = '_blank';
$conf['iphelper_tool4name']    = 'Ping (Ping.eu)';
$conf['iphelper_tool4url']    = 'http://ping.eu/ping/?host=%ip%';
$conf['iphelper_tool5urltarget']    = '_blank';
$conf['iphelper_tool5name']    = 'Robtex IP Lookup';
$conf['iphelper_tool5url']    = 'https://www.robtex.com/ip-lookup/%ip%';
$conf['iphelper_tool6urltarget']    = '_blank';
$conf['iphelper_tool6name']    = 'Google Search';
$conf['iphelper_tool6url']    = 'https://www.google.de/?q=%ip%';
$conf['iphelper_tool7urltarget']    = '_blank';
$conf['iphelper_tool7name']    = 'http://%ip%';
$conf['iphelper_tool7url']    = 'http://%ip%';
$conf['iphelper_tool8urltarget']    = '_blank';
$conf['iphelper_tool8name']    = 'https://%ip%';
$conf['iphelper_tool8url']    = 'https://%ip%';
$conf['iphelper_tool9urltarget']    = '_blank';
$conf['iphelper_tool9name']    = 'ftp://%ip%';
$conf['iphelper_tool9url']    = 'ftp://%ip%';
$conf['iphelper_tool10urltarget']    = '_blank';
$conf['iphelper_tool10name']    = 'ssh://%ip% (erfordert Windows mit Anpassungen)';
$conf['iphelper_tool10url']    = 'ssh://%ip%';
$conf['iphelper_rawtools']    = '<a href="https://whois.domaintools.com/%ip%" target="_blank">whois.domaintools.com/%ip%</a><br>
<a href="https://www.shodan.io/search?query=%ip%" target="_blank">https://www.shodan.io/search?query=%ip%</a><br>
<a href="https://mxtoolbox.com/SuperTool.aspx?action=blacklist%3a%ip%&run=toolpage" target="_blank">https://mxtoolbox.com/SuperTool.aspx?action=blacklist%3a%ip%&run=toolpage</a><br>
';  
