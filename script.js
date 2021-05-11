
/* EDITOR BUTTON */

function addBtnActionDirtylittlehelper($btn, props, edid) {
	$btn.click(function() {
	jQuery('#dirtylittlehelper_overlay').toggle();
		return true;
	});
}




/* DLH FUNCTIONS */


function dlh_call_mermaid(source_obj = false){

	thecode = '';

	if( source_obj !== false ){

		if( document.getElementById( source_obj ) ){

			the_code = dlh_objectValueGet(source_obj).replace(/\n/g,'\\n').match(/<dlh.mm>(.*?)<\/dlh.mm>/g);

			if( Array.isArray( the_code ) ){

				the_code = btoa('{"code":"' + the_code[0].replace('<dlh.mm>','').replace('<\/dlh.mm>','') + '","mermaid":{},"updateEditor":false}');

			}else{

				the_code = '';

			}

		}
	}

	if( the_code == '' ){
		the_code = 'eyJjb2RlIjoiZ3JhcGggVEQgXG5JLS0tTElLRS0tLURPS1VXSUtJXG4iLCJtZXJtYWlkIjp7fSwidXBkYXRlRWRpdG9yIjpmYWxzZX0';
	}

	window.open(JSINFO['dlh']['DOKU_URL']+'lib/plugins/dirtylittlehelper/mermaid/editor/#/edit/'+the_code);
	return true;


} //function dlh_call_mermaid



function dlh_objectValueGet(dlh_source){
    var dlh_source_obj = document.getElementById(dlh_source);

    if( dlh_source_obj ){
        dlh_value = dlh_source_obj.value;
        if( dlh_value !== undefined){
            return dlh_value;
        }
    }
    return false;

}//function dlh_objectValueGet




function dlh_objectValueSet(dlh_target , dlh_value ){

    var dlh_target_obj = document.getElementById(dlh_target);

    if( dlh_target_obj ){
        dlh_target_obj.value = dlh_value;
    return true;
    }
    return false;

}//function dlh_objectValueSet




function dlh_open_wiki_link(dlh_wikilink){
   dlh_loc = window.location.href;
   dlh_loc = dlh_loc.substring(0, dlh_loc.indexOf('.php')+4);
   dlh_loc = dlh_loc + '/' + dlh_wikilink + '?' + Math.random();

   window.open(dlh_loc);

   return true;
} //function dlh_open_wiki_link




function dlh_fullcreen_edit(){

	if ( JSINFO['dlh']['dlh_edit_maximized'] === true){
		jQuery('#dokuwiki__content').css({'position':'','top':'','left':'','right':'','bottom':'','overflow':'', 'max-width':''});
		JSINFO['dlh']['dlh_edit_maximized'] = false ;
	}else{
		jQuery('#dokuwiki__content').css({'position':'fixed','top':'10px','left':'10px','right':'10px','bottom':'10px','overflow':'scroll','max-width':'1700px'});
		JSINFO['dlh']['dlh_edit_maximized'] = true ;
	}

} // function dlh_fullcreen_edit




function dlh_timeid(dlh_tenthofsec = false){

    if(dlh_tenthofsec === false){
        var dlh_arr_replace =[ 'a' , 'b' , 'c' , 'd' , 'e' , 'f' , 'g' , 'h' , 'k' , 'm' , 'n' , 'p' , 'r' , 's' , 't' , 'u' , 'v' , 'w'  ];
        var dlh_div_seconds = 1000;
        var dlh_base = 18;
    }else{
        var dlh_arr_replace =[ 'a' , 'b' , '1' , 'c' , 'd' , '2' , 'e' , 'f' , '3' , 'g' , 'h' , '4' , 'k' , 'm' , '5' , 'n' , 'p' , '6' , 'r' , 's' , '7' , 't' , 'u' , '8' , 'v' , 'w' , '9' ];
        var dlh_div_seconds = 100;
        var dlh_base = 27;
    }

    var dlh_dateNow = new Date();
    var dlh_secNow = dlh_dateNow.getTime()/dlh_div_seconds|0;

    var dlh_dateYear = new Date(dlh_dateNow.getFullYear(),0,1,0,0,0,0);
    var dlh_secYear = dlh_dateYear.getTime()/dlh_div_seconds|0;

    var dlh_sec = dlh_secNow - dlh_secYear;
    var dlh_rest = dlh_sec;
    var dlh_expo = 5;
    var dlh_return = 'x';
    var dlh_div = 0;
    var dlh_floor = 0;

    while ( dlh_rest > 0 && dlh_expo > 0 ) {

		dlh_div = dlh_base**dlh_expo;
        dlh_floor = Math.floor( dlh_rest / dlh_div );
        dlh_return = dlh_return + dlh_arr_replace[dlh_floor];
        dlh_rest = dlh_rest % dlh_div;
        dlh_expo--;

	}//while

    dlh_return = dlh_return + dlh_arr_replace[dlh_rest];
    dlh_return = dlh_return.replace("x","");

    return ((''+dlh_dateNow.getFullYear()).substr(-2))+ dlh_return

}//function dlh_timeid




function dlh_renew_dlhid(dlh_target_id){

    var dlh_target_obj = document.getElementById(dlh_target_id);

    if(dlh_target_obj){
       dlh_target_obj.value = dlh_timeid();
        return true;
    }

    return false;

}//dlh_renew_dlhid




function dlh_copyme(dlh_source_id){

    var dlh_source_obj = document.getElementById(dlh_source_id);

    if(dlh_source_obj){
        var dlh_value = dlh_source_obj.value;
        dlh_source_obj.select();
        dlh_source_obj.setSelectionRange(0, dlh_value.length); /* For mobile devices */
        document.execCommand("copy");

		console.log('SUCCESS javascript dlh_copyme - copied to clipboard: '.dlh_value);

	}else{
      console.log("ERROR javascript dlh_copyme - source not found:" + dlh_source_id);
    }

} //function dlh_copyme




function dlh_edit_tb_select(){

	if( JSINFO['dlh']['dlh_fields'] && JSINFO['dlh']['dlh_fields'].length > 0 ){
		for( i=0; i< JSINFO['dlh']['dlh_fields'].length; ++i ){
			jQuery( '#'+JSINFO['dlh']['dlh_fields'][i]).css('display','none');
		}
		jQuery( '#' + jQuery('#dlh_edit_tb_select').val() ).css('display','inline');
	}

} //function dlh_edit_tb_select




function dlh_sb_toggle(force=''){

	if ( dlh_objectValueGet('dlh_left_tmp_sb') == "x"){dlh_objectValueSet('dlh_left_tmp_sb',jQuery('#dokuwiki__aside').css('width').replace('px',''));}
	if ( dlh_objectValueGet('dlh_left_tmp_content') == "x"){dlh_objectValueSet('dlh_left_tmp_content',jQuery('.showSidebar #dokuwiki__content > .pad').css('margin-left').replace('px',''));}

	if( dlh_objectValueGet('dlh_left_tmp_status')=='show' || force == 'hide'){
		jQuery('#dokuwiki__aside').css({'width': '0px'});
		jQuery('.showSidebar #dokuwiki__content > .pad').css({'margin-left': '0px'});
		dlh_objectValueSet( 'dlh_left_tmp_status','hide');
		return true;
	}

	if( dlh_objectValueGet('dlh_left_tmp_status')=='hide' || force == 'show'){ 
		jQuery('#dokuwiki__aside').css({'width': dlh_objectValueGet('dlh_left_tmp_sb')+'px' });
		jQuery('.showSidebar #dokuwiki__content > .pad').css({'margin-left': dlh_objectValueGet('dlh_left_tmp_content')+'px' });
		dlh_objectValueSet( 'dlh_left_tmp_status','show');
		return true;
	}
	
} //function dlh_sb_toggle




/* DLH INI */

