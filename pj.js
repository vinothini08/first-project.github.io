const btnCart=document.querySelector('#cart-icon');
const cart=document.querySelector('.cart');
const btnClose=document.querySelector('#cart-close');
btnCart.addEventListener('click', ()=>{
    cart.classList.add('cart-active');
});
btnClose.addEventListener('click', ()=>{
    cart.classList.remove('cart-active');
});
document.addEventListener('DOMContentLoaded', loadJewell);
function loadJewell(){
    loadContent();
}
function loadContent(){
    //remove Jewell  From Cart
    let btnRemove=document.querySelectorAll('.cart-remove');
    btnRemove.forEach((btn)=>{
        btn.addEventListener('click', removeItem);
    });
    //Product Item Change Events
    let qtyElement=document.querySelectorAll('.cart-quantity');
    qtyElement.forEach((input)=>{
        input.addEventListener('change', changeQty);
    });
       //Product cart
         let cartBtns=document.querySelectorAll('.add-cart');
         cartBtns.forEach((btn)=>{
             btn.addEventListener('click', addCart);
            
            
         });

         updateTotal();
  
}

//Remove Item
function removeItem(){
    if(confirm('Are you Sure to Remove')){
      
        let title=this.parentElement.querySelector('.cart-jewell-title').innerHTML;
        itemList=itemList.filter(el=>el.title!=title);
        this.parentElement.remove();
        loadContent();
    }
}
//Change Quantity
function changeQty(){
    if(isNaN(this.value) || this.value<1){
        this.value=1;
    }
    loadContent();
}
 let itemList=[];
//Add Cart
function addCart(){
    let jewell=this.parentElement;
    let title=jewell.querySelector('.jewells-title').innerHTML;
    let price=jewell.querySelector('.jewells-price').innerHTML;
    let imgSrc=jewell.querySelector('.jewells').src;
    
    let newProduct={title, price, imgSrc}
    //check Product Alreay exist in cart
    if(itemList.find((el)=>el.title==newProduct.title)){
        alert("Product Alreay Added in Cart");
        return;
    }else{
        itemList.push(newProduct);
    }



    let newProductElement= createCartProduct(title,price, imgSrc);
    let element=document.createElement('div');
    element.innerHTML= newProductElement;
    let cartBasket= document.querySelector('.cart-content');
    cartBasket.append(element);
    loadContent();
}
// console.log(cartBasket.append(newProductElementelement))

function createCartProduct(title, price, imgSrc){
    return `

            <div class="cart-box">
                <img src="${imgSrc}" class="cart-img">
                <div class="detail-box">
                    <div class="cart-jewell-title">${title}</div>
                    <div class="price-box">
                        <div class="cart-price">${price}</div>
                        <div class="cart-amt">${price}</div>
                    </div>
                    <input type="number" value="1" class="cart-quantity">
                </div>
                <ion-icon name="trash" class="cart-remove"></ion-icon>
            
              </div> 
`;
    }

    function updateTotal()
    {
      const cartItems=document.querySelectorAll('.cart-box');
      const totalValue=document.querySelector('.total-price');
    
      let total=0;
    
      cartItems.forEach(product=>{
        let priceElement=product.querySelector('.cart-price');
        let price=parseFloat(priceElement.innerHTML.replace("Rs.",""));
        let qty=product.querySelector('.cart-quantity').value;
        total+=(price*qty);
        product.querySelector('.cart-amt').innerText="Rs."+(price*qty);
    
      });

totalValue.innerHTML='Rs.'+total;


//Add Product count in Cart Icon
const cartCount=document.querySelector('.cart-count');
let count=itemList.length;
cartCount.innerHTML=count;

if(count==0)
{
    cartCount.style.display='none';
}else{
    cartCount.style.display='block';
}

}
