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

    function register(Doku_Event_Handler $controller) {


    $controller->register_hook('DOKUWIKI_STARTED', 'AFTER',  $this, 'dirtylittlehelper_set_admin');
    $controller->register_hook('DOKUWIKI_STARTED', 'AFTER', $this, 'dirtylittlehelper_extendJSINFO');
    $controller->register_hook('TPL_ACT_RENDER', 'AFTER',  $this, 'dirtylittlehelper_print_overlay', array('after'));
    $controller->register_hook('MENU_ITEMS_ASSEMBLY', 'AFTER', $this, 'dirtylittlehelper_menu', array());
    $controller->register_hook('TOOLBAR_DEFINE', 'AFTER', $this, 'dirtylittlehelper_insert_button', array ());
    $controller->register_hook('TPL_METAHEADER_OUTPUT', 'BEFORE', $this, 'dirtylittlehelper_mermaid');
        

    }

  
	function dirtylittlehelper_mermaid(Doku_Event $event, $param){
		$event->data['script'][] = array(
                            'type'    => 'text/javascript',
                            'charset' => 'utf-8',
                            '_data'   => '',
                            'src' => DOKU_BASE."lib/plugins/dirtylittlehelper/mermaid.min.js");
		
		$event->data['script'][] = array(
                    'type'    => 'text/javascript',
                    'charset' => 'utf-8',
                    '_data'   => 'document.addEventListener("DOMContentLoaded", function(event) {   mermaid.initialize({securityLevel: "loose"}); }); '
		    );
	}
    
    function dirtylittlehelper_active(){

        global $ACT;
        
        if(is_array($ACT)) {
             $ACT = act_clean($ACT);
        }
        
        $regex = 'edit|preview';
        return preg_match("/" . $regex ."/",$ACT);

    }//function dirtylittlehelper_active


    function dirtylittlehelper_insert_button(Doku_Event $event, $param) {

        $event->data[] = array (
        'type' => 'dirtylittlehelper',
        'title' => 'DLH', //$this->getLang('abutton'),
        'icon' => '../../plugins/dirtylittlehelper/dirtylittlehelper_ovl_sprite.png',
        );

    }//function dirtylittlehelper_insert_button



	
    function dirtylittlehelper_extendJSINFO(&$event, $param) {

        global $INFO, $JSINFO;

        $JSINFO['isadmin'] = (int) $INFO['isadmin'];
        $JSINFO['isauth']  = (int) $INFO['userinfo'];

    }//function dirtylittlehelper_extendJSINFO

	
	
    function dirtylittlehelper_set_admin(&$event, $param) {

        global $JSINFO;

        $JSINFO['dirtylittlehelper_overlay'] = $this->dirtylittlehelper_active();
	$JSINFO['dirtylittlehelper_show_id'] = $this->getConf('show_id');
	$JSINFO['dirtylittlehelper_show_mermaid'] = $this->getConf('show_mermaid');
	$JSINFO['dirtylittlehelper_show_drawio'] =  $this->getConf('show_drawio');

    }//function dirtylittlehelper_set_admin

	
	
	
	
	function dirtylittlehelper_menu(&$event, $param){


		global $ID, $INPUT, $auth, $TPL, $INFO;

		if ($event->data['view']=='user' && $INFO['isadmin'] && $this->getConf('show_menu') ){
			
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



			
			echo '<div class="dlh_topmenu_dropdown_admin" id="dlh_topmenu_admin">'
				 .'<a class="dlh_topmenu_dropbtn_admin">ADMIN</a>'
				 .'<div class="dlh_topmenu_dropdown_content_admin">'
				 .'<table><tr><td>';
		  
			foreach( $dlh_left_side as $item){
				echo '<a title="'.$item['menutext'].'" href="'.$item['link'].'">'.$item['inline_icon'].' '. $item['menutext'] .'</a>';
			}
		  
			echo '</td><td>';
		  
			foreach( $dlh_right_side as $item){
				echo '<a title="'.$item['menutext'].'" href="'.$item['link'].'">'.$item['inline_icon'].' '. $item['menutext'] .'</a>';
			}
		  
			echo '</td></tr></table></div></div>';
			
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




