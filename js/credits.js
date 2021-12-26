const   sideBarBtn = document.querySelector('.side-bar__btn'),
        sideBar = document.querySelector('.side-bar'), 
        pageContent =document.querySelector('.global__content'), 
        visitedPage = document.querySelectorAll('.global-item'),
        userDropdown = document.querySelector('.global__auth'),
        userBtn = document.querySelector('.user__dropdown-btn'), 
        selectBtns = document.querySelectorAll('.select__btn'),
        sideBarSet = '.side-bar__settings',
        selectParent = '.select',
        selectItems = document.querySelectorAll('.select__item'), 
        dropdownList = document.querySelector('.side-bar__settings'),
        dropdownBtn = document.querySelector('.side-bar__dropdown'),    
        sortOrder = document.querySelectorAll('[data-num="0"]'),
        sortOrderNext = document.querySelectorAll('[data-num="1"]'),
        sortCustomer = document.querySelectorAll('[data-num="5"]'),
        sortCustomerNext = document.querySelectorAll('[data-num="6"]'),
        sortBtns = document.querySelectorAll('.credits__sort-btn'),
        tableRows = document.querySelectorAll('.table__row'),
        orderId = document.querySelectorAll('.order__id'), 
        customerId = document.querySelectorAll('.customer__id'),
        table = document.querySelector('table'),
        tableTitleRow = document.querySelector('.table__title-row'),
        tableInfoRow = '.table__info-row',
        tableCell = '.table__info',
        globalSearch = document.querySelector('.global__search-input'),
        globalSearchDropdown = document.querySelector('.global__search-dropdown');
        
globalSearch.addEventListener('input', () => { 
    if(globalSearch.value.length > 0){
        globalSearchDropdown.classList.add('active');
        setTimeout(()=> {
            globalSearchDropdown.classList.add('show');
        }, 100)
    }else {
        globalSearchDropdown.classList.remove('show');
        setTimeout(()=> {
            globalSearchDropdown.classList.remove('active');
        }, 100)
    }
}) 


    
sideBarBtn.addEventListener('click', () => {
    sideBar.classList.toggle('active'); 
     if(sideBar.classList.contains('active')){  
            pageContent.style.marginLeft = "275px"; 
    }else {  
        dropdownList.classList.remove('active')
        pageContent.style.marginLeft = "65px";  
    }
}); 

selectBtns.forEach(btn => { 
    btn.addEventListener('click', () => {  
        document.querySelectorAll(selectParent).forEach(parent => {
            if(btn.closest(selectParent) != parent){
                parent.classList.remove('show-select')
            }
        })
        btn.closest(selectParent).classList.toggle('show-select') 
    });
}) 


userBtn.addEventListener('click', () => {
    userDropdown.classList.toggle('open')
});

visitedPage.forEach(item => {
    item.addEventListener('click', ()=> {
        visitedPage.forEach(elem => {
            elem.classList.remove('visited')
            if(elem.closest(sideBarSet)){
                elem.closest(sideBarSet).classList.remove('visited')
            }
        })
        if(item.closest(sideBarSet)){ 
            item.closest(sideBarSet).classList.add('visited')
        }
        item.classList.add('visited')
    })
})
selectItems.forEach(item => {
     item.addEventListener('click', () => {
        selectItems.forEach(el => {
            el.classList.remove('item-selected')
        })
        item.classList.add('item-selected'); 
        item.closest(selectParent).children[0].textContent = item.getAttribute('data-value');
        item.closest(selectParent).classList.remove('show-select')
     })
})  

dropdownBtn.addEventListener('click', () => {
    dropdownList.classList.toggle('active'); 
    if(dropdownList.classList.contains('active')){
        sideBar.classList.add('change-height')
    }else sideBar.classList.remove('change-height')
})



sortBtns.forEach(sort => {
    sort.addEventListener('click', () => {
        sortBtns.forEach(elem => {
            elem.classList.remove('active')
        })
        sort.classList.add('active');
        if(sort.getAttribute('id') == "customer"){
            renderRows(sortCustomerId())
            for(let i = 0; i < sortOrder.length; i++){
                tableRows[i].insertBefore(sortOrder[i], sortCustomerNext[i]);
                tableRows[i].insertBefore(sortCustomer[i], sortOrderNext[i]);
            }
        }else {
            renderRows(sortOrderId())
            for(let j = 0; j < sortOrder.length; j++){
                tableRows[j].insertBefore(sortOrder[j], sortOrderNext[j]);
                tableRows[j].insertBefore(sortCustomer[j], sortCustomerNext[j]);
            }
        }
    })
})

function sortOrderId(){
    let orders = [];

    for(let i = 0; i < orderId.length; i++ ) { 
        orders.push(orderId[i].textContent.trim())   
        orderId[i].closest(tableCell).setAttribute('id', orderId[i].textContent.trim() );
    } 
    orders.sort(function(a,b){ 
        return a-b
    })  
    return orders
}


function sortCustomerId(){
    let  customers = [];

    for(let i = 0; i < customerId.length; i++ ) {  
        customers.push(customerId[i].textContent.trim())
        customerId[i].closest(tableCell).setAttribute('id', customerId[i].textContent.trim() );
    } 
    customers.sort(function(a,b){ 
        return a-b
      })

    return customers
}
  
function renderRows(list) {   
        list.forEach(code => { 
            document.getElementById(code).closest(tableInfoRow).setAttribute("data-code", list.indexOf(code));
        }) 

        for (let i = 0; i < list.length; i++) { 
            table.appendChild(document.querySelector(`[data-code="${i}"]`) )
        } 
}
 