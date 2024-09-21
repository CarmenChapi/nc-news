
import TopicsNavBar from "./TopicsNavBar"
import ListArticles from "./ListArticles";
import SortBy from "./SortBy";


const Home = () => {

    return <div className="home">
      <div className="menu">
    <TopicsNavBar /> 
    <SortBy />
    </div>
    <ListArticles/>
    </div>
}



export default Home;