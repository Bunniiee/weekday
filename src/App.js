import './App.css'
import { useEffect, useState, useRef, useCallback } from 'react'
import './JobCard'
import PropsCard from './JobCard'
import SearchBar from './dropdown'

function App() {

    const getN = 30

    const [nlimit, setNlimit] = useState(getN)
    const [noffset, setNoffset] = useState(0)

    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [index, setIndex] = useState(2)
    const loaderRef = useRef(null)


    const fetchData = useCallback(async () => {
        if (isLoading) return

        setIsLoading(true)

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({
                "limit": nlimit,
                "offset": noffset
                })
            } 
        setIsLoading(true)
        fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)
            .then((response) => response.text())
            .then((result) => { setData((prevData) => [...prevData, ...JSON.parse(result)['jdList']])})
            .catch((error) => console.error(error))
        setNlimit(nlimit + getN)
        setNoffset(noffset + getN)
        setIndex((prevIndex) => prevIndex + 1)

        setIsLoading(false)  
    }, [index, isLoading])
 

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
            setIsLoading(false)
        }
        getData()
    }, [])


        useEffect(() => {
            const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } =
                document.documentElement
            if (scrollTop + clientHeight >= scrollHeight - 20) {
                fetchData()
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
  }, [fetchData])

    console.log(data.length, 'data', data, isLoading)

    if (data.length > 0) {
        var locationOptions = []
        var jobRoleOptions = []
        var locationLookup = {}
        var jobLookup = {}
        var experienceOptions = []
        for (let i = 0;i < 20;i++) {
            experienceOptions.push({'name': i + 1, 'value': i + 1})
        }
        var remoteOptions = [{'name': 'Remote', value: 'Remote'}, {'name': 'Onsite', value: 'Onsite'}]
        var minBasePayOptions = []
        for (let i = 0;i < 20;i++) {
            minBasePayOptions.push({'name': (i + 1) + 'LPA', 'value': i + 1}) 
        }
        for (let i = 0; i < data.length; i++) {
            var obj = {
                'name': data[i].location,
                'value': data[i].location 
            }
            if (!(data[i].location in locationLookup)){
                locationLookup[data[i].location] = 1
                locationOptions.push(obj)
            }

            var obj2 = {
                'name': data[i].jobRole,
                'value': data[i].jobRole
            }
            if (!(data[i].jobRole in jobLookup)) {
                jobLookup[data[i].jobRole] = 1
                jobRoleOptions.push(obj2)
            }

        }
        return (
            <div className='container'>
                <div className='search-css'>
                    <SearchBar options={locationOptions} name='Location'/>
                    <SearchBar options={jobRoleOptions} name='JobRole'/>
                    <SearchBar options={remoteOptions} name='Remote/Onsite'/>
                    <SearchBar options={experienceOptions} name='Experience'/>
                    <SearchBar options={minBasePayOptions} name='MinBase' />
                </div>
                <div className='App'>
                    {data.map(d => <PropsCard props={d} />)} 
                </div>
                <div >{isLoading && <p>Loading</p>} </div>
            </div>
        )
    } 
}

export default App
