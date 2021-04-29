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

class syntax_plugin_dirtylittlehelper extends DokuWiki_Syntax_Plugin
{
        var $dlh_thetree = '';
        var $dlh_no_tree = false;
        var $dlh_tree_count=0;

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
                $this->Lexer->addEntryPattern('~~dlhmm',$mode,'plugin_dirtylittlehelper');
                $this->Lexer->addEntryPattern('~~dlh\*',$mode,'plugin_dirtylittlehelper');
                $this->Lexer->addSpecialPattern('~~dlhtree~~',$mode,'plugin_dirtylittlehelper');
                $this->Lexer->addSpecialPattern('~~dlhnosb~~',$mode,'plugin_dirtylittlehelper');

        }

        public function postConnect()
        {
                $this->Lexer->addExitPattern('\/dlh~~','plugin_dirtylittlehelper');

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

                                switch ($match){

                                        case '~~dlhtree~~':
                                                $this->dlh_handle='TREE';
                                                return array($state, '<DLH-DO:START:'.$this->dlh_handle);

                                        case '~~dlhnosb~~':
                                                $this->dlh_handle='NOSB';
                                                return array($state, '<DLH-DO:START:'.$this->dlh_handle);
                                }

                                break;


                        case DOKU_LEXER_ENTER:
                                if($match=='~~dlhmm'){
                                        $this->dlh_handle='MERMAID';
                                }
                                elseif($match=='~~dlh*' || $match=='~~/'.'*' ){
                                        $this->dlh_handle='COMMENT';
                                }

                                return array($state, '<DLH-DO:START:'.$this->dlh_handle);

                        case DOKU_LEXER_UNMATCHED :
                                if( $this->dlh_handle != 'COMMENT'){
                                        return array($state, $match);
                                }

                        case DOKU_LEXER_EXIT :
                                $x = '<DLH-DO:END:'.$this->dlh_handle;
                                $this->dlh_handle='';
                                return array($state,$x);
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

                        if($data[1]=='<DLH-DO:START:MERMAID'){
                                // securityLevel loose allows more advanced functionality such as subgraphs to run.
                                // @todo: this should be an option in the interface.
                                $renderer->doc .= '<div class="mermaid">';

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
                                                                                .'         if(  JSINFO[\'id\'].indexOf( jQuery(this).attr(\'title\')) ==0 ){ '
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

                        }elseif($data[1]=='<DLH-DO:END:MERMAID'){
                                $renderer->doc .= "</div>";


                        }elseif(substr($data[1],0,8) != '<DLH-DO:'){
                                $renderer->doc .= $data[1];
                        }


                        return true;


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
                $this->dlh_thetree .=  $match[0];

                $data = array();
                search($data,$conf['datadir'],'search_index',array('ns' => $ns));

                $this->dlh_thetree .=   '<div class="dlh_ontheleft"><div id="sb__index__tree">' . DOKU_LF;
                $this->dlh_thetree .=   html_buildlist($data,'idx','html_list_index','html_li_index');
                $this->dlh_thetree .=   '</div></div>' . DOKU_LF;

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

                $this->dlh_thetree .=   '<span class="sb_label">' . $lang['navigation'] . '</span>' . DOKU_LF;
                $this->dlh_thetree .=   '<aside id="navigation" class="sidebar_box">' . DOKU_LF;
                $this->dlh_thetree .=   $this->dlh_dokubook_p_index_xhtml(cleanID($svID));
                $this->dlh_thetree .=   '</aside>' . DOKU_LF;

        } //function dlh_dokubook_tree

} //class




