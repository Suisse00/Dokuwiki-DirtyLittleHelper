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

class syntax_plugin_dirtylittlehelper_sidebar extends DokuWiki_Syntax_Plugin
{

		$togglesb_html = '<input type="hidden" id="dlh_left_tmp_sb" value="x">'
						.'<input type="hidden" id="dlh_left_tmp_content" value="x">'
						.'<input type="hidden" id="dlh_left_tmp_status" value="show">'
						.'<button onClick="dlh_sb_toggle();" class="dlh_left_button_sb_toggle">&nbsp;</button>';

		$hidesb_html = 'document.addEventListener("DOMContentLoaded", function(event) { '
						.' dlh_sb_toggle(\'hide\');'
						.' }); ';
						
		$force_nosb = false;
		
		$nosb_html = '<style> '
						.' #dokuwiki__aside{ display:none !important;}  '
						.' #dokuwiki__aside *{ display:none !important;}   '
						.' .showSidebar #dokuwiki__content > .pad{ margin-left:0px !important; } '
						.' </style>';
						
		
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
                $this->Lexer->addSpecialPattern('\<dlh\.togglesb\>',$mode,'plugin_dirtylittlehelper_'.$this->getPluginComponent());
                $this->Lexer->addSpecialPattern('\<dlh\.nosb\>',$mode,'plugin_dirtylittlehelper_'.$this->getPluginComponent());
                $this->Lexer->addSpecialPattern('\<dlh\.hidesb\>',$mode,'plugin_dirtylittlehelper_'.$this->getPluginComponent());
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

                                if ($match == '<dlh.togglesb>'){
									return array( $state, 'TOGGLESB',$match);

                                }elseif(  $match == '<dlh.nosb>'){
									$this->force_nosb = true;
									return array($state, 'NOSB',$match);

								}elseif(  $match == '<dlh.hidesb>'){
									return array($state, 'HIDESB',$match);
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

                        if(  $data[1]=='TOGGLESB' ){
							
							 
							if( $this->force_nosb == false){
									$renderer->doc .= $this->togglesb_html;
									return true;
							}
							return true;

                        }elseif($data[1]=='HIDESB'){
                                $renderer->doc .= $this->hidesb_html;
								return true;

                        }elseif($data[1]=='NOSB'){
								$renderer->doc .= $this->nosb_html;
								return true;

						}


                        return false;


                } //mode xhtml

				return false;

        } //function render




} //class






