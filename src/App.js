import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import AddStar from "./components/AddStar";


function App(){
    return (
        <>
            <Routes>
                <Route path="/movie" element={<HomePage/>} ></Route>
                <Route path="/movie/:id/add-stars" element={<AddStar/>}/>
            </Routes>
        </>
    )
}

export default App;