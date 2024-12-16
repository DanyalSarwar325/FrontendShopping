
import Slider from "../components/Slider"
import Categories from "../components/Categories"
import Card from "../components/Card"
import axios from 'axios';
import { useEffect,useState } from "react";
import WelcomeBanner from "../components/WelcomeBanner";
import { Cookie } from "lucide-react";
import Cookies from "js-cookie";
import {getUserInfoFromCookies} from "../utils/cookieUtils";
export const Home = () => {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category

  const fetchProducts = async (category = "") => {
// Function to parse cookies from a cookie string

    
    try {
      const response = category
      ? await axios.get(`/api/v1/products?category=${category}`)
      : await axios.get("/api/v1/products");
      setData(response.data); // Update products data
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // Handle category click
  const handleCategoryClick = (category) => {
    console.log(category);
    
    setSelectedCategory(category);
    fetchProducts(category);
  };

  useEffect(() => {
    // Initial fetch for all products
    fetchProducts();
  }, []);

  
    const categories = [
        { name: "", img: "/images/wallet2.png", link: "#" },
        { name: "", img: "/images/wallet7.png", link: "#" },
        { name: "Shoes", img: "/images/shoes8.png", link: "#" },
        { name: "Watches", img: "/images/watches17.png", link: "#" },
        { name: "Bangles", img: "/images/bangles2.png", link: "#" },
        { name: "Socks", img: "/images/socks17.png", link: "#" },
        { name: "Jackets", img: "/images/jackets39.png", link: "#" },
        { name: "Bags", img: "/images/bags10.png", link: "#" },
        { name: "Sweaters", img: "/images/sweaters17.png", link: "#" },
        { name: "Perfumes", img: "/images/perfumes15.png", link: "#" },
      ];

      

    return (
        <>
            
            {/* <Slider /> */}
            <WelcomeBanner/>
            <div className='mt-8 p-3'
            >
        <div className="flex overflow-x-auto space-x-6 py-4 px-4">
      {categories.map((category, index) => (
        <a
          key={index}
          href={category.link}
          onClick={() => handleCategoryClick(category.name)}
          className="flex flex-col items-center space-y-2 text-center"
        >
          <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center"> 
            <img
              src={category.img}
              alt={category.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
          <p className="text-sm font-medium text-gray-700">{category.name}</p>
        </a>
      ))}
    </div>
            </div>
            <div className='mt-12 p-2 ml-1 mr-1 flex w-full flex-wrap gap-9 justify-around'>
                {
                    data.map((item) =>
                        <Card {...item} key={item.id}  />
                    )
                }
            </div>

        </>
    )
}