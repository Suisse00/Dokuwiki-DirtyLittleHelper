<?php
/**
* DokuWiki Plugin dirtylittlehelper (Syntax Component)
*
* @license GPL 2 http://www.gnu.org/licenses/gpl-2.0.html
* @author  KalleAPunkt
*/

// must be run within Dokuwiki
if (!defined('DOKU_INC')) {
die();
}

class syntax_plugin_dirtylittlehelper_tree extends DokuWiki_Syntax_Plugin
{
        var $dlh_tree_html  = '';
        var $dlh_tree_no    = false;
        var $dlh_tree_count = 0;
        var $dlh_tree_force = false;

        /**
        * @return string Syntax mode type
        */
        public function getType()
        {
                return 'substition';
        }

        /**
        * @return string Paragraph type
        */
        public function getPType()
        {
                return 'normal';
        }

        /**
        * @return int Sort order - Low numbers go before high numbers
        */
        public function getSort()
        {
                return 150;
        }

        /**
        * Connect lookup pattern to lexer.
        *
        * @param string $mode Parser mode
        */
        public function connectTo($mode)
        {
                $this->Lexer->addSpecialPattern('\<dlh\.tree\>',$mode,'plugin_dirtylittlehelper_'.$this->getPluginComponent());
                $this->Lexer->addSpecialPattern('\<dlh\.notree\>',$mode,'plugin_dirtylittlehelper_'.$this->getPluginComponent());
                $this->Lexer->addSpecialPattern('\<dlh\.forcetree\>',$mode,'plugin_dirtylittlehelper_'.$this->getPluginComponent());
        }



        /**
        * Handle matches of the DLH syntax
        *
        * @param string       $match   The match of the syntax
        * @param int          $state   The state of the handler
        * @param int          $pos     The position in the document
        * @param Doku_Handler $handler The handler
        *
        * @return array Data for the renderer
        */
        public function handle($match, $state, $pos, Doku_Handler $handler)
        {

                switch ($state) {

                        case DOKU_LEXER_SPECIAL:

                                if ($match == '<dlh.tree>'){
									return array( $state, 'TREE',$match);

                                }elseif(  $match == '<dlh.notree>'){
									$this->dlh_tree_no = true;
									return array($state, 'NOTREE',$match);

								}elseif(  $match == '<dlh.forcetree>'){
									$this->dlh_tree_no = true;
									$this->dlh_tree_force = true;
									return array($state, 'FORCETREE',$match);
                                }

						break;

                }
        return false;

        } //handle


        /**
        * Render xhtml output or metadata
        *
        * @param string        $mode     Renderer mode (supported modes: xhtml)
        * @param Doku_Renderer $renderer The renderer
        * @param array         $data     The data from the handler() function
        *
        * @return bool If rendering was successful.
        */
        public function render($mode, Doku_Renderer $renderer, $data)
        {
                if ($mode == 'xhtml') {

                        if(  $data[1]=='TREE' || $data[1] == 'FORCETREE' ){
							
							// if the tree is not build yet - do it 
							if( $this->dlh_tree_html == ''){

								$this->dlh_dokubook_tree( substr($_SERVER['PATH_INFO'],1) );
								$this->dlh_tree_html .= '<script>'
															.' document.addEventListener("DOMContentLoaded", function(event) { '
																.' /* attach the AJAX index to the sidebar index */ '
																.' var sb_dw_index = jQuery(\'#left__index__tree\').dw_tree({deferInit: true, '
																.' load_data: function  (show_sublist, $clicky) { '
																.' jQuery.post( '
																.' DOKU_BASE + \'lib/exe/ajax.php\', '
																.' $clicky[0].search.substr(1) + \'&call=index\', '
																.' show_sublist, \'html\' '
																.' ); '
																.' } '
																.' }); '
																.'  '
																.' var $tree = jQuery(\'#sb__index__tree\'); '
																.' sb_dw_index.$obj = $tree; '
																.' sb_dw_index.init(); '
																.'  '
																.' '
																.' jQuery(\'.dlh_ontheleft *\').each( '
																.'     function(){ '
																.'         if(  JSINFO[\'id\'].indexOf( jQuery(this).attr(\'title\')+\':\' ) == 0 '
																.'           || JSINFO[\'id\'] == jQuery(this).attr(\'title\') '
																.'             ){ '
																.'             jQuery(this).css({\'color\':\'BLACK\'}); '
																.'         } '
																.'     }     '
																.'  '
																.'  );'
																.'  '
																.' }); '
																.' </script> '
																.' ';									
								
							}// build tree?
							
							//normal tree 
							if( $data[1] == 'TREE' ){
								if( $this->dlh_tree_no == false && $this->dlh_tree_force == false){
									if( $this->dlh_tree_count == 0){
										$renderer->doc .$this->dlh_tree_html;
										$this->dlh_tree_count =1;
										return true;
									}else{
										$renderer->doc .= '<div class="dlh_one_tree_only">! one tree only !</div>';
										return true;
									}//count==0?
								}else{
									//no tree to build...
									return true;
								}//notree & forcetree are false
							}//normal tree
							
							if( $data[1] == 'FORCETREE'){
								if( $this->dlh_tree_count == 0){
									$renderer->doc .$this->dlh_tree_html;
									$this->dlh_tree_count =1;
									return true;
								}else{
									$renderer->doc .= '<div class="dlh_one_tree_only">! one tree only !</div>';
									return true;
								}//count==0?
							}




                        }elseif($data[1]=='NOTREE'){
                                $renderer->doc .= '';
								return true;
                        }


                        return false;


                } //mode xhtml

        return false;

        } //function render


        function dlh_dokubook_p_index_xhtml($ns) {

                require_once(DOKU_INC.'inc/search.php');

                global $conf;
                global $ID;

                $dir = $conf['datadir'];

                $ns  = cleanID($ns);

                #fixme use appropriate function
                if(empty($ns)){

                        $ns = dirname(str_replace(':','/',$ID));

                        if($ns == '.') $ns ='';

                }

                $ns  = utf8_encodeFN(str_replace(':','/',$ns));

                // only extract headline
                preg_match('/<h1>.*?<\/h1>/', p_locale_xhtml('index'), $match);
                $this->dlh_tree_html .=  $match[0];

                $data = array();
                search($data,$conf['datadir'],'search_index',array('ns' => $ns));

                $this->dlh_tree_html .=   '<div class="dlh_ontheleft"><div id="sb__index__tree">' . DOKU_LF;
                $this->dlh_tree_html .=   html_buildlist($data,'idx','html_list_index','html_li_index');
                $this->dlh_tree_html .=   '</div></div>' . DOKU_LF;

        } //dlh_dokubook_p_index_xhtml




        function dlh_dokubook_tree( $dlh_target=false ){

                global $lang;
                global $ID;
                global $INFO;

                if( $dlh_target !== false){
                $svID  = cleanID($dlh_target);
                }else{
                $svID  = cleanID(':');
                }

                $this->dlh_tree_html .=   '<span class="sb_label">' . $lang['navigation'] . '</span>' . DOKU_LF;
                $this->dlh_tree_html .=   '<aside id="navigation" class="sidebar_box">' . DOKU_LF;
                $this->dlh_tree_html .=   $this->dlh_dokubook_p_index_xhtml(cleanID($svID));
                $this->dlh_tree_html .=   '</aside>' . DOKU_LF;

        } //function dlh_dokubook_tree

} //class






