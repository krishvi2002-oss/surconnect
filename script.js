/* ===== Reset ===== */

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:Arial, Helvetica, sans-serif;
}

body{
    background:#f5f5f5;
    color:#222;
}

/* ===== Navbar ===== */

.navbar{
    display:flex;
    justify-content:space-between;
    align-items:center;
    background:#ffffff;
    padding:15px 30px;
    box-shadow:0 2px 10px rgba(0,0,0,.08);
    position:sticky;
    top:0;
}

.logo h2{
    color:#6a00ff;
}

.search-box{
    flex:1;
    display:flex;
    justify-content:center;
}

.search-box input{
    width:60%;
    max-width:500px;
    padding:12px 18px;
    border:none;
    border-radius:30px;
    background:#ededed;
    outline:none;
    font-size:16px;
}

.join-btn button{
    background:#6a00ff;
    color:white;
    border:none;
    padding:12px 22px;
    border-radius:30px;
    cursor:pointer;
    font-size:15px;
    transition:.3s;
}

.join-btn button:hover{
    background:#5600d6;
}

/* ===== Hero ===== */

.hero{
    text-align:center;
    padding:50px 20px;
}

.hero h1{
    font-size:34px;
    margin-bottom:15px;
}

.hero p{
    color:#666;
    font-size:18px;
}

/* ===== Cards ===== */

.members{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
    gap:25px;
    padding:40px;
}

.card{
    background:white;
    border-radius:18px;
    padding:25px;
    text-align:center;
    box-shadow:0 5px 15px rgba(0,0,0,.08);
    transition:.3s;
}

.card:hover{
    transform:translateY(-5px);
}

.card img{
    width:100px;
    height:100px;
    border-radius:50%;
    margin-bottom:15px;
}

.card h3{
    margin-bottom:8px;
}

.card p{
    color:#666;
    margin-bottom:15px;
}

.card button{
    background:#6a00ff;
    color:white;
    border:none;
    padding:10px 18px;
    border-radius:25px;
    cursor:pointer;
}

/* ===== Mobile ===== */

@media(max-width:768px){

.navbar{
    flex-direction:column;
    gap:15px;
}

.search-box input{
    width:100%;
}

.hero h1{
    font-size:28px;
}

.members{
    padding:20px;
}

}
