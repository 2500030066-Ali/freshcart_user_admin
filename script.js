const defaultProducts=[
 {name:"Fresh Apples",cat:"Fruits",price:149,unit:"1 kg",img:"https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=700&q=80"},
 {name:"Bananas",cat:"Fruits",price:59,unit:"1 dozen",img:"https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=700&q=80"},
 {name:"Oranges",cat:"Fruits",price:99,unit:"1 kg",img:"https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=700&q=80"},
 {name:"Mangoes",cat:"Fruits",price:129,unit:"1 kg",img:"https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=700&q=80"},
 {name:"Tomatoes",cat:"Vegetables",price:49,unit:"1 kg",img:"https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=700&q=80"},
 {name:"Broccoli",cat:"Vegetables",price:89,unit:"500 g",img:"https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=700&q=80"},
 {name:"Potatoes",cat:"Vegetables",price:45,unit:"1 kg",img:"https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=700&q=80"},
 {name:"Carrots",cat:"Vegetables",price:69,unit:"1 kg",img:"https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=700&q=80"},
 {name:"Milk",cat:"Dairy",price:32,unit:"500 ml",img:"https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=700&q=80"},
 {name:"Cheese",cat:"Dairy",price:129,unit:"200 g",img:"https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=700&q=80"},
 {name:"Eggs",cat:"Dairy",price:72,unit:"12 pieces",img:"https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=700&q=80"},
 {name:"Bread",cat:"Bakery",price:45,unit:"400 g",img:"https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80"},
 {name:"Croissant",cat:"Bakery",price:85,unit:"2 pieces",img:"https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=700&q=80"},
 {name:"Basmati Rice",cat:"Staples",price:179,unit:"1 kg",img:"https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=700&q=80"},
 {name:"Wheat Flour",cat:"Staples",price:55,unit:"1 kg",img:"https://images.unsplash.com/photo-1623428187969-5da2dcea5a5d?auto=format&fit=crop&w=700&q=80"},
 {name:"Cooking Oil",cat:"Staples",price:145,unit:"1 L",img:"https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=80"},
 {name:"Potato Chips",cat:"Snacks",price:40,unit:"100 g",img:"https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=700&q=80"},
 {name:"Chocolate",cat:"Snacks",price:99,unit:"100 g",img:"https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=700&q=80"},
 {name:"Orange Juice",cat:"Beverages",price:119,unit:"1 L",img:"https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=700&q=80"},
 {name:"Mineral Water",cat:"Beverages",price:20,unit:"1 L",img:"https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&w=700&q=80"},
 {name:"Green Tea",cat:"Beverages",price:149,unit:"25 bags",img:"https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=700&q=80"}
];

let products=JSON.parse(localStorage.getItem("freshcartProducts")||"null") || defaultProducts;
let currentRole=localStorage.getItem("freshcartRole") || "";
let currentEmail=localStorage.getItem("freshcartEmail") || "";

const categories=[
 ["🛒","All"],["🍎","Fruits"],["🥦","Vegetables"],["🥛","Dairy"],["🍞","Bakery"],["🍚","Staples"],["🍿","Snacks"],["🥤","Beverages"]
];

let activeCategory="All";
let cart=JSON.parse(localStorage.getItem("freshcartCart")||"{}");

const loginPage=document.getElementById("loginPage");
const storePage=document.getElementById("storePage");
const productGrid=document.getElementById("productGrid");
const categoryGrid=document.getElementById("categoryGrid");
const searchInput=document.getElementById("searchInput");
const sortSelect=document.getElementById("sortSelect");
const cartModal=document.getElementById("cartModal");

function selectRole(role){
 currentRole=role;
 document.getElementById("userRoleBtn").classList.toggle("active",role==="user");
 document.getElementById("adminRoleBtn").classList.toggle("active",role==="admin");
 document.getElementById("loginHint").innerHTML = role==="admin"
   ? "Admin demo: <b>admin@freshcart.com</b> / <b>admin123</b>"
   : "User demo: any valid email + 4+ character password.";
}

