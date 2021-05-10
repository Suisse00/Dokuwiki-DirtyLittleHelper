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

class syntax_plugin_dirtylittlehelper_tablehtml extends DokuWiki_Syntax_Plugin
{
        var $dlh_handle = '';

        /**
        * @return string Syntax mode type
        */
        public function getType()
        {
                return 'protected';
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
                $this->Lexer->addEntryPattern('\<dlh\.table\.html[^\>]*\>',$mode,'plugin_dirtylittlehelper_'.$this->getPluginComponent());
        }

		
        public function postConnect()
        {
                $this->Lexer->addExitPattern('\<\/dlh\.table\.html\>','plugin_dirtylittlehelper_'.$this->getPluginComponent());

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

                        case DOKU_LEXER_ENTER:
                                if( substr($match,0,3) =='<dl'){
                                        return array($state, 'BEGIN',$match);
                                }

                        case DOKU_LEXER_UNMATCHED :
								return array($state, 'UNMATCHED', $match);

                        case DOKU_LEXER_EXIT :
                                if( substr($match,0,3) =='</d'){
                                        return array($state, '/END',$match);
                                }
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
                                $renderer->doc .= str_replace('<dlh.table.html','<table',$data[2]);;
								return true;

                        }elseif($data[1]=='/END'){
                                $renderer->doc .= "</table>";
								return true;


                        }elseif($data[1]=='UNMATCHED'){
                                $renderer->doc .= $data[2];
								return true;
                        }

                        return false;


                } //mode xhtml

        return false;

        } //function render


} //class






