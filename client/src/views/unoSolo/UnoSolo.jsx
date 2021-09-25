import Sidebar from "../../components/sidebar/SideBar";
import PostDetalle from "../../components/postDetalle/PostDetalle";
import './unosolo.css'

const UnoSolo = () => {
  return (
    <div className="single">
      <PostDetalle/>
      <Sidebar />
    </div>
  );
}
export default UnoSolo