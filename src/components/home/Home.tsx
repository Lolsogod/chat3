import Chat from "../Chat";
import SideBar from "../Sidebar";

export default function Home(){
    return(
        <div className="flex h-screen">
            <SideBar/>
            <Chat/>
        </div>
    )
}