function Header(){
    const items=["Мои плейлисты","Мои исполнители","Любимые треки"]    
    return (
        <header className="header">
       
        <a href="/">
            <img src="img/spotify_emblem_small.png" height="50px" width="50px" alt="Spyortify emblem"/>
        </a>
        <div className="app_title">
            Spyortify
        </div>
        {items.map((item)=>{
            return  (<a href="#">
            {item}
            </a>)
        })}
        <form action="" method="get" className="header_searchbox">
            <input type="search" placeholder="Поиск" className="searchbox_image" />
        </form>
        <div>
            <img className="user_img" src="img/anonymous-user.png" alt="User" height="40px"/>
        </div>
        </header>
    )
}

export default Header;