function dlh_ini(count=0){

	if(count>100){
		return false;
	}

	++count;

	if(! JSINFO){
		setTimeout(dlh_ini, 100, count);
		return false;
	}

	if(! JSINFO['dlh']['ini_step_done']){
		JSINFO['dlh']['ini_step_done']=0;
	}


	var dlh_ini_step_at = 1;


	//OVERLAY
	if( dlh_ini_step_at > JSINFO['dlh']['ini_step_done'] ){

		if(JSINFO && JSINFO['dlh']['act_edit'] && JSINFO['dlh']['edit_active']) {

			JSINFO['dlh']['dlh_theUserposition']= {'x':200,'y':200,'position':'absolute'};

			jQuery( document ).ready(function() {
				jQuery( "#dirtylittlehelper_overlay" ).draggable({
					drag: function(event,ui){
					var position = jQuery(this).position();
					JSINFO['dlh']['dlh_theUserposition'].y = position.top;
					JSINFO['dlh']['dlh_theUserposition'].x =position.left;
					},
					stop: function(){
					var position = jQuery(this).position();
					JSINFO['dlh']['dlh_theUserposition'].y = position.top;
					JSINFO['dlh']['dlh_theUserposition'].x =position.left;
					jQuery(this).css('left',position.left);
					jQuery(this).css('top',position.top);
					},
				});
			});

			jQuery(window).on("load", function(){
				pleft = 'auto';
				ptop = '40px' ;
				pright = '40px';
				pwidth = '500px';
				pheight = '450px';
				ptype= 'fixed' ;
				jQuery("#dirtylittlehelper_overlay" ).css({top: ptop, right: pright,  left: pleft, position:ptype, width: pwidth, height: pheight });
			});

		} //if overlay

		++JSINFO['dlh']['ini_step_done'];
	} //OVERLAY
	++dlh_ini_step_at;



	//EDITOR
	if( dlh_ini_step_at > JSINFO['dlh']['ini_step_done'] ){

		if( document.getElementById('tool__bar') && JSINFO['dlh']['act_edit']){

			if( JSINFO['dlh']['edit_active'] ){

				//dlh has to wait till the toolbar is finished...
				dlh_toolbar_icon_pos = document.getElementById('tool__bar').innerHTML.indexOf('dirtylittlehelper_ovl_sprite.png')>-1;

				if( dlh_toolbar_icon_pos !== true){
					if( count > 60){
						console.log('dlh cant find the dlh icon in the toolbar');
						return false;
					}else{
						setTimeout(dlh_ini, 100, count);
						return;
					}
				} //toolbaricon

				//walk the form...
				i = 0;
				var dlh_labels = [];
				var dlh_ids = [];
				var dlh_fields = [];
				var this_label = false;
				var this_id = false;

				var this_comeback = false;

				jQuery('#dirtylittlehelper_overlay fieldset').contents().each(
					function(){
						this_label = jQuery(this).contents().filter('label').text();
						this_id = jQuery(this).contents().filter('span.input').contents().filter('input').attr('id');

						if( this_label && this_id && jQuery(this).prop('tagName') == 'DIV'){

							//if the input fields arent ready we have to try again later!
							if( jQuery(this).contents().filter('span.input').contents().filter('input').data('uiAutocomplete') === undefined){
								this_comeback = true;
							}else{
								dlh_labels.push(this_label);
								dlh_ids.push(this_id.replace('.','\\.') );
								jQuery(this).attr('id','dlh_dirty_form_'+i);
								dlh_fields.push('dlh_dirty_form_'+i);
							}
						}//found something

						++i;
						this_label = false;
						this_id = false;

					}//function each in ....
				);//jQuery('#dirtylittlehelper_overlay fieldset').contents().each(

				if( this_comeback === true){
					setTimeout(dlh_ini, 100, count);
					return;
				}


				JSINFO['dlh']['dlh_labels'] = dlh_labels;
				JSINFO['dlh']['dlh_ids'] = dlh_ids;
				JSINFO['dlh']['dlh_fields'] = dlh_fields ;

				JSINFO['dlh']['dlh_edit_maximized'] = false;

				//append to the toolbar...
				dlh_append = '<div id="dlh_mytoolbar_hack" style="margin-top:5px;margin-bottom:5px;">';

				if( JSINFO['dlh']['edit_tb_min_max'] ){

					dlh_append += '<button class="dlh_button_32_32" title="FULLSCREEN EDIT" '
						+ 'onClick="dlh_fullcreen_edit();">'
						+ '<img src="'+JSINFO['dlh']['DOKU_URL']+'lib/plugins/dirtylittlehelper/images/dlh_max.png" width="32px" height="32px">'
						+ ' </button>'
						+ '<div class="dlh_sep"></div>';

				}

				if( JSINFO['dlh']['edit_tb_code'] ){

					dlh_append += '<button class="dlh_button_36_32" title="CODE tags" '
						+ 'onClick="insertTags(\'wiki__text\' , '
						+ '   \'<code [enable_line_numbers=\'+JSINFO[\'dlh\'][\'QUOT\']+\'true\'+JSINFO[\'dlh\'][\'QUOT\']+\']>\',\'</code>\',\' \\n \\n \\n \'        '
						+ ');'
						+ '"><img src="'+JSINFO['dlh']['DOKU_URL']+'lib/plugins/dirtylittlehelper/images/dlh_code.png" width="32px" height="32px">'
						+ ' </button>'

						+ '<button class="dlh_button_36_32" title="CODE SQL tags" '
						+ 'onClick="insertTags(\'wiki__text\' , '
						+ '   \'<code sql [enable_line_numbers=\'+JSINFO[\'dlh\'][\'QUOT\']+\'true\'+JSINFO[\'dlh\'][\'QUOT\']+\']>\',\'</code>\',\'\\n /* CODE */ \\n \\n \\n \'        '
						+ ');"><img src="'+JSINFO['dlh']['DOKU_URL']+'lib/plugins/dirtylittlehelper/images/dlh_code_sql.png" width="32px" height="32px">'
						+ ' </button>'

						+ '<button class="dlh_button_36_32" title="CODE bash tags" '
						+ 'onClick="insertTags(\'wiki__text\' , '
						+ '   \'<code bash [enable_line_numbers=\'+JSINFO[\'dlh\'][\'QUOT\']+\'true\'+JSINFO[\'dlh\'][\'QUOT\']+\']>\',\'</code>\',\'\\n # CODE \\n \\n \\n \'        '
						+ ');"><img src="'+JSINFO['dlh']['DOKU_URL']+'lib/plugins/dirtylittlehelper/images/dlh_code_bash.png" width="32px" height="32px">'
						+ ' </button>'

						+ '<button class="dlh_button_36_32" title="CODE shell tags" '
						+ 'onClick="insertTags(\'wiki__text\' , '
						+ '   \'<code shell [enable_line_numbers=\'+JSINFO[\'dlh\'][\'QUOT\']+\'true\'+JSINFO[\'dlh\'][\'QUOT\']+\']>\',\'</code>\',\'\\n REM CODE \\n \\n \\n \'        '
						+ ');"><img src="'+JSINFO['dlh']['DOKU_URL']+'lib/plugins/dirtylittlehelper/images/dlh_code_shell.png" width="32px" height="32px">'
						+ ' </button>'

						+ '<button class="dlh_button_36_32" title="CODE php tags" '
						+ 'onClick="insertTags(\'wiki__text\' , '
						+ '   \'<code php [enable_line_numbers=\'+JSINFO[\'dlh\'][\'QUOT\']+\'true\'+JSINFO[\'dlh\'][\'QUOT\']+\']>\',\'</code>\',\'\\n /* CODE */ \\n \\n \\n \'        '
						+ ');"><img src="'+JSINFO['dlh']['DOKU_URL']+'lib/plugins/dirtylittlehelper/images/dlh_code_php.png" width="32px" height="32px">'
						+ ' </button>'

						+ '<button class="dlh_button_36_32" title="CODE html tags" '
						+ 'onClick="insertTags(\'wiki__text\' , '
						+ '   \'<code html [enable_line_numbers=\'+JSINFO[\'dlh\'][\'QUOT\']+\'true\'+JSINFO[\'dlh\'][\'QUOT\']+\']>\',\'</code>\',\'\\n <!-- CODE --> \\n \\n \\n \'        '
						+ ');"><img src="'+JSINFO['dlh']['DOKU_URL']+'lib/plugins/dirtylittlehelper/images/dlh_code_html.png" width="32px" height="32px">'
						+ ' </button>'

								
						+ '<button class="dlh_button_36_32" title="CODE javascript tags" '
						+ 'onClick="insertTags(\'wiki__text\' , '
						+ '   \'<code javascript [enable_line_numbers=\'+JSINFO[\'dlh\'][\'QUOT\']+\'true\'+JSINFO[\'dlh\'][\'QUOT\']+\']>\',\'</code>\',\'\\n /* CODE */ \\n \\n \\n \'        '
						+ ');"><img src="'+JSINFO['dlh']['DOKU_URL']+'lib/plugins/dirtylittlehelper/images/dlh_code_javascript.png" width="32px" height="32px">'
						+ ' </button>'

						+ '<button class="dlh_button_36_32"  title="<dlh.*> COMMENT </dlh.*>" accesskey="*" '
						+ 'onClick="insertTags(\'wiki__text\' , '
						+ '   \'<dlh.*> \',\' </dlh>\',\' YOU WILL NOT SEE ME \'     '
						+  ');"><img src="'+JSINFO['dlh']['DOKU_URL']+'lib/plugins/dirtylittlehelper/images/dlh_comment.png" width="32px" height="32px">'
						+ '</button> '

						+ '<div class="dlh_sep"></div>'

						+ '<button class="dlh_button_36_32"  title="<dlh.table.html>..." accesskey="*" '
						+ 'onClick="insertAtCarret(\'wiki__text\' , '
						+ '   \'\\n<dlh.table.html> \\n <tr> \\n  <td> A </td> \\n  <td> B </td> \\n </tr> \\n</dlh.table.html>\');">'
						+  '<img src="'+JSINFO['dlh']['DOKU_URL']+'lib/plugins/dirtylittlehelper/images/dlh_table_html.png" width="32px" height="32px">'
						+ '</button> '

						+ '<button class="dlh_button_36_32"  title="<dlh.table.wiki>..." accesskey="*" '
						+ 'onClick="insertAtCarret(\'wiki__text\' , '
						+ '   \'\\n<dlh.table.wiki> \\n <dlh.tr.wiki> \\n  <dlh.td.wiki> WIKI_CONTENT_A </dlh.td.wiki> \\n  <dlh.td.wiki> WIKI_CONTENT_B </dlh.td.wiki> \\n </dlh.tr.wiki> \\n</dlh.table.wiki>\');">'
						+  '<img src="'+JSINFO['dlh']['DOKU_URL']+'lib/plugins/dirtylittlehelper/images/dlh_table_wiki.png" width="32px" height="32px">'
						+ '</button> '

						+ '<div class="dlh_sep"></div>'

						+ '<button class="dlh_button_36_32"  title="<dlh.div.html>..." accesskey="*" '
						+ 'onClick="insertTags(\'wiki__text\' , '
						+ '   \'<dlh.div.html>\\n\',\'\\n</dlh.div.html>\', \' HTML CONTENT \');">'
						+  '<img src="'+JSINFO['dlh']['DOKU_URL']+'lib/plugins/dirtylittlehelper/images/dlh_div_html.png" width="32px" height="32px">'
						+ '</button> '

						+ '<button class="dlh_button_36_32"  title="<dlh.div.wiki>..." accesskey="*" '
						+ 'onClick="insertTags(\'wiki__text\' , '
						+ '   \'<dlh.div.wiki> \\n\' , \'\\n</dlh.div.wiki>\',\' WIKI_CONTENT \');">'
						+  '<img src="'+JSINFO['dlh']['DOKU_URL']+'lib/plugins/dirtylittlehelper/images/dlh_div_wiki.png" width="32px" height="32px">'
						+ '</button> '
						;

				}

				if(JSINFO['dlh']['edit_tb_mermaid']){
					dlh_append = dlh_append 
						+ '<div class="dlh_sep"></div>'
						+ '<button class="dlh_button_36_32" title="mermaid code" '
						+ 'onClick="insertTags(\'wiki__text\' , '
						+ '   \'<dlh.mm> \',\' </dlh.mm>\',\' \\n graph TD \\n A---B\\n \'     '
						+ ');"><img src="'+JSINFO['dlh']['DOKU_URL']+'lib/plugins/dirtylittlehelper/images/dlh_mermaid_code.png" width="32px" height="32px"></button>'
						+ '<button class="dlh_button_36_32" '
						+ 'onClick="dlh_call_mermaid(\'wiki__text\');" '
						+ 'title="mermaid live editor">'
						+ '<img src="'+JSINFO['dlh']['DOKU_URL']+'lib/plugins/dirtylittlehelper/images/dlh_mermaid.png" width="32px" height="32px">'
						+ '</button>'
						;
				}


				if(JSINFO['dlh']['edit_tb_drawio']){
					dlh_append = dlh_append 
						+'<div class="dlh_sep"></div>'
						+ '<button class="dlh_button_36_32"  title="insert DRAW.IO - ID into wikieditor at cursor pos"'
						+ 'onClick="insertAtCarret(\'wiki__text\' , '
						+ '\'{{drawio>\'+getImageName().substr(0,getImageName().lastIndexOf(\':\')+1)+ \'drawio_\'+ ((new Date()).getTime()) +\'.svg}} \''
						+  ');"><img src="'+JSINFO['dlh']['DOKU_URL']+'lib/plugins/dirtylittlehelper/images/dlh_drawio.png" width="32px" height="32px">'
						+ '</button> '
						;
				}


				if(JSINFO['dlh']['edit_tb_dlhid']){
					dlh_append += ''
						+ '<div class="dlh_sep"></div>'
						+ '<input id="dlh_edit_tb_dlhid" type="text" title="DLH timeID">'
						+ '<button class="dlh_button_36_32" onClick="dlh_renew_dlhid(\'dlh_edit_tb_dlhid\');" '
						+ 'title="renew dlhID"><img src="'+JSINFO['dlh']['DOKU_URL']+'lib/plugins/dirtylittlehelper/images/dlh_id_renew.png" width="32px" height="32px">'
						+ '</button>'
						+ '<button class="dlh_button_36_32" onClick="insertAtCarret(\'wiki__text\', dlh_objectValueGet(\'dlh_edit_tb_dlhid\') );" '
						+ ' title="paste dlhID at current position">'
						+ '<img src="'+JSINFO['dlh']['DOKU_URL']+'lib/plugins/dirtylittlehelper/images/dlh_id_insert.png" width="32px" height="32px">'
						+ '</button>';
				}


				if(  JSINFO['dlh']['edit_dlh_wikiid'] && JSINFO['dlh']['edit_tb_struct'] ) {
					dlh_append += '<br>'
						+ '<select id="dlh_edit_tb_select" '
						+ ' class="dlh_edit_tb_select" '
						+ ' onChange="dlh_edit_tb_select();" '
						+ ' onClick="dlh_edit_tb_select();" '
						+ ' style="width:200px;margin-right:10px;">'
						;

					for( i=0; i< JSINFO['dlh']['dlh_ids'].length; ++i ){
						dlh_append += '<option value="'+ JSINFO['dlh']['dlh_fields'][i] +'">' + JSINFO['dlh']['dlh_labels'][i] +'</option>';
					}

					dlh_append += '</select></div>';

					jQuery('#tool__bar').append(dlh_append);

					if(JSINFO['dlh']['edit_tb_dlhid']){
						dlh_renew_dlhid('dlh_edit_tb_dlhid');
					}


					for( i=0; i< JSINFO['dlh']['dlh_ids'].length; ++i ){

						jQuery('#' + JSINFO['dlh']['dlh_ids'][i]).css({'width':'350px','height':'32px','font-size':'16px'});

						insert_this_html = ''
							+ '<button title="open in new window" class="dlh_button_36_32" '
							+ 'onClick="dlh_open_wiki_link( dlh_objectValueGet(\''
							+ JSINFO['dlh']['dlh_ids'][i]  +'\') );">'
							+ '<img src="'+JSINFO['dlh']['DOKU_URL']+'lib/plugins/dirtylittlehelper/images/dlh_open_window.png" width="32px" height="32px">'
							+ '</button> ';

						if(JSINFO['dlh']['edit_tb_dlhid']){
						insert_this_html += ''
							+ '<button title=add :TimeID" class="dlh_button_36_32" '
							+ 'onClick="dlh_objectValueSet(\''
							+ JSINFO['dlh']['dlh_ids'][i] +'\', (dlh_objectValueGet(\''
							+ JSINFO['dlh']['dlh_ids'][i]+'\') + \':\' + dlh_objectValueGet(\'dlh_edit_tb_dlhid\')+\':\').replace(/::/i, \':\')   );">'
							+ '<img src="'+JSINFO['dlh']['DOKU_URL']+'lib/plugins/dirtylittlehelper/images/dlh_add_id.png" width="32px" height="32px">'
							+ '</button> ';
						}


						jQuery('#'+JSINFO['dlh']['dlh_ids'][i]).before(
							insert_this_html
						);


						jQuery('#'+JSINFO['dlh']['dlh_ids'][i]).after(''
							+ '<button title="insert into wikieditor at cursor pos" class="dlh_button_36_32" '
							+ 'onClick="insertAtCarret(\'wiki__text\' , '
							+ '\'[[\' + dlh_objectValueGet(\''+ JSINFO['dlh']['dlh_ids'][i] +'\') + \'|]]\'  );">'
							+ '<img src="'+JSINFO['dlh']['DOKU_URL']+'lib/plugins/dirtylittlehelper/images/dlh_link_insert.png" width="32px" height="32px">'
							+ '</button> '
						);

						jQuery('#dlh_mytoolbar_hack').append(
							jQuery('#' + JSINFO['dlh']['dlh_fields'][i] )
						);

						jQuery( '#'+JSINFO['dlh']['dlh_fields'][i] ).contents().filter('label').css('display','none');

					}//walk the input elements

					dlh_edit_tb_select();

				}//if struct...


				if( JSINFO['dlh']['edit_tb_maximize'] && JSINFO['dlh']['edit_tb_min_max'] ){
					dlh_fullcreen_edit();
				}

			} // edit_active?
		} // act_edit?

		++JSINFO['dlh']['ini_step_done'];
	} // EDITOR
	++dlh_ini_step_at;



	// TOP BAR
	if( dlh_ini_step_at > JSINFO['dlh']['ini_step_done'] ){

		// STRUCT
		if( JSINFO['dlh']['top_active'] && document.getElementById('dlh_top_struct_c') ){
			JSINFO['dlh']['top_skip'] = false;

			if( jQuery('#dlh_top_struct_c').prop('tagName')!== undefined || jQuery('#dlh_top_struct_c div.struct_entry_form div.field input.struct_page').prop("tagName") == 'INPUT'){

				if( jQuery('#dlh_top_struct_c div.struct_entry_form div.field input.struct_page').data('uiAutocomplete') === undefined){

					if( count < 80 ){
						setTimeout(dlh_ini, 100, count);
						return false;
					}else{
						JSINFO['dlh']['top_skip'] = true;
					}

				}

				if( JSINFO['dlh']['top_skip'] == false ){
					jQuery('#dlh_top_struct_c div.struct_entry_form div.field span.label').css({'display':'none'});
					jQuery('#dlh_top_struct_c div.struct_entry_form div.field input.struct_page').prop('title','STRUCT SEARCH');

					JSINFO['dlh']['top_struct_id'] =  jQuery('#dlh_top_struct_c div.struct_entry_form div.field input.struct_page').attr('id') ;

					dlh_objectValueSet( JSINFO['dlh']['top_struct_id'] , JSINFO['namespace']);

					jQuery('#dlh_top_struct_b').append( jQuery('#dlh_top_struct_c div.struct_entry_form div.field') );
					jQuery('#dlh_top_struct_b').append( '<button title="call struct in new window" onClick="dlh_top_call(\''+ JSINFO['dlh']['top_struct_id'] + '\');">&GT;</button>' );

					jQuery('#dlh_top_struct_c div.structaggregation').css({'display':'none'});
					jQuery('#dlh_top_struct_c div.structaggregationeditor').css({'display':'none'});
					jQuery('#dlh_top_struct_c').css({'display':'none'});
					jQuery('#dlh_top_struct_b').css({'display':'inline'});

				}
			} // STRUCT FOUND

		} // STRUCT


		// PAGE SUGGEST
		if( JSINFO['dlh']['top_active'] && document.getElementById('dlh_top_pagesuggest_input') ) {

			jQuery(function () {
				$editor = jQuery('#dlh_top_pagesuggest_input');
				$editor.textcomplete([
					{ //page search
						appendTo: 'body',
						match:    /\[{2}([\w\-\.:]*)$/,
						maxCount: 50,
						search:   function (term, callback) {
							if ($editor.data('linksuggest_off') === 1) {
								callback([]);
								return;
							}
							jQuery.post(
								DOKU_BASE + 'lib/exe/ajax.php',
								{
									call: 'plugin_linksuggest',
									q:    term,
									ns:   JSINFO['namespace'],
									id:   JSINFO['id'],
								},
								function (data) {
									data = JSON.parse(data);
									callback(jQuery.map(data.data, function (item) {
										let id = item.id;

										if (item.type === 'd') {
											id = id + ':';
										}

										return {
											id:     id,
											ns:     item.ns,
											title:  item.title,
											type:   item.type,
											rootns: item.rootns
										};
									}));
								}
							);
						},
						template: function (item) { //dropdown list
							let image;
							let title = item.title ? ' (' + linksuggest_escape(item.title) + ')' : '';
							let value = item.id;

							if (item.rootns) { //page is in root namespace
								value = ':' + value;
							}
							if (item.type === 'd') { //namespace
								image = 'ns.png';
							} else { //file
								image = 'page.png';
							}
							return '<img src="' + DOKU_BASE + 'lib/images/' + image + '"> ' + linksuggest_escape(value) + title;
						},
						index:    1,
						replace:  function (item) { //returns what will be put to editor
							let id = item.id;
							if (item.ns === ':') { //absolute link
								id = item.ns + id;
							} else if (JSINFO['namespace'] !== '' && item.rootns && item.type === 'f') {
								id = ':' + id
							} else if (item.ns) { //relative link
								id = item.ns + ':' + id;
							}
							if (item.type === 'd') { //namespace
								setTimeout(function () {
									$editor.trigger('keyup');
								}, 200);
								return '[[' + id;
							} else { //file
								$editor.data('linksuggest_off', 1);

								setTimeout(function () {
									$editor.data('linksuggest_off', 0);
								}, 500);
			//                    return ['[[' + id, '|' + (item.title ? item.title : '') + ']]'];
								return ['[[' + id, ''];
							}

						},
						//header:'test',
						footer: 'schließen',
						cache:  false
					}, { //Page Section Search
						appendTo: 'body',
						match:    /\[\[([\w\-\.:]+#[\w\.:]*)$/,
						index:    1,
						search:   function (term, callback) {
							if ($editor.data('linksuggest_off') === 1) {
								callback([]);
								return;
							}
							jQuery.post(
								DOKU_BASE + 'lib/exe/ajax.php',
								{
									call: 'plugin_linksuggest',
									q:    term,
									ns:   JSINFO['namespace'],
									id:   JSINFO['id'],
								},
								function (data) {
									data = JSON.parse(data);
									callback(jQuery.map(data.data, function (item) {
										return {
											'link': data.link,
											'toc': item
										};
									}));
								}
							);
						},
						template: function (item) { //dropdown list
							let toc = item.toc;
							let title = toc.title ? ' (' + linksuggest_escape(toc.title) + ')' : '';

							return linksuggest_escape(toc.hid) + title;
						},

						replace: function (item) { //returns what will be put to editor
							let link = item.link;
							let toc = item.toc;

							$editor.data('linksuggest_off', 1);
							setTimeout(function () {
								$editor.data('linksuggest_off', 0);
							}, 500);

							return '[[' + link + '#' + toc.hid;
						},
						cache:   false
					}, { //media search
						appendTo: 'body',
						match:    /\{{2}([\w\-\.:]*)$/,
						maxCount: 50,
						search:   function (term, callback) {
							if ($editor.data('linksuggest_off') === 1) {
								callback([]);
								return;

							}
							jQuery.post(
								DOKU_BASE + 'lib/exe/ajax.php',
								{
									call: 'plugin_imglinksuggest',
									q:    term,
									ns:   JSINFO['namespace'],
									id:   JSINFO['id'],
								},
								function (data) {
									data = JSON.parse(data);
									callback(jQuery.map(data.data, function (item) {
										let id = item.id;

										if (item.type === 'd')
											id = id + ':';

										return {
											id:     id,
											ns:     item.ns,
											type:   item.type,
											rootns: item.rootns
										};
									}));
								}
							);
						},
						template: function (item) { //dropdown list
							let image;
							let value = item.id;

							if (item.rootns) { //page is in root namespace
								value = ':' + value;
							}
							if (item.type === 'd') { //namespace
								image = 'ns.png';
							} else { //file
								image = 'media_link_nolnk.png';
							}
							return '<img src="' + DOKU_BASE + 'lib/images/' + image + '"> ' + linksuggest_escape(value);
						},
						index:    1,
						replace:  function (item) { //returns what will be put to editor
							let id = item.id;
							if (item.rootns) {
								id = ":" + id;
							}
							if (item.ns === ':') { //absolute link
								id = item.ns + id;
							} else if (item.ns) { //relative link
								id = item.ns + ':' + id;
							}
							if (item.type === 'd') { //namespace
								setTimeout(function () {
									$editor.trigger('keyup');
								}, 200);
								return '{{' + id;
							} else { //file
								$editor.data('linksuggest_off', 1);

								setTimeout(function () {
									$editor.data('linksuggest_off', 0);
								}, 500);
								return ['{{' + id, '}}'];
							}

						},
						//header:'test',
						footer: 'schließen',
						cache:  false
					}]);
			});	// jQuery function autocomplete pageSuggest
			
			dlh_objectValueSet( 'dlh_top_pagesuggest_input', '[[' + JSINFO['namespace']);
		
		} // page suggest

		// DLH ID
		if( JSINFO['dlh']['top_active'] && document.getElementById( 'dlh_top_dlhid_input' ) ) {
			dlh_renew_dlhid('dlh_top_dlhid_input');
		}
		
		if( JSINFO['dlh']['top_active'] && JSINFO['dlh']['isadmin']  && JSINFO['dlh']['isauth'] ) {
			jQuery('body').css({'margin-top':'30px'});
			jQuery('#dokuwiki__usertools').css({'margin-top':'30px'});
		}

		++JSINFO['dlh']['ini_step_done'];
	} // TOP BAR
	++dlh_ini_step_at;


	//STYLING
	if( dlh_ini_step_at > JSINFO['dlh']['ini_step_done'] ){

		/* ALL */ 
		// wider...
		jQuery('#dokuwiki__site').css({
			'border':' 1px solid #DDDDDD', 
			'resize':' horizontal', 
			'overflow':' auto', 
			'display':' block', 
			'padding-right':' 10px', 
			'max-width':'1300px' });

		// logo home button...
		jQuery('#dokuwiki__header div.pad div.headings a span').css({'display':'inline-flex'});
		jQuery('#dokuwiki__header div.pad div.headings').css({'width':(jQuery('#dokuwiki__header div.pad div.headings a img').width() + jQuery('#dokuwiki__header div.pad div.headings a span').width() + 20)+'px'});


		//EDITOR
		if( JSINFO['dlh']['act_edit']  && JSINFO['dlh']['isadmin']  && JSINFO['dlh']['isauth']  ){
			jQuery('button.toolbutton').css({'height':'32px','width':'32px'});
			jQuery('#dokuwiki__site').css( {'max-width':'1700px','width':'' } );
			jQuery('.preview').css({'width':'900px','border':'1px solid #AAAAAA','resize':'both','display':'block','overflow':'scroll'});

			jQuery('#wiki__text').css('height','');
			jQuery('#wiki__text').css('min-height','300px');
			jQuery('#wiki__text').css('height',window.innerHeight-400 + 'px');
			jQuery('#wiki__text').css('max-width','1500px');



			}

		/* ADVANCED CONFIG */
		if( jQuery('#plugin_advanced_config').length ){
			jQuery('#dokuwiki__site').css( {'max-width':'1700px','width':'' } );
			jQuery('textarea').css({'height':'500px'});
		}

		++JSINFO['dlh']['ini_step_done'];

	} //STYLE
	++dlh_ini_step_at;


} //function dlh_ini





function dlh_top_call(the_source){

	var this_namespace = dlh_objectValueGet(the_source);
	var this_template = dlh_objectValueGet('dlh_top_template');

	this_namespace = this_namespace.replace('[[','');
	this_namespace = this_namespace.replace('**','*');
	this_namespace = this_namespace.replace('*',':*');
	this_namespace = this_namespace.replace('::*',':*');
	this_namespace = this_namespace.replace('*',dlh_objectValueGet('dlh_top_dlhid_input'));

	if( this_template && this_template.length > 3){
		dlh_open_wiki_link(this_namespace+'?do=edit&newpagetemplate='+this_template+'&')
	}else{
		dlh_open_wiki_link(this_namespace+'?do=edit&')
	}

}//function dlh_top_call


function dlh_ajax_wikiid_body(the_wikiid=':',the_targetid){

	jQuery.ajax({url: "?id="+the_wikiid+"&do=export_xhtmlbody", success: function(result){
		jQuery("#"+the_targetid).html(result);
	}});

} //function dlh_ajax_wikiid_body


document.addEventListener("DOMContentLoaded", function(event) { 
  dlh_ini();
 }); //event listener