document.getElementById("loginForm").addEventListener("submit",e=>{
 e.preventDefault();
 const email=document.getElementById("email").value.trim().toLowerCase();
 const password=document.getElementById("password").value;

 if(currentRole==="admin"){
   if(email!=="admin@freshcart.com" || password!=="admin123"){
     toast("Invalid admin credentials");
     return;
   }
 } else if(password.length<4){
   toast("Password must contain at least 4 characters");
   return;
 } else {
   const users=JSON.parse(localStorage.getItem("freshcartUsers")||"[]");
   if(!users.includes(email)){ users.push(email); localStorage.setItem("freshcartUsers",JSON.stringify(users)); }
 }

 localStorage.setItem("freshcartLoggedIn","true");
 localStorage.setItem("freshcartRole",currentRole);
 localStorage.setItem("freshcartEmail",email);

 if(currentRole==="admin") showAdmin();
 else showStore();
});

function showStore(){
 loginPage.classList.add("hidden");
 adminPage.classList.add("hidden");
 storePage.classList.remove("hidden");
 document.getElementById("adminNavBtn").classList.toggle("hidden",currentRole!=="admin");
 renderCategories();
 renderProducts();
 updateCartCount();
}

function showAdmin(){
 loginPage.classList.add("hidden");
 storePage.classList.add("hidden");
 adminPage.classList.remove("hidden");
 renderAdminDashboard();
}

function renderAdminDashboard(){
 document.getElementById("adminProductCount").textContent=products.length;
 const cartItems=Object.values(cart).reduce((a,b)=>a+b,0);
 document.getElementById("adminCartCount").textContent=cartItems;
 let value=0;
 Object.entries(cart).forEach(([name,qty])=>{
   const p=products.find(x=>x.name===name);
   if(p) value+=p.price*qty;
 });
 document.getElementById("adminCartValue").textContent="₹"+value;
 const users=JSON.parse(localStorage.getItem("freshcartUsers")||"[]");
 document.getElementById("adminUserCount").textContent=users.length;
 renderAdminProducts();
}

function renderAdminProducts(){
 const box=document.getElementById("adminProductTable");
 box.innerHTML=products.map((p,i)=>`
   <div class="admin-product-row">
     <img src="${p.img}" alt="${p.name}">
     <div class="admin-product-info">
       <strong>${p.name}</strong>
       <span>${p.cat} · ${p.unit}</span>
     </div>
     <strong>₹${p.price}</strong>
     <button class="delete-btn" onclick="deleteProduct(${i})">Delete</button>
   </div>
 `).join("");
}

document.getElementById("addProductForm").addEventListener("submit",e=>{
 e.preventDefault();
 const product={
   name:document.getElementById("newName").value.trim(),
   cat:document.getElementById("newCategory").value,
   price:Number(document.getElementById("newPrice").value),
   unit:document.getElementById("newUnit").value.trim(),
   img:document.getElementById("newImg").value.trim()
 };
 products.push(product);
 localStorage.setItem("freshcartProducts",JSON.stringify(products));
 e.target.reset();
 renderAdminDashboard();
 toast(product.name+" added successfully");
});

function deleteProduct(index){
 const removed=products[index];
 products.splice(index,1);
 localStorage.setItem("freshcartProducts",JSON.stringify(products));
 if(cart[removed.name]){ delete cart[removed.name]; saveCart(); }
 renderAdminDashboard();
 toast(removed.name+" removed");
}

function logout(){
 localStorage.removeItem("freshcartLoggedIn");
 localStorage.removeItem("freshcartRole");
 localStorage.removeItem("freshcartEmail");
 currentRole="";
 currentEmail="";
 adminPage.classList.add("hidden");
 storePage.classList.add("hidden");
 loginPage.classList.remove("hidden");
 selectRole("user");
}
function logout(){
 localStorage.removeItem("freshcartLoggedIn");
 storePage.classList.add("hidden");
 loginPage.classList.remove("hidden");
}
function goHome(){window.scrollTo({top:0,behavior:"smooth"})}
function shopNow(){document.getElementById("shopSection").scrollIntoView({behavior:"smooth"})}

