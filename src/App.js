import './App.css'
import { useEffect} from 'react'
import './JobCard'


function App() {

    const getN = 30

    const [nlimit, setNlimit] = useState(getN)
    const [noffset, setNoffset] = useState(0)

    myHeaders.append("Content-Type", "application/json")


    useEffect(() => {
        console.log('Inside useEffect')
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({
                "limit": nlimit,
                "offset": noffset
                })
            } 
        const getData = async () => {
            setIsLoading(true)
            fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)
            .then((response) => response.text())
            .then((result) => { setData(JSON.parse(result)['jdList'])})
            .catch((error) => console.error(error))

            setNlimit(nlimit + getN)
            setNoffset(noffset + getN)
        }
        getData()
    }, [])


   console.log(data.length, 'data', data)
        return (
            <div className='container'>
                <div className='App'>
                    {data.map(d => <PropsCard props={d} />)} 
                </div>
            </div>
        )
}

export default App
