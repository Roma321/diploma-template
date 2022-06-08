interface Props{
    image:string;
    id:string;
    name:string;
    author:string;
    duration:number;
}
function Track(props:Props){
    return(
        <div className="track">
            <img src={props.image}  width="20px" alt="track_img" height="20px" className="track_image "/>
            <div>{props.author} — {props.name}</div>
            <div className="time_label ">{getTime(props.duration)}</div>
        </div>
    )
}
function getTime(duration: number){
    const minutes = Math.trunc(duration / 60000);
    let seconds = `${Math.trunc((duration - minutes * 60000) / 1000)}`;
    if (+seconds < 10) seconds = `0${seconds}`;
    return `${minutes}:${seconds}`;
}
export default Track