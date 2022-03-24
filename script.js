
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
	
	if( dlh_check_mobile() ) {return false;}

	if ( JSINFO['dlh']['dlh_edit_maximized'] === true){
		jQuery('#dokuwiki__content').css({'position':'','top':'','left':'','right':'','bottom':'','overflow':'', 'max-width':'', 'padding-right':''});
		jQuery('#dokuwiki__content #dokuwiki__pagetools').css({'display':'block'});
		JSINFO['dlh']['dlh_edit_maximized'] = false ;
	}else{
		jQuery('#dokuwiki__content').css({'position':'fixed','top':'10px','left':'10px','right':'10px','bottom':'10px','overflow':'scroll','max-width':'1700px','padding-right':'30px'});
		jQuery('#dokuwiki__content #dokuwiki__pagetools').css({'display':'none'});
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
	
	if( dlh_check_mobile() ) {return false;}

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

function dlh_check_mobile(){
	if( JSINFO['dlh']['mobile']===undefined ){
		
		if( jQuery('#dlh_is_phone').css('width')===undefined ||  jQuery('#dlh_is_tablet').css('width')===undefined ){
			JSINFO['dlh']['mobile'] = false;
			return false;
		}
		
		JSINFO['dlh']['notmobile'] = screen.availWidth <= jQuery('#dlh_is_phone').css('width').replace('px','')*1  ||  screen.availWidth <= jQuery('#dlh_is_tablet').css('width').replace('px','')*1;
	}
	
	return JSINFO['dlh']['notmobile'];
	
}


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
						+ '   \'<dlh.*> \',\' </dlh.*>\',\' YOU WILL NOT SEE ME \'     '
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


				if(  JSINFO['dlh']['edit_dlh_wikiid'] && JSINFO['dlh']['edit_tb_struct'] && JSINFO['dlh']['dlh_fields'].length > 0) {
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

				}
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

				//}//if struct...


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

		// STRUCT SERIAL
		if( JSINFO['dlh']['top_active'] && document.getElementById('dlh_top_struct_c') ){
			JSINFO['dlh']['top_skip'] = false;

			if( jQuery('#dlh_top_struct_c').prop('tagName')!== undefined && jQuery('#dlh_top_struct_c div.struct_entry_form div.field input.struct_page').prop("tagName") == 'INPUT'){

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
			// STRUCT SERIAL FOUND
			
			}else if( jQuery('#dlh_top_struct_c').prop('tagName')!== undefined && jQuery('#dlh_top_struct_c form.bureaucracy__plugin div.field input.struct_page').prop("tagName") == 'INPUT'){

				if( jQuery('#dlh_top_struct_c form.bureaucracy__plugin div.field input.struct_page').data('uiAutocomplete') === undefined){

					if( count < 80 ){
						setTimeout(dlh_ini, 100, count);
						return false;
					}else{
						JSINFO['dlh']['top_skip'] = true;
					}

				}

				if( JSINFO['dlh']['top_skip'] == false ){
					jQuery('#dlh_top_struct_c form.bureaucracy__plugin div.field span.label').css({'display':'none'});
					jQuery('#dlh_top_struct_c form.bureaucracy__plugin div.field input.struct_page').prop('title','STRUCT SEARCH');

					JSINFO['dlh']['top_struct_id'] =  jQuery('#dlh_top_struct_c form.bureaucracy__plugin div.field input.struct_page').attr('id') ;

					dlh_objectValueSet( JSINFO['dlh']['top_struct_id'] , JSINFO['namespace']);

					jQuery('#dlh_top_struct_b').append( jQuery('#dlh_top_struct_c form.bureaucracy__plugin div.field') );
					jQuery('#dlh_top_struct_b').append( '<button title="call struct in new window" onClick="dlh_top_call(\''+ JSINFO['dlh']['top_struct_id'] + '\');">&GT;</button>' );

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
			'padding-right':' 10px'
			});

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
		
		/* sidebar toggle NOT on mobile */
		if(!dlh_check_mobile() ){
				jQuery('.dlh_left_button_sb_toggle').css({'display':'block'});
		}


		++JSINFO['dlh']['ini_step_done'];

	} //STYLE
	++dlh_ini_step_at;

	
	//GRAPH FROM STRATABASE TABLE
	if( dlh_ini_step_at > JSINFO['dlh']['ini_step_done'] ){
		dlh_mermaid_from_relation();
	++JSINFO['dlh']['ini_step_done'];
	} //GRAPH FROM STRATABASE TABLE
	++dlh_ini_step_at;
	
	
	
	// TABS
	if( dlh_ini_step_at > JSINFO['dlh']['ini_step_done'] ){
		if( document.getElementById('dlh_tabs4jQuery')){
			var dlh_tab_groups_count = jQuery('#dlh_tabs4jQuery').data('tabs_count');
			var dlh_tabs_html='';
			var dlh_this_group_count =0;
			var dlh_this_group_id = '';

			for( i=1; i<dlh_tab_groups_count+1; ++i){
				dlh_this_group_count = jQuery('#dlh_tabs4jQuery').data('group'+i+'_count');
				dlh_this_group_id = jQuery('#dlh_tabs4jQuery').data('group'+i+'_id');
				dlh_tabs_html = '<ul>';

				for( ii=1; ii<dlh_this_group_count+1; ++ii){
					dlh_tabs_html += '<li><a href="#dlh_tab__'+dlh_this_group_id+'_'+ii+'">'+jQuery('#dlh_tabs4jQuery').data('group'+i+'_title_'+ii)+'</a></li>'   
				}
				
				dlh_tabs_html += '</ul>';
				
				document.getElementById('dlh_tab_head_'+dlh_this_group_id).innerHTML=dlh_tabs_html;
				
				jQuery('#dlh_tab_head_'+dlh_this_group_id).css({'display':'block'});
				jQuery('#dlh_tab_master_'+dlh_this_group_id).tabs();

			}
			jQuery('#dlh_tabs4jQuery').remove();
		} // div 4jQuery??
		
	++JSINFO['dlh']['ini_step_done'];
	} //TABS
	++dlh_ini_step_at;
	
	
	/* IP HELPER */ 
	if( dlh_ini_step_at > JSINFO['dlh']['ini_step_done'] ){

		
		
jQuery(document).ready(function() {
// Get the iphelper
var dlh_iphelper = document.getElementById("dlh_myiphelper");
var dlh_iphelpersubnetcalc = document.getElementById("dlh_calc");

// Get the <span> element that closes the iphelper
var dlh_span = document.querySelector('.dlh_iphelperclose');
// When the user clicks on <span> (x), close the iphelper
dlh_span.onclick = function () {
    dlh_iphelper.style.display = "none";
};

// When the user clicks anywhere outside of the iphelper, close it
window.onclick = function(event) {
    if (event.target == iphelper) {
        dlh_iphelper.style.display = "none";
    }
};






jQuery(".dlh_iphelper").click(function() {
dlh_iphelper.style.display = "block";
var dlh_iphelperaddress = jQuery(this).text();
document.getElementById("dlh_iphelperinput").value = dlh_iphelperaddress;
if (dlh_iphelperaddress.search("/") != -1) {
    dlh_iphelpersubnetcalc.style.display = "block";
	document.getElementById("dlh_iphelpersubnetcalcsubnetinput").value = "";
	document.getElementById("dlh_iphelpersubnetcalcinput").value = dlh_iphelperaddress;
	var dlh_iphelperaddressright = dlh_iphelperaddress.split("/")[1];
	if (dlh_iphelperaddressright == "1" || dlh_iphelperaddressright == "2" || dlh_iphelperaddressright == "3" || dlh_iphelperaddressright == "4" || dlh_iphelperaddressright == "5" || dlh_iphelperaddressright == "6" || dlh_iphelperaddressright == "7" || dlh_iphelperaddressright == "8" || dlh_iphelperaddressright == "9" || dlh_iphelperaddressright == "10" || dlh_iphelperaddressright == "11" || dlh_iphelperaddressright == "12" || dlh_iphelperaddressright == "13" || dlh_iphelperaddressright == "14" || dlh_iphelperaddressright == "15" || dlh_iphelperaddressright == "16" || dlh_iphelperaddressright == "17" || dlh_iphelperaddressright == "18" || dlh_iphelperaddressright == "19" || dlh_iphelperaddressright == "20" || dlh_iphelperaddressright == "21" || dlh_iphelperaddressright == "22" || dlh_iphelperaddressright == "23" || dlh_iphelperaddressright == "24" || dlh_iphelperaddressright == "25" || dlh_iphelperaddressright == "26" || dlh_iphelperaddressright == "26" || dlh_iphelperaddressright == "27" || dlh_iphelperaddressright == "28" || dlh_iphelperaddressright == "29" || dlh_iphelperaddressright == "30" || dlh_iphelperaddressright == "31" || dlh_iphelperaddressright == "32") {
	} else {document.getElementById("dlh_iphelpersubnetcalcsubnetinput").value = dlh_iphelperaddressright;
		document.getElementById("dlh_iphelpersubnetcalcinput").value = dlh_iphelperaddress.split("/")[0];
		console.log('CIDR in input address is out of range');
	}
    document.getElementById("dlh_iphelperbodyp").innerHTML = document.getElementById("dlh_iphelpertemplatemask").innerHTML.replace(/\%ip\%/g, dlh_iphelperaddress);
	dlh_ipChange();
} else {
    dlh_iphelpersubnetcalc.style.display = "none";
    document.getElementById("dlh_iphelperbodyp").innerHTML = document.getElementById("dlh_iphelpertemplate").innerHTML.replace(/\%ip\%/g, dlh_iphelperaddress);
}
});



jQuery( "#dlh_iphelperinput" ).keyup(function() {
var dlh_iphelperaddress = document.getElementById("dlh_iphelperinput").value;
if (dlh_iphelperaddress.search("/") != -1) {
    dlh_iphelpersubnetcalc.style.display = "block";
	document.getElementById("dlh_iphelpersubnetcalcsubnetinput").value = "";
	document.getElementById("dlh_iphelpersubnetcalcinput").value = dlh_iphelperaddress;
	var dlh_iphelperaddressright = dlh_iphelperaddress.split("/")[1];
	if (dlh_iphelperaddressright == "1" || dlh_iphelperaddressright == "2" || dlh_iphelperaddressright == "3" || dlh_iphelperaddressright == "4" || dlh_iphelperaddressright == "5" || dlh_iphelperaddressright == "6" || dlh_iphelperaddressright == "7" || dlh_iphelperaddressright == "8" || dlh_iphelperaddressright == "9" || dlh_iphelperaddressright == "10" || dlh_iphelperaddressright == "11" || dlh_iphelperaddressright == "12" || dlh_iphelperaddressright == "13" || dlh_iphelperaddressright == "14" || dlh_iphelperaddressright == "15" || dlh_iphelperaddressright == "16" || dlh_iphelperaddressright == "17" || dlh_iphelperaddressright == "18" || dlh_iphelperaddressright == "19" || dlh_iphelperaddressright == "20" || dlh_iphelperaddressright == "21" || dlh_iphelperaddressright == "22" || dlh_iphelperaddressright == "23" || dlh_iphelperaddressright == "24" || dlh_iphelperaddressright == "25" || dlh_iphelperaddressright == "26" || dlh_iphelperaddressright == "26" || dlh_iphelperaddressright == "27" || dlh_iphelperaddressright == "28" || dlh_iphelperaddressright == "29" || dlh_iphelperaddressright == "30" || dlh_iphelperaddressright == "31" || dlh_iphelperaddressright == "32") {
		} else {
			document.getElementById("dlh_iphelpersubnetcalcsubnetinput").value = dlh_iphelperaddressright;
			document.getElementById("dlh_iphelpersubnetcalcinput").value = dlh_iphelperaddress.split("/")[0];
	}
    document.getElementById("dlh_iphelperbodyp").innerHTML = document.getElementById("dlh_iphelpertemplatemask").innerHTML.replace(/\%ip\%/g, dlh_iphelperaddress);
	dlh_ipChange();
} else {
    dlh_iphelpersubnetcalc.style.display = "none";
    document.getElementById("dlh_iphelperbodyp").innerHTML = document.getElementById("dlh_iphelpertemplate").innerHTML.replace(/\%ip\%/g, dlh_iphelperaddress);
}});




//Subnetcalc - written by Oscar Virot. All Rights reserved 2014
// https://google.com/+OscarVirot?rel=author 
// Source https://tools.virot.eu/ipcalc/

var cidrTosubnets = ["0.0.0.0", "128.0.0.0", "192.0.0.0", "224.0.0.0", "240.0.0.0", "248.0.0.0", "252.0.0.0", "254.0.0.0", "255.0.0.0", "255.128.0.0", "255.192.0.0", "255.224.0.0", "255.240.0.0", "255.248.0.0", "255.252.0.0", "255.254.0.0", "255.255.0.0", "255.255.128.0", "255.255.192.0", "255.255.224.0", "255.255.240.0", "255.255.248.0", "255.255.252.0", "255.255.254.0", "255.255.255.0", "255.255.255.128", "255.255.255.192", "255.255.255.224", "255.255.255.240", "255.255.255.248", "255.255.255.252", "255.255.255.254", "255.255.255.255"];
var ipPattern = "[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}";
var PatternAddr = "[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}";
var PatternSubnet = "[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}";
var PatternCidr = /10|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31|32|1|2|3|4|5|6|7|8|9/;

turladdr=(document.URL).replace(/.*\/ipcalc\/(.*)\/.*/, '$1').replace(/#$/, '');
turlcidr=(document.URL).replace(/.*\/ipcalc\/.*\/(.*)/, '$1').replace(/#$/, '');
if (turladdr.match(PatternAddr) == turladdr && turlcidr.match(PatternCidr) == turlcidr)
  {
   tinSubnet = cidrTosubnets[(parseInt(turlcidr,10))];
   document.forms.input.dlh_in_address.value = turladdr;
   document.forms.input.dlh_in_subnet.value = tinSubnet;
   dlh_checkAndUpdate();
  }

function dlh_ipChange() {
  if (document.forms.input.dlh_in_address.value.indexOf('/') > -1)
    {
      var tcidr = (document.forms.input.dlh_in_address.value).substring(document.forms.input.dlh_in_address.value.indexOf('/') + 1);
      if (tcidr !== '' && isFinite(tcidr) && tcidr >= 0 && tcidr <= 32)
        {
          document.forms.input.dlh_in_subnet.value = cidrTosubnets[(parseInt(tcidr,10))];
//          document.getElementById('out_cidr').value = tcidr
//          document.getElementById('out_subnet').value = cidrTosubnets[tcidr]
        }
    }
  dlh_checkAndUpdate();
}

function dlh_subChange()
{
  if (document.forms.input.dlh_in_address.value.indexOf('/') > -1)
    {
      var address = (document.forms.input.dlh_in_address.value).substring(0,document.forms.input.dlh_in_address.value.indexOf('/'));
//Find the CIDR of the subnetmask
      var i;
      for (i = 0; i < cidrTosubnets.length; i++)
      {
        if (document.forms.input.dlh_in_subnet.value == cidrTosubnets[i]){var tcidr = i;}
      }
      if (tcidr !== '' && isFinite(tcidr) && tcidr >= 0 && tcidr <= 32)
      {
        document.forms.input.dlh_in_address.value = address+"/"+tcidr;
//      document.getElementById("out_cidr").innerHTML = tcidr
//      document.getElementById("out_subnet").innerHTML = cidrTosubnets[tcidr]
      }
    }
  dlh_checkAndUpdate();
}
function dlh_checkAndUpdate()
{
  if (dlh_checkValid())
  {
    dlh_UpdateOutput();
  }
  else
  {
    dlh_InvalidateOutput();
  }
}
function dlh_checkValid() {
//validate CIDR range
  if (document.forms.input.dlh_in_address.value.indexOf('/') > -1)
  {
    var tcidr = (document.forms.input.dlh_in_address.value).substring(document.forms.input.dlh_in_address.value.indexOf('/') + 1);
    if (tcidr === '' || isNaN(tcidr) || tcidr <= 0 || tcidr > 32
)
    {
      console.log('CIDR in input address is out of range');
      return false;
    }
  }
//validate address
  if (document.forms.input.dlh_in_address.value.indexOf('/') > -1)
  {
    var taddress = (document.forms.input.dlh_in_address.value).substring(0,document.forms.input.dlh_in_address.value.indexOf('/'));
  }
  else
  {
    var taddress = document.forms.input.dlh_in_address.value;
  }
 //format
  if (taddress.match(ipPattern) != taddress)
  {
    console.log('IP Address not formated x.x.x.x -> xxx.xxx.xxx.xxx');
    return false;
  }
 //nothing over 255
  var tbytes = taddress.split(".");
  var i;
    for (i = 0; i <= 3; i++)
    {
      if (tbytes[i]>=256)
      {
        console.log('IP address octect is larger than 255');
        return false;
      }
    }
//validate subnet
 //format
  if (document.forms.input.dlh_in_subnet.value.match(ipPattern) != document.forms.dlh_input.in_subnet.value)
  {
    console.log('Subnetmask not formated x.x.x.x -> xxx.xxx.xxx.xxx');
    return false;
  }
 //bit ordering
  for (i = 0; i < cidrTosubnets.length; i++)
  {
    if (document.forms.input.dlh_in_subnet.value == cidrTosubnets[i]){var tcidr = i;}
  }
  if (tcidr === '' || isNaN(tcidr))
  {
    console.log('Subnetmask improper ordering, not in order');
    return false;
  }
  return true;
}
function InvalidateOutput()
{
  document.getElementById("dlh_out_address").innerHTML = '';
  document.getElementById("dlh_out_subnet").innerHTML = '';
  document.getElementById("dlh_out_cidr").innerHTML = '';
  document.getElementById("dlh_out_netaddr").innerHTML = '';
  document.getElementById("dlh_out_bcast").innerHTML = '';
  document.getElementById("dlh_out_firstusable").innerHTML = '';
  document.getElementById("dlh_out_lastusable").innerHTML = '';
  document.getElementById("dlh_out_amountaddresses").innerHTML = '';
  document.getElementById("dlh_out_ptraddr").innerHTML = '';
  document.getElementById("dlh_is_valid").innerHTML = '<center>INVALID</center>';
  document.getElementById("dlh_is_valid").style.display = 'block';
  document.getElementById("dlh_is_valid").style.backgroundColor = "red";
}

function UpdateOutput()
{
// Update Valid text
  document.getElementById("dlh_is_valid").style.display = 'none';
  document.getElementById("dlh_is_valid").innerHTML = 'VALID VALID VALID VALID VALID';
  document.getElementById("dlh_is_valid").style.backgroundColor = "green";
// Locate Address
  if (document.forms.input.dlh_in_address.value.indexOf('/') > -1)
    {
      var taddress = (document.forms.input.dlh_in_address.value).substring(0,document.forms.input.dlh_in_address.value.indexOf('/'));
    }
  else
    {
      var taddress = document.forms.input.dlh_in_address.value;
    }
//Do subnet calc
  var i;
    for (i = 0; i < cidrTosubnets.length; i++)
    {
      if (document.forms.input.dlh_in_subnet.value == cidrTosubnets[i]){var tcidr = i;}
    }
//Calculate Network & Broadcast addresses
  var tabytes = taddress.split(".");
  var tsbytes = document.forms.input.dlh_in_subnet.value.split(".");
 //Network address
  var tnaddr = (tabytes[0] & tsbytes[0]) + "." + (tabytes[1] & tsbytes[1]) + "." + (tabytes[2] & tsbytes[2]) + "." + (tabytes[3] & tsbytes[3]);
 //Broadcast address
  var tbaddr = ((tabytes[0] & tsbytes[0]) | (255 ^ tsbytes[0])) + "." + ((tabytes[1] & tsbytes[1]) | (255 ^ tsbytes[1])) + "." + ((tabytes[2] & tsbytes[2]) | (255 ^ tsbytes[2])) + "." + ((tabytes[3] & tsbytes[3]) | (255 ^ tsbytes[3]));
 //Reverse PTR
  var tptraddr = (tabytes[3] + '.' + tabytes[2] + '.' + tabytes[1] + '.' + tabytes[0] + '.in-addr.arpa');
if (tcidr == 32)
{
 //gw1 address
  var tgw1 = tnaddr;
 //gw2 address
  var tgw2 = tnaddr;
 // Count usable addresses
 tusable = 1;
}
if (tcidr != 32)
{
 //gw1 address
  var tgw1 = (tabytes[0] & tsbytes[0]) + "." + (tabytes[1] & tsbytes[1]) + "." + (tabytes[2] & tsbytes[2]) + "." + ((tabytes[3] & tsbytes[3])+1);
 //gw2 address
  var tgw2 = ((tabytes[0] & tsbytes[0]) | (255 ^ tsbytes[0])) + "." + ((tabytes[1] & tsbytes[1]) | (255 ^ tsbytes[1])) + "." + ((tabytes[2] & tsbytes[2]) | (255 ^ tsbytes[2])) + "." + (((tabytes[3] & tsbytes[3]) | (255 ^ tsbytes[3]))-1);
 // Count usable addresses
 tusable = (Math.pow(2, (32-tcidr)))-2;
}

//Do real outputing
  document.getElementById("dlh_out_address").innerHTML = taddress;
  document.getElementById("dlh_out_subnet").innerHTML = document.forms.input.in_subnet.value;
  document.getElementById("dlh_out_cidr").innerHTML = tcidr;
  document.getElementById("dlh_out_netaddr").innerHTML = tnaddr;
  document.getElementById("dlh_out_bcast").innerHTML = tbaddr;
  document.getElementById("dlh_out_firstusable").innerHTML = tgw1;
  document.getElementById("dlh_out_lastusable").innerHTML = tgw2;
  document.getElementById("dlh_out_amountaddresses").innerHTML = tusable;
  document.getElementById("dlh_out_ptraddr").innerHTML = tptraddr;

}

function changeSection(Section)
{
  document.getElementById("dlh_static").className = 'hiddensection';
  document.getElementById("dlh_calc").className = 'hiddensection';
  document.getElementById("dlh_calcSelector").className = 'sectionselector';
  document.getElementById("dlh_staticSelector").className = 'sectionselector';

  if (Section=="dlh_calc")
  {
    document.getElementById("dlh_calc").className = 'section';
    document.getElementById("dlh_calcSelector").className = 'sectionselectoractive';
  }
  if (Section=="dlh_static")
  {
    document.getElementById("dlh_static").className = 'section';
    document.getElementById("dlh_staticSelector").className = 'sectionselectoractive';
  }
  if (Section=="dlh_IPv6Static")
  {
    document.getElementById("dlh_IPv6Static").className = 'hiddensection';
    document.getElementById("dlh_IPv6StaticSelector").className = 'sectionselector';
  }
}
});		
		
		
		
		
		
	++JSINFO['dlh']['ini_step_done'];	
	}// IP HELPER END 
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




function dlh_mermaid_from_relation(){



jQuery('.dlh_stratabase_relation').each( function(){if(this){

	var dlh_mm=[];
	dlh_mm['col']=[];
	dlh_mm['col']['obj']=[];
	dlh_mm['col']['port']=[];
	dlh_mm['col']['info']=[];

	dlh_mm['col']['obj'][1]=false;
	dlh_mm['col']['port'][1]=false;
	dlh_mm['col']['info'][1]=false;
	dlh_mm['col']['obj'][2]=false;
	dlh_mm['col']['port'][2]=false;
	dlh_mm['col']['info'][2]=false;
	dlh_mm['col']['conn']=false;
	dlh_mm['conn_as_object']=false;


	dlh_mm['design_obj1']=false;
	dlh_mm['design_obj2']=false;
	dlh_mm['design_port']=false;

	dlh_mm['data']=[];

	dlh_mm['data']['object_count']=0;
	dlh_mm['data']['obj_data'] = [];
	dlh_mm['data']['obj_by_name'] = [];
	dlh_mm['data']['port_count']=0;
	dlh_mm['data']['port_data'] = [];
	dlh_mm['data']['conn_count']=0;
	dlh_mm['data']['conn_data'] = [];


	//get config from data-...
	//OBJ
	if( jQuery(this).data('obj') ) { 
		var x = jQuery(this).data('obj');
		x += ',false,false,false,';
		x = x.replace(/,,/g, ",");
		x = x.split(',');
		if( Number.isInteger(x[0]*1) && Number.isInteger(x[1]*1) ){
			dlh_mm['col']['obj'][1]=x[0];
			dlh_mm['col']['obj'][2]=x[1];
		}
	}

	//PORT
	if( jQuery(this).data('port') ) { 
		var x = jQuery(this).data('port');
		x += ',false,false,false,';
		x = x.replace(/,,/g, ",");
		x = x.split(',');
		if( Number.isInteger(x[0]*1) && Number.isInteger(x[1]*1) ){
			dlh_mm['col']['port'][1]=x[0];
			dlh_mm['col']['port'][2]=x[1];
		}
	}

	//INFO
	if( jQuery(this).data('info') ) {
		var x = jQuery(this).data('info');
		x += ',false,false,false,';
		x = x.replace(/,,/g, ",");
		x = x.split(',');
		if( Number.isInteger(x[0]*1) && Number.isInteger(x[1]*1) ){
			dlh_mm['col']['info'][1]=x[0];
			dlh_mm['col']['info'][2]=x[1];
		}
	}

	//CONN
	if( jQuery(this).data('conn') ) {
		var x = jQuery(this).data('conn');
		x += ',false,false,false,';
		x = x.replace(/,,/g, ",");
		x = x.split(',');
		if( Number.isInteger(x[0]*1) ){
			dlh_mm['col']['conn']=x[0];
		}
	}
	
	//CONN as Object
	if( jQuery(this).data('conn_as_o') ) {
		var x = jQuery(this).data('conn_as_o');
		x += ',false,false,false,';
		x = x.replace(/,,/g, ",");
		x = x.split(',');
		if( x[0] === "1" ){
			dlh_mm['conn_as_object']=true;
		}

	}
	
	
	//DESIGN
	if( jQuery(this).data('design') ) {
		var x = jQuery(this).data('design');
		x += ',false,false,false,';
		x = x.replace(/,,/g, ",");
		x = x.split(',');
		if( Number.isInteger(x[0]*1) ){
			dlh_mm['design_obj1']=x[0]; 
			jQuery('.col'+x[0],this).css({'display':'none'});
		}
		if( Number.isInteger(x[1]*1) ){
			dlh_mm['design_obj2']=x[1]; 
			jQuery('.col'+x[1],this).css({'display':'none'});
		}
		if( Number.isInteger(x[2]*1) ){
			dlh_mm['design_port']=x[2]; 
			jQuery('.col'+x[2],this).css({'display':'none'});
		}
	}
	
	
	jQuery('.dlh_mm', this).each(

		function(){if(this){

			jQuery('tbody tr',this).each(
				function(){if(this){
					var row_data=[];

					//DESIGN...
					var design = [];
					design['obj']=[];
					design['obj'][1]='';
					design['obj'][2]='';
					design['port']='';
					
					if( dlh_mm['design_port'] !== false ){
						jQuery('.col'+ dlh_mm['design_port'] , this).each(
							function(){if(this){

								if( jQuery(this).text() ){
									design['port'] = jQuery(this).text();
								}
								
							}} // col has data
						); // each design port
					}//port
					
					if( dlh_mm['design_obj1'] !== false ){
						jQuery('.col'+ dlh_mm['design_obj1'] , this).each(
							function(){if(this){

								if( jQuery(this).text() ){
									design['obj'][1] = jQuery(this).text();
								}
								
							}} // col has data
						); // each design obj1
					}//obj1

					if( dlh_mm['design_obj2'] !== false ){
						jQuery('.col'+ dlh_mm['design_obj2'] , this).each(
							function(){if(this){

								if( jQuery(this).text() ){
									design['obj'][2] = jQuery(this).text();
								}
								
							}} // col has data
						); // each design obj2
					}//obj2
					
					//DESIGN END
					
					for(i=1;i<3;i++){
						row_data[i]=[];
						this_obj_name = false;
						this_obj_id = false;
						this_port_name = false;
						this_port_id = false;
						

						if( dlh_mm['col']['obj'][i] !== undefined && dlh_mm['col']['obj'][i] !== false){
							jQuery('.col'+ dlh_mm['col']['obj'][i]+' a' , this).each(
								function(){if(this){
									// console.log(this);

									if( jQuery(this).data('wiki-id') ){

										this_obj_name = jQuery(this).data('wiki-id');

										if( dlh_mm['data']['obj_by_name'][ this_obj_name ] !== undefined ){
											this_obj_id = dlh_mm['data']['obj_by_name'][ this_obj_name ];
										}else{
											dlh_mm['data']['obj_by_name'][ this_obj_name ] = dlh_mm['data']['object_count'];
											this_obj_id = dlh_mm['data']['obj_by_name'][ this_obj_name ];

											dlh_mm['data']['obj_data'][ this_obj_id ]=[];
											dlh_mm['data']['obj_data'][ this_obj_id ]['port_count'] = 0;
											dlh_mm['data']['obj_data'][ this_obj_id ]['port_data'] = [];
											dlh_mm['data']['obj_data'][ this_obj_id ]['port_by_name'] = [];
											dlh_mm['data']['obj_data'][ this_obj_id ]['link'] = jQuery(this).attr('href');
											dlh_mm['data']['obj_data'][ this_obj_id ]['label'] = jQuery(this).text();
											dlh_mm['data']['obj_data'][ this_obj_id ]['design'] = design['obj'][i];

											dlh_mm['data']['object_count']++;									
										} // obj exists?

									} // col obj has wiki-id?

								}} // col has data
							); // each col obj
						} // cfg col object

						// PORT BEGIN
						if( this_obj_id !== false && dlh_mm['col']['port'][i] !== undefined && dlh_mm['col']['port'][i] !== false){
							jQuery('.col'+ dlh_mm['col']['port'][i] , this).each(
								function(){if(this){

									if( jQuery(this).text() ){
										this_port_name = jQuery(this).text();
									}else{
										this_port_name = '[oo]';
									}
									
									if( dlh_mm['data']['obj_data'][this_obj_id]['port_by_name'][ this_port_name ] !== undefined){
										this_port_id = dlh_mm['data']['obj_data'][this_obj_id]['port_by_name'][ this_port_name ];
										last_port = this_port_id;
									}else{
										this_port_id = dlh_mm['data']['port_count'];
										this_port_count = dlh_mm['data']['obj_data'][ this_obj_id ]['port_count'];
										
										dlh_mm['data']['obj_data'][ this_obj_id ]['port_data'][ this_port_count ] = this_port_id;
										dlh_mm['data']['obj_data'][ this_obj_id ]['port_by_name'][ this_port_name ] = this_port_id;

										dlh_mm['data']['port_data'][ this_port_id ] = [];
										dlh_mm['data']['port_data'][ this_port_id ]['label'] = this_port_name;
										dlh_mm['data']['port_data'][ this_port_id ]['design'] = design['port'];

										dlh_mm['data']['obj_data'][ this_obj_id ]['port_count']++;
										dlh_mm['data']['port_count']++;

										last_port = this_port_id;

									} // port exists?


								}} // col has data
							); // each col port
						} // cfg col port
						// PORT END


					row_data[i]['obj']= this_obj_id;
					row_data[i]['port']= this_port_id;

					} // for i<3


					if(row_data[1]['obj']!==false && row_data[2]['obj'] !== false){

						jQuery('.col'+dlh_mm['col']['conn']+' a',this).each(
							function(){if(this){
								if( jQuery(this).data('wiki-id') ){

									row_data['wikiid']=jQuery(this).data('wiki-id');
									row_data['title']=jQuery(this).text();
									row_data['link']=jQuery(this).attr('href');

									this_conn_id = dlh_mm['data']['conn_count'];
									dlh_mm['data']['conn_data'][ this_conn_id ] = row_data;
									dlh_mm['data']['conn_count']++;

									} // col wiki id
							}} // col has data
						);// col conn


					} // row data ?
					
				}} // tr has data
			); // each tbody tr


			// BUILD GRAPH START
			var dlh_mm_out='';
			// the objects 
			for(i=0;i<dlh_mm['data']['object_count'];i++){
				dlh_mm_out += 'subgraph Obj'+i+'["'+ dlh_mm['data']['obj_data'][i]['label'] +'"]\n';
				
				//PORTS?
				if( dlh_mm['col']['port'][1] !== false && dlh_mm['col']['port'][2] !== false){
					for(ii=0;ii<dlh_mm['data']['obj_data'][i]['port_count'];ii++){
						this_port_id = dlh_mm['data']['obj_data'][i]['port_data'][ii];
						dlh_mm_out +=' Port'+this_port_id;
						dlh_mm_out +='["'+dlh_mm['data']['port_data'][this_port_id]['label']+'"]\n';
						dlh_mm_out +=' click Port'+this_port_id+' "';
						dlh_mm_out += dlh_mm['data']['obj_data'][i]['link'] + '" "open object" _blank\n';
						
						//port design?
						if(  dlh_mm['data']['port_data'][this_port_id]['design'] != ''){
						  dlh_mm_out += 'style Port'+this_port_id+' '+dlh_mm['data']['port_data'][this_port_id]['design']+'\n';	
						}
					}//walk the ports
				}//ports?
				//obj design?
				if( dlh_mm['data']['obj_data'][i]['design'] != ''){
					dlh_mm_out += 'style Obj'+i+' '+dlh_mm['data']['obj_data'][i]['design']+'\n';	
				}
				
				
				dlh_mm_out += 'end\n\n';
				
			}
			
			// the connections 
			
			for(i=0;i<dlh_mm['data']['conn_count'];i++){
				//PORTS?
				if( dlh_mm['col']['port'][1] !== false && dlh_mm['col']['port'][2] !== false){				
					dlh_mm_out += 'Port'+dlh_mm['data']['conn_data'][i][1]['port'];
					dlh_mm_out += '-->';
					
					if(dlh_mm['conn_as_object'] === true || dlh_mm['conn_as_object'] == "true" ){
						dlh_mm_out += 'conn'+i+'{{"'+dlh_mm['data']['conn_data'][i]['title']+'"}}-->';
						dlh_mm_out += 'Port'+dlh_mm['data']['conn_data'][i][2]['port']+'\n';
						
						if( dlh_mm['data']['port_data'][dlh_mm['data']['conn_data'][i][1]['port']]['design'] != ''){
							dlh_mm_out += 'style conn'+i+' '+dlh_mm['data']['port_data'][dlh_mm['data']['conn_data'][i][1]['port']]['design']+'\n';
						}
					
						dlh_mm_out += 'click conn'+i+' "';
						dlh_mm_out += dlh_mm['data']['conn_data'][i]['link'] + '" "open conn object" _blank\n';
					}else{
						dlh_mm_out += '|"'+dlh_mm['data']['conn_data'][i]['title']+'"|Port';
						dlh_mm_out += dlh_mm['data']['conn_data'][i][2]['port']+'\n';
					}
				}else{ //PORTS?
					dlh_mm_out += 'Obj'+dlh_mm['data']['conn_data'][i][1]['obj'];
					dlh_mm_out += '-->';
					
					if(dlh_mm['conn_as_object'] === true || dlh_mm['conn_as_object'] == "true" ){
						dlh_mm_out += 'conn'+i+'{{"'+dlh_mm['data']['conn_data'][i]['title']+'"}}---';
						dlh_mm_out += 'Obj'+dlh_mm['data']['conn_data'][i][2]['obj']+'\n';
						
						dlh_mm_out += 'click conn'+i+' "';
						dlh_mm_out += dlh_mm['data']['conn_data'][i]['link'] + '" "open conn object" _blank\n';
					}else{
						dlh_mm_out += '|"'+dlh_mm['data']['conn_data'][i]['title']+'"|Obj';
						dlh_mm_out += dlh_mm['data']['conn_data'][i][2]['obj']+'\n';
					}
				}
				
			}//walk the conns
			
			// BUILD END 
			if(dlh_mm_out != ''){
				dlh_mm_out = '<div class="mermaid">\n\ngraph TD\n\n'+dlh_mm_out+'\n\n</div>';
				jQuery(this).append(dlh_mm_out);
				//console.log(dlh_mm_out);
			}

			
			//console.log(dlh_mm['data']);

		}}
	); //each dlh_mm
}} ); //each dlh_stratabase_relation



mermaid.init();

// mark this object in tables and graphs
var this_id = jQuery('div.strata-entry span.strata-field span.curid').text();
if(this_id){

	jQuery('.dlh_mm td').each(
		function(){if(this){
			if(jQuery(this).text()==this_id){
				//jQuery(this).css({'background-color':'#91ef86'});
				jQuery(this).css({'border':'2px solid #91ef86;'});
			}
		}}
	);

    jQuery('.dlh_mm g.output g.label').each(
		function(){ if(this){
			if(jQuery(this).text()==this_id){
				jQuery(this).parent().each(
					function(){ if(this){
						//jQuery('*',this ).css({'fill':'#baeab5'});
						jQuery('*',this ).css({'stroke-width':'2px','stroke':'#baeab5'});
					}}
				);
				}
		}}
    );


}// if (this id)



} // function dlh_mermaid_from_relation








/*




if(1==4){
var dlh_mm=[];
dlh_mm['object_name']=[];
dlh_mm['object_data']=[];
dlh_mm['object_count']=0;

dlh_mm['port_data']=[];
dlh_mm['port_count']=0;
dlh_mm['conn_data']=[];
dlh_mm['conn_count']=0;

var dlh_mm_out='';

var dlh_obj1=2;
var dlh_obj1_port=3;
var dlh_obj1_info=1;
var dlh_obj2=6;
var dlh_obj2_port=5;
var dlh_obj2_info=7;
var dlh_conn=4;


dlh_cols=[];
dlh_cols['obj'][1]=2;
dlh_cols['port'][1]=3;
dlh_cols['info'][1]=1;
dlh_cols['obj'][2]=6;
dlh_cols['port'][2]=5;
dlh_cols['info'][2]=7;
dlh_cols['conn']=4;

jQuery('.dlh_mm').each(
	function(){if(this){
		jQuery('tbody tr',this).each(
			function(){if(this){
				row_data=[];

				for(i=1;i<3;i++){

					if(dlh_cols['obj'][i] !== undefined && dlh_cols['obj'][i] !== false){
						jQuery('.col'+dlh_cols['obj'][i],this).each(
						function(){if(this){
							this_object_id = false;
							this_object_name=false;

							jQuery('a',this).each(
								function(){if(this){
									if( jQuery(this).data('wiki-id') ){

										this_obj_name = jQuery(this).data('wiki-id');

										if( dlh_mm['object_name'][ this_object_name ] == undefined ){
											this_object_id = dlh_mm['object_count'];
											dlh_mm['object_name'][ this_object_name ] = this_object_id;

											dlh_mm['object_data'][this_object_id]=[];
											dlh_mm['object_data'][this_object_id]['name']=this_object_name;
											dlh_mm['object_data'][this_object_id]['wikiid']=jQuery(this).data('wiki-id');
											dlh_mm['object_data'][this_object_id]['title']= jQuery(this).text();
											dlh_mm['object_data'][this_object_id]['link']=jQuery(this).attr('href');
											dlh_mm['object_data'][this_object_id]['ports_count']=0;
											dlh_mm['object_data'][this_object_id]['ports_data']=[];
											dlh_mm['object_data'][this_object_id]['ports_names']=[];

											dlh_mm['object_count']++;
										}else{
											this_object_id = dlh_mm['object_name'][ this_object_name ];
										}
										row_data['obj'][i] = this_object_id;
									}
								}}
							);
							
							
							
						}}
						);
					} //col_obj?
					
					if( row_data['obj'][i] !== undefined && dlh_cols['port'][i] !== undefined && dlh_cols['port'][i] !== false){
						jQuery('.col'+dlh_cols['port'][i],this).each(
						function(){if(this){
							this_port_id=false;
							this_port_name=false;

							jQuery('a',this).each(
								function(){if(this){
									if( jQuery(this).data('wiki-id') ){

										this_obj_name = jQuery(this).data('wiki-id');

										if( dlh_mm['object_name'][ this_object_name ] == undefined ){
											this_object_id = dlh_mm['object_count'];
											dlh_mm['object_name'][ this_object_name ] = this_object_id;

											dlh_mm['object_data'][this_object_id]=[];
											dlh_mm['object_data'][this_object_id]['name']=this_object_name;
											dlh_mm['object_data'][this_object_id]['wikiid']=jQuery(this).data('wiki-id');
											dlh_mm['object_data'][this_object_id]['title']= jQuery(this).text();
											dlh_mm['object_data'][this_object_id]['link']=jQuery(this).attr('href');
											dlh_mm['object_data'][this_object_id]['ports_count']=0;
											dlh_mm['object_data'][this_object_id]['ports_data']=[];
											dlh_mm['object_data'][this_object_id]['ports_names']=[];

											dlh_mm['object_count']++;
										}else{
											this_object_id = dlh_mm['object_name'][ this_object_name ];
										}
										row_data['obj'][i] = this_object_id;
									}
								}}
							);
							
							
							
						}}
						);
						
					} //col port?
// PORT START 
if( dlh_obj1_port !== false && this_object_id !== false){
	jQuery('.col'+dlh_obj1_port,this).each(
		function(){if(this){
			if( jQuery(this).text() ){
				
				this_port_id = dlh_mm['port_count'];
				this_port_name = jQuery(this).text();
				dlh_mm['object_data'][this_object_id]['ports_data'][ dlh_mm['object_data'][this_object_id]['ports_count'] ] = this_port_id;
				dlh_mm['port_data'][ this_port_id ]=[];
				dlh_mm['port_data'][ this_port_id ]['object']=[this_object_id];
				dlh_mm['port_data'][ this_port_id ]['portnum']=[dlh_mm['object_data'][this_object_id]['ports_count']];
				dlh_mm['port_data'][ this_port_id ]['label']=[ this_port_name ];
				
				this_port_a = this_port_id;

				dlh_mm['object_data'][this_object_id]['ports_count']++;
				dlh_mm['port_count']++;
		
			}
		}}
	);
}
// PORT END 					
					
					
				}//for i<3
				
			}}
		);// each tr
		
		//BUILD GRAPH
	}}
);// each .dlh_mm

}

if(1==3){
jQuery('.dlh_mm').each(
	function(){if(this){
		jQuery('tbody tr',this).each(
			function(){if(this){
				this_port_a = false; 
				this_port_b = false; 
				this_obj_a = false;
				this_obj_b = false;

				// OBJ1 START 
				if( dlh_obj1 !== false){
					jQuery('.col'+dlh_obj1,this).each(
						function(){if(this){
							this_object_id=false;
							this_object_name=false;
							this_port_id=false;
							this_port_name=false;
							

							jQuery('a',this).each(
								function(){if(this){
									if( jQuery(this).data('wiki-id') ){
										
										this_object_name = jQuery(this).data('wiki-id');
										
										if( dlh_mm['object_name'][ this_object_name ] == undefined ){
											this_object_id = dlh_mm['object_count'];
											dlh_mm['object_name'][ this_object_name ] = this_object_id;
											
											dlh_mm['object_data'][this_object_id]=[];
											dlh_mm['object_data'][this_object_id]['name']=this_object_name;
											dlh_mm['object_data'][this_object_id]['wikiid']=jQuery(this).data('wiki-id');
											dlh_mm['object_data'][this_object_id]['title']= jQuery(this).text();
											dlh_mm['object_data'][this_object_id]['link']=jQuery(this).attr('href');
											dlh_mm['object_data'][this_object_id]['ports_count']=0;
											dlh_mm['object_data'][this_object_id]['ports_data']=[];
											
											
											dlh_mm['object_count']++;
										}else{
											this_object_id = dlh_mm['object_name'][ this_object_name ];
										}
										this_obj_a = this_object_id;
									}
								}}
							)

						}}
					);
					// PORT START 
					if( dlh_obj1_port !== false && this_object_id !== false){
						jQuery('.col'+dlh_obj1_port,this).each(
							function(){if(this){
								if( jQuery(this).text() ){
									
									this_port_id = dlh_mm['port_count'];
									this_port_name = jQuery(this).text();
									dlh_mm['object_data'][this_object_id]['ports_data'][ dlh_mm['object_data'][this_object_id]['ports_count'] ] = this_port_id;
									dlh_mm['port_data'][ this_port_id ]=[];
									dlh_mm['port_data'][ this_port_id ]['object']=[this_object_id];
									dlh_mm['port_data'][ this_port_id ]['portnum']=[dlh_mm['object_data'][this_object_id]['ports_count']];
									dlh_mm['port_data'][ this_port_id ]['label']=[ this_port_name ];
									
									this_port_a = this_port_id;

									dlh_mm['object_data'][this_object_id]['ports_count']++;
									dlh_mm['port_count']++;
							
								}
							}}
						);
					}
					// PORT END 
				}
				// OBJ1 END 


				// OBJ2 START 
				if( dlh_obj2 !== false){
					jQuery('.col'+dlh_obj2,this).each(
						function(){if(this){
							this_object_id=false;
							this_object_name=false;
							this_port_id=false;
							this_port_name=false;
							

							jQuery('a',this).each(
								function(){if(this){
									if( jQuery(this).data('wiki-id') ){
										
										this_object_name = jQuery(this).data('wiki-id');
										
										if( dlh_mm['object_name'][ this_object_name ] == undefined ){
											this_object_id = dlh_mm['object_count'];
											dlh_mm['object_name'][ this_object_name ] = this_object_id;
											
											dlh_mm['object_data'][this_object_id]=[];
											dlh_mm['object_data'][this_object_id]['name']=this_object_name;
											dlh_mm['object_data'][this_object_id]['wikiid']=jQuery(this).data('wiki-id');
											dlh_mm['object_data'][this_object_id]['title']= jQuery(this).text();
											dlh_mm['object_data'][this_object_id]['link']=jQuery(this).attr('href');
											dlh_mm['object_data'][this_object_id]['ports_count']=0;
											dlh_mm['object_data'][this_object_id]['ports_data']=[];
											
											
											dlh_mm['object_count']++;
										}else{
											this_object_id = dlh_mm['object_name'][ this_object_name ];
										}
										this_obj_b = this_object_id;
									}
								}}
							)

						}}
					);
					// PORT START 
					if( dlh_obj2_port !== false && this_object_id !== false){
						jQuery('.col'+dlh_obj2_port,this).each(
							function(){if(this){
								if( jQuery(this).text() ){
									
									this_port_id = dlh_mm['port_count'];
									this_port_name = jQuery(this).text();
									dlh_mm['object_data'][this_object_id]['ports_data'][ dlh_mm['object_data'][this_object_id]['ports_count'] ] = this_port_id;
									dlh_mm['port_data'][ this_port_id ]=[];
									dlh_mm['port_data'][ this_port_id ]['object']=[this_object_id];
									dlh_mm['port_data'][ this_port_id ]['portnum']=[dlh_mm['object_data'][this_object_id]['ports_count']];
									dlh_mm['port_data'][ this_port_id ]['label']=[ this_port_name ];
									
									this_port_b = this_port_id;

									dlh_mm['object_data'][this_object_id]['ports_count']++;
									dlh_mm['port_count']++;
							
								}
							}}
						);
					}
					// PORT END 
				}
				// OBJ2 END 

				// CONNECTION START 
				
///				if( dlh_conn !== false && this_port_a !== false && this_port_b !== false){
				if( dlh_conn !== false ){
					jQuery('.col'+dlh_conn+' a',this).each(
						function(){if(this){
							if( jQuery(this).data('wiki-id') ){
								
								this_conn_id = dlh_mm['conn_count'];
								dlh_mm['conn_data'][this_conn_id]=[];
								dlh_mm['conn_data'][this_conn_id]['obj_a']=this_obj_a;
								dlh_mm['conn_data'][this_conn_id]['obj_b']=this_obj_b;
								dlh_mm['conn_data'][this_conn_id]['port_a']=this_port_a;
								dlh_mm['conn_data'][this_conn_id]['port_b']=this_port_b;
								dlh_mm['conn_data'][this_conn_id]['wikiid']=jQuery(this).data('wiki-id');
								dlh_mm['conn_data'][this_conn_id]['title']=jQuery(this).text();
								dlh_mm['conn_data'][this_conn_id]['link']=jQuery(this).attr('href');

								dlh_mm['conn_count']++;
						
							}
						}}
					);
				}
				
				// CONNECTION END 
				
				
				
			}}
		);// each row
		
		// BUILD GRAPH START
		dlh_mm_out='';
		// the objects 
		for(i=0;i<dlh_mm['object_count'];i++){
			dlh_mm_out += 'subgraph Obj'+i+'['+ dlh_mm['object_data'][i]['title'] +']\n';
			
			if( dlh_mm['object_data'][i]['ports_count'] == 0){
				dlh_mm_out += 'Obj'+i+'PortX';
				dlh_mm_out +='[o]\n';
				dlh_mm_out +=' click Port'+this_port_id+' "';
				dlh_mm_out += dlh_mm['object_data'][i]['link'] + '" "open object" _blank\n';
			}else{
				for(ii=0;ii<dlh_mm['object_data'][i]['ports_count'];ii++){
					this_port_id = dlh_mm['object_data'][i]['ports_data'][ii];
					dlh_mm_out +=' Port'+this_port_id;
					dlh_mm_out +='['+dlh_mm['port_data'][this_port_id]['label']+']\n';
					dlh_mm_out +=' click Port'+this_port_id+' "';
					dlh_mm_out += dlh_mm['object_data'][i]['link'] + '" "open object" _blank\n';
				}
			}
			dlh_mm_out += 'end\n\n';
			
		}
		
		// the connections 
		
		for(i=0;i<dlh_mm['conn_count'];i++){
				
				dlh_mm_out += 'Port'+dlh_mm['conn_data'][i]['port_a'];
				dlh_mm_out += '---';
				
				if(1==2){
				dlh_mm_out += 'conn'+i+'{{'+dlh_mm['conn_data'][i]['title']+'}}---';
				dlh_mm_out += 'Port'+dlh_mm['conn_data'][i]['port_b']+'\n';
				
				dlh_mm_out += 'click conn'+i+' "';
				dlh_mm_out += dlh_mm['conn_data'][i]['link'] + '" "open conn object" _blank\n';
				}else{
				dlh_mm_out += '|'+dlh_mm['conn_data'][i]['title']+'|Port';
				dlh_mm_out += dlh_mm['conn_data'][i]['port_b']+'\n';
				}
		}
		
		// BUILD END 
		if(dlh_mm_out != ''){
			dlh_mm_out = '<div class="mermaid">\n\ngraph TD\n\n'+dlh_mm_out+'\n\n</div>';
			jQuery(this).append(dlh_mm_out);
			//console.log(dlh_mm_out);
		}
	}}
);

mermaid.init();
} //1==3
*/
//console.log(dlh_mm_out);
/* END */





document.addEventListener("DOMContentLoaded", function(event) { 
  dlh_ini();
 }); //event listener


/* IP HELPER */





