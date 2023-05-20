   const filterCanvasButtons = document.querySelectorAll('.filter-canvas-buttons .button');
   const filterCanvasItems = document.querySelectorAll('.filter-canvas-items .filter-canvas-item');
   dataFilter(filterCanvasButtons, filterCanvasItems);

   const filterMapButtons = document.querySelectorAll('.filter-map-buttons button');
   const filterMapItems = document.querySelectorAll('.filter-map-items .filter-map-item');
   dataFilter(filterMapButtons, filterMapItems);

   function dataFilter(buttons, items){
      buttons.forEach((button) => {
         button.addEventListener('click', () => {
            const filter = button.dataset.filter;

            items.forEach((item) => {
               if (filter === 'all' || item.classList.contains(filter)) {
                  item.classList.remove('hide');
               } else {
                  item.classList.add('hide');
               }
            });
         });
      });
   }