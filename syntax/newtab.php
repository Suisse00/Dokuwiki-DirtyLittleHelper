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

class syntax_plugin_dirtylittlehelper_newtab extends DokuWiki_Syntax_Plugin
{
        var $dlh_handle = '';

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
                $this->Lexer->addSpecialPattern('\<dlh\.newtab[^\>]*\>',$mode,'plugin_dirtylittlehelper_'.$this->getPluginComponent());
                $this->Lexer->addSpecialPattern('\<\/dlh\.newtab\>',$mode,'plugin_dirtylittlehelper_'.$this->getPluginComponent());

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

			if( substr($match,0,3) =='<dl'){
				return array($state, 'BEGIN',$match);
			}elseif( substr($match,0,3) =='</d'){
				return array($state, 'END',$match);
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
			global $INFO;
			
                if ($mode == 'xhtml') {

                        if($data[1]=='BEGIN'){
							$this_no = $INFO['dlh']['tabs_count'];
							//check if already in tab-mode
							if(! isset( $INFO['dlh']['tabs'][ $this_no ] ) ){

								$this_no = $INFO['dlh']['tabs_count'];
								$INFO['dlh']['tabs'][ $this_no ] = array(
									  'id' => md5(hrtime(true))
									, 'count' => 0
									, 'titles' => array()
								);
								$this_array = $INFO['dlh']['tabs'][ $this_no ];
								$renderer->doc .= '<div class="dlh_tabs_outer"><div id="dlh_tab_master_'.$this_array['id'].'">'
									 .'<div id="dlh_tab_head_'.$this_array['id'].'" style="display:none;">'
									//.'</div>'
									;
							}
							$this_array = $INFO['dlh']['tabs'][ $this_no ];
							$this_array['count']++;
								
							$tabtitle = trim( substr( str_replace('<dlh.newtab','',$data[2]) ,0,-1) );
							
							$this_array['titles'][ $this_array['count'] ] = $tabtitle;

							$renderer->doc .= '</div><div id="dlh_tab__'.$this_array['id'].'_'.$this_array['count'].'">';
							$INFO['dlh']['tabs'][ $this_no ] = $this_array;
							return true;
                        }elseif($data[1]=='END'){
								$renderer->doc .= '</div></div></div>';
								$INFO['dlh']['tabs_count']++;
								return true;
						}

                        return false;


                } //mode xhtml

        return false;

        } //function render


} //class






