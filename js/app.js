var itemsContainer = document.getElementById('store-items');
var items = document.querySelectorAll('#store-items .store-item');
var buttons = document.querySelectorAll('.sortBtn a');
var txtSearch = document.getElementById('search-item');



buttons.forEach(function(button){
	button.addEventListener('click', function(e){
		e.preventDefault();
		var keyword = e.target.getAttribute("data-filter");
		filterItems(keyword);
	});
});

txtSearch.addEventListener('input', function(e){
	filterItems(e.target.value);
});


function filterItems(keyword){
	itemsContainer.innerText='';
	
	items.forEach(function(item){
		if(!keyword || keyword == 'all' || item.getAttribute("data-item").includes(keyword)){
			itemsContainer.appendChild(item);
		}
		
	});
	
	
}