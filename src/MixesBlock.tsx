import Mix from "./Mix"

function MixesBlock(){
    const data = [
        {img:"img/gradient_blue.jpg",name:"Микс дня 1"},
        {img:"img/gradient_green.jpg",name:"Микс дня 2"},
        {img:"img/gradient_orange.jpg",name:"Микс дня 3"},
        {img:"img/gradient_yellow.jpg",name:"Микс дня 4"},
        {img:"img/gradient_purple.jpg",name:"Микс дня 5"}]
    return (
        <div className="mixes_block ">
            <div className="mixes_header ">
                Миксы дня
                <div className="mixes ">
                    {data.map((item)=>{
                        return <Mix name={item.name} src={item.img}/>
                    })}
                </div>
                
            </div>
        </div>
)
}

export default MixesBlock