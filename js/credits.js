const   sideBarBtn = document.querySelector('.side-bar__btn'),
        sideBar = document.querySelector('.side-bar'), 
        body = document.querySelector('.return__body'),
        selectBtns = document.querySelectorAll('.select__btn'),
        selectParent = '.select',
        selectItems = document.querySelectorAll('.select__item'), 
        dropdownWindow = document.querySelector('.side-bar__dropdown'),
        dropdownBtn = document.querySelector('.side-bar__dropdown-btn'),    
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
        tableCell = '.table__info';


    
sideBarBtn.addEventListener('click', () => {
    sideBar.classList.toggle('active'); 
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
    dropdownWindow.classList.toggle('active')
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
 