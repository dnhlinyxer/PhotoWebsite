import React, {useState, useEffect} from 'react';
import Search from '../components/Search';
import Picture from '../components/Picture';

const Homepage = () => {
    const [input, setInput] = useState("");
    let [data, setData] = useState(null);
    let [page, setPage] = useState(1);
    let [currentSearch, setCurrentSearch] = useState("");
    const auth = "563492ad6f9170000100000107fda62123584d36a5d28999da055709";
    const initialURL = "https://api.pexels.com/v1/curated?page=1&per_page=15";
    const searchURL = `https://api.pexels.com/v1/search?query=${currentSearch}&page=1&per_page=15`

    // fetch data from pexel api
    const search = async (url) => {
        setPage(2);
        const dataFetch = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: auth, 
            }
        });
        let parsedData = await dataFetch.json();
        setData(parsedData.photos);
    };

    // Load more picture
    const morepicture = async () => {
        let newURL;
        if (currentSearch === "") {
            newURL = `https://api.pexels.com/v1/curated?page=${page}&per_page=15`;
        } else {
            newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&page=${page}&per_page=15`;
        }
        setPage(page + 1);
        const dataFetch = await fetch(newURL, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: auth, 
            }
        });
        let parsedData = await dataFetch.json();
        setData(data.concat(parsedData.photos));
    };

    // fetch data when the page loads up
    useEffect(() => {
        search(initialURL);
    }, []);

    useEffect(() => {
        if (currentSearch === "") {
            search(initialURL);
        } else {
            search(searchURL);
        }
    }, [currentSearch]);

    return (
        <div style={{minHeight: "100vh"}}>
            <Search 
            search={() => {
                // JS Closure
                setCurrentSearch(input);
            }} 
            setInput={setInput} 
            />
            <div className="pictures">
                {data && data.map(d => {
                    return <Picture data={d} />
                })}
            </div>

            {/* 新增"載入更多"按紐 */}
            <div className="morePicture">
                <button onClick={morepicture}>Load More</button>
            </div>
        </div>
    )
}

export default Homepage;