function renderCategories(){
 categoryGrid.innerHTML=categories.map(([emoji,name])=>
 `<div class="category-card" onclick="filterCategory('${name}')"><div class="emoji">${emoji}</div><h3>${name}</h3></div>`
 ).join("");
}

function filterCategory(cat){
 activeCategory=cat;
 renderProducts();
 shopNow();
}

function renderProducts(){
 let list=products.filter(p=>activeCategory==="All"||p.cat===activeCategory);
 const q=searchInput.value.trim().toLowerCase();
 if(q) list=list.filter(p=>(p.name+" "+p.cat).toLowerCase().includes(q));
 if(sortSelect.value==="low")list.sort((a,b)=>a.price-b.price);
 if(sortSelect.value==="high")list.sort((a,b)=>b.price-a.price);
 if(sortSelect.value==="name")list.sort((a,b)=>a.name.localeCompare(b.name));
 document.getElementById("resultText").textContent=`${list.length} grocery item${list.length===1?"":"s"} available`;
 productGrid.innerHTML=list.map(p=>`
 <article class="product-card">
  <img src="${p.img}" alt="${p.name}">
  <div class="product-info">
   <h3>${p.name}</h3>
   <div class="category">${p.cat} · ${p.unit}</div>
   <div class="product-price">₹${p.price}</div>
   <button class="add-btn" onclick="addToCart('${p.name.replace(/'/g,"\\'")}')">+ Add to Cart</button>
  </div>
 </article>`).join("");
}

searchInput.addEventListener("input",renderProducts);
sortSelect.addEventListener("change",renderProducts);

function addToCart(name){
 cart[name]=(cart[name]||0)+1;
 saveCart();
 toast(name+" added to cart");
}
function saveCart(){
 localStorage.setItem("freshcartCart",JSON.stringify(cart));
 updateCartCount();
}
function updateCartCount(){
 document.getElementById("cartCount").textContent=Object.values(cart).reduce((a,b)=>a+b,0);
}
function openCart(){renderCart();cartModal.classList.remove("hidden")}
function closeCart(){cartModal.classList.add("hidden")}

function renderCart(){
 const entries=Object.entries(cart);
 if(!entries.length){
  document.getElementById("cartItems").innerHTML="<p>Your cart is empty.</p>";
  document.getElementById("cartTotal").textContent="₹0";
  return;
 }
 let total=0;
 document.getElementById("cartItems").innerHTML=entries.map(([name,qty])=>{
  const p=products.find(x=>x.name===name);
  const sub=p.price*qty; total+=sub;
  return `<div class="cart-row">
   <img src="${p.img}" alt="${p.name}">
   <div class="grow"><strong>${p.name}</strong><div class="muted">₹${p.price} × ${qty}</div></div>
   <div class="qty"><button onclick="changeQty('${name.replace(/'/g,"\\'")}',-1)">−</button><span>${qty}</span><button onclick="changeQty('${name.replace(/'/g,"\\'")}',1)">+</button></div>
   <strong>₹${sub}</strong>
  </div>`;
 }).join("");
 document.getElementById("cartTotal").textContent="₹"+total;
}
function changeQty(name,amount){
 cart[name]=(cart[name]||0)+amount;
 if(cart[name]<=0)delete cart[name];
 saveCart();renderCart();
}
function checkout(){
 if(!Object.keys(cart).length){toast("Your cart is empty");return}
 cart={};saveCart();closeCart();toast("Demo order placed successfully!");
}
function toast(message){
 const t=document.getElementById("toast");
 t.textContent=message;t.classList.add("show");
 setTimeout(()=>t.classList.remove("show"),2200);
}

if(localStorage.getItem("freshcartLoggedIn")==="true"){
 currentRole=localStorage.getItem("freshcartRole")||"user";
 currentEmail=localStorage.getItem("freshcartEmail")||"";
 if(currentRole==="admin") showAdmin();
 else showStore();
} else {
 selectRole("user");
}
