interface Props{
    src: string;
    name: string;
}
function Mix(props:Props){
 return(
    <div className="mix ">
        <img src={props.src} alt="mix" width="150px " height="150px"/>
        <div>{props.name}</div>
    </div>
 )
}

export default Mix