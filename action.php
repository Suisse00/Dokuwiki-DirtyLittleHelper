<?php
/**
* based on https://github.com/turnermm/Dokuwiki-Nav-Overlay
* @author   Myron Turner <turnermm02@shaw.ca>
* developed with suggestions from torpedo <dgtorpedo@gmail.com>
*
* 2021/04 by KalleAPunkt
*
*/

if(!defined('DOKU_INC')) die();


class action_plugin_dirtylittlehelper extends DokuWiki_Action_Plugin {

	var $dlh_overlay = '';
	var $dlh_topmenu = '';


	function register(Doku_Event_Handler $controller) {

		$controller->register_hook('DOKUWIKI_STARTED', 'AFTER', $this, 'dirtylittlehelper_varis');
		$controller->register_hook('TPL_METAHEADER_OUTPUT', 'BEFORE', $this, 'dirtylittlehelper_add_js_mermaid');
		$controller->register_hook('TOOLBAR_DEFINE', 'AFTER', $this, 'dirtylittlehelper_insert_button', array ());
		$controller->register_hook('TPL_ACT_RENDER', 'AFTER',  $this, 'dirtylittlehelper_after_render', array('after'));

	}


	function dirtylittlehelper_insert_button(Doku_Event $event, $param) {

		$event->data[] = array (
		'type' => 'dirtylittlehelper',
		'title' => 'DLH', //$this->getLang('abutton'),
		'icon' => '../../plugins/dirtylittlehelper/images/dirtylittlehelper_ovl_sprite.png',
		);

	}//function dirtylittlehelper_insert_button




	function dirtylittlehelper_after_render(&$event, $param) {
		global $INFO;

		if( $INFO['dlh']['tabs_count'] > 0 ){
			echo '<div id="dlh_tabs4jQuery" style="display:none;" '
				.' data-tabs_count="'.$INFO['dlh']['tabs_count'].'" ';
				
			for( $i=0; $i < $INFO['dlh']['tabs_count']; $i++ ){
				$ip1 = $i+1;
				echo ' data-group'.$ip1.'_id="'.$INFO['dlh']['tabs'][$i]['id'].'" ' ;
				echo ' data-group'.$ip1.'_count="'. $INFO['dlh']['tabs'][$i]['count'] .'"' ;
				
				for( $ii = 0; $ii < $INFO['dlh']['tabs'][$i]['count']; $ii++){
					$iip1 = $ii+1;
					echo ' data-group'.$ip1.'_title_'.$iip1.'="'. htmlspecialchars(trim( $INFO['dlh']['tabs'][$i]['titles'][$iip1] ) , ENT_QUOTES) .'" ';
				}//walk inside group
				
			}// walk tab_groups
			
			
			
			echo '></div>';
			
		} //TABS?

		echo '<!-- dirtylittlehelper START --><div id="dlh_is_tablet"></div><div id="dlh_is_phone"></div>';
		echo $this->dlh_overlay;
		echo $this->dlh_topmenu;
		echo '<!-- dirtylittlehelper END -->';
	}

	function dirtylittlehelper_varis(&$event, $param){

		global $ACT, $JSINFO, $ID, $INPUT, $auth, $TPL, $INFO, $conf;

		$INFO['dlh'] = array(
			  'isadmin' 	=> (int) $INFO['isadmin']
			, 'isauth'  	=> (int) $INFO['userinfo']
			, 'ACT' 		=> $ACT
			, 'title'       => $conf['title']
			, 'tabs'		=> array()
			, 'tabs_count'  => 0

			);



		//LOGIN NEEDED ?
		//NOT LOGGED IN ? -> FORCE LOGIN
		if( !$INFO['userinfo'] && $_GET['do']!='login' && $this->getConf('must_login') ) {
		  header("Location: ?do=login");
		  die('<a href="?do=login">LOGIN</a>');
		}

		$JSINFO['dlh'] = array(
			  'QUOT'                => '"'
			, 'WL'                  => wl('','',true)
			, 'DOKU_BASE'   => DOKU_BASE
			, 'DOKU_URL'    => DOKU_URL
			, 'isadmin'     => (int) $INFO['isadmin']
			, 'isauth'      => (int) $INFO['userinfo']
			, 'title'       => $conf['title']
		);

	if(is_array($ACT)) {
		$ACT = act_clean($ACT);
	}

   
	$regex = 'edit|preview';

	$INFO['dlh']['act_edit'] = preg_match("/" . $regex ."/",$ACT);
	$JSINFO['dlh']['act_edit'] = preg_match("/" . $regex ."/",$ACT);

			$JSINFO['dlh']['edit_active'] = 0;

			if($INFO['dlh']['act_edit'] && $INFO['dlh']['isadmin'] && $INFO['dlh']['isauth']){

					$JSINFO['dlh']['edit_active'] = $this->getConf('edit_active');

					if( $JSINFO['dlh']['edit_active']){
							$JSINFO['dlh']['edit_dlh_wikiid']       = $this->getConf('edit_dlh_wikiid');
							$JSINFO['dlh']['edit_tb_min_max']       = $this->getConf('edit_tb_minmax');
							$JSINFO['dlh']['edit_tb_maximize']      = $this->getConf('edit_tb_maximize');
							$JSINFO['dlh']['edit_tb_code']          = $this->getConf('edit_tb_code');
							$JSINFO['dlh']['edit_tb_mermaid']       = $this->getConf('edit_tb_mermaid');
							$JSINFO['dlh']['edit_tb_drawio']        = $this->getConf('edit_tb_drawio');
							$JSINFO['dlh']['edit_tb_struct']        = $this->getConf('edit_tb_struct');
							$JSINFO['dlh']['edit_tb_dlhid']         = $this->getConf('edit_tb_dlhid');
					}

			}//editor?

			$JSINFO['dlh']['top_active'] = $this->getConf('top_active');

			//ONLY IF ACT = EDIT/PREVIEW && CONF = 1 && ISADMIN && ISAUTH
			if( $INFO['dlh']['act_edit']
					&& $this->getConf('edit_active')
					&& $INFO['dlh']['isadmin']
					&& $INFO['dlh']['isauth']
			){


					$edit_dlh_wikiid = trim($this->getConf('edit_dlh_wikiid'));

					if($edit_dlh_wikiid){
							$edit_dlh_wiki_body =  p_wiki_xhtml($edit_dlh_wikiid);
					}else{
							$edit_dlh_wiki_body=false;
					}

					if(!$edit_dlh_wiki_body){
							$JSINFO['dlh']['edit_look4struct']='0';
							$edit_dlh_wiki_body='';
					}else{
							$JSINFO['dlh']['edit_look4struct']='1';
					}

					$text = <<<TEXT
<div id='dirtylittlehelper_overlay'>
<div class = "close">
<a href="javascript:jQuery('#dirtylittlehelper_overlay').toggle();void(0);"  rel="nofollow" title="close">close</a>
</div><div class="dirtylittlehelper_overlay_insert">$edit_dlh_wiki_body</div></div>

TEXT;

			$this->dlh_overlay .= $text;
  


		}//overlay?


		//TOPBAR
		//ONLY IF CONF = 1 && ISADMIN && ISAUTH
		if(   $this->getConf('top_active') 
			&& $INFO['dlh']['isadmin']
			&& $INFO['dlh']['isauth']
		){

			$topbar = '';
			
			//HELPER
			$top_helper_wikiid = trim($this->getConf('top_helper_wikiid'));

			if($top_helper_wikiid){ 
				$top_helper_wiki_body = p_wiki_xhtml($top_helper_wikiid);
			}else{
				$top_helper_wiki_body = false;
			}

			if(!$top_helper_wiki_body){
				$top_helper_wiki_body='';
			}else{
				$top_helper_wiki_body = '<div id="dlh_top_helper_a">&nbsp;&#128173;&nbsp;'
										.'<div id="dlh_top_helper_b">'
										.'<div id="dlh_top_helper_c1">'
										.$top_helper_wiki_body
										.'</div>'
										.'<div id="dlh_top_helper_c2">'
										.'<button class="dlh_top_helper_reload" title="reload" '
										.' onClick="dlh_ajax_wikiid_body(\''.$top_helper_wikiid.'\',\'dlh_top_helper_c1\');">&#128472;'
										.'</button>'
										.'</div>'
										.'</div>'
										.'</div>';
			}

			$topbar .= $top_helper_wiki_body;


			//TEMPLATES
			$templates = trim($this->getConf('top_templates') );
			if( $templates  != '' ) {

				$templates_out='';

				$templates = explode("\n" , $templates);

				foreach ($templates as $value){
					$value=explode('|',$value);

					if( isset( $value[0] ) && isset( $value[1] )){
						$value[0] = htmlspecialchars(trim($value[0]), ENT_QUOTES);
						$value[1] = htmlspecialchars(trim($value[1]), ENT_QUOTES);

						$templates_out .= '<option value="'.$value[1].'">'.$value[0].'</option>';
					}
				}

				if( $templates_out != '' ){

					$templates_out = '<select id="dlh_top_template">'
									. $templates_out
									. '</select>';
				}

				$topbar .= $templates_out;
			}
			//TEMPLATES


			//STRUCT LOOKUP
			
			$top_struct_wikiid = trim($this->getConf('top_struct_wikiid'));

			if($top_struct_wikiid){ 
				$top_struct_wiki_body = p_wiki_xhtml($top_struct_wikiid);
			}else{
				$top_struct_wiki_body = false;
			}

			
			if(!$top_struct_wiki_body){
				$top_struct_wiki_body='';
			}else{
				$top_struct_wiki_body = '<div id="dlh_top_struct_a">'
										.'<div id="dlh_top_struct_b">'
										.'</div>'
										.'<div id="dlh_top_struct_c">'
										.$top_struct_wiki_body
										.'</div>'
										.'</div>';
			}
			
			$topbar .= $top_struct_wiki_body;
			
			
			// top_pagesuggest
			if($this->getConf('top_pagesuggest')){

				$topbar .= '<div id="dlh_top_pagesuggest">'
							.'<input type="text" id="dlh_top_pagesuggest_input" title="pagesuggest">'
							.'<button id="dlh_top_pagesuggest_button" onClick="dlh_top_call(\'dlh_top_pagesuggest_input\');" title="call pagesuggest...">&GT;</button>'
							.'</div>';
				
			} //top_pagesuggest?

			// top_dlhid
			if($this->getConf('top_dlhid_active')){

				$topbar .= '<div id="dlh_top_dlhid">'
							.'<input type="text" id="dlh_top_dlhid_input" title="dlhID">'
							.'<button id="dlh_top_dlhid_button" onClick="dlh_renew_dlhid(\'dlh_top_dlhid_input\');" title="renew dlhID">*</button>'
							.'</div>';
				
			} //top_pagesuggest?
			
			
			
			
			//MENU?
			if( $this->getConf('top_adm_active') ){
				
				$topmenu = '';


				$dlh_for_left_side = array('usermanager', 'acl', 'extension', 'config', 'styling', 'revert', 'popularity');
				$dlh_left_side=array();
				$dlh_right_side=array();
			
				$hidden = trim($this->getConf('top_adm_link_wikiid'));
				$hidden_label = trim($this->getConf('top_adm_link_text'));
			
				if( $hidden_label == '') { $hidden_label = '&#8734 hidden area';}
				if( $hidden !='' ){
			
					$dlh_left_side[]=array('item'=>'hidden area'
											,'menutext'=> $hidden_label
											,'menuicon'=> false
											,'adminonly'=> 1
											,'link' => '?id=' . $hidden //wl($ID, array('id' => $hidden) )
											,'inline_icon' => ''
											);
				}//if hidden != ''

				$dlh_left_side[]=array('item'=>'check'
							,'menutext'=> '&#128736; check'
							,'menuicon'=> false
							,'adminonly'=> 1
							,'link' => '?do=check'
							,'inline_icon' => ''
							);

				$dlh_left_side[]=array('item'=>'purge'
							,'menutext'=> '&#128736; purge'
							,'menuicon'=> false
							,'adminonly'=> 1
							,'link' => '?purge=true'
							,'inline_icon' => ''
							);

				$dlh_left_side[]=array('item'=>'export_xhtmlbody'
							,'menutext'=> '&#128736; export_xhtmlbody'
							,'menuicon'=> false
							,'adminonly'=> 1
							,'link' => '?do=export_xhtmlbody'
							,'inline_icon' => ''
							);


				$dlh_left_side[]=array('item'=>'export_raw'
							,'menutext'=> '&#128736; export_raw !! .TXT FILE !!'
							,'menuicon'=> false
							,'adminonly'=> 1
							,'link' => '?do=export_raw'
							,'inline_icon' => ''
							);

			
			
				$dlh_plugin_list = plugin_list('admin',false);
			

				foreach($dlh_plugin_list as $thisplugin) {
					
					$tmp_plugin = plugin_load('admin', $thisplugin);
					
					if( $tmp_plugin !== null){
						
						$this_data = array(  'item'=>$thisplugin
											,'menutext'=> $tmp_plugin->getMenuText($conf['lang'])
											,'menuicon'=> $tmp_plugin->getMenuIcon()
											,'adminonly'=> $tmp_plugin->forAdminOnly()
											,'linkx' => wl($ID, array('do' => 'admin', 'page' => $thisplugin))
											,'link' => '?do=admin&page='.$thisplugin
											,'inline_icon' => preg_replace('/style="[^"]{1,99}"/i', '', 
																preg_replace('/width="[0-9a-z]{1,9}"/i', '', 
																	preg_replace('/height="[0-9a-z]{1,9}"/i', '', 
																	inlineSVG( $tmp_plugin->getMenuIcon() ) 
																	)
																) 
															  ) 
											);
						
						if( trim($this_data['menutext']) == '') { $this_data['menutext'] = ucfirst( $thisplugin );}
						
						if( in_array($thisplugin, $dlh_for_left_side )) {
							$dlh_left_side[] = $this_data;
							
						}else{
							$dlh_right_side[] = $this_data;
							
						}//left or right?

					}//if( $tmp_plugin !== null){
				
				}//foreach($dlh_plugin_list as $thisplugin) {

				$topmenu.= '<div class="dlh_top_menu">'
						 .'<div class="dlh_top_menu_dropdown_admin" id="dlh_topmenu_admin">'
						 .'<a class="dlh_top_menu_dropbtn_admin">~MENU~</a>'
						 .'<div class="dlh_top_menu_dropdown_content_admin">'
						 .'<table><tr><td>';

		  
				foreach( $dlh_left_side as $item){
					$topmenu .= '<a title="'.$item['menutext'].'" href="'.$item['link'].'">'.$item['inline_icon'].' '. $item['menutext'] .'</a>';
				}
			  
				$topmenu .= '</td><td>';
			  
				foreach( $dlh_right_side as $item){
					$topmenu .= '<a title="'.$item['menutext'].'" href="'.$item['link'].'">'.$item['inline_icon'].' '. $item['menutext'] .'</a>';
				}
			  
				$topmenu.= '</td></tr></table></div></div></div>';


				$topbar .= $topmenu;

			
			}//MENU?
			
			if( $topbar != ''){
				$this->dlh_topmenu .= '<div id="dlh_top0">'.$topbar.'</div>';
			}


		}//TOPBAR??



		
	} //function dirtylittlehelper_get_set_varis
	
	
  
