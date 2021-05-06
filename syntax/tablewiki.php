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

class syntax_plugin_dirtylittlehelper_tablewiki extends DokuWiki_Syntax_Plugin
{
        var $dlh_handle = '';
		var $dlh_tmp = '';

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
                $this->Lexer->addSpecialPattern('\<dlh\.table\.wiki[^\>]*\>',$mode,'plugin_dirtylittlehelper_'.$this->getPluginComponent());
                $this->Lexer->addSpecialPattern('\<\/dlh\.table\.wiki\>',$mode,'plugin_dirtylittlehelper_'.$this->getPluginComponent());

				$this->Lexer->addSpecialPattern('\<dlh\.caption\.wiki[^\>]*\>',$mode,'plugin_dirtylittlehelper_'.$this->getPluginComponent());
                $this->Lexer->addSpecialPattern('\<\/dlh\.caption\.wiki\>',$mode,'plugin_dirtylittlehelper_'.$this->getPluginComponent());

				$this->Lexer->addSpecialPattern('\<dlh\.th\.wiki[^\>]*\>',$mode,'plugin_dirtylittlehelper_'.$this->getPluginComponent());
                $this->Lexer->addSpecialPattern('\<\/dlh\.th\.wiki\>',$mode,'plugin_dirtylittlehelper_'.$this->getPluginComponent());

				$this->Lexer->addSpecialPattern('\<dlh\.tr\.wiki[^\>]*\>',$mode,'plugin_dirtylittlehelper_'.$this->getPluginComponent());
                $this->Lexer->addSpecialPattern('\<\/dlh\.tr\.wiki\>',$mode,'plugin_dirtylittlehelper_'.$this->getPluginComponent());

				$this->Lexer->addSpecialPattern('\<dlh\.td\.wiki[^\>]*\>',$mode,'plugin_dirtylittlehelper_'.$this->getPluginComponent());
                $this->Lexer->addSpecialPattern('\<\/dlh\.td\.wiki\>',$mode,'plugin_dirtylittlehelper_'.$this->getPluginComponent());

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
				return array($state, '/END',$match);

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

                        if($data[1]=='BEGIN'){
                                // securityLevel loose allows more advanced functionality such as subgraphs to run.
                                // @todo: this should be an option in the interface.
                                $renderer->doc .= str_replace('.wiki' , '' ,  str_replace('<dlh.','<',$data[2]) );
								return true;

                        }elseif($data[1]=='/END'){
                                $renderer->doc .= str_replace('.wiki' , '' ,  str_replace('</dlh.','</',$data[2]) );
								return true;

                        }

                        return false;


                } //mode xhtml

        return false;

        } //function render


} //class






