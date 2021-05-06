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

class syntax_plugin_dirtylittlehelper_0syntax extends DokuWiki_Syntax_Plugin
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
                $this->Lexer->addEntryPattern('\<dlh\.\*\>',$mode,'plugin_dirtylittlehelper_'.$this->getPluginComponent());
                $this->Lexer->addSpecialPattern('\<dlh\.nosb\>',$mode,'plugin_dirtylittlehelper_'.$this->getPluginComponent());


                $this->Lexer->addSpecialPattern('\<dlh\.div[^\>]*\>',$mode,'plugin_dirtylittlehelper_'.$this->getPluginComponent());
                $this->Lexer->addSpecialPattern('\<\/dlh\.div\>',$mode,'plugin_dirtylittlehelper_'.$this->getPluginComponent());

                $this->Lexer->addSpecialPattern('\<dlh\.style[^\>]*\>',$mode,'plugin_dirtylittlehelper_'.$this->getPluginComponent());
                $this->Lexer->addSpecialPattern('\<\/dlh\.style\>',$mode,'plugin_dirtylittlehelper_'.$this->getPluginComponent());

                $this->Lexer->addSpecialPattern('\<dlh\.table[^\>]*\>',$mode,'plugin_dirtylittlehelper_'.$this->getPluginComponent());
                $this->Lexer->addSpecialPattern('\<\/dlh\.table\>',$mode,'plugin_dirtylittlehelper_'.$this->getPluginComponent());

                $this->Lexer->addSpecialPattern('\<dlh\.tr[^\>]*\>',$mode,'plugin_dirtylittlehelper_'.$this->getPluginComponent());
                $this->Lexer->addSpecialPattern('\<\/dlh\.tr\>',$mode,'plugin_dirtylittlehelper_'.$this->getPluginComponent());

                $this->Lexer->addSpecialPattern('\<dlh\.td[^\>]*\>',$mode,'plugin_dirtylittlehelper_'.$this->getPluginComponent());
                $this->Lexer->addSpecialPattern('\<\/dlh\.td\>',$mode,'plugin_dirtylittlehelper_'.$this->getPluginComponent());


        }

        public function postConnect()
        {
                $this->Lexer->addExitPattern('\<\/dlh\>','plugin_dirtylittlehelper_'.$this->getPluginComponent());

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


                                if (  $match == '<dlh.nosb>'){
                                        $this->dlh_no_tree = true;
                                        $this->dlh_handle='NOSB';
                                        return array($state, '<DLH-DO:START:'.$this->dlh_handle,$match);

                                }elseif(  substr( $match,0,12) == '</dlh.table>'
                                      ||  substr( $match,0, 9) == '</dlh.tr>'
                                      ||  substr( $match,0, 9) == '</dlh.td>'
                                      ||  substr( $match,0,10) == '</dlh.div>'
                                      ||  substr( $match,0,12) == '</dlh.style>'
                                        ){
                                        $this->dlh_handle='TAG_CLOSE';

                                        return array($state, '<DLH-DO:START:'.$this->dlh_handle,$match);


                                }elseif(   substr($match,0,8)  == '<dlh.div'
                                        || substr($match,0,10) == '<dlh.style'
                                        || substr($match,0,10) == '<dlh.table'
                                        || substr($match,0,7) == '<dlh.tr'
                                        || substr($match,0,7) == '<dlh.td'
                                        ){
                                        $this->dlh_handle='TAG_OPEN';
                                        return array($state, '<DLH-DO:START:'.$this->dlh_handle,$match);
                                }

                                break;


                        case DOKU_LEXER_ENTER:
                                if($match=='<dlh.*>' ){
                                        $this->dlh_handle='COMMENT';
                                }

                                return array($state, '<DLH-DO:START:'.$this->dlh_handle,$match);

                        case DOKU_LEXER_UNMATCHED :
                                if( $this->dlh_handle != 'COMMENT'){
                                        return array($state, $match,$match);
                                }

                        case DOKU_LEXER_EXIT :
                                $x = '<DLH-DO:END:'.$this->dlh_handle;
                                $this->dlh_handle='';
                                return array($state,$x,$match);
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

                        if(  $data[1]=='<DLH-DO:START:TAG_OPEN' ){
                                $renderer->doc .= str_replace('<dlh.','<',$data[2]);

                        }elseif(  $data[1]=='<DLH-DO:START:TAG_CLOSE' ){
                                $renderer->doc .= str_replace('</dlh.','</',$data[2]);

                        }elseif(  $data[1]=='<DLH-DO:START:TREE' ){
                                if( $this->dlh_no_tree === false && $this->dlh_tree_count == 0 ) {

                                        if($this->dlh_thetree==''){
                                                //build the tree
                                                $this->dlh_dokubook_tree( substr($_SERVER['PATH_INFO'],1) );
                                                $this->dlh_thetree .= '<script>'
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

                                        } //BUILD TREE

                                        $this->dlh_tree_count = 1;

                                        $renderer->doc .= $this->dlh_thetree;

                                }elseif( $this->dlh_no_tree === false && $this->dlh_tree_count != 0){
                                        $renderer->doc .= '<div class="dlh_one_tree_only">! one tree only !</div>';
                                }


                        }elseif($data[1]=='<DLH-DO:START:NOSB'){
                                $renderer->doc .= '<style> '
                                                                .' #dokuwiki__aside{ display:none !important;}  '
                                                                .' #dokuwiki__aside *{ display:none !important;}   '
                                                                .' .showSidebar #dokuwiki__content > .pad{ margin-left:0px !important; } '
                                                                .' </style>';

                        }elseif(substr($data[1],0,8) != '<DLH-DO:'){
                                $renderer->doc .= $data[1];
                        }


                        return true;


                } //mode xhtml

        return false;

        } //function render



} //class