	function dirtylittlehelper_add_js_mermaid(Doku_Event $event, $param){
		$event->data['script'][] = array(
                            'type'    => 'text/javascript',
                            'charset' => 'utf-8',
                            '_data'   => '',
                            'src' => DOKU_BASE."lib/plugins/dirtylittlehelper/script/mermaid.min.js");
		
		$event->data['script'][] = array(
                    'type'    => 'text/javascript',
                    'charset' => 'utf-8',
                    '_data'   => 'document.addEventListener("DOMContentLoaded", function(event) {   mermaid.initialize({securityLevel: "loose"}); }); '
		    );
	}
    
	
	
	



/*

================== ================== ================== ================== ================== ================== ================== 
================== ================== ================== ================== ================== ================== ================== 
================== ================== ================== ================== ================== ================== ================== 
================== ================== ================== ================== ================== ================== ================== 
================== ================== ================== ================== ================== ================== ================== 
================== ================== ================== ================== ================== ================== ================== 


*/	
	
	
	
	
	
	
    function dirtylittlehelper_active(){

        global $ACT;
        
        if(is_array($ACT)) {
             $ACT = act_clean($ACT);
        }
        
        $regex = 'edit|preview';
        return preg_match("/" . $regex ."/",$ACT);

    }//function dirtylittlehelper_active





	
    function dirtylittlehelper_extendJSINFO(&$event, $param) {

        global $INFO, $JSINFO;

    	$JSINFO['dlh']=array(
	    
        'isadmin' => (int) $INFO['isadmin'],
        'isauth'  => (int) $INFO['userinfo'],
        'overlay' => $this->dirtylittlehelper_active(),
		'show_id' => $this->getConf('show_id'),
		'show_mermaid' => $this->getConf('show_mermaid'),
		'show_drawio' =>  $this->getConf('show_drawio'),
        'fullscreen_edit' =>  $this->getConf('fullscreen_edit'),
		'WL' => wl('','',true),
        'DOKU_BASE'=> DOKU_BASE,
        'DOKU_URL'=>DOKU_URL,
        'QUOT'=>'"'
	);
    }//function dirtylittlehelper_extendJSINFO

	
	
	
	function dirtylittlehelper_menu(&$event, $param){


		global $ID, $INPUT, $auth, $TPL, $INFO;

		if ($event->data['view']=='user' && $INFO['isadmin'] && $this->getConf('show_menu') && $this->dlh_top_menu_make === true ){
			
			$this->dlh_top_menu_make=false;
			
			$dlh_for_left_side = array('usermanager', 'acl', 'extension', 'config', 'styling', 'revert', 'popularity');
			$dlh_left_side=array();
			$dlh_right_side=array();
			
			$hidden = trim($this->getConf('hidden_area'));
			$hidden_label = trim($this->getConf('hidden_area_label'));
			
			if( $hidden_label == '') { $hidden_label = '&#8734 hidden area';}
			if( $hidden !='' ){
			
				$dlh_left_side[]=array('item'=>'hidden area'
										,'menutext'=> $hidden_label
										,'menuicon'=> false
										,'adminonly'=> 1
										,'link' => '?id=' . $hidden //wl($ID, array('id' => $hidden) )
										,'inline_icon' => ''
										);
			}//if hidden != ''

			$dlh_left_side[]=array('item'=>'check'
						,'menutext'=> '&#128736; check'
						,'menuicon'=> false
						,'adminonly'=> 1
						,'linkx' => wl($ID, array('do' => 'check') )
						,'link' => '?do=check'
						,'inline_icon' => ''
						);

			$dlh_left_side[]=array('item'=>'purge'
						,'menutext'=> '&#128736; purge'
						,'menuicon'=> false
						,'adminonly'=> 1
						,'linkx' => wl($ID, array('purge' => 'true') )
						,'link' => '?purge=true'
						,'inline_icon' => ''
						);

			
			
			$dlh_plugin_list = plugin_list('admin',false);
			

			foreach($dlh_plugin_list as $thisplugin) {
				
				$tmp_plugin = plugin_load('admin', $thisplugin);
				
				if( $tmp_plugin !== null){
					
					$this_data = array(  'item'=>$thisplugin
										,'menutext'=> $tmp_plugin->getMenuText($conf['lang'])
										,'menuicon'=> $tmp_plugin->getMenuIcon()
										,'adminonly'=> $tmp_plugin->forAdminOnly()
										,'linkx' => wl($ID, array('do' => 'admin', 'page' => $thisplugin))
										,'link' => '?do=admin&page='.$thisplugin
										,'inline_icon' => preg_replace('/style="[^"]{1,99}"/i', '', 
															preg_replace('/width="[0-9a-z]{1,9}"/i', '', 
																preg_replace('/height="[0-9a-z]{1,9}"/i', '', 
																inlineSVG( $tmp_plugin->getMenuIcon() ) 
																)
															) 
														  ) 
										);
					
					if( trim($this_data['menutext']) == '') { $this_data['menutext'] = ucfirst( $thisplugin );}
					
					if( in_array($thisplugin, $dlh_for_left_side )) {
						$dlh_left_side[] = $this_data;
						
					}else{
						$dlh_right_side[] = $this_data;
						
					}//left or right?

				}//if( $tmp_plugin !== null){
			
			}//foreach($dlh_plugin_list as $thisplugin) {

$toptext = <<<TOPTEXT
<div style="width:400px;display: inline;"><input type="text" id="dlh_top_newpage" title="autocomplete path" style="
    display: inline;
    width: 230px;
"><button onClick="dlh_call_top_new();" title="call AUTOCOMPLETE..." style="
    display: inline;
    margin-left: 5px;
">&GT;</button><input class="dlh_top_id" id="dlh_top_id" type="text" title="DLH AutoID" style="
    display: inline;
    width: 80px;
    margin-left: 5px;
"><button onClick="dlh_renew_dlhid('dlh_top_id');" title="RENEW DLH AutoID" style="
    display: inline;
    margin-left: 5px;
">*</button></div>
TOPTEXT;

$toptext2 = '';
if( $this->getConf('page_top')){
  $toptext2 = '<div id="dlh_topmenu_page">'.p_wiki_xhtml( $this->getConf('page_top'),'',false,'' ).'</div>';
}


                        echo '<div class="dlh_topmenu">'
. $toptext2
. $toptext

                                 . '<div class="dlh_topmenu_dropdown_admin" id="dlh_topmenu_admin">'
                                 .'<a class="dlh_topmenu_dropbtn_admin">ADMIN</a>'
                                 .'<div class="dlh_topmenu_dropdown_content_admin">';



//                      echo $toptext;
                        echo '<table><tr><td>';

		  
			foreach( $dlh_left_side as $item){
				echo '<a title="'.$item['menutext'].'" href="'.$item['link'].'">'.$item['inline_icon'].' '. $item['menutext'] .'</a>';
			}
		  
			echo '</td><td>';
		  
			foreach( $dlh_right_side as $item){
				echo '<a title="'.$item['menutext'].'" href="'.$item['link'].'">'.$item['inline_icon'].' '. $item['menutext'] .'</a>';
			}
		  
			echo '</td></tr></table></div></div></div>';
			
		}//if menu and admin 

	}//function dirtylittlehelper_menu
	
	

    function dirtylittlehelper_print_overlay(&$event, $param) {

        //exit if not needed...
        if(! $this->dirtylittlehelper_active() ){ return false; }

        global $ID, $INFO;
        $page = "";

        if(!$page) $page = trim($this->getConf('page'));

        if(!$page) return;

        $insert =  p_wiki_xhtml($page);

        if(!$insert) return;

        $close = trim($this->getLang('close'));

        $text = <<<TEXT
<div id='dirtylittlehelper_overlay'>
<div  class = "close">
<a href="javascript:jQuery('#dirtylittlehelper_overlay').toggle();void(0);"  rel="nofollow" title="$close">$close</a>
</div><div class="dirtylittlehelper_ovl-insert">$insert</div></div>

TEXT;
	echo $text;
  
        

    }//function dirtylittlehelper_print_overlay


    
}//class action_plugin_dirtylittlehelper




