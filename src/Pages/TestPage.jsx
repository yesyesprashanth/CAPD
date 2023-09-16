import { useContext } from "react";
import Layout from "../components/Layout/HomePage/Layout";
import TestScreen1 from "../components/Testpage/TestScreen1";
import TestScreen2 from "../components/Testpage/TestScreen2";
import TestContext from "../store/testContextProvider";


export default function TestPage(){
    const {testData} = useContext(TestContext);

    return(
        <Layout>
            {
                (testData.testCode < 4)? (<TestScreen1 />) : (<TestScreen2 />)
            }
        </Layout>
    )
}