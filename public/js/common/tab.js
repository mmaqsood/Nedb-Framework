/*
	  ______            __            _         
	 /_  __/  ____ _   / /_          (_)   _____
	  / /    / __ `/  / __ \        / /   / ___/
	 / /    / /_/ /  / /_/ / _     / /   (__  ) 
	/_/     \__,_/  /_.___/ (_) __/ /   /____/  
	                           /___/           

	Lightweight plugin making BootStrap tabs easy. 
*/

define(["jquery", "bootstrap"], function($, bootstrap) {
    (function($) {
		$.tab = function(tabs){
			$.lib.init(tabs.id, tabs.tabs, this);
		};
		
		/*
			A new tab will be attahced to existing Tabs.

			@tab: The new tab to add to our Tabs. 
			@format: tab: {
						id: @id,
						title: @title,
						content: @content
					 }
		*/
		$.fn.addTab = function (tab) {
			var heads = $("ul.nav.nav-tabs", $(this)),
				bodies = $("div.tab-content", $(this)),
				head = $.lib.generateHead(tab),
				body = $.lib.generateTab(tab);

			//Attach the generated head and body.
			heads.append(head);
			bodies.append(body);
		};

		/*
			Will delete the tab and activate the previous tab if there is one,
			if not, the next tab will be activated.

			@id: The id of the tab to remove.
		*/
		$.fn.removeTab = function(id) {
			//This means we want to delete the current active tab.
			if (!id){
				//Active tab's id
				id = $("ul.nav.nav-tabs li.active a").attr('href');
				//Chop off the beginning #
				id = id.substring(1);
			}

			var container = $("ul.nav.nav-tabs li:has(a[href=#" + id +"])");
				head = $("a", container),
				body = $("div.tab-content #" + id),
				prevHead = $("a", container.prev()),
				nextHead = $("a", container.next());

			//Remove the tab.
			container.remove();
			body.remove();

			//Switching the active tab if the deleted tab was the active one.
			if (container.hasClass('active')){
				if (prevHead.length > 0){
					//Show the previous tab
					$(prevHead).tab('show');
				}
				else {
					//Show the next one since there is no previous.
					$(nextHead).tab('show');
				}
			}
		};

		/*
			This is where most of the magic happens. Anything tab related. 
			Mostly the init function takes care of all the work.
		*/
		$.lib = {
			id: null,
			tabs: {},
			heads: {},

			/*
				@id: Id of the Tab container.
				@tabs: Array of tabs. 
				@format: id: 'tabArea',
						 tabs: [
								{
									id: @id
									title: @title
									content: @content,
									active: true
								},
								{
									id: @id
									title: @title
									content: @content
								}
							]
			*/
			init: function(id, tabs){
				this.id = id;
				this.tabs = tabs;

				
				//Get the tab headers.
				var heads = this.getTabHeads();

				//Get the actual tabs aka the bodies.
				var bodies = this.getTabs();

				//This will wrap our tabs.
				var wrapper =  $("<div class='bootstrap-tabs'></div>");

				//Attach the tab heads and bodies to our wrapper.
				wrapper.append(heads);
				wrapper.append(bodies);

				//Render it to our target div.
				$("#" + this.id).html(wrapper);

				//Attach standard events for tabs.
				this.attachEvents();
			},

			/*
				Generates the tab content wrapper with tab bodies.

				@Output: <div class='tab-content'>
						 	<div class='tab-pane fade in'>
								Content
						 	</div>
						 </div>
			*/
			getTabs: function() {
				var self = this,
					tabs = this.tabs,
					wrapper = $("<div class='tab-content'></div>");

				wrapper.attr('id', this.id + 'Content');

				$.each(tabs, function(i, tab){
					wrapper.append(self.generateTab(tab));
				});

				return wrapper
			},

			/*
				Generates a single tab body.

				@Output: <div class='tab-pane fade in'>
							Content
						 </div>
			*/
			generateTab: function(tab) {
				var wrapper = $("<div class='tab-pane fade in'></div>");

				wrapper.attr('id', tab.id);

				if (tab.active){
					wrapper.addClass('active');
				}

				wrapper.append(tab.content);

				return wrapper
			},

			/*
				Generates the tab head wrapper with tab heads.
				
				@Output: <ul class='nav nav-tabs' role='tablist'>
							<li>
								<a href='#sample' role='tab' data-toggle='tab'>Sample</a>
							</li>
						 </ul>
			*/
			getTabHeads: function() {
				var self = this,
					tabs = this.tabs,
					wrapper = $("<ul class='nav nav-tabs' role='tablist'></ul>");

				wrapper.attr('id', this.id);

				$.each(tabs, function(i, tab){
					wrapper.append(self.generateHead(tab));
				});

				return wrapper
			},

			/*
				Generates a single tab head.

				@Output: <li>
							<a href='#sample' role='tab' data-toggle='tab'>Sample</a>
						 </li>
			*/
			generateHead: function(tab){
				var wrapper = $("<li></li>"),
					title = $("<a href='#' role='tab' data-toggle='tab'></a>");

				//Add the title.
				title.html(tab.title);

				//Handling the active tab.
				if (tab.active) {
					wrapper.addClass('active');
				}

				//Add the link
				title.attr('href', '#' + tab.id);

				//Add to the wrapper
				wrapper.append(title);

				return wrapper;

			},

			/*
				Attaches the basic event to handle toggling of tabs.
			*/
			attachEvents: function() {
				var selector = "#" + this.id + ' a';

				//Will toggle tabs
				$(selector).click(function (e) {
					e.preventDefault()
					$(this).tab('show')
				});

				//Sneak peak of one tab behind
				$(selector).hover(function(e){
					var id = $(this).attr('href'),
						head = $(this),
						body = $("div.tab-pane" + id);

					
				});

			}

		}
	}(jQuery));
});